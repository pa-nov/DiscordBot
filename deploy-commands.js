const { REST, Routes } = require('discord.js')
const { BotToken, BotId, ServerId } = require('./key.json')

const commands = []
const devcommands = []

for (const file of require('node:fs').readdirSync('./commands').filter(file => file.endsWith('.js'))) {
    const command = require(`./commands/${file}`)
    commands.push(command.data.toJSON())
    console.log(`Команда(${commands.length}) ${file} обработанна`)
}
for (const file of require('node:fs').readdirSync('./dev-commands').filter(file => file.endsWith('.js'))) {
    const command = require(`./dev-commands/${file}`)
    devcommands.push(command.data.toJSON())
    console.log(`Команда разработчика(${devcommands.length}) ${file} обработанна`)
}

(async () => {
    const rest = new REST({ version: '10' }).setToken(BotToken)
    const devrest = new REST({ version: '10' }).setToken(BotToken)

    try {
        console.log(`Начало загрузки команд: ${commands.length}`)
        const data = await rest.put(
            Routes.applicationCommands(BotId),
            { body: commands },
        );
        console.log(`Загруженно команд: ${data.length}`)
    } catch (error) {
        console.error(error)
    }
    try {
        console.log(`Начало загрузки команд разработчика: ${devcommands.length}`)
        const devdata = await devrest.put(
            Routes.applicationGuildCommands(BotId, ServerId),
            { body: devcommands },
        );
        console.log(`Загруженно команд разработчика: ${devdata.length}`)
    } catch (error) {
        console.error(error)
    }
})()