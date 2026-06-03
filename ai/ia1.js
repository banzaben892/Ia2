class IA1 {
  constructor() {
    this.synonyms = {
      'bonjour': ['salut', 'hello', 'coucou', 'yo', 'wesh', 'bonsoir', 'bjr', 'hey', 'coucou', 'hola'],
      'au revoir': ['bye', 'a+', 'a plus', 'tchao', 'ciao', 'adieu', 'goodbye', 'à bientôt'],
      'nom': ['nom', 'blase', 'blaze', 'surnom', 'pseudo', 'identité', 'prénom'],
      'qui es-tu': ['qui es tu', 'tu es qui', 'c\'est qui toi', 't\'es quoi', 'ton rôle', 'présente toi'],
      'comment ca va': ['ca va', 'ça va', 'comment vas-tu', 'tu vas bien', 'la forme', 'quoi de neuf'],
      'merci': ['merci', 'thanks', 'thx', 'remerciement', 'merci beaucoup'],
      'aide': ['aide', 'help', 'au secours', 'que sais-tu faire', 'capacités', 'fonctionnalités'],
      'calcul': ['calcule', 'calcul', 'combien fait', 'résultat de', 'addition', 'soustraction'],
      'heure': ['heure', 'quelle heure', 'horaire', 'temps'],
      'date': ['date', 'quel jour', 'aujourd\'hui', 'on est quel jour'],
      'météo': ['météo', 'temps', 'pleut', 'soleil', 'température', 'climat'],
      'sport': ['sport', 'foot', 'match', 'score', 'équipe'],
      'musique': ['musique', 'chanson', 'artiste', 'groupe', 'playlist'],
      'apprentissage': ['apprends', 'souviens', 'note', 'retiens', 'rappelle'],
      'préférence': ['j\'aime', 'je préfère', 'mon plat préféré', 'ma couleur préférée']
    };

    this.stopWords = new Set([
      'le','la','les','un','une','des','de','du','à','au','aux',
      'ce','cet','cette','ces','est','sont','suis','es','sommes','êtes',
      'je','tu','il','elle','on','nous','vous','ils','elles',
      'me','te','se','moi','toi','lui','nous','vous','leur','y','en',
      'que','qui','quoi','dont','où','comment','pourquoi','quand',
      'et','ou','mais','donc','car','ni','or',
      'ne','pas','plus','jamais','rien','tout','très','trop',
      'alors','avec','dans','par','pour','sur','vers','chez','depuis'
    ]);
  }

  stem(word) {
    const lower = word.toLowerCase();
    const suffixes = [
      'er', 'ir', 're', 'é', 'ée', 'és', 'ées', 'ez', 'ais', 'ait', 'aient', 'ions', 'iez',
      'ant', 'ante', 'ants', 'antes', 'ment', 'tion', 'sion', 'isme', 'able', 'ible',
      'euse', 'eur', 'teur', 'trice', 'ique', 'iste', 'esse', 'age', 'ure', 'ance', 'ence'
    ];
    for (let suf of suffixes) {
      if (lower.endsWith(suf) && lower.length > suf.length + 2) {
        return lower.slice(0, -suf.length);
      }
    }
    if (lower.endsWith('s') && lower.length > 3) return lower.slice(0, -1);
    if (lower.endsWith('aux') && lower.length > 4) return lower.slice(0, -3) + 'al';
    return lower;
  }

  normalizeWord(word) {
    let w = word.toLowerCase().trim();
    w = w.normalize("NFD").replace(/[\u0300-\u036f]/g, "");
    return this.stem(w);
  }

  detectTopic(tokens, phrase) {
    const topics = {
      'météo': ['météo', 'temps', 'pluie', 'soleil', 'neige', 'vent', 'orage', 'température', 'climat', 'pleut', 'froid', 'chaud'],
      'sport': ['sport', 'football', 'basket', 'tennis', 'match', 'score', 'équipe', 'joueur', 'championnat', 'coupe'],
      'musique': ['musique', 'chanson', 'artiste', 'groupe', 'album', 'playlist', 'spotify', 'concert', 'guitare'],
      'technologie': ['tech', 'ordinateur', 'téléphone', 'app', 'application', 'internet', 'site', 'web', 'code', 'programmation'],
      'cuisine': ['cuisine', 'recette', 'manger', 'plat', 'restaurant', 'nourriture', 'boisson', 'café', 'thé']
    };

    for (let [topic, keywords] of Object.entries(topics)) {
      if (keywords.some(kw => tokens.includes(kw) || phrase.includes(kw))) {
        return topic;
      }
    }
    return null;
  }

  detectIntentWithSynonyms(tokens) {
    const normalizedTokens = tokens.map(t => this.normalizeWord(t));
    const phrase = normalizedTokens.join(' ');

    for (let [intent, variants] of Object.entries(this.synonyms)) {
      for (let v of variants) {
        if (phrase.includes(v.replace(/\s+/g, '')) || normalizedTokens.includes(v.replace(/\s+/g, ''))) {
          return intent;
        }
      }
    }

    if (/peux-tu (apprendre|retenir)/i.test(phrase)) return 'apprentissage';
    if (/(j'aime|je préfère|mon .+ préféré)/i.test(phrase)) return 'préférence';
    if (/quelle est (la|ma) météo/i.test(phrase)) return 'météo';
    if (/qui a gagné/i.test(phrase)) return 'sport';
    if (/comment (je )?(m'appelle|mon nom)/i.test(phrase)) return 'memory_get';
    if (/je (m'appelle|suis|nom est)/i.test(phrase)) return 'memory_set';
    if (/qui (es-tu|tu es)/i.test(phrase)) return 'identity';
    if (/\?/i.test(phrase)) return 'question';

    return 'unknown';
  }

  rewriteQuery(text, intent, topic) {
    const rewrites = {
      'greeting': 'Salutation',
      'au revoir': 'Dire au revoir',
      'nom': 'Demander le nom',
      'qui es-tu': 'Demander identité',
      'comment ca va': 'Prendre des nouvelles',
      'merci': 'Remercier',
      'aide': 'Demander de l\'aide',
      'calcul': 'Faire un calcul',
      'heure': 'Demander l\'heure',
      'date': 'Demander la date',
      'météo': 'Parler de la météo',
      'sport': 'Parler de sport',
      'musique': 'Parler de musique',
      'apprentissage': 'Apprendre quelque chose',
      'préférence': 'Exprimer une préférence',
      'memory_get': 'Quel est mon nom ?',
      'memory_set': 'Je te dis mon nom',
      'identity': 'Qui es-tu ?'
    };
    return rewrites[intent] || (topic ? `Parler de ${topic}` : text);
  }

  analyse(text) {
    let cleaned = text.trim();
    let tokens = cleaned.split(/\s+/);
    let contentWords = tokens.filter(w => !this.stopWords.has(w.toLowerCase()));

    const intent = this.detectIntentWithSynonyms(contentWords);
    const topic = this.detectTopic(contentWords, cleaned.toLowerCase());
    const rewritten = this.rewriteQuery(cleaned, intent, topic);

    let entities = {};
    if (intent === 'memory_set') {
      const namePattern = /(?:je\s+(?:m'appelle|suis)|mon\s+nom\s+(?:est|c'est))\s+([a-zA-Zàâäéèêëîïôöùûüç\-]+)/i;
      const match = cleaned.match(namePattern);
      if (match) entities.name = match[1];
    }

    const timeMatch = cleaned.match(/(\d{1,2})[h:](\d{2})?/);
    if (timeMatch) {
      entities.time = `${timeMatch[1]}:${timeMatch[2] || '00'}`;
    }

    const dateMatch = cleaned.match(/(\d{1,2})[/-](\d{1,2})(?:[/-](\d{2,4}))?/);
    if (dateMatch) {
      entities.date = `${dateMatch[1]}/${dateMatch[2]}${dateMatch[3] ? '/' + dateMatch[3] : ''}`;
    }

    const positive = ['bien', 'super', 'génial', 'cool', 'heureux', 'content', 'top', 'parfait', 'excellent', 'génial', 'magnifique'];
    const negative = ['mal', 'triste', 'nul', 'horrible', 'affreux', 'terrible', 'déçu', 'ennuyeux', 'fatigué', 'stressé'];
    let sentiment = 'neutre';
    const lowerContent = contentWords.map(w => w.toLowerCase());
    if (positive.some(w => lowerContent.includes(w))) sentiment = 'positif';
    else if (negative.some(w => lowerContent.includes(w))) sentiment = 'négatif';

    return {
      intent,
      entities,
      sentiment,
      topic,
      rewritten
    };
  }
}
