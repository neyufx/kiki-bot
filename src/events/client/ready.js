module.exports = {
    name: 'ready',
    once: true,
    async execute(client) {
        setInterval(client.pickPresence, 7 * 1000); // 5 secondes
        console.log(`Connecté en tant que ${client.user.tag} !`);
    }
}