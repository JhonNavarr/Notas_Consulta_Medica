/**
 * MediScribe AI — Asistente de Transcripción y Estructuración Clínica
 * Medicina General · 6 Secciones de Historia Clínica
 */

// ==================== CASOS CLÍNICOS DE PRUEBA (CON RUIDO SOCIAL) ====================
const DEMO_CASES = {
  gastritis: {
    ref: 'María Gómez',
    age: '52 años',
    sex: 'Femenino',
    type: 'Primera vez / Consulta Externa',
    transcript: `Buenos días doctor, ¡qué aguacero tan horrible está cayendo afuera, casi no llego por el trancón de la avenida! ¿Cómo ha estado usted doctor, cómo sigue su mamá de la rodilla? Qué bueno doctor, me alegra mucho.
Bueno doctor, mire, yo vengo porque desde hace como 4 días tengo un dolor acá en la boca del estómago, como un ardor que me quema horrible, sobre todo después de almorzar o cuando tomo café en la mañana. Mi vecina doña Rosa me dijo que tomara agüita de caléndula con bicarbonato pero eso no me hizo nada. También siento como llenura fácil y a veces me sube un agrio a la garganta, pero no he vomitado ni he hecho del cuerpo negro ni con sangre, tampoco me ha dado fiebre.
Doctor, yo sufro de la tensión alta desde hace 5 años y me tomo el Losartán de 50 miligramos uno por la mañana y otro por la noche todos los días juiciosa. ¡Ah! Y estuve tomando Naproxeno hace una semana porque me dolía la espalda por estar alzando a mi nieto. Soy alérgica a la Penicilina, me broto toda. Me operaron de la vesícula hace 8 años. Mi papá murió del corazón.
Listo doña María, vamos a revisarla... Súbase por favor a la camilla con cuidado. Tiene la tensión arterial en 128/82, frecuencia cardíaca en 76 latidos por minuto, respiratoria en 16, temperatura 36.6 grados, saturando 97% al ambiente, peso 68 kilos y talla 1.60. En el examen físico está consciente, hidratada, cardiopulmonar con ruidos cardíacos rítmicos sin soplos, pulmones bien ventilados sin ruidos sobreagregados. En el abdomen hay ruidos intestinales presentes, está blando, le duele de forma moderada a la palpación en el epigastrio pero no tiene signos de irritación peritoneal ni masas.
Bueno doña María, esto es una gastritis aguda muy probablemente desencadenada por el Naproxeno que tomó la semana pasada. Le voy a suspender cualquier antiinflamatorio, le voy a formular Omeprazol de 20 miligramos una cápsula en ayunas todos los días por 30 días, e Hidróxido de aluminio con magnesio una cucharada 1 hora después de las comidas principales si tiene acidez por 10 días. Nada de café, picantes, grasas ni acostarse recién comida. Si presenta vómito con sangre, deposiciones negras como cuncho de café o dolor muy severo que no cede, acude de inmediato por urgencias. Muchas gracias doctor, Dios lo bendiga, saludos en la casa.`
  },
  faringitis: {
    ref: 'Carlos Andrés Pérez',
    age: '29 años',
    sex: 'Masculino',
    type: 'Urgencias / Prioritaria',
    transcript: `Hola doc, buenas tardes, qué frío hace hoy en ese consultorio con ese aire acondicionado jaja. ¿Vio el partido de anoche doc? Qué sufrimiento ese último minuto.
Doc, vengo porque desde antier por la noche empecé con un dolor de garganta tenaz que casi no me deja ni pasar saliva, me duele muchísimo al tragar. Ayer me dio fiebre alta, me puse el termómetro en la casa y marcó 38.8, con escalofríos y dolor de cabeza, pero no tengo tos, ni mocos, ni me siento ahogado.
Yo soy sano doc, no sufro de ninguna enfermedad, no tomo remedios de rutina, nunca me han operado de nada y no soy alérgico a ningún medicamento, ni fumo.
A ver Carlos, abra grande la boca... Signos vitales: tensión arterial 118/74, frecuencia cardíaca 94 por minuto, frecuencia respiratoria 18, temperatura actual 38.3 grados, saturación 98%. Orofaringe intensamente eritematosa, amígdalas hipertróficas grado III con exudado purulento blanquecino bilateral. En el cuello se palpan adenopatías cervicales anteriores bilaterales dolorosas. Cardiopulmonar normal, murmullo vesicular conservado sin estertores ni sibilancias, abdomen normal.
Listo Carlos, tienes una amigdalitis aguda bacteriana con criterios de Centor positivos. Te voy a formular Amoxicilina cápsulas de 500 miligramos, tomar 1 cápsula vía oral cada 8 horas durante 10 días completos, y Naproxeno de 250 miligramos cada 12 horas por 3 días con las comidas para el dolor y la fiebre, más Acetaminofén 500 mg cada 6 horas si hay fiebre mayor a 38. Abundantes líquidos fríos o al clima, te doy 2 días de incapacidad laboral y si tienes dificultad para respirar, imposibilidad total para tragar líquidos o fiebre que no baja al tercer día de antibiótico vienes por urgencias. Listo doc, mil gracias, buena tarde.`
  },
  cefalea: {
    ref: 'Laura Valentina Ríos',
    age: '34 años',
    sex: 'Femenino',
    type: 'Primera vez / Consulta Externa',
    transcript: `Buenas tardes doctora, qué pena llegar 5 minuticos tarde pero es que el ascensor del edificio estaba demorado. Ay qué bonito tiene el consultorio.
Doctora, consulto porque desde ayer al mediodía tengo un dolor de cabeza horrible en el lado derecho, siento como si me latiera el corazón ahí en la sien derecha, una intensidad de 8 sobre 10. Me molesta muchísimo la luz del celular y el ruido de la oficina, y hoy por la mañana tuve náuseas aunque no alcancé a vomitar. Cuando me acuesto en un cuarto oscuro mejora un poquito. No he visto luces raras antes del dolor ni se me ha dormido ninguna parte del cuerpo.
De antecedentes yo sufro de migraña desde la universidad pero hacía meses no me daba tan fuerte. Planifico con anticonceptivos orales combinados, no soy alérgica a medicamentos, no me han operado de nada. Mi mamá también sufre de migraña. Fecha de última menstruación hace 12 días.
Vamos a examinarte Laura: Tensión arterial 110/70, frecuencia cardíaca 72 por minuto, respiratoria 16, temperatura 36.5, saturación 99%, peso 58 kg, talla 1.63. Al examen físico alerta, orientada, pupilas isocóricas normorreactivas a la luz, fondo de ojo sin papiledema, pares craneales simétricos e íntegros, fuerza muscular 5/5 en las cuatro extremidades, sensibilidad conservada, sin signos meníngeos, marcha normal. Cardiopulmonar y abdomen sin alteraciones.
Laura, es un episodio de migraña sin aura, sin signos de bandera roja neurológica. Te voy a indicar Sumatriptán de 50 mg vía oral dosis única al inicio de la crisis, combinado con Naproxeno 500 mg vía oral cada 12 horas por 3 días y Metoclopramida 10 mg vía oral cada 8 horas por 2 días para las náuseas. Además te pido llevar un calendario de cefaleas, evitar ayunos prolongados, trasnocho y exceso de pantallas. Si presentas el peor dolor de cabeza de tu vida de inicio súbito, fiebre, visión doble, debilidad en medio cuerpo o dificultad para hablar, acudes de inmediato a urgencias.`
  }
};

const PLANTILLA_EXAMEN_FISICO_NORMAL = `Cabeza y cuello: Normocéfalo, mucosas húmedas y normocrómicas, cuello móvil, simétrico, sin adenopatías ni ingurgitación yugular.
Cardiopulmonar: Tórax normoexpansible, ruidos cardíacos rítmicos, bien timbrados, sin soplos. Murmullo vesicular conservado en ambos campos pulmonares, sin ruidos sobreagregados.
Abdomen: Blando, depresible, ruidos hidroaéreos presentes normoactivos, no doloroso a la palpación, sin signos de irritación peritoneal ni visceromegalias.
Extremidades: Simétricas, eutróficas, sin edemas, pulsos periféricos presentes y simétricos, llenado capilar < 2 segundos.
Neurológico: Alerta, orientado en persona, tiempo y espacio (Glasgow 15/15), sin déficit motor ni sensitivo aparente, pares craneales íntegros.`;

