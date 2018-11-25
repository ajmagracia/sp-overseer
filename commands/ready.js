import { ReadyMembers } from '../index';

export const name = 'ready';
export const description = 'Declare readiness for the suicide pact';
export const aliases = ['imready'];
export const guildOnly = true;
export const cooldown = 5;
export const execute = async (message, args) => {
	try {
		const readyMember = await ReadyMembers.create({
			userid: message.author.id,
			username: message.author.username,
		});
		return message.channel.send(
			`${readyMember.username} is ready to commence the suicide pact.`
		);
	}
	catch (err) {
		if (err.name === 'SequelizeUniqueConstraintError') {
			return message.channel.send(
				`${
					message.author.username
				} is already ready to commence the suicide pact.`
			);
		}
		return message.reply(
			'something went wrong with readying up for the suicide pact.'
		);
	}
};
