const axios = require('axios')
const { MessageEmbed, MessageAttachment } = require('discord.js')
const { AwesomeQR } = require('awesome-qr')
const fs = require('fs')

module.exports = {
  slash: true,
  description: 'สร้าง QR Code พร้อมเพย์',
  minArgs: 2,
  expectedArgs: '<number> <amount>',
  callback: async ({ channel, args }) => {
    const number = args[0]
    const amount = Number(args[1])

    const result = await axios.post(
      'https://rncat-promptpay.herokuapp.com/promptpay',
      {
        promptpay_id: number,
        amount: amount,
      }
    )
    const { PromptPay } = result.data

    const cat = fs.readFileSync('capoo.gif')

    const buffer = await new AwesomeQR({
      text: PromptPay,
      size: 300,
      logoImage: cat,
      logoScale: 0.3,
    }).draw()

    const attach = new MessageAttachment().setFile(buffer)
    const embed = new MessageEmbed().setDescription(
      `เลขพร้อมเพย์ : ${number}\nจำนวนเงิน : ${amount}`
    )

    channel.send(attach)

    return embed
  },
}
