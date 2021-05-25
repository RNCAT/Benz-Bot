module.exports = (client, message, track) => {
  message.channel.send({
    embed: {
      description: `${client.emotes.music} - พี่เบนซ์กำลังเปิดเพลง ${track.title} ให้ฟัง`,
    },
  })
}
