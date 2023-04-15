module.exports = {
    commands: "try",
    minArgs: 0,
    callback: async (message) => {
     const G1 = require("../../Models/1.try");

     const { guild, author } = message;

     const J1 = await G1.findOneAndUpdate({
        GG: guild.id,
        user: author.id,
     },{
        GG: guild.id,
        user: author.id,
     },{
        upsert: true,
        new: true,
     });

     console.log(J1);

     message.reply("Added data to db");
     }
}