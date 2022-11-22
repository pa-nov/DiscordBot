const { SlashCommandBuilder, EmbedBuilder } = require('discord.js')
const { BotColor } = require('./../settings.json')

module.exports = {
    data: new SlashCommandBuilder()
        .setName('рандом')
        .setDescription('Выберет случайное целое число в указанном диапазоне')
        .addIntegerOption(option => option.setName('от').setDescription('Начальное число диапазона').setRequired(true))
        .addIntegerOption(option => option.setName('до').setDescription('Конечное число диапазона').setRequired(true))
        .setDMPermission(false),

    async execute(interaction) {
        await interaction.deferReply()

        const Min = interaction.options.getInteger('от')
        const Max = interaction.options.getInteger('до')
        const newEmbed = new EmbedBuilder()
            .setColor(BotColor)
            .setTitle(`Ваше число: ${Math.round(Math.random() * (Max - Min) + Min)}`)

        await interaction.editReply({ embeds: [newEmbed] })
    },
};