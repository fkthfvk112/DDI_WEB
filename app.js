const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
//const tf = require('@tensorflow/tfjs-node')
const cors = require('cors');
const drugList = require('./drugList');
const getEvent = require('./interactionEvents');

const app = express();
var methodOverride = require('method-override')

const { spawn, spawnSync } = require('child_process');

//템플릿 엔진 설정
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));
app.use(express.static('public'));

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(cors());
app.use(methodOverride('_method'));

app.use((req, res, next)=>{
  res.locals.drugList = drugList;
  next();
})
app.get('/', async(req, res)=>{
  res.render('home', {drugList});
})

app.post('/executeInteration', (req, res)=>{
  console.log(req.body);
  const drugA = req.body.drug.drugA;
  const drugB = req.body.drug.drugB;

  const python = spawnSync('python', ['./python/predictDDI.py', drugA, drugB]);
  const eventIndex_buffer = python.stdout;
  resultIndex = eventIndex_buffer.toString();

  let resultString = getEvent(Number(resultIndex));
  if(resultString.includes('name')){
    resultString = resultString.replace('name', `"${drugA}"`);
  }
  if(resultString.includes('name')){
    resultString = resultString.replace('name', `"${drugB}"`);
  }

  const result = {
    drugA,
    drugB,
    interaction:resultString,
    drugList
  };
  res.render('result', result);
})

// 서버 실행
app.listen(8080, () => {
  console.log('Server is running on port 8080');
});
