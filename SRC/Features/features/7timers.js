module.exports = (client) => {

const schedule = require("node-schedule");
const T1 = require("../../schema/25timers");

client.on('ready', async () => {
  
    const moment = require("moment");

    var j = schedule.scheduleJob('*/1 * * * *', async function () {
        const T2 = await T1.find();
        if (T2) {
        for (ee of T2) {
            const Time = ee.Timers
            const author = ee.user
            const TES = ee.Text
            const channel = ee.Channel
            const GG = ee.GG
            const chan = client.channels.cache.get(channel);
            const current = new Date(Date.now());
            const Curent = moment(current).format('DD/MM/YYYY-HH:mm')
            if (Time === Curent) {
                chan.send(`Timer finshed :tada:!! <@${author}>  ${TES}`);

                const T4 = await T1.findOneAndDelete({
                    GG: GG,
                    user: author,
                    Timers: Time,
                    Text: TES,
                });
                console.log(`Deleted Timer log!!`);
            } 

        }
    } else return;
    })
})

}
