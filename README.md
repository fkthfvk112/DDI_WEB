[child_process]('https://nodejs.org/api/child_process.html)

 + 위 문서를 읽으면 서브 프로세스 사용법을 익힐 수 있음
 + 대략적으로 spawn함수를 이용하게 되는데 아래와 같은 인자를 가짐
  + command : 수행할 커맨드
  + arg :문자열로 된 인자들의 리스트
  + returns : <object>
    + pid : 자식 프로세스 아이디
    + output : stdiog output의 결과 배열
    + stdout : output[1]의 값
    + stderr : output[2]의 값

  + model.h5파일을 파이썬환경에서 실행시킴. 
  + jsModel폴더 내부 model.json tensorflow.js에서 실행 가능한 형태, 현재 사용하지 않음
  + 파이썬 파일 불러오기, predict, 결과 출력을 동기적으로 설정해 놓았음

Version
  + python (== 3.6.13)
  + numpy (==1.18.1)
  + Keras (==2.2.4)
  + pandas (==1.0.1)
  + scikit-learn (==0.21.2)
  + stanfordnlp (==0.2.0)