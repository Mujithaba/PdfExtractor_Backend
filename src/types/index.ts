export interface UploadedFile {
    filename: string;
    path: string;
  }
  
  export interface ExtractPagesRequest {
    fileId: string;
    pages: number[];
  }
  
  export interface ExtractPagesResponse {
    message: string;
    downloadId: string;
  }
  export interface ExtractPagesResponse {
    message: string;
    downloadId: string; // Change this to match the response
  }