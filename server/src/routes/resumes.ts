import express, { Request, Response } from 'express';
import multer from 'multer';
import path from 'path';
import fs from 'fs';
import Resume from '../models/Resume';
import { sendError, sendSuccess } from '../utils/errors';
import { authenticateToken, AuthRequest } from '../middleware/auth';

const router = express.Router();

// Configure multer for file uploads
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    const uploadDir = path.join(__dirname, '../../uploads');
    // Create uploads directory if it doesn't exist
    if (!fs.existsSync(uploadDir)) {
      fs.mkdirSync(uploadDir, { recursive: true });
    }
    cb(null, uploadDir);
  },
  filename: (req, file, cb) => {
    // Generate unique filename: timestamp-originalname
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1e9);
    cb(null, uniqueSuffix + path.extname(file.originalname));
  },
});

const fileFilter = (req: Request, file: Express.Multer.File, cb: multer.FileFilterCallback) => {
  // Allow PDF, JSON, and Word documents
  const allowedTypes = /\.(pdf|json|doc|docx)$/i;
  const extname = path.extname(file.originalname).toLowerCase();
  
  if (allowedTypes.test(extname)) {
    cb(null, true);
  } else {
    cb(new Error('Invalid file type. Only PDF, JSON, DOC, and DOCX files are allowed.'));
  }
};

const upload = multer({
  storage: storage,
  limits: {
    fileSize: 10 * 1024 * 1024, // 10MB limit
  },
  fileFilter: fileFilter,
});

// GET /api/resumes - Get all resumes for authenticated user
router.get('/', authenticateToken, async (req: AuthRequest, res: Response): Promise<void> => {
  try {
    const userId = req.user?.id;
    if (!userId) {
      sendError(res, 401, 'User not authenticated');
      return;
    }

    const resumes = await Resume.find({ userId })
      .sort({ updatedAt: -1 }) // Most recent first
      .select('-resumeData -personal_info -professional_summary -experience -education -project -skills'); // Exclude large fields for list view

    sendSuccess(res, 200, resumes, 'Resumes fetched successfully');
  } catch (error) {
    console.error('Get resumes error:', error);
    sendError(res, 500, 'Internal server error');
  }
});

// GET /api/resumes/:id - Get single resume
router.get('/:id', authenticateToken, async (req: AuthRequest, res: Response): Promise<void> => {
  try {
    const userId = req.user?.id;
    const resumeId = req.params.id;

    if (!userId) {
      sendError(res, 401, 'User not authenticated');
      return;
    }

    const resume = await Resume.findOne({ _id: resumeId, userId });
    if (!resume) {
      sendError(res, 404, 'Resume not found');
      return;
    }

    sendSuccess(res, 200, resume, 'Resume fetched successfully');
  } catch (error) {
    console.error('Get resume error:', error);
    sendError(res, 500, 'Internal server error');
  }
});

// POST /api/resumes - Create new resume from builder
router.post('/', authenticateToken, async (req: AuthRequest, res: Response): Promise<void> => {
  try {
    const userId = req.user?.id;
    const { 
      title, 
      personal_info,
      professional_summary,
      skills,
      experience,
      education,
      project,
      template,
      accent_color,
      public: isPublic,
      resumeData // Legacy support
    } = req.body;

    if (!userId) {
      sendError(res, 401, 'User not authenticated');
      return;
    }

    if (!title || title.trim().length === 0) {
      sendError(res, 400, 'Resume title is required');
      return;
    }

    // Build resume object with structured fields
    const resumePayload: any = {
      title: title.trim(),
      userId,
      fileType: 'json', // Created from builder
    };

    // Add structured fields if provided
    if (personal_info) resumePayload.personal_info = personal_info;
    if (professional_summary !== undefined) resumePayload.professional_summary = professional_summary;
    if (skills) resumePayload.skills = skills;
    if (experience) resumePayload.experience = experience;
    if (education) resumePayload.education = education;
    if (project) resumePayload.project = project;
    if (template) resumePayload.template = template;
    if (accent_color) resumePayload.accent_color = accent_color;
    if (isPublic !== undefined) resumePayload.public = isPublic;

    // Legacy support: if resumeData is provided, merge it into structured fields if fields are missing
    if (resumeData && typeof resumeData === 'object') {
      resumePayload.resumeData = resumeData; // Keep for backward compatibility
      
      // If structured fields aren't provided, try to extract from resumeData
      if (!personal_info && resumeData.personal_info) {
        resumePayload.personal_info = resumeData.personal_info;
      }
      if (professional_summary === undefined && resumeData.professional_summary !== undefined) {
        resumePayload.professional_summary = resumeData.professional_summary;
      }
      if (!skills && resumeData.skills) {
        resumePayload.skills = resumeData.skills;
      }
      if (!experience && resumeData.experience) {
        resumePayload.experience = resumeData.experience;
      }
      if (!education && resumeData.education) {
        resumePayload.education = resumeData.education;
      }
      if (!project && resumeData.project) {
        resumePayload.project = resumeData.project;
      }
      if (!template && resumeData.template) {
        resumePayload.template = resumeData.template;
      }
      if (!accent_color && resumeData.accent_color) {
        resumePayload.accent_color = resumeData.accent_color;
      }
      if (isPublic === undefined && resumeData.public !== undefined) {
        resumePayload.public = resumeData.public;
      }
    }

    const resume = await Resume.create(resumePayload);

    sendSuccess(res, 201, resume, 'Resume created successfully');
  } catch (error) {
    console.error('Create resume error:', error);
    sendError(res, 500, 'Internal server error');
  }
});

