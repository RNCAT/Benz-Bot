const fs = require("fs")
module.exports = {
    name: 'play',
    aliases: ['p'],
    category: 'Music',
    utilisation: '{prefix}play [name/URL]',

    async execute(client, message, args) {
        if (!message.member.voice.channel) return message.channel.send(`${client.emotes.error} - You're not in a voice channel !`)

        if (message.guild.me.voice.channel && message.member.voice.channel.id !== message.guild.me.voice.channel.id) return message.channel.send(`${client.emotes.error} - You are not in the same voice channel !`)

        if (!args[0]) return message.channel.send(`${client.emotes.error} - Please indicate the title of a song !`)
        console.log(args.join(" "));
        if (args.join(" ") === 'ปีศาจ') {
            const connection = await message.member.voice.channel.join()
            const dispatcher = connection.play(fs.createReadStream("./sound/cover.ogg"), { type: "ogg/opus" })
            dispatcher.on("start", () => {
              message.channel.send('พี่เบนซ์กำลังร้องเพลงปีศาจ')
            })
            dispatcher.on("finish", () => {
                message.channel.send('พี่เบนซ์กำลังร้องเพลงจบแล้ว')
              connection.disconnect()
            })
            dispatcher.on("error", console.error)
        }else {
            client.player.play(message, args.join(" "), { firstResult: true })
        }
        console.log(`${message.author.username} use command : play`)
    },
}