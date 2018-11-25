import { getUserFromMention } from '../index';

export const name = 'slap';
export const description = 'Slap another user';
export const args = true;
export const usage = '<user>';
export const execute = (message, args) => {
	const user = getUserFromMention(args[0]);
	if (!user) {
		return message.reply(
			'please use a proper mention (`@user`) if you want to slap someone.'
		);
	}
	message.channel.send(
		`${message.author.username} just slapped ${user.username}!`
	);
};
