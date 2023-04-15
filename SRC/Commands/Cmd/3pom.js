module.exports = {
    commands: ['pom'],
    minArgs: 1,
    expectedArgs: 'time in Min',

    callback: async (message, arguments, text) => {
        const { member, channel, content, guild } = message
        const Ua = member.id
        const Un = message.author.username
        const Ga = guild.id
        const Discord = require('discord.js');
        new Discord.Role(guild);

        const Ps = require('../../schema/4pom-schema')
        const Gs = require('../../schema/5pomuser')

        const Cha = message.client.channels.cache.get('1071487528256938145')
        const Tcha = message.client.channels.cache.get('1071487528256938145');
        const Echa = message.client.channels.cache.get('1071487528256938145');

        
            if (arguments[0] === 'name') {
                let RdD = await Ps.find({
                    GuildID: Ga,
                    UserID: Ua
                })

                if (RdD) {
                    for (Rd of RdD) {
                        let Vch = Rd.VCID
                        let Nn = arguments.slice(1).join(" ")

                        let Vc = await message.guild.channels.cache.find((channel) => channel.id === Vch)
                        Vc.setName(Nn)
                            .catch(console.error);
                    }
                }
                return
            }

            if (arguments[0] === 'end') {
                let RdD = await Ps.find({
                    GuildID: Ga,
                    UserID: Ua
                })

                if (RdD) {
                    for (Rd of RdD) {

                        let RtD = Rd.RoleID
                        let Vcs = Rd.VCSet
                        let Tch = Rd.CHID
                        let Vch = Rd.VCID

                        let RID = await message.guild.roles.cache.find((role) => role.id === RtD)

                        RID.delete()

                        let Dt = await Ps.deleteOne({
                            GuildID: Ga,
                            UserID: Ua
                        })
                        message.reply('ended your Pom!')

                        if (Vcs === 'TRUE') {
                            let TCID = await message.guild.channels.cache.find((channel) => channel.id === Tch)
                            TCID.delete()
                            let VCID = await message.guild.channels.cache.find((channel) => channel.id === Vch)
                            VCID.delete()
                        }

                        let DS = await Gs.deleteMany({
                            GuildID: Ga,
                            PomSession: RtD
                        })

                        return
                    }
                }
                else {
                    let RdD = await Gs.find({
                        GuildID: Ga,
                        UserID: Ua,
                    })

                    if (RdD) {
                        let PS = RdD.PomSession
                        await message.guild.members.cache.get(Ua).roles.remove(PS)

                        message.reply('ended your Pom!')

                        let DS = await Gs.deleteOne({
                            GuildID: Ga,
                            UserID: Ua,
                        })

                        return
                    } else {
                        message.reply('sorry I cannot find a Pom for you')
                        return
                    }
                }
            
        }

        if (arguments[0] === 'break') {
            if (!arguments[1] || isNaN(arguments[1]) || arguments[1] < 5 || arguments[1] > 180) {
                message.reply('not a valid time')
                return
            }
            else {
                let T = await Ps.find({
                    GuildID: Ga,
                    UserID: Ua
                })

                if (T) {
                    for (Qt of T) {
                        console.log(Qt)
                        let NbT = arguments[1]
                        let Stat = Qt.Status
                        let BtT = Qt.BreakTime
                        console.log(BtT)
                        let RID = Qt.RoleID
                        console.log(RID)
                        let RT = Qt.RemainingTime

                        if (Stat === "BREAK") {
                            let AbT = (NbT) - (BtT)
                            let EbT = (NbT) - (RT)

                            let Up = await Ps.findOneAndUpdate(
                                {
                                    GuildID: Ga,
                                    UserID: Ua
                                },
                                {
                                    GuildID: Ga,
                                    UserID: Ua,
                                    RemainingTime: EbT,
                                    BreakTime: NbT,
                                },
                                {
                                    upsert: true,
                                    new: true
                                })

                            message.channel.send(`<@&${RID}> current and future break time extended with ${AbT} min. Remaining break time for this break: ${EbT} min.`)
                            return
                        } else {
                            let AbT = (NbT - BtT)
                            let Up = await Ps.findOneAndUpdate(
                                {
                                    GuildID: Ga,
                                    UserID: Ua
                                },
                                {
                                    GuildID: Ga,
                                    UserID: Ua,
                                    BreakTime: NbT,
                                },
                                {
                                    upsert: true,
                                    new: true
                                })

                            message.channel.send(`<@&${RID}> future break time extended with ${AbT} min. Total (future) break time: ${NbT} min.`)
                            return
                        }
                    }
                } else {
                    message.reply('sorry you are not the owner of a Pom!')
                    return
                }
            }
        } if (arguments[0] === 'remaining') {
            let E = await Ps.find({
                GuildID: Ga,
                UserID: Ua
            })

            if (E) {
                for (Qt of E) {
                    let Stat = Qt.Status
                    let BtT = Qt.BreakTime
                    console.log(BtT)
                    let RID = Qt.RoleID
                    console.log(RID)
                    let RT = Qt.RemainingTime

                    message.reply(`currently in **${Stat}** time with **${RT}m.** remaining! ⏰`)

                }
                return
            }

        } if (arguments[0] === 'goal') {
            const Ta = arguments.slice(1).join(" ")


            let Up = await Gs.findOneAndUpdate(
                {
                    GuildID: Ga,
                    UserID: Ua
                },
                {
                    GuildID: Ga,
                    UserID: Ua,
                    PomGoal: Ta,
                },
                {
                    upsert: true,
                    new: false
                })

            message.reply(`your goal for current or next session: **${Ta}**`)
            return




        } if (arguments[0] === 'lock') {
            let T = await Ps.find({
                GuildID: Ga,
                UserID: Ua
            })

            if (T) {
                let Up = await Ps.findOneAndUpdate(
                    {
                        GuildID: Ga,
                        UserID: Ua
                    },
                    {
                        GuildID: Ga,
                        UserID: Ua,
                        Open: 'FALSE'
                    },
                    {
                        upsert: true,
                        new: true
                    })

                message.reply(`locked your channels, no other people can join your Pom anymore`)
                return
            } else {
                message.reply(`you are not an owner of this Pom`)
                return
            }


        } if (arguments[0] === 'unlock') {
            let T = await Ps.find({
                GuildID: Ga,
                UserID: Ua
            })

            if (T) {
                let Up = await Ps.findOneAndUpdate(
                    {
                        GuildID: Ga,
                        UserID: Ua
                    },
                    {
                        GuildID: Ga,
                        UserID: Ua,
                        Open: 'TRUE'
                    },
                    {
                        upsert: true,
                        new: true
                    })

                message.reply(`unlocked your channels, other people can join your Pom again`)
                return
            } else {
                message.reply(`you are not an owner of this Pom`)
                return
            }
        }



        if (arguments[0] === 'session') {
            if (!arguments[1] || isNaN(arguments[1]) || arguments[1] < 10 || arguments[1] > 180) {
                message.reply('not a valid time')
                return
            }
            else {
                let T = await Ps.find({
                    GuildID: Ga,
                    UserID: Ua
                })

                if (T) {
                    for (Qt of T) {
                        console.log(Qt)
                        let NbT = arguments[1]
                        let Stat = Qt.Status
                        let BtT = Qt.BreakTime
                        let RID = Qt.RoleID
                        let RT = Qt.RemainingTime

                        if (Stat === "SESSION") {
                            let AbT = (NbT) - (BtT)
                            let EbT = (NbT) - (RT)

                            let Up = await Ps.findOneAndUpdate(
                                {
                                    GuildID: Ga,
                                    UserID: Ua
                                },
                                {
                                    GuildID: Ga,
                                    UserID: Ua,
                                    RemainingTime: EbT,
                                    PomTime: NbT,
                                },
                                {
                                    upsert: true,
                                    new: true
                                })

                            message.channel.send(`<@&${RID}> current and future Pom Session time extended with ${AbT} min. Remaining time for this Pom Session: ${EbT} min.`)
                            return
                        } else {
                            let AbT = (NbT) - (BtT)
                            console.log(AbT)
                            let Up = await Ps.findOneAndUpdate(
                                {
                                    GuildID: Ga,
                                    UserID: Ua
                                },
                                {
                                    GuildID: Ga,
                                    UserID: Ua,
                                    PomTime: NbT,
                                },
                                {
                                    upsert: true,
                                    new: true
                                })

                            message.channel.send(`<@&${RID}> future Pom Session time extended with ${AbT} min. Total (future) Pom session time: ${NbT} min.`)
                            return
                        }
                    }
                } else {
                    message.reply('sorry you are not the owner of a Pom!')
                    return
                }
            }
        }

        else {
            let Qt = await Ps.find({
                GuildID: Ga,
                UserID: Ua
            })

            if (Qt && Qt.length > 0) {
                message.reply('you are already an owner of a Pom, please end this first by ```!pom end``` or finishing the session')
                return

            } else {
                let Pt = arguments[0]
                if (arguments[1] && arguments[1].length > 0) {
                    let St = arguments[1]
                    if (arguments[2] && arguments[2].length > 0) {
                        let Rt = arguments[2]

                        if (Pt < 10 || isNaN(Pt) || Pt > 180) {
                            message.reply('sorry you did not give a time as a number or study time is smaller than 10 min.')
                            return
                        }
                        if (St > 60 || isNaN(St) || St < 0) {
                            message.reply('sorry you did not give a startingtime as a number or starting time is bigger than 60 min.')
                            return
                        }
                        if (Rt > 12 || isNaN(Rt || Rt < 0)) {
                            message.reply('sorry you did not give reoccurences as a number, or reoccurence is bigger than 12')
                            return
                        }
                        else {
                            await guild.roles.create({
                                    name: `Pom-${Un}`,
                                    color: 'RED',
                                reason: 'Pom-Role',
                            })
                                .then(console.log)
                                .catch(console.error);
                            let Pn = `Pom-${Un}`
                            let Pr = await message.guild.roles.cache.find(role => role.name === `Pom-${Un}`)

                            let Pe = new Discord.MessageEmbed()
                                .setColor('#DC143C')
                                .setTitle(`${message.author.username} started a PomSession 🍅`)
                                .setTimestamp()
                               
                                .addFields(
                                    { name: '\u200B', value: 'Pom Info:' },
                                    { name: `Feel free to join ${arguments[2]} PomSessions with me!`, value: '\u200B' },
                                    { name: ':stopwatch: Duration:', value: `${arguments[0]} min`, inline: true },
                                    { name: ':closed_lock_with_key: Starting in:', value: `${arguments[1]} min`, inline: true },
                                    { name: '\u200B', value: `**__Options:__**\n🍅 Join the Pom and get tagged when sessions start and end!\n🎥 Start a Pom-VC in the private VC section` }
                                )

                            let PeS = await Cha.send({ embeds: [Pe]});
                            let PeI = PeS.id
                            console.log(PeI)
                            PeS.react('🍅')
                            PeS.react('🎥')

                            let PrI = Pr.id
                            console.log(PrI)
                            await message.guild.members.cache.get(Ua).roles.add(PrI)

                            let Up = await Ps.findOneAndUpdate(
                                {
                                    GuildID: Ga,
                                    UserID: Ua
                                },
                                {
                                    GuildID: Ga,
                                    UserID: Ua,
                                    PomTime: Pt,
                                    RemainingTime: St,
                                    StartTime: St,
                                    ReCur: Rt,
                                    SessionLeft: Rt,
                                    BreakTime: 5,
                                    RoleID: PrI,
                                    RoleName: Pn,
                                    MessageID: PeI,
                                    Status: "STARTING",
                                    VCSet: "FALSE",
                                    Open: "TRUE"
                                },
                                {
                                    upsert: true,
                                    new: true
                                })

                            let Pp = await Gs.findOneAndUpdate(
                                {
                                    GuildID: Ga,
                                    UserID: Ua
                                },
                                {
                                    PomSession: PrI
                                },
                                {
                                    upsert: true,
                                    new: true
                                })

                            Tcha.send(`🍅 **${Rt}** pomsessions of **${Pt}m.** start in **${St}m.** join here: <#1071487528256938145> 🍅`)
                            Echa.send(`🍅 **${Rt}** pomsessions of **${Pt}m.** start in **${St}m.** join here: <#1071487528256938145> 🍅`)
                        }
                    } else {
                        if (Pt < 10 || isNaN(Pt)) {
                            message.reply('sorry you did not give a time as a number or study time is smaller than 10 min.')
                            return
                        }
                        if (St > 60 || isNaN(St)) {
                            message.reply('sorry you did not give a startingtime as a number or starting time is bigger than 60 min.')
                            return
                        }

                        else {
                            await guild.roles.create({
                                data: {
                                    name: `Pom-${Un}`,
                                    color: 'RED',
                                },
                                reason: 'Pom-Role',
                            })
                                .then(console.log)
                                .catch(console.error);

                            let Pe = new Discord.MessageEmbed()
                                .setColor('#DC143C')
                                .setTitle(`${message.author.username} started a PomSession 🍅`)
                                .setTimestamp()
                                .addFields(
                                    { name: '\u200B', value: 'Pom Info:' },
                                    { name: `Feel free to join my PomSession!`, value: '\u200B' },
                                    { name: ':stopwatch: Duration:', value: `${arguments[0]} min`, inline: true },
                                    { name: ':closed_lock_with_key: Starting in:', value: `${arguments[1]} min`, inline: true },
                                    { name: '\u200B', value: `**__Options:__**\n🍅 Join the Pom and get tagged when sessions start and end!\n🎥 Start a Pom-VC in the private VC section` }
                                )

                            let Pr = await message.guild.roles.cache.find(role => role.name === `Pom-${Un}`);
                            let PrI = Pr.id
                            let Pn = `Pom-${Un}`
                            console.log(PrI)
                            await message.guild.members.cache.get(Ua).roles.add(PrI)

                            let PeS = await Cha.send({ embeds: [Pe]});
                            let PeI = PeS.id
                            console.log(PeI)
                            PeS.react('🍅')
                            PeS.react('🎥')

                            let Up = await Ps.findOneAndUpdate(
                                {
                                    GuildID: Ga,
                                    UserID: Ua
                                },
                                {
                                    GuildID: Ga,
                                    UserID: Ua,
                                    PomTime: Pt,
                                    RemainingTime: St,
                                    StartTime: St,
                                    BreakTime: 5,
                                    RoleID: PrI,
                                    RoleName: Pn,
                                    MessageID: PeI,
                                    Status: "STARTING",
                                    VCSet: "FALSE",
                                    Open: "TRUE",
                                    ReCur: 0,
                                    SessionLeft: 1,

                                },
                                {
                                    upsert: true,
                                    new: true
                                })

                            let Pp = await Gs.findOneAndUpdate(
                                {
                                    GuildID: Ga,
                                    UserID: Ua
                                },
                                {
                                    PomSession: PrI
                                },
                                {
                                    upsert: true,
                                    new: true
                                })

                            Tcha.send(`🍅 **1** pomsessions of **${Pt}m.** start in **${St}m.** join here: <#1071487528256938145> 🍅`)
                            Echa.send(`🍅 **1** pomsessions of **${Pt}m.** start in **${St}m.** join here: <#1071487528256938145> 🍅`)
                        }
                    }


                } else {
                    if (Pt < 10 || isNaN(Pt)) {
                        message.reply('sorry you did not give a time as a number or study time is smaller than 10 min.')
                        return
                    }

                    else {
                        await guild.roles.create({
                                name: `Pom-${Un}`,
                                color: 'RED',
                            reason: 'Pom-Role',
                        })
                            .then(console.log)
                            .catch(console.error);

                        let Pr = await message.guild.roles.cache.find(role => role.name === `Pom-${Un}`);
                        let PrI = Pr.id
                        let Pn = `Pom-${Un}`
                        console.log(PrI)

                        let Pe = new Discord.MessageEmbed()
                            .setColor('#DC143C')
                            .setTitle(`${message.author.username} started a PomSession 🍅`)
                            .setTimestamp()
                            .addFields(
                                { name: '\u200B', value: 'Pom Info:' },
                                { name: `Feel free to join my PomSession!`, value: '\u200B' },
                                { name: ':stopwatch: Duration:', value: `${arguments[0]} min`, inline: true },
                                { name: ':closed_lock_with_key: Starting:', value: `Now!`, inline: true },
                                { name: '\u200B', value: `**__Options:__**\n🍅 Join the Pom and get tagged when sessions start and end!\n🎥 Start a Pom-VC in the private VC section` }
                            )


                        let PeS = await Cha.send({ embeds: [Pe]});
                        let PeI = PeS.id
                        console.log(PeI)
                        PeS.react('🍅')
                        PeS.react('🎥')


                        await message.guild.members.cache.get(Ua).roles.add(PrI)

                        let Up = await Ps.findOneAndUpdate(
                            {
                                GuildID: Ga,
                                UserID: Ua
                            },
                            {
                                GuildID: Ga,
                                UserID: Ua,
                                PomTime: Pt,
                                RemainingTime: 0,
                                StartTime: 0,
                                BreakTime: 5,
                                RoleID: PrI,
                                RoleName: Pn,
                                MessageID: PeI,
                                Status: "STARTING",
                                VCSet: "FALSE",
                                Open: "TRUE",
                                SessionLeft: 1,
                                ReCur: 0,
                            },
                            {
                                upsert: true,
                                new: true
                            })

                        let Pp = await Gs.findOneAndUpdate(
                            {
                                GuildID: Ga,
                                UserID: Ua
                            },
                            {
                                PomSession: PrI
                            },
                            {
                                upsert: true,
                                new: true
                            })

                        Tcha.send(`🍅 **1** pomsessions of **${Pt}m.** starts **now** join here: <#1071487528256938145> 🍅`)
                        Echa.send(`🍅 **1** pomsessions of **${Pt}m.** starts **now** join here: <#1071487528256938145> 🍅`)
                    }
                }
            }
            }
    }
}

