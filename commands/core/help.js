module.exports = {
  name: 'help',
  aliases: ['h'],
  category: 'Core',
  utilisation: '{prefix}help <command name>',

  execute(client, message, args) {
    if (!args[0]) {
      const music = message.client.commands
        .filter((x) => x.category == 'Music')
        .map((x) => '`' + x.name + '`')
        .join(', ')
      const funny = message.client.commands
        .filter((x) => x.category == 'Funny')
        .map((x) => '`' + x.name + '`')
        .join(', ')
      message.channel.send({
        embed: {
          title: 'คำสั่งบอท',
          color: 'ORANGE',
          fields: [
            { name: 'เพลง', value: music },
            { name: 'อื่นๆ', value: funny },
          ],
        },
      })
    }
    console.log(`${message.author.username} use command : help`)
  },
}