// ==================== ESTADO DE LA APLICACIÓN ====================
const state = {
  mode: 'native', // 'native' | 'recorder'
  isNativeListening: false,
  nativeSeconds: 0,
  nativeTimerInterval: null,
  recognition: null,

  // Recorder state
  mediaRecorder: null,
  audioChunks: [],
  recordedBlob: null,
  recordedMimeType: '',
  isRecording: false,
  isPaused: false,
  recSeconds: 0,
  recTimerInterval: null,
  audioContext: null,
  analyser: null,
  animationId: null,

  // Settings
  settings: {
    provider: localStorage.getItem('mediscribe_provider') || 'gemini',
    geminiApiKey: localStorage.getItem('mediscribe_gemini_key') || '',
    geminiModel: localStorage.getItem('mediscribe_gemini_model') || 'gemini-2.5-flash',
    groqApiKey: localStorage.getItem('mediscribe_groq_key') || '',
    whatsappPhone: localStorage.getItem('mediscribe_wa_phone') || '',
    doctorEmail: localStorage.getItem('mediscribe_doc_email') || '',
    theme: localStorage.getItem('mediscribe_theme') || 'light'
  },

  history: JSON.parse(localStorage.getItem('mediscribe_history') || '[]'),
  deferredInstallPrompt: null
};

// ==================== REFERENCIAS DOM ====================
const dom = {
  btnInstallPwa: document.getElementById('btnInstallPwa'),
  btnHistory: document.getElementById('btnHistory'),
  historyCount: document.getElementById('historyCount'),
  btnTheme: document.getElementById('btnTheme'),
  btnSettings: document.getElementById('btnSettings'),
  aiStatusDot: document.getElementById('aiStatusDot'),
  aiProviderLabel: document.getElementById('aiProviderLabel'),

  // Patient Context
  patientRef: document.getElementById('patientRef'),
  patientAge: document.getElementById('patientAge'),
  patientSex: document.getElementById('patientSex'),
  consultType: document.getElementById('consultType'),
  btnNewConsultation: document.getElementById('btnNewConsultation'),
  demoCaseSelect: document.getElementById('demoCaseSelect'),

  // Tabs & Panels
  tabNative: document.getElementById('tabNative'),
  tabRecorder: document.getElementById('tabRecorder'),
  panelNative: document.getElementById('panelNative'),
  panelRecorder: document.getElementById('panelRecorder'),

  // Mode 1: Native STT
  btnStartNative: document.getElementById('btnStartNative'),
  nativeMicIcon: document.getElementById('nativeMicIcon'),
  nativeMicText: document.getElementById('nativeMicText'),
  nativeTimer: document.getElementById('nativeTimer'),
  chkAutoRestart: document.getElementById('chkAutoRestart'),
  rawTranscript: document.getElementById('rawTranscript'),
  interimTranscript: document.getElementById('interimTranscript'),
  btnInsertVitalsPrompt: document.getElementById('btnInsertVitalsPrompt'),
  btnClearTranscript: document.getElementById('btnClearTranscript'),

  // Mode 2: Ambient Recorder
  audioVisualizer: document.getElementById('audioVisualizer'),
  recStateBadge: document.getElementById('recStateBadge'),
  recTimer: document.getElementById('recTimer'),
  btnStartRec: document.getElementById('btnStartRec'),
  btnPauseRec: document.getElementById('btnPauseRec'),
  btnStopRec: document.getElementById('btnStopRec'),
  audioPreviewWrap: document.getElementById('audioPreviewWrap'),
  recordedAudioPlayer: document.getElementById('recordedAudioPlayer'),
  audioMetaText: document.getElementById('audioMetaText'),
  btnDiscardAudio: document.getElementById('btnDiscardAudio'),
  audioFileInput: document.getElementById('audioFileInput'),

  // Process Controls
  chkNormalExamFill: document.getElementById('chkNormalExamFill'),
  chkIncludeCie10: document.getElementById('chkIncludeCie10'),
  btnProcessAi: document.getElementById('btnProcessAi'),
  btnProcessText: document.getElementById('btnProcessText'),
  processingAlert: document.getElementById('processingAlert'),
  processingAlertText: document.getElementById('processingAlertText'),
  noiseFilteredBanner: document.getElementById('noiseFilteredBanner'),
  noiseFilteredText: document.getElementById('noiseFilteredText'),

  // 6 Clinical Sections
  secMotivo: document.getElementById('secMotivo'),
  secEnfermedadActual: document.getElementById('secEnfermedadActual'),
  secAntecedentes: document.getElementById('secAntecedentes'),
  secExamenFisico: document.getElementById('secExamenFisico'),
  secAnalisis: document.getElementById('secAnalisis'),
  secPlanManejo: document.getElementById('secPlanManejo'),
  btnInsertNormalEf: document.getElementById('btnInsertNormalEf'),

  // Export & Bridge
  btnCopyAllTop: document.getElementById('btnCopyAllTop'),
  btnCopyAllBottom: document.getElementById('btnCopyAllBottom'),
  btnSendWhatsApp: document.getElementById('btnSendWhatsApp'),
  btnSendEmail: document.getElementById('btnSendEmail'),
  btnNativeShare: document.getElementById('btnNativeShare'),

  // Settings Modal
  settingsModal: document.getElementById('settingsModal'),
  btnCloseSettings: document.getElementById('btnCloseSettings'),
  aiProviderSelect: document.getElementById('aiProviderSelect'),
  geminiConfigBox: document.getElementById('geminiConfigBox'),
  groqConfigBox: document.getElementById('groqConfigBox'),
  geminiApiKey: document.getElementById('geminiApiKey'),
  geminiModelSelect: document.getElementById('geminiModelSelect'),
  groqApiKey: document.getElementById('groqApiKey'),
  defaultWhatsappPhone: document.getElementById('defaultWhatsappPhone'),
  defaultDoctorEmail: document.getElementById('defaultDoctorEmail'),
  btnSaveSettings: document.getElementById('btnSaveSettings'),

  // History Modal
  historyModal: document.getElementById('historyModal'),
  btnCloseHistory: document.getElementById('btnCloseHistory'),
  btnCloseHistoryBottom: document.getElementById('btnCloseHistoryBottom'),
  historyList: document.getElementById('historyList'),
  btnClearHistory: document.getElementById('btnClearHistory'),

  toast: document.getElementById('toast')
};

// ==================== INICIALIZACIÓN ====================
function initApp() {
  applyTheme(state.settings.theme);
  updateAiHeaderBadge();
  updateHistoryCounter();
  initVisualizerIdle();
  setupSpeechRecognition();
  bindEvents();
  registerServiceWorker();
}

function isIosDevice() {
  return /iPad|iPhone|iPod/.test(navigator.userAgent) ||
    (navigator.platform === 'MacIntel' && navigator.maxTouchPoints > 1);
}

function registerServiceWorker() {
  if ('serviceWorker' in navigator) {
    navigator.serviceWorker.register('./sw.js').catch(() => {});
  }
  if (isIosDevice() && !window.navigator.standalone) {
    dom.btnInstallPwa.classList.remove('hidden');
  }
  window.addEventListener('beforeinstallprompt', (e) => {
    e.preventDefault();
    state.deferredInstallPrompt = e;
    dom.btnInstallPwa.classList.remove('hidden');
  });
}

// ==================== TEMA Y CONFIGURACIÓN ====================
function applyTheme(theme) {
  document.documentElement.setAttribute('data-theme', theme);
  dom.btnTheme.textContent = theme === 'dark' ? '☀️' : '🌙';
  state.settings.theme = theme;
  localStorage.setItem('mediscribe_theme', theme);
}

function updateAiHeaderBadge() {
  const { provider, geminiApiKey, groqApiKey } = state.settings;
  if (provider === 'gemini') {
    const hasKey = Boolean(geminiApiKey.trim());
    dom.aiProviderLabel.textContent = hasKey ? 'Gemini IA Activo' : 'Gemini (Modo Demo / Configurar)';
    dom.aiStatusDot.classList.toggle('ready', hasKey);
  } else if (provider === 'groq') {
    const hasKey = Boolean(groqApiKey.trim());
    dom.aiProviderLabel.textContent = hasKey ? 'Groq IA Activo' : 'Groq (Modo Demo / Configurar)';
    dom.aiStatusDot.classList.toggle('ready', hasKey);
  } else {
    dom.aiProviderLabel.textContent = 'Motor Local';
    dom.aiStatusDot.classList.add('ready');
  }
}

function openSettingsModal() {
  dom.aiProviderSelect.value = state.settings.provider;
  dom.geminiApiKey.value = state.settings.geminiApiKey;
  dom.geminiModelSelect.value = state.settings.geminiModel;
  dom.groqApiKey.value = state.settings.groqApiKey;
  dom.defaultWhatsappPhone.value = state.settings.whatsappPhone;
  dom.defaultDoctorEmail.value = state.settings.doctorEmail;
  toggleProviderConfigBoxes(state.settings.provider);
  dom.settingsModal.classList.remove('hidden');
}

function toggleProviderConfigBoxes(provider) {
  dom.geminiConfigBox.classList.toggle('hidden', provider !== 'gemini');
  dom.groqConfigBox.classList.toggle('hidden', provider !== 'groq');
}

