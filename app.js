// === SYSTÈME D'AUTO-UPDATE ===
async function checkForUpdate() {
  try {
    const response = await fetch('https://banzaben892.github.io/Ia2/releases/latest');
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
  } catch (error) {
    console.log('Vérification de mise à jour échouée:', error);
  }
}

const lastCheck = localStorage.getItem('lastUpdateCheck');
const now = Date.now();
if (!lastCheck || (now - parseInt(lastCheck)) > 86400000) {
  checkForUpdate();
  localStorage.setItem('lastUpdateCheck', now.toString());
}

// === INITIALISATION ===
const memory = new Memory();
const ia1 = new IA1();
const ia2 = new IA2(memory);
const ia3 = new IA3();

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

function sendMessage() {
  const text = userInput.value.trim();
  if (!text) return;

  addMessageToChat(text, 'user');
  userInput.value = '';

  history.push({ text, sender: 'user' });
  Storage.save('chatHistory', history);

  const analysis = ia1.analyse(text);
  const rawResponse = ia2.process(analysis);
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
