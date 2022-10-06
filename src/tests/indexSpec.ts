import supertest from 'supertest';
import app from '../index';
import * as resizeImage from '../utils/resizeImage';
const request = supertest(app);
const filename = 'fjord';
const width = 330;
const height = 230;
const thumb = './thumbnail';
const imagePath = `./images/${filename}.jpg`;
const thumbPath = `${thumb}/${filename}_${width}x${height}.jpg`;

describe('Test endpoint responses', () => {
  it('gets the api endpoint', async (): Promise<void> => {
    const response = await request.get('/');
    expect(response.status).toBe(200);
  });
  it('gets image ', async (): Promise<void> => {
    const response = await request.get('/?filename=encenadaport.jpg&height=1237&width=1920');
    expect(response.status).toBe(200);
  });
  it('check put filename  ', async (): Promise<void> => {
    const response: supertest.Response = await request.get('');
    expect(response.text).toBe('{"error":"please put filename value ,ex:filename=encenadaport"}');
  });
  it('check put height ', async (): Promise<void> => {
    const response: supertest.Response = await request.get('/?filename=encenadaport');
    expect(response.text).toBe('{"error":"please put height value ,ex:height=1273"}');
  });
  it('check put width ', async (): Promise<void> => {
    const response: supertest.Response = await request.get('/?filename=encenadaport&height=1237');
    expect(response.text).toBe('{"error":"please put width value ,ex:width=1920"}');
  });

  it('check valid filename ', async (): Promise<void> => {
    const response: supertest.Response = await request.get('/?filename=encena&height=1237&width=1920');
    expect(response.text).toBe('{"error":"Image not found ,please enter valid filename"}');
  });

  it('check image resize ', async (): Promise<void> => {
    const result = await resizeImage.imageResize(imagePath, width, height, thumbPath);
    expect(result).toBe('Image resized');
  });
  it('check invalid name ', async (): Promise<void> => {
    const result = await resizeImage.imageResize(`./images/fjo.jpg`, width, height, thumbPath);
    expect(result).toBe('error');
  });
});
