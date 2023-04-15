const { MessageEmbed } = require("discord.js");
const T1 = require("../schema/13timers");

async function timer (interaction) {
   const time = interaction.options.getNumber("duration");
   const description = interaction.options.getString("description");
   const ms = require("ms")
   const moment = require("moment")
   const GG = interaction.guild.id
   const user = interaction.member.id
   const Channel = interaction.channel.id

   const timechoose = ms(`${time}m`)
   let starttime = new Date(Date.now());
   let endtime = new Date(starttime.getTime() + timechoose);
   let structuretime = moment(endtime).format("DD/MM/YYYY-HH:mm");
   const Timers = structuretime
   let TimeStamp = `<t:${Math.floor( new Date(endtime).getTime() / 1000)}:F>`
    var tagalong;
   if (description) {
    tagalong = description;
   }
   else { 
   tagalong = "Timer End!!";
   } 

   const Text = tagalong

   const input = {
    GG,
    user,
    Timers,
    Text,
    TimeStamp,
    Channel,
   }
   const T2 = await new T1(input).save()

   const embed = new MessageEmbed()
   .setTitle(`${interaction.user.tag}`)
   .setTimestamp()
   .addFields(
    { name: "⏰Timer started!", value: `<@${user}> ${tagalong}`, inline: false},
    {name: "Duration", value: `${time} minutes`, inline: true},
    { name: "Ends", value: `${TimeStamp}`, inline: true},
   )

   await interaction.reply({
    embeds: [embed],
   });

}

async function showtimer (interaction) {
    const GG = interaction.guild.id

    const T3 = await T1.find({
        GG,
    })
       var Timers = "Server Timers: \n\n"
        if (T3 && T3.length > 0) {
             for (rr of T3) {
                Timers += `➡️ <@${rr.user}>'s Timer ${rr.TimeStamp} - ${rr.Text} \n`
             }
            }else {
                Timers += "no timers ongoing!!"
            }

             const Embed = new MessageEmbed()
             .setColor('RANDOM')
             .setDescription(Timers)

             await interaction.reply({
                embeds: [Embed],
             });
}


module.exports = {
    timer,
    showtimer
}