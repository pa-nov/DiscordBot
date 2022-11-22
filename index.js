const { Client, GatewayIntentBits, Events, Collection, ActivityType } = require('discord.js')
const { BotToken } = require('./key.json')

const client = new Client({ intents: [GatewayIntentBits.Guilds] })
client.commands = new Collection()
for (const file of require('node:fs').readdirSync('./commands').filter(file => file.endsWith('.js'))) {
    const command = require(`./commands/${file}`)
    client.commands.set(command.data.name, command)
}
for (const file of require('node:fs').readdirSync('./dev-commands').filter(file => file.endsWith('.js'))) {
    const command = require(`./dev-commands/${file}`)
    client.commands.set(command.data.name, command)
}
client.login(BotToken)

client.once(Events.ClientReady, c => { for (var i = 0; i < c.guilds.cache.size; i++) { Log(`Сервер #${i + 1}: ${c.guilds.cache.at(i).name}`) }; UpdateActivity() })
client.on(Events.GuildCreate, guild => { Log(`Бот добавлен на сервер: ${guild.name}`); UpdateActivity() })
client.on(Events.GuildDelete, guild => { Log(`Бот удалён с сервера: ${guild.name}`); UpdateActivity() })

client.on(Events.InteractionCreate, async interaction => {
    const command = interaction.client.commands.get(interaction.commandName); if (!command) return
    Log(`${interaction.user.tag} (${interaction.user.id}) использует команду "${interaction.commandName}" на ${interaction.guild.name} (${interaction.guild.id})`)

    try { await command.execute(interaction) } catch (error) { console.error(error) }
})

// Функции

function UpdateActivity() {
    const Servers = client.guilds.cache.size
    var ServersText = 'серверов'

    if (Math.floor(Servers % 100 / 10) != 1) {
        if (Math.floor(Servers % 10) == 1) { ServersText = 'сервер' }
        if (Math.floor(Servers % 10) == 2 || Math.floor(Servers % 10) == 3 || Math.floor(Servers % 10) == 4) { ServersText = 'сервера' }
    }

    client.user.setActivity({ name: `${Servers} ${ServersText}`, type: ActivityType.Listening })
    Log(`Бот запущен на серверах: ${Servers}`)
}

function Log(string) {
    const date = new Date(Date.now())
    console.log(date.toLocaleString() + ': ' + string)
}