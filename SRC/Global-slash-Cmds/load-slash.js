module.exports = (client) => {
    const { REST } = require('@discordjs/rest');
    const { Routes } = require('discord-api-types/v9');
    const fs = require('node:fs');
    const path = require("path");
    const commands = [];
    const commandFiles = fs.readdirSync(path.join(__dirname, './commands')).filter(file => file.endsWith('.js'));

    const clientId = '831602542206386186';

    for (const file of commandFiles) {
        const command = require(`./commands/${file}`);

        //client.commands.set(command.data.name, command);
        console.log(`Enabling slash cmd ${file}`)

        commands.push(command.data.toJSON());
    }

    const rest = new REST({ version: '9' }).setToken(process.env.Token);

    (async () => {
        try {
            console.log('Started refreshing application (/) commands.');

            await rest.put(
                Routes.applicationCommands(clientId),
                { body: commands },
            );

            console.log('Successfully reloaded application (/) commands.');
        } catch (error) {
            console.error(error);
        }
    })();
}

// path.join(__dirname, './commands')