import mongoose, { Schema, Document } from 'mongoose';

export interface IResume extends Document {
  title: string;
  userId: mongoose.Types.ObjectId;
  resumeData?: Record<string, any>; // JSON data from builder
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

export default mongoose.model<IResume>('Resume', ResumeSchema);

