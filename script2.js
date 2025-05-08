// Aktivere og deaktivere onboarding wizard
document.getElementById('startWizard').addEventListener('click', function() {
    document.getElementById('wizard').classList.remove('active');
    document.getElementById('authSection').classList.remove('hidden');
  });

// Mørk modus toggle
document.getElementById('darkToggle').addEventListener('click', function() {
    document.body.classList.toggle('dark');
  });
  
  // Språkbytte (Enkel funksjon for demo)
  document.getElementById('langToggle').addEventListener('click', function() {
    if (langToggle.textContent === "EN/NO") {
        langToggle.textContent = "NO/EN"; // Switch text for language toggle
        // Add language switching logic here (you can add localization functionality)
      } else {
        langToggle.textContent = "EN/NO"; // Switch text back
      }
    alert('Språkbytte er ikke implementert.');
  });
  
  // Chatbot toggle
  document.getElementById('chatToggle').addEventListener('click', function() {
    document.getElementById('chatbot').classList.toggle('hidden');
  });
  
  // Chatbot funksjonalitet
  document.getElementById('chatSend').addEventListener('click', function() {
    const inputText = document.getElementById('chatInput').value;
    if (inputText) {
      const chatLog = document.getElementById('chatLog');
      
      // Brukerens melding
      const message = document.createElement('div');
      message.textContent = `Bruker: ${inputText}`;
      chatLog.appendChild(message);
  
      // Svar fra bot (dummy svar for demo)
      const botMessage = document.createElement('div');
      botMessage.textContent = `Bot: Jeg forstår spørsmålet ditt om "${inputText}"!`;
      chatLog.appendChild(botMessage);
  
      // Rull ned til nyeste melding
      chatLog.scrollTop = chatLog.scrollHeight;
  
      // Tøm input-feltet etter sending
      document.getElementById('chatInput').value = '';
    }
  });

  // Hent alle steg
const steps = document.querySelectorAll('.step');

// Seksjoner som tilhører stegene
const sections = {
  1: 'authSection',
  2: 'otpSection',
  3: 'faceSection',
  4: 'captchaSection',
  5: 'voteSection',
  6: 'receiptSection',
  7: 'resultsSection'
};

// Når et steg klikkes
steps.forEach(stepEl => {
  stepEl.addEventListener('click', () => {
    // Fjern aktiv klasse fra alle steg
    steps.forEach(s => s.classList.remove('active'));
    stepEl.classList.add('active');

    // Hent stegnummer
    const step = stepEl.dataset.step;

    // Skjul alle seksjoner først
    Object.values(sections).forEach(id => {
      document.getElementById(id).classList.add('hidden');
    });

    // Vis riktig seksjon
    const sectionId = sections[step];
    if (sectionId) {
      document.getElementById(sectionId).classList.remove('hidden');
    }

    // (Valgfritt) Logg til konsoll
    console.log(`Viser steg ${step}: ${sectionId}`);
  });
});
  





  



document.getElementById('btnAuth').addEventListener('click', function (e) {
    e.preventDefault();
  
    clearErrors();
  
    let hasError = false;
  
    const ssn = document.getElementById('ssn');
    const email = document.getElementById('email');
    const password = document.getElementById('password');
    const phone = document.getElementById('phone');
    const file = document.getElementById('passportUpload');
  
    if (!/^\d{11}$/.test(ssn.value)) {
      showError(ssn, 'errSSN', 'Personnummer må være 11 siffer.');
      hasError = true;
    }
  
    if (!/^\S+@\S+\.\S+$/.test(email.value)) {
      showError(email, 'errEmail', 'Ugyldig e-postadresse.');
      hasError = true;
    }
  
    if (password.value.length < 6) {
      showError(password, 'errPassword', 'Passord må være minst 6 tegn.');
      hasError = true;
    }
  
    if (!/^\+47\d{8}$/.test(phone.value)) {
      showError(phone, 'errPhone', 'Telefonnummer må være +47 etterfulgt av 8 tall.');
      hasError = true;
    }
  
    if (file.files.length === 0) {
      showError(file, 'errFile', 'Du må laste opp Pass/ID.');
      hasError = true;
    }
  
    // Hvis alt er riktig --> gå til OTP
    if (!hasError) {
      goToStep(2);
    }
  });
  
  // Feilmelding
  function showError(input, errorId, message) {
    input.classList.add('error-field');
    document.getElementById(errorId).textContent = message;
    document.getElementById(errorId).style.display = 'block';
  }
  
  // Fjern feil
  function clearErrors() {
    document.querySelectorAll('.error-field').forEach(el => el.classList.remove('error-field'));
    document.querySelectorAll('.error').forEach(el => {
      el.style.display = 'none';
      el.textContent = '';
    });
  }
  
  // Bytt steg (f.eks. 1 -> 2)
  function goToStep(stepNum) {
    // Skjul alle seksjoner
    document.querySelectorAll('section').forEach(sec => sec.classList.add('hidden'));
  
    // Vis riktig steg
    if (stepNum === 2) {
      document.getElementById('otpSection').classList.remove('hidden');
    }
  
    // Oppdater stepper (hvis du har stegindikator)
    document.querySelectorAll('.step').forEach(step => step.classList.remove('active'));
    document.querySelector(`.step[data-step="${stepNum}"]`)?.classList.add('active');
  }
  const phoneInput = document.getElementById('phone');

