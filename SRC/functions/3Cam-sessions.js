const camsc = require("../schema/10cam");
const { scheduleJob } = require("node-schedule");
const moment = require("moment");
const ms = require("ms");
const { MessageEmbed } = require("discord.js");
const currenttime = new Date(Date.now());
const current = moment(currenttime).format('DD/MM/YYYY-HH:mm');
const GG = "703937875720273972" || "787302519499391046"
let addtime = ms("10m");
let endTime = new Date(currenttime.getTime() + addtime);
let BReakTime = moment(endTime).format('DD/MM/YYYY-HH:mm');

async function daily(TextChanel) {

    const reply = `The Cam Study
          
        ▪️ When joining the Cam Study VC, <#948675603526201385> opens up.
        
        Cam Study Rules
        
        ▪️ Only study in the VC with camera or screenshare ON
        ▪️ Only study related conversations
        ▪️ Have respect and show manners in the VC`
    const embed = new MessageEmbed()
        .setFooter({ text: `By @Study_bot` })
        .setTitle(`📽 Cam Study Guide`)
        .setDescription(reply)
        .setColor('RANDOM')
        .setTimestamp()

    TextChanel.send({ embeds: [embed] });

};


async function CamCheck(client, TextChan) {

    var k = scheduleJob("*/1 * * * *", async function () {

        const c1 = await camsc.find({
            GG,
        })

        if (c1) {
            for (cc of c1) {
                const User = cc.user
                const BReak = cc.BReakTime

                if (BReak === current) {
                    TextChan.send(`<@${User}> you didn't open up your cam/SS!! Shifting you to studyhall.`);
                    const guild = client.guilds.cache.get(GG);
                    const Mem = guild.members.cache.get(User);
                    const VCchannel = guild.channels.cache.find(channel => channel.id === '1017810847906660395');
                    Mem.voice.setChannel(VCchannel);

                    const a2 = await camsc.findOneAndDelete({
                        GG: "1017810847046832179",
                        user: User,
                    })
                    console.log(`deleted old log for ${Mem}`);
                }
            }
        }
    });
};

async function Joined(client, Chan, user, role, GG) {
    const guild = client.guilds.cache.get(GG);
    guild.members.cache.get(user).roles.add(role);
    Chan.send(`Welcome to study Vc 📚 <@${user}>. \n We hope you will enjoy studying here. 📑 \n\n Please turn your cam/SS on!!`);

    const a1 = await camsc.findOneAndUpdate({
        user,
    }, {
        user,
        BReakTime,
        INVC: "YES"
    }, {
        upsert: true,
        new: true,
    })
    console.log(a1);
}

async function Left(client, user, role, GG) {
    const guild = client.guilds.cache.get(GG);
    guild.members.cache.get(user).roles.remove(role);
    //guild.members.cache.get(user).roles.remove();

    const a2 = await camsc.findOneAndDelete({
        user,
    })
    console.log(`deleted old log for ${user}`);
}

async function DeleteLog(user) {
    const a1 = await camsc.findOneAndDelete({
        user,
    })
    console.log(`Deleted log for ${user}`);
}

async function InVC(user, GG) {
    const a3 = await camsc.findOneAndUpdate({
        GG,
        user,
    }, {
        user,
        INVC: "YES",
    }, {
        upsert: true,
        new: true,
    });
    console.log(a3);
}

async function MovingTime(user) {
    const a4 = await camsc.findOneAndUpdate({
        GG,
        user,
    }, {
        user,
        BReakTime,
        INVC: "YES",
    }, {
        upsert: true,
        new: true,
    });
    console.log(a4);
}

const Cam = require("../schema/10cam");
//const { scheduleJob } = require("node-schedule");

async function Check(client, member, GG) {
    const A2 = await Cam.find({
        GG,
        user: "anon",
        Enable: "YES",
    })
    if (A2) {
        for (a2 of A2) {
            const channel = a2.Chan

            const Chan = client.channels.cache.get(channel);
            if (!Chan) return;
            else {
                const T = await member.send(`Welcome to the Cam/SS only vc!! \n Please turn on your cam in next 10m or you will be kicked out of the voice channel!!`);
                if (!T) return;

            }
        }
    }
}

module.exports = { daily, CamCheck, Joined, Left, DeleteLog, InVC, MovingTime, Check };

