class IA1 {
  constructor() {
    this.synonyms = {
      'bonjour': ['salut', 'hello', 'coucou', 'yo', 'wesh', 'bonsoir', 'bjr', 'hey', 'coucou', 'hola', 'slt', 'bonsoir', 'bon matin', 'good morning', 'buenos dias', 'buongiorno', 'guten tag', 'bom dia', 'salutation', 'greetings', 'hi', 'heya', 'howdy', 'yo', 'sup', 'wassup', 'coucou', 'plop', 'bjr', 'bsr', 'bnsr', 'bonjourno', 'saludos', 'ola', 'bonj', 'bnj', 'bnojour', 'bounjour', 'bonnjour'],
      'au revoir': ['bye', 'a+', 'a plus', 'tchao', 'ciao', 'adieu', 'goodbye', 'à bientôt', 'a bientot', 'bye bye', 'buh bye', 'later', 'see ya', 'peace', 'a toute', 'a tantot', 'a plus tard', 'good night', 'bonne nuit', 'farewell', 'so long', 'take care', 'a la prochaine', 'a demain', 'a bientot jespere'],
      'nom': ['nom', 'blase', 'blaze', 'surnom', 'pseudo', 'identité', 'prénom', 'prenom', 'name', 'surname', 'last name', 'first name', 'comment tu tappelles', 'ton blaze', 'ton blase', 'ton petit nom', 'qui es tu', 'presente toi'],
      'qui es-tu': ['qui es tu', 'tu es qui', 'c\'est qui toi', 't\'es quoi', 'ton rôle', 'présente toi', 'presente toi', 'qui etes vous', 'vous etes qui', 'what are you', 'who are you', 'tu fais quoi dans la vie', 'quel est ton job', 'ta mission', 'ton but', 'pourquoi tu existes'],
      'comment ca va': ['ca va', 'ça va', 'comment vas-tu', 'tu vas bien', 'la forme', 'quoi de neuf', 'sa va', 'cv', 'comment tu te sens', 'how are you', 'ca roule', 'ca gaze', 'bien ou quoi', 'tout va bien', 'comment allez vous', 'ca farte', 'quoi de neuf', 'wesh bien', 'bien ou bien'],
      'merci': ['merci', 'thanks', 'thx', 'remerciement', 'merci beaucoup', 'mr6', 'mrc', 'merci infiniment', 'thank you', 'ty', 'merci bien', 'un grand merci', 'je te remercie', 'cimer', 'merki', 'thank u', 'thnk u', 'thnks', 'tanks'],
      'aide': ['aide', 'help', 'au secours', 'que sais-tu faire', 'capacités', 'fonctionnalités', 'aidé', 'aidez moi', 'help me', 'jai besoin daide', 'tu peux maider', 'que peux tu faire', 'tes fonctions', 'ton mode demploi', 'comment tu fonctionnes', 'explique moi', 'what can you do', 'aide moi', 'a l\'aide'],
      'calcul': ['calcule', 'calcul', 'combien fait', 'résultat de', 'addition', 'soustraction', 'calculer', 'compte', 'opération', 'math', 'maths', 'additionne', 'soustrait', 'multiplie', 'divise', 'plus', 'moins', 'fois', 'divisé par', 'egal', 'egal à', 'donne le resultat'],
      'heure': ['heure', 'quelle heure', 'horaire', 'temps', 'heures', 'heur', 'lheure', 'quelle heure est il', 'il est quelle heure', 'tu as lheure', 'donne moi lheure', 'time', 'what time is it', 'clock', 'montre', 'aiguille'],
      'date': ['date', 'quel jour', 'aujourd\'hui', 'on est quel jour', 'aujourdhui', 'nous sommes quel jour', 'quelle date', 'jour', 'mois', 'annee', 'calendrier', 'today', 'what day', 'quel jour on est', 'cest quand', 'ca date de quand'],
      'météo': ['météo', 'temps', 'pleut', 'soleil', 'température', 'climat', 'meteo', 'weather', 'quel temps', 'il fait beau', 'il fait chaud', 'il fait froid', 'il pleut', 'il neige', 'il gele', 'canicule', 'orage', 'eclaircie', 'nuage', 'vent', 'pluie', 'degres', 'celsius', 'fahrenheit', 'previsions', 'bulletin'],
      'sport': ['sport', 'foot', 'match', 'score', 'équipe', 'equipe', 'football', 'basket', 'tennis', 'rugby', 'handball', 'volley', 'athletisme', 'natation', 'cyclisme', 'formule 1', 'f1', 'competition', 'championnat', 'coupe du monde', 'jeux olympiques', 'jo', 'entrainement', 'exercice', 'musculation', 'fitness', 'running', 'jogging', 'course'],
      'musique': ['musique', 'chanson', 'artiste', 'groupe', 'playlist', 'musik', 'music', 'son', 'audio', 'ecouter', 'spotify', 'deezer', 'apple music', 'youtube music', 'concert', 'festival', 'guitare', 'piano', 'batterie', 'chant', 'rapper', 'rock', 'pop', 'rap', 'jazz', 'classique', 'electro', 'techno', 'hip hop', 'rnb'],
      'apprentissage': ['apprends', 'souviens', 'note', 'retiens', 'rappelle', 'apprend', 'aprend', 'memorise', 'enregistre', 'sauvegarde', 'garde en memoire', 'remember', 'learn', 'souviens toi', 'noublie pas', 'ecris', 'inscris', 'grave'],
      'préférence': ['j\'aime', 'je préfère', 'mon plat préféré', 'ma couleur préférée', 'j aime', 'je prefere', 'jadore', 'je kiffe', 'je deteste', 'je hais', 'mon truc prefere', 'ce que jaime', 'mes gouts', 'mes preferences', 'i like', 'i love', 'i prefer']
    };

    this.dictionary = new Set([
      'bonjour', 'salut', 'hello', 'comment', 'ca', 'va', 'bien', 'mal', 'tres', 'trop',
      'je', 'tu', 'il', 'elle', 'nous', 'vous', 'ils', 'elles', 'on',
      'suis', 'es', 'est', 'sommes', 'etes', 'sont', 'etre', 'avoir', 'faire', 'dire',
      'aller', 'venir', 'voir', 'savoir', 'pouvoir', 'vouloir', 'devoir', 'falloir',
      'mappelle', 'appelle', 'nom', 'prenom', 'age', 'ville', 'pays', 'adresse',
      'aime', 'prefere', 'veux', 'peux', 'dois', 'sais', 'connais', 'pense', 'crois',
      'pourquoi', 'comment', 'quand', 'ou', 'quoi', 'qui', 'lequel', 'laquelle',
      'avec', 'dans', 'pour', 'sur', 'sous', 'devant', 'derriere', 'entre', 'par',
      'calcul', 'calcule', 'resultat', 'addition', 'soustraction', 'multiplication', 'division',
      'heure', 'date', 'jour', 'mois', 'annee', 'temps', 'minute', 'seconde', 'matin', 'soir',
      'meteo', 'soleil', 'pluie', 'neige', 'vent', 'chaud', 'froid', 'temperature',
      'sport', 'foot', 'basket', 'tennis', 'match', 'score', 'equipe', 'joueur', 'gagner', 'perdre',
      'musique', 'chanson', 'artiste', 'groupe', 'album', 'son', 'ecouter', 'chanter',
      'merci', 'aide', 'help', 'besoin', 'peur', 'triste', 'content', 'heureux', 'joyeux',
      'bon', 'mauvais', 'grand', 'petit', 'vrai', 'faux', 'juste', 'beau', 'joli', 'laid',
      'ordinateur', 'telephone', 'internet', 'site', 'application', 'ecran', 'clavier',
      'manger', 'boire', 'dormir', 'parler', 'ecouter', 'regarder', 'lire', 'ecrire',
      'aujourdhui', 'demain', 'hier', 'maintenant', 'apres', 'avant', 'toujours', 'jamais',
      'maison', 'travail', 'ecole', 'famille', 'ami', 'amour', 'vie', 'mort', 'argent',
      'sante', 'maladie', 'medecin', 'hopital', 'pharmacie', 'medicament',
      'voiture', 'train', 'avion', 'bus', 'metro', 'velo', 'moto', 'transport',
      'vacances', 'voyage', 'hotel', 'plage', 'montagne', 'campagne', 'foret',
      'livre', 'film', 'serie', 'cinema', 'theatre', 'exposition', 'musee',
      'cafe', 'the', 'eau', 'jus', 'vin', 'biere', 'alcool', 'boisson',
      'pain', 'fromage', 'viande', 'poisson', 'legume', 'fruit', 'dessert', 'gateau',
      'rouge', 'bleu', 'vert', 'jaune', 'noir', 'blanc', 'orange', 'violet', 'rose', 'gris',
      'chiffre', 'nombre', 'lettre', 'mot', 'phrase', 'texte', 'message', 'question', 'reponse',
      'probleme', 'solution', 'idee', 'pensee', 'reflexion', 'analyse', 'synthese',
      'debut', 'fin', 'milieu', 'centre', 'cote', 'haut', 'bas', 'gauche', 'droite',
      'possible', 'impossible', 'facile', 'difficile', 'simple', 'complique',
      'rapide', 'lent', 'fort', 'faible', 'dur', 'mou', 'leger', 'lourd',
      'vieux', 'jeune', 'nouveau', 'ancien', 'moderne', 'traditionnel',
      'ouvert', 'ferme', 'plein', 'vide', 'propre', 'sale', 'sec', 'mouille',
      'chaud', 'froid', 'tiede', 'brulant', 'glace', 'gele',
      'bruyant', 'silencieux', 'calme', 'agite', 'tranquille', 'anime',
      'gentil', 'mechant', 'poli', 'impoli', 'sympa', 'antipathique',
      'riche', 'pauvre', 'cher', 'bon marche', 'gratuit', 'payant'
    ]);

    this.smsToFrench = {
      'c': 'c\'est', 'ct': 'c\'était', 'keske': 'qu\'est-ce que',
      'koi': 'quoi', 'ki': 'qui', 'kan': 'quand', 'ou': 'où',
      'pk': 'pourquoi', 'pcq': 'parce que', 'pr': 'pour',
      'tt': 'tout', 'ts': 'tous', 'bcp': 'beaucoup',
      'mdr': 'drole', 'ptdr': 'tres drole', 'lol': 'drole', 'lmao': 'tres drole',
      'stp': 's\'il te plait', 'svp': 's\'il vous plait', 'svpl': 's\'il vous plait',
      'dsl': 'desole', 'dsolé': 'desole', 'jtm': 'je t\'aime', 'jpp': 'fatigue',
      'bjr': 'bonjour', 'bsr': 'bonsoir', 'slt': 'salut', 'cc': 'coucou',
      'cv': 'ca va', 'ok': 'd\'accord', 'nn': 'non', 'ouais': 'oui', 'oue': 'oui',
      'vrm': 'vraiment', 'vrmt': 'vraiment', 'tjr': 'toujours', 'ttjrs': 'toujours',
      'jamé': 'jamais', 'comm': 'comment', 'kel': 'quel', 'kelle': 'quelle',
      'keske': 'qu\'est-ce que', 'kestu': 'qu\'est-ce que tu', 'kes': 'qu\'est-ce',
      'askip': 'apparemment', 'enfaite': 'en fait', 'enft': 'en fait',
      'tkt': 'ne t\'inquiete pas', 'tqt': 'ne t\'inquiete pas',
      'jsp': 'je ne sais pas', 'jss': 'je suis', 'chui': 'je suis', 'chuis': 'je suis',
      'ya': 'il y a', 'y\'a': 'il y a', 'yavait': 'il y avait',
      'dcp': 'donc', 'du coup': 'donc', 'ducoup': 'donc',
      'wsh': 'bonjour', 'wesh': 'bonjour', 'yoo': 'bonjour',
      'sava': 'ca va', 'sava?': 'ca va', 'sa va?': 'ca va',
      'b1': 'bien', 'b1sur': 'bien sur', 'c1': 'c\'est un', 'c1e': 'c\'est une',
      'a2m1': 'a demain', 'a2m': 'a demain', 'a+': 'a plus tard',
      'mr6': 'merci', 'mrc': 'merci', 'merki': 'merci', 'cimer': 'merci',
      'askip': 'apparemment', 'vazi': 'vas-y', 'viens': 'viens',
      'jcrois': 'je crois', 'jpense': 'je pense', 'jdis': 'je dis',
      'tfaçon': 'de toute facon', 'tfaçon': 'de toute facon', 'anyway': 'de toute facon',
      'hein': 'n\'est-ce pas', 'nan': 'non', 'nope': 'non', 'yep': 'oui', 'yes': 'oui',
      'pls': 'fatigue', 'osef': 'peu importe', 'peu importe': 'peu importe',
      'bg': 'beau gosse', 'btg': 'beau gosse', 'meuf': 'femme', 'mec': 'homme',
      'osef': 'peu importe', 'cpg': 'je ne sais pas', 'coucou': 'bonjour'
    };

    this.englishToFrench = {
      'hello': 'bonjour', 'hi': 'bonjour', 'hey': 'bonjour', 'goodbye': 'au revoir',
      'bye': 'au revoir', 'thanks': 'merci', 'thank': 'merci', 'please': 's\'il te plait',
      'sorry': 'desole', 'help': 'aide', 'name': 'nom', 'what': 'quoi', 'who': 'qui',
      'where': 'ou', 'when': 'quand', 'why': 'pourquoi', 'how': 'comment',
      'yes': 'oui', 'no': 'non', 'maybe': 'peut etre', 'always': 'toujours',
      'never': 'jamais', 'good': 'bon', 'bad': 'mauvais', 'big': 'grand', 'small': 'petit',
      'love': 'aime', 'hate': 'deteste', 'like': 'aime', 'want': 'veux', 'need': 'besoin',
      'can': 'peux', 'will': 'vais', 'must': 'dois', 'should': 'devrais', 'could': 'pourrais',
      'time': 'heure', 'day': 'jour', 'night': 'nuit', 'morning': 'matin', 'evening': 'soir',
      'weather': 'meteo', 'sun': 'soleil', 'rain': 'pluie', 'snow': 'neige', 'wind': 'vent',
      'hot': 'chaud', 'cold': 'froid', 'warm': 'tiede', 'cool': 'frais',
      'music': 'musique', 'song': 'chanson', 'sport': 'sport', 'game': 'match',
      'computer': 'ordinateur', 'phone': 'telephone', 'internet': 'internet',
      'food': 'nourriture', 'water': 'eau', 'coffee': 'cafe', 'tea': 'the',
      'happy': 'content', 'sad': 'triste', 'angry': 'enerve', 'tired': 'fatigue',
      'beautiful': 'beau', 'ugly': 'laid', 'rich': 'riche', 'poor': 'pauvre',
      'old': 'vieux', 'new': 'nouveau', 'fast': 'rapide', 'slow': 'lent',
      'strong': 'fort', 'weak': 'faible', 'hard': 'dur', 'soft': 'mou'
    };

    this.stopWords = new Set([
      'le','la','les','un','une','des','de','du','à','au','aux',
      'ce','cet','cette','ces','est','sont','suis','es','sommes','êtes',
      'je','tu','il','elle','on','nous','vous','ils','elles',
      'me','te','se','moi','toi','lui','nous','vous','leur','y','en',
      'que','qui','quoi','dont','où','comment','pourquoi','quand',
      'et','ou','mais','donc','car','ni','or',
      'ne','pas','plus','jamais','rien','tout','très','trop',
      'alors','avec','dans','par','pour','sur','vers','chez','depuis',
      'a','the','is','are','was','were','be','been','being','have','has','had',
      'do','does','did','will','would','shall','should','can','could','may','might',
      'must','shall','ought','need','dare','used','to','of','in','on','at','by',
      'this','that','these','those','my','your','his','her','its','our','their'
    ]);
  }

