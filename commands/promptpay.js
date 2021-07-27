const axios = require('axios')
const { MessageEmbed, MessageAttachment } = require('discord.js')
const { toBuffer } = require('qrcode')
const { env } = require('../config')

module.exports = {
  slash: true,
  description: 'สร้าง QR Code พร้อมเพย์',
  minArgs: 2,
  expectedArgs: '<number> <amount>',
  category: 'Utils',
  callback: async ({ channel, args }) => {
    const number = args[0]
    const amount = Number(args[1])

    const result = await axios.post(env.PROMPTPAY_URL, {
      promptpay_id: number,
      amount
    })
    const { PromptPay } = result.data

    const image = await toBuffer(PromptPay)

    const attach = new MessageAttachment()
    attach.setFile(image)

    const embed = new MessageEmbed({
      description: `เลขพร้อมเพย์ : ${number}\nจำนวนเงิน : ${amount}`
    })

    await channel.send(attach)

    return embed
  }
}
