const Discord = require('discord.js')
const config = require('./config.js')
const client = new Discord.Client()
const httpClient = require('node-rest-client-promise').Client()



client.on('ready', () => {
  console.log(`Logged in as ${client.user.username}!`)
})

client.on('message', msg => {
  // Check if the message has been posted in a channel where the bot operates
  // and that the author is not the bot itself
  if (msg.channel.type !== 'dm' && (config.channel !== msg.channel.id || msg.author.id === client.user.id)) return

  // If message is hello, post hello too
  if (msg.content === 'hello') {
    msg.channel.sendMessage('Hello to you too, fellow !')
  } else {
    var input = msg.content.split(' ')
    if (input[0] === '/meteo') {
      if (input.length === 1) {
        msg.channel.sendMessage('Précisez un nom de ville')
      } else if (input.length === 2) {
        mto(input[1])
        .then(weather => {
          msg.channel.sendMessage(weather)
        })
      }
    } else if (input[0] === '/forecast') {
      if (input.length === 1) {
        msg.channel.sendMessage('Précisez un nom de ville')
      } else if (input.length === 2) {
        mto1(input[1])
        .then(weather => {
          msg.channel.sendMessage(weather)
        })
      }
    }
  }
})

client.login(config.token)

function mto (ville) {
  return httpClient.getPromise('http://api.openweathermap.org/data/2.5/weather?q=' + ville + '&APPID=f82ca33a6cc024fc5ccdbac8adea377b')
    .then((res) => {
      console.log(res.response.statusCode)
      // console.log(res.data)
      // console.log(res.data.weather)
      // console.log(res.data.weather[0].description)
      return res.data.weather[0].description
    })
}

function mto1 (ville) {
  return httpClient.getPromise('http://api.openweathermap.org/data/2.5/forecast?q=' + ville + '&APPID=f82ca33a6cc024fc5ccdbac8adea377b')
    .then((res) => {
      console.log(res.response.statusCode)
      console.log(res.data)
      // console.log(res.data.weather)
      // console.log(res.data.weather[0].description)
      var weather = '```'
      var day = res.data.list[0].dt_txt.split(' ')[0]
      var tempMin = res.data.list[0].main.temp_min
      var tempMax = res.data.list[0].main.temp_max
      res.data.list.forEach(function (element) {
        if (element.dt_txt.split(' ')[0] === day) {
          tempMin = Math.min(tempMin, element.main.temp_min)
          tempMax = Math.max(tempMax, element.main.temp_max)
        } else {
          weather = weather + day + '\tTemp. min : ' + tempMin + '°F\tTemp. max : ' + tempMax + '°F\n'
          day = element.dt_txt.split(' ')[0]
          tempMin = element.main.temp_min
          tempMax = element.main.temp_max
        }
        // weather = weather + element.dt_txt + ' : ' + element.weather[0].description + '\n'
      }, this)
      weather = weather + day + '\tTemp. min : ' + tempMin + '°F\tTemp. max : ' + tempMax + '°F\n'
      return weather + '```'
      // return res.data.list[6].weather[0].description
      // return res.data.weather[0].description
    })
}
