import express from 'express';
import config from '../src/config';
import data from './data';
import bodyParser from 'body-parser';

const host = config.apiHost;
const port = config.apiPort;
const app = express();

app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Methods', 'PUT, GET, POST, DELETE, OPTIONS');
  res.header('Access-Control-Allow-Headers', 'X-Requested-With, Accept, Origin, Content-Type');
  res.header('Content-Type', 'application/json;charset=utf-8');
  res.header('X-Powered-By', 'Hahoo');
  next();
});

app.use(bodyParser.json());

app.post('/scml/list', (req, res) => {
  setTimeout(() => {
    res.send(data);
  }, 500);
});

app.post('/scml/switchflag', (req, res) => {
  res.send({ response: 'success' });
});

app.post('/scml/delete', (req, res) => {
  res.send({ response: 'success' });
});

app.post('/scml/order', (req, res) => {
  res.send({ response: 'success' });
});

app.listen(port, (err) => {
  if (err) {
    console.error(`=> OMG!!! 🙀 ${err}`);
  } else {
    console.info('==> 🌎  API is running on port %s', port);
    console.info('==> 💻  Send requests to http://%s:%s', host, port);
  }
});