phoneInput.addEventListener('input', () => {
  if (!phoneInput.value.startsWith('+47')) {
    phoneInput.value = '+47';
  }
});


const otpMethod = document.querySelector('input[name="otpMethod"]:checked').value;
if (otpMethod === 'sms') {
  // Send OTP via SMS
} else {
  // Send OTP via email
}

  








  document.addEventListener('DOMContentLoaded', () => {
    // Hent elementer
    const otpInput = document.getElementById('otpInput');
    const btnOtp = document.getElementById('btnOtp');
    const errOtp = document.getElementById('errOtp');
  
    if (!otpInput || !btnOtp || !errOtp) {
      console.error('OTP elementer ikke funnet!');
      return;
    }
  
    // Når man klikker på "Verifiser kode"
    btnOtp.addEventListener('click', () => {
      const otp = otpInput.value.trim();
  
      // Sjekk at det er 6 tall
      if (!/^\d{6}$/.test(otp)) {
        errOtp.textContent = 'Koden må være nøyaktig 6 sifre.';
        otpInput.classList.add('input-error');
      } else {
        errOtp.textContent = '';
        otpInput.classList.remove('input-error');
  
        // === Send bruker videre til neste seksjon (Ansikt) ===
        document.getElementById('otpSection').classList.add('hidden');
        document.getElementById('faceSection').classList.remove('hidden');
  
        // Oppdater stepper også:
        document.querySelector('.step.active').classList.remove('active');
        document.querySelector('.step[data-step="3"]').classList.add('active');
      }
    });
  
    // Ekstra: Fjern feilmelding mens man skriver
    otpInput.addEventListener('input', () => {
      errOtp.textContent = '';
      otpInput.classList.remove('input-error');
    });
  });
  









  document.addEventListener('DOMContentLoaded', () => {
    const section = document.getElementById('faceSection');
    const cam     = document.getElementById('faceCam');
    const btn     = document.getElementById('btnFace');
    const msg     = document.getElementById('errFace');
    let   stream  = null;
    let   bar     = null;
    let   timer   = null;
  
    // Start camera on load
    startCamera();
  
    // Start or restart camera
    async function startCamera() {
      clearState();
      stopCamera();
      try {
        stream = await navigator.mediaDevices.getUserMedia({ video: { facingMode: 'user' } });
        cam.srcObject = stream;
        await cam.play();
        cam.classList.add('ok');
        addScannerLine();
      } catch {
        showError('❌ Tillat kamera i nettleseren.');
      }
    }
  
    // Stop camera
    function stopCamera() {
      if (stream) {
        stream.getTracks().forEach(t => t.stop());
        stream = null;
      }
      cam.srcObject = null;
      cam.classList.remove('ok', 'error');
      removeScannerLine();
    }
  
    // Add persistent scan line
    function addScannerLine() {
      removeScannerLine();
      bar = document.createElement('div');
      bar.id = 'scannerLine';
      section.appendChild(bar);
    }
  
    function removeScannerLine() {
      if (bar) bar.remove();
      bar = null;
    }
  
    // Clear messages and button state
    function clearState() {
      msg.textContent = '';
      msg.classList.remove('success');
      btn.disabled = false;
      btn.classList.remove('scanning');
      btn.textContent = 'Bekreft ansikt';
      cam.classList.remove('error');
    }
  
    // Show error
    function showError(text) {
      msg.textContent = text;
      cam.classList.add('error');
      removeScannerLine();
    }
  
    // Button click: 3-second scanning
    btn.addEventListener('click', () => {
      clearState();
      if (!stream) return showError('❌ Ingen aktivt kamera.');
  
      btn.disabled = true;
      btn.classList.add('scanning');
      let seconds = 3;
      btn.textContent = `Skanner... (${seconds})`;
  
      timer = setInterval(() => {
        seconds--;
        btn.textContent = `Skanner... (${seconds})`;
        if (seconds <= 0) {
          clearInterval(timer);
          btn.disabled = false;
          btn.classList.remove('scanning');
          btn.textContent = 'Bekreft ansikt';
          msg.textContent = '✅ Ansikt bekreftet';
          msg.classList.add('success');
          stopCamera();
  
          section.classList.add('hidden');
          document.getElementById('captchaSection').classList.remove('hidden');
          document.querySelector('.step.active').classList.remove('active');
          document.querySelector('.step[data-step="4"]').classList.add('active');
        }
      }, 1000);
    });
  
    // Stop camera on unload
    window.addEventListener('beforeunload', stopCamera);
  });
  



  











  document.addEventListener('DOMContentLoaded', () => {
    // === Seksjon 4: CAPTCHA ===
    const slider    = document.getElementById('captchaSlider');
    const percentEl = document.getElementById('sliderPercent');
    const errorEl   = document.getElementById('errCaptcha');
    const captchaSection = document.getElementById('captchaSection');
    const voteSection    = document.getElementById('voteSection');
    const receiptSection = document.getElementById('receiptSection');
  
    // Skjul seksjon 5 og 6 ved start
    voteSection.classList.add('hidden');
    receiptSection.classList.add('hidden');
  
    function resetCaptcha() {
      slider.value = 0;
      slider.style.setProperty('--pct', '0%');
      percentEl.textContent = '0%';
      errorEl.textContent = '';
      errorEl.classList.remove('success');
      slider.classList.remove('verified', 'shake');
  
      // Vis kun CAPTCHA
      captchaSection.classList.remove('hidden');
      voteSection.classList.add('hidden');
      document.querySelector('.step.active').classList.remove('active');
      document.querySelector('.step[data-step="4"]').classList.add('active');
    }
  
    slider.addEventListener('input', () => {
      const pct = parseInt(slider.value, 10);
      slider.style.setProperty('--pct', pct + '%');
      percentEl.textContent = pct + '%';
      errorEl.textContent = '';
      errorEl.classList.remove('success');
  
      if (pct >= 100) {
        slider.value = 100;
        slider.classList.add('verified');
        percentEl.textContent = '✔️';
        errorEl.textContent = 'Verifisert!';
        errorEl.classList.add('success');
  
        setTimeout(() => {
          // Bytt til seksjon 5
          captchaSection.classList.add('hidden');
          voteSection.classList.remove('hidden');
          document.querySelector('.step.active').classList.remove('active');
          document.querySelector('.step[data-step="5"]').classList.add('active');
        }, 500);
      }
    });
  
    slider.addEventListener('change', () => {
      if (parseInt(slider.value, 10) < 100) {
        errorEl.textContent = 'Skyv helt til 100 % for å bekrefte!';
        slider.classList.add('shake');
        setTimeout(() => {
          slider.classList.remove('shake');
          resetCaptcha();
        }, 400);
      }
    });
  
    // === Seksjon 5: Stemmegivning ===
    const parties = [
      'Arbeiderpartiet','Høyre','Fremskrittspartiet','Senterpartiet',
      'Venstre','Kristelig Folkeparti','Sosialistisk Venstreparti',
      'Miljøpartiet De Grønne','Rødt'
    ];
    const partyListEl = document.getElementById('partyList');
    const searchInput = document.getElementById('partySearch');
    const formVote    = document.getElementById('formVote');
    const errVote     = document.getElementById('errVote');
  
    function renderParties(filter = '') {
      partyListEl.innerHTML = '';
      parties
        .filter(p => p.toLowerCase().includes(filter.toLowerCase()))
        .forEach((party, idx) => {
          const id = `party_${idx}`;
          const card = document.createElement('div');
          card.className = 'party-card';
          card.innerHTML = `
            <input type="radio" id="${id}" name="party" value="${party}">
            <label for="${id}">${party}</label>
          `;
          card.addEventListener('click', () => {
            formVote.elements['party'].value = party;
            updateSelection();
          });
          partyListEl.appendChild(card);
        });
      updateSelection();
    }
  
    function updateSelection() {
      const sel = formVote.elements['party'].value;
      document.querySelectorAll('.party-card').forEach(card => {
        const input = card.querySelector('input');
        if (input.value === sel) {
          input.checked = true;
          card.classList.add('selected');
        } else {
          input.checked = false;
          card.classList.remove('selected');
        }
      });
      errVote.textContent = '';
    }
  
    searchInput.addEventListener('input', () => {
      renderParties(searchInput.value);
    });
  
    formVote.addEventListener('submit', e => {
      e.preventDefault();
      const choice = formVote.elements['party'].value;
      if (!choice) {
        errVote.textContent = '❌ Du må velge et parti!';
        return;
      }
      errVote.textContent = '';
      alert(`Du stemte på: ${choice}`);
  
      // Bytt til seksjon 6
      voteSection.classList.add('hidden');
      receiptSection.classList.remove('hidden');
      document.querySelector('.step.active').classList.remove('active');
      document.querySelector('.step[data-step="6"]').classList.add('active');
    });
  
    // Start flow
    resetCaptcha();
    renderParties();
  });
  
     
  










  document.addEventListener('DOMContentLoaded', () => {
    const receiptSection = document.getElementById('receiptSection');
    const receiptCodeEl  = document.getElementById('receiptCode');
    const btnReceipt     = document.getElementById('btnReceipt');
  
    // Generer en enkel, tilfeldig kvitteringskode
    function generateReceiptCode() {
      const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
      let code = '';
      for (let i = 0; i < 16; i++) {
        code += chars.charAt(Math.floor(Math.random() * chars.length));
        if (i % 4 === 3 && i < 15) code += '-';
      }
      return code;
    }
  
    // Sett inn koden i <pre>
    const code = generateReceiptCode();
    receiptCodeEl.textContent = `KVITTERING-CODE:\n${code}\n\nTidspunkt: ${new Date().toLocaleString('no-NO')}`;
  
    // Last ned PDF ved klikk
    btnReceipt.addEventListener('click', () => {
      const { jsPDF } = window.jspdf;
      const doc = new jsPDF();
  
      const lines = receiptCodeEl.textContent.split('\n');
      doc.setFont('Courier', 'normal');
      doc.setFontSize(12);
      lines.forEach((line, i) => {
        doc.text(line, 20, 20 + i * 8);
      });
  
      doc.save(`kvittering_${code}.pdf`);
  
      // Etter nedlasting, gå til steg 7
      document.getElementById('receiptSection').classList.add('hidden');
      document.querySelector('.step.active').classList.remove('active');
      document.querySelector('.step[data-step="7"]').classList.add('active');
      document.getElementById('resultsSection').classList.remove('hidden');
    });
  });
  

















  document.addEventListener('DOMContentLoaded', () => {
    // ===== Steg 7: Sanntidsresultater =====
    const ctx = document.getElementById('resultsChart').getContext('2d');
    const parties = ['Ap','H','FrP','Sp','V','KrF','SV','MDG','Rødt'];
  
    // Lager en tilfeldig fordeling som summerer til 100 %
    function randomDistribution(n) {
      const vals = Array.from({length: n}, () => Math.random());
      const sum = vals.reduce((a,b)=>a+b,0);
      return vals.map(v => Math.round((v/sum)*100));
    }
    function normalize(arr) {
      const total = arr.reduce((a,b)=>a+b,0);
      arr[0] += 100 - total;
      return arr;
    }
  
    let data = normalize(randomDistribution(parties.length));
    const chart = new Chart(ctx, {
      type: 'bar',
      data: {
        labels: parties,
        datasets: [{ label: 'Stemmer i %', data, backgroundColor: '#1a73e8' }]
      },
      options: {
        scales: { y: { beginAtZero: true, max: 100 }},
        plugins: { tooltip: { callbacks: { label: ctx => `${ctx.parsed.y}%` } } }
      }
    });
  
    // Oppdater hvert 5. sekund
    setInterval(() => {
      chart.data.datasets[0].data = normalize(randomDistribution(parties.length));
      chart.update();
    }, 5000);
  
    // ===== Konfetti fra toppen ved klikk =====
    document.getElementById('btnConfetti').addEventListener('click', () => {
      const canvas = document.createElement('canvas');
      canvas.className = 'confetti-canvas';
      document.body.appendChild(canvas);
      const c = canvas.getContext('2d');
      const W = canvas.width  = window.innerWidth;
      const H = canvas.height = window.innerHeight;
      const colors = ['#ff4d4d','#ffcc00','#66ff66','#3399ff','#ff66cc'];
      const particles = [];
      const count = 200;
  
      // Init partikler øverst
      for (let i = 0; i < count; i++) {
        particles.push({
          x: Math.random()*W,
          y: -10,
          r: Math.random()*4 + 2,
          vx: (Math.random()-0.5)*2,
          vy: Math.random()*3 + 2,
          color: colors[Math.floor(Math.random()*colors.length)]
        });
      }
  
      const duration = 2000;
      const end = Date.now() + duration;
      function animate() {
        c.clearRect(0,0,W,H);
        particles.forEach(p => {
          p.x += p.vx;
          p.y += p.vy;
          c.beginPath();
          c.arc(p.x,p.y,p.r,0,2*Math.PI);
          c.fillStyle = p.color;
          c.fill();
        });
        // Fjern partikler under skjermen
        for (let i = particles.length-1; i >= 0; i--) {
          if (particles[i].y > H + particles[i].r) {
            particles.splice(i,1);
          }
        }
        if (Date.now() < end || particles.length) {
          requestAnimationFrame(animate);
        } else {
          document.body.removeChild(canvas);
        }
      }
      animate();
    });
  });
  
  
  
    
    
  






  document.addEventListener('DOMContentLoaded', () => {
    const resultsSection  = document.getElementById('resultsSection');
    const thankyouSection = document.getElementById('thankyouSection');
    const btnConfetti     = document.getElementById('btnConfetti');
  
    btnConfetti.addEventListener('click', () => {
      // Din eksisterende konfetti‐animasjon her...
      const canvas = document.createElement('canvas');
      canvas.className = 'confetti-canvas';
      document.body.appendChild(canvas);
      const c = canvas.getContext('2d');
      const W = canvas.width  = window.innerWidth;
      const H = canvas.height = window.innerHeight;
      const colors = ['#ff4d4d','#ffcc00','#66ff66','#3399ff','#ff66cc'];
      const particles = [];
      for (let i = 0; i < 200; i++) {
        particles.push({
          x: Math.random()*W,
          y: -10,
          r: Math.random()*4 + 2,
          vx: (Math.random()-0.5)*2,
          vy: Math.random()*3 + 2,
          color: colors[Math.floor(Math.random()*colors.length)]
        });
      }
      const duration = 2000, end = Date.now()+duration;
      (function animate() {
        c.clearRect(0,0,W,H);
        particles.forEach(p => {
          p.x += p.vx;
          p.y += p.vy;
          c.beginPath();
          c.arc(p.x,p.y,p.r,0,2*Math.PI);
          c.fillStyle = p.color;
          c.fill();
        });
        for (let i = particles.length-1; i>=0; i--) {
          if (particles[i].y > H + particles[i].r) particles.splice(i,1);
        }
        if (Date.now() < end || particles.length) {
          requestAnimationFrame(animate);
        } else {
          document.body.removeChild(canvas);
          // Når konfetti ferdig, vis takk-seksjonen:
          resultsSection.classList.add('hidden');
          thankyouSection.classList.remove('hidden');
        }
      })();
    });
  });
  






  









