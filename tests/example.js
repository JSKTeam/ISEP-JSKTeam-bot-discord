import test from 'ava'
var client = require('node-rest-client-promise').Client()

test('Example test', t => {
  return client.getPromise('https://www.googleapis.com/youtube/v3/search?q=discord&maxResults=25&part=snippet&key=AIzaSyDdYLsCVsJAGWGO06DBXBOKnxOMG97pySE')
    .catch((error) => {
      t.fail()
      throw error
    })
    .then((res) => {
      console.log(res.data.items)
      t.is(res.response.statusCode, 200)
    })
})
