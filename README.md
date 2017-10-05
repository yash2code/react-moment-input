# react-input-moment


React datetime picker powered by [momentjs](http://momentjs.com)

The design is from http://wangzuo.github.io/input-moment/.

The icon is from [ionicons](http://ionicons.com/).

### Installation
``` sh
npm i react-moment-input --save
```

### Usage
``` javascript
<MomentInput
              max={moment().add(5,'days')}
              min={moment()}
              format="YYYY-MM-DD HH:mm"
              options={true}
              readOnly={false}
              icon={true}
              onChange={(date)=> {console.log(date)}} />
```

### Development
- npm install
- npm start
- http://localhost:8081

### License
ISC