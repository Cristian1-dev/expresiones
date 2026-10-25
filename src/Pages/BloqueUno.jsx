import { useState, useEffect, useCallback } from 'react';
import { Link } from 'react-router-dom';
import logo from '../assets/logo Ingles.png';
import '../Styles/BloqueUno.css';

// 1. Estructura de datos con arrays y objetos indicando highlight: true/false
// Resaltando específicamente "Give" y "Thought"
const ejemplos = [
    {
        ingles: [
            { text: '"I', highlight: false },
            { text: "don't", highlight: false },
            { text: 'know,', highlight: false },
            { text: 'I', highlight: false },
            { text: 'need', highlight: false },
            { text: 'to', highlight: false },
            { text: 'give', highlight: true },
            { text: 'it', highlight: false },
            { text: 'some', highlight: false },
            { text: 'thought."', highlight: true },
        ],
        espanol: 'No sé, necesito pensarlo un poco más'
    },
    {
        ingles: [
            { text: '"Give', highlight: true },
            { text: 'it', highlight: false },
            { text: 'careful', highlight: false },
            { text: 'thought', highlight: true },
            { text: 'before', highlight: false },
            { text: 'deciding."', highlight: false },
        ],
        espanol: 'Considéralo cuidadosamente antes de decidir.'
    },
    {
        ingles: [
            { text: '"Let\'s', highlight: false },
            { text: 'give', highlight: true },
            { text: 'a', highlight: false },
            { text: 'little', highlight: false },
            { text: 'thought', highlight: true },
            { text: 'to', highlight: false },
            { text: 'how', highlight: false },
            { text: 'we', highlight: false },
            { text: 'can', highlight: false },
            { text: 'improve', highlight: false },
            { text: 'our', highlight: false },
            { text: "team's", highlight: false },
            { text: 'communication."', highlight: false },
        ],
        espanol: 'Vamos a pensar un poco en cómo podemos mejorar la comunicación de nuestro equipo.'
    }
];