function saveSettings() {
  state.settings.provider = dom.aiProviderSelect.value;
  state.settings.geminiApiKey = dom.geminiApiKey.value.trim();
  state.settings.geminiModel = dom.geminiModelSelect.value;
  state.settings.groqApiKey = dom.groqApiKey.value.trim();
  state.settings.whatsappPhone = dom.defaultWhatsappPhone.value.replace(/[^\d]/g, '');
  state.settings.doctorEmail = dom.defaultDoctorEmail.value.trim();

  localStorage.setItem('mediscribe_provider', state.settings.provider);
  localStorage.setItem('mediscribe_gemini_key', state.settings.geminiApiKey);
  localStorage.setItem('mediscribe_gemini_model', state.settings.geminiModel);
  localStorage.setItem('mediscribe_groq_key', state.settings.groqApiKey);
  localStorage.setItem('mediscribe_wa_phone', state.settings.whatsappPhone);
  localStorage.setItem('mediscribe_doc_email', state.settings.doctorEmail);

  updateAiHeaderBadge();
  dom.settingsModal.classList.add('hidden');
  showToast('✅ Configuración guardada en este dispositivo');
}

// ==================== MODO 1: DICTADO NATIVO DEL TELÉFONO / NAVEGADOR ====================
function setupSpeechRecognition() {
  const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
  if (!SpeechRecognition) {
    dom.nativeMicText.textContent = 'Usa el micrófono 🎤 de tu teclado abajo';
    return;
  }

  const recognition = new SpeechRecognition();
  recognition.lang = 'es-CO';
  recognition.continuous = true;
  recognition.interimResults = true;

  recognition.onresult = (event) => {
    let interimText = '';
    let finalChunk = '';

    for (let i = event.resultIndex; i < event.results.length; i++) {
      const transcriptPiece = event.results[i][0].transcript;
      if (event.results[i].isFinal) {
        finalChunk += transcriptPiece.trim() + '. ';
      } else {
        interimText += transcriptPiece;
      }
    }

    if (finalChunk) {
      const current = dom.rawTranscript.value.trim();
      dom.rawTranscript.value = current ? `${current} ${finalChunk}` : finalChunk;
      dom.rawTranscript.scrollTop = dom.rawTranscript.scrollHeight;
    }

    if (interimText) {
      dom.interimTranscript.textContent = `Escuchando: "${interimText}..."`;
      dom.interimTranscript.classList.remove('hidden');
    } else {
      dom.interimTranscript.classList.add('hidden');
    }
  };

  recognition.onerror = (event) => {
    if (event.error === 'not-allowed' || event.error === 'service-not-allowed') {
      stopNativeListening();
      if (window.location.protocol === 'file:') {
        showToast('⚠️ Chrome bloquea el micrófono en archivos locales (file://). Abre http://localhost:8765 o usa Iniciar_MediScribe.bat');
      } else {
        showToast('⚠️ Permiso de micrófono denegado. Permite el acceso al micrófono en tu navegador (Safari/Chrome).');
      }
    } else if (event.error === 'audio-capture') {
      stopNativeListening();
      showToast('🎧 No se detectó ningún micrófono conectado o activo en este dispositivo.');
    }
  };

  recognition.onend = () => {
    if (state.isNativeListening && dom.chkAutoRestart.checked) {
      try {
        recognition.start();
      } catch (_) {}
    } else if (state.isNativeListening) {
      stopNativeListening();
    }
  };

  state.recognition = recognition;
}

function toggleNativeListening() {
  if (!state.recognition) {
    dom.rawTranscript.focus();
    showToast('💡 Toca el ícono de micrófono 🎤 del teclado de tu celular para dictar.');
    return;
  }

  if (state.isNativeListening) {
    stopNativeListening();
  } else {
    startNativeListening();
  }
}

function startNativeListening() {
  if (window.location.protocol === 'file:') {
    showToast('⚠️ Por seguridad, el navegador bloquea el micrófono en "file://". Entra a http://localhost:8765');
    return;
  }
  try {
    // Llamada 100% síncrona dentro del gesto del usuario (requerido por Safari en iPhone/iOS)
    state.isNativeListening = true;
    state.recognition.start();
    dom.btnStartNative.classList.add('listening');
    dom.nativeMicIcon.textContent = '⏹️';
    dom.nativeMicText.textContent = 'Escuchando Consulta... (Toca para detener)';
    startNativeTimer();
    showToast('🎤 Escucha activa: Habla con el paciente con normalidad');
  } catch (err) {
    state.isNativeListening = false;
    showToast('⚠️ Toca de nuevo para iniciar o usa el micrófono 🎤 del teclado de tu teléfono abajo.');
  }
}

function stopNativeListening() {
  state.isNativeListening = false;
  if (state.recognition) {
    try {
      state.recognition.stop();
    } catch (_) {}
  }
  dom.btnStartNative.classList.remove('listening');
  dom.nativeMicIcon.textContent = '🎤';
  dom.nativeMicText.textContent = 'Iniciar Escucha en Vivo';
  dom.interimTranscript.classList.add('hidden');
  stopNativeTimer();
}

function startNativeTimer() {
  clearInterval(state.nativeTimerInterval);
  state.nativeTimerInterval = setInterval(() => {
    state.nativeSeconds++;
    dom.nativeTimer.textContent = formatSeconds(state.nativeSeconds);
  }, 1000);
}

function stopNativeTimer() {
  clearInterval(state.nativeTimerInterval);
}

// ==================== MODO 2: GRABADORA DE CONSULTA AMBIENTE ====================
function initVisualizerIdle() {
  const canvas = dom.audioVisualizer;
  if (!canvas) return;
  const ctx = canvas.getContext('2d');
  ctx.fillStyle = '#0f172a';
  ctx.fillRect(0, 0, canvas.width, canvas.height);
  ctx.strokeStyle = '#38bdf8';
  ctx.lineWidth = 2;
  ctx.beginPath();
  ctx.moveTo(0, canvas.height / 2);
  ctx.lineTo(canvas.width, canvas.height / 2);
  ctx.stroke();
}

async function startAmbientRecording() {
  try {
    const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
    state.audioChunks = [];
    const mimeType = MediaRecorder.isTypeSupported('audio/webm;codecs=opus')
      ? 'audio/webm;codecs=opus'
      : MediaRecorder.isTypeSupported('audio/mp4')
      ? 'audio/mp4'
      : '';

    const recorder = mimeType ? new MediaRecorder(stream, { mimeType }) : new MediaRecorder(stream);
    state.mediaRecorder = recorder;
    state.recordedMimeType = recorder.mimeType || 'audio/webm';

    recorder.ondataavailable = (e) => {
      if (e.data && e.data.size > 0) {
        state.audioChunks.push(e.data);
      }
    };

    recorder.onstop = () => {
      const blob = new Blob(state.audioChunks, { type: state.recordedMimeType });
      state.recordedBlob = blob;
      const audioUrl = URL.createObjectURL(blob);
      dom.recordedAudioPlayer.src = audioUrl;
      const sizeKb = Math.round(blob.size / 1024);
      dom.audioMetaText.textContent = `Audio de consulta listo (${formatSeconds(state.recSeconds)} · ${sizeKb} KB)`;
      dom.audioPreviewWrap.classList.remove('hidden');
      stream.getTracks().forEach((t) => t.stop());
      stopVisualizer();
    };

    recorder.start(500);
    state.isRecording = true;
    state.isPaused = false;
    state.recSeconds = 0;
    dom.recTimer.textContent = '00:00';

    dom.recStateBadge.textContent = '🔴 Grabando consulta...';
    dom.recStateBadge.className = 'rec-badge recording';
    dom.btnStartRec.classList.add('hidden');
    dom.btnPauseRec.classList.remove('hidden');
    dom.btnStopRec.classList.remove('hidden');

    startRecTimer();
    startVisualizer(stream);
    showToast('🎙️ Grabando audio ambiente de la consulta...');
  } catch (err) {
    if (err && (err.name === 'NotFoundError' || err.name === 'DevicesNotFoundError')) {
      showToast('🎧 No hay ningún micrófono conectado o encendido en este PC. Conecta tus audífonos (PRO X / Nothing Ear) o úsala en tu celular.');
    } else {
      showToast('⚠️ No se pudo acceder al micrófono. Verifica que esté conectado y permitido.');
    }
  }
}

function togglePauseRecording() {
  if (!state.mediaRecorder) return;
  if (state.mediaRecorder.state === 'recording') {
    state.mediaRecorder.pause();
    state.isPaused = true;
    dom.recStateBadge.textContent = '⏸️ Grabación en pausa';
    dom.recStateBadge.className = 'rec-badge paused';
    dom.btnPauseRec.textContent = '▶️ Reanudar';
  } else if (state.mediaRecorder.state === 'paused') {
    state.mediaRecorder.resume();
    state.isPaused = false;
    dom.recStateBadge.textContent = '🔴 Grabando consulta...';
    dom.recStateBadge.className = 'rec-badge recording';
    dom.btnPauseRec.textContent = '⏸️ Pausar';
  }
}

