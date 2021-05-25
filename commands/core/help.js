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
    } else {
      const command =
        message.client.commands.get(args.join(' ').toLowerCase()) ||
        message.client.commands.find(
          (x) => x.aliases && x.aliases.includes(args.join(' ').toLowerCase())
        )

      if (!command)
        return message.channel.send(
          `${client.emotes.error} - I did not find this command !`
        )

      message.channel.send({
        embed: {
          color: 'ORANGE',
          author: { name: `วิธีใช้คำสั่ง ${command.name}` },
          fields: [
            { name: 'Name', value: command.name, inline: true },
            {
              name: 'Category',
              value: command.category,
              inline: true,
            },
            {
              name: 'Aliase(s)',
              value:
                command.aliases.length < 1
                  ? 'None'
                  : command.aliases.join(', '),
              inline: true,
            },
            {
              name: 'Utilisation',
              value: command.utilisation.replace(
                '{prefix}',
                client.config.discord.prefix
              ),
              inline: true,
            },
          ],
        },
      })
    }
    console.log(`${message.author.username} use command : help`)
  },
}
