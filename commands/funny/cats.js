const fetch = require("node-fetch")
module.exports = {
    name: 'cats',
    description: 'random a cat .',
    category: 'Funny',
    utilisation: '{prefix}cats',
    async execute(client, message) {
        const { file } = await fetch("https://aws.random.cat/meow").then((response) => response.json())
        message.channel.send(file)
        console.log(`${message.author.username} use command : cats`)
    }
}