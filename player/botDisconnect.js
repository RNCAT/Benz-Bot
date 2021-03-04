module.exports = (client, message, queue) => {
    message.channel.send({
        embed: {
            description: `${client.emotes.error} - เพลงจบแล้ว ลาก่อน !`
        },
    })
}
