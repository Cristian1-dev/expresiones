import { useState, useEffect, useCallback } from 'react';
import { Link } from 'react-router-dom';
import logo from '../assets/logo Ingles.png';
import '../Styles/BloqueDos.css';

// 1. Estructura de datos con arrays y objetos indicando highlight: true / 'ing' / false
// Resaltando específicamente "When it comes to" y las formas en "-ing"
const ejemplos = [
    {
        ingles: [
            { text: "When it comes to", highlight: true },
            { text: "learning", highlight: "ing" },
            { text: "languages,", highlight: false },
            { text: "practice is key.", highlight: false },
        ],
        espanol: "Cuando se trata de aprender idiomas, la práctica es clave."
    },
    {
        ingles: [
            { text: "They struggle", highlight: false },
            { text: "when it comes to", highlight: true },
            { text: "speaking", highlight: "ing" },
            { text: "English.", highlight: false },
        ],
        espanol: "Ellos se esfuerzan cuando se trata de hablar Inglés."
    },
    {
        ingles: [
            { text: "When it comes to", highlight: true },
            { text: "cooking", highlight: "ing" },
            { text: "Italian food,", highlight: false },
            { text: "fresh ingredients make a big difference.", highlight: false },
        ],
        espanol: "Cuando se trata de cocinar comida italiana, los ingredientes frescos marcan una gran diferencia."
    }
];

