const J2 = require("../schema/9Deadlines");
const { Message } = require("discord.js");

async function DeadlineADD (interaction) {
  const { guild, member, channel } = interaction
  const GG = guild.id;
  const user = member.id
  const Date = interaction.options.getString("date")
  const Name = interaction.options.getString("name")

  const Dd = Date.toString()
  let De = Dd.split("/")

  let Dday = De[0]
  let Dmonth = De[1]
  let Dyear = De[2]

  const check = isDateBeforeToday(Dmonth, Dyear)
 // edit above function
  if (check === true) {
        return await interaction.reply("Please select an upcoming date. not Past Date!!");
  }
  else {
     
    const Day = [
        "01", "02", "03", "04", "05", "06", "07", "08", "09", "10", "11", "12", "13", "14", "15", "16", "17", "18", "19", "20", "21", "22", "23", "24", "25", "26", "27", "28", "29", "30", "31"
    ]
    const Month = [
        "01", "02", "03", "04", "05", "06", "07", "08", "09", "10", "11", "12"
    ]

    if (Day.includes(Dday)) {
        if (Month.includes(Dmonth)) {
         if (Dyear > 2021) {
             const moment = require("moment")
             const today = moment().utc().format("DD/MM/YYYY")
       if (Date === today) return await interaction.reply(`You can't set deadline that is due today!!`)
             const Deadline = Name || "deadline"
             const DID = makeid(7);
             const input = {
                 GG,
                 user,
                 Date,
                 Deadline,
                 DID
             }
            const D2 =  await new J2(input).save()
               console.log(D2);

             await interaction.reply(`<@${interaction.member.id}> added your deadline <:deadline:1003299351629664306> **${Deadline}** on **${Dd}**\n Deadline ID: *${DID}*`);
         } else return await interaction.reply('The year you entered is not a valid year, Please use the structure **DD/MM/YYYY** (example: !dl add 06/05/2022 Maths Test) ');
        } else return await interaction.reply('The month you entered did not match the structure **DD/MM/YYYY** (example: !dl add 06/05/2022 Maths Test) ');
     } else return await interaction.reply('The date you entered did not match the structure structure **DD/MM/YYYY** (example: !dl add 06/05/2022 Maths Test) ');      

  }

}


async function DeadlineList(interaction) {
    const { guild, member, channel } = interaction;
    const GG = guild.id
    const user = member.id
    const J2 = require("../schema/9Deadlines");

  
        const M2 = await J2.find({
            GG,
            user,
        })
        if (M2 && M2.length) {
            let reply = `Your deadlines: \n`
            for (qq of M2) {
                reply += `${qq.Date} Deadline: ${qq.Deadline} \nDeadline ID: *${qq.DID}*\n\n`
            }

            await interaction.reply(reply);
        }
}


async function Deadlineclear(interaction) {
    const { guild, member, channel } = interaction
    const J2 = require("../schema/9Deadlines");

    const GG = guild.id
    const user = member.id
    
   
        const H1 = await J2.deleteMany({
            GG,
            user,
        });

        await interaction.reply(`Deleted your deadlines!!`);
   
}

async function DeadlineRemove (interaction) {
  
    const J2 = require("../schema/9Deadlines");
    const { guild, member, channel } = interaction;
    const GG = guild.id
    const user = member.id

    const moment = require("moment");
    const today = moment().utc().format("DD/MM/YYYY");
    let dele = interaction.options.getString("deadlineid");

  
      const K1 = await J2.find({
        GG,
        user,
        DID: dele,
      })
      if (K1) {
        for (qq of K1) {
            await interaction.reply(`Deleted deadline ${qq.Date} of ${qq.Deadline}`);
        }
        await J2.deleteOne({
            GG,
            user,
            DID: dele,
        })

        
      } else await interaction.reply("Unable to find your deadline!! Make sure you typed exact same DeadlineID.");
   

}


function isDateBeforeToday(B, C) {
    const moment = require("moment");
    let current = moment().utc().format("DD/MM/YYYY")
    let Ca = current.toString()
    let J = Ca.split("/")
    let D = J[1]
    let E = J[2]

    return B < D;
}

function makeid(length) {
    var result           = '';
    var characters       = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    var charactersLength = characters.length;
    for ( var i = 0; i < length; i++ ) {
        result += characters.charAt(Math.floor(Math.random() * charactersLength));
    }
    return result;
}


module.exports = {
    DeadlineADD,
    DeadlineList,
    DeadlineRemove,
    Deadlineclear,
}