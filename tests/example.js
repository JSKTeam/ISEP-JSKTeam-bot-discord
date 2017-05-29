import test from 'ava'
var client = require('node-rest-client-promise').Client()

test('Example test', t => {
  return client.getPromise('http://api.openweathermap.org/data/2.5/weather?q=Paris&APPID=f82ca33a6cc024fc5ccdbac8adea377b')
    .catch((error) => {
      t.fail()
      throw error
    })
    .then((res) => {
      console.log(res.response.statusCode)
      t.is(res.response.statusCode, 200)
    })
})
 