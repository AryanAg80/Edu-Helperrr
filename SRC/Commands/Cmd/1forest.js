module.exports = {
    commands: "forest", 
    minArgs: 1,
    maxArgs: 3,
    callback: async (message, arguments) => {
        const { guild, author} = message

        const code = arguments[0];
        const startingTime = arguments[1];
        const SessionTime = arguments[2];

         const {MessageButton, MessageActionRow, MessageEmbed} = require("discord.js");


         const Embed = new MessageEmbed()
         .setColor("RANDOM")
         .setDescription(`<@${author.id}> wants to plant a tree 🌲 \n**Code:** **${code}** \t\t**Starting in:** ${startingTime} minutes \n **Session Time:** ${SessionTime} minutes`)
         .setImage("https://www.forestapp.cc/img/intro1.png")

         const row = new MessageActionRow() 
         .addComponents (
            new MessageButton()
            .setStyle("LINK")
            .setURL(`https://forestapp.cc/join-room?token=${code}`)
            .setLabel("Forest App")
            .setEmoji("🔗")
         )

         message.channel.send({
            embeds: [Embed],
            components: [row],
         });

         
    }
}