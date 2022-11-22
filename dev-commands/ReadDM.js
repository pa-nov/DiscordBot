const { SlashCommandBuilder, PermissionFlagsBits, WebhookClient } = require('discord.js')
const { OwnerId, LogWebHookURL } = require('./../key.json')

module.exports = {
    data: new SlashCommandBuilder()
        .setName('прочитать')
        .setDescription('Получить личные сообщения с ботом')
        .addUserOption(option => option.setName('пользователь').setDescription('Пользователь, от которого нужно получить сообщения').setRequired(true))
        .addIntegerOption(option => option.setName('кол-во').setDescription('Количество сообщений, которые будут получены').setRequired(true))
        .setDefaultMemberPermissions(PermissionFlagsBits.Administrator)
        .setDMPermission(false),

    async execute(interaction) {
        const UserChannel = await interaction.options.getUser('пользователь').createDM()
        const LogWebHook = new WebhookClient({ url: LogWebHookURL })

        if (interaction.user.id != OwnerId) { return }
        await interaction.deferReply()

        await UserChannel.messages.fetch({ limit: interaction.options.getInteger('кол-во') }).then(async messages => {
            await interaction.editReply(`Сообщений получено: ${messages.size}`)

            await messages.forEach(async message => {
                var TimeStamp = new Date(message.createdTimestamp)

                await LogWebHook.send({
                    content: message.content,
                    username: `${message.author.tag} [${TimeStamp.toLocaleString()}] (${message.id})`,
                    avatarURL: message.author.displayAvatarURL({ dynamics: true, size: 256 }),
                    embeds: message.embeds,
                })
            })
        })
    },
}