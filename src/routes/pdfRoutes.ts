

import express from 'express';
import { uploadPDF, downloadPDF } from '../controllers/pdfController';
import { upload } from '../config/multerConfig';

const router = express.Router();

// Route to upload the PDF
router.post('/upload', upload.single('pdf'), uploadPDF);

// Route to download the extracted PDF by its file ID
router.get('/download/:id', downloadPDF);

export default router;
