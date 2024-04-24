import { type Request, type Response } from 'express';

export class FilesController {
  fileHandler(req: Request, res: Response) {
    console.log('File', req.file);
    res.json({
      message: 'File uploaded',
    });
  }
}
