import { ICommand } from 'wokcommands'
import { MessageEmbed } from 'discord.js'
import generatePayload from 'promptpay-qr'
import { toBuffer } from 'qrcode'

export default {
    category: 'Utils',
    description: 'Create PromptPay QR Code.',
    slash: true,
    minArgs: 2,
    expectedArgs: '<number> <amount>',

    callback: async ({ args, channel }) => {
        const promptpay_id = args[0]
        const amount = Number(args[1])

        try {
            const payload = generatePayload(promptpay_id, { amount })
            const buffer = await toBuffer(payload)

            channel.send({ files: [{ attachment: buffer, name: 'qrcode.png' }] })
        } catch (error) {
            const embed = new MessageEmbed()
            embed.setColor('RED')
            embed.setDescription('มีข้อผิดพลาดกรุณาลองใหม่อีกครั้ง')

            return embed
        }

        return `เลขพร้อมเพย์ : ${promptpay_id}\nจำนวนเงิน : ${amount}`
    },
} as ICommand
