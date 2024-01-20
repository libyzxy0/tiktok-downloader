import express from 'express';
import { v4 as uuidv4 } from 'uuid';
import request from 'request';
import { getVideoInfo } from './src/tikwm.js';
import cors from 'cors';

const app = express()
const port = process.env.PORT || 5000;

app.use(cors());

app.get('/', (req, res) => {
  return res.send('Tiktok downloader API');
})
app.get('/api', async (req, res) => {
  const { url } = req.query;
  try {
    const { data } = await getVideoInfo(url);
    res.type('json').send(JSON.stringify(data, null, 2) + '\n');
  } catch (error) {
    console.log(error);
    res.status(500).send('Internal server error');
  }
})

const handleDownload = (req, res, videoType) => {
  const { id } = req.params;
  console.log(id, videoType)
  try {
    let url;
    switch (videoType) {
      case 'hd':
        url = `https://www.tikwm.com/video/media/hdplay/${id}.mp4`;
        break;
      case 'nl':
        url = `https://www.tikwm.com/video/media/play/${id}.mp4`;
        break;
      case 'wm':
        url = `https://www.tikwm.com/video/media/wmplay/${id}.mp4`;
        break;
      default:
        throw new Error('Invalid video type');
    }

    const randomString = uuidv4();
    const currentDate = new Date().toLocaleDateString().replace(/\//g, '_');
    const filename = `tikdown.click_${currentDate}_${randomString}.mp4`;

    res.setHeader('Content-disposition', `attachment; filename=${filename}`);
    res.setHeader('Content-type', 'video/mp4');

    request(url).pipe(res);
  } catch (error) {
    console.log(error);
    res.status(500).send('Internal server error');
  }
};


app.get('/api/download/:type/:id', async (req, res) => {
  const { type } = req.params;
  handleDownload(req, res, type);
});

app.listen(port, () => console.log(`Server is listening on ${port}`))
  
export default app;