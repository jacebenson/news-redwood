import { getCurrentUser } from 'src/lib/auth'
import { db } from 'src/lib/db'
const https = require('https')

export const handler = async (event, context) => {

  return new Promise((resolve, reject) => {
    const options = {
        host: 'jace.pro',
        path: '/index.xml',
        port: 80,
        method: 'GET'
    };

    const req = https.request(options, (res) => {
      console.log('before resolve success');
      resolve('Success');
    });

    req.on('error', (e) => {
      console.log('error', e);
      reject(e.message);
    });

    // send the request
    req.write('');
    req.end();
});
}
