const { SlashCommandBuilder, EmbedBuilder } = require('discord.js')
const { BotColor } = require('./../settings.json')

module.exports = {
    data: new SlashCommandBuilder()
        .setName('аватар')
        .setDescription('Показывает аватар пользователя')
        .addUserOption(option => option.setName('пользователь').setDescription('Пользователь, чей аватар вы хотите увидеть'))
        .setDMPermission(false),

    async execute(interaction) {
        await interaction.deferReply()

        var User = interaction.options.getUser('пользователь'); if (User == null) { User = interaction.user }
        var NewEmbed = new EmbedBuilder()
            .setColor(BotColor)
            .setTitle(`Аватар "${User.username}"`)
            .setImage(User.displayAvatarURL({ dynamics: true, size: 512 }))

        await interaction.editReply({ embeds: [NewEmbed] })
    },
}