const { ContextMenuCommandBuilder, ApplicationCommandType, EmbedBuilder } = require('discord.js')
const { BotColor } = require('./../settings.json')

module.exports = {
    data: new ContextMenuCommandBuilder()
        .setName('Информация')
        .setType(ApplicationCommandType.User)
        .setDMPermission(false),

    async execute(interaction) {
        await interaction.deferReply()

        const User = interaction.targetUser; const Member = interaction.targetMember
        var UserName = User.username; var MemberName = ''
        if (Member.nickname != null) { UserName = Member.nickname; MemberName = ` (${Member.nickname})` }

        const NewEmbed = new EmbedBuilder()
            .setColor(BotColor)
            .setTitle(`Информация о пользователе "${UserName}"`)
            .setThumbnail(User.displayAvatarURL({ dynamics: true, size: 128 }))
            .setDescription(`
**Имя пользователя:** ${User.tag}${MemberName}
**Дата регистрации:** <t:${Math.round(User.createdTimestamp / 1000)}:D> (<t:${Math.round(User.createdTimestamp / 1000)}:R>)
**Дата присоединения:** <t:${Math.round(Member.joinedTimestamp / 1000)}:D> (<t:${Math.round(Member.joinedTimestamp / 1000)}:R>)`)
            .setFooter({ text: `ID: ${User.id}` })

        await interaction.editReply({ embeds: [NewEmbed] })
    },
}