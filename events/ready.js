module.exports = async (client) => {
    console.log("Bot is running...")
    client.user.setActivity(client.config.discord.activity)
}