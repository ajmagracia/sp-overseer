export const name = 'user-info';
export const description = 'Describe the author';
export const execute = (message, args) =>
	message.channel.send(
		`Your username: ${message.author.username}\nYour ID: ${message.author.id}`
	);
