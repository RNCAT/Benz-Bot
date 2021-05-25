module.exports = (client, message, queue, track) => {
  message.channel.send({
    embed: {
      description: `${client.emotes.music} - พี่เบนซ์เพิ่มเพลง ${track.title} ลงในคิวให้แล้ว รอแป๊บ !`,
    },
  })
}
