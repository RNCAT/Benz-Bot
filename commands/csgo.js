require('dotenv').config()
const axios = require('axios')
const { MessageEmbed } = require('discord.js')
const { env } = require('../config')

module.exports = {
  slash: true,
  description: 'ตรวจสอบสถานะเกม CSGO',
  minArgs: 1,
  expectedArgs: '<steam_id>',
  category: 'Utils',
  callback: async ({ args }) => {
    const steamID = args[0]
    const URL = `https://public-api.tracker.gg/v2/csgo/standard/profile/steam/${steamID}`

    const { data } = await axios.get(URL, {
      headers: {
        'TRN-Api-Key': env.TRN_TOKEN
      }
    })

    const { platformInfo, segments } = data.data
    const {
      timePlayed,
      kills,
      deaths,
      headshots,
      shotsAccuracy,
      bombsPlanted,
      bombsDefused,
      mvp
    } = segments[0].stats

    const embed = new MessageEmbed()
      .setTitle('CSGO Player Status')
      .setColor('GREEN')
      .setThumbnail(platformInfo.avatarUrl)
      .addFields([
        { name: 'ชื่อ', value: platformInfo.platformUserHandle, inline: true },
        {
          name: 'เวลาเล่นทั้งหมด',
          value: timePlayed.displayValue,
          inline: true
        },
        { name: 'ความแม่น', value: shotsAccuracy.displayValue },
        { name: 'Kills', value: kills.displayValue, inline: true },
        { name: 'Deaths', value: deaths.displayValue, inline: true },
        {
          name: 'Headshots',
          value: headshots.displayValue,
          inline: true
        },
        {
          name: 'วางระเบิด',
          value: bombsPlanted.displayValue,
          inline: true
        },
        {
          name: 'กู้ระเบิด',
          value: bombsDefused.displayValue,
          inline: true
        },
        { name: 'MVP', value: mvp.displayValue, inline: true }
      ])

    return embed
  }
}
