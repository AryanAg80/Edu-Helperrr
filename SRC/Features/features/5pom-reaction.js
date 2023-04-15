module.exports = (client) => {

    client.on("messageReactionAdd", async (reaction, user) => {
        if (reaction.message.partial) await reaction.message.fetch();
        if (reaction.partial) await reaction.fetch

        if (user.bot) return;
        

        if (reaction.message.channel.id === "1071487528256938145") {
            if (reaction.emoji.name === '🍅') {
                const Ps = require('../../schema/4pom-schema')
                const Gs = require('../../schema/5pomuser')
                let MiD = reaction.message.id

                let T = await Ps.find({
                    MessageID: MiD,
                    Open: 'TRUE'
                })

                console.log(T)
                if (T) {
                    for (X of T) {
                        let Rr = X.RoleID

                        await reaction.message.guild.members.cache.get(user.id).roles.add(Rr)

                        let User = user.id

                        let RA = await Gs.findOne({
                            UserID: User
                        })

                        if (RA) {
                            let Oss = RA.PomSession
                            await reaction.message.guild.members.cache.get(user.id).roles.remove(Oss)
                        }

                        let Up = await Gs.findOneAndUpdate(
                            {
                                UserID: User
                            },
                            {

                                UserID: User,
                                PomSession: Rr
                            },
                            {
                                upsert: true,
                                new: true
                            })
                    }
                } else { reaction.message.channel.send('PomStarter has locked this Pom Session') }
            }
            if (reaction.emoji.name === '🎥') {
                const discord = require('discord.js')
                const Ps = require('../../schema/4pom-schema')
                let MiD = reaction.message.id

                let RA = await Ps.findOne({
                    MessageID: MiD,
                    VCSet: 'FALSE'
                })

                console.log(RA)
                if (RA) {
                    let Rr = RA.RoleID
                    let Rm = RA.RemainingTime
                    let Se = RA.Status
                    let Nid = RA.UserID
                    let Bt = RA.BreakTime
                    let St = RA.PomTime
                    let Rt = RA.ReCur


                    let uNid = await reaction.message.guild.members.cache.get(Nid)
                    console.log(uNid)
                    let ID = uNid.user.username
                    console.log(ID)

                    const categoryId = "1017810847906660392";
                    let role = reaction.message.guild.roles.cache.find(role => role.name === "@everyone");
                    let pomrole = reaction.message.guild.roles.cache.find(role => role.id === Rr);
                    var userName = reaction.message.author.username;
                    var userDiscriminator = reaction.message.author.discriminator;
                    let server = '1017810847046832179'

                    reaction.message.guild.channels.create(`🍅 Pom - ${ID}`, { type: 'GUILD_VOICE' }).then(async (createdChan) => {
                        createdChan.setParent(categoryId).then(async (settedParent) => {
                            let PCI = settedParent.id

                            settedParent.permissionOverwrites.edit(role, {
                                "VIEW_CHANNEL": false,
                                "CONNECT": false,
                                "CREATE_INSTANT_INVITE": false,
                            });

                            settedParent.permissionOverwrites.edit(pomrole, {
                                "VIEW_CHANNEL": true,
                                "CONNECT": true,
                                "CREATE_INSTANT_INVITE": true,
                            });

                            let up = await Ps.findOneAndUpdate(
                                {
                                    MessageID: MiD,
                                    VCSet: 'FALSE'
                                },
                                {
                                    VCSet: 'TRUE',
                                    VCID: PCI
                                },
                                {
                                    upsert: true,
                                    new: false
                                }
                            )
                        })


                        reaction.message.guild.channels.create(`${ID}`, { type: "GUILD_TEXT"}).then(async (createdChan) => {
                            createdChan.setParent(categoryId).then(async (settedParent) => {
                                let VCI = settedParent.id

                                settedParent.permissionOverwrites.edit(pomrole, {
                                    "VIEW_CHANNEL": true,
                                    "READ_MESSAGE_HISTORY": true, "SEND_MESSAGES": true,
                                    "CREATE_INSTANT_INVITE": true, "ADD_REACTIONS": true
                                });

                                var embedParent = new discord.MessageEmbed()
                                    .setTitle("🍅 Welcome to the Pom Channel! 🍅")
                                    .setDescription(`__**Pom options**__\n\n▪️ **!pom goal 'goal'** set your pom goal for the next session\n▪️ **!pom end** ends the pom (if you are the owner ends for everyone!)\n▪️ **!pom name** rename your Pom VC\n▪️ **!pom break 10** set the break time to 10m\n▪️ **!pom session 60** set the session time to 60m\n▪️ **!pom remaining** remaining study or break time\n▪️ **!pom lock/unlock** locks the VC and text channels\n\n__**Pom details**__\n\n▪️ Session **${St}m.** - Break: **${Bt}m.** - Recurring: **${Rt} times**\n▪️ VC for this Pom is named 🍅 Pom - ${ID}`);

                                settedParent.send(`${pomrole}`)
                                settedParent.send({ embeds: [embedParent]})

                                let up = await Ps.findOneAndUpdate(
                                    {
                                        MessageID: MiD,

                                    },
                                    {
                                        VCSet: 'TRUE',
                                        CHID: VCI
                                    },
                                    {
                                        upsert: true,
                                        new: false
                                    }
                                )
                            })
                        })
                    })
                }
            }
        }

    });

}