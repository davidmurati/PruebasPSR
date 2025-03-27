import React, { useState } from 'react';
import './Fisica1.css';

const MenuSeleccion = () => {
  const [selectedExam, setSelectedExam] = useState('');
  const [showPasswordModal, setShowPasswordModal] = useState(false);
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleExamSelection = (exam) => {
    setSelectedExam(exam);
    setShowPasswordModal(true);
    setPassword('');
    setError('');
  };

  const handlePasswordSubmit = (e) => {
    e.preventDefault();
    
    // Verificar contraseña según el examen seleccionado
    if (
      (selectedExam === 'Fisica1A' && password === 'Hola') ||
      (selectedExam === 'Fisica1B' && password === 'Mundo')
    ) {
      // Redirigir al examen correspondiente usando window.location.href
      window.location.href = `/${selectedExam}`;
    } else {
      setError('Contraseña incorrecta. Por favor, inténtelo de nuevo.');
    }
  };

  const handleCloseModal = () => {
    setShowPasswordModal(false);
    setSelectedExam('');
    setError('');
  };

  return (
    <div className="biomechanica-container">
      <header className="header-container">
        <div className="floating-icon">
          <span className="brain-icon">🧠</span>
        </div>
        <h1 className="main-title">EVALUACIÓN DE FíSICA SALUD PSR</h1>
        <p className="subtitle">Seleccione el examen que desea realizar</p>
      </header>

      <section className="section section-menu">
        <h2 className="section-title">Selección de Examen</h2>
        <p className="tip-text">Por favor, seleccione el examen que desea realizar. Necesitará una contraseña para acceder.</p>
        
        <div className="exam-buttons">
          <button 
            className="exam-button exam-button-a"
            onClick={() => handleExamSelection('Fisica1A')}
          >
            <div className="exam-icon">📝</div>
            <div className="exam-content">
              <h3>Física 1A</h3>
              <p>Evaluación de Biomecánica Sección A</p>
            </div>
          </button>
          
          <button 
            className="exam-button exam-button-b"
            onClick={() => handleExamSelection('Fisica1B')}
          >
            <div className="exam-icon">🔍</div>
            <div className="exam-content">
              <h3>Física 1B</h3>
              <p>Evaluación de Biomecánica Sección B</p>
            </div>
          </button>
        </div>
      </section>

      {/* Modal para ingresar contraseña */}
      {showPasswordModal && (
        <div className="password-modal-backdrop">
          <div className="password-modal">
            <button className="modal-close" onClick={handleCloseModal}>&times;</button>
            <h2 className="modal-title">Acceso Restringido</h2>
            <p>Ingrese la contraseña para acceder al examen {selectedExam === 'Fisica1A' ? 'Física 1A' : 'Física 1B'}</p>
            
            {error && <div className="error-message">{error}</div>}
            
            <form onSubmit={handlePasswordSubmit}>
              <div className="input-group">
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Contraseña"
                  className="text-input"
                  autoFocus
                />
              </div>
              <div className="button-container">
                <button type="submit" className="submit-button">
                  Acceder al Examen
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default MenuSeleccion;