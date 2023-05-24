const { SlashCommandBuilder, StringSelectMenuBuilder, StringSelectMenuOptionBuilder, ActionRowBuilder } = require('discord.js');
const axios = require("axios");

module.exports = {
    data: new SlashCommandBuilder()
        .setName("stalk")
        .setDescription("Stalker les kiki 👀"),
    async execute(interaction, client) {
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

        const select = new StringSelectMenuBuilder()
			.setCustomId('sub-menu')
			.setPlaceholder('Sélectionne la personne a stalk 👀')
			.addOptions(
				new StringSelectMenuOptionBuilder()
					.setLabel('Papy')
					.setDescription('Le vieux crouton 👴.')
					.setValue('Papy'),
				new StringSelectMenuOptionBuilder()
					.setLabel('Koliau')
					.setDescription('Kokoriko 🐇.')
					.setValue('Koliau'),
				new StringSelectMenuOptionBuilder()
					.setLabel('AzuRa')
					.setDescription('Zuzu 🦄.')
					.setValue('AzuRa'),
                new StringSelectMenuOptionBuilder()
                    .setLabel('Neyu')
                    .setDescription('Neyu le boss 👑.')
                    .setValue('Neyu'),
                new StringSelectMenuOptionBuilder()
                    .setLabel('Neon')
                    .setDescription('Néné le charo 😍.')
                    .setValue('Neon'),
                new StringSelectMenuOptionBuilder()
                    .setLabel('Zaza')
                    .setDescription('La coccinelle 🐞.')
                    .setValue('Zaza'),
                new StringSelectMenuOptionBuilder()
                    .setLabel('Gogo')
                    .setDescription('Gogolito 🤕.')
                    .setValue('Gogo'),
			);

		const row = new ActionRowBuilder()
			.addComponents(select);

		await interaction.reply({
			content: 'Sélectionne le gogole !',
			components: [row],
		});
    }
}