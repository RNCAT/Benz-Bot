require('dotenv').config()

const Discord = require('discord.js')
const { Player } = require('discord-player')
const ytdl = require('ytdl-core-discord')
const WOKCommands = require('wokcommands')
const fs = require('fs')
const { env, presence, playerOptions } = require('./config')

const client = new Discord.Client()
client.player = new Player(client, playerOptions)

client.player.on('trackStart', (message, track) => {
  message.channel.send(
    `:white_check_mark: พี่เบนซ์กำลังเปิดเพลง ${track.title}...`
  )
})

client.on('ready', async () => {
  new WOKCommands(client, {
    commandsDir: 'commands',
    showWarns: false,
  })

  client.user.setPresence(presence)
})

client.on('voiceStateUpdate', async (oldMember, newMember) => {
  const opening = fs.readFileSync('./opening.json', 'utf-8')
  let openingData = JSON.parse(opening)
  const memberSong = openingData[`${newMember.member.id}`]

  let newUserChannel = newMember.channel
  let oldUserChannel = oldMember.channel

  if (oldUserChannel === null && newUserChannel !== null) {
    console.log(
      `${newMember.member.displayName} has joined  ${newUserChannel.guild.name} (${newUserChannel.name})`
    )
    if (memberSong) {
      const connection = await newUserChannel.join()
      const stream = ytdl(memberSong, {
        quality: 'highestaudio',
        opusEncoded: true,
      })
      const dispatcher = connection.play(await stream, {
        type: 'opus',
      })

      dispatcher.on('finish', () => {
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
