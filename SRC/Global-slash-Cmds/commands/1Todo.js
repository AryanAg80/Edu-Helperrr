const { SlashCommandBuilder } = require('@discordjs/builders');

module.exports = {
    data: new SlashCommandBuilder()
        .setName("todo")
        .setDescription('Features for Weekly TodoList!')
        .addSubcommand((subcommand) =>
            subcommand
                .setName('add')
                .setDescription(`Adds a new task to your to-do list!`)
                .addStringOption((option) =>
                    option
                        .setName('task')
                        .setDescription('Task for to-do!!')
                        .setRequired(true)
                )
        )
        .addSubcommand((subcommand) =>
            subcommand
                .setName('done')
                .setDescription('Tick off your tasks!!')
                .addIntegerOption((option) =>
                    option
                        .setName('tasknumber')
                        .setDescription('Task number whish you wish to tick-off!!')
                        .setRequired(true)
                        .setMinValue(1)
                )
        )
        .addSubcommand((subcommand) =>
            subcommand
                .setName('list')
                .setDescription(`Displays your to-do list!`)
        )
        .addSubcommand((subcommand) =>
            subcommand
                .setName('reset')
                .setDescription("Resets yout to-do list!!")
        )
        .addSubcommand((subcommand) =>
            subcommand
                .setName("remove")
                .setDescription("Removes a particular task from your todo!!")
                .addIntegerOption((option) =>
                    option
                        .setName('number')
                        .setDescription("Task number which you wanna remove!!")
                        .setRequired(true)
                        .setMinValue(1)
                )
        )
        .addSubcommand((subcommand) =>
            subcommand
                .setName("score")
                .setDescription("displays your todo score!!")
        )
};

/**
 * Todo Add ✅
 * Task Done ✅
 * Todo List ✅
 * Todo Reset ✅
 * Task remove ✅
 * Todo Score ✅
 */