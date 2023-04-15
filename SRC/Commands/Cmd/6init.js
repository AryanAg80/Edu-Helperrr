module.exports = {
    commands: "Init",
    minArgs: 0,
    callback: async (message) => {
        const rgt = require("../../schema/8prediction");

        const T1 = await rgt.findOneAndUpdate({
            UserID: "anon",
        },{
            UserID: "anon",
            Perdiction: 1.1,
        },{
            upsert: true,
            new: true,
        })
        console.log(T1);
    } 
}