module.exports = {
  slash: true,
  description: 'เล่นเพลง',
  minArgs: 1,
  expectedArgs: '<youtube_url>',
  callback: async ({ args, client, interaction, message }) => {
    const guild = await client.guilds.cache.get(`${interaction.guild_id}`)
    const member = await guild.members.cache.get(
      `${interaction.member.user.id}`
    )
    const textChannel = await guild.channels.cache.get(
      `${interaction.channel_id}`
    )
    const channel = member.voice.channel

    const searchResult = await client.player
      .search(args[0], {
        requestedBy: interaction.member.user
      })
      .catch(() => {})

    const queue = client.player.createQueue(guild, {
      metadata: textChannel
    })

    if (!queue.connection) await queue.connect(channel)

    queue.addTrack(searchResult.tracks[0])

    if (!queue.playing) await queue.play()

    return `✅ | พี่เบนซ์เพิ่มเพลง **${searchResult.tracks[0].title}** ให้แล้ว !`
  }
}