// POST /api/resumes/upload - Upload file (PDF, JSON, Word)
router.post('/upload', authenticateToken, upload.single('file'), async (req: AuthRequest, res: Response): Promise<void> => {
  try {
    const userId = req.user?.id;

    if (!userId) {
      sendError(res, 401, 'User not authenticated');
      return;
    }

    if (!req.file) {
      sendError(res, 400, 'No file uploaded');
      return;
    }

    const fileExt = path.extname(req.file.originalname).toLowerCase().slice(1); // Remove the dot
    const allowedTypes = ['pdf', 'json', 'doc', 'docx'];
    
    if (!allowedTypes.includes(fileExt)) {
      // Delete uploaded file if invalid type
      fs.unlinkSync(req.file.path);
      sendError(res, 400, 'Invalid file type. Only PDF, JSON, DOC, and DOCX files are allowed.');
      return;
    }

    // Generate title from filename (without extension)
    const title = req.body.title || path.basename(req.file.originalname, path.extname(req.file.originalname));

    const resume = await Resume.create({
      title: title.trim(),
      userId,
      fileUrl: `/uploads/${req.file.filename}`,
      fileType: fileExt,
    });

    sendSuccess(res, 201, resume, 'File uploaded successfully');
  } catch (error) {
    console.error('Upload resume error:', error);
    // Clean up uploaded file on error
    if (req.file && fs.existsSync(req.file.path)) {
      fs.unlinkSync(req.file.path);
    }
    sendError(res, 500, 'Internal server error');
  }
});

// PUT /api/resumes/:id - Update resume
router.put('/:id', authenticateToken, async (req: AuthRequest, res: Response): Promise<void> => {
  try {
    const userId = req.user?.id;
    const resumeId = req.params.id;
    const { 
      title,
      personal_info,
      professional_summary,
      skills,
      experience,
      education,
      project,
      template,
      accent_color,
      public: isPublic,
      resumeData // Legacy support
    } = req.body;

    if (!userId) {
      sendError(res, 401, 'User not authenticated');
      return;
    }

    // Check if resume exists and belongs to user
    const existingResume = await Resume.findOne({ _id: resumeId, userId });
    if (!existingResume) {
      sendError(res, 404, 'Resume not found');
      return;
    }

    // Build update object with only provided fields
    const updatePayload: any = {};

    if (title) updatePayload.title = title.trim();
    if (personal_info !== undefined) updatePayload.personal_info = personal_info;
    if (professional_summary !== undefined) updatePayload.professional_summary = professional_summary;
    if (skills !== undefined) updatePayload.skills = skills;
    if (experience !== undefined) updatePayload.experience = experience;
    if (education !== undefined) updatePayload.education = education;
    if (project !== undefined) updatePayload.project = project;
    if (template !== undefined) updatePayload.template = template;
    if (accent_color !== undefined) updatePayload.accent_color = accent_color;
    if (isPublic !== undefined) updatePayload.public = isPublic;
    if (resumeData !== undefined) updatePayload.resumeData = resumeData; // Legacy support

    const updatedResume = await Resume.findByIdAndUpdate(
      resumeId,
      { $set: updatePayload },
      { new: true, runValidators: true }
    );

    sendSuccess(res, 200, updatedResume, 'Resume updated successfully');
  } catch (error) {
    console.error('Update resume error:', error);
    sendError(res, 500, 'Internal server error');
  }
});

// DELETE /api/resumes/:id - Delete resume
router.delete('/:id', authenticateToken, async (req: AuthRequest, res: Response): Promise<void> => {
  try {
    const userId = req.user?.id;
    const resumeId = req.params.id;

    if (!userId) {
      sendError(res, 401, 'User not authenticated');
      return;
    }

    const resume = await Resume.findOne({ _id: resumeId, userId });
    if (!resume) {
      sendError(res, 404, 'Resume not found');
      return;
    }

    // Delete associated file if exists
    if (resume.fileUrl) {
      const filePath = path.join(__dirname, '../..', resume.fileUrl);
      if (fs.existsSync(filePath)) {
        fs.unlinkSync(filePath);
      }
    }

    await Resume.deleteOne({ _id: resumeId, userId });

    sendSuccess(res, 200, null, 'Resume deleted successfully');
  } catch (error) {
    console.error('Delete resume error:', error);
    sendError(res, 500, 'Internal server error');
  }
});

export default router;







