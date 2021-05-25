module.exports = (client, message, queue) => {
  message.channel.send({
    embed: {
      description: `${client.emotes.error} - ปิดเพลงงั้น ไม่มีใครอยู่ในห้อง !`,
    },
  })
}
