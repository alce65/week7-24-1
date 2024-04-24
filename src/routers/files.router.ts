import { Router as createRouter } from 'express';
import { type FilesController } from '../controllers/files.conroller';
import multer from 'multer';

const upload = multer({ dest: 'uploads/' });

export class FilesRouter {
  router = createRouter();

  constructor(readonly controller: FilesController) {
    this.router.post(
      '/',
      upload.single('avatar'),
      controller.fileHandler.bind(controller)
    );
  }
}
