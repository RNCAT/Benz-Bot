module.exports = (client, message, queue) => {
  message.channel.send({
    embed: {
      description: `${client.emotes.error} - พี่เบนซ์เปิดเพลงให้หมดคิวแล้ว !`,
    },
  })
}
