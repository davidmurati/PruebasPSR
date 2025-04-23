import React, { useState, useEffect } from 'react';
import CryptoJS from 'crypto-js';
import './Fisica1.css';

const BiofluidosTest = () => {
  const [respuestas, setRespuestas] = useState({});
  const [respuestasDesarrollo, setRespuestasDesarrollo] = useState({});
  const [cedula, setCedula] = useState("");
  const [nombre, setNombre] = useState("");
  const [totalCorrectas, setTotalCorrectas] = useState(null);
  const [archivoCargado, setArchivoCargado] = useState(null);
  const [claveInput, setClaveInput] = useState("");
  const [mostrarResultados, setMostrarResultados] = useState(false);

  const preguntas = [
    {
      texto: "1. ¿Qué efecto tiene la disminución de la presión atmosférica en zonas de gran altitud (3000-4000 metros sobre el nivel del mar) en el proceso respiratorio?",
      opciones: [
        "Aumenta la diferencia de presión entre el exterior y el interior del cuerpo, facilitando la entrada de oxígeno",
        "Disminuye la diferencia de presión entre el exterior y el interior del cuerpo, dificultando la entrada de oxígeno",
        "No afecta la diferencia de presión, pero aumenta el coeficiente de difusión del oxígeno",
        "Aumenta la presión parcial de oxígeno en los alvéolos"
      ],
      respuestaCorrecta: 1,
    },
    {
      texto: "2. Las válvulas cardíacas:",
      opciones: [
        "Están diseñadas para permitir el flujo en ambas direcciones",
        "Funcionan independientemente de las diferencias de presión",
        "Están diseñadas para permitir el flujo en una sola dirección",
        "No presentan resistencia al flujo sanguíneo"
      ],
      respuestaCorrecta: 2,
    },
    {
      texto: "3. Durante la contracción ventricular izquierda (sístole):",
      opciones: [
        "La válvula aórtica permanece cerrada",
        "La presión ventricular debe superar la presión aórtica para que se abra la válvula",
        "El flujo sanguíneo en la aorta es laminar en todas las condiciones",
        "La válvula mitral permanece abierta"
      ],
      respuestaCorrecta: 1,
    },
    {
      texto: "4. En el sistema circulatorio, el régimen de flujo laminar:",
      opciones: [
        "Es más eficiente energéticamente que el flujo turbulento",
        "Ocurre típicamente en los procesos de alta energía",
        "Puede producirse en la aorta durante la eyección ventricular",
        "Generan ruidos audibles mediante auscultación"
      ],
      respuestaCorrecta: 0,
    },
    {
      texto: "5. Un fisiólogo cardiovascular estudia la influencia de la tensión superficial en la microcirculación. Como parte de su investigación, modela un capilar sanguíneo como un tubo cilíndrico con diámetro interno de 0.008 mm. Si la sangre tiene una tensión superficial de 0.058 N/m a temperatura corporal (37°C), densidad de 1060 kg/m³, y el ángulo de contacto entre la sangre y el endotelio vascular es de 30°, ¿cuál sería la altura teórica que alcanzaría la sangre en este capilar si solo actuara la fuerza de capilaridad?",
      opciones: [
        "1,25 m",
        "3,20 m",
        "4,75 m",
        "5,65 m"
      ],
      respuestaCorrecta: 1,
    },
    {
      texto: "6. Un paciente hospitalizado está recibiendo un suero por vía intravenosa. El recipiente del suero está colocado a una altura h con respecto al punto de inserción en el brazo del paciente. Si al suero se le coloca un medicamento que aumenta su densidad. ¿Cómo influye en el caudal de salida del fluido?",
      opciones: [
        "Aumenta",
        "Disminuye",
        "No cambia",
        "Depende de la apertura de salida"
      ],
      respuestaCorrecta: 0,
    },
    {
      texto: "7. ¿Cuál de las siguientes opciones describe correctamente el comportamiento reológico de la sangre?",
      opciones: [
        "Fluido newtoniano: la viscosidad permanece constante independientemente de la tasa de cizallamiento",
        "Fluido pseudoplástico: la viscosidad disminuye conforme aumenta la tasa de cizallamiento",
        "Fluido dilatante: la viscosidad aumenta conforme aumenta la tasa de cizallamiento",
        "Fluido de Bingham: requiere un esfuerzo cortante mínimo para comenzar a fluir, después del cual se comporta como fluido newtoniano"
      ],
      respuestaCorrecta: 1,
    },
    {
      texto: "8. La tensión superficial en los alvéolos pulmonares:",
      opciones: [
        "Aumenta gracias a la acción del surfactante pulmonar",
        "Disminuye gracias a la acción del surfactante pulmonar",
        "No afecta el trabajo respiratorio",
        "Es mayor en los alvéolos de menor radio"
      ],
      respuestaCorrecta: 1,
    },
    {
      texto: "9. Al evaluar la ramificación de una arteria se observa que el flujo másico de entrada es de 3 L/min y el de salida en una de las ramificaciones es de 1 L/min. ¿Cuánto es el flujo másico m3?",
      opciones: [
        "1 L/min",
        "5 L/min",
        "0,7 L/min",
        "2 L/min"
      ],
      respuestaCorrecta: 3,
    },
    {
      texto: "10. La ley de Poiseuille establece que la resistencia al flujo en un vaso sanguíneo:",
      opciones: [
        "Es inversamente proporcional al radio elevado a la cuarta potencia",
        "Es inversamente proporcional al radio elevado a la primera potencia",
        "Es directamente proporcional al radio del vaso",
        "No depende de la longitud del vaso"
      ],
      respuestaCorrecta: 0,
    },
    {
        texto: "11. La tensión superficial en los alvéolos pulmonares:",
        opciones: [
          "Aumenta gracias a la acción del surfactante pulmonar",
          "Disminuye gracias a la acción del surfactante pulmonar",
          "No afecta el trabajo respiratorio",
          "Es mayor en los alvéolos de menor radio"
        ],
        respuestaCorrecta: 1,
      }
  ];

  const preguntasDesarrollo = [
    {
      id: "desarrollo1",
      texto: "Un estudiante de fisiología utiliza un espirómetro de disco para medir su capacidad pulmonar. El dispositivo consiste en una cámara cilíndrica sellada con un disco móvil de masa 300 g y área de 50 cm² que se eleva cuando el estudiante exhala a través de un tubo conectado a la cámara. Durante una espiración forzada, el estudiante logra elevar el disco a una altura máxima de 15 cm de una altura inicial de 5 cm. ¿Cuál es la presión en mmHg espiratoria máxima generada por el estudiante y el Volumen en L?",
      respuestaCorrecta: "764,5 mmHg y 0,75 L",
      puntaje: 2
    },
    {
      id: "desarrollo2",
      texto: "Un fisiólogo estudia las adaptaciones cardiovasculares durante diferentes niveles de actividad física. Durante una prueba, registra los siguientes datos hemodinámicos en un sujeto: Diámetro de la arteria aorta: 7 mm, Presión en punto proximal (P₁): 130 mmHg, Presión en punto distal (P₂): 100 mmHg (después de un segmento de 0,5 m), Viscosidad sanguínea: 0,004 N·s/m², Frecuencia cardíaca: 80 latidos/min. ¿Cuál es el valor correcto del volumen sistólico en mL/latidos, la conclusión sobre el estado de actividad física del sujeto, y un mecanismo fisiológico válido de regulación del gasto cardíaco?",
      respuestaCorrecta: "Volumen sistólico: 88 mL/latido, Estado: Reposo, Mecanismo: Aumento de la contractilidad miocárdica por estimulación simpática",
      puntaje: 2
    },
    {
      id: "desarrollo3",
      texto: "Un cardiólogo intervencionista estudia la mecánica de las arterias coronarias en un paciente con enfermedad arterial coronaria. Se analiza una arteria coronaria con un diámetro interno de 25 mm que ha experimentado un espasmo vascular. P=90 mmHg. ¿Cuál es la fuerza en N necesaria para abrir esta arteria y que pasa si una arteria se obstruye parcialmente?",
      respuestaCorrecta: "Fuerza: 5,87 N",
      puntaje: 2
    },
    {
      id: "desarrollo4",
      texto: "Superficie total de la membrana alveolocapilar: 70 m², Coeficiente de difusión del oxígeno (D): 1,7×10⁻9 m²/s, Espesor de la membrana (x): 0,6 μm, Presión parcial de O₂ en alvéolos (PA): 100 mmHg, Presión parcial de O₂ en sangre capilar (Pc): 40 mmHg Solubilidad O2 1,3×10⁻7 mol/m3Pa. ¿Cuál es la cantidad de oxígeno transferida por difusión a través de la membrana en mL/min según la Ley de Fick, y cómo se vería afectada si el paciente desarrollara edema pulmonar?",
      respuestaCorrecta: "305 mL/min",
      puntaje: 2
    },
    {
      id: "desarrollo5",
      texto: "Un especialista en medicina vascular estudia el impacto de la posición corporal sobre la distribución de presiones en el sistema circulatorio. Examina a un paciente de 1,9 metros de altura en posición erecta, cuyo corazón está situado a 1,35 metros desde el suelo. ¿Cuánto vale la presión en el pie en mmHg? (Considere la densidad de la sangre como 1055 kg/m³ y la aceleración gravitacional como 10 m/s²)",
      respuestaCorrecta: "Diferencia corazón-pies: 107 mmHg",
      puntaje: 2
    },
    
  ];

  const handleSeleccionRespuesta = (index, opcionIndex) => {
    setRespuestas({
      ...respuestas,
      [index]: opcionIndex
    });
  };

  const handleRespuestaDesarrollo = (id, texto) => {
    setRespuestasDesarrollo({
      ...respuestasDesarrollo,
      [id]: texto
    });
  };

  // Función para comparar respuestas de desarrollo con un margen de error del 2%
  const esRespuestaDesarrolloCorrecta = (respuestaUsuario, respuestaCorrecta) => {
    // Primero verificamos si la respuesta contiene números
    const numerosEnRespuestaCorrecta = respuestaCorrecta.match(/\d+(\.\d+)?/g);
    
    if (!numerosEnRespuestaCorrecta) {
      // Si no hay números, comparamos texto directamente (case insensitive)
      return respuestaUsuario.toLowerCase().includes(respuestaCorrecta.toLowerCase());
    }
    
    // Si hay números, buscamos esos mismos números en la respuesta del usuario
    for (const numero of numerosEnRespuestaCorrecta) {
      const valorNumerico = parseFloat(numero);
      const margenError = valorNumerico * 0.02; // 2% de margen de error
      
      // Buscamos números en la respuesta del usuario
      const numerosEnRespuestaUsuario = respuestaUsuario.match(/\d+(\.\d+)?/g);
      
      if (!numerosEnRespuestaUsuario) {
        return false; // No hay números en la respuesta del usuario
      }
      
      // Verificamos si algún número en la respuesta del usuario está dentro del margen de error
      let numeroEncontradoEnMargen = false;
      for (const numUsuario of numerosEnRespuestaUsuario) {
        const valorUsuario = parseFloat(numUsuario);
        if (Math.abs(valorUsuario - valorNumerico) <= margenError) {
          numeroEncontradoEnMargen = true;
          break;
        }
      }
      
      if (!numeroEncontradoEnMargen) {
        return false; // No se encontró un número dentro del margen de error
      }
    }
    
    // Si llegamos aquí, todos los números están dentro del margen de error
    return true;
  };

  const calcularResultados = () => {
    if (!cedula.trim() || !nombre.trim()) {
      alert("Por favor, ingrese su cédula y nombre para finalizar el test.");
      return;
    }

    // Calcular puntos por preguntas de opción múltiple (1 punto cada una)
    const correctasOpcionMultiple = preguntas.reduce((acc, pregunta, index) => {
      if (respuestas[index] === pregunta.respuestaCorrecta) {
        return acc + 1;
      }
      return acc;
    }, 0);
    
    // Calcular puntos por preguntas de desarrollo (2 puntos cada una)
    const puntosDesarrollo = preguntasDesarrollo.reduce((acc, pregunta) => {
      const respuestaUsuario = respuestasDesarrollo[pregunta.id] || '';
      if (esRespuestaDesarrolloCorrecta(respuestaUsuario, pregunta.respuestaCorrecta)) {
        return acc + pregunta.puntaje;
      }
      return acc;
    }, 0);
    
    // Total de puntos
    const totalPuntos = correctasOpcionMultiple + puntosDesarrollo;
    
    setTotalCorrectas(totalPuntos);
    setMostrarResultados(true);

    // Crear resumen de respuestas de opción múltiple
    const resumenOpciones = preguntas.map((pregunta, index) => {
      const respuestaUsuario = respuestas[index] !== undefined ? respuestas[index] : 'No respondida';
      const esCorrecta = respuestaUsuario === pregunta.respuestaCorrecta ? "✓ CORRECTA" : "✗ INCORRECTA";
      return `${pregunta.texto}\nRespuesta seleccionada: ${respuestaUsuario !== 'No respondida' ? pregunta.opciones[respuestaUsuario] : 'No respondida'}\nEvaluación: ${esCorrecta}\n`;
    }).join('\n');

    // Crear resumen de respuestas de desarrollo
    const resumenDesarrollo = preguntasDesarrollo.map((pregunta) => {
      const respuestaUsuario = respuestasDesarrollo[pregunta.id] || 'No respondida';
      const esCorrecta = esRespuestaDesarrolloCorrecta(respuestaUsuario, pregunta.respuestaCorrecta) ? 
        `✓ CORRECTA (${pregunta.puntaje} puntos)` : "✗ INCORRECTA (0 puntos)";
      return `${pregunta.texto}\nRespuesta: ${respuestaUsuario}\nRespuesta correcta: ${pregunta.respuestaCorrecta}\nEvaluación: ${esCorrecta}\n`;
    }).join('\n');

    // Calcular puntaje total y porcentaje
    const puntajeMaximo = preguntas.length + preguntasDesarrollo.reduce((acc, p) => acc + p.puntaje, 0);
    const porcentaje = ((totalPuntos / puntajeMaximo) * 100).toFixed(2);

    const mensaje = `Resultados del TEST DE BIOFLUIDOS:

Nombre: ${nombre}
Cédula: ${cedula}
Puntos de opción múltiple: ${correctasOpcionMultiple} de ${preguntas.length}
Puntos de desarrollo: ${puntosDesarrollo} de ${preguntasDesarrollo.reduce((acc, p) => acc + p.puntaje, 0)}
Puntaje total: ${totalPuntos} de ${puntajeMaximo}
Porcentaje de acierto: ${porcentaje}%

RESPUESTAS DE OPCIÓN MÚLTIPLE:
${resumenOpciones}

RESPUESTAS DE DESARROLLO:
${resumenDesarrollo}
`;

    descargarArchivo(mensaje);
  };

  const descargarArchivo = (contenido) => {
    const clave = "Muratibiofluidos2025"; // Clave para encriptar
    const contenidoEncriptado = CryptoJS.AES.encrypt(contenido, clave).toString();
    const blob = new Blob([contenidoEncriptado], { type: 'text/plain;charset=utf-8' });
    const enlace = document.createElement('a');
    enlace.href = URL.createObjectURL(blob);
    enlace.download = `Test_Biofluidos_${cedula}.txt`;
    enlace.click();
  };

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      setArchivoCargado(file);
    }
  };

  const handleClaveChange = (event) => {
    setClaveInput(event.target.value);
  };

  const desencriptarArchivo = () => {
    if (!archivoCargado) {
      alert("Por favor, seleccione un archivo.");
      return;
    }
  
    const clave = claveInput || "BioFluidos2025";
    const reader = new FileReader();
    reader.onload = (event) => {
      const contenidoEncriptado = event.target.result;
      try {
        const bytes = CryptoJS.AES.decrypt(contenidoEncriptado, clave);
        const originalText = bytes.toString(CryptoJS.enc.Utf8);
  
        // Mostrar el resultado en pantalla
        alert("Contenido desencriptado:\n" + originalText);
  
        // Descargar el archivo desencriptado como .txt
        const blob = new Blob([originalText], { type: 'text/plain;charset=utf-8' });
        const enlace = document.createElement('a');
        enlace.href = URL.createObjectURL(blob);
        enlace.download = `Resultados_Desencriptados.txt`;
        enlace.click();
      } catch (error) {
        alert("Clave incorrecta o archivo dañado.");
      }
    };
    reader.readAsText(archivoCargado);
  };

  const [progressWidth, setProgressWidth] = useState(0);
  
  // Calcular el progreso del test
  useEffect(() => {
    const totalPreguntas = preguntas.length + preguntasDesarrollo.length;
    const preguntasRespondidas = Object.keys(respuestas).length + Object.keys(respuestasDesarrollo).length;
    const progreso = (preguntasRespondidas / totalPreguntas) * 100;
    setProgressWidth(progreso);
  }, [respuestas, respuestasDesarrollo]);

  return (
    <div className="biomechanica-container">
      <header className="header-container">
        <div className="floating-icon">
          <span className="brain-icon">🧠</span>
        </div>
        <h1 className="main-title">TEST DE BIOFLUIDOS</h1>
        <p className="subtitle">Complete el test y responda todas las preguntas. Al finalizar, se generará un archivo con sus respuestas para evaluación.</p>
        
        <div className="progress-container">
          <div className="progress-bar" style={{ width: `${progressWidth}%` }}></div>
        </div>
      </header>

      <form>
        <section className="section section-personal">
          <h2 className="section-title">Información Personal</h2>
          <div className="input-group">
            <label htmlFor="nombre" className="input-label">Nombre Completo:</label>
            <input
              type="text"
              id="nombre"
              value={nombre}
              onChange={(e) => setNombre(e.target.value)}
              className="text-input"
              required
            />
          </div>
          <div className="input-group">
            <label htmlFor="cedula" className="input-label">Cédula/Documento de Identidad:</label>
            <input
              type="text"
              id="cedula"
              value={cedula}
              onChange={(e) => setCedula(e.target.value)}
              className="text-input"
              required
            />
          </div>
        </section>

        <section className="section section-multiple">
          <h2 className="section-title">Parte 1: Preguntas de Opción Múltiple</h2>
          
          {preguntas.map((pregunta, index) => (
            <div key={index} className="question-card">
              <p className="question-text">{pregunta.texto}</p>
              <div className="options-group">
                {pregunta.opciones.map((opcion, opcionIndex) => (
                  <label key={opcionIndex} className="option-label">
                    <input
                      type="radio"
                      name={`pregunta${index}`}
                      checked={respuestas[index] === opcionIndex}
                      onChange={() => handleSeleccionRespuesta(index, opcionIndex)}
                      className="option-input"
                    />
                    {opcion}
                  </label>
                ))}
              </div>
            </div>
          ))}
        </section>

        <section className="section section-development">
          <h2 className="section-title">Parte 2: Preguntas de Desarrollo</h2>
          <p className="tip-text">Para las siguientes preguntas, proporcione una respuesta detallada. Las respuestas numéricas tienen un margen de error aceptable del 2%.</p>
          
          {preguntasDesarrollo.map((pregunta, index) => (
            <div key={index} className="development-question">
              <p className="question-text">{pregunta.texto}</p>
              <textarea
                value={respuestasDesarrollo[pregunta.id] || ''}
                onChange={(e) => handleRespuestaDesarrollo(pregunta.id, e.target.value)}
                className="textarea"
                placeholder="Escriba su respuesta aquí..."
              />
            </div>
          ))}
        </section>
      </form>

      <div className="button-container">
        <button
          onClick={calcularResultados}
          className="submit-button"
        >
          Finalizar Test
        </button>
      </div>

      {mostrarResultados && (
        <div className="results-container">
          <h2 className="results-title">¡Test Completado!</h2>
          <p className="results-text">Gracias por completar el Test de Biofluidos.</p>
          <p className="results-text">Se ha generado un archivo con sus respuestas para su evaluación.</p>
        </div>
      )}

      <section className="section section-decrypt">
        <h2 className="section-title">Herramienta de Desencriptación</h2>
        <p className="results-text">Si ya tiene un archivo de resultados encriptado, puede cargarlo y desencriptarlo aquí:</p>
        
        <div className="input-group">
          <input 
            type="file" 
            onChange={handleFileChange} 
            accept=".txt"
            className="file-input"
          />
          
          <input
            type="text"
            placeholder="Ingrese la clave de desencriptación"
            value={claveInput}
            onChange={handleClaveChange}
            className="text-input"
          />
          
          <button
            onClick={desencriptarArchivo}
            className="decrypt-button"
          >
            Desencriptar Archivo
          </button>
        </div>
      </section>
    </div>
  );
};

export default BiofluidosTest;