  levenshtein(a, b) {
    if (a.length === 0) return b.length;
    if (b.length === 0) return a.length;
    if (a === b) return 0;
    let v0 = Array.from({ length: b.length + 1 }, (_, i) => i);
    let v1 = new Array(b.length + 1);
    for (let i = 0; i < a.length; i++) {
      v1[0] = i + 1;
      for (let j = 0; j < b.length; j++) {
        const cost = a[i] === b[j] ? 0 : 1;
        v1[j + 1] = Math.min(v1[j] + 1, v0[j + 1] + 1, v0[j] + cost);
      }
      [v0, v1] = [v1, v0];
    }
    return v0[b.length];
  }

  findClosestWord(word, maxDistance = 3) {
    if (this.dictionary.has(word)) return word;
    let bestMatch = null;
    let bestDistance = Infinity;
    for (let dictWord of this.dictionary) {
      const distance = this.levenshtein(word, dictWord);
      if (distance < bestDistance && distance <= maxDistance) {
        bestDistance = distance;
        bestMatch = dictWord;
      }
    }
    if (!bestMatch) {
      for (let [_, variants] of Object.entries(this.synonyms)) {
        for (let variant of variants) {
          const distance = this.levenshtein(word, variant);
          if (distance < bestDistance && distance <= maxDistance) {
            bestDistance = distance;
            bestMatch = variant;
          }
        }
      }
    }
    if (!bestMatch) {
      for (let english of Object.keys(this.englishToFrench)) {
        const distance = this.levenshtein(word, english);
        if (distance < bestDistance && distance <= maxDistance) {
          bestMatch = english;
        }
      }
    }
    return bestMatch || word;
  }

