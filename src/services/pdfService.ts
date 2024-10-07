// import fs from 'fs/promises';
// import path from 'path';
// import { PDFDocument } from 'pdf-lib';
// import { UploadedFile, ExtractPagesRequest, ExtractPagesResponse } from '../types';

// export class PDFService {
//   static async extractPages(req: ExtractPagesRequest): Promise<ExtractPagesResponse> {
//     const { fileId, pages } = req;
//     const pdfPath = path.join(__dirname, '../../uploads', fileId);
//     const pdfBytes = await fs.readFile(pdfPath);
//     const pdfDoc = await PDFDocument.load(pdfBytes);
//     const newPdfDoc = await PDFDocument.create();

//     for (let pageNum of pages) {
//       const [copiedPage] = await newPdfDoc.copyPages(pdfDoc, [pageNum - 1]);
//       newPdfDoc.addPage(copiedPage);
//     }

//     const newPdfBytes = await newPdfDoc.save();
//     const extractedFileName = `extracted_${fileId}`;
//     await fs.writeFile(path.join(__dirname, '../../extracted', extractedFileName), newPdfBytes);

//     return { message: 'PDF extracted successfully', downloadId: extractedFileName };
//   }

//   static async getDownloadPath(downloadId: string): Promise<string> {
//     const filePath = path.join(__dirname, '../../extracted', downloadId);
//     await fs.access(filePath);
//     return filePath;
//   }
// }



import fs from 'fs/promises';
import path from 'path';
import { PDFDocument } from 'pdf-lib';
import { UploadedFile, ExtractPagesRequest, ExtractPagesResponse } from '../types';

export class PDFService {
  static async extractPages(req: ExtractPagesRequest): Promise<ExtractPagesResponse> {
    const { fileId, pages } = req;
    const pdfPath = path.join(__dirname, '../../uploads', fileId);
    const pdfBytes = await fs.readFile(pdfPath);
    const pdfDoc = await PDFDocument.load(pdfBytes);
    const newPdfDoc = await PDFDocument.create();

    for (let pageNum of pages) {
      const [copiedPage] = await newPdfDoc.copyPages(pdfDoc, [pageNum - 1]);
      newPdfDoc.addPage(copiedPage);
    }

    const newPdfBytes = await newPdfDoc.save();
    const extractedFileName = `extracted_${fileId}`;
    await fs.writeFile(path.join(__dirname, '../../extracted', extractedFileName), newPdfBytes);

    return { message: 'PDF extracted successfully', downloadId: extractedFileName };
  }

  static async getDownloadPath(downloadId: string): Promise<string> {
    const filePath = path.join(__dirname, '../../extracted', downloadId);
    await fs.access(filePath);
    return filePath;
  }
}
