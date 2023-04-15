const TT = require("../schema/7Edu-coins");

async function ADDCoins(user, coins) {
    const T1 = await TT.findOneAndUpdate({
        user,
    },{
        user,
        $inc: {
            EduCoins: coins,
        }
    },{
        upsert: true,
        new: true,
    })
}

module.exports = {
    ADDCoins
}