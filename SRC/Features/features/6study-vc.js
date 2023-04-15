const { ADDCoins } = require("../../functions/2Addcoins");

module.exports = (client) => {
    client.on("voiceStateUpdate", async (oldMember, newMember) => {
        let oldVoice = oldMember.channelId
        let newVoice = newMember.channelId
        const chan = client.channels.cache.get("1096740027167420457");

        if (newVoice === "1017810847906660395") {
            if (oldVoice != newVoice) {
                let user = oldMember.id 
                    const guild = oldMember.guild
                    guild.members.cache.get(user).roles.add("1071677282160234536");

                    await chan.send(`Welcome <@${user}> to the Voice Channel!! \n Your study count will start in 1min.`);

            }
        }

        if (oldVoice === "1017810847906660395") {
            if (oldVoice != newVoice) {
                let user = oldMember.id
                const guild = oldMember.guild

                guild.members.cache.get(user).roles.remove("1071677282160234536");

            }
        }
    });


    client.on('ready', async () => {
        const schedule = require("node-schedule");
       
        var j = schedule.scheduleJob('*/6 * * * *', async function () {
            const guild = client.guilds.cache.get("1017810847046832179");
            try {
                guild.roles.cache.get('1071677282160234536').members.map(m => {
                    console.log(m.user.id);
                    const user = m.user.id
                    const B = AddTime(user)
                   
                    
                });
            } catch (err) {
                console.log(err);
            }
        });
    });

    client.on('ready', async () => {


        const schedule = require('node-schedule');
       
       const T1 = require("../../schema/6study");
       const T2 = require("../../schema/8prediction");
       const chan = client.channels.cache.get("1071678593849114654")
        var j = schedule.scheduleJob('0 2 * * *', async function () {
  
          const TT = await T1.find()

          for (tt of TT) {
            const user = tt.UserID
            const sun = tt.day1

            const TY = await T2.find({
               UserID: user,
            })
            for (ii of TY) {
               const Pre = ii.Prediction

                  chan.send(`<@${user}> your Predicted Study Hours are ${Pre}. \n I hope you it through. \n Good Luck for today 💖`);
            }
          }
   
            
        })
    });
}


async function AddTime (user) {
    ADDCoins(user, 4);
    const Timelog = "0.1"
    const SV = require("../../schema/6study");
    const d = new Date();

    console.log(d.getDay());
  
    const DAY = d.getDay()
  
    if (DAY === 0 ) {
         const T1 = await SV.findOneAndUpdate({
            UserID: user,
         },{
            UserID: user,
            $inc: {
                alltime: Timelog,
                daily: Timelog,
                monthly: Timelog,
                weekly: Timelog,
                day1: Timelog,
            },
         },{
            upsert: true,
            new: true,
         }) 
         console.log(T1);

         const T3 = await SV.findOneAndUpdate({
            UserID: "anon",
         },{
            UserID: "anon",
            $inc: {
                alltime: Timelog,
                daily: Timelog,
                monthly: Timelog,
                weekly: Timelog,
                day1: Timelog,
            },
         },{
            upsert: true,
            new: true,
         }) 
         console.log(T3);
    }

    if (DAY === 1 ) {
        const T1 = await SV.findOneAndUpdate({
           UserID: user,
        },{
           UserID: user,
           $inc: {
               alltime: Timelog,
               daily: Timelog,
               monthly: Timelog,
               weekly: Timelog,
               day2: Timelog,
           },
        },{
           upsert: true,
           new: true,
        }) 
        console.log(T1);

        const T3 = await SV.findOneAndUpdate({
            UserID: "anon",
         },{
            UserID: "anon",
            $inc: {
                alltime: Timelog,
                daily: Timelog,
                monthly: Timelog,
                weekly: Timelog,
                day1: Timelog,
            },
         },{
            upsert: true,
            new: true,
         }) 
         console.log(T3);
   }

   if (DAY === 2 ) {
    const T1 = await SV.findOneAndUpdate({
       UserID: user,
    },{
       UserID: user,
       $inc: {
           alltime: Timelog,
           daily: Timelog,
           monthly: Timelog,
           weekly: Timelog,
           day3: Timelog,
       },
    },{
       upsert: true,
       new: true,
    }) 
    console.log(T1);

    const T3 = await SV.findOneAndUpdate({
        UserID: "anon",
     },{
        UserID: "anon",
        $inc: {
            alltime: Timelog,
            daily: Timelog,
            monthly: Timelog,
            weekly: Timelog,
            day1: Timelog,
        },
     },{
        upsert: true,
        new: true,
     }) 
     console.log(T3);
}

if (DAY === 3 ) {
    const T1 = await SV.findOneAndUpdate({
       UserID: user,
    },{
       UserID: user,
       $inc: {
           alltime: Timelog,
           daily: Timelog,
           monthly: Timelog,
           weekly: Timelog,
           day4: Timelog,
       },
    },{
       upsert: true,
       new: true,
    }) 
    console.log(T1);

    const T3 = await SV.findOneAndUpdate({
        UserID: "anon",
     },{
        UserID: "anon",
        $inc: {
            alltime: Timelog,
            daily: Timelog,
            monthly: Timelog,
            weekly: Timelog,
            day1: Timelog,
        },
     },{
        upsert: true,
        new: true,
     }) 
     console.log(T3);
}

if (DAY === 4 ) {
    const T1 = await SV.findOneAndUpdate({
       UserID: user,
    },{
       UserID: user,
       $inc: {
           alltime: Timelog,
           daily: Timelog,
           monthly: Timelog,
           weekly: Timelog,
           day5: Timelog,
       },
    },{
       upsert: true,
       new: true,
    }) 
    console.log(T1);

    const T3 = await SV.findOneAndUpdate({
        UserID: "anon",
     },{
        UserID: "anon",
        $inc: {
            alltime: Timelog,
            daily: Timelog,
            monthly: Timelog,
            weekly: Timelog,
            day1: Timelog,
        },
     },{
        upsert: true,
        new: true,
     }) 
     console.log(T3);
}

if (DAY === 5 ) {
    const T1 = await SV.findOneAndUpdate({
       UserID: user,
    },{
       UserID: user,
       $inc: {
           alltime: Timelog,
           daily: Timelog,
           monthly: Timelog,
           weekly: Timelog,
           day6: Timelog,
       },
    },{
       upsert: true,
       new: true,
    }) 
    console.log(T1);

    const T3 = await SV.findOneAndUpdate({
        UserID: "anon",
     },{
        UserID: "anon",
        $inc: {
            alltime: Timelog,
            daily: Timelog,
            monthly: Timelog,
            weekly: Timelog,
            day1: Timelog,
        },
     },{
        upsert: true,
        new: true,
     }) 
     console.log(T3);
}

if (DAY === 6 ) {
    const T1 = await SV.findOneAndUpdate({
       UserID: user,
    },{
       UserID: user,
       $inc: {
           alltime: Timelog,
           daily: Timelog,
           monthly: Timelog,
           weekly: Timelog,
           day7: Timelog,
       },
    },{
       upsert: true,
       new: true,
    }) 
    console.log(T1);
    const T3 = await SV.findOneAndUpdate({
        UserID: "anon",
     },{
        UserID: "anon",
        $inc: {
            alltime: Timelog,
            daily: Timelog,
            monthly: Timelog,
            weekly: Timelog,
            day1: Timelog,
        },
     },{
        upsert: true,
        new: true,
     }) 
     console.log(T3);
}
}