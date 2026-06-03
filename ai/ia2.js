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
    this.fallbackUsed = 0;
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
      if (this.conversationContext.messageCount === 1) greeting = 'Bienvenue ! ';
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
        return 'Ton nom ne m\'a pas encore été confié. Si tu me le dis, je le retiendrai avec plaisir.';
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
      return 'Voici ce que je peux faire pour toi :\n• Retenir ton nom\n• Discuter (salutations, humeur)\n• Calculer (ex: 3+5)\n• Donner la date et l\'heure\n• Parler de météo, sport, musique\n• Apprendre de nouvelles choses\nDis-moi ce qui te ferait plaisir.';
    }

    // Météo (simulée)
    if (intent === 'météo' || topic === 'météo') {
      const conditions = ['ensoleillé', 'nuageux', 'pluvieux', 'orageux', 'venteux'];
      const random = conditions[Math.floor(Math.random() * conditions.length)];
      const temp = Math.floor(Math.random() * 15) + 10;
      return `Actuellement, c'est ${random} avec environ ${temp}°C. Une météo parfaite pour discuter avec moi, non ? 😊`;
    }

    // Sport (simulé)
    if (intent === 'sport' || topic === 'sport') {
      return 'Le sport, quel vaste sujet ! Je suis curieux de savoir quelle équipe ou quel athlète tu suis. Parle-moi un peu de tes passions sportives.';
    }

    // Musique
    if (intent === 'musique' || topic === 'musique') {
      return 'La musique adoucit les mœurs, dit-on. J\'aimerais beaucoup connaître tes goûts musicaux. Quel style écoutes-tu en ce moment ? 🎵';
    }

    // Apprentissage
    if (intent === 'apprentissage') {
      if (entities.name) {
        this.memory.setUserName(entities.name);
        return `J'ai bien noté que tu t'appelles ${entities.name}. C'est un très joli nom.`;
      }
      this.memory.updateContext('lastLearned', analysis.text);
      return `Très intéressant ! Je retiens cette information : "${analysis.text}". Nous en reparlerons.`;
    }

    // Préférences
    if (intent === 'préférence') {
      this.conversationContext.preferences.lastPreference = analysis.text;
      Storage.save('preferences', this.conversationContext.preferences);
      return 'C\'est bon à savoir. Je te connais un peu mieux maintenant, et ça me plaît. 😊';
    }

    // Calcul
    if (intent === 'calcul' || (rewritten && rewritten.includes('calcul'))) {
      const calcMatch = rewritten ? rewritten.match(/[\d+\-*/.() ]+/) : null;
      if (calcMatch) {
        const expr = calcMatch[0].trim();
        const result = this.compute(expr);
        if (result !== null) return `Le résultat de ${expr} est ${result}.`;
      }
      const exprMatch = analysis.text.match(/[\d+\-*/.() ]+/);
      if (exprMatch) {
        const expr = exprMatch[0].trim();
        const result = this.compute(expr);
        if (result !== null) return `Le résultat de ${expr} est ${result}.`;
      }
      return 'Peux-tu me donner l\'opération exacte ? Par exemple : « 5 + 3 » ou « 12 * 4 ».';
    }

    // Heure / date
    if (intent === 'heure' || (rewritten && rewritten.includes('heure'))) {
      const maintenant = new Date();
      const heure = maintenant.toLocaleTimeString('fr-FR', { hour: '2-digit', minute: '2-digit' });
      return `Il est précisément ${heure}.`;
    }
    if (intent === 'date' || (rewritten && rewritten.includes('date'))) {
      const maintenant = new Date();
      const date = maintenant.toLocaleDateString('fr-FR', { weekday: 'long', day: 'numeric', month: 'long', year: 'numeric' });
      return `Nous sommes le ${date}.`;
    }

    // --- FALLBACK INTELLIGENT (ne dit jamais "je ne comprends pas") ---
    this.fallbackUsed++;

    // Utiliser le contexte de la conversation pour rebondir
    if (this.lastTopic && this.fallbackUsed <= 2) {
      const topicResponses = {
        'météo': 'Tu veux en savoir plus sur la météo ? Je peux te donner les prévisions.',
        'sport': 'Le sport te passionne visiblement. Parle-moi de ton équipe favorite.',
        'musique': 'La musique est un beau sujet. As-tu un artiste préféré ?',
        'technologie': 'La technologie évolue vite. Quel sujet tech t\'intéresse le plus ?',
        'cuisine': 'La cuisine, un art délicieux. Quelle est ta spécialité ?'
      };
      if (topicResponses[this.lastTopic]) {
        return topicResponses[this.lastTopic];
      }
    }

    // Reformulation positive
    const reformulations = [
      `Quand tu dis « ${text} », je suis curieux. Peux-tu m'en dire un peu plus ?`,
      `« ${text} » — voilà qui est intéressant. Dans quel contexte me dis-tu cela ?`,
      `J'aimerais approfondir. Que voulais-tu dire par « ${text} » exactement ?`,
      `Ton message « ${text} » me parle. Développe, je t'écoute.`,
      `Intéressant ! Et si on explorait ce sujet ensemble ? Dis-m'en davantage.`,
      `« ${text} » — je sens que c'est important pour toi. Raconte-moi.`,
      `Je suis tout ouïe. Que puis-je faire pour toi par rapport à « ${text} » ?`,
      `Parlons-en. Qu'est-ce qui t'a amené à dire « ${text} » ?`
    ];

    // Si le message est très court, demander poliment d'élaborer
    if (text.length < 15) {
      return `« ${text} » — un seul mot parfois ne suffit pas. Peux-tu développer un peu ?`;
    }

    // Si c'est une question (contient "?")
    if (text.includes('?')) {
      const questionFallbacks = [
        `Bonne question ! Pour y répondre au mieux, peux-tu préciser le contexte ?`,
        `Je vais faire de mon mieux pour répondre. De quoi parle-t-on exactement ?`,
        `Ta question est légitime. Laisse-moi le temps d'y réfléchir. Peux-tu la reformuler autrement ?`
      ];
      return questionFallbacks[Math.floor(Math.random() * questionFallbacks.length)];
    }

    // Fallback ultime mais toujours positif
    return reformulations[Math.floor(Math.random() * reformulations.length)];
  }
        }
