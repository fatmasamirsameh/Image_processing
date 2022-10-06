import express from 'express';
import fs from 'fs';
import sharp from 'sharp';
const thumb = './thumbnail';
const createThumb = (): void => {
  if (!fs.existsSync(thumb)) {
    fs.mkdirSync(thumb);
  }
};

const newFile = (req: express.Request): [string, boolean] => {
  const filename: string = req.query.filename as string;
  const width = req.query.width;
  const height = req.query.height;
  const newFilePath = `${thumb}/${filename}_${width}x${height}.jpg`;
  if (fs.existsSync(newFilePath)) {
    return [newFilePath, true];
  } else {
    return [newFilePath, false];
  }
};

const imageResize = async (imagePath: string, width: number, height: number, thumbPath: string) => {
  try {
    await sharp(imagePath).resize(width, height).toFile(thumbPath);
    console.log('Image resized');
    return 'Image resized';
  } catch (error) {
    console.log('error');
    return 'error';
  }
};

export { createThumb, newFile, imageResize };
