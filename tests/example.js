import test from 'ava'
var client = require('node-rest-client-promise').Client()

test('test weather', t => {
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

test('test forecast', t => {
  return client.getPromise('http://api.openweathermap.org/data/2.5/forecast?q=Paris&APPID=f82ca33a6cc024fc5ccdbac8adea377b')
    .catch((error) => {
      t.fail()
      throw error
    })
    .then((res) => {
      console.log(res.response.statusCode)
      t.is(res.response.statusCode, 200)
    })
})

test('test pokemon', t => {
  return client.getPromise('http://pokeapi.co/api/v2/pokemon/pikachu')
    .catch((error) => {
      t.fail()
      throw error
    })
    .then((res) => {
      console.log(res.response.statusCode)
      t.is(res.response.statusCode, 200)
    })
})

test('test traduction', t => {
  var args = {
    parameters: {'q': 'Bonjour', 'target': 'en', 'format': 'text', 'key': 'AIzaSyDtM-DG6jVikfCI1MUrw31VEbvFm5Ifezw'}
  }
  return client.postPromise('https://translation.googleapis.com/language/translate/v2', args)
  .catch((error) => {
    t.fail()
    throw error
  })
  .then((res) => {
    console.log(res.response.statusCode)
    t.is(res.response.statusCode, 200)
  })
})