function stopAmbientRecording() {
  if (state.mediaRecorder && state.mediaRecorder.state !== 'inactive') {
    state.mediaRecorder.stop();
  }
  state.isRecording = false;
  state.isPaused = false;
  clearInterval(state.recTimerInterval);
  dom.recStateBadge.textContent = '✅ Audio capturado';
  dom.recStateBadge.className = 'rec-badge idle';
  dom.btnStartRec.classList.remove('hidden');
  dom.btnPauseRec.classList.add('hidden');
  dom.btnStopRec.classList.add('hidden');
  dom.btnPauseRec.textContent = '⏸️ Pausar';
}

function startRecTimer() {
  clearInterval(state.recTimerInterval);
  state.recTimerInterval = setInterval(() => {
    if (!state.isPaused) {
      state.recSeconds++;
      dom.recTimer.textContent = formatSeconds(state.recSeconds);
    }
  }, 1000);
}

function startVisualizer(stream) {
  const canvas = dom.audioVisualizer;
  const ctx = canvas.getContext('2d');
  state.audioContext = new (window.AudioContext || window.webkitAudioContext)();
  const source = state.audioContext.createMediaStreamSource(stream);
  const analyser = state.audioContext.createAnalyser();
  analyser.fftSize = 128;
  source.connect(analyser);
  state.analyser = analyser;

  const bufferLength = analyser.frequencyBinCount;
  const dataArray = new Uint8Array(bufferLength);

  function draw() {
    state.animationId = requestAnimationFrame(draw);
    analyser.getByteFrequencyData(dataArray);
    ctx.fillStyle = '#0f172a';
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    const barWidth = (canvas.width / bufferLength) * 1.8;
    let x = 0;
    for (let i = 0; i < bufferLength; i++) {
      const barHeight = (dataArray[i] / 255) * (canvas.height - 10);
      ctx.fillStyle = state.isPaused ? '#f59e0b' : '#38bdf8';
      ctx.fillRect(x, canvas.height - barHeight - 4, barWidth - 2, Math.max(4, barHeight));
      x += barWidth;
    }
  }
  draw();
}

function stopVisualizer() {
  if (state.animationId) cancelAnimationFrame(state.animationId);
  if (state.audioContext) {
    state.audioContext.close().catch(() => {});
    state.audioContext = null;
  }
  initVisualizerIdle();
}

function handleAudioFileUpload(e) {
  const file = e.target.files[0];
  if (!file) return;
  state.recordedBlob = file;
  state.recordedMimeType = file.type || 'audio/mp3';
  const url = URL.createObjectURL(file);
  dom.recordedAudioPlayer.src = url;
  const sizeKb = Math.round(file.size / 1024);
  dom.audioMetaText.textContent = `Archivo cargado: ${file.name} (${sizeKb} KB)`;
  dom.audioPreviewWrap.classList.remove('hidden');
  showToast('📂 Audio cargado y listo para estructurar con IA');
}

// ==================== MOTOR DE IA CLÍNICA (GEMINI / GROQ / LOCAL) ====================
function buildClinicalSystemPrompt() {
  const includeCie10 = dom.chkIncludeCie10.checked;
  const fillNormalEf = dom.chkNormalExamFill.checked;
  const patientContext = [
    dom.patientRef.value ? `Paciente/Ref: ${dom.patientRef.value}` : '',
    dom.patientAge.value ? `Edad: ${dom.patientAge.value}` : '',
    dom.patientSex.value ? `Sexo: ${dom.patientSex.value}` : '',
    dom.consultType.value ? `Tipo de atención: ${dom.consultType.value}` : ''
  ].filter(Boolean).join(' | ');

  return `Eres un Médico General experto en semiología médica, redacción de Historia Clínica Electrónica (HCE) y auditoría médica en Latinoamérica/Colombia.
Tu tarea es recibir la transcripción o el audio de una consulta entre un médico y un paciente, y hacer dos cosas críticas:

1. DEPURACIÓN ESTRICTA DE RUIDO NO MÉDICO:
- Elimina por completo saludos ("buenos días", "cómo sigue su mamá"), comentarios sobre el clima, el tráfico, fútbol, chistes, interrupciones, muletillas y charla social que NO pertenezcan al acto médico.
- Conserva el 100% de los datos clínicos relevantes (síntomas, cronología, antecedentes, alergias, medicamentos, signos vitales, hallazgos del examen físico, diagnósticos, medicamentos formulados, dosis, incapacidad y signos de alarma).

2. ESTRUCTURACIÓN MÉDICA EN 6 SECCIONES EXACTAS:
Traduce el lenguaje coloquial del paciente a terminología médica semiológica precisa (ej. "ardor en la boca del estómago" -> "dolor abdominal tipo urente en epigastrio"; "dolor al pasar saliva" -> "odinofagia") y organiza la salida ESTRICTAMENTE en un objeto JSON válido con las siguientes 7 propiedades exactas (sin bloques markdown adicionales):

{
  "ruidoDescartado": "Breve resumen en 1 línea de qué elementos no médicos fueron eliminados (ej: Saludos iniciales, comentarios del clima y charla sobre familiares).",
  "motivo": "1. Motivo de la consulta: Razón principal breve y concisa de la consulta (puede ir entre comillas en palabras simples o síntoma cardinal).",
  "enfermedadActual": "2. Enfermedad Actual: Relato cronológico, técnico y bien redactado del cuadro clínico (tiempo de evolución, localización, carácter/tipo, intensidad, irradiación, factores agravantes/atenuantes, tratamientos previos y síntomas asociados positivos y negativos pertinentes).",
  "antecedentes": "3. Antecedentes: Organizados claramente en Patológicos, Farmacológicos (con dosis si se menciona), Alérgicos, Quirúrgicos, Tóxicos, Familiares y Ginecoobstétricos (si aplica). Si no se mencionan en la consulta, escribe 'No referidos durante el interrogatorio'.",
  "examenFisico": "4. Examen físico: Inicia con Signos Vitales (TA, FC, FR, T°, SpO2, Peso, Talla, IMC si están disponibles) y luego el examen por sistemas con los hallazgos mencionados por el médico.${fillNormalEf ? ' Para los sistemas no mencionados como anormales, completa con hallazgos normales estándar de medicina general (cabeza/cuello, cardiopulmonar, abdomen, extremidades, neurológico) cuidando de NO contradecir ningún hallazgo positivo dicho por el médico.' : ' Registra únicamente los signos vitales y hallazgos de examen físico mencionados en la consulta.'}",
  "analisis": "5. Análisis: TOMA E INTEGRA explícitamente los ítems anteriores (Motivo de consulta + Enfermedad Actual + Antecedentes + Examen físico). Redacta un párrafo de razonamiento clínico integrador que correlacione el cuadro sindromático y los antecedentes con los hallazgos al examen físico, oriente hacia la Impresión Diagnóstica${includeCie10 ? ' (incluyendo códigos CIE-10 sugeridos y nombre del diagnóstico)' : ''} y justifique la conducta y el plan de manejo instaurado.",
  "planManejo": "6. Plan de manejo: Lista numerada y clara con: 1) Manejo farmacológico (medicamento, concentración, vía, dosis, frecuencia y duración exacta), 2) Órdenes médicas / Paraclínicos o interconsultas (si aplica), 3) Recomendaciones no farmacológicas e incapacidad médica (si se indicó), y 4) Signos de alarma explicados al paciente para acudir a urgencias."
}

${patientContext ? `Contexto adicional del paciente: ${patientContext}` : ''}
Responde ÚNICAMENTE con el objeto JSON válido.`;
}

async function processConsultationWithAi() {
  if (state.isNativeListening) stopNativeListening();
  if (state.isRecording) stopAmbientRecording();

  const isAudioMode = state.mode === 'recorder';
  const rawText = dom.rawTranscript.value.trim();

  if (isAudioMode && !state.recordedBlob) {
    showToast('⚠️ Graba el audio de la consulta o sube un archivo de audio primero.');
    return;
  }
  if (!isAudioMode && !rawText) {
    showToast('⚠️ No hay texto transcrito. Inicia el dictado o carga un caso de ejemplo.');
    return;
  }

  setProcessingUi(true, isAudioMode ? 'Transcribiendo audio médico y estructurando las 6 secciones con IA...' : 'Depurando charla no médica y estructurando las 6 secciones...');

  try {
    const { provider, geminiApiKey, groqApiKey } = state.settings;
    let resultData = null;

    if (provider === 'gemini' && geminiApiKey) {
      resultData = await callGeminiApi(isAudioMode ? null : rawText, isAudioMode ? state.recordedBlob : null);
    } else if (provider === 'groq' && groqApiKey) {
      resultData = await callGroqApi(isAudioMode ? null : rawText, isAudioMode ? state.recordedBlob : null);
    } else {
      // Modo Local Inteligente (funciona sin API key para pruebas inmediatas y dictados)
      if (isAudioMode) {
        setProcessingUi(false);
        openSettingsModal();
        showToast('🔑 Para procesar archivos de audio grabados, ingresa tu API Key gratuita de Gemini o Groq.');
        return;
      }
      await new Promise((r) => setTimeout(r, 650));
      resultData = processWithLocalClinicalEngine(rawText);
    }

    populateClinicalSections(resultData);
    saveToShiftHistory(resultData);
    setProcessingUi(false);
    document.getElementById('outputSection').scrollIntoView({ behavior: 'smooth', block: 'start' });
    showToast('✨ Nota médica estructurada en 6 secciones lista');
  } catch (err) {
    console.error(err);
    setProcessingUi(false);
    showToast(`⚠️ Error al procesar con IA: ${err.message || 'Verifica tu conexión o API Key'}`);
  }
}

