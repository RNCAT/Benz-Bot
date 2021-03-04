const fs = require("fs")
module.exports = {
    name: 'เหี้ยโอ',
    description: 'ไม่รักระวังติดคุกนะ',
    category: 'Funny',
    utilisation: '{prefix}เหี้ยโอ',
    async execute(client, message) {
        const connection = await message.member.voice.channel.join()
        const dispatcher = connection.play(fs.createReadStream("./sound/jail.ogg"),{ type: "ogg/opus" })
        dispatcher.setVolume(1)
  
        dispatcher.on("finish", () => {
          message.channel.send("พี่เบนซ์โดนรวบแล้ว")
        })

        dispatcher.on("error", console.error)

        console.log(`${message.author.username} use command : เหี้ยโอ`)
    }
}