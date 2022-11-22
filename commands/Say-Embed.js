const { SlashCommandBuilder, PermissionFlagsBits, EmbedBuilder } = require('discord.js')
const { BotColor } = require('./../settings.json')

module.exports = {
    data: new SlashCommandBuilder()
        .setName('скажи-вубхуком')
        .setDescription('Бот напишет ваше сообщение в виде вебхука')
        .addStringOption(option => option.setName('сообщение').setDescription('Сообщение, которое должен будет отправить бот').setRequired(true))
        .setDefaultMemberPermissions(PermissionFlagsBits.Administrator)
        .setDMPermission(false),

    async execute(interaction) {
        const newEmbed = new EmbedBuilder()
            .setColor(BotColor)
            .setTitle(interaction.options.getString('сообщение'))

        await interaction.channel.send({ embeds: [newEmbed] })
        await interaction.reply({ content: 'Сообщение отправленно', ephemeral: true })
    },
};