class IA2 {
  constructor(memory) {
    this.memory = memory;
    this.lastTopic = null;
    this.conversationContext = {
      lastIntent: null,
      lastEntities: {},
      messageCount: 0,
      preferences: Storage.load('preferences', {})
    };
  }

  compute(expression) {
    const sanitized = expression.replace(/[^0-9+\-*/.() ]/g, '');
    try {
      const result = Function('"use strict"; return (' + sanitized + ')')();
      return result;
    } catch (e) {
      return null;
    }
  }

  process(analysis) {
    const { intent, entities, sentiment, topic, rewritten, text } = analysis;
    this.conversationContext.messageCount++;

    if (intent !== 'unknown') {
      this.lastTopic = topic || intent;
      this.conversationContext.lastIntent = intent;
      this.conversationContext.lastEntities = entities;
    }

    // Salutations
    if (intent === 'greeting') {
      const name = this.memory.userName;
      const hour = new Date().getHours();
      let greeting = '';
      if (this.conversationContext.messageCount === 1) {
        greeting = 'Bienvenue ! ';
      }
      if (hour < 12) greeting += name ? `Bonjour ${name} ☀️` : 'Bonjour ☀️';
      else if (hour < 18) greeting += name ? `Bon après-midi ${name} 🌤️` : 'Bon après-midi 🌤️';
      else greeting += name ? `Bonsoir ${name} 🌙` : 'Bonsoir 🌙';
      return greeting + ' Que puis-je faire pour toi ?';
    }

    // Dire au revoir
    if (intent === 'au revoir') {
      return 'Au revoir ! Passe une belle journée 😊';
    }

    // Identité
    if (intent === 'qui es-tu' || intent === 'identity') {
      return 'Je suis Mini ChatGPT, un assistant local et hors-ligne. Je peux discuter, retenir ton nom, faire des calculs simples et plus encore !';
    }

    // Nom
    if (intent === 'nom' || intent === 'memory_get') {
      if (this.memory.userName) {
        return `Tu t'appelles ${this.memory.userName} 😊`;
      } else {
        return 'Je ne connais pas encore ton nom. Dis-moi « je m\'appelle [ton prénom] » pour que je le retienne.';
      }
    }

    // Enregistrement du nom
    if (intent === 'memory_set' && entities.name) {
      this.memory.setUserName(entities.name);
      return `Enchanté ${entities.name} 👋 Je m'en souviendrai. Veux-tu que je t'appelle autrement ?`;
    }

    // Comment ça va
    if (intent === 'comment ca va') {
      const reponses = [
        'Je vais bien, merci ! Et toi ?',
        'Tout fonctionne parfaitement de mon côté 😄',
        'Ça gaz ! Et toi, comment te sens-tu ?'
      ];
      return reponses[Math.floor(Math.random() * reponses.length)];
    }

    // Merci
    if (intent === 'merci') {
      return 'Avec plaisir ! N\'hésite pas si tu as besoin d\'autre chose 😊';
    }

    // Aide
    if (intent === 'aide') {
      return 'Voici ce que je sais faire :\n• Retenir ton nom\n• Discuter (salutations, humeur)\n• Calculer (ex: 3+5)\n• Donner la date et l\'heure\n• Parler de météo, sport, musique\n• Comprendre des synonymes\nEssaie par exemple : « calcule 12 * 3 » ou « il est quelle heure ? »';
    }

    // Météo (simulée)
    if (intent === 'météo' || topic === 'météo') {
      const conditions = ['ensoleillé', 'nuageux', 'pluvieux', 'orageux', 'venteux'];
      const random = conditions[Math.floor(Math.random() * conditions.length)];
      const temp = Math.floor(Math.random() * 15) + 10;
      return `Actuellement, c'est ${random} avec environ ${temp}°C. C'est une bonne journée pour rester au chaud et discuter avec moi ! 😊`;
    }

    // Sport (simulé)
    if (intent === 'sport' || topic === 'sport') {
      return 'Je suis au courant des derniers matchs ! Malheureusement, je n\'ai pas accès aux scores en direct, mais je peux discuter de tes équipes préférées. Laquelle supportes-tu ?';
    }

    // Musique
    if (intent === 'musique' || topic === 'musique') {
      return 'J\'adore la musique ! Même si je ne peux pas en écouter, je connais beaucoup de styles. Quel est ton genre préféré ? 🎵';
    }

    // Apprentissage
    if (intent === 'apprentissage') {
      if (entities.name) {
        this.memory.setUserName(entities.name);
        return `J'ai bien noté que tu t'appelles ${entities.name}. Merci de me l'avoir appris !`;
      }
      this.memory.updateContext('lastLearned', analysis.text);
      return `J'ai retenu : "${analysis.text}". Je m'en souviendrai !`;
    }

    // Préférences
    if (intent === 'préférence') {
      this.conversationContext.preferences.lastPreference = analysis.text;
      Storage.save('preferences', this.conversationContext.preferences);
      return 'Je note ta préférence ! Je te connais un peu mieux maintenant. 😊';
    }

    // Calcul
    if (intent === 'calcul' || (rewritten && rewritten.includes('calcul'))) {
      const calcMatch = rewritten ? rewritten.match(/[\d+\-*/.() ]+/) : null;
      if (calcMatch) {
        const expr = calcMatch[0].trim();
        const result = this.compute(expr);
        if (result !== null) {
          return `Le résultat de ${expr} est ${result}.`;
        }
      }
      const exprMatch = analysis.text.match(/[\d+\-*/.() ]+/);
      if (exprMatch) {
        const expr = exprMatch[0].trim();
        const result = this.compute(expr);
        if (result !== null) {
          return `Le résultat de ${expr} est ${result}.`;
        }
      }
      return 'Désolé, je n\'ai pas compris le calcul. Tu peux écrire par exemple « calcule 5+3 ».';
    }

    // Heure / date
    if (intent === 'heure' || (rewritten && rewritten.includes('heure'))) {
      const maintenant = new Date();
      const heure = maintenant.toLocaleTimeString('fr-FR', { hour: '2-digit', minute: '2-digit' });
      return `Il est ${heure}.`;
    }
    if (intent === 'date' || (rewritten && rewritten.includes('date'))) {
      const maintenant = new Date();
      const date = maintenant.toLocaleDateString('fr-FR', { weekday: 'long', day: 'numeric', month: 'long', year: 'numeric' });
      return `Nous sommes le ${date}.`;
    }

    // Fallback
    const fallbacks = [
      'Je ne suis pas sûr de comprendre. Peux-tu reformuler ?',
      'Désolé, je n\'ai pas encore appris à répondre à cela. Essaie de me parler de ton nom, ou demande-moi l\'heure.',
      'Je suis encore en apprentissage. Tu peux me dire « aide » pour voir ce que je sais faire.'
    ];
    return fallbacks[Math.floor(Math.random() * fallbacks.length)];
  }
}
