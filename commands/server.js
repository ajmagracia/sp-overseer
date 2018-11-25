export const name = 'server';
export const description = 'Describe the server';
export const execute = (message, args) =>
	message.channel.send(`This server's name is: ${message.guild.name}`);
