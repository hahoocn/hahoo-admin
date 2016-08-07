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

app.get('/scml/details', (req, res) => {
  setTimeout(() => {
    res.send({
      id: parseInt(req.query.id, 10),
      title: '这是内容标题的测试，标题长一点会换行，那么就测试看看标题长长的样子',
      updateTime: '2016-10-23',
      orderId: 99,
      isPublish: 1,
      info: '这个是简介内容，内容长一点呀长一点。这个是简介内容，内容长一点呀长一点。这个是简介内容，内容长一点呀长一点。'
    });
  }, 500);
});

app.post('/scml/add', (req, res) => {
  setTimeout(() => {
    res.send({ response: 'success' });
  }, 500);
});

app.post('/scml/update', (req, res) => {
  setTimeout(() => {
    res.send({ response: 'success' });
  }, 500);
});

app.listen(port, (err) => {
  if (err) {
    console.error(`=> OMG!!! 🙀 ${err}`);
  } else {
    console.info('==> 🌎  API is running on port %s', port);
    console.info('==> 💻  Send requests to http://%s:%s', host, port);
  }
});
