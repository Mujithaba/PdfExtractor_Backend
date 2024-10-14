
import express from 'express';
import { loginUser, signup, uploadPDF} from '../controllers/pdfController';
import { upload } from '../config/multerConfig';

const router = express.Router();

// Route to register a new user
router.post('/register', signup);
router.post('/login',loginUser);

// Route to upload the PDF
router.post('/upload', upload.single('pdf'), uploadPDF);

export default router;






























// Route to download the extracted PDF by its file ID
// router.get('/download/:id', downloadPDF);

