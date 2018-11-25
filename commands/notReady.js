import { ReadyMembers } from '../index';

export const name = 'notready';
export const description = 'Declare readiness for the suicide pact';
export const aliases = ['unready', 'bail'];
export const guildOnly = true;
export const cooldown = 5;
export const execute = async (message, args) => {
	const rowCount = await ReadyMembers.destroy({
		where: { userid: message.author.id },
	});
	if (!rowCount) {
		return message.channel.send('Fool. You weren\'t even ready to begin with.');
	}
	return message.channel.send(
		`${
			message.author.username
		} is no longer ready to commence the suicide pact.`
	);
};
