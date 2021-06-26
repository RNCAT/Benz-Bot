const sqlite = require('sqlite')
const sqlite3 = require('sqlite3').verbose()

module.exports = {
  slash: true,
  description: 'เปลี่ยนเพลงเปิดตัว',
  minArgs: 1,
  expectedArgs: '<song_url>',
  callback: async ({ args, interaction }) => {
    const songURL = args[0]
    const db = await sqlite.open({
      filename: './userSong.db',
      driver: sqlite3.Database,
    })

    const userID = interaction.member.user.id

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

    return ':white_check_mark: พี่เบนซ์เซ็ทเพลงเปิดตัวให้แล้ว !'
  },
}