export const BloqueUno = () => {
    // Control de flujo secuencial por clics
    // 0: Solo h1 "Give Thought"
    // 1: <p> "Pensamiento" (a la derecha por 4s)
    // 2: <p> "Dar pensamiento" (a la derecha por 4s)
    // 3: <h2> "pensarlo / reflexionarlo / considerarlo"
    // 4: h1 agrega "[algo]" entre Give y Thought
    // 5: Ejemplo 1
    // 6: Ejemplo 2 (completo)
    const [step, setStep] = useState(0);

    // Estado para controlar la visibilidad y texto de las etiquetas <p> temporales
    const [showTempP, setShowTempP] = useState(false);
    const [tempPText, setTempPText] = useState('');

    const maxSteps = 7;

    // Manejo de avance y reinicio
    const nextStep = useCallback(() => {
        setStep((prev) => (prev >= maxSteps ? 0 : prev + 1));
    }, [maxSteps]);

    const prevStep = useCallback(() => {
        setStep((prev) => (prev > 0 ? prev - 1 : 0));
    }, []);

    const resetAll = useCallback(() => {
        setStep(0);
    }, []);

    // Control de tiempo para las etiquetas <p>: solo deben estar en pantalla 4 segundos
    useEffect(() => {
        if (step === 1) {
            setTempPText('Pensamiento');
            setShowTempP(true);
            const timer = setTimeout(() => {
                setShowTempP(false);
            }, 5000);
            return () => clearTimeout(timer);
        } else if (step === 2) {
            setTempPText('Dar pensamiento');
            setShowTempP(true);
            const timer = setTimeout(() => {
                setShowTempP(false);
            }, 5000);
            return () => clearTimeout(timer);
        } else {
            setShowTempP(false);
            setTempPText('');
        }
    }, [step]);

    // Atajos de teclado para facilitar la grabación del video
    useEffect(() => {
        const handleKeyDown = (e) => {
            if (e.key === 'ArrowRight' || e.key === ' ' || e.key === 'Enter') {
                e.preventDefault();
                nextStep();
            } else if (e.key === 'ArrowLeft') {
                e.preventDefault();
                prevStep();
            } else if (e.key === 'r' || e.key === 'R') {
                e.preventDefault();
                resetAll();
            }
        };

        window.addEventListener('keydown', handleKeyDown);
        return () => window.removeEventListener('keydown', handleKeyDown);
    }, [nextStep, prevStep, resetAll]);

    // Etiqueta descriptiva para el botón principal
    const getBtnText = () => {
        switch (step) {
            case 0:
                return '1. Mostrar "Pensamiento"';
            case 1:
                return '2. Mostrar "Dar pensamiento"';
            case 2:
                return '3. Significado real';
            case 3:
                return '4. Insertar [algo]';
            case 4:
                return '5. Mostrar Ejemplo 1';
            case 5:
                return '6. Mostrar Ejemplo 2';
            case 6:
                return '7. Mostrar Ejemplo 3';
            case 7:
                return 'Reiniciar ↺';
            default:
                return 'Siguiente ➔';
        }
    };

    // Cuántos ejemplos se muestran según el paso actual:
    // Paso 5: 1 ejemplo
    // Paso 6: 2 ejemplos
    // Paso 7: 3 ejemplos
    const visibleExamplesCount = step >= 5 ? Math.min(step - 4, ejemplos.length) : 0;
    const ejemplosAMostrar = ejemplos.slice(0, visibleExamplesCount);

    return (
        <section className="bloque-main">
            {/* Fondo animado con rejilla y orbes */}
            <div className="bloque-main__grid"></div>
            <div className="bloque-main__orb bloque-main__orb--1"></div>
            <div className="bloque-main__orb bloque-main__orb--2"></div>

            {/* Marca de agua fija centrada en todo el proyecto */}
            <div className="marca-agua">
                <img src={logo} alt="marca de agua" />
            </div>

            <div className="bloque-main__content">
                {/* Cabecera: h1 a la izquierda, etiquetas <p> temporales y botón a la derecha */}
                <header className="bloque-header">
                    <div className="bloque-header__left">
                        {/* El h1 ya debe de estar en pantalla desde el inicio */}
                        <h1 className="bloque-title">
                            <span className="bloque-title__word">Give</span>
                            {/* Con el click del paso 4 se coloca [algo] entre Give y Thought */}
                            {step >= 4 && (
                                <span className="bloque-title__algo">[algo]</span>
                            )}
                            <span className="bloque-title__word">Thought</span>
                        </h1>

                        {/* Debajo del h1 colocar pensarlo / reflexionarlo / considerarlo (paso 3 en adelante) */}
                        {step >= 3 && (
                            <h2 className="bloque-subtitle">
                                <span className="bloque-subtitle__tag">Significado:</span>
                                pensarlo / reflexionarlo / considerarlo
                            </h2>
                        )}
                    </div>

                    <div className="bloque-header__right">
                        {/* Controles: Selector de bloque, indicador de pasos y botón de avance */}
                        <div className="bloque-controls">
                            <Link to="/bloque-dos" className="bloque-nav-link" title="Ir a Bloque 2">
                                Bloque 2
                            </Link>
                            <Link to="/bloque-tres" className="bloque-nav-link" title="Ir a Bloque 3">
                                Bloque 3
                            </Link>
                            <Link to="/bloque-cuatro" className="bloque-nav-link" title="Ir a Bloque 4">
                                Bloque 4
                            </Link>
                            <Link to="/bloque-cinco" className="bloque-nav-link" title="Ir a Bloque 5">
                                Bloque 5
                            </Link>
                            <span className="bloque-step-indicator">
                                Paso {step} / {maxSteps}
                            </span>
                            <button
                                className={`bloque-btn ${step === maxSteps ? 'bloque-btn--reset' : ''}`}
                                onClick={nextStep}
                                title="Presiona clic, Espacio o Flecha Derecha para avanzar"
                            >
                                {step === maxSteps ? 'Reiniciar ↺' : 'Mostrar'}
                            </button>
                        </div>

                        {/* Las etiquetas p aparecen a la derecha y solo duran 4 segundos */}
                        {showTempP && (
                            <div className="bloque-temp-card">

                                <p className="bloque-temp-p">{tempPText}</p>
                                <div className="bloque-temp-progress"></div>
                            </div>
                        )}
                    </div>
                </header>

                {/* Sección de Ejemplos: Aparecen uno por uno con cada clic */}
                <div className="bloque-examples-wrapper">
                    {ejemplosAMostrar.map((ejemplo, i) => (
                        <div key={i} className="bloque-example-card">
                            {/* Columna izquierda: Oración en inglés con palabras grandes y resaltado */}
                            <div className="bloque-example__english-col">
                                <span className="bloque-example__num">{i + 1}</span>
                                <p className="bloque-example__english-text">
                                    {/* 2. Renderizado requerido para el resaltado .pv-highlight */}
                                    {ejemplo.ingles.map((palabra, j) => (
                                        <span key={j}>
                                            {palabra.highlight ? (
                                                <span className="pv-highlight">
                                                    {palabra.text}
                                                </span>
                                            ) : (
                                                palabra.text
                                            )}
                                            {j < ejemplo.ingles.length - 1 && ' '}
                                        </span>
                                    ))}
                                </p>
                            </div>

                            {/* Separador visual con flecha */}
                            <div className="bloque-example__arrow-col">
                                <span className="bloque-example__arrow">➜</span>
                            </div>

                            {/* Columna derecha: Traducción al español */}
                            <div className="bloque-example__spanish-col">
                                <div className="bloque-example__spanish-box">
                                    <p className="bloque-example__spanish-text">
                                        {ejemplo.espanol}
                                    </p>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>

                {/* Pie de pantalla: Teclas de acceso rápido para la grabación */}
                <footer className="bloque-footer">
                    <div className="bloque-footer__hint">
                        <span>Avanzar: <kbd className="bloque-kbd">Espacio</kbd> o <kbd className="bloque-kbd">→</kbd></span>
                        <span>Retroceder: <kbd className="bloque-kbd">←</kbd></span>
                        <span>Reiniciar: <kbd className="bloque-kbd">R</kbd></span>
                    </div>
                    <span className="bloque-footer__status">
                        {step === 0 && 'Estado inicial'}
                        {step === 1 && 'Literal 1 en pantalla (5s)'}
                        {step === 2 && 'Literal 2 en pantalla (5s)'}
                        {step === 3 && 'Significado revelado'}
                        {step === 4 && 'Estructura con [algo] activada'}
                        {step === 5 && 'Ejemplo 1 visible'}
                        {step === 6 && 'Ejemplo 2 visible'}
                        {step === 7 && 'Todos los ejemplos en pantalla'}
                    </span>
                </footer>
            </div>
        </section>
    );
};