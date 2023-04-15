const { SlashCommandBuilder } = require("@discordjs/builders");

module.exports = {
    data: new SlashCommandBuilder()
    .setName('deadline')
    .setDescription('Deadline Feature!!')
    .addSubcommand((cmd) => 
    cmd
    .setName('add')
    .setDescription("Add ypur upcoming deadline!!")
    .addStringOption((option) => 
    option
    .setName('date')
    .setDescription("Enter the Date in Format DD/MM/YYYY")
    .setRequired(true)
    )
    .addStringOption((option) =>
    option
    .setName('name')
    .setDescription('Set Description for your deadline')
    .setRequired(false)
    )
    )
   .addSubcommand((cmd) => 
   cmd
   .setName("list")
   .setDescription("Display list of all your deadlines!!")
   )
   .addSubcommand((cmd) => 
   cmd
   .setName("clear")
   .setDescription("Deletes all your deadlines")
   )
   .addSubcommand((cmd) => 
   cmd
   .setName("remove")
   .setDescription("Remove any particular deadline!!")
   .addStringOption((option) =>
   option
   .setName("deadlineid")
   .setDescription("Every deadline has its unique id!! \n Enter the ID")
   )
   )
}