import React, { useState, useEffect } from 'react';
import CryptoJS from 'crypto-js';
import './Fisica1.css';

const BiomechanicaTest = () => {
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
      texto: "1. ¿Cuál es la principal diferencia entre tendones y ligamentos en el cuerpo humano?",
      opciones: [
        "Los tendones no son elásticos",
        "Los tendones unen músculo con hueso mientras que los ligamentos unen hueso con hueso",
        "Los tendones se encuentran principalmente en las extremidades superiores",
        "Los ligamentos están compuestos principalmente por elastina"
      ],
      respuestaCorrecta: 1,
    },
    {
      texto: "2. En la biomecánica del músculo, ¿qué determina la fuerza máxima que puede generar un músculo?",
      opciones: [
        "La longitud de las fibras musculares",
        "El ángulo de penación",
        "El área de sección transversal fisiológica",
        "La velocidad de contracción"
      ],
      respuestaCorrecta: 2,
    },
    {
      texto: "3. Una paciente de 68 años con osteoporosis posmenopáusica avanzada presenta una disminución significativa de la densidad mineral ósea en su fémur proximal. Las imágenes de densitometría ósea muestran que la sección transversal efectiva del cuello femoral ha disminuido a un tercio de su valor normal debido a la pérdida de masa ósea. Si esta paciente aplica la misma fuerza sobre la cadera al caminar que una persona con densidad ósea normal, el esfuerzo aplicado en el área debilitada será:",
      opciones: [
        "El triple",
        "Un tercio",
        "No cambia",
        "El doble"
      ],
      respuestaCorrecta: 0,
    },
    {
      texto: "4. ¿Qué tipo de esfuerzo soportan peor los huesos?",
      opciones: [
        "Compresión",
        "Tensión",
        "Torsión",
        "Flexión"
      ],
      respuestaCorrecta: 3,
    },
    {
      texto: "5. Un paciente con esguince en el tendón muestra una deformación permanente del tejido ¿En qué región de la curva esfuerzo-deformación se encuentra esta lesión?",
      opciones: [
        "Región basal",
        "Región lineal o elástica",
        "Región de falla progresiva o plástica",
        "Punto de falla total"
      ],
      respuestaCorrecta: 2,
    },
    {
      texto: "6. En un músculo peniforme con ángulo de penación de 30°, ¿qué porcentaje de la fuerza muscular contribuye directamente a la fuerza de contracción?",
      opciones: [
        "100%",
        "87%",
        "56%",
        "34%"
      ],
      respuestaCorrecta: 1,
    },
    {
      texto: "7. La propiedad del hueso que hace que su comportamiento mecánico varíe según la dirección de la carga aplicada se denomina:",
      opciones: [
        "Viscoelasticidad",
        "Anisotropía",
        "Ductilidad",
        "Porosidad"
      ],
      respuestaCorrecta: 1,
    },
    {
      texto: "8. Dada la siguiente grafica del movimiento de una sonda nasogástrica en este caso usada para un lavado gástrico diga: si llego al estómago sabiendo que la longitud para llegar es de 80 cm. ¿Dónde la velocidad es acelerada?",
      opciones: [
        "10 a 20 y de 40 a 50",
        "30 a 40",
        "30 y 70 a 80",
        "0 a 10 de 20 a 40 y de 50 a 70"
      ],
      respuestaCorrecta: 3,
    },
    {
      texto: "9. Un neurólogo está evaluando a pacientes con diferentes grados de esclerosis múltiple, una enfermedad desmielinizante que afecta la conducción nerviosa. Realiza pruebas de conducción nerviosa en cuatro pacientes, midiendo el tiempo que tarda un potencial de acción en recorrer una distancia de 30 cm en nervios periféricos. Los resultados son los siguientes: Paciente A: 0.6 ms, Paciente B: 1.5 ms, Paciente C: 3.0 ms, Paciente D: 0.3 ms. ¿Qué paciente presenta probablemente un menor daño desmielinizante en la zona evaluada?",
      opciones: [
        "Paciente A",
        "Paciente B",
        "Paciente C",
        "Paciente D"
      ],
      respuestaCorrecta: 3,
    },
    {
      texto: "10. Un odontólogo está evaluando la resistencia de diferentes materiales para una restauración molar en un paciente con bruxismo severo. Durante la masticación, el molar soporta una fuerza oclusal máxima de 720 N. La restauración propuesta tiene una superficie oclusal con área de contacto de 24 mm². El odontólogo considera tres materiales diferentes con los siguientes límites de resistencia a la compresión: Material A (Composite reforzado): 280 MPa, Material B (Cerámica feldespática): 160 MPa, Material C (Resina acrílica): 95 MPa. ¿Qué material es más susceptible a fracturarse bajo las condiciones de carga máxima del paciente con bruxismo?",
      opciones: [
        "Material A",
        "Material B",
        "Material C",
        "Todos los materiales resistirán la carga sin fracturarse"
      ],
      respuestaCorrecta: 2,
    },
    {
      texto: "11. El freno de alambre que se ve en la figura tiene una tensión T igual a 7N a lo largo de él con un ángulo de 70 grados con el eje y. La fuerza resultante en el eje y es de:",
      opciones: [
        "8,3",
        "4,8",
        "5,6",
        "7,4"
      ],
      respuestaCorrecta: 1,
    },
    {
      texto: "12. Un fisioterapeuta está desarrollando un programa de rehabilitación para un paciente con una lesión de ligamento cruzado anterior (LCA) en etapa inicial de recuperación. En esta fase, el fisioterapeuta necesita fortalecer la musculatura sin generar tensión en el ligamento lesionado, por lo que decide incluir ejercicios isométricos. ¿Qué combinación de ejercicios sería más adecuada para esta fase de rehabilitación?",
      opciones: [
        "Extensiones de rodilla y sentadillas profundas",
        "Sentadillas con salto y escalones",
        "Contracción sin flexo extensión del cuádriceps y ejercicio de puente glúteo estático",
        "Zancadas dinámicas y ejercicios con banda elástica con movimiento"
      ],
      respuestaCorrecta: 2,
    },
  ];

  const preguntasDesarrollo = [
    {
      id: "desarrollo1",
      texto: "A su consultorio llega un paciente al que se le colocó una prótesis de codo. Indique los materiales posibles que podría estar hecha la prótesis y bajo qué criterios. Además, indique los tipos de fuerza, esfuerzos, y momentos que estará sometido la pieza al ser colocado y en qué zonas se presentan.",
    },
    {
      id: "desarrollo2",
      texto: "Un odontólogo realiza la exodoncia de un molar inferior utilizando un elevador dental recto. El elevador actúa como una palanca de primer género donde el punto de apoyo (fulcro) se encuentra en el hueso alveolar. La distancia desde el punto de aplicación de la fuerza en el mango del elevador hasta el fulcro es de 12 cm, mientras que la distancia desde el fulcro hasta el punto de resistencia en el diente es de 0.8 cm. Si el odontólogo aplica una fuerza de 45 N en el mango del elevador, ¿cuál es la fuerza resultante aplicada sobre el diente para lograr su luxación?",
    },
    {
      id: "desarrollo3",
      texto: "Un paciente llega a urgencias tras caer de un andamio en una obra. Presenta una fractura por compresión en la tibia. Para corroborar su versión sobre la altura de la caída, el médico forense realiza un análisis biomecánico. Se conoce que el diámetro externo de la tibia del paciente es de 2,8 cm, con un canal medular interno de 1,2 cm de diámetro (por lo que el hueso compacto tiene un espesor de 0,8 cm). El tiempo de impacto estimado es de 0,02 segundos, la masa del paciente es de 85 kg y el esfuerzo de fluencia del hueso cortical es de 150 MPa. ¿Desde qué altura aproximada cayó el paciente?",
    },
    {
      id: "desarrollo4",
      texto: "Un astronauta realiza un experimento para evaluar la atrofia muscular durante su misión de 3 meses en la Estación Espacial Internacional. Al inicio de la misión La parte posterior y anterior del musculo deltoide elevan el brazo aplicando una fuerza Fp y Fa de 15 N con un ángulo de 30 y 40 grados con la vertical. Estudios previos han demostrado que, sin ejercicio compensatorio, los astronautas pierden aproximadamente un 2% de fuerza muscular por semana en microgravedad.Tras 12 semanas en el espacio, ¿Qué fuerza máxima podrá generar el astronauta en el deltoide al regresar a la Tierra suponiendo una masa de 10 Kg, cual es la aceleración y que recomendación le harías para reducir la tasa de reducción de fuerza muscular y perdida ósea? ¿Si el paciente tiene una masa de 80 kg cuanto pesa en la tierra?",
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

  const calcularResultados = () => {
    if (!cedula.trim() || !nombre.trim()) {
      alert("Por favor, ingrese su cédula y nombre para finalizar el test.");
      return;
    }

    const correctas = preguntas.reduce((acc, pregunta, index) => {
      if (respuestas[index] === pregunta.respuestaCorrecta) {
        return acc + 1;
      }
      return acc;
    }, 0);

    setTotalCorrectas(correctas);
    setMostrarResultados(true);

    // Crear resumen de respuestas
    const resumenOpciones = preguntas.map((pregunta, index) => {
      const respuestaUsuario = respuestas[index] !== undefined ? respuestas[index] : 'No respondida';
      return `${pregunta.texto}\nRespuesta seleccionada: ${respuestaUsuario !== 'No respondida' ? pregunta.opciones[respuestaUsuario] : 'No respondida'}\n`;
    }).join('\n');

    const resumenDesarrollo = preguntasDesarrollo.map((pregunta) => {
      const respuestaUsuario = respuestasDesarrollo[pregunta.id] || 'No respondida';
      return `${pregunta.texto}\nRespuesta: ${respuestaUsuario}\n`;
    }).join('\n');

    const mensaje = `Resultados del TEST DE BIOMECÁNICA:

Nombre: ${nombre}
Cédula: ${cedula}
Total de respuestas correctas (opción múltiple): ${correctas} de ${preguntas.length}
Porcentaje de acierto: ${((correctas / preguntas.length) * 100).toFixed(2)}%

RESPUESTAS DE OPCIÓN MÚLTIPLE:
${resumenOpciones}

RESPUESTAS DE DESARROLLO:
${resumenDesarrollo}
`;

    descargarArchivo(mensaje);
  };

  const descargarArchivo = (contenido) => {
    const clave = "Muratibiomecanica2025"; // Clave para encriptar
    const contenidoEncriptado = CryptoJS.AES.encrypt(contenido, clave).toString();
    const blob = new Blob([contenidoEncriptado], { type: 'text/plain;charset=utf-8' });
    const enlace = document.createElement('a');
    enlace.href = URL.createObjectURL(blob);
    enlace.download = `Test_Biomecanica_${cedula}.txt`;
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
  
    const clave = claveInput || "Davidbiomecanica2025";
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
        <h1 className="main-title">TEST DE BIOMECÁNICA</h1>
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
          <p className="tip-text">Para las siguientes preguntas, proporcione una respuesta detallada en el espacio disponible. El evaluador revisará sus respuestas.</p>
          
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
          <p className="results-text">Gracias por completar el Test de Biomecánica.</p>
          <p className="results-text">Se ha generado un archivo con sus respuestas para su evaluación.</p>
          <p className="tip-text">Para consultar sus resultados completos, descargue y guarde el archivo generado.</p>
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

export default BiomechanicaTest;