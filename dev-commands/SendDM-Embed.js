const { SlashCommandBuilder, PermissionFlagsBits, EmbedBuilder } = require('discord.js')
const { BotColor } = require('./../settings.json')
const { OwnerId } = require('./../key.json')

module.exports = {
    data: new SlashCommandBuilder()
        .setName('отправить-вубхук')
        .setDescription('Оправить личное сообщение')
        .addUserOption(option => option.setName('пользователь').setDescription('Пользователь, которому нужно отправить сообщение').setRequired(true))
        .addStringOption(option => option.setName('сообщение').setDescription('Сообщение, которое должен отправить карась').setRequired(true))
        .setDefaultMemberPermissions(PermissionFlagsBits.Administrator)
        .setDMPermission(false),

    async execute(interaction) {
        await interaction.deferReply()

        const newEmbed = new EmbedBuilder()
            .setColor(BotColor)
            .setTitle(interaction.options.getString('сообщение'))

        if (interaction.user.id != OwnerId) { return }

        (await interaction.options.getUser('пользователь').createDM()).send({ embeds: [newEmbed] })

        await interaction.editReply('Сообщение отправленно')
    },
};