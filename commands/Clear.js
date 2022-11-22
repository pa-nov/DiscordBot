const { SlashCommandBuilder, PermissionFlagsBits } = require('discord.js')

module.exports = {
    data: new SlashCommandBuilder()
        .setName('очистить')
        .setDescription('Удалить определённое количество сообщений в этом канале')
        .addIntegerOption(option => option.setName('кол-во').setDescription('Количество сообщения (Макс: 100)').setRequired(true))
        .setDefaultMemberPermissions(PermissionFlagsBits.ManageMessages)
        .setDMPermission(false),

    async execute(interaction) {
        await interaction.reply({ content: 'Сообщения удаляются', ephemeral: true })
        var Count = interaction.options.getInteger('кол-во'); if (Count < 1) { Count = 1 }; if (Count > 100) { Count = 100 }

        await interaction.channel.bulkDelete(Count).then(async count => { await interaction.channel.send(`Сообщений удалено: ${count.size}`) })
    },
};