  convertSMS(word) {
    return this.smsToFrench[word.toLowerCase()] || word;
  }

  translateEnglish(word) {
    return this.englishToFrench[word.toLowerCase()] || word;
  }

  stem(word) {
    const lower = word.toLowerCase();
    const suffixes = [
      'er', 'ir', 're', 'é', 'ée', 'és', 'ées', 'ez', 'ais', 'ait', 'aient', 'ions', 'iez',
      'ant', 'ante', 'ants', 'antes', 'ment', 'tion', 'sion', 'isme', 'able', 'ible',
      'euse', 'eur', 'teur', 'trice', 'ique', 'iste', 'esse', 'age', 'ure', 'ance', 'ence',
      'ing', 'ed', 'ly', 'ity', 'ness', 'ship', 'hood', 'dom', 'ology', 'graphy'
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

  correctSpelling(text) {
    const words = text.split(/\s+/);
    const correctedWords = words.map(word => {
      let corrected = this.convertSMS(word);
      corrected = this.translateEnglish(corrected);
      corrected = this.findClosestWord(corrected.toLowerCase());
      return corrected;
    });
    return correctedWords.join(' ');
  }

  detectGlobalMeaning(text, corrected) {
    const lower = corrected.toLowerCase();
    if (/pourquoi|comment|quand|ou|qui|quoi|lequel|laquelle|combien/i.test(lower)) return 'question';
    if (/bonjour|salut|hello|hey|yo|wesh|coucou/i.test(lower)) return 'greeting';
    if (/au revoir|bye|adieu|a plus|a bientot|ciao/i.test(lower)) return 'au revoir';
    if (/[\d]+\s*[\+\-\*\/]\s*[\d]+/.test(text) || /calcule|calcul|combien|resultat|operation|math/i.test(lower)) return 'calcul';
    if (/heure|temps|horaire|quelle heure|l'heure|time|clock/i.test(lower)) return 'heure';
    if (/date|jour|mois|annee|aujourd'hui|demain|hier|calendrier|today|tomorrow/i.test(lower)) return 'date';
    if (/meteo|temps|soleil|pluie|neige|vent|temperature|chaud|froid|weather/i.test(lower)) return 'météo';
    if (/je m'appelle|mon nom est|je suis|appelle moi|nomme moi/i.test(lower)) return 'memory_set';
    if (/comment je m'appelle|mon nom|tu te souviens|rappelle moi|quel est mon nom/i.test(lower)) return 'memory_get';
    return 'conversation';
  }

  detectTopic(tokens, phrase) {
    const topics = {
      'météo': ['meteo', 'temps', 'pluie', 'soleil', 'neige', 'vent', 'orage', 'temperature', 'climat', 'pleut', 'froid', 'chaud', 'weather', 'sun', 'rain', 'snow', 'wind'],
      'sport': ['sport', 'foot', 'basket', 'tennis', 'rugby', 'match', 'score', 'equipe', 'joueur', 'championnat', 'coupe', 'competition', 'game', 'soccer', 'baseball'],
      'musique': ['musique', 'chanson', 'artiste', 'groupe', 'album', 'playlist', 'spotify', 'concert', 'guitare', 'piano', 'music', 'song', 'artist', 'band'],
      'technologie': ['tech', 'ordinateur', 'telephone', 'app', 'application', 'internet', 'site', 'web', 'code', 'programmation', 'computer', 'phone', 'mobile', 'digital'],
      'cuisine': ['cuisine', 'recette', 'manger', 'plat', 'restaurant', 'nourriture', 'boisson', 'cafe', 'the', 'food', 'cook', 'cooking', 'kitchen', 'recipe'],
      'voyage': ['vacances', 'voyage', 'hotel', 'avion', 'train', 'plage', 'montagne', 'travel', 'trip', 'holiday', 'beach', 'mountain'],
      'sante': ['sante', 'maladie', 'medecin', 'hopital', 'pharmacie', 'medicament', 'health', 'doctor', 'hospital', 'sick', 'illness'],
      'amour': ['amour', 'aime', 'coeur', 'relation', 'couple', 'love', 'heart', 'relationship', 'dating', 'boyfriend', 'girlfriend']
    };
    for (let [topic, keywords] of Object.entries(topics)) {
      if (keywords.some(kw => tokens.includes(kw) || phrase.includes(kw))) return topic;
    }
    return null;
  }

  detectIntentWithSynonyms(tokens) {
    const normalizedTokens = tokens.map(t => this.normalizeWord(t));
    const phrase = normalizedTokens.join(' ');
    for (let [intent, variants] of Object.entries(this.synonyms)) {
      for (let v of variants) {
        const normalizedVariant = this.normalizeWord(v);
        if (phrase.includes(normalizedVariant) || normalizedTokens.some(t => this.levenshtein(t, normalizedVariant) <= 2)) {
          return intent;
        }
      }
    }
    return null;
  }

  rewriteQuery(text, intent, topic) {
    const rewrites = {
      'greeting': 'Salutation', 'au revoir': 'Dire au revoir', 'nom': 'Demander le nom',
      'qui es-tu': 'Demander identite', 'comment ca va': 'Prendre des nouvelles',
      'merci': 'Remercier', 'aide': 'Demander de l\'aide', 'calcul': 'Faire un calcul',
      'heure': 'Demander l\'heure', 'date': 'Demander la date', 'météo': 'Parler de la meteo',
      'sport': 'Parler de sport', 'musique': 'Parler de musique',
      'apprentissage': 'Apprendre quelque chose', 'préférence': 'Exprimer une preference',
      'memory_get': 'Quel est mon nom ?', 'memory_set': 'Je te dis mon nom',
      'identity': 'Qui es-tu ?', 'question': 'Poser une question', 'conversation': 'Discuter'
    };
    return rewrites[intent] || (topic ? `Parler de ${topic}` : text);
  }

  analyse(text) {
    let cleaned = text.trim();
    const corrected = this.correctSpelling(cleaned);
    let tokens = corrected.split(/\s+/);
    let contentWords = tokens.filter(w => !this.stopWords.has(w.toLowerCase()));
    let intent = this.detectIntentWithSynonyms(contentWords);
    if (!intent) intent = this.detectGlobalMeaning(cleaned, corrected);
    const topic = this.detectTopic(contentWords, corrected.toLowerCase());
    const rewritten = this.rewriteQuery(corrected, intent, topic);
    let entities = {};
    if (intent === 'memory_set') {
      const namePattern = /(?:je\s+(?:m'appelle|suis|m apelle|mapelle|m appele)|mon\s+nom\s+(?:est|c'est|est|ces))\s+([a-zA-Zàâäéèêëîïôöùûüç\-]+)/i;
      const match = cleaned.match(namePattern) || corrected.match(namePattern);
      if (match) entities.name = match[1];
    }
    const timeMatch = corrected.match(/(\d{1,2})[h:](\d{2})?/);
    if (timeMatch) entities.time = `${timeMatch[1]}:${timeMatch[2] || '00'}`;
    const dateMatch = corrected.match(/(\d{1,2})[/-](\d{1,2})(?:[/-](\d{2,4}))?/);
    if (dateMatch) entities.date = `${dateMatch[1]}/${dateMatch[2]}${dateMatch[3] ? '/' + dateMatch[3] : ''}`;
    const positive = ['bien', 'super', 'genial', 'cool', 'heureux', 'content', 'top', 'parfait', 'excellent', 'magnifique', 'joyeux', 'happy', 'good', 'great', 'nice', 'wonderful'];
    const negative = ['mal', 'triste', 'nul', 'horrible', 'affreux', 'terrible', 'decu', 'ennuyeux', 'fatigue', 'stresse', 'sad', 'bad', 'terrible', 'awful', 'tired'];
    let sentiment = 'neutre';
    const lowerContent = contentWords.map(w => w.toLowerCase());
    if (positive.some(w => lowerContent.includes(w))) sentiment = 'positif';
    else if (negative.some(w => lowerContent.includes(w))) sentiment = 'négatif';
    return { original: text, corrected: corrected !== text ? corrected : null, intent, entities, sentiment, topic, rewritten };
  }
}
