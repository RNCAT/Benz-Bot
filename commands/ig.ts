import { ICommand } from 'wokcommands'
import { MessageEmbed } from 'discord.js'
import axios from 'axios'

export default {
  category: 'Utils',
  description: 'Get instagram follower and others',
  slash: true,
  minArgs: 1,
  expectedArgs: '<username>',

  callback: async ({ args }) => {
    const username = args[0]
    const URL = 'https://instagram40.p.rapidapi.com/account-info'

    try {
      const { data } = await axios.get(URL, {
        params: {
          username: username,
          wrap: '0',
        },
        headers: {
          'x-rapidapi-host': 'instagram40.p.rapidapi.com',
          'x-rapidapi-key': `${process.env.RAPID_APIKEY}`,
        },
      })

      const embed = new MessageEmbed()
        .setTitle('Instagram Tracker')
        .setColor('LUMINOUS_VIVID_PINK')
        .setThumbnail(data.profile_pic_url)
        .setURL('https://github.com/RNCAT')
        .addFields([
          { name: 'Username', value: data.username, inline: true },
          {
            name: 'Fullname',
            value: data.full_name ? data.full_name : 'ไม่มี',
            inline: true,
          },
          { name: 'Bio', value: data.biography, inline: false },
          {
            name: 'Followers',
            value: `${data.edge_followed_by.count}`,
            inline: true,
          },
          {
            name: 'Following',
            value: `${data.edge_follow.count}`,
            inline: true,
          },
        ])

      return embed
    } catch (error) {
      const embed = new MessageEmbed()
        .setTitle('Instagram Tracker')
        .setColor('RED')
        .setDescription('ไม่พบ username หรือมีข้อผิดพลาดบางอย่างนะจ๊ะ')
      return embed
    }
  },
} as ICommand
