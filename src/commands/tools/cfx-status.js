const { SlashCommandBuilder, EmbedBuilder } = require('discord.js');
const axios = require("axios");

module.exports = {
    data: new SlashCommandBuilder()
        .setName('cfx-status')
        .setDescription('Affiche le statut CFX'),
    async execute(interaction, client) {

        const incidents = await axios.get('https://status.cfx.re/api/v2/incidents/unresolved.json', {
          headers: {
            'Content-Type': 'application/json'
          }
        });

        const status = await axios.get('https://status.cfx.re/api/v2/status.json', {
          headers: {
            'Content-Type': 'application/json'
          }
        });

        const conti = await axios.get('https://servers-frontend.fivem.net/api/servers/single/eazypm', {
          headers: {
            'Host': 'servers-frontend.fivem.net',
            'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64; rv:100.0) Gecko/20100101 Firefox/100.0',
            'Accept': 'application/json, text/plain, */*',
            'Origin': 'https://servers.fivem.net/',
            'DNT': '1',
            'Connection': 'keep-alive',
            'Alt-Used': 'servers-frontend.fivem.net',
            'Sec-Fetch-Dest': 'Document',
            'Sec-Fetch-Mode': 'cors',
            'Sec-Fetch-Site': 'none',
            'Pragma': 'no-cache',
            'Upgrade-Insecure-Requests': '1',
            'Cache-Control': 'no-cache',
            'TE': 'trailers'
          }
        });

        if(status.data.status.description == 'All Systems Operational')
        {
            const embed = new EmbedBuilder()
            .setTitle('Status de FiveM')
            .setFields([
                {
                    name: "Server Status",
                    value: `\`🟢 Online\``,
                    inline: true
                },
                {
                    name: "Nombre de joueurs",
                    value: `\`${conti.data.Data.clients}/${conti.data.Data.sv_maxclients} \``,
                    inline: true
                },
            ])
            .setThumbnail('https://dunb17ur4ymx4.cloudfront.net/webstore/logos/69532cd8294079e6fc20d8b9382bbc64eb3ef9c1.gif')
            .setColor(0x00FFFF)
            .setAuthor({
                name: interaction.user.username,
                iconURL: interaction.user.displayAvatarURL()
            })
            .setTimestamp(Date.now());

            await interaction.reply({
                embeds: [embed]
            })
        }else if(status.data.status.description == 'Partial System Outage'){
            const embed = new EmbedBuilder()
            .setTitle('Status de FiveM')
            .setFields([
                {
                    name: "Server Status",
                    value: `\`🟠 Panne Partielle \``,
                    inline: true
                },
                {
                    "name":"Incidents",
                    "value": incidents.data.incidents[0].name,
                    "inline": true
                },
                {
                    name: "Nombre de joueurs",
                    value: `\`${conti.data.Data.clients}/${conti.data.Data.sv_maxclients} \``,
                    inline: true
                },
            ])
            .setThumbnail('https://dunb17ur4ymx4.cloudfront.net/webstore/logos/69532cd8294079e6fc20d8b9382bbc64eb3ef9c1.gif')
            .setColor(0x00FFFF)
            .setAuthor({
                name: interaction.user.username,
                iconURL: interaction.user.displayAvatarURL()
            })
            .setTimestamp(Date.now());

            await interaction.reply({
                embeds: [embed]
            })
        } else {
            const embed = new EmbedBuilder()
            .setTitle('Status de FiveM')
            .setFields([
                {
                    name: "Server Status",
                    value: `\` Panne Inconnu \``,
                    inline: true
                },
                {
                    name: "Nombre de joueurs",
                    value: `\`${conti.data.Data.clients}/${conti.data.Data.sv_maxclients} \``,
                    inline: true
                },
            ])
            .setThumbnail('https://dunb17ur4ymx4.cloudfront.net/webstore/logos/69532cd8294079e6fc20d8b9382bbc64eb3ef9c1.gif')
            .setColor(0x00FFFF)
            .setAuthor({
                name: interaction.user.username,
                iconURL: interaction.user.displayAvatarURL()
            })
            .setTimestamp(Date.now());

            await interaction.reply({
                embeds: [embed]
            })
        }
    },
};