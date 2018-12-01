export const name = 'shup';
export const description = 'Shup';
export const aliases = ['ship', 'shoop', 'shop', 'sup'];
export const cooldown = 1;
export const execute = (message, args) => {
	// message.delete();
	message.channel.send('Shup');
};
