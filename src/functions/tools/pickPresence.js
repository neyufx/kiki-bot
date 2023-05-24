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

        const options = [
            {
                type: ActivityType.Watching,
                text: `${conti.data.Data.clients}/${conti.data.Data.sv_maxclients} joueurs`,
                status: "dnd"
            },
            {
                type: ActivityType.Listening,
                text: `${conti.data.Data.clients}/${conti.data.Data.sv_maxclients} joueurs`,
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