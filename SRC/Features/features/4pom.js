const { ADDCoins } = require('../../functions/2Addcoins');

module.exports = (client) => {
    client.on('ready', async () => {
        var schedule = require('node-schedule');
        var moment = require('moment');
        const Discord = require('discord.js');
        const Ps = require('../../schema/4pom-schema')
        const Pus = require("../../schema/5pomuser")


        var Po = schedule.scheduleJob('*/1 * * * *', async function () {
            let PSt = await Ps.find({})

            PSt.forEach(async PsQ => {
                let Pi = PsQ.UserID
                let St = PsQ.Status
                let Rt = PsQ.RemainingTime
                let Pt = PsQ.PomTime
                let Bt = PsQ.BreakTime
                let Lt = PsQ.SessionLeft
                let Ga = PsQ.GuildID
                let Ra = PsQ.RoleID
                let VcS = PsQ.VCSet
                let VcId = PsQ.VCID
                let ChId = PsQ.CHID

                if (Rt > 1) {
                    let NP = await Ps.findOneAndUpdate(
                        {
                            UserID: Pi,
                        },
                        {
                            UserID: Pi,
                            $inc: {
                                RemainingTime: -1,
                            },
                        },
                        {
                            upsert: true,
                            new: false
                        })
                }

                if (Rt === 1) {
                    if (St === "STARTING") {
                        let NP = await Ps.findOneAndUpdate(
                            {
                                UserID: Pi,
                            },
                            {
                                UserID: Pi,
                                RemainingTime: Pt,
                                Status: "SESSION"
                            },
                            {
                                upsert: true,
                                new: false
                            })

                        let VCs = NP.VCSet
                        if (VCs === 'TRUE') {
                            let CHid = NP.CHID
                            let Rid = NP.RoleID
                            let Gid = NP.GuildID

                            let Ch = client.channels.fetch(CHid).then(async channel => {
                                let PR = await Pus.find({
                                    GuildID: Gid,
                                    PomSession: Rid
                                })
                                if (PR && PR.length > 0) {
                                    let reply = '**__Goals set for this session__**\n\n'
                                    for (const result of PR) {
                                        let Uid = result.UserID
                                        console.log(Uid)
                                        let PiD = await client.users.fetch(Uid)
                                        console.log(PiD)
                                        let Un = PiD.username

                                        reply += `▪️ **${Un}'s** goal: *${result.PomGoal}*\n`
                                    }

                                    const exampleEmbed = new Discord.MessageEmbed()
                                        .setTitle(`Pomsession starts now! 🍅 ${Pt}m. study!`)
                                        .setThumbnail('https://i.postimg.cc/NjQYdwrp/1-pBreak.png')
                                        .setDescription(`${reply}`)

                                    channel.send(`<@&${Ra}>`)
                                    channel.send({ embeds: [exampleEmbed]})
                                }
                            })

                            return
                        } else {
                            let Ch = client.channels.fetch('1071487528256938145').then(async channel => {
                                channel.send(`<@&${Ra}> Your PomSession starts now!\n\n **${Pt} min. of studying!**`)
                            })
                            return
                        }
                    }

                    if (St === "SESSION") {
                        if (Lt > 1) {
                            let NP = await Ps.findOneAndUpdate({
                                UserID: Pi,
                            },
                                {
                                    UserID: Pi,
                                    Status: "BREAK",
                                    RemainingTime: Bt,
                                    $inc: {
                                        SessionLeft: -1,
                                    },
                                },
                                {
                                    upsert: true,
                                    new: false
                                })

                            let VCs = NP.VCSet
                            if (VCs === 'TRUE') {
                                let CHid = NP.CHID
                                let Rid = NP.RoleID
                                let Gid = NP.GuildID

                                let Ch = client.channels.fetch(CHid).then(async channel => {
                                    let PR = await Pus.find({
                                        GuildID: Gid,
                                        PomSession: Rid
                                    })
                                    if (PR && PR.length > 0) {
                                        let reply = '**__Completed goals last session__**\n\n'
                                        for (const result of PR) {
                                            let Uid = result.UserID
                                            let Pgo = result.PomGoal
                                            console.log(Uid)
                                            let PiD = await client.users.fetch(Uid)
                                            console.log(PiD)
                                            let Un = PiD.username

                                            if (Pgo === 'Not set') {
                                                reply += `▪️ **${Un}'s** goal was not set this session\n`

                                                let EP = await Pus.findOneAndUpdate({
                                                    UserID: Uid,
                                                },
                                                    {
                                                        UserID: Uid,
                                                        PomGoal: "Not set",
                                                        $inc: {
                                                            PomPoints: 1,
                                                        },
                                                    },
                                                    {
                                                        upsert: true,
                                                        new: false
                                                    })
                                            }

                                            else {
                                                reply += `✅ **${Un}'s** goal: *${result.PomGoal}* - PomPoint earned: **1**!\n`

                                                let EP = await Pus.findOneAndUpdate({
                                                    UserID: Uid,
                                                },
                                                    {
                                                        UserID: Uid,
                                                        PomGoal: "Not set",

                                                    },
                                                    {
                                                        upsert: true,
                                                        new: false
                                                    })
                                            }
                                        }

                                        const exampleEmbed = new Discord.MessageEmbed()
                                            .setTitle(`Take a break now! 🍅 ${Bt}m. break!`)
                                            .setThumbnail('https://i.postimg.cc/26VX6qRV/2-p-Session.png')
                                            .setDescription(`${reply}\n\nSet a goal for your next session with **!pom goal**`)

                                        channel.send(`<@&${Ra}>`)
                                        channel.send({ embeds: [exampleEmbed]})
                                    }
                                })
                                return
                            } else {
                                let Ch = client.channels.fetch('1071487528256938145').then(async channel => {
                                    channel.send(`<@&${Ra}> You can take a break now!\n\n **Will get you back to work in ${Bt}**`)
                                })
                                return
                            }
                        }
                        if (Lt === 1) {
                            let NP = await Ps.findOneAndUpdate({
                                UserID: Pi,
                            },
                                {
                                    UserID: Pi,
                                    Status: "ENDING",
                                    RemainingTime: 10,
                                },
                                {
                                    upsert: true,
                                    new: false
                                })

                            let VCs = NP.VCSet
                            if (VCs === 'TRUE') {
                                let CHid = NP.CHID
                                let Rid = NP.RoleID
                                let Gid = NP.GuildID

                                let Ch = client.channels.fetch(CHid).then(async channel => {
                                    let PR = await Pus.find({
                                        GuildID: Gid,
                                        PomSession: Rid
                                    })
                                    if (PR && PR.length > 0) {
                                        let reply = '**__Completed goals last session__**\n\n'
                                        for (const result of PR) {
                                            let Uid = result.UserID
                                            let Pgo = result.PomGoal
                                            console.log(Uid)
                                            let PiD = await client.users.fetch(Uid)
                                            console.log(PiD)
                                            let Un = PiD.username

                                            if (Pgo === 'Not set') {
                                                reply += `▪️ **${Un}'s** goal was not set this session\n`

                                                let EP = await Pus.findOneAndUpdate({
                                                    UserID: Uid,
                                                },
                                                    {
                                                        UserID: Uid,
                                                        PomGoal: "Not set",
                                                        $inc: {
                                                            PomPoints: 1,
                                                        },
                                                    },
                                                    {
                                                        upsert: true,
                                                        new: false
                                                    })
                                                    ADDCoins(Uid, 2);
                                            }

                                            else {
                                                reply += `✅ **${Un}'s** goal: *${result.PomGoal}* - PomPoint earned: **1**!\n`

                                                let EP = await Pus.findOneAndUpdate({
                                                    UserID: Uid,
                                                },
                                                    {
                                                        UserID: Uid,
                                                        PomGoal: "Not set",

                                                    },
                                                    {
                                                        upsert: true,
                                                        new: false
                                                    })
                                            }
                                        }

                                        const exampleEmbed = new Discord.MessageEmbed()
                                            .setTitle(`You have done your POMS! 🍅`)
                                            .setThumbnail('https://i.postimg.cc/MTXqSbW4/3-pEnd.png')
                                            .setDescription(`${reply}\n\n**Pom will be removed after 10min, say goodbye to your Buddies!**`)

                                        channel.send(`<@&${Ra}>`)
                                        channel.send({ embeds: [exampleEmbed]})
                                    }
                                })
                                return
                            } else {
                                let Ch = client.channels.fetch('1071487528256938145').then(async channel => {
                                    channel.send(`<@&${Ra}> You have done your POMS!\n\n **Any private channel will be removed after 10min, say goodbye to your StudyBuddies!**`)
                                })
                                return
                            }
                        }
                    }

                    if (St === "BREAK") {
                        let NP = await Ps.findOneAndUpdate(
                            {
                                UserID: Pi,
                            },
                            {
                                UserID: Pi,
                                RemainingTime: Pt,
                                Status: "SESSION"
                            },
                            {
                                upsert: true,
                                new: false
                            })
                        let VCs = NP.VCSet
                        if (VCs === 'TRUE') {
                            let CHid = NP.CHID
                            let Rid = NP.RoleID
                            let Gid = NP.GuildID

                            let Ch = client.channels.fetch(CHid).then(async channel => {
                                let PR = await Pus.find({
                                    GuildID: Gid,
                                    PomSession: Rid
                                })
                                if (PR && PR.length > 0) {
                                    let reply = '**__Goals set for this session__**\n\n'
                                    for (const result of PR) {
                                        let Uid = result.UserID
                                        console.log(Uid)
                                        let PiD = await client.users.fetch(Uid)
                                        console.log(PiD)
                                        let Un = PiD.username

                                        reply += `▪️ **${Un}'s** goal: *${result.PomGoal}*\n`
                                    }

                                    const exampleEmbed = new Discord.MessageEmbed()
                                        .setTitle(`Pomsession starts now! 🍅 ${Pt}m. study!`)
                                        .setThumbnail('https://i.postimg.cc/NjQYdwrp/1-pBreak.png')
                                        .setDescription(`${reply}`)

                                    channel.send(`<@&${Ra}>`)
                                    channel.send({ embeds: [exampleEmbed]})
                                }
                            })
                            return
                        } else {
                            let Ch = client.channels.fetch('1071487528256938145').then(async channel => {
                                channel.send(`<@&${Ra}> Break is over now!\n\n **Back to work for another session of ${Pt} min! Good luck!**`)
                            })
                            return
                        }
                    }

                    if (St === "ENDING") {
                        let bGag = client.guilds.cache.get(Ga)
                        let RiD = bGag.roles.cache.find((role) => role.id === Ra)
                        RiD.delete()

                        let Dt = await Ps.deleteOne({
                            GuildID: Ga,
                            UserID: Pi
                        })

                        if (VcS === 'TRUE') {
                            let TCID = await bGag.channels.cache.find((channel) => channel.id === ChId)
                            TCID.delete()
                            let VCiD = await bGag.channels.cache.find((channel) => channel.id === VcId)
                            VCiD.delete()
                        }
                    }
                }

            })
        })

        var Pt = schedule.scheduleJob('*/5 * * * *', async function () {
            let PSt = await Ps.find({
                VCSet: "TRUE"
            })

            if (PSt) {
                for (Che of PSt) {
                    let ChID = Che.CHID
                    let Rt = Che.RemainingTime
                    let St = Che.Status
                    let Ga = Che.GuildID
                    let Uid = Che.UserID
                    let PiD = await client.users.fetch(Uid)
                    console.log(PiD)
                    let Un = PiD.username

                    if (St === "SESSION") {
                        let bGag = client.guilds.cache.get(Ga)
                        let TCID = await bGag.channels.cache.find((channel) => channel.id === ChID)
                        TCID.setName(`📚・${Rt}m ${St}・${Un}'s pom`)
                    }
                    if (St === "BREAK") {
                        let bGag = client.guilds.cache.get(Ga)
                        let TCID = await bGag.channels.cache.find((channel) => channel.id === ChID)
                        TCID.setName(`☕️・${Rt}m ${St}・${Un}'s pom`)
                    }
                }
            }
        })


    });
}
