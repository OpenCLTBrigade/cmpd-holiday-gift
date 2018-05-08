import { Middleware, NestMiddleware, ExpressMiddleware } from '@nestjs/common';
import * as multer from 'multer';

@Middleware()
export class UploadMiddleware implements NestMiddleware {
  resolve(..._: any[]): ExpressMiddleware {
    const upload = multer({ dest: './uploads/' });
    /** Accept only one file, using the csv fieldname */
    return upload.array('attachments');
  }
}
