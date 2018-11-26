import { getUserFromMention } from '../index';

export const name = 'godslap';
export const description = 'The server Overseer destroys a user\'s face';
export const guildOnly = true;
export const args = true;
export const usage = '<user>';
export const execute = (message, args) => {
	const user = getUserFromMention(args[0]);
	if (!user) {
		return message.reply(
			'please use a proper mention (`@user`) if you want me to slap someone.'
		);
	}
	message.channel.send(
		`The Revered ${message.guild.name} Overseer just slapped ${user.username}!`
	);
};
