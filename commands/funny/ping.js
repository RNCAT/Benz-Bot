module.exports = {
  name: 'ping',
  description: 'Check latency',
  category: 'Funny',
  utilisation: '{prefix}ping',
  async execute(client, message) {
    message.channel.send(`🌐 Ping : ${client.ws.ping}ms.`)
    console.log(`${message.author.username} use command : ping`)
  },
}
