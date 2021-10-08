require('dotenv').config()

const Discord = require('discord.js')
const ytdl = require('ytdl-core')
const WOKCommands = require('wokcommands')
const opening = require('./opening.json')
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
  const memberSong = opening[`${newMember.member.id}`]

  const newUserChannel = newMember.channel
  const oldUserChannel = oldMember.channel

  if (oldUserChannel === null && newUserChannel !== null) {
    if (memberSong) {
      const connection = await newUserChannel.join()

      const stream = ytdl(memberSong, { quality: 18 })
      const dispatcher = connection.play(stream)

      dispatcher.on('finish', () => {
        connection.disconnect()
      })
    }
  }
})

client.login(env.DISCORD_TOKEN)
