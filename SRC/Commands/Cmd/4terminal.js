module.exports = {
    commands: ["run"],
    minArgs: 0,
    callback: async (message, arguments, text) => {
        const termi = require("compile-run");
        const { MessageEmbed } = require("discord.js");
        const fetch = (...args) => import('node-fetch').then(({default: fetch}) => fetch(...args));
        const {
             c,
             cpp,
             python,
             java,
             node
        } = termi
          

        const file = message.attachments.first()?.url;
        if (!file) return console.log('No attached file found');
      
        try {
          message.channel.send('Reading the file! Fetching data...');
      
            const response = await fetch(file);

        if (arguments[0] === "c") {
            let Result = c.runSource(await response.text());

            Result 
            .then (result => {
               const Embd = new MessageEmbed()
               .setDescription(`Your result: \n ${result.stdout}`)

               message.channel.send({ embeds: [Embd]});
            })
            .catch(err => {
                console.log(err);
                message.channel.send(err);
            })
        }

        if (arguments[0] === "cpp") {
            let Result = cpp.runSource(await response.text());

            Result 
            .then (result => {
                const Embd = new MessageEmbed()
                .setDescription(`Your result: \n ${result.stdout}`)
 
                message.channel.send({ embeds: [Embd]});
            })
            .catch(err => {
                console.log(err);
                message.channel.send(err);
            })
        }
        if (arguments[0] === "python") {
            let Result = python.runSource(await response.text());

            Result 
            .then (result => {               
                const Embd = new MessageEmbed()
               .setDescription(`Your result: \n ${result.stdout}`)

               message.channel.send({ embeds: [Embd]}); 
            })
            .catch(err => {
                console.log(err);
                message.channel.send(err);
            })
        }
        if (arguments[0] === "java") {
            let Result = java.runSource(await response.text());

            Result 
            .then (result => {
                const Embd = new MessageEmbed()
                .setDescription(`Your result: \n ${result.stdout}`)
 
                message.channel.send({ embeds: [Embd]});
            })
            .catch(err => {
                console.log(err);
                message.channel.send(err);
            })
        }
        if (arguments[0] === "node") {
            let Result = node.runSource(await response.text());

            Result 
            .then (result => {
                const Embd = new MessageEmbed()
                .setDescription(`Your result: \n ${result.stdout}`)
 
                message.channel.send({ embeds: [Embd]});
            })
            .catch(err => {
                console.log(err);
                message.channel.send(err);
            })
        }
    }
    catch (error) {
        console.log(error);
      }
}


}