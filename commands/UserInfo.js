const { SlashCommandBuilder, EmbedBuilder } = require('discord.js')
const { BotColor } = require('./../settings.json')

module.exports = {
    data: new SlashCommandBuilder()
        .setName('профиль')
        .setDescription('Показывает информацию о пользователе')
        .addUserOption(option => option.setName('пользователь').setDescription('Пользователь, информацию о котором вы хотите увидеть'))
        .setDMPermission(false),

    async execute(interaction) {
        await interaction.deferReply()

        var User = interaction.user; if (interaction.options.getUser('пользователь') != null) { User = interaction.options.getUser('пользователь') }
        var Member; try { Member = await interaction.guild.members.fetch(User.id) } catch (error) { Member = null }

        var UserName = User.username; var MemberName = ''; var Joined = ''
        if (Member != null) {
            if (Member.nickname != null) { UserName = Member.nickname; MemberName = ` (${Member.nickname})` }
            Joined = `
**Дата присоединения:** <t:${Math.round(Member.joinedTimestamp / 1000)}:D> (<t:${Math.round(Member.joinedTimestamp / 1000)}:R>)`
        }

        const NewEmbed = new EmbedBuilder()
            .setColor(BotColor)
            .setTitle(`Профиль ${UserName}`)
            .setThumbnail(User.displayAvatarURL({ dynamics: true, size: 128 }))
            .setDescription(`
**Имя пользователя:** ${User.tag}${MemberName}
**Дата регистрации:** <t:${Math.round(User.createdTimestamp / 1000)}:D> (<t:${Math.round(User.createdTimestamp / 1000)}:R>)${Joined}`)
            .setFooter({ text: `ID: ${User.id}` })

        await interaction.editReply({ embeds: [NewEmbed] })
    },
}