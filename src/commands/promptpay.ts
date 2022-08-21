import {
  SlashCommandBuilder,
  EmbedBuilder,
  ChatInputCommandInteraction,
  AttachmentBuilder,
} from 'discord.js'
import generatePayload from 'promptpay-qr'
import { toBuffer } from 'qrcode'

export default {
  data: new SlashCommandBuilder()
    .setName('promptpay')
    .setDescription('Generate promptpay QR code.')
    .addStringOption((option) =>
      option.setName('number').setDescription('Enter promptpay id').setRequired(true)
    )
    .addNumberOption((option) =>
      option.setName('amount').setDescription('Enter amount').setRequired(true)
    ),
  async execute(interaction: ChatInputCommandInteraction) {
    await interaction.deferReply()

    try {
      const promptpayId = interaction.options.getString('number', true)
      const amount = interaction.options.getNumber('amount', true)

      const payload = generatePayload(promptpayId, { amount })

      const imageBuffer = await toBuffer(payload)
      const attachment = new AttachmentBuilder(imageBuffer).setName('promptpay.png')

      const embed = new EmbedBuilder()
        .setTitle('PromptPay QR')
        .setImage('attachment://promptpay.png')
        .addFields([
          { name: 'number', value: promptpayId, inline: true },
          { name: 'amount', value: amount.toString(), inline: true },
        ])

      await interaction.editReply({ embeds: [embed], files: [attachment] })
    } catch (error) {
      if (error instanceof Error) {
        const embed = new EmbedBuilder()
          .setTitle('PromptPay QR')
          .setColor('Red')
          .setDescription(error.message)

        await interaction.editReply({ embeds: [embed] })
      }
    }
  },
}
