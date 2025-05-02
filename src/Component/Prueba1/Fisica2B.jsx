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
    texto: "1. ¿Por qué una persona buceando no puede descender bruscamente 10 m bajo el nivel del mar?",
    opciones: [
      "Disminuye la diferencia de presión entre el exterior y el interior del cuerpo, impidiendo la respiración",
      "Disminuye la diferencia de presión entre el exterior y el interior del cuerpo, dificultando la entrada de oxígeno",
      "No afecta la diferencia de presión, pero aumenta el coeficiente de difusión del oxígeno",
      "Puede sufrir hemorragias y daños en el tímpano debido al cambio de presión"
    ],
    respuestaCorrecta: 3
  },
  {
    texto: "2. Un daño en las válvulas de las venas causaría:",
    opciones: [
      "aumento del flujo sanguíneo",
      "Funcionan independientemente de las diferencias de presión",
      "acumulación inadecuada de sangre en las venas",
      "permite el paso d flujo sanguíneo más rápido al corazón"
    ],
    respuestaCorrecta: 2
  },
  {
    texto: "3. Durante la relajación ventricular izquierda (Parte de la Diástole):",
    opciones: [
      "La válvula aórtica permanece cerrada",
      "La presión ventricular debe superar la presión aórtica para que se abra la válvula",
      "El flujo sanguíneo en la aorta es laminar en todas las condiciones",
      "La válvula mitral permanece abierta"
    ],
    respuestaCorrecta: 0
  },
  {
    texto: "4. En el sistema circulatorio, el régimen de flujo turbulento:",
    opciones: [
      "Es más eficiente energéticamente que el flujo laminar",
      "Ocurre típicamente en los capilares",
      "Puede producirse en la aorta durante la eyección ventricular",
      "No genera ruidos audibles mediante auscultación"
    ],
    respuestaCorrecta: 2
  },
  {
    texto: "5. Un especialista estudia las alteraciones de la mecánica respiratoria en pacientes con fibrosis quística. Analiza un bronquiolo respiratorio con las siguientes características: Segmento 1 (proximal): diámetro D₁ = 0,5 mm, longitud L₁ = 3 mm. Segmento 2 (obstrucción mucosa): diámetro D₂ = 0,25 mm, longitud L₂ = 2 mm. La presión en la entrada del bronquiolo es P₁ = -757 mmHg durante la inspiración, la densidad del aire es ρ = 1,225 kg/m³ y la velocidad en la entrada es v₁ = 0,5 m/s. La viscosidad del aire es η = 1,92×10⁻⁵ Pa·s. ¿Cuál de las siguientes opciones contiene los valores correctos para velocidad en el segmento obstruido, caudal de aire y la principal consecuencia fisiopatológica de esta alteración?",
    opciones: [
      "Velocidad en segmento 2: 2,0 m/s, Caudal: 9,82×10⁻12 m³/s, Consecuencia: Hipotermia",
      "Velocidad en segmento 2: 4,0 m/s, Caudal: 9,82×10⁻8 m³/s, Consecuencia: Hipoxemia",
      "Velocidad en segmento 2: 2,0 m/s, Caudal: 9,82×10⁻11 m³/s, Consecuencia: Hipoxemia",
      "Velocidad en segmento 2: 1,0 m/s, Caudal: 1,96×10⁻7 m³/s, Consecuencia: Aumento del espacio muerto fisiológico"
    ],
    respuestaCorrecta: 2
  },
  {
    texto: "6. Un paciente hospitalizado está recibiendo un suero por vía intravenosa. El recipiente del suero está colocado a una altura h con respecto al punto de inserción en el brazo del paciente. Si al suero se le coloca un medicamento que aumenta su densidad. ¿Cómo influye en el caudal de salida del fluido?",
    opciones: [
      "Aumenta",
      "Disminuye",
      "No cambia",
      "Depende de la apertura de salida"
    ],
    respuestaCorrecta: 0
  },
  {
    texto: "7. ¿Cuál de las siguientes opciones describe correctamente el comportamiento reológico del plasma sanguíneo?",
    opciones: [
      "Fluido newtoniano: la viscosidad permanece constante independientemente de la tasa de cizallamiento",
      "Fluido pseudoplástico: la viscosidad disminuye conforme aumenta la tasa de cizallamiento",
      "Fluido dilatante: la viscosidad aumenta conforme aumenta la tasa de cizallamiento",
      "Fluido de Bingham: requiere un esfuerzo cortante mínimo para comenzar a fluir, después del cual se comporta como fluido newtoniano"
    ],
    respuestaCorrecta: 0
  },
  {
    texto: "8. Al evaluar la ramificación de una arteria se observa que el CAUDAL de entrada es de 4 L/min y el de salida en una de las ramificaciones es de 1 L/min. ¿Cuánto es el flujo masico m3 si la densidad es 1,225 Kg/m3?",
    opciones: [
      "3 L/min",
      "0,00007 Kg/s",
      "0,00006 Kg/s",
      "0,00008 Kg/s"
    ],
    respuestaCorrecta: 2
  },
  {
    texto: "9. ¿Cuál de las siguientes opciones describe correctamente el mecanismo de Frank-Starling, su base molecular y su importancia fisiológica?",
    opciones: [
      "Aumento de la frecuencia cardíaca en respuesta al estiramiento de las fibras miocárdicas, basado en la activación de canales iónicos mecano sensibles en el nodo sinoauricular",
      "Mayor respuesta a catecolaminas cuando el ventrículo está dilatado, debido a un aumento en la sensibilidad de los receptores beta-adrenérgicos",
      "Mayor fuerza de contracción cuando aumenta el volumen telediastólico, basado en el óptimo solapamiento de filamentos de actina y miosina",
      "Disminución del inotropismo cardíaco cuando aumenta la precarga, para proteger al miocardio de la sobrecarga de volumen"
    ],
    respuestaCorrecta: 2
  },
  {
    texto: "10. Si a un asmático se le suministra un medicamento broncoconstrictor qué consecuencia puede tener:",
    opciones: [
      "La ventilación pulmonar aumenta",
      "Puede sufrir de hipoxia",
      "No cambia el caudal de aire",
      "Puede sufrir un edema pulmonar"
    ],
    respuestaCorrecta: 1
  },
  {
    texto: "11. La tensión superficial en los alvéolos pulmonares:",
    opciones: [
      "Aumenta gracias a la acción del surfactante pulmonar",
      "Disminuye gracias a la acción del surfactante pulmonar",
      "No afecta el trabajo respiratorio",
      "Para una misma presión es mayor en los alvéolos de menor radio"
    ],
    respuestaCorrecta: 1
  }
];

