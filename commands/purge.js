exports.run = (bot, message, args, func) => {

     // We have to wrap this in an async since awaits only work in time.
     async function purge() { 
        message.delete(); // Lets delete the command message, so it doesn interface with the message.

        // Now, we want to check if the user has the "bot-commander" role, you can chnage this to wahetever you want.
        if (!message.member.roles.find("name", "bot-commander")) { // This checks to see if the user has the role.
            message.channel.send("You need the \`bot-commander\` role to use this command."); // This tells the user that they cant use this without the role.
            return; // This returns the code, so the rest doesn't run.
        }

        // We want to check if the argument is a number
        if (isNaN(args[0])) {
            // Sends a message to the channel.
            message.channel.send('Please use a number as your arguments. \n Usage: ' + prefix + 'purge <amount>'); //\n means new line
            // Cancels out of the script, so the rest doesn't run.
            return;
        }

        const fetched = await message.channel.fetchMessage({limit: args[0]}); // This grabs the last number(args) of messages in the channel.
        console.log(fetched.size + " message found, deleting..."); // lets post this into console how many messages we are deleting

        // Deleting the messages
        message.channel.bulkDelete(fetched)
            .catch(error => message.channel.send(`Error: ${error}`)); // If it finds an error, it posts it into the channel.

    }

    // We want to make sure we call the function whenever the purge command is run.
    purge(); // Make sure this is inside the if(msg.startsWith)
}