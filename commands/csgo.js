const axios = require('axios')
const { MessageEmbed } = require('discord.js')

module.exports = {
  slash: true,
  description: 'ตรวจสอบสถานะเกม CSGO',
  minArgs: 1,
  expectedArgs: '<steam_id>',
  callback: async ({ message, args }) => {
    const steamID = args[0]
    const URL = `https://public-api.tracker.gg/v2/csgo/standard/profile/steam/${steamID}`

    const csgo = await axios.get(URL, {
      headers: {
        'TRN-Api-Key': process.env.TRN_TOKEN,
      },
    })

    const result = csgo.data
    const segmentURL = result.data.segments[0].stats
    const player = {
      name: result.data.platformInfo.platformUserHandle,
      avatar: result.data.platformInfo.avatarUrl,
      timePlayed: segmentURL.timePlayed.displayValue,
      kills: segmentURL.kills.displayValue,
      deaths: segmentURL.deaths.displayValue,
      headshots: segmentURL.headshots.displayValue,
      shotsAccuracy: segmentURL.shotsAccuracy.displayValue,
      bombsPlanted: segmentURL.bombsPlanted.displayValue,
      bombsDefused: segmentURL.bombsDefused.displayValue,
      mvp: segmentURL.mvp.displayValue,
    }

    const embed = new MessageEmbed()
      .setTitle('CSGO Player Status')
      .setColor('GREEN')
      .setThumbnail(player.avatar)
      .addFields([
        { name: 'ชื่อ', value: player.name, inline: true },
        {
          name: 'เวลาเล่นทั้งหมด',
          value: player.timePlayed,
          inline: true,
        },
        { name: 'ความแม่น', value: player.shotsAccuracy },
        { name: 'Kills', value: player.kills, inline: true },
        { name: 'Deaths', value: player.deaths, inline: true },
        {
          name: 'Headshots',
          value: player.headshots,
          inline: true,
        },
        {
          name: 'วางระเบิด',
          value: player.bombsPlanted,
          inline: true,
        },
        {
          name: 'กู้ระเบิด',
          value: player.bombsDefused,
          inline: true,
        },
        { name: 'MVP', value: player.mvp, inline: true },
      ])

    return embed
  },
}
