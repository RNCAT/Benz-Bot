module.exports = {
    name: 'clear',
    aliases: ['cq'],
    category: 'Music',
    utilisation: '{prefix}clear',

    execute(client, message) {
        if (!message.member.voice.channel) return message.channel.send(`${client.emotes.error} - You're not in a voice channel !`)

        if (message.guild.me.voice.channel && message.member.voice.channel.id !== message.guild.me.voice.channel.id) return message.channel.send(`${client.emotes.error} - You are not in the same voice channel !`)

        if (!client.player.getQueue(message)) return message.channel.send(`${client.emotes.error} - No music currently playing !`)

        if (client.player.getQueue(message).tracks.length <= 1) return message.channel.send(`${client.emotes.error} - There is only one song in the queue.`)

        client.player.clearQueue(message)
        message.channel.send({
            embed: {
                description: `${client.emotes.success} - พี่เบนซ์ลบคิวเพลงทั้งหมดให้แล้ว !`
            },
        })
    },
}