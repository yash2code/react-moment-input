# react-input-moment

React datetime picker powered by [momentjs](http://momentjs.com)

The design is from http://wangzuo.github.io/input-moment/.

The icon is from [ionicons](http://ionicons.com/).

Demo [react-moment-input](https://kenanberbic.bitbucket.io/react-moment-input/).

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
              icon={false}
              onChange={(date)=> {console.log(date)}} />
```

Available properties:

| Property | Type | Content  | Default Value |
| --- | --- | --- | --- |
| min | `moment` | Min selected date | `undefined`
| max | `moment` | Max selected date | `undefined`
| value | `moment` | The current value | `undefined`
| format | `string` | Date time format | `YYYY-MM-DD HH:mm`
| tab | `Number` | Selected tab: 0-Calendar, 1-Time, 2-Year  | `0`
| options | `boolean` | Show header options  | `true`
| readOnly | `boolean` | Disable input  | `true`
| isOpen | `boolean` | Show picker  | `false`
| icon | `boolean` | Show calendar icon  | `false`
| style | `object` | Container style  | `undefined`
| className | `string` | Container class  | `r-input-group`
| inputStyle | `object` | Input style  | `undefined`
| inputClassName | `string` | Input class | `r-input`
| onChange | `function` | Emit value on every click (value, name) | `undefined`
| onSave | `function` | Emit value on save click (value, name)  | `undefined`
| onClose | `function` | Emit value on picker close (value, name)  | `undefined`

### Development
- npm install
- npm start
- http://localhost:8081

### License
ISC