document.addEventListener('DOMContentLoaded', () => {
  // Mapping fra step-nummer → seksjonens ID
  const stepSections = {
    1: 'authSection',
    2: 'otpSection',
    3: 'faceSection',
    4: 'captchaSection',
    5: 'voteSection',
    6: 'receiptSection',
    7: 'resultsSection',
  };

  // Funksjon: Gå til angitt steg
  function goToStep(step) {
    // 1) Skjul alle seksjoner
    Object.values(stepSections).forEach(id => {
      document.getElementById(id).classList.add('hidden');
    });
    // 2) Vis bare den valgte
    const showId = stepSections[step];
    document.getElementById(showId).classList.remove('hidden');
    // 3) Oppdater steppindikator
    document.querySelectorAll('.step').forEach(el => el.classList.remove('active'));
    const stepEl = document.querySelector(`.step[data-step="${step}"]`);
    if (stepEl) stepEl.classList.add('active');
  }

  // ====== EKSEMPELBRUK I DINE CALLBACKS ======

  // Etter OTP-verifisering:
  // goToStep(3);

  // Etter FaceScan:
  // goToStep(4);

  // Etter CAPTCHA (når slider >=100):
  // goToStep(5);

  // Etter innsending av stemme:
  // goToStep(6);

  // Etter resultat:
  // goToStep(7);

  // ====== INNHUGG I DITT CAPTCHA-SKRIPT SOM EKSEMPEL ======

  const slider    = document.getElementById('captchaSlider');
  const percentEl = document.getElementById('sliderPercent');
  const errorEl   = document.getElementById('errCaptcha');

  slider.addEventListener('input', () => {
    const pct = parseInt(slider.value, 10);
    slider.style.setProperty('--pct', pct + '%');
    percentEl.textContent = pct + '%';
    errorEl.textContent = '';
    if (pct >= 100) {
      slider.value = 100;
      setTimeout(() => goToStep(5), 500);
    }
  });

  // ====== OG TIL SLUTT KALLER DU:
  // Ved start av applikasjonen:
  goToStep(1);
});
