class IA3 {
  constructor() {
    this.variants = {
      greeting: ['Ravi de te voir ! Comment se passe ta journée ?', 'Content de te retrouver 😊 Que puis-je faire pour toi ?', 'Salut ! Quoi de neuf ?'],
      farewell: ['À bientôt ! Prends soin de toi.', 'Bonne continuation et à très vite 👋', 'Je reste là si tu as besoin. Bye !'],
      identity: ['Moi c\'est Mini ChatGPT, ton assistant 100% local. En quoi puis-je t\'aider ?', 'Je suis ton assistant personnel, sans cloud ni mouchard. Cool, non ? 😎'],
      memory_set: ['Noté ! Ravi de faire ta connaissance. Tu veux qu\'on parle d\'un sujet en particulier ?', 'Bien reçu. Si jamais tu veux que je t\'appelle autrement, dis-le moi.'],
      memory_get: ['D\'après mes souvenirs, tu es {name}. C\'est bien ça ?', 'Je n\'oublie jamais un nom : tu t\'appelles {name}.'],
      default: ['Je vois. Dis-m\'en un peu plus.', 'Intéressant ! Est-ce que tu peux préciser ?', 'D\'accord. Est-ce qu\'il y a autre chose que je puisse faire pour toi ?']
    };
  }

  polish(rawResponse, analysis) {
    const { intent, sentiment, topic, rewritten } = analysis || {};
    let response = rawResponse;

    const hour = new Date().getHours();
    let periodEmoji = '';
    if (hour < 12) periodEmoji = '☀️';
    else if (hour < 18) periodEmoji = '🌤️';
    else periodEmoji = '🌙';

    if (sentiment === 'positif') response = this.makeWarmer(response);
    else if (sentiment === 'négatif') response = this.makeEncouraging(response);

    const emojiMap = {
      greeting: '👋', farewell: '👋', identity: '🤖', memory_set: '🧠', memory_get: '🔍',
      calcul: '🧮', heure: '⏰', date: '📅', aide: '❓', merci: '🙏', comment_ca_va: '😊',
      météo: '🌡️', sport: '⚽', musique: '🎵'
    };

    const intentKey = intent || '';
    if (emojiMap[intentKey] && !response.includes(emojiMap[intentKey])) response += ' ' + emojiMap[intentKey];

    if (Math.random() > 0.5 && intent !== 'farewell' && intent !== 'unknown' && !response.includes('Peux-tu')) {
      response += ' ' + this.pickRandom(this.variants.default);
    }

    if (intent === 'greeting') response += ' ' + periodEmoji;

    response = response.replace(/\s{2,}/g, ' ').trim();
    return response;
  }

  makeWarmer(text) {
    if (!text.match(/😊|😄|😃|👍/)) return text + ' 😊';
    return text;
  }

  makeEncouraging(text) {
    const encouragements = [
      'Je vois. Et si on voyait le bon côté des choses ?',
      'Chaque problème a une solution. Nous allons la trouver ensemble.',
      'C\'est en parlant qu\'on avance. Continue, je suis là.',
      'Parfois, il suffit d\'en parler pour que ça aille mieux.'
    ];
    return text + ' ' + encouragements[Math.floor(Math.random() * encouragements.length)];
  }

  pickRandom(arr) {
    return arr[Math.floor(Math.random() * arr.length)];
  }
        }
