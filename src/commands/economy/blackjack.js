const { MessageEmbed } = require('discord.js');
const db = require("quick.db");
const suits = ['♣️', '♥', '♦', '♠️'];
const faces = ['Jack', 'Queen', 'King'];

const { shuffle, verifyText } = require('../../../util.js');
const decks = new Map();

exports.run = async (client, message, args, color, prefix, api, CanvasRenderService, ytdl, YouTube, play, chunk, handleVideo, youtube, queue) => {
  
  let user = message.author;
  
    let cek = db.get(`check.${user.id}`)
  if (!cek)
    {
      return message.channel.send(`__${user.tag}__ is not login! use \`${prefix}login\` to login!`)
    }

  let bal = db.get(`balance.${message.author.id}.wallet`)
  
  let amount = parseInt(args[0]);
  
    if (!amount) return message.channel.send('You need to specify amount to bet.')
    if (isNaN(amount)) return message.channel.send(`**${message.author.username}**, Please enter valid number!`);
    if (amount > 1000) return message.channel.send('Bet msx to 1000 only');
    
    if(bal < amount) return message.channel.send(`**${message.author.username}**, You\'re betting more than you have!`);
    
    
		let deckCount = 4;
		
		if (decks.has(message.channel.id)) return message.reply('Only one game may be occurring per channel.');
		try {
			decks.set(message.channel.id, generateDeck(deckCount));
			const dealerHand = [];
			draw(message.channel, dealerHand);
			draw(message.channel, dealerHand);
			const playerHand = [];
			draw(message.channel, playerHand);
			draw(message.channel, playerHand);
			const dealerInitialTotal = calculate(dealerHand);
			const playerInitialTotal = calculate(playerHand);
			if (dealerInitialTotal === 21 && playerInitialTotal === 21) {
				decks.delete(message.channel.id);
				return message.channel.send('Well, both of you just hit blackjack. Right away. Rigged.');
			} else if (dealerInitialTotal === 21) {
				decks.delete(message.channel.id);
				//return;
        db.subtract(`balance.${message.author.id}.wallet`, amount)
				return message.channel.send(`Ouch, the dealer hit blackjack right away! You lost 🪙 **${amount}**, I hope you do better next time!`);
        
			} else if (playerInitialTotal === 21) {
				decks.delete(message.channel.id);
				//return;

        db.add(`balance.${message.author.id}.wallet`, amount)
				return message.channel.send(`Wow, you hit blackjack right away! Lucky and you won 🪙 **${amount}**!`);

			}
			let playerTurn = true;
			let win = false;
			let reason;
			while (!win) {
				if (playerTurn) {
					let m = await message.channel.send(`**First Dealer Card:** ${dealerHand[0].display}\n**You (${calculate(playerHand)}):**\n${playerHand.map(card => card.display).join('\n')}\n\n_Hit?_ *(yes/no)*`);
					const hit = await verifyText(message.channel, message.author);
					 m.delete();
					if (hit) {
						const card = draw(message.channel, playerHand);
						const total = calculate(playerHand);
						if (total > 21) {
							reason = `You drew ${card.display}, total of ${total}! Bust`;
							break;
						} else if (total === 21) {
							reason = `You drew ${card.display} and hit 21`;
							win = true;
						}
					} else {
						const dealerTotal = calculate(dealerHand);
						await message.channel.send(`Second dealer card is ${dealerHand[1].display}, total of ${dealerTotal}.`);
						playerTurn = false;
					}
				} else {
					const inital = calculate(dealerHand);
					let card;
					if (inital < 17) card = draw(message.channel, dealerHand);
					const total = calculate(dealerHand);
					if (total > 21) {
						reason = `Dealer drew ${card.display}, total of ${total}! Dealer bust`;
						win = true;
					} else if (total >= 17) {
						const playerTotal = calculate(playerHand);
						if (total === playerTotal) {
							reason = `${card ? `Dealer drew ${card.display}, making it ` : ''}${playerTotal}-${total}`;
							break;
						} else if (total > playerTotal) {
							reason = `${card ? `Dealer drew ${card.display}, making it ` : ''}${playerTotal}-**${total}**`;
							break;
						} else {
							reason = `${card ? `Dealer drew ${card.display}, making it ` : ''}**${playerTotal}**-${total}`;
							win = true;
						}
					} else {
						await message.channel.send(`Dealer drew ${card.display}, total of ${total}.`);
					}
				}
			}
			decks.delete(message.channel.id);
			if (win) {
      db.add(`balance.${message.author.id}.wallet`, amount)  
                 return message.channel.send(`${reason}! You won 🪙 **${amount}**!`);

			} else {
      db.subtract(`balance.${message.author.id}.wallet`, amount)
			     return message.channel.send(`${reason}! You lost 🪙 **${amount}**.`);

			} 
		} catch (err) {
			decks.delete(message.channel.id);
			throw err;
		}
	}

	function generateDeck(deckCount) {
		const deck = [];
		for (let i = 0; i < deckCount; i++) {
			for (const suit of suits) {
				deck.push({
					value: 11,
					display: `${suit} Ace`
				});
				for (let j = 2; j <= 10; j++) {
					deck.push({
						value: j,
						display: `${suit} ${j}`
					});
				}
				for (const face of faces) {
					deck.push({
						value: 10,
						display: `${suit} ${face}`
					});
				}
			}
		}
		return shuffle(deck);
	}

	function draw(channel, hand) {
		const deck = decks.get(channel.id);
		const card = deck[0];
		deck.shift();
		hand.push(card);
		return card;
	}

	function calculate(hand) {
		return hand.sort((a, b) => a.value - b.value).reduce((a, b) => {
			let { value } = b;
			if (value === 11 && a + value > 21) value = 1;
			return a + value;
		}, 0);
	}
  
  


exports.conf = {
    aliases: ['bj'],
    cooldown: "5"
}

exports.help = {
    name: 'blackjack',
    description: 'Play black jack',
    usage: 'blackjack <amount>'
}