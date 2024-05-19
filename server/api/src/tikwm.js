import axios from 'axios';
import querystring from 'querystring';
import cheerio from 'cheerio';

const extractURLs = (html) => {
    const $ = cheerio.load(html);
    const urls = {};
    
    // Extract the poster URL
    const posterUrl = $('video#vid').attr('poster');
    if (posterUrl) {
        urls['poster'] = posterUrl;
    }

    // Extract the playback URL
    const playbackUrl = $('video#vid').attr('data-src');
    if (playbackUrl) {
        urls['playback'] = playbackUrl;
    }

    // Extract download URLs
    $('a.tik-button-dl.button.dl-success').each((index, element) => {
        const label = $(element).text().trim();
        const href = $(element).attr('href');
        if (label.includes('Download MP4') && !label.includes('HD')) {
            urls['mp4'] = href;
        } else if (label.includes('Download MP4 HD')) {
            urls['hd'] = href;
        } else if (label.includes('Download MP3')) {
            urls['mp3'] = href;
        }
    });

    return urls;
};

const fetchData = async (url) => {
    const body = {
        q: url,
        lang: 'en'
    };

    const encodedBody = querystring.stringify(body);

    try {
        const response = await axios.post('https://tikvid.io/api/ajaxSearch', encodedBody, {
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded'
            }
        });
        const response1 = await axios.get(`https://tikwm.com/api/?url=${url}`);
        const urls = extractURLs(response.data.data);
        
        return {...urls, data: {
          user: response1.data.data.author, 
          title: response1.data.data.title, 
          region: response1.data.data.region,
          views: response1.data.data.play_count,
          likes: response1.data.data.digg_count
         }
        };
    } catch (error) {
        console.error(error);
        throw error;
    }
};


export { fetchData };