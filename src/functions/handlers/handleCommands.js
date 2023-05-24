const { REST } = require('@discordjs/rest');
const { Routes } = require('discord-api-types/v10');
const fs = require('fs');

module.exports = (client) => {
    client.handleCommands = async() => {
        const commandFolders = fs.readdirSync('./src/commands');
        for(const folder of commandFolders){
            const commandFiles = fs
            .readdirSync(`./src/commands/${folder}`)
            .filter(file => file.endsWith('.js'));

            const { commands, commandArray } = client;
            for(const file of commandFiles) {
                const command = require(`../../commands/${folder}/${file}`);
                commands.set(command.data.name, command);
                commandArray.push(command.data.toJSON());
            }
        }

        const clientId = '1065076439982026752'; // ID du bot
        const guildId = '976159558357647400'; // ID du serveur discord
        const rest = new REST({version: '9'}).setToken(process.env.token);
        try{
            console.log('Started refreshing application (/) commands.');
            await rest.put(
                Routes.applicationGuildCommands(clientId, guildId), {
                    body: client.commandArray,
                }
            );
        } catch (error) {
            console.error(error);
        }
    };
}