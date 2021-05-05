module.exports = {
  name: 'ping',
  description: 'Check latency',
  category: 'Funny',
  utilisation: '{prefix}ping',
  async execute(client, message) {
    await message.channel.send('🌐 Pinging...').then((sent) => {
      sent.edit(
        `🌐 API Ping : ${sent.createdTimestamp - message.createdTimestamp}ms`
      )
    })
    await message.channel.send(`🌐 Ping : ${client.ws.ping}ms.`)
    console.log(`${message.author.username} use command : ping`)
  },
}
