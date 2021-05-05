const axios = require('axios')
module.exports = {
  name: 'cats',
  description: 'random a cat .',
  category: 'Funny',
  utilisation: '{prefix}cats',
  async execute(client, message) {
    const response = await axios.get(`https://aws.random.cat/meow`)
    const { file } = response.data
    message.channel.send(file)
    console.log(`${message.author.username} use command : cats`)
  },
}
