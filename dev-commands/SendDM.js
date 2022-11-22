const { SlashCommandBuilder, PermissionFlagsBits } = require('discord.js')
const { OwnerId } = require('./../key.json')

module.exports = {
    data: new SlashCommandBuilder()
        .setName('отправить')
        .setDescription('Оправить личное сообщение')
        .addUserOption(option => option.setName('пользователь').setDescription('Пользователь, которому нужно отправить сообщение').setRequired(true))
        .addStringOption(option => option.setName('сообщение').setDescription('Сообщение, которое должен отправить карась').setRequired(true))
        .setDefaultMemberPermissions(PermissionFlagsBits.Administrator)
        .setDMPermission(false),

    async execute(interaction) {
        await interaction.deferReply()

        if (interaction.user.id != OwnerId) { return }

        (await interaction.options.getUser('пользователь').createDM()).send(interaction.options.getString('сообщение'))

        await interaction.editReply('Сообщение отправленно')
    },
};