

import { Request, Response } from 'express';
import path from 'path';
import fs from 'fs';

// Upload PDF handler
export async function uploadPDF(req: Request, res: Response): Promise<void> {
  const file = req.file;
  if (!file) {
    res.status(400).json({ message: 'No file uploaded' });
    return;
  }

  // Save the file URL (where it was uploaded)
  const fileUrl = `/public/uploads/${file.filename}`;
  res.status(201).json({
    message: 'File uploaded successfully',
    fileId: file.filename, // Save the filename as the file ID
    fileUrl
  });
}

// Download PDF handler
export async function downloadPDF(req: Request, res: Response): Promise<void> {
  const fileId = req.params.id;

  // Path to the extracted PDF file
  const filePath = path.join(__dirname, '../public/uploads', fileId);

  if (fs.existsSync(filePath)) {
    res.download(filePath);
  } else {
    res.status(404).json({ message: 'File not found' });
  }
}
