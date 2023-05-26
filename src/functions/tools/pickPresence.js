const { ActivityType } = require("discord.js");
const axios = require("axios");

module.exports = (client) => {
    client.pickPresence = async () => {

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

        const licenses = [
            'license:d156dc0f3f7c1a8f6048c10df8226b8a303147f3',
            'license:392e21bfb29c6180616162dd573472ae73d6d516',
            'license:fa474b0a3eb77ed9ed67b7021ba318b03b64e5ab',
            'license:11685ee9e3f76b46ce1e6dac8e6cb2b646ca2140',
            'license:3a80e2faa87f9c7ea1d612f9d82adae5a0f19cc0',
            'license:5ef09defedd6c0dda048515a8a450723c991713a',
            'license:ce0a050780d78b7ec5ea125f6f4f4b61aee7b822'
        ];

        let nbKiki = 0;

        for (let license of licenses) {
            if(conti.data.Data.players.find(data => data.identifiers.includes(license))){
                nbKiki++
            }
        }
        const options = [
            {
                type: ActivityType.Watching,
                text: `${conti.data.Data.clients}/${conti.data.Data.sv_maxclients} joueurs`,
                status: "dnd"
            },
            {
                type: ActivityType.Listening,
                text: `${nbKiki}/${licenses.length} kiki en jeu`,
                status: "online"
            }
        ]

        const option = Math.floor(Math.random() * options.length);

        client.user.setPresence({
            activities: [
            {
                name: options[option].text,
                type: options[option].type,
            },
        ],
            status: options[option].status
        });
    }
}