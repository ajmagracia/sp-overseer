export const name = 'ping';
export const description = 'Ping!';
export const execute = (message, args) => message.channel.send('Pong.');
