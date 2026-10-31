# 🩺 MediScribe AI — Asistente de Consulta para Medicina General

Aplicación Web Progresiva (**PWA Mobile-First**) diseñada para escuchar o transcribir la consulta entre médico y paciente desde el celular, **filtrar automáticamente toda la conversación irrelevante** (saludos, charla sobre el clima, familiares, muletillas) y redactar con terminología médica técnica las **6 secciones de la Historia Clínica**, listas para enviar en 1 clic a **WhatsApp Web** o **Correo** en el computador del consultorio.

---

## 📋 Estructura Médica Generada (6 Secciones)

1. **Motivo de la consulta:** Síntoma cardinal o razón principal de la visita.
2. **Enfermedad Actual:** Relato cronológico y semiológico (evolución, localización, carácter, intensidad, agravantes/atenuantes y síntomas asociados).
3. **Antecedentes:** Clasificados en Patológicos, Farmacológicos, Alérgicos, Quirúrgicos, Familiares y Ginecoobstétricos.
4. **Examen físico:** Signos vitales + hallazgos positivos mencionados en consulta + opción de completar sistemas no explorados con plantilla de Examen Físico normal.
5. **Análisis:** Integra de forma lógica los **4 ítems anteriores** (*Motivo + Enfermedad Actual + Antecedentes + Examen físico*), sustenta el juicio clínico, sugiere **Impresión Diagnóstica con código CIE-10** y orienta hacia el plan de manejo.
6. **Plan de manejo:** Formulación farmacológica (medicamento, concentración, vía, dosis, frecuencia, duración), órdenes médicas/paraclínicos, recomendaciones, incapacidad y signos de alarma.

---

## 🎙️ Modos de Captura de Voz

* **Modo 1: Dictado Nativo / Teclado (`Web Speech API` + Micrófono del Celular):**
  * 100% gratuito y en tiempo real.
  * Incluye reconexión automática ante pausas durante el examen físico.
  * También permite tocar el cuadro de texto y usar el micrófono nativo del teclado de Android (Gboard) o iPhone (iOS).
* **Modo 2: Grabadora de Consulta Ambiente con IA (`MediaRecorder` + Subida de Audio):**
  * Graba la conversación completa con el celular sobre el escritorio (con Pausa/Reanudar) o permite subir un audio grabado en el teléfono / WhatsApp.
  * Envía el audio directamente a **Google Gemini Flash** o **Groq Whisper-Large-v3 + Llama 3.3 70B**.

---

## 🚀 Cómo Usarla

### En el computador (Local):
Abre directamente el archivo [`index.html`](./index.html) en Google Chrome o Microsoft Edge, o levanta un servidor local:
```powershell
python -m http.server 8080
```
Luego abre `http://localhost:8080`.

### En el celular (Instalable como App PWA):
Para que el micrófono funcione en el celular desde cualquier consultorio con `HTTPS`, puedes subir esta carpeta gratis en 1 minuto a:
- **Netlify Drop:** Arrastra la carpeta `Notas_Consulta_Medica` a [app.netlify.com/drop](https://app.netlify.com/drop).
- **GitHub Pages / Vercel:** Sube los archivos a un repositorio de GitHub y activa GitHub Pages.
- Una vez abierta en Chrome (Android) o Safari (iPhone), selecciona **"Agregar a la pantalla de inicio"** para instalarla como aplicación nativa.

