const { SlashCommandBuilder, PermissionFlagsBits } = require('discord.js')

module.exports = {
    data: new SlashCommandBuilder()
        .setName('скажи')
        .setDescription('Бот напишет ваше сообщение')
        .addStringOption(option => option.setName('сообщение').setDescription('Сообщение, которое должен будет отправить бот').setRequired(true))
        .setDefaultMemberPermissions(PermissionFlagsBits.Administrator)
        .setDMPermission(false),

    async execute(interaction) {
        await interaction.channel.send(interaction.options.getString('сообщение'))
        await interaction.reply({ content: 'Сообщение отправленно', ephemeral: true })
    },
};