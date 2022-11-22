const { ContextMenuCommandBuilder, ApplicationCommandType, EmbedBuilder } = require('discord.js')
const { BotColor } = require('./../settings.json')

module.exports = {
    data: new ContextMenuCommandBuilder()
        .setName('Аватар')
        .setType(ApplicationCommandType.User)
        .setDMPermission(false),

    async execute(interaction) {
        await interaction.deferReply()

        const NewEmbed = new EmbedBuilder()
            .setColor(BotColor)
            .setTitle(`Аватар "${interaction.targetMember.user.username}"`)
            .setImage(interaction.targetUser.displayAvatarURL({ dynamics: true, size: 512 }))

        await interaction.editReply({ embeds: [NewEmbed] })
    },
}