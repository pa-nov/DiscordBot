const { ContextMenuCommandBuilder, ApplicationCommandType, PermissionFlagsBits } = require('discord.js')

module.exports = {
    data: new ContextMenuCommandBuilder()
        .setName('Создать опрос')
        .setType(ApplicationCommandType.Message)
        .setDefaultMemberPermissions(PermissionFlagsBits.Administrator)
        .setDMPermission(false),

    async execute(interaction) {
        await interaction.targetMessage.react('<:Pepe_ThumbsUp:852845202393268234>')
        await interaction.targetMessage.react('<:Pepe_ThumbsDown:852845202174378015>')
        await interaction.reply({ content: 'Реакции добавлены', ephemeral: true })
    },
}