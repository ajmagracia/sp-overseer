import { names } from '../config.json';
import { correctors, correctName, listenName } from '../index';
export const name = 'autocorrect';
export const aliases = ['correct', 'fix', 'l2spell'];
export const description =
	'Turn autocorrection on or off for all or individual names';
export const guildOnly = true;
export const arg = true;
export const usage = '<name>';
export const execute = (message, args) => {
	const user = args[0];
	if (!user) {
		return message.reply(
			'please supply a name to correct, or "all" to correct them all.'
		);
	}

	if (user === 'stop') {
		correctors.tap((corrector) => corrector.stop());
		return message.channel.send('All autocorrections have been halted.');
	}

	if (!Object.keys(names).includes(user)) {
		return message.reply(`"${user}" is not currently known to be incorrect.`);
	}
	// message.delete();
	if (user === 'all') {
		if (correctors.length !== names.length) {
			Object.keys(names).forEach((name_) => {
				correctors.set(name_, listenName(name_));
				correctName(name_, correctors);
			});
		}
		return message.channel.send('All names are currently being autocorrected.');
	}

	if (correctors.keyArray().includes(user)) {
		correctors.get(user).stop();
		return message.channel.send(`"${user}" is no longer being autocorrected.`);
	}

	correctors.set(user, listenName(user));
	correctName(user, correctors);
	return message.channel.send(`"${user}" is now being autocorrected.`);
};
