import express from 'express';
import config from '../src/config';
import { data, cateData, cateData0, cateData1, cateData11 } from './data';
import bodyParser from 'body-parser';

const host = config.apiHost;
const port = config.apiPort;
const app = express();

app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Methods', 'PUT, GET, POST, DELETE, OPTIONS, PATCH');
  res.header('Access-Control-Allow-Headers', 'X-Requested-With, Accept, Origin, Content-Type');
  res.header('Content-Type', 'application/json;charset=utf-8');
  res.header('X-Powered-By', 'Hahoo');
  next();
});

app.use(bodyParser.json());

app.get('/scmls', (req, res) => {
  setTimeout(() => {
    res.json(data);
  }, 500);
});

app.put('/scmls/:id/publication', (req, res) => {
  res.sendStatus(204);
});

app.delete('/scmls/:id/publication', (req, res) => {
  res.sendStatus(204);
});

app.delete('/scmls/:id', (req, res) => {
  res.sendStatus(204);
});

app.put('/scmls/:id/order', (req, res) => {
  res.sendStatus(204);
});

app.get('/scmls/:id', (req, res) => {
  setTimeout(() => {
    res.json({
      id: parseInt(req.params.id, 10),
      title: '这是内容标题的测试，标题长一点会换行，那么就测试看看标题长长的样子',
      updateTime: '2016-10-23',
      orderId: 99,
      isPublish: 1,
      info: '这个是简介内容，内容长一点呀长一点。这个是简介内容，内容长一点呀长一点。这个是简介内容，内容长一点呀长一点。'
    });
  }, 500);
});

app.post('/scmls', (req, res) => {
  res.status(201).json({
    id: 111,
    title: req.body.title,
    updateTime: Date.now(),
    orderId: 120,
    isPublish: req.body.isPublish,
    info: req.body.info
  });
});

app.put('/scmls/:id', (req, res) => {
  setTimeout(() => {
    res.json({
      id: parseInt(req.params.id, 10),
      title: req.body.title,
      updateTime: Date.now(),
      orderId: req.body.orderId,
      isPublish: req.body.isPublish ? 1 : 0,
      info: req.body.info
    });
  }, 500);
});

app.get('/mcmls', (req, res) => {
  setTimeout(() => {
    res.json(data);
  }, 500);
});

app.put('/mcmls/:id/publication', (req, res) => {
  res.sendStatus(204);
});

app.delete('/mcmls/:id/publication', (req, res) => {
  res.sendStatus(204);
});

app.delete('/mcmls/:id', (req, res) => {
  res.sendStatus(204);
});

app.put('/mcmls/:id/order', (req, res) => {
  res.sendStatus(204);
});

app.get('/mcmls/:id', (req, res) => {
  setTimeout(() => {
    res.json({
      id: parseInt(req.params.id, 10),
      title: '11这是内容标题的测试，标题长一点会换行，那么就测试看看标题长长的样子',
      updateTime: '2016-10-23',
      orderId: 99,
      isPublish: 1,
      info: '这个是简介内容，内容长一点呀长一点。这个是简介内容，内容长一点呀长一点。这个是简介内容，内容长一点呀长一点。',
      cateId: '2',
      cateName: '分类2'
    });
  }, 500);
});

app.post('/mcmls', (req, res) => {
  res.status(201).json({
    id: 111,
    title: req.body.title,
    updateTime: Date.now(),
    orderId: 120,
    isPublish: req.body.isPublish,
    info: req.body.info
  });
});

app.put('/mcmls/:id', (req, res) => {
  setTimeout(() => {
    res.json({
      id: parseInt(req.params.id, 10),
      title: req.body.title,
      updateTime: Date.now(),
      orderId: req.body.orderId,
      isPublish: req.body.isPublish ? 1 : 0,
      info: req.body.info,
      cateId: req.body.cateId,
      cateName: '分类'
    });
  }, 500);
});

app.get('/cates', (req, res) => {
  if (req.query.type && req.query.type === 'all') {
    res.json(cateData);
    return;
  }

  let parentId = 0;
  if (req.query.parentId) {
    parentId = parseInt(req.query.parentId, 10);
  }
  let resJson;
  switch (parentId) {
    case 0:
      resJson = cateData0;
      resJson.parentId = parentId;
      break;
    case 1:
      resJson = cateData1;
      resJson.parentId = parentId;
      break;
    case 11:
      resJson = cateData11;
      resJson.parentId = parentId;
      break;
    default:
      resJson = {
        totalCount: 0,
        itemCount: 0,
        parentId,
        parentName: '',
        items: []
      };
  }
  res.json(resJson);
});

app.put('/cates/:id/publication', (req, res) => {
  res.sendStatus(204);
});

app.delete('/cates/:id/publication', (req, res) => {
  res.sendStatus(204);
});

app.delete('/cates/:id', (req, res) => {
  res.sendStatus(204);
});

app.put('/cates/:id/order', (req, res) => {
  res.sendStatus(204);
});

app.get('/cates/:id', (req, res) => {
  setTimeout(() => {
    res.json({
      id: parseInt(req.params.id, 10),
      title: '这是分类名称的测试',
      updateTime: '2016-10-23',
      orderId: 99,
      isPublish: 1,
      info: '这个是简介内容，内容长一点呀长一点。这个是简介内容，内容长一点呀长一点。这个是简介内容，内容长一点呀长一点。',
      parentId: 1,
      parentName: '分类1'
    });
  }, 500);
});

app.post('/cates', (req, res) => {
  res.status(201).json({
    id: 111,
    title: req.body.title,
    updateTime: Date.now(),
    orderId: 120,
    isPublish: req.body.isPublish,
    info: req.body.info,
    parentId: req.body.parentId,
    parentName: '分类XXX'
  });
});

app.put('/cates/:id', (req, res) => {
  setTimeout(() => {
    res.json({
      id: parseInt(req.params.id, 10),
      title: req.body.title,
      updateTime: Date.now(),
      orderId: req.body.orderId,
      isPublish: req.body.isPublish ? 1 : 0,
      info: req.body.info,
      parentId: req.body.parentId,
      parentName: '分类XXX'
    });
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
