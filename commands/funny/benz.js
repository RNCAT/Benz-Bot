module.exports = {
    name: 'benz',
    description: 'About benz.',
    category: 'Funny',
    utilisation: '{prefix}benz',
    execute(client, message) {
        message.channel.send({
            embed: {
                title: 'BENZAMAN',
                url: 'https://www.facebook.com/benzaman1234/',
                color: 'BLUE',
                description: 'พี่เบนซ์ตูดใหญ่',
                thumbnail: { url: 'https://scontent.fbkk12-2.fna.fbcdn.net/v/t1.0-9/71302469_2379482582322105_6341678719039438848_o.jpg?_nc_cat=104&ccb=3&_nc_sid=09cbfe&_nc_eui2=AeEmpXPLxuVzrqNGaMBzjXykk3-Yv4QCjBaTf5i_hAKMFqSXYCuH9Cm5_W_jUedGJ4OzhXYPnP3hQeKxzkWVHAtd&_nc_ohc=0FevyLaJVZMAX9pG9rP&_nc_ht=scontent.fbkk12-2.fna&oh=fe9d05a270b659a3829dc4ac79005b8f&oe=605CC683' },
                timestamp: new Date(),
            },
        })
        console.log(`${message.author.username} use command : benz`)
    }
}