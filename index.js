require('dotenv').config()

const Discord = require('discord.js')
const { Player } = require('discord-player')
const ytdl = require('ytdl-core-discord')
const WOKCommands = require('wokcommands')
const sqlite = require('sqlite')
const sqlite3 = require('sqlite3').verbose()
const env = require('./config')

const client = new Discord.Client()
client.player = new Player(client)

client.on('ready', async () => {
  new WOKCommands(client, {
    commandsDir: 'commands',
    showWarns: false,
  })

  client.user.setPresence({
    activity: {
      name: '\nดูคำสั่งทั้งหมดพิมพ์ / ในแช็ต\nhttps://bot.rennycat.work',
      type: 'PLAYING',
      url: 'https://www.youtube.com/watch?v=m-UOS4B642w',
    },
    afk: false,
    status: 'online',
  })
})

client.on('voiceStateUpdate', async (oldMember, newMember) => {
  const db = await sqlite.open({
    filename: './userSong.db',
    driver: sqlite3.Database,
  })

  const users = await db.all('SELECT user_id FROM song')
  const hasOP = users.some((el) => el.user_id === newMember.member.id)

  let newUserChannel = newMember.channel
  let oldUserChannel = oldMember.channel

  if (oldUserChannel === null && newUserChannel !== null) {
    console.log(
      `${newMember.member.displayName} has joined  ${newUserChannel.guild.name} (${newUserChannel.name})`
    )
    if (hasOP) {
      const result = await db.get(
        `SELECT song_url FROM song WHERE user_id = ${newMember.member.id}`
      )

      const connection = await newUserChannel.join()
      const stream = ytdl(result.song_url, {
        quality: 'highestaudio',
        opusEncoded: true,
      })
      const dispatcher = connection.play(await stream, {
        type: 'opus',
      })

      dispatcher.on('finish', () => {
        connection.disconnect()
      })

      dispatcher.on('error', () => {
        console.error
        connection.disconnect()
      })
    }
  } else if (newUserChannel === null) {
    console.log(
      `${oldMember.member.displayName} has left ${oldUserChannel.guild.name} (${oldUserChannel.name})`
    )
  }
})

client.login(env.DISCORD_TOKEN)
