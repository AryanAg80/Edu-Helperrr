const { timer, showtimer } = require("../functions/13timers");
const { DeadlineADD, DeadlineList, Deadlineclear, DeadlineRemove } = require("../functions/6Deadline_Module");

module.exports = (client) => {
    client.on('interactionCreate', async interaction => {
        if (!interaction.isCommand()) return;
        if (interaction.channel.type === "DM") return;
        const {
            StudyTime,
            TODOADD,
            TODODONE,
            TODOREMOVE,
            TODORESET,
            TODOSCORE,
            TODOLIST,
        } = require("../functions/1slash");
        const { commandName } = interaction;

        if (commandName === "help") {
            help(interaction);
        }

        const { Permissions } = require("discord.js");



        if (commandName === "todo") {
            const SUB = interaction.options.getSubcommand();
            if (SUB === "add") {
                TODOADD(interaction);
            }
            if (SUB === "done") {
                TODODONE(interaction);
            }
            if (SUB === "list") {
                TODOLIST(interaction);
            }
            if (SUB === "reset") {
                TODORESET(interaction);
            }
            if (SUB === "remove") {
                TODOREMOVE(interaction);
            }
            if (SUB === "score") {
                TODOSCORE(interaction);
            }
        }

            if (commandName === "timer") {
            const SUB = interaction.options.getSubcommand()

            if (SUB === "set-timer") {
                     timer(interaction);
            }
            if (SUB === "showtimers") {
                showtimer(interaction);
            }
        }

        if (commandName === "studytime") {
            StudyTime(interaction);
        }

        if (commandName === "deadline") {
            const Sub = interaction.options.getSubcommand();
            if (Sub === "add") {
                DeadlineADD(interaction);
            }
            if (Sub === "list") {
                DeadlineList(interaction);
            }
            if (Sub === "clear") {
                Deadlineclear(interaction);
            }
            if (Sub === "remove") {
                DeadlineRemove(interaction);
            }
        }
    });

} 