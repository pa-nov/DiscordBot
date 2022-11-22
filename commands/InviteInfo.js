const { SlashCommandBuilder, EmbedBuilder } = require('discord.js')
const { BotColor } = require('./../settings.json')

module.exports = {
    data: new SlashCommandBuilder()
        .setName('инвайт')
        .setDescription('Показывает информацию о приглашении на сервер')
        .addStringOption(option => option.setName('приглашение').setDescription('URL или код приглашения').setRequired(true))
        .setDMPermission(false),

    async execute(interaction) {
        await interaction.deferReply()

        var Invite
        try {
            Invite = await interaction.client.fetchInvite(interaction.options.getString('приглашение'))
        } catch (error) {
            const NewEmbed = new EmbedBuilder().setColor(BotColor).setTitle(`Приглашение недействительно`)
            await interaction.editReply({ embeds: [NewEmbed] }); return
        }

        var Description = ''; if (Invite.guild.description != null) { Description = `**Описание:** ${Invite.guild.description}` }
        var Expires = ''; if (Invite.expiresTimestamp != null) { Expires = `**Приглашение истекает** <t:${Math.round(Invite.expiresTimestamp / 1000)}:R>
` }

        const NewEmbed = new EmbedBuilder()
            .setColor(BotColor)
            .setTitle(`Информация о приглашении на ${Invite.guild.name}`)
            .setThumbnail(Invite.guild.iconURL({ dynamics: true, size: 128 }))
            .setDescription(`
${Description}
**Дата создания сервера:** <t:${Math.round(Invite.guild.createdTimestamp / 1000)}:D> (<t:${Math.round(Invite.guild.createdTimestamp / 1000)}:R>)
${Expires}**Уровень защиты:** ${GetLevel(Invite.guild.verificationLevel)}
`)
            .addFields(
                { name: '**Участники:**', value: `${Invite.memberCount}`, inline: true },
                { name: '**В сети:**', value: `${Invite.presenceCount}`, inline: true },
                { name: '**Бусты:**', value: `${Invite.guild.premiumSubscriptionCount}`, inline: true },

                { name: '**ID Пригласившего:**', value: `${Invite.inviterId}`, inline: true },
                { name: '**Канал приглашения:**', value: `${Invite.channel.name}`, inline: true },
                { name: '**ID Канала приглашения:**', value: `${Invite.channel.id}`, inline: true },
            )
            .setFooter({text:`ID Сервера: ${Invite.guild.id}`})

        await interaction.editReply({ embeds: [NewEmbed] })
    },
}

function GetLevel(number) {
    if (number == 0) { return ('Отсутствует') }
    if (number == 1) { return ('Низкий') }
    if (number == 2) { return ('Средний') }
    if (number == 3) { return ('Высокий') }
    if (number == 4) { return ('Самый высокий') }
    return (number)
}