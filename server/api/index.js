import express from 'express';
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

app.listen(port, () => console.log(`Server is listening on ${port}`))
  
export default app;