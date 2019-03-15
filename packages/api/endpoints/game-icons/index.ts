import { IncomingMessage, ServerResponse } from 'http';
import { parse } from 'url';
import axios from 'axios';

export default async (req: IncomingMessage, res: ServerResponse) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');

  const { url } = parse(req.url!, true).query;
  if (typeof url !== 'string') {
    res.writeHead(400);
    return res.end('Invalid query');
  }

  res.setHeader('Cache-Control', 's-maxage=31536000, maxage=0');

  try {
    const pageData = await axios.get(url).then(response => {
      return response.data;
    });
    const pageResult = pageData.match(/id="icon"><img src="([^"]+)"/);
    if (pageResult.length !== 2) {
      throw new Error('Can not find image');
    }
    const iconData = await axios.get(`https://game-icons.net${pageResult[1]}`).then(response => {
      return response.data;
    });
    const lastPathIndex = iconData.lastIndexOf('d=');
    const iconResult = iconData.substr(lastPathIndex, iconData.length).match(/d="([^"]+)"/);
    if (iconResult.length !== 2) {
      throw new Error('Can not find image');
    }

    res.end(iconResult[1]);
  } catch (error) {
    console.error(error.message);
    if (!error.response) {
      error.response = {
        status: 400,
        statusText: error.message || 'Internal error'
      };
    }
    res.writeHead(error.response.status);
    res.end(error.response.statusText);
  }
};
