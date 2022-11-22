const { SlashCommandBuilder, PermissionFlagsBits } = require('discord.js')
const { OwnerId } = require('./../key.json')

module.exports = {
    data: new SlashCommandBuilder()
        .setName('удалить')
        .setDescription('Удалить личное сообщение')
        .addUserOption(option => option.setName('пользователь').setDescription('Пользователь, у которого нужно удалить сообщение').setRequired(true))
        .addStringOption(option => option.setName('сообщение').setDescription('ID Сообщения, которое нужно удалить').setRequired(true))
        .setDefaultMemberPermissions(PermissionFlagsBits.Administrator)
        .setDMPermission(false),

    async execute(interaction) {
        if (interaction.user.id != OwnerId) { return }
        const message = await (await interaction.options.getUser('пользователь').createDM()).messages.fetch(interaction.options.getString('сообщение'))
        if (!message.author.bot) { await interaction.reply('Сообщение отправленно пользователем'); return }
        await message.delete()
        await interaction.reply('Сообщение удалено')
    },
}