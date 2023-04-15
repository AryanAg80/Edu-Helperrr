module.exports = {
    commands: "HE",
    callback: async (message) => {
        message.reply("hrerfr");
        const anonschema = require("../../schema/3anoncount");

        let C = await anonschema.findOneAndUpdate(
            {
                UserId: "today"
            },
            {
                UserId: "today",
                $inc: {
                    messageCount: 1,
                },
            },
            {
                upsert: true,
                new: true,
            }
        )
        console.log(C)
    }
}