require('dotenv').config()

const Discord = require('discord.js')
const ytdl = require('ytdl-core-discord')
const WOKCommands = require('wokcommands')
const fs = require('fs')
const { env, presence } = require('./config')

const client = new Discord.Client({
  partials: ['MESSAGE', 'REACTION']
})

client.on('ready', async () => {
  const wokCommands = new WOKCommands(client, {
    commandsDir: 'commands',
    showWarns: false
  })

  wokCommands.setCategorySettings([
    {
      name: 'Funny',
      emoji: '🎉'
    },
    {
      name: 'Utils',
      emoji: '💡'
    },
    {
      name: 'Music',
      emoji: '🎹'
    }
  ])

  client.user.setPresence(presence)
})

client.on('voiceStateUpdate', async (oldMember, newMember) => {
  const opening = fs.readFileSync('./opening.json', 'utf-8')
  const openingData = JSON.parse(opening)
  const memberSong = openingData[`${newMember.member.id}`]

  const newUserChannel = newMember.channel
  const oldUserChannel = oldMember.channel

  if (oldUserChannel === null && newUserChannel !== null) {
    if (memberSong) {
      const connection = await newUserChannel.join()
      const stream = ytdl(memberSong, {
        quality: 'highestaudio',
        opusEncoded: true
      })
      const dispatcher = connection.play(await stream, {
        type: 'opus'
      })

      dispatcher.on('finish', () => {
        connection.disconnect()
      })
    }
  }
})

client.login(env.DISCORD_TOKEN)