export const BloqueDos = () => {
    // Control de flujo secuencial por clics
    // 0: Solo h1 "When it comes to"
    // 1: <p> "Cuando eso viene a..." (a la derecha por 5s)
    // 2: <h2> "Cuando se trata de... / A la hora de..."
    // 3: Ejemplo 1
    // 4: Ejemplo 2
    // 5: Ejemplo 3
    const [step, setStep] = useState(0);

    // Estado para controlar la visibilidad del texto temporal
    const [showTempP, setShowTempP] = useState(false);
    const tempPText = "Cuando eso viene a...";

    const maxSteps = 5;

    // Manejo de avance, retroceso y reinicio
    const nextStep = useCallback(() => {
        setStep((prev) => (prev >= maxSteps ? 0 : prev + 1));
    }, [maxSteps]);

    const prevStep = useCallback(() => {
        setStep((prev) => (prev > 0 ? prev - 1 : 0));
    }, []);

    const resetAll = useCallback(() => {
        setStep(0);
    }, []);

    // Control de tiempo para la etiqueta <p>: solo en pantalla 5 segundos
    useEffect(() => {
        if (step === 1) {
            setShowTempP(true);
            const timer = setTimeout(() => {
                setShowTempP(false);
            }, 5000);
            return () => clearTimeout(timer);
        } else {
            setShowTempP(false);
        }
    }, [step]);

    // Atajos de teclado para facilitar la grabación
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

    // Cuántos ejemplos se muestran según el paso actual:
    // Paso 3: 1 ejemplo
    // Paso 4: 2 ejemplos
    // Paso 5: 3 ejemplos
    const visibleExamplesCount = step >= 3 ? Math.min(step - 2, ejemplos.length) : 0;
    const ejemplosAMostrar = ejemplos.slice(0, visibleExamplesCount);

    return (
        <section className="bloque2-main">
            {/* Fondo animado con rejilla y orbes cian/teal */}
            <div className="bloque2-main__grid"></div>
            <div className="bloque2-main__orb bloque2-main__orb--1"></div>
            <div className="bloque2-main__orb bloque2-main__orb--2"></div>

            {/* Marca de agua fija centrada */}
            <div className="marca-agua">
                <img src={logo} alt="marca de agua" />
            </div>

            <div className="bloque2-main__content">
                {/* Cabecera: h1 a la izquierda, etiquetas temporales y botón a la derecha */}
                <header className="bloque2-header">
                    <div className="bloque2-header__left">
                        {/* El h1 ya debe de estar en pantalla desde el inicio */}
                        <h1 className="bloque2-title">
                            When it comes to
                        </h1>

                        {/* Debajo del h1 colocar: Cuando se trata de... / A la hora de... (paso 2 en adelante) */}
                        {step >= 2 && (
                            <h2 className="bloque2-subtitle">
                                <span className="bloque2-subtitle__tag">Significado:</span>
                                Cuando se trata de... / A la hora de...
                            </h2>
                        )}
                    </div>

                    <div className="bloque2-header__right">
                        {/* Controles: Selector de bloque, indicador de pasos y botón de avance */}
                        <div className="bloque2-controls">
                            <Link to="/bloque-uno" className="bloque2-nav-link" title="Ir a Bloque 1">
                                Bloque 1
                            </Link>
                            <Link to="/bloque-tres" className="bloque2-nav-link" title="Ir a Bloque 3">
                                Bloque 3
                            </Link>
                            <Link to="/bloque-cuatro" className="bloque2-nav-link" title="Ir a Bloque 4">
                                Bloque 4
                            </Link>
                            <Link to="/bloque-cinco" className="bloque2-nav-link" title="Ir a Bloque 5">
                                Bloque 5
                            </Link>
                            <span className="bloque2-step-indicator">
                                Paso {step} / {maxSteps}
                            </span>
                            <button
                                className={`bloque2-btn ${step === maxSteps ? 'bloque2-btn--reset' : ''}`}
                                onClick={nextStep}
                                title="Presiona clic, Espacio o Flecha Derecha para avanzar"
                            >
                                {step === maxSteps ? 'Reiniciar ↺' : 'Mostrar'}
                            </button>
                        </div>

                        {/* La etiqueta p aparece a la derecha y solo dura 5 segundos en el paso 1 */}
                        {showTempP && (
                            <div className="bloque2-temp-card">
                                <p className="bloque2-temp-p">{tempPText}</p>
                                <div className="bloque2-temp-progress"></div>
                            </div>
                        )}
                    </div>
                </header>

                {/* Sección de Ejemplos: Aparecen uno por uno con cada clic a partir del paso 3 */}
                <div className="bloque2-examples-wrapper">
                    {ejemplosAMostrar.map((ejemplo, i) => (
                        <div key={i} className="bloque2-example-card">
                            {/* Columna izquierda: Oración en inglés con letras grandes y resaltado */}
                            <div className="bloque2-example__english-col">
                                <span className="bloque2-example__num">{i + 1}</span>
                                <p className="bloque2-example__english-text">
                                    {ejemplo.ingles.map((palabra, j) => {
                                        let wordContent;
                                        if (palabra.highlight === 'ing') {
                                            const match = palabra.text.match(/^(.*)(ing)(.*)$/i);
                                            if (match) {
                                                const [, before, ing, after] = match;
                                                wordContent = (
                                                    <span className="bloque2-word-with-ing">
                                                        {before}
                                                        <span className="pv-highlight pv-highlight--ing">{ing}</span>
                                                        {after}
                                                    </span>
                                                );
                                            } else {
                                                wordContent = (
                                                    <span className="pv-highlight pv-highlight--ing">
                                                        {palabra.text}
                                                    </span>
                                                );
                                            }
                                        } else if (palabra.highlight) {
                                            wordContent = (
                                                <span className="pv-highlight">
                                                    {palabra.text}
                                                </span>
                                            );
                                        } else {
                                            wordContent = palabra.text;
                                        }

                                        return (
                                            <span key={j}>
                                                {wordContent}
                                                {j < ejemplo.ingles.length - 1 && ' '}
                                            </span>
                                        );
                                    })}
                                </p>
                            </div>

                            {/* Separador visual con flecha */}
                            <div className="bloque2-example__arrow-col">
                                <span className="bloque2-example__arrow">➜</span>
                            </div>

                            {/* Columna derecha: Traducción al español */}
                            <div className="bloque2-example__spanish-col">
                                <div className="bloque2-example__spanish-box">
                                    <p className="bloque2-example__spanish-text">
                                        {ejemplo.espanol}
                                    </p>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>

                {/* Pie de pantalla: Teclas de acceso rápido para la grabación */}
                <footer className="bloque2-footer">
                    <div className="bloque2-footer__hint">
                        <span>Avanzar: <kbd className="bloque2-kbd">Espacio</kbd> o <kbd className="bloque2-kbd">→</kbd></span>
                        <span>Retroceder: <kbd className="bloque2-kbd">←</kbd></span>
                        <span>Reiniciar: <kbd className="bloque2-kbd">R</kbd></span>
                    </div>
                    <span className="bloque2-footer__status">
                        {step === 0 && 'Estado inicial'}
                        {step === 1 && 'Literal en pantalla (5s)'}
                        {step === 2 && 'Significado revelado'}
                        {step === 3 && 'Ejemplo 1 visible'}
                        {step === 4 && 'Ejemplo 1 y 2 visibles'}
                        {step === 5 && 'Todos los ejemplos en pantalla (1, 2 y 3)'}
                    </span>
                </footer>
            </div>
        </section>
    );
};