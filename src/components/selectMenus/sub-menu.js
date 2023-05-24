const axios = require("axios");

module.exports = {
    data: {
        name: `sub-menu`
    },
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
        
        
        try {
            let license = '';
            switch (interaction.values[0]){
                case 'Papy':
                    license = 'license:d156dc0f3f7c1a8f6048c10df8226b8a303147f3';
                    break;
                case 'Koliau':
                    license = 'license:392e21bfb29c6180616162dd573472ae73d6d516';
                    break;
                case 'AzuRa':
                    license = 'license:fa474b0a3eb77ed9ed67b7021ba318b03b64e5ab';
                    break;
                case 'Neyu':
                    license = 'license:11685ee9e3f76b46ce1e6dac8e6cb2b646ca2140';
                    break;
                case 'Neon':
                    license = 'license:3a80e2faa87f9c7ea1d612f9d82adae5a0f19cc0';
                    break;
                case 'Zaza':
                    license = 'license:5ef09defedd6c0dda048515a8a450723c991713a';
                    break;
                case 'Gogo':
                    license = 'license:ce0a050780d78b7ec5ea125f6f4f4b61aee7b822';
                    break;
            }
            let licenseExists = conti.data.Data.players.some(data => data.identifiers.includes(license));
            let objectWithLicense = conti.data.Data.players.find(data => data.identifiers.includes(license));
            if(licenseExists) {
                await interaction.reply({
                    content: `👀 ${interaction.values[0]} _est connecté avec l'id :_ **${objectWithLicense.id}** ! 👀`
                });
            }else {
                await interaction.reply({
                    content: `_Cette personne n'est pas connecté :_ **${interaction.values[0]}**`
                });
            }
        } catch (err) {
            console.error(err);
        }
    }
}