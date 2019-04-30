import querystring from 'querystring';
import https from 'https';

export const track = (options: string | any) => {
  if (typeof options === 'string') {
    options = {
      url: options
    };
  }

  // Set mandatory options
  options = options || {};
  options.idsite = process.env.MATOMO_ID;
  options.rec = 1;

  var requestUrl = process.env.MATOMO_URL + '?' + querystring.stringify(options);

  var req = https.get(requestUrl);
  req.end();
};
