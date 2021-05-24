require('dotenv').config()

const Discord = require('discord.js')
const { Player } = require('discord-player')
const sqlite = require('sqlite')
const sqlite3 = require('sqlite3').verbose()
const ytdl = require('ytdl-core-discord')

const fs = require('fs')

const player = fs.readdirSync('./player').filter((file) => file.endsWith('.js'))
const client = new Discord.Client({ disableMentions: 'everyone' })

client.commands = new Discord.Collection()
client.player = new Player(client)
client.config = require('./config/bot')
client.emotes = client.config.emojis

fs.readdirSync('./commands').forEach((dirs) => {
  const commands = fs
    .readdirSync(`./commands/${dirs}`)
    .filter((files) => files.endsWith('.js'))

  for (const file of commands) {
    const command = require(`./commands/${dirs}/${file}`)
    client.commands.set(command.name.toLowerCase(), command)
  }
})

for (const file of player) {
  const event = require(`./player/${file}`)
  client.player.on(file.split('.')[0], event.bind(null, client))
}

client.on('ready', () => {
  console.log('Bot is running...')
  client.user.setActivity(client.config.discord.activity)
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
    if (
      newMember.member.user.bot &&
      newMember.member.id !== '810111631974465566'
    ) {
      const connection = await newMember.member.voice.channel.join()
      const dispatcher = connection.play(
        fs.createReadStream('./sound/muteOtherBot.ogg'),
        { type: 'ogg/opus' }
      )
      dispatcher.on('start', () => {
        let textChannelObjs = []
        newUserChannel.guild.channels.cache.forEach((element) => {
          if (element.type === 'text') {
            textChannelObjs.push(element)
          }
        })
        client.channels.cache
          .get(textChannelObjs[0].id)
          .send(`พี่เบนซ์ได้ปิืดไมค์ ${newMember.member.displayName} แล้ว`)
        newMember.setMute(true)
      })
      dispatcher.on('finish', () => {
        connection.disconnect()
      })
      dispatcher.on('error', () => {
        console.error
        connection.disconnect()
      })
    } else if (hasOP) {
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

client.on('message', (message) => {
  if (message.author.bot || message.channel.type === 'dm') return

  const prefix = client.config.discord.prefix

  if (message.content.indexOf(prefix) !== 0) return

  const args = message.content.slice(prefix.length).trim().split(/ +/g)
  const command = args.shift().toLowerCase()

  const cmd =
    client.commands.get(command) ||
    client.commands.find((cmd) => cmd.aliases && cmd.aliases.includes(command))

  if (cmd) cmd.execute(client, message, args)
})

client.login(client.config.discord.token)
