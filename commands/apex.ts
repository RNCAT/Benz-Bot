import { ICommand } from 'wokcommands'
import { MessageEmbed } from 'discord.js'
import axios from 'axios'

export default {
    category: 'Utils',
    description: 'Check Apex legends status',
    slash: true,
    minArgs: 1,
    expectedArgs: '<username>',

    callback: async ({ args }) => {
        const username = args[0]
        const URL = `https://public-api.tracker.gg/v2/apex/standard/profile/origin/${username}`
        const embed = new MessageEmbed()

        try {
            const apex = await axios.get(URL, {
                headers: {
                    'TRN-Api-Key': String(process.env.TRN_TOKEN),
                },
            })

            const { segments } = apex.data.data
            const [overview, legend] = segments
            const { level, kills, rankScore } = overview.stats

            embed.setTitle('Apex legends Status')
            embed.setColor(legend.metadata.legendColor)
            embed.setThumbnail(rankScore.metadata.iconUrl)
            embed.addFields([
                {
                    name: 'username',
                    value: username,
                    inline: true,
                },
                {
                    name: 'level',
                    value: level.displayValue,
                    inline: true,
                },
                { name: 'rank', value: rankScore.metadata.rankName },
                { name: 'active legend', value: legend.metadata.name, inline: true },
                { name: 'active kill', value: kills.displayValue, inline: true },
            ])

            return embed
        } catch (error) {
            embed.setColor('RED')
            embed.setDescription('ไม่พบ username นี้กรุณาลองใหม่อีกครั้ง')

            return embed
        }
    },
} as ICommand