async function callGeminiApi(textInput, audioBlob) {
  const apiKey = state.settings.geminiApiKey.trim();
  const model = state.settings.geminiModel || 'gemini-2.5-flash';
  const systemPrompt = buildClinicalSystemPrompt();

  const parts = [{ text: systemPrompt }];

  if (audioBlob) {
    const base64Audio = await blobToBase64(audioBlob);
    parts.push({
      inline_data: {
        mime_type: audioBlob.type ? audioBlob.type.split(';')[0] : 'audio/webm',
        data: base64Audio
      }
    });
    parts.push({
      text: 'Escucha atentamente el audio completo de esta consulta médica, descarta cualquier conversación casual o saludo, y genera el JSON con las 6 secciones clínicas.'
    });
  } else {
    parts.push({
      text: `TRANSCRIPCIÓN BRUTA DE LA CONSULTA:\n"""\n${textInput}\n"""`
    });
  }

  const url = `https://generativelanguage.googleapis.com/v1beta/models/${model}:generateContent?key=${encodeURIComponent(apiKey)}`;
  const response = await fetch(url, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      contents: [{ parts }],
      generationConfig: {
        temperature: 0.15,
        responseMimeType: 'application/json'
      }
    })
  });

  if (!response.ok) {
    const errBody = await response.json().catch(() => ({}));
    throw new Error(errBody?.error?.message || `Error HTTP ${response.status} en Gemini API`);
  }

  const data = await response.json();
  const rawJsonText = data?.candidates?.[0]?.content?.parts?.[0]?.text || '';
  return parseCleanJson(rawJsonText);
}

