import { ICommand } from 'wokcommands'
import { MessageEmbed } from 'discord.js'
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

        try {
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
        } catch (error) {
            const embed = new MessageEmbed()
            embed.setColor('RED')
            embed.setDescription('มีข้อผิดพลาดกรุณาลองใหม่อีกครั้ง')

            return embed
        }

        return `เลขพร้อมเพย์ : ${promptpay_id}\nจำนวนเงิน : ${amount}`
    },
} as ICommand
