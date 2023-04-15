const { SlashCommandBuilder } = require("@discordjs/builders"); 

module.exports = {
    data: new SlashCommandBuilder()
    .setName("timer")
    .setDescription("Set timer!!")
   .addSubcommand((cmd) => 
   cmd
   .setName("set-timer")
   .setDescription("timer in minutes")
   .addNumberOption((opt) => 
   opt
   .setName("duration")
   .setDescription("Duration in minutes!!")
   )
   .addStringOption((opt) => 
   opt
   .setName("description")
   .setDescription(`Description of the timer!!`)
   )
   )
   .addSubcommand((cmd) => 
   cmd
   .setName("showtimers")
   .setDescription("Display all the ongoing timers")
   )
    
}