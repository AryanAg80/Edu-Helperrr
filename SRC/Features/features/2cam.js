module.exports = (client) => {
    const { daily, CamCheck, Joined, Left, DeleteLog, InVC, MovingTime, Check } = require("../../functions/3Cam-sessions")
    const CC1 = require("../../schema/10cam");
//    const { Check } = require("../../Functions/7Server_CAM");
    client.on("ready", async () => {
        const TexTChan = client.channels.cache.get("1096740027167420457");

        const schedule = require("node-schedule");
        var j = schedule.scheduleJob('0 2 * * *', async function () {
            daily(TexTChan)
        })
        CamCheck(TexTChan);
    });

    client.on("voiceStateUpdate", async (oldState, newState) => {
        const TexTChan = client.channels.cache.get("1096740027167420457");
        const Chan = newState.channelId
        const Chan2 = oldState.channelId
        const role = "1071493162662629409";
        const user = newState.member.user.id


        const ASTUDY = await CC1.find({
            GG: "1017810847046832179",
            user: "anon",
            Enable: "YES",
        });
        if (ASTUDY) {
            for (RR of ASTUDY) {
                const Chann = RR.Chan
                const Role = RR.role
                const GG = "1017810847046832179";
                if (Chan === Chann) {
                    if (Chan2 != Chan) {
                        Check(client, user);
                        const TYR = newState.member.user
                        Joined(client, TYR, user, Role, GG);
                    }
                }
                if (Chan === Chann) {
                    if (Chan2 != Chan) {
                        Left(client, user, role, GG);
                    }
                }
                if (!oldState.selfVideo && newState.selfVideo) {
                    console.log(`${newState.member.user.tag} Is now on CAM` + Chan);
                    if (Chan === Chann) {
                        newState.member.user.send(`<@${newState.member.user.id}> I see you are on Cam!! Good luck with your session.`);

                        DeleteLog(user);
                        InVC(user, GG);
                    }
                }
                if (oldState.selfVideo && !newState.selfVideo) {
                    console.log(`${newState.member.user.tag} Is now NOT on Cam!!"`);

                    if (Chan === "1096762906202357841") {
                        newState.member.user.send(`<@${newState.member.user.id}> You turned off your cam!! Please turn on your cam in next 10m or you'll be kicked out of voice channel!!`);
                        newState.member.user.disconnect()
                    }
                }
                if (!oldState.streaming && newState.streaming) {
                    console.log(`${newState.member.user.tag} Is now Streaming`);
                    if (Chan === "1096762906202357841") {
                        newState.member.user.send(`<@${newState.member.user.id}> I see you are Streaming!! Good luck with your session.`);
                        DeleteLog(user);
                        InVC(user);
                    }
                }
                if (oldState.streaming && !newState.streaming) {
                    console.log(`${newState.member.user.tag} Is now NOT on Cam!!"`);

                    if (Chan === "1096762906202357841") {
                        newState.member.user.send(`<@${newState.member.user.id}> You turned off your ScreenShare!! Please share your Screen in next 10m or you'll be kicked out of voice channel!!`);
                        newState.member.user.disconnect()
                    }
                }
            }
        }

        if (Chan === "1096762906202357841") {
            if (Chan2 != Chan) {
                const GG = "1017810847046832179"
                console.log(`${user} joined Study-Cam!!!`);
                Joined(client, TexTChan, user, role, GG);
            }
        }

        if (Chan2 === "1096762906202357841") {
            if (Chan2 != Chan) {
                const GG = "1017810847046832179"
                console.log(`${user} left studyHall!!!`);
                Left(client, user, role, GG);
            }
        }

        const GG = "1017810847046832179";
        if (!oldState.selfVideo && newState.selfVideo) {
            console.log(`${newState.member.user.tag} Is now on CAM` + Chan);
            if (Chan === "1096762906202357841") {

                TexTChan.send(`<@${newState.member.user.id}> I see you are on Cam!! Good luck with your session.`);

                DeleteLog(user);
                InVC(user, GG);
            }
        }
        if (oldState.selfVideo && !newState.selfVideo) {
            console.log(`${newState.member.user.tag} Is now NOT on Cam!!"`);

            if (Chan === "1096762906202357841") {
                TexTChan.send(`<@${newState.member.user.id}> You turned off your cam!! Please turn on your cam in next 10m or you'll be shifted to Studyhall!!`);
                MovingTime(user);
            }
        }
        if (!oldState.streaming && newState.streaming) {
            console.log(`${newState.member.user.tag} Is now Streaming`);
            if (Chan === "1096762906202357841") {
                TexTChan.send(`<@${newState.member.user.id}> I see you are Streaming!! Good luck with your session.`);
                DeleteLog(user);
                InVC(user, GG);
            }
        }
        if (oldState.streaming && !newState.streaming) {
            console.log(`${newState.member.user.tag} Is now NOT on Cam!!"`);

            if (Chan === "1096762906202357841") {
                TexTChan.send(`<@${newState.member.user.id}> You turned off your ScreenShare!! Please share your Screen in next 10m or you'll be shifted to Studyhall!!`);
                MovingTime(user);
            }
        }
    });
}