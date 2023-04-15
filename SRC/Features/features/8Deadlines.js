const D1 = require("../../schema/9Deadlines");
const moment = require("moment")
const today = moment().utc().format("DD/MM/YYYY")
const Yester = moment().utc().subtract(1, 'days')
const Yesterday = Yester.format("DD/MM/YYYY")
const schedule = require("node-schedule");
const GG = "1017810847046832179"
const { MessageEmbed } = require("discord.js")

module.exports = (client) => {
    const guild = client.guilds.cache.get("1017810847046832179")
    client.on("ready", async () => {
             var J = schedule.scheduleJob('0 2 * * *', async function () {
                const Dd = await D1.find({
                    GG,
                    Date: today,
                })

                if (Dd && Dd.length > 0) {
                    let reply = "**Good Luck everyone** 🍀\n"

                    for (Drr of Dd) {
                            const us = Drr.user
                            let text = Drr.Deadline
                            
                             client.guilds.cache.get("1017810847046832179").members.cache.get(us).roles.add("1071492948123988068")

                                reply += `<@${us}> deadline: **${text}**\n\n`
                 } 
                 const embed = new MessageEmbed()
                 .setColor("RANDOM")
                 .setTitle('🍀Deadlines - Today:')
                 .setDescription(reply)
                 .setThumbnail("https://cdn.discordapp.com/attachments/858457615053619220/1003612698434613278/unknown.png")

                 client.channels.fetch("1096653672156512268")
                 .then( async channel => {
                    let DLL = await channel.send({embeds: [embed]})
                    DLL.react('🍀')
                    DLL.react('❄')
                 });
                } else {
                console.log("no deadlines today for sv!!");
                }
                
                const Y1 = await D1.find({
                    GG,
                    Date: Yesterday,
                })

                if (Y1) {
                  for (YRL of Y1) {
                        let uid = YRL.user
                       
                        client.guilds.cache.get("1017810847046832179").members.cache.get(uid).roles.remove("1071492948123988068");

                        const Y2 = await D1.deleteOne({
                            GG,
                            Date: Yesterday,
                        })
                    }
                } else return;
             })
    })
}