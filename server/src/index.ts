import express from 'express';
import bodyParser from 'body-parser';

import { listing } from './listing';

const app = express();
const port = 9000;

app.use(bodyParser.json());

app.get('/listings', (req, res) => {
  res.send(listing);
});

app.post('/delete-listing', (req, res) => {
  const id = req.body.id;

  for (let i = 0; i < listing.length; i++) {
    if (listing[i].id === id) {
      return res.send(listing.splice(i, 1)[0]);
    }
  }
  return res.send('fail deleting listing');
});

app.listen(port);

console.log(`[app] is listening on port ${port}`);
