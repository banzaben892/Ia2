class KnowledgeBase {
  constructor() {
    this.dbName = 'MiniChatGPT-Knowledge';
    this.dbVersion = 1;
    this.db = null;
    this.init();
  }

  async init() {
    return new Promise((resolve, reject) => {
      const request = indexedDB.open(this.dbName, this.dbVersion);
      request.onerror = () => { console.error('Erreur IndexedDB:', request.error); resolve(false); };
      request.onsuccess = () => { this.db = request.result; console.log('✅ Base de connaissances prête'); resolve(true); };
      request.onupgradeneeded = (event) => {
        const db = event.target.result;
        if (!db.objectStoreNames.contains('qa_pairs')) {
          const qaStore = db.createObjectStore('qa_pairs', { keyPath: 'id', autoIncrement: true });
          qaStore.createIndex('question', 'question', { unique: false });
          qaStore.createIndex('intent', 'intent', { unique: false });
          qaStore.createIndex('timestamp', 'timestamp', { unique: false });
        }
        if (!db.objectStoreNames.contains('documents')) {
          const docStore = db.createObjectStore('documents', { keyPath: 'id', autoIncrement: true });
          docStore.createIndex('filename', 'filename', { unique: false });
          docStore.createIndex('category', 'category', { unique: false });
        }
        if (!db.objectStoreNames.contains('knowledge')) {
          const knowledgeStore = db.createObjectStore('knowledge', { keyPath: 'id', autoIncrement: true });
          knowledgeStore.createIndex('keyword', 'keyword', { unique: false });
          knowledgeStore.createIndex('category', 'category', { unique: false });
        }
        console.log('✅ Base de données créée');
      };
    });
  }

  async addQA(question, answer, intent, entities, sentiment) {
    if (!this.db) await this.init();
    return new Promise((resolve, reject) => {
      const transaction = this.db.transaction(['qa_pairs'], 'readwrite');
      const store = transaction.objectStore('qa_pairs');
      const record = { question, answer, intent: intent || 'unknown', entities: entities || {}, sentiment: sentiment || 'neutre', timestamp: new Date().toISOString(), count: 1 };
      const index = store.index('question');
      const getRequest = index.get(question);
      getRequest.onsuccess = () => {
        if (getRequest.result) {
          const existing = getRequest.result;
          existing.count = (existing.count || 1) + 1;
          existing.timestamp = new Date().toISOString();
          existing.answer = answer;
          store.put(existing).onsuccess = () => resolve(true);
        } else {
          store.add(record).onsuccess = () => resolve(true);
        }
      };
      getRequest.onerror = () => { store.add(record).onsuccess = () => resolve(true); };
    });
  }

  async searchSimilar(question, limit = 5) {
    if (!this.db) await this.init();
    return new Promise((resolve, reject) => {
      const transaction = this.db.transaction(['qa_pairs'], 'readonly');
      const store = transaction.objectStore('qa_pairs');
      const results = [];
      store.openCursor().onsuccess = (event) => {
        const cursor = event.target.result;
        if (cursor) {
          const record = cursor.value;
          const similarity = this.calculateSimilarity(question, record.question);
          if (similarity > 0.3) results.push({ ...record, similarity });
          cursor.continue();
        } else {
          results.sort((a, b) => b.similarity - a.similarity);
          resolve(results.slice(0, limit));
        }
      };
    });
  }

  async addDocument(filename, content, category = 'general') {
    if (!this.db) await this.init();
    return new Promise((resolve, reject) => {
      const transaction = this.db.transaction(['documents', 'knowledge'], 'readwrite');
      const docStore = transaction.objectStore('documents');
      const record = { filename, content, category, timestamp: new Date().toISOString() };
      docStore.add(record).onsuccess = () => {
        this.extractKnowledge(content, category, transaction);
        resolve(true);
      };
    });
  }

  extractKnowledge(text, category, transaction) {
    const knowledgeStore = transaction.objectStore('knowledge');
    const sentences = text.split(/[.!?]+/).filter(s => s.trim().length > 10);
    sentences.forEach(sentence => {
      const words = sentence.toLowerCase().split(/\s+/);
      const keywords = words.filter(w => w.length > 3 && !this.isStopWord(w));
      keywords.forEach(keyword => {
        knowledgeStore.add({ keyword, sentence: sentence.trim(), category, timestamp: new Date().toISOString() });
      });
    });
  }

  async searchKnowledge(query, limit = 5) {
    if (!this.db) await this.init();
    return new Promise((resolve, reject) => {
      const keywords = query.toLowerCase().split(/\s+/).filter(w => w.length > 2);
      const results = [];
      const seen = new Set();
      const transaction = this.db.transaction(['knowledge'], 'readonly');
      const store = transaction.objectStore('knowledge');
      const index = store.index('keyword');
      let completed = 0;
      keywords.forEach(keyword => {
        index.getAll(keyword).onsuccess = (e) => {
          e.target.result.forEach(record => {
            if (!seen.has(record.sentence)) { seen.add(record.sentence); results.push(record); }
          });
          completed++;
          if (completed === keywords.length) resolve(results.slice(0, limit));
        };
      });
      if (keywords.length === 0) resolve([]);
    });
  }

  async getStats() {
    if (!this.db) await this.init();
    return new Promise((resolve) => {
      const stats = { qa_pairs: 0, documents: 0, knowledge: 0 };
      const transaction = this.db.transaction(['qa_pairs', 'documents', 'knowledge'], 'readonly');
      transaction.objectStore('qa_pairs').count().onsuccess = (e) => {
        stats.qa_pairs = e.target.result;
        transaction.objectStore('documents').count().onsuccess = (e2) => {
          stats.documents = e2.target.result;
          transaction.objectStore('knowledge').count().onsuccess = (e3) => {
            stats.knowledge = e3.target.result;
            resolve(stats);
          };
        };
      };
    });
  }

  async exportAll() {
    if (!this.db) await this.init();
    return new Promise((resolve) => {
      const data = { qa_pairs: [], documents: [], knowledge: [] };
      const transaction = this.db.transaction(['qa_pairs', 'documents', 'knowledge'], 'readonly');
      transaction.objectStore('qa_pairs').getAll().onsuccess = (e) => {
        data.qa_pairs = e.target.result;
        transaction.objectStore('documents').getAll().onsuccess = (e2) => {
          data.documents = e2.target.result;
          transaction.objectStore('knowledge').getAll().onsuccess = (e3) => {
            data.knowledge = e3.target.result;
            resolve(data);
          };
        };
      };
    });
  }

  calculateSimilarity(str1, str2) {
    const words1 = new Set(str1.toLowerCase().split(/\s+/));
    const words2 = new Set(str2.toLowerCase().split(/\s+/));
    const intersection = new Set([...words1].filter(x => words2.has(x)));
    const union = new Set([...words1, ...words2]);
    return intersection.size / union.size;
  }

  isStopWord(word) {
    const stopWords = new Set(['le', 'la', 'les', 'un', 'une', 'des', 'de', 'du', 'à', 'au', 'aux', 'est', 'sont', 'suis', 'êtes', 'sommes', 'été', 'que', 'qui', 'quoi', 'dont', 'où', 'lequel', 'laquelle', 'avec', 'dans', 'par', 'pour', 'sur', 'sous', 'chez', 'vers', 'mais', 'donc', 'car', 'alors', 'ainsi', 'aussi']);
    return stopWords.has(word);
  }
}
