
const Discord = require('discord.js')
const config = require('./config.js')
const client = new Discord.Client()


client.on('ready', () => {
  console.log(`Logged in as ${client.user.username}!`)
})

client.on('message', msg => {
  // Check if the message has been posted in a channel where the bot operates
  // and that the author is not the bot itself
  if (msg.channel.type !== 'dm' && (config.channel !== msg.channel.id || msg.author.id === client.user.id)) return

  // If message is hello, post hello too
  var myRegex = new RegExp(/youtube:/)
  var myRegex2 = new RegExp(/spotify:/)

  if (msg.content.match(myRegex)) {
    var elem = msg.content.split(':')
    let myvar = elem[1]
    let myvar2 = elem[2]
    // msg.channel.sendMessage('Hello to you too, fellow !')
    var client2 = require('node-rest-client-promise').Client()
    client2.getPromise('https://www.googleapis.com/youtube/v3/search?q=' + myvar + '&maxResults=25&part=snippet&type=' + myvar2 + '&key=AIzaSyDdYLsCVsJAGWGO06DBXBOKnxOMG97pySE')
      .catch((error) => {
      })
      .then((res) => {
        var i = 0
        while (i < 3) {
          msg.channel.sendMessage(res.data.items[i].snippet.title)
          i++
        }
      })
  } if (msg.content.match(myRegex2)) {
    var truc = msg.content.split(':')
    let myvar3 = truc[1]
    // let myvar4 = truc[2]
    // msg.channel.sendMessage('Hello to you too, fellow !')
    var client3 = require('node-rest-client-promise').Client()
    client3.getPromise('https://api.spotify.com/v1/search?q=' + myvar3 + '&type=artist')
    // client3.Headers.add('Authorization', 'Basic 54ff8342eb5b4d09b1438d8e1a1991e9:fb95ae91b1f6433db28e57fd9ec6d6f1')
      .catch((error) => {
      })
      .then((res) => {
        console.log(res.data)
        // var i = 0
        // while (i < 3) {
          // msg.channel.sendMessage(res.data.artists.items[i].external_urls.spotify)
          // i++
      })
  }
})

client.login(config.token)
