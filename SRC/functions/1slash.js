const S8 = require("../schema/11todo");
const S9 = require("../schema/12Todo");
const { ADDCoins } = require("./2Addcoins");

async function TODOADD(interaction) {
    const GG = interaction.guild.id
    const user = interaction.member.id
    const TODO = interaction.options.getString("task");
   
        const T1 = await S8.findOneAndUpdate({
            GG,
            user,
        }, {
            user,
            $inc: {
                TodoCounting: 1,
            }
        }, {
            upsert: true,
            new: true
        })
            .exec()

        const C1 = await S8.findOne({
            GG,
            user,
        })
        if (C1) {
            let TodoCount = await C1.TodoCounting
            let TodoList = {
                GG,
                user,
                TodoCount,
                TODO
            }

            await new S9(TodoList).save()

            await interaction.reply(`Saved your Task **${TodoCount} --- ${TODO}**`);
        }
        // We will add reminder function in the end!! Let's just go with basic first!!
    
}

async function TODODONE(interaction) {
    
    const GG = interaction.guild.id
    const user = interaction.member.id
    const TodoCount = interaction.options.getInteger("tasknumber")
    ADDCoins(user, 1);
        const T1 = await S9.find({
            GG,
            user,
            TodoCount,
        })

        if (T1) {
            for (QQ of T1) {
                const Goal = QQ.TODO
                const TODO = `~~${Goal}~~`
                const TG = await S9.findOneAndUpdate({
                    GG,
                    user,
                    TodoCount,
                }, {
                    TODO,
                }, {
                    upsert: true,
                })
                await interaction.reply(`Ticked your task!! ${Goal}`);

                const T2 = await S8.findOneAndUpdate({
                    GG,
                    user,
                }, {
                    user,
                    $inc: {
                        Score: 2,
                    },
                }, {
                    upsert: true,
                    new: true,
                })
            }
        } else return await interaction.reply(`You do not have any todo list!!`);

   
}

async function TODOLIST(interaction) {
    const GG = interaction.guild.id
    const Icon = interaction.guild.iconURL()
    const user = interaction.member.id
    const { MessageEmbed } = require("discord.js");

    
        const T3 = await S9.find({
            GG,
            user,
        })

        if (T3 && T3.length > 0) {
            let Sorting = T3
            let reply = `\n`
            for (WW of Sorting) {
                reply += `**${WW.TodoCount}.** *${WW.TODO}* \n`
            }

            const Embed2 = new MessageEmbed()
                .setTitle(`To-do List:`)
                .setThumbnail(`https://cdn.pixabay.com/photo/2017/06/10/07/18/list-2389219_1280.png`)
                .setTimestamp()
                .setDescription(reply)
                .setFooter({
                    text: "FriendlyBot",
                    iconURL: Icon,
                })

            await interaction.reply({ content: `<@${user}>`, embeds: [Embed2] });
        } else return await interaction.reply(`You do not have any todo list!!`);

    
}

async function TODORESET(interaction) {
    const GG = interaction.guild.id
    const user = interaction.member.id

    
        const T5 = await S9.deleteMany({
            GG,
            user,
        });

        const T6 = await S8.findOneAndUpdate({
            GG,
            user,
        }, {
            user,
            TodoCounting: 0,
        }, {
            upsert: true,
        });
        await interaction.reply(`Deleted all your tasks!!`);
   
}

async function TODOREMOVE(interaction) {
    const GG = interaction.guild.id
    const user = interaction.member.id
    const TodoCount = interaction.options.getInteger("number");
   
        const T1 = await S9.find({
            GG,
            user,
            TodoCount,
        })
        if (T1) {
            for (qq of T1) {
                const Goal = qq.TODO
                await interaction.reply(`Deleted your task ${Goal}`);
            }
            const T5 = await S9.findOneAndDelete({
                GG,
                user,
                TodoCount,
            })
        } else return await interaction.reply(`There is no task with ${TodoCount}`);
    
}

async function TODOSCORE(interaction) {
    const GG = interaction.guild.id
    const user = interaction.member.id


        const T1 = await S8.find({
            GG,
            user,
        })
        if (T1) {
            for (rr of T1) {
                const points = rr.Score
                await interaction.reply(`Your score is ${points} Todo-points!!`);
            }
        } else return await interaction.reply("You do not have any Todo-points :c");
   
}

async function StudyTime(interaction) {
    const guild = interaction.guild
    const guildId = guild.id
    const user = interaction.member.id

        const { MessageEmbed } = require("discord.js");

        const userdataSchema = require('../schema/6study');
        const userdocumentSchema = require('../schema/6study');
        // const UserID = target.id

        const logperson = await userdocumentSchema.find({
            UserID: user,
        })
        for (person of logperson) {
            const daily = person.daily
            const weekly = person.weekly
            const monthly = person.monthly
            const alltime = person.alltime

            const roundeddaily = Math.round(daily * 10) / 10
            const roundedweekly = Math.round(weekly * 10) / 10
            const roundedmonthly = Math.round(monthly * 10) / 10
            const roundedalltime = Math.round(alltime * 10) / 10


            const results = await userdataSchema.find({
                UserID: 'anon'
            })
            for (const time of results) {
                const alldaily = time.daily
                const allweekly = time.weekly
                const allmonthly = time.monthly
                const allalltime = time.alltime

                const users = await userdocumentSchema.countDocuments()

                let averagedaily = (alldaily / users)
                let dailyround = Math.round(averagedaily * 10) / 10

                let averageweekly = (allweekly / users)
                let weeklyround = Math.round(averageweekly * 10) / 10

                let averagemonthly = (allmonthly / users)
                let monthround = Math.round(averagemonthly * 10) / 10

                let averageall = (allalltime / users)
                let allround = Math.round(averageall * 10) / 10

                let reply = `➡️**${roundeddaily}** hours today (*average: ${dailyround}*)\n ➡️ **${roundedweekly}** hours this week (*average: ${weeklyround}*)\n ➡️ **${roundedmonthly}** hours this month (*average: ${monthround}*)\n ➡️ **${roundedalltime}** hours all-time (*average: ${allround}*)`
                let logembed = new MessageEmbed()
                    .setTitle(`⏰ Your study time`)
                    .setColor('#FDF9F9')
                    .setDescription(`${reply}`)
                   .setTimestamp()

                await interaction.reply({ embeds: [logembed] });
            }
        }

   

}


module.exports = {
    TODOADD,
    TODODONE,
    TODOLIST,
    TODOREMOVE,
    TODORESET,
    TODOSCORE,
    StudyTime
}