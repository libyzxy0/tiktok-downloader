import express from 'express';
import { fetchData } from './src/tikwm.js';
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
    const data = await fetchData(url);
    res.type('json').send(JSON.stringify(data, null, 2) + '\n');
  } catch (error) {
    res.status(400).send({ error: "Failed to download video" })
    console.error('Error fetching data:', error);
  }
})


app.listen(port, () => console.log(`Server is listening on ${port}`))
  
export default app;