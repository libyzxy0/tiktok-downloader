import express, { Request, Response } from 'express';
import { getVideoInfo } from './src/tikwm.js';

const app = express()
const port = process.env.PORT || 5000;

app.get('/', (_req: Request, res: Response) => {
  return res.send('Tiktok downloader API');
})
app.get('/api', async (req: Request, res: Response) => {
  const { url } = req.query;
  try {
    const data = await getVideoInfo(url);
    res.send(data)
  } catch (error) {
    console.log(error);
    res.status(500).send('Internal server error');
  }
})

app.listen(port, () => console.log(`Server is listening on ${port}`))
  
export default app;