class WebSearch {
  constructor() {
    this.searchEngines = [
      { name: 'DuckDuckGo', url: 'https://api.duckduckgo.com/?q=', format: 'ddg' },
      { name: 'Wikipedia', url: 'https://fr.wikipedia.org/w/api.php?action=query&list=search&srsearch=', format: 'wiki', params: '&format=json&origin=*' }
    ];
  }

  async search(query) {
    try {
      const ddgResult = await this.searchDuckDuckGo(query);
      if (ddgResult && ddgResult.length > 0) return ddgResult;
    } catch (e) { console.log('DuckDuckGo indisponible, tentative Wikipedia...'); }
    try { return await this.searchWikipedia(query); } catch (e) { console.log('Recherche web impossible'); return []; }
  }

  async searchDuckDuckGo(query) {
    const url = `https://api.duckduckgo.com/?q=${encodeURIComponent(query)}&format=json&no_html=1&skip_disambig=1`;
    const response = await fetch(url);
    const data = await response.json();
    const results = [];
    if (data.AbstractText && data.AbstractText.length > 10) {
      results.push({ title: data.Heading || 'Résultat', snippet: data.AbstractText, source: data.AbstractSource || 'DuckDuckGo', url: data.AbstractURL || '' });
    }
    if (data.RelatedTopics) {
      data.RelatedTopics.forEach(topic => {
        if (topic.Text && topic.Text.length > 10) {
          results.push({ title: topic.FirstURL?.split('/').pop() || 'Sujet', snippet: topic.Text, source: 'DuckDuckGo', url: topic.FirstURL || '' });
        }
      });
    }
    return results.slice(0, 5);
  }

  async searchWikipedia(query) {
    const url = `https://fr.wikipedia.org/w/api.php?action=query&list=search&srsearch=${encodeURIComponent(query)}&format=json&origin=*&srlimit=5`;
    const response = await fetch(url);
    const data = await response.json();
    if (!data.query || !data.query.search) return [];
    return data.query.search.map(result => ({
      title: result.title,
      snippet: this.stripHtml(result.snippet),
      source: 'Wikipedia',
      url: `https://fr.wikipedia.org/wiki/${encodeURIComponent(result.title)}`,
      wordCount: result.wordcount
    }));
  }

  stripHtml(html) {
    const tmp = document.createElement('div');
    tmp.innerHTML = html;
    return tmp.textContent || tmp.innerText || '';
  }

  async searchWithCache(query, knowledgeBase) {
    const localResults = await knowledgeBase.searchKnowledge(query);
    if (localResults && localResults.length > 0) {
      return {
        type: 'local',
        results: localResults.map(r => ({ title: 'Connaissance locale', snippet: r.sentence, source: 'Base de connaissances', category: r.category }))
      };
    }
    const webResults = await this.search(query);
    return { type: 'web', results: webResults };
  }
}