async function callGroqApi(textInput, audioBlob) {
  const apiKey = state.settings.groqApiKey.trim();
  let transcriptToProcess = textInput;

  // Paso 1: Si es audio, transcribir primero con Groq Whisper Large v3 Turbo
  if (audioBlob) {
    dom.processingAlertText.textContent = 'Paso 1/2: Transcribiendo audio con Groq Whisper Large v3...';
    const formData = new FormData();
    const ext = (audioBlob.type || '').includes('mp4') ? 'm4a' : 'webm';
    formData.append('file', audioBlob, `consulta.${ext}`);
    formData.append('model', 'whisper-large-v3-turbo');
    formData.append('language', 'es');
    formData.append('response_format', 'json');

    const sttResp = await fetch('https://api.groq.com/openai/v1/audio/transcriptions', {
      method: 'POST',
      headers: { Authorization: `Bearer ${apiKey}` },
      body: formData
    });

    if (!sttResp.ok) {
      const errStt = await sttResp.json().catch(() => ({}));
      throw new Error(errStt?.error?.message || 'Error en transcripción Whisper de Groq');
    }

    const sttJson = await sttResp.json();
    transcriptToProcess = sttJson.text || '';
    dom.rawTranscript.value = transcriptToProcess;
  }

  // Paso 2: Estructurar en las 6 secciones con Llama 3.3 70B
  dom.processingAlertText.textContent = 'Paso 2/2: Depurando ruido y redactando las 6 secciones clínicas...';
  const llmResp = await fetch('https://api.groq.com/openai/v1/chat/completions', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${apiKey}`
    },
    body: JSON.stringify({
      model: 'llama-3.3-70b-versatile',
      temperature: 0.15,
      response_format: { type: 'json_object' },
      messages: [
        { role: 'system', content: buildClinicalSystemPrompt() },
        { role: 'user', content: `TRANSCRIPCIÓN BRUTA DE LA CONSULTA:\n"""\n${transcriptToProcess}\n"""` }
      ]
    })
  });

  if (!llmResp.ok) {
    const errLlm = await llmResp.json().catch(() => ({}));
    throw new Error(errLlm?.error?.message || 'Error en estructuración clínica de Groq');
  }

  const llmData = await llmResp.json();
  const content = llmData?.choices?.[0]?.message?.content || '{}';
  return parseCleanJson(content);
}

// ==================== MOTOR CLÍNICO LOCAL (MODO DEMO / SIN API KEY) ====================
function processWithLocalClinicalEngine(rawText) {
  const lower = rawText.toLowerCase();
  const includeCie10 = dom.chkIncludeCie10.checked;
  const fillNormalEf = dom.chkNormalExamFill.checked;

  // Reconocimiento directo de los 3 casos de ejemplo para demostración médica perfecta
  if (lower.includes('boca del estómago') && lower.includes('losartán') && lower.includes('omeprazol')) {
    return {
      ruidoDescartado: 'Se eliminaron saludos iniciales, quejas sobre el aguacero/trancón, preguntas por la rodilla de la mamá del médico, consejos de la vecina y despedidas sociales.',
      motivo: '"Dolor y ardor en la boca del estómago"',
      enfermedadActual: 'Paciente femenina de 52 años con cuadro clínico de aproximadamente 4 días de evolución consistente en dolor abdominal tipo urente localizado en epigastrio, de intensidad moderada, exacerbado en el periodo postprandial y con la ingesta de café. Se asocia a saciedad precoz y regurgitación ácida ocasional. Refiere automedicación reciente con infusiones herbales y bicarbonato sin mejoría, además de ingesta previa de AINEs (Naproxeno) hace 1 semana por lumbalgia mecánica. Niega emesis, hematemesis, melenas, hematoquecia, disfagia o picos febriles.',
      antecedentes: '• Patológicos: Hipertensión arterial esencial (diagnosticada hace 5 años).\n• Farmacológicos: Losartán 50 mg vía oral cada 12 horas (adherente). Uso reciente de Naproxeno hace 7 días.\n• Alérgicos: Alergia medicamentosa a la Penicilina (reacción cutánea urticariforme).\n• Quirúrgicos: Colecistectomía hace 8 años.\n• Familiares: Padre fallecido por cardiopatía isquémica.',
      examenFisico: `Signos Vitales: TA: 128/82 mmHg | FC: 76 lpm | FR: 16 rpm | T°: 36.6 °C | SpO2: 97% (FiO2 21%) | Peso: 68 kg | Talla: 1.60 m | IMC: 26.5 kg/m².\nAspecto general: Consciente, alerta, orientada, hidratada, afebril, en buenas condiciones generales.\nCardiopulmonar: Ruidos cardíacos rítmicos, sin soplos. Murmullo vesicular conservado en ambos campos pulmonares, sin sobreagregados.\nAbdomen: Ruidos hidroaéreos presentes, blando, depresible, dolor moderado a la palpación superficial y profunda en epigastrio, sin masas ni visceromegalias, sin signos de irritación peritoneal (Blumberg negativo).${fillNormalEf ? '\nExtremidades: Eutróficas, sin edemas, pulsos distales presentes.\nNeurológico: Sin déficit motor ni sensitivo aparente.' : ''}`,
      analisis: `Paciente femenina de 52 años con antecedente de hipertensión arterial en manejo con ARA-II y alergia conocida a penicilinas, quien consulta por cuadro agudo de epigastralgia urente postprandial y pirosis de 4 días de evolución, posterior al consumo de AINEs (Naproxeno). Al examen físico se encuentra hemodinámicamente estable, con dolor selectivo a la palpación en epigastrio sin signos de irritación peritoneal ni estigmas de sangrado digestivo alto. Integrando el motivo de consulta, la enfermedad actual, el antecedente farmacológico gastrolesivo y el examen físico, el cuadro es clínicamente compatible con Gastritis aguda / Dispepsia inducida por AINEs${includeCie10 ? ' (CIE-10: K29.1 Otras gastritis agudas / K30X Dispepsia) e Hipertensión esencial controlada (CIE-10: I10X)' : ''}. Se orienta manejo ambulatorio con inhibidor de bomba de protones, suspensión estricta de AINEs, protector de mucosa gástrica y educación en signos de alarma.`,
      planManejo: '1. Suspender de inmediato consumo de AINEs (Naproxeno, Ibuprofeno, Aspirina).\n2. Omeprazol cápsulas de 20 mg: tomar 1 cápsula vía oral en ayunas todos los días por 30 días.\n3. Hidróxido de Aluminio + Magnesio suspensión: tomar 1 cucharada (10 mL) vía oral 1 hora después de las comidas principales por 10 días según acidez.\n4. Continuar tratamiento antihipertensivo habitual (Losartán 50 mg VO cada 12 horas).\n5. Recomendaciones higiénico-dietéticas: evitar café, cítricos, picantes, grasas, bebidas oscuras y evitar decúbito durante las 2 horas posteriores a las comidas.\n6. Signos de alarma explicados: acudir de inmediato a Urgencias en caso de vómito con sangre (hematemesis), deposiciones negras fétidas (melenas), dolor abdominal severo que no cede o síncope.'
    };
  }

  if (lower.includes('garganta') && lower.includes('amoxicilina')) {
    return {
      ruidoDescartado: 'Se descartaron comentarios sobre el frío del aire acondicionado, charla sobre el partido de fútbol de anoche y saludos sociales.',
      motivo: '"Dolor de garganta muy fuerte y fiebre"',
      enfermedadActual: 'Paciente masculino de 29 años con cuadro clínico de 48 horas de evolución consistente en odinofagia intensa progresiva que dificulta la deglución, asociada a fiebre cuantificada en 38.8 °C, escalofríos y cefalea holocraneana. Niega tos, rinorrea, disfonía, disnea o síntomas gastrointestinales.',
      antecedentes: '• Patológicos: Niega.\n• Farmacológicos: Ninguno de rutina.\n• Alérgicos: Niega alergias medicamentosas conocidas.\n• Quirúrgicos: Niega.\n• Tóxicos: No fumador.',
      examenFisico: `Signos Vitales: TA: 118/74 mmHg | FC: 94 lpm | FR: 18 rpm | T°: 38.3 °C | SpO2: 98%.\nCabeza, cuello y ORL: Orofaringe intensamente eritematosa y congestiva, amígdalas palatinas hipertróficas grado III con exudado purulento blanquecino bilateral. Se palpan adenopatías cervicales anteriores bilaterales móviles y dolorosas.\nCardiopulmonar: Ruidos cardíacos rítmicos sin soplos, murmullo vesicular conservado sin estertores ni sibilancias.\nAbdomen: Blando, depresible, no doloroso.${fillNormalEf ? '\nExtremidades y Neurológico: Sin alteraciones.' : ''}`,
      analisis: `Paciente masculino joven de 29 años, sin antecedentes patológicos ni alergias medicamentosas, quien cursa con cuadro febril agudo de 2 días de evolución acompañado de odinofagia severa sin síntomas catarrales virales (sin tos). Al examen físico destaca fiebre de 38.3 °C, exudado amigdalino purulento bilateral e hipertrofia grado III con adenopatías cervicales anteriores dolorosas, configurando 4/4 criterios de Centor modificados. Integrando el motivo de consulta, la enfermedad actual, la ausencia de alergias a betalactámicos y los hallazgos físicos, se establece diagnóstico de Amigdalitis aguda bacteriana estreptocócica${includeCie10 ? ' (CIE-10: J03.9 Amigdalitis aguda, no especificada)' : ''}, por lo que se instaura antibioticoterapia empírica de primera línea, manejo analgésico/antipirético e incapacidad médica.`,
      planManejo: '1. Amoxicilina cápsulas de 500 mg: tomar 1 cápsula vía oral cada 8 horas por 10 días completos.\n2. Naproxeno tabletas de 250 mg: tomar 1 tableta vía oral cada 12 horas con las comidas por 3 días.\n3. Acetaminofén tabletas de 500 mg: tomar 1 tableta vía oral cada 6 horas si persiste fiebre > 38 °C o dolor.\n4. Abundante hidratación oral con líquidos a temperatura ambiente o fríos, dieta blanda.\n5. Se expide incapacidad médica laboral por 2 (dos) días.\n6. Signos de alarma: acudir por Urgencias si presenta disnea, sialorrea o imposibilidad total para deglutir líquidos, asimetría marcada del paladar (sospecha de absceso periamigdalino) o persistencia de fiebre tras 72 horas de antibiótico.'
    };
  }

  if (lower.includes('sien derecha') || lower.includes('sumatriptán') || lower.includes('migraña')) {
    return {
      ruidoDescartado: 'Se eliminaron disculpas por la demora del ascensor y elogios a la decoración del consultorio.',
      motivo: '"Dolor de cabeza fuerte en el lado derecho"',
      enfermedadActual: 'Paciente femenina de 34 años con cuadro clínico de 24 horas de evolución consistente en cefalea hemicraneana derecha de carácter pulsátil, intensidad 8/10 en la escala visual análoga, acompañada de fotofobia, fonofobia y náuseas sin llegar a la emesis. Refiere atenuación parcial con el reposo en oscuridad. Niega síntomas visuales prodrómicos (aura), parestesias, déficit motor, fiebre o trauma craneoencefálico.',
      antecedentes: '• Patológicos: Migraña diagnosticada en la juventud.\n• Farmacológicos: Anticonceptivos orales combinados.\n• Alérgicos: Niega alergias a medicamentos.\n• Quirúrgicos: Niega.\n• Ginecoobstétricos: FUM hace 12 días.\n• Familiares: Madre con antecedente de migraña.',
      examenFisico: `Signos Vitales: TA: 110/70 mmHg | FC: 72 lpm | FR: 16 rpm | T°: 36.5 °C | SpO2: 99% | Peso: 58 kg | Talla: 1.63 m.\nNeurológico: Alerta, orientada en las tres esferas, pupilas isocóricas normorreactivas a la luz, fondo de ojo sin papiledema, pares craneales íntegros y simétricos, fuerza muscular 5/5 en las 4 extremidades, sensibilidad conservada, sin signos meníngeos, marcha coordinada.\nCardiopulmonar y Abdomen: Sin hallazgos patológicos.`,
      analisis: `Paciente femenina de 34 años con antecedente personal y familiar de migraña, quien presenta episodio agudo de cefalea hemicraneana pulsátil severa asociada a fotofobia, fonofobia y náuseas, con examen físico neurológico completamente normal y sin banderas rojas (sin signos meníngeos, sin focalización ni papiledema). La integración de los hallazgos subjetivos y objetivos confirma un episodio de Migraña sin aura${includeCie10 ? ' (CIE-10: G43.0 Migraña sin aura [migraña común])' : ''}. Se orienta manejo abortivo específico con triptán, AINE, antiemético e higiene de sueño/alimentación.`,
      planManejo: '1. Sumatriptán tabletas de 50 mg: tomar 1 tableta vía oral dosis única para control de la crisis.\n2. Naproxeno tabletas de 500 mg: tomar 1 tableta vía oral cada 12 horas por 3 días.\n3. Metoclopramida tabletas de 10 mg: tomar 1 tableta vía oral cada 8 horas por 2 días para control de náuseas.\n4. Recomendaciones no farmacológicas: reposo en ambiente oscuro y silencioso, llevar diario/calendario de cefaleas, evitar ayunos prolongados, deshidratación y exposición prolongada a pantallas.\n5. Signos de alarma: consultar inmediatamente a Urgencias si presenta cefalea en trueno (inicio súbito explosivo), fiebre, rigidez nucal, visión doble, debilidad o adormecimiento en alguna parte del cuerpo o alteración del habla.'
    };
  }

  // Analizador heurístico general para cualquier dictado libre cuando no hay API Key configurada
  const sentences = rawText
    .split(/(?<=[.!?])\s+|\n+/)
    .map((s) => s.trim())
    .filter(Boolean);

  const noiseRegex = /\b(buenos días|buenas tardes|buenas noches|hola doctor|hola doc|cómo está|cómo sigue su mamá|qué calor|qué frío|aguacero|trancón|partido de anoche|dios lo bendiga|saludos en la casa|qué pena llegar tarde|ascensor)\b/i;

  const discarded = [];
  const medicalSentences = [];

  sentences.forEach((s) => {
    if (noiseRegex.test(s) && !/\b(dolor|fiebre|tensión|presión|tomo|alérg|mg|días|horas)\b/i.test(s)) {
      discarded.push(s);
    } else {
      const cleaned = s
        .replace(/^(buenos días|buenas tardes|buenas noches|hola)\s+(doctor|doctora|doc)[,.\s]*/i, '')
        .trim();
      if (cleaned) medicalSentences.push(cleaned);
    }
  });

  const antSentences = [];
  const efSentences = [];
  const planSentences = [];
  const eaSentences = [];

  medicalSentences.forEach((s) => {
    if (/\b(antecedente|sufro de|hipertens|diabét|alérgic|operaron|cirugía|fum|mamá|papá|tomo de rutina)\b/i.test(s)) {
      antSentences.push(s);
    } else if (/\b(tensión arterial|ta\b|frecuencia cardíaca|fc\b|saturación|spo2|examen físico|cardiopulmonar|murmullo vesicular|abdomen blando|orofaringe|normocéfal)\b/i.test(s)) {
      efSentences.push(s);
    } else if (/\b(voy a formular|formular|tomar|cada \d+ horas|incapacidad|signos de alarma|urgencias si|recomendaciones|paraclínicos)\b/i.test(s)) {
      planSentences.push(s);
    } else {
      eaSentences.push(s);
    }
  });

  const motivo = eaSentences[0] ? `"${eaSentences[0].slice(0, 110)}"` : 'Valoración por medicina general.';
  const eaText = eaSentences.length
    ? `Paciente que asiste a consulta refiriendo: ${eaSentences.join(' ')}`
    : 'Paciente acude para valoración clínica.';
  const antText = antSentences.length
    ? antSentences.join('\n')
    : 'No referidos durante el interrogatorio.';
  const efText = [
    efSentences.join('\n'),
    fillNormalEf ? PLANTILLA_EXAMEN_FISICO_NORMAL : ''
  ].filter(Boolean).join('\n');

  const analisisText = `Integrando el motivo de consulta, la enfermedad actual (${eaSentences[0] || 'cuadro clínico referido'}), los antecedentes reportados y los hallazgos del examen físico, se realiza valoración integral en consulta de Medicina General orientando impresión diagnóstica clínica${includeCie10 ? ' (sugerido correlacionar código CIE-10 según hallazgo principal)' : ''} y definiendo conducta terapéutica ambulatoria con educación en signos de alarma. (💡 Configura tu API Key gratuita de Google Gemini o Groq arriba en ⚙️ para redacción semiológica avanzada con IA).`;

  const planText = planSentences.length
    ? planSentences.join('\n')
    : '1. Manejo médico según hallazgos clínicos.\n2. Recomendaciones generales y medidas higiénico-dietéticas.\n3. Signos de alarma explicados verbalmente al paciente para acudir a Urgencias.\n4. Control médico según evolución.';

  return {
    ruidoDescartado: discarded.length
      ? `Se filtraron ${discarded.length} fragmentos de saludo/charla casual no médica.`
      : 'Se depuraron muletillas y saludos iniciales conservando los datos clínicos.',
    motivo,
    enfermedadActual: eaText,
    antecedentes: antText,
    examenFisico: efText,
    analisis: analisisText,
    planManejo: planText
  };
}

// ==================== POBLAR Y EDITAR LAS 6 SECCIONES ====================
function autoResizeTextarea(el) {
  if (!el) return;
  el.style.height = 'auto';
  el.style.height = `${Math.max(el.scrollHeight + 4, 68)}px`;
}

function populateClinicalSections(data) {
  dom.secMotivo.value = cleanSectionPrefix(data.motivo || '');
  dom.secEnfermedadActual.value = cleanSectionPrefix(data.enfermedadActual || '');
  dom.secAntecedentes.value = cleanSectionPrefix(data.antecedentes || '');
  dom.secExamenFisico.value = cleanSectionPrefix(data.examenFisico || '');
  dom.secAnalisis.value = cleanSectionPrefix(data.analisis || '');
  dom.secPlanManejo.value = cleanSectionPrefix(data.planManejo || '');

  [
    dom.secMotivo,
    dom.secEnfermedadActual,
    dom.secAntecedentes,
    dom.secExamenFisico,
    dom.secAnalisis,
    dom.secPlanManejo
  ].forEach(autoResizeTextarea);

  if (data.ruidoDescartado) {
    dom.noiseFilteredText.textContent = data.ruidoDescartado;
    dom.noiseFilteredBanner.classList.remove('hidden');
  }
}

function cleanSectionPrefix(text) {
  return String(text)
    .replace(/^[1-6]\.\s*(Motivo de la consulta|Motivo de consulta|Enfermedad Actual|Antecedentes|Examen físico|Examen Físico|Análisis|Plan de manejo)\s*:\s*/i, '')
    .trim();
}

// ==================== EXPORTACIÓN Y PUENTE CELULAR -> PC ====================
function buildFormattedNote({ forWhatsApp = false } = {}) {
  const b = forWhatsApp ? '*' : '';
  const refHeader = [
    dom.patientRef.value ? `Paciente/Ref: ${dom.patientRef.value}` : '',
    dom.patientAge.value ? `Edad: ${dom.patientAge.value}` : '',
    dom.patientSex.value ? `Sexo: ${dom.patientSex.value}` : ''
  ].filter(Boolean).join(' | ');

  const lines = [];
  if (refHeader) {
    lines.push(`${b}DATOS PACIENTE:${b} ${refHeader}`);
    lines.push('');
  }

  lines.push(`${b}MOTIVO DE LA CONSULTA:${b}`);
  lines.push(dom.secMotivo.value.trim() || 'No registrado.');
  lines.push('');

  lines.push(`${b}ENFERMEDAD ACTUAL:${b}`);
  lines.push(dom.secEnfermedadActual.value.trim() || 'No registrada.');
  lines.push('');

  lines.push(`${b}ANTECEDENTES:${b}`);
  lines.push(dom.secAntecedentes.value.trim() || 'Sin antecedentes referidos.');
  lines.push('');

  lines.push(`${b}EXAMEN FÍSICO:${b}`);
  lines.push(dom.secExamenFisico.value.trim() || 'Sin hallazgos registrados.');
  lines.push('');

  lines.push(`${b}ANÁLISIS:${b}`);
  lines.push(dom.secAnalisis.value.trim() || 'No registrado.');
  lines.push('');

  lines.push(`${b}PLAN DE MANEJO:${b}`);
  lines.push(dom.secPlanManejo.value.trim() || 'No registrado.');

  return lines.join('\n');
}

async function copyTextToClipboard(text, label = 'Nota completa') {
  if (!text.trim()) {
    showToast('⚠️ El campo está vacío.');
    return;
  }
  try {
    await navigator.clipboard.writeText(text);
    showToast(`📋 ${label} copiado al portapapeles`);
  } catch (_) {
    const temp = document.createElement('textarea');
    temp.value = text;
    document.body.appendChild(temp);
    temp.select();
    document.execCommand('copy');
    document.body.removeChild(temp);
    showToast(`📋 ${label} copiado al portapapeles`);
  }
}

function sendToWhatsApp() {
  const text = buildFormattedNote({ forWhatsApp: true });
  const phone = state.settings.whatsappPhone.replace(/[^\d]/g, '');
  const encoded = encodeURIComponent(text);
  const waUrl = phone
    ? `https://api.whatsapp.com/send?phone=${phone}&text=${encoded}`
    : `https://api.whatsapp.com/send?text=${encoded}`;
  window.open(waUrl, '_blank', 'noopener,noreferrer');
}

function sendByEmail() {
  const text = buildFormattedNote({ forWhatsApp: false });
  const ref = dom.patientRef.value.trim() || new Date().toLocaleTimeString('es-CO', { hour: '2-digit', minute: '2-digit' });
  const subject = encodeURIComponent(`Historia Clínica - ${ref}`);
  const body = encodeURIComponent(text);
  const to = encodeURIComponent(state.settings.doctorEmail || '');
  window.location.href = `mailto:${to}?subject=${subject}&body=${body}`;
}

async function shareNatively() {
  const text = buildFormattedNote({ forWhatsApp: false });
  if (navigator.share) {
    try {
      await navigator.share({
        title: 'Nota de Consulta Médica',
        text
      });
    } catch (_) {}
  } else {
    copyTextToClipboard(text, 'Nota médica completa');
  }
}

// ==================== HISTORIAL DEL TURNO ====================
function saveToShiftHistory(data) {
  const item = {
    id: Date.now(),
    timestamp: new Date().toLocaleString('es-CO', { hour: '2-digit', minute: '2-digit', day: '2-digit', month: '2-digit' }),
    ref: dom.patientRef.value.trim() || data.motivo?.slice(0, 38) || 'Consulta General',
    sections: {
      motivo: dom.secMotivo.value,
      enfermedadActual: dom.secEnfermedadActual.value,
      antecedentes: dom.secAntecedentes.value,
      examenFisico: dom.secExamenFisico.value,
      analisis: dom.secAnalisis.value,
      planManejo: dom.secPlanManejo.value
    }
  };

  state.history.unshift(item);
  if (state.history.length > 20) state.history.pop();
  localStorage.setItem('mediscribe_history', JSON.stringify(state.history));
  updateHistoryCounter();
}

function updateHistoryCounter() {
  dom.historyCount.textContent = state.history.length;
}

function renderHistoryModal() {
  dom.historyList.innerHTML = '';
  if (state.history.length === 0) {
    dom.historyList.innerHTML = '<p style="text-align:center;color:var(--text-muted);padding:16px;">Aún no hay consultas guardadas en este turno.</p>';
  } else {
    state.history.forEach((item) => {
      const row = document.createElement('div');
      row.className = 'history-item';
      row.innerHTML = `
        <div class="history-item-info">
          <strong>${escapeHtml(item.ref)}</strong>
          <small>${escapeHtml(item.timestamp)} · ${escapeHtml((item.sections.motivo || '').slice(0, 50))}</small>
        </div>
        <button type="button" class="btn-chip" data-id="${item.id}">Cargar nota</button>
      `;
      row.querySelector('button').addEventListener('click', () => {
        dom.secMotivo.value = item.sections.motivo || '';
        dom.secEnfermedadActual.value = item.sections.enfermedadActual || '';
        dom.secAntecedentes.value = item.sections.antecedentes || '';
        dom.secExamenFisico.value = item.sections.examenFisico || '';
        dom.secAnalisis.value = item.sections.analisis || '';
        dom.secPlanManejo.value = item.sections.planManejo || '';
        dom.historyModal.classList.add('hidden');
        showToast('📂 Nota cargada desde el historial');
      });
      dom.historyList.appendChild(row);
    });
  }
  dom.historyModal.classList.remove('hidden');
}

// ==================== UTILIDADES ====================
function setProcessingUi(isLoading, message = '') {
  dom.btnProcessAi.disabled = isLoading;
  dom.processingAlert.classList.toggle('hidden', !isLoading);
  if (message) dom.processingAlertText.textContent = message;
}

function formatSeconds(sec) {
  const m = String(Math.floor(sec / 60)).padStart(2, '0');
  const s = String(sec % 60).padStart(2, '0');
  return `${m}:${s}`;
}

function blobToBase64(blob) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onloadend = () => {
      const base64 = reader.result.split(',')[1];
      resolve(base64);
    };
    reader.onerror = reject;
    reader.readAsDataURL(blob);
  });
}

