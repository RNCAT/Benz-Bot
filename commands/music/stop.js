module.exports = {
    name: 'stop',
    aliases: ['dc'],
    category: 'Music',
    utilisation: '{prefix}stop',

    execute(client, message) {
        if (!message.member.voice.channel) return message.channel.send(`${client.emotes.error} - You're not in a voice channel !`)

        if (message.guild.me.voice.channel && message.member.voice.channel.id !== message.guild.me.voice.channel.id) return message.channel.send(`${client.emotes.error} - You are not in the same voice channel !`)

        if (!client.player.getQueue(message)) return message.channel.send(`${client.emotes.error} - No music currently playing !`)

        client.player.setRepeatMode(message, false)
        client.player.stop(message)
        message.channel.send({
            embed: {
                description: `${client.emotes.success} - พี่เบนซ์หยุดเพลงให้แล้ว !`
            },
        })
    },
}