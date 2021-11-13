import { ICommand } from 'wokcommands'
import { MessageEmbed } from 'discord.js'
import axios from 'axios'

export default {
  category: 'Utils',
  description: 'Get the current Valorant season',
  slash: true,
  minArgs: 2,
  expectedArgs: '<name> <tag>',

  callback: async ({ args }) => {
    const name = args[0]
    const tag = args[1]
    const mmrURL = `https://api.henrikdev.xyz/valorant/v1/mmr-history/ap/${name}/${tag}`
    const rankURL =
      'https://valorant-api.com/v1/competitivetiers/564d8e28-c226-3180-6285-e48a390db8b1'

    try {
      const { data } = await axios.get(mmrURL)
      const player = data.data[0]

      const ranks = await axios.get(rankURL)
      const { tiers } = ranks.data.data

      const tier: any = Object.values(tiers).find(
        (obj: any) => obj.tier === player.currenttier
      )

      const embed = new MessageEmbed()
        .setTitle('Valorant Ranking Status')
        .setColor('GREEN')
        .setThumbnail(tier.smallIcon)
        .setFooter(`อัพเดทล่าสุด`)
        .setURL('https://github.com/RNCAT')
        .setTimestamp(player.date_raw)
        .addFields([
          { name: 'ชื่อ', value: name, inline: true },
          { name: 'แท็ก', value: tag, inline: true },
          {
            name: 'แรงค์ล่าสุด',
            value: `${player.currenttierpatched}`,
            inline: false,
          },
          {
            name: 'คะแนนแรงค์ล่าสุด',
            value: `${player.ranking_in_tier}`,
            inline: false,
          },
          {
            name: 'ผลคะแนนเกมล่าสุด',
            value: `${player.mmr_change_to_last_game}`,
            inline: false,
          },
        ])

      return embed
    } catch (error: any) {
      const embed = new MessageEmbed()
        .setTitle('Valorant Ranking Status')
        .setColor('RED')
        .setURL('https://github.com/RNCAT')
        .setDescription('ไม่พบข้อมูล name หรือ tag นี้')

      return embed
    }
  },
} as ICommand