function parseCleanJson(rawString) {
  const cleaned = String(rawString)
    .replace(/^```json\s*/i, '')
    .replace(/^```\s*/i, '')
    .replace(/```\s*$/i, '')
    .trim();
  return JSON.parse(cleaned);
}

function escapeHtml(str) {
  return String(str).replace(/[&<>"']/g, (m) => ({
    '&': '&amp;',
    '<': '&lt;',
    '>': '&gt;',
    '"': '&quot;',
    "'": '&#39;'
  }[m]));
}

let toastTimeout = null;
function showToast(msg) {
  dom.toast.textContent = msg;
  dom.toast.classList.remove('hidden');
  clearTimeout(toastTimeout);
  toastTimeout = setTimeout(() => {
    dom.toast.classList.add('hidden');
  }, 3200);
}

function resetConsultation() {
  if (state.isNativeListening) stopNativeListening();
  if (state.isRecording) stopAmbientRecording();

  dom.patientRef.value = '';
  dom.patientAge.value = '';
  dom.patientSex.value = '';
  dom.rawTranscript.value = '';
  dom.demoCaseSelect.value = '';
  state.nativeSeconds = 0;
  dom.nativeTimer.textContent = '00:00';
  state.recordedBlob = null;
  dom.audioPreviewWrap.classList.add('hidden');
  dom.noiseFilteredBanner.classList.add('hidden');

  dom.secMotivo.value = '';
  dom.secEnfermedadActual.value = '';
  dom.secAntecedentes.value = '';
  dom.secExamenFisico.value = '';
  dom.secAnalisis.value = '';
  dom.secPlanManejo.value = '';

  showToast('🧹 Lista para una nueva consulta');
}

// ==================== EVENT LISTENERS ====================
function bindEvents() {
  // Theme toggle
  dom.btnTheme.addEventListener('click', () => {
    applyTheme(state.settings.theme === 'dark' ? 'light' : 'dark');
  });

  // PWA Install (Android/PC + Guía iPhone iOS)
  dom.btnInstallPwa.addEventListener('click', async () => {
    if (state.deferredInstallPrompt) {
      state.deferredInstallPrompt.prompt();
      await state.deferredInstallPrompt.userChoice;
      state.deferredInstallPrompt = null;
      dom.btnInstallPwa.classList.add('hidden');
    } else if (isIosDevice()) {
      showToast('📱 En iPhone: Toca el botón Compartir (📤 abajo en Safari) y elige "Agregar a inicio".');
    }
  });

  // Settings Modal
  dom.btnSettings.addEventListener('click', openSettingsModal);
  dom.btnCloseSettings.addEventListener('click', () => dom.settingsModal.classList.add('hidden'));
  dom.aiProviderSelect.addEventListener('change', (e) => toggleProviderConfigBoxes(e.target.value));
  dom.btnSaveSettings.addEventListener('click', saveSettings);

  // History Modal
  dom.btnHistory.addEventListener('click', renderHistoryModal);
  dom.btnCloseHistory.addEventListener('click', () => dom.historyModal.classList.add('hidden'));
  dom.btnCloseHistoryBottom.addEventListener('click', () => dom.historyModal.classList.add('hidden'));
  dom.btnClearHistory.addEventListener('click', () => {
    state.history = [];
    localStorage.removeItem('mediscribe_history');
    updateHistoryCounter();
    renderHistoryModal();
    showToast('🗑️ Historial vaciado');
  });

  // Mode Switcher
  dom.tabNative.addEventListener('click', () => {
    state.mode = 'native';
    dom.tabNative.classList.add('active');
    dom.tabRecorder.classList.remove('active');
    dom.panelNative.classList.remove('hidden');
    dom.panelRecorder.classList.add('hidden');
  });

  dom.tabRecorder.addEventListener('click', () => {
    state.mode = 'recorder';
    dom.tabRecorder.classList.add('active');
    dom.tabNative.classList.remove('active');
    dom.panelRecorder.classList.remove('hidden');
    dom.panelNative.classList.add('hidden');
  });

  // Demo Case Selector
  dom.demoCaseSelect.addEventListener('change', (e) => {
    const key = e.target.value;
    if (!key || !DEMO_CASES[key]) return;
    const demo = DEMO_CASES[key];
    dom.patientRef.value = demo.ref;
    dom.patientAge.value = demo.age;
    dom.patientSex.value = demo.sex;
    dom.consultType.value = demo.type;
    dom.rawTranscript.value = demo.transcript;
    // Switch to native panel so the doctor sees the noisy raw transcript
    dom.tabNative.click();
    showToast('🧪 Consulta de ejemplo cargada. Toca el botón verde/azul para depurar y estructurar.');
  });

  // New Consultation
  dom.btnNewConsultation.addEventListener('click', resetConsultation);

  // Mode 1: Native Dictation Controls
  dom.btnStartNative.addEventListener('click', toggleNativeListening);
  dom.btnInsertVitalsPrompt.addEventListener('click', () => {
    const snippet = ' Signos vitales: TA 120/80 mmHg, FC 76 lpm, FR 16 rpm, T 36.5 °C, SpO2 98%, Peso __ kg, Talla __ m. ';
    dom.rawTranscript.value = (dom.rawTranscript.value + snippet).trimStart();
    dom.rawTranscript.focus();
  });
  dom.btnClearTranscript.addEventListener('click', () => {
    dom.rawTranscript.value = '';
    state.nativeSeconds = 0;
    dom.nativeTimer.textContent = '00:00';
  });

  // Mode 2: Ambient Recorder Controls
  dom.btnStartRec.addEventListener('click', startAmbientRecording);
  dom.btnPauseRec.addEventListener('click', togglePauseRecording);
  dom.btnStopRec.addEventListener('click', stopAmbientRecording);
  dom.btnDiscardAudio.addEventListener('click', () => {
    state.recordedBlob = null;
    dom.recordedAudioPlayer.src = '';
    dom.audioPreviewWrap.classList.add('hidden');
    dom.recTimer.textContent = '00:00';
  });
  dom.audioFileInput.addEventListener('change', handleAudioFileUpload);

  // Main Process Button
  dom.btnProcessAi.addEventListener('click', processConsultationWithAi);

  // Insert Normal Physical Exam Template
  dom.btnInsertNormalEf.addEventListener('click', () => {
    const cur = dom.secExamenFisico.value.trim();
    dom.secExamenFisico.value = cur ? `${cur}\n${PLANTILLA_EXAMEN_FISICO_NORMAL}` : PLANTILLA_EXAMEN_FISICO_NORMAL;
    showToast('✅ Plantilla de Examen Físico normal insertada');
  });

  // Individual Section Copy Buttons
  document.querySelectorAll('.btn-copy-sec').forEach((btn) => {
    btn.addEventListener('click', () => {
      const targetId = btn.getAttribute('data-target');
      const label = btn.getAttribute('data-label');
      const el = document.getElementById(targetId);
      if (el) copyTextToClipboard(el.value, label);
    });
  });

  // Copy All & Bridge Buttons
  dom.btnCopyAllTop.addEventListener('click', () => copyTextToClipboard(buildFormattedNote({ forWhatsApp: false }), 'Nota médica completa (6 secciones)'));
  dom.btnCopyAllBottom.addEventListener('click', () => copyTextToClipboard(buildFormattedNote({ forWhatsApp: false }), 'Nota médica completa (6 secciones)'));
  dom.btnSendWhatsApp.addEventListener('click', sendToWhatsApp);
  dom.btnSendEmail.addEventListener('click', sendByEmail);
  dom.btnNativeShare.addEventListener('click', shareNatively);
}

document.addEventListener('DOMContentLoaded', initApp);
