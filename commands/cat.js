const axios = require('axios')
const { MessageEmbed } = require('discord.js')

module.exports = {
  slash: true,
  description: 'สุ่มรูปแมว',
  category: 'Funny',
  callback: async () => {
    const cat = await axios.get('https://aws.random.cat/meow')
    const { file } = cat.data
    const embed = new MessageEmbed().setImage(file)

    return embed
  }
}
