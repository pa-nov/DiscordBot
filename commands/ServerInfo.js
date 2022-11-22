const { SlashCommandBuilder, EmbedBuilder } = require('discord.js')
const { BotColor } = require('./../settings.json')

module.exports = {
    data: new SlashCommandBuilder()
        .setName('сервер')
        .setDescription('Показывает информацию о сервере')
        .addStringOption(option => option.setName('сервер').setDescription('ID сервера, информацию о котором вы хотите увидеть'))
        .setDMPermission(false),

    async execute(interaction) {
        await interaction.deferReply()

        var Server = interaction.guild
        try {
            if (interaction.options.getString('сервер') != null) { Server = await interaction.client.guilds.fetch(interaction.options.getString('сервер')) }
        } catch (error) {
            const NewEmbed = new EmbedBuilder().setColor(BotColor).setTitle(`У бота нету доступа к этому серверу`)
            await interaction.editReply({ embeds: [NewEmbed] }); return
        }
        var Description = ''; if (Server.description != null) { Description = `**Описание:** ${Server.description}` }

        const NewEmbed = new EmbedBuilder()
            .setColor(BotColor)
            .setTitle(`Информация о ${Server.name}`)
            .setThumbnail(Server.iconURL({ dynamics: true, size: 128 }))
            .setDescription(`
${Description}
**Дата создания:** <t:${Math.round(Server.createdTimestamp / 1000)}:D> (<t:${Math.round(Server.createdTimestamp / 1000)}:R>)
**Владелец:** ${(await Server.fetchOwner()).user.tag} (ID: ${(await Server.fetchOwner()).id})`)
            .addFields(
                { name: '**Участники:**', value: `${Server.memberCount}`, inline: true },
                { name: '**Каналы:**', value: `${Server.channels.channelCountWithoutThreads}`, inline: true },
                { name: '**Роли:**', value: `${Server.roles.cache.size - 1}`, inline: true },

                { name: '**Уровень проверки:**', value: `${GetLevel(Server.verificationLevel)}`, inline: true },
                { name: '**Бусты:**', value: `${Server.premiumSubscriptionCount}`, inline: true },
                { name: '**Расположение:**', value: `${Server.preferredLocale}`, inline: true },
            )
            .setFooter({ text: `ID: ${Server.id}` })
        
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