const preguntasDesarrollo = [
  {
    id: "desarrollo1",
    texto: "¿Cuánta energía aproximadamente utiliza el corazón en 70 latidos si sabe que la presión Pa media es de 100 mmHg, el volumen es de 70 ml, La Pa media del ventrículo izquierdo es de 15 mmHg, la masa de 70 g y la velocidad del flujo es de 0,5 m/s? Ten en cuenta que 80% de la energía usada para bombear la sangre se transforma en calor.",
    respuestaCorrecta: "37,8 J/min",
    puntaje: 2
  },
  {
    id: "desarrollo2",
    texto: "Un fisiólogo estudia las adaptaciones cardiovasculares durante diferentes niveles de actividad física. Durante una prueba, registra los siguientes datos hemodinámicos en un sujeto: Diámetro de la arteria aorta: 6 mm, Presión en punto proximal (P₁): 100 mmHg, Presión en punto distal (P₂): 99,9 mmHg (después de un segmento de 0,05 m), Viscosidad sanguínea: 0,004 N·s/m², Frecuencia cardíaca: 60 latidos/min. ¿Cuál es el valor correcto del volumen sistólico, la conclusión sobre el estado de actividad física del sujeto, y un mecanismo fisiológico válido de regulación del gasto cardíaco en mL/latidos?",
    respuestaCorrecta: "Volumen sistólico: 65,2 mL/latido, Estado: Reposo, Mecanismo: Aumento de la contractilidad miocárdica por estimulación simpática",
    puntaje: 2
  },
  {
    id: "desarrollo3",
    texto: "Si una persona desciende 20 m bajo el nivel del mar ¿Cuál es la fuerza necesaria que compensar el oído para que el tímpano no se vea afectado sabiendo que el área es de 0,012 m?",
    respuestaCorrecta: "Fuerza: 90,4 N",
    puntaje: 2
  },
  {
    id: "desarrollo4",
    texto: "Un estudiante de medicina estudia la difusión de sodio en el túbulo contorneado proximal del riñón. Obtiene los siguientes datos: Concentración de sodio en el lumen tubular: 140 mmol/L, Concentración de sodio en las células tubulares: 15 mmol/L, Permeabilidad de la membrana al sodio: 5×10⁻⁶ cm/s, Área de superficie de un segmento tubular: 0,2 cm², Tiempo de medición: 1 segundo. ¿Cuánto es el flujo de sodio por difusión simple a través de la membrana tubular en mol/s con 9 decimales y expresándolo sin notación científica, su dirección y la importancia fisiológica de este proceso?",
    respuestaCorrecta: "Flujo de sodio: 0,000000125 mol/s, Dirección: desde el lumen hacia las células tubulares, Importancia: reabsorción de sodio fundamental para el balance hidroelectrolítico",
    puntaje: 2
  },
  {
    id: "desarrollo5",
    texto: "Se quiere estudiar el impacto de la posición corporal sobre la distribución de presiones en el sistema circulatorio. Para ello se examina a un paciente de 1,9 metros de altura en posición erecta, cuyo corazón está situado a 1,35 metros desde el suelo. ¿Cuánto vale la presión en la cabeza en mmHg? (Considere la densidad de la sangre como 1055 kg/m³ y la aceleración gravitacional como 10 m/s²)",
    respuestaCorrecta: "Diferencia corazón-cabeza: -43 mmHg",
    puntaje: 2
  }
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
    // Verificamos si la respuesta correcta contiene números con signo negativo
    const numerosConSignoEnRespuestaCorrecta = respuestaCorrecta.match(/[-+]?\d+(\.\d+)?/g);
    
    if (!numerosConSignoEnRespuestaCorrecta) {
      // Si no hay números, comparamos texto directamente (case insensitive)
      return respuestaUsuario.toLowerCase().includes(respuestaCorrecta.toLowerCase());
    }
    
    // Si hay números, buscamos esos mismos números CON SU SIGNO en la respuesta del usuario
    for (const numero of numerosConSignoEnRespuestaCorrecta) {
      const valorNumerico = parseFloat(numero);
      const margenError = Math.abs(valorNumerico * 0.02); // 2% de margen de error (valor absoluto)
      
      // Buscamos números (incluyendo signos) en la respuesta del usuario
      const numerosConSignoEnRespuestaUsuario = respuestaUsuario.match(/[-+]?\d+(\.\d+)?/g);
      
      if (!numerosConSignoEnRespuestaUsuario) {
        return false; // No hay números en la respuesta del usuario
      }
      
      // Verificamos si algún número en la respuesta del usuario está dentro del margen de error
      // Y ADEMÁS tiene el mismo signo
      let numeroEncontradoEnMargen = false;
      for (const numUsuario of numerosConSignoEnRespuestaUsuario) {
        const valorUsuario = parseFloat(numUsuario);
        
        // Verificamos si tienen el mismo signo o ambos son cero
        const mismoSigno = 
          (valorNumerico > 0 && valorUsuario > 0) || 
          (valorNumerico < 0 && valorUsuario < 0) || 
          (valorNumerico === 0 && valorUsuario === 0);
        
        // Si tienen el mismo signo y están dentro del margen de error
        if (mismoSigno && Math.abs(valorUsuario - valorNumerico) <= margenError) {
          numeroEncontradoEnMargen = true;
          break;
        }
      }
      
      if (!numeroEncontradoEnMargen) {
        return false; // No se encontró un número con el mismo signo y dentro del margen de error
      }
    }
    
    // Si llegamos aquí, todos los números con sus signos están dentro del margen de error
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
          <p className="tip-text">Para las siguientes preguntas, proporcione una respuesta detallada. Las respuestas numéricas deben reportarse con un decimal de exactitud.</p>
          
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