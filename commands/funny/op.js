const sqlite = require('sqlite')
const sqlite3 = require('sqlite3').verbose()
module.exports = {
  name: 'op',
  description: 'set opening song .',
  category: 'Funny',
  utilisation: '{prefix}op',
  async execute(client, message, args) {
    const db = await sqlite.open({
      filename: './userSong.db',
      driver: sqlite3.Database,
    })

    const userID = message.member.id
    const songURL = args.join(' ')

    const users = await db.all('SELECT user_id FROM song')
    const found = users.some((el) => el.user_id === userID)

    if (found) {
      await db.run(
        `UPDATE song SET song_url = '${songURL}' WHERE user_id = '${userID}'`
      )
    } else {
      await db.run(
        `INSERT INTO song(user_id, song_url) VALUES ('${userID}', '${songURL}')`
      )
    }

    message.channel.send({
      embed: {
        description: `${client.emotes.success} - พี่เบนซ์เซ็ทเพลงเปิดตัวให้แล้ว !`,
      },
    })
    console.log(`${message.author.username} use command : op`)
  },
}
