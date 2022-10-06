import express from 'express';
import routes from './routes/routes';
import * as resizeImage from './utils/resizeImage';

const app = express();
const port = 3000;

app.use('/', express.json(), routes);

app.listen(port, () => {
  resizeImage.createThumb();

  console.log('server running..........');
});

export default app;
