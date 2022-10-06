import express from 'express';
import path from 'path';
import fs from 'fs';
import * as resizeImage from '../utils/resizeImage';
const routes = express.Router();
routes.get('/', async (req: express.Request, res: express.Response): Promise<void> => {
  try {
    const width: string = req.query.width as string;
    const width2 = parseInt(width);
    const height: string = req.query.height as string;
    const height2 = parseInt(height);

    if (!req.query.filename) {
      res.send({ error: 'please put filename value ,ex:filename=encenadaport' });
      return;
    } else if (!req.query.height) {
      res.send({ error: 'please put height value ,ex:height=1273' });
      return;
    } else if (!req.query.width) {
      res.send({ error: 'please put width value ,ex:width=1920' });
      return;
    } else if (isNaN(width2)) {
      res.send({ error: 'please put width value as number' });
      return;
    } else if (isNaN(height2)) {
      res.send({ error: 'please put height value as number' });
      return;
    } else {
      const imagePath = `./images/${req.query.filename}.jpg`;
      if (fs.existsSync(imagePath)) {
        const thumbExists = resizeImage.newFile(req);
        console.log(thumbExists);
        if (thumbExists[1] == false) {
          await resizeImage.imageResize(imagePath, width2, height2, thumbExists[0]);
          res.sendFile(path.resolve(thumbExists[0]));
        } else {
          res.sendFile(path.resolve(thumbExists[0]));
          console.log('not resized');
        }
      } else {
        res.send({
          error: 'Image not found ,please enter valid filename',
        });
        return;
      }
    }
  } catch (error) {
    console.log(`An error occurred during processing: ${error}`);
  }
});

export default routes;
