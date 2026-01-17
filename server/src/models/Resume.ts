import mongoose, { Schema, Document } from 'mongoose';

// Sub-schemas for structured resume data
const PersonalInfoSchema = new Schema({
  full_name: { type: String, default: '' },
  email: { type: String, default: '' },
  phone: { type: String, default: '' },
  location: { type: String, default: '' },
  linkedin: { type: String, default: '' },
  website: { type: String, default: '' },
  profession: { type: String, default: '' },
  image: { type: String, default: null }, // Store as URL/path string
}, { _id: false });

const ExperienceSchema = new Schema({
  company: { type: String, default: '' },
  position: { type: String, default: '' },
  start_date: { type: String, default: '' },
  end_date: { type: String, default: '' },
  description: { type: String, default: '' },
  is_current: { type: Boolean, default: false },
}, { _id: true });

const EducationSchema = new Schema({
  institution: { type: String, default: '' },
  degree: { type: String, default: '' },
  field: { type: String, default: '' },
  graduation_date: { type: String, default: '' },
  gpa: { type: String, default: '' },
}, { _id: true });

const ProjectSchema = new Schema({
  name: { type: String, default: '' },
  type: { type: String, default: '' },
  description: { type: String, default: '' },
}, { _id: true });

export interface IResume extends Document {
  title: string;
  userId: mongoose.Types.ObjectId;
  personal_info?: {
    full_name?: string;
    email?: string;
    phone?: string;
    location?: string;
    linkedin?: string;
    website?: string;
    profession?: string;
    image?: string | null;
  };
  professional_summary?: string;
  skills?: string[];
  experience?: Array<{
    company?: string;
    position?: string;
    start_date?: string;
    end_date?: string;
    description?: string;
    is_current?: boolean;
    _id?: mongoose.Types.ObjectId;
  }>;
  education?: Array<{
    institution?: string;
    degree?: string;
    field?: string;
    graduation_date?: string;
    gpa?: string;
    _id?: mongoose.Types.ObjectId;
  }>;
  project?: Array<{
    name?: string;
    type?: string;
    description?: string;
    _id?: mongoose.Types.ObjectId;
  }>;
  template?: string;
  accent_color?: string;
  public?: boolean;
  // Legacy fields for file uploads
  resumeData?: Record<string, any>; // JSON data from builder (deprecated but kept for backward compatibility)
  fileUrl?: string; // URL/path for uploaded files
  fileType?: string; // 'pdf', 'json', 'docx', etc.
  createdAt: Date;
  updatedAt: Date;
}

const ResumeSchema: Schema = new Schema(
  {
    title: {
      type: String,
      required: [true, 'Resume title is required'],
      trim: true,
      maxlength: [100, 'Title cannot exceed 100 characters'],
    },
    userId: {
      type: Schema.Types.ObjectId,
      ref: 'User',
      required: [true, 'User ID is required'],
      index: true,
    },
    // Structured resume fields
    personal_info: {
      type: PersonalInfoSchema,
      default: {},
    },
    professional_summary: {
      type: String,
      default: '',
    },
    skills: {
      type: [String],
      default: [],
    },
    experience: {
      type: [ExperienceSchema],
      default: [],
    },
    education: {
      type: [EducationSchema],
      default: [],
    },
    project: {
      type: [ProjectSchema],
      default: [],
    },
    template: {
      type: String,
      default: 'classic',
      enum: ['classic', 'minimal', 'modern', 'minimal-image'],
    },
    accent_color: {
      type: String,
      default: '#3B82F6',
    },
    public: {
      type: Boolean,
      default: false,
    },
    // Legacy fields (kept for backward compatibility)
    resumeData: {
      type: Schema.Types.Mixed,
      default: {},
    },
    fileUrl: {
      type: String,
      trim: true,
    },
    fileType: {
      type: String,
      enum: ['pdf', 'json', 'docx', 'doc', null],
    },
  },
  {
    timestamps: true, // Automatically adds createdAt and updatedAt
  }
);

// Index for efficient queries
ResumeSchema.index({ userId: 1, createdAt: -1 });
ResumeSchema.index({ public: 1, createdAt: -1 }); // For public resume queries

export default mongoose.model<IResume>('Resume', ResumeSchema);







