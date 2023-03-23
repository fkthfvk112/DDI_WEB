const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
//const tf = require('@tensorflow/tfjs-node')
const cors = require('cors');

const app = express();

const { spawn, spawnSync } = require('child_process');
// const python = spawn('python', ['./python/helloWorld.py', 'I am arguement!!']);

//템플릿 엔진 설정
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(cors());

app.get('/', async(req, res)=>{
  /* tensorflow.js 모델을 사용하는 경우 */
  //const modelPath = `file://${path.join(__dirname, 'python', 'jsModel', 'model.json')}`; //have to change url
  //const model = await tf.loadLayersModel(modelPath);
  let eventIndex_buffer;
  
  const python = spawnSync('python', ['./python/predictDDI.py', 'Abemaciclib', 'Carbamazepine']);
  eventIndex_buffer = python.stdout;

  let result = -1
  result = eventIndex_buffer.toString()

  console.log('result : ', result);
  res.send(result);
})

// 서버 실행
app.listen(8080, () => {
  console.log('Server is running on port 8080');
});
