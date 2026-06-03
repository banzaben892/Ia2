// === SYSTÈME D'AUTO-UPDATE ===
async function checkForUpdate() {
  try {
    const response = await fetch('https://api.github.com/repos/TON-USER/mini-chatgpt/releases/latest');
    const release = await response.json();
    const latestVersion = release.tag_name;
    const currentVersion = localStorage.getItem('appVersion') || 'v0';
    if (latestVersion !== currentVersion) {
      const update = confirm(`🔄 Nouvelle version disponible : ${latestVersion}\n\nVoulez-vous mettre à jour ?`);
      if (update) {
        const apkUrl = release.assets[0].browser_download_url;
        window.open(apkUrl, '_blank');
        localStorage.setItem('appVersion', latestVersion);
      }
    }
  } catch (error) { console.log('Vérification de mise à jour échouée:', error); }
}

const lastCheck = localStorage.getItem('lastUpdateCheck');
const now = Date.now();
if (!lastCheck || (now - parseInt(lastCheck)) > 86400000) {
  checkForUpdate();
  localStorage.setItem('lastUpdateCheck', now.toString());
}

// === INITIALISATION ===
const memory = new Memory();
const knowledgeBase = new KnowledgeBase();
const webSearch = new WebSearch();
const ia1 = new IA1();
const ia2 = new IA2(memory);
const ia3 = new IA3();

ia2.knowledgeBase = knowledgeBase;
ia2.webSearch = webSearch;

const chatMessages = document.getElementById('chatMessages');
const userInput = document.getElementById('userInput');

const history = Storage.load('chatHistory', []);
history.forEach(msg => addMessageToChat(msg.text, msg.sender, msg.isRewritten));

function addMessageToChat(text, sender, isRewritten = false) {
  const msgDiv = document.createElement('div');
  msgDiv.className = `message ${sender}`;
  if (isRewritten) {
    msgDiv.style.fontStyle = 'italic';
    msgDiv.style.opacity = '0.7';
    msgDiv.textContent = '🧠 ' + text;
  } else {
    msgDiv.textContent = text;
  }
  chatMessages.appendChild(msgDiv);
  chatMessages.scrollTop = chatMessages.scrollHeight;
}

// === GESTION PDF ===
const pdfInput = document.getElementById('pdfInput');
document.getElementById('pdfUploadBtn').addEventListener('click', () => pdfInput.click());

pdfInput.addEventListener('change', async (e) => {
  const file = e.target.files[0];
  if (file && file.type === 'application/pdf') {
    addMessageToChat(`📄 Importation de "${file.name}"...`, 'bot');
    try {
      const result = await ia2.importPDF(file);
      addMessageToChat(`✅ PDF importé avec succès !\n📄 ${result.pages} pages\n📝 ${result.textLength} caractères extraits\n🧠 Les connaissances ont été ajoutées à ma base.`, 'bot');
      history.push({ text: `PDF importé: ${file.name}`, sender: 'system' });
      Storage.save('chatHistory', history);
    } catch (error) {
      addMessageToChat('❌ Erreur lors de l\'importation du PDF.', 'bot');
    }
  }
});

// === RECHERCHE WEB ===
document.getElementById('webSearchBtn').addEventListener('click', async () => {
  const query = prompt('🔍 Rechercher sur le web :');
  if (query) {
    addMessageToChat(`🔍 Recherche : "${query}"`, 'user');
    const result = await ia2.searchForAnswer(query);
    if (result) {
      addMessageToChat(result.answer, 'bot');
      if (result.url) addMessageToChat(`🔗 ${result.url}`, 'bot');
    }
  }
});

// === STATISTIQUES ===
document.getElementById('statsBtn').addEventListener('click', async () => {
  const stats = await knowledgeBase.getStats();
  addMessageToChat(`📊 Statistiques :\n💬 Questions/Réponses : ${stats.qa_pairs}\n📄 Documents : ${stats.documents}\n🧠 Connaissances : ${stats.knowledge}`, 'bot');
});

// === EXPORT ===
document.getElementById('exportBtn').addEventListener('click', async () => {
  const data = await knowledgeBase.exportAll();
  const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = `mini-chatgpt-knowledge-${new Date().toISOString().slice(0,10)}.json`;
  a.click();
  addMessageToChat('💾 Connaissances exportées avec succès !', 'bot');
});

// === ENVOI DE MESSAGE (avec apprentissage) ===
async function sendMessage() {
  const text = userInput.value.trim();
  if (!text) return;

  addMessageToChat(text, 'user');
  userInput.value = '';

  history.push({ text, sender: 'user' });
  Storage.save('chatHistory', history);

  const analysis = ia1.analyse(text);
  let rawResponse;

  if (analysis.intent === 'unknown' || analysis.intent === 'conversation' || analysis.intent === 'question') {
    const searchResult = await ia2.searchForAnswer(text);
    if (searchResult && searchResult.confidence > 0.5) {
      rawResponse = searchResult.answer;
      await ia2.learnFromInteraction(text, rawResponse, analysis);
    } else {
      rawResponse = ia2.process(analysis);
      await ia2.learnFromInteraction(text, rawResponse, analysis);
    }
  } else {
    rawResponse = ia2.process(analysis);
    await ia2.learnFromInteraction(text, rawResponse, analysis);
  }

  const finalResponse = ia3.polish(rawResponse, analysis);

  if (analysis.rewritten && analysis.rewritten !== text) {
    addMessageToChat(analysis.rewritten, 'bot', true);
    history.push({ text: analysis.rewritten, sender: 'bot', isRewritten: true });
  }

  setTimeout(() => {
    addMessageToChat(finalResponse, 'bot');
    history.push({ text: finalResponse, sender: 'bot' });
    Storage.save('chatHistory', history);
  }, 600 + Math.random() * 400);
}

userInput.addEventListener('keypress', (e) => {
  if (e.key === 'Enter') sendMessage();
});

userInput.focus();
