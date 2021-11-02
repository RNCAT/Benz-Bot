import { ICommand } from 'wokcommands'
import axios from 'axios'
import { toFile } from 'qrcode'

export default {
  category: 'Utils',
  description: 'Create PromptPay QR Code.',
  slash: true,
  minArgs: 2,
  expectedArgs: '<number> <amount>',

  callback: async ({ args, channel }) => {
    const promptpay_id = args[0]
    const amount = Number(args[1])
    const API = String(process.env.PROMPTPAY_URL)
    const imagePath = './qr.png'

    const result = await axios.post(API, {
      promptpay_id,
      amount,
    })

    await toFile(imagePath, result.data.PromptPay)

    channel.send({
      files: [
        {
          attachment: imagePath,
          name: 'qr.png',
        },
      ],
    })

    return `เลขพร้อมเพย์ : ${promptpay_id}\nจำนวนเงิน : ${amount}`
  },
} as ICommand
