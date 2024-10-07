import { Request, Response, NextFunction } from 'express';

// Define a custom error interface (optional)
interface CustomError extends Error {
  status?: number; // Optional status code property
}

// Error handling middleware
export const errorHandler = (err: CustomError, req: Request, res: Response, next: NextFunction) => {
  // Log the error details for debugging
  console.error(err);

  // Set the response status code and message
  const status = err.status || 500; // Default to 500 if no status is set
  const message = err.message || 'Internal Server Error';

  // Send the response
  res.status(status).json({ message });
};
