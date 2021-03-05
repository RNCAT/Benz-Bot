const Discord = require("discord.js")
const fs = require("fs")
const { Player } = require('discord-player')
const player = fs.readdirSync('./player').filter(file => file.endsWith('.js'))
const client = new Discord.Client({ disableMentions: 'everyone' })

client.commands = new Discord.Collection()
client.player = new Player(client)
client.config = require('./config/bot')
client.emotes = client.config.emojis

fs.readdirSync('./commands').forEach(dirs => {
  const commands = fs.readdirSync(`./commands/${dirs}`).filter(files => files.endsWith('.js'))

  for (const file of commands) {
      const command = require(`./commands/${dirs}/${file}`)
      client.commands.set(command.name.toLowerCase(), command)
  }
})

for (const file of player) {
  const event = require(`./player/${file}`)
  client.player.on(file.split(".")[0], event.bind(null, client))
}

client.on('ready', async (client) => {
  console.log("Bot is running...")
  client.user.setActivity(client.config.discord.activity)
})

client.on('voiceStateUpdate', async (oldMember, newMember) => {
  let newUserChannel = newMember.channel
  let oldUserChannel = oldMember.channel
  if (oldUserChannel === null && newUserChannel !== null) {
    console.log(`${newMember.member.displayName} has joined  ${newUserChannel.guild.name} (${newUserChannel.name})`)
    if (newMember.member.id === '504627010568585216') {
      const connection = await newMember.member.voice.channel.join()
      const dispatcher = connection.play(fs.createReadStream("./sound/benz_op1.ogg"), { type: "ogg/opus" })
      dispatcher.on("start", () => {
        let textChannelObjs = []
        newUserChannel.guild.channels.cache.forEach(element => {
          if (element.type === 'text') {
            textChannelObjs.push(element)
          }
        })
        client.channels.cache.get(textChannelObjs[0].id).send('พี่เบนซ์ได้เข้ามาในดิสแล้ว จงสรรเสริญ')
      })
      dispatcher.on("finish", () => {
        connection.disconnect()
      })
      dispatcher.on("error", console.error)
    }else if(newMember.member.id === '577116592886775829') {
      const connection = await newMember.member.voice.channel.join()
      const dispatcher = connection.play(fs.createReadStream("./sound/benz_op3.ogg"), { type: "ogg/opus" })
      dispatcher.on("start", () => {
        let textChannelObjs = []
        newUserChannel.guild.channels.cache.forEach(element => {
          if (element.type === 'text') {
            textChannelObjs.push(element)
          }
        })
        client.channels.cache.get(textChannelObjs[0].id).send('น้องเอิร์ทได้เข้ามาในดิสแล้ว')
      })
      dispatcher.on("finish", () => {
        connection.disconnect()
      })
      dispatcher.on("error", console.error)
    }else {
      let current = new Date()
      let Start = new Date()
      Start.setHours(22, 30, 0)
      if (current >= Start) {
        const connection = await newMember.member.voice.channel.join()
        const dispatcher = connection.play(fs.createReadStream("./sound/sleep.ogg"), { type: "ogg/opus" })
        dispatcher.on("finish", () => {
          connection.disconnect()
        })
      }
    }
  } else if(newUserChannel === null) {
    console.log(`${oldMember.member.displayName} has left ${oldUserChannel.guild.name} (${oldUserChannel.name})`)
  }
})

client.on('message', (client, message) => {
  if (message.author.bot || message.channel.type === 'dm') return

  const prefix = client.config.discord.prefix

  if (message.content.indexOf(prefix) !== 0) return

  const args = message.content.slice(prefix.length).trim().split(/ +/g)
  const command = args.shift().toLowerCase()

  const cmd = client.commands.get(command) || client.commands.find(cmd => cmd.aliases && cmd.aliases.includes(command))

  if (cmd) cmd.execute(client, message, args)
})

client.login(client.config.discord.token)