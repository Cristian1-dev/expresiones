import { useState, useEffect, useCallback } from 'react';
import { Link } from 'react-router-dom';
import logo from '../assets/logo Ingles.png';
import '../Styles/BloqueCinco.css';

// 1. Estructura de datos con arrays y objetos indicando highlight: true / false
// Resaltando la frase "Had Better" o "'d better" en rojo carmesí
const ejemplos = [
    {
        ingles: [
            { text: "You", highlight: false },
            { text: "had better", highlight: true },
            { text: "go to the dentist.", highlight: false },
        ],
        espanol: "Será mejor que vayas al dentista."
    },
    {
        ingles: [
            { text: "We'd better", highlight: true },
            { text: "hurry up or we'll miss the bus.", highlight: false },
        ],
        espanol: "Será mejor que nos apresuremos o perderemos el autobús."
    },
    {
        ingles: [
            { text: "You", highlight: false },
            { text: "had better", highlight: true },
            { text: "finish this report before 5 PM.", highlight: false },
        ],
        espanol: "Más vale que termines este informe antes de las 5 de la tarde."
    }
];

export const BloqueCinco = () => {
    // Control de flujo secuencial por clics
    // 0: Solo h1 "Had Better"
    // 1: <h2> "Será mejor que... / Más vale que..."
    // 2: Ejemplo 1
    // 3: Ejemplo 2
    // 4: Ejemplo 3
    const [step, setStep] = useState(0);

    const maxSteps = 4;

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
    // Paso 2: 1 ejemplo
    // Paso 3: 2 ejemplos
    // Paso 4: 3 ejemplos
    const visibleExamplesCount = step >= 2 ? Math.min(step - 1, ejemplos.length) : 0;
    const ejemplosAMostrar = ejemplos.slice(0, visibleExamplesCount);

    return (
        <section className="bloque5-main">
            {/* Fondo animado con rejilla y orbes carmesí */}
            <div className="bloque5-main__grid"></div>
            <div className="bloque5-main__orb bloque5-main__orb--1"></div>
            <div className="bloque5-main__orb bloque5-main__orb--2"></div>

            {/* Marca de agua fija centrada */}
            <div className="marca-agua">
                <img src={logo} alt="marca de agua" />
            </div>

            <div className="bloque5-main__content">
                {/* Cabecera: h1 a la izquierda y controles a la derecha */}
                <header className="bloque5-header">
                    <div className="bloque5-header__left">
                        {/* 0: Solo h1 "Had Better" */}
                        <h1 className="bloque5-title">
                            Had Better
                        </h1>

                        {/* 1: <h2> Será mejor que... / Más vale que... */}
                        {step >= 1 && (
                            <h2 className="bloque5-subtitle">
                                <span className="bloque5-subtitle__tag">Significado:</span>
                                Será mejor que... / Más vale que...
                            </h2>
                        )}
                    </div>

                    <div className="bloque5-header__right">
                        {/* Controles: Selector de bloque, indicador de pasos y botón de avance */}
                        <div className="bloque5-controls">
                            <Link to="/bloque-uno" className="bloque5-nav-link" title="Ir a Bloque 1">
                                Bloque 1
                            </Link>
                            <Link to="/bloque-dos" className="bloque5-nav-link" title="Ir a Bloque 2">
                                Bloque 2
                            </Link>
                            <Link to="/bloque-tres" className="bloque5-nav-link" title="Ir a Bloque 3">
                                Bloque 3
                            </Link>
                            <Link to="/bloque-cuatro" className="bloque5-nav-link" title="Ir a Bloque 4">
                                Bloque 4
                            </Link>
                            <span className="bloque5-step-indicator">
                                Paso {step} / {maxSteps}
                            </span>
                            <button
                                className={`bloque5-btn ${step === maxSteps ? 'bloque5-btn--reset' : ''}`}
                                onClick={nextStep}
                                title="Presiona clic, Espacio o Flecha Derecha para avanzar"
                            >
                                {step === maxSteps ? 'Reiniciar ↺' : 'Mostrar'}
                            </button>
                        </div>
                    </div>
                </header>

                {/* Sección de Ejemplos: Aparecen uno por uno a partir del paso 2 */}
                <div className="bloque5-examples-wrapper">
                    {ejemplosAMostrar.map((ejemplo, i) => (
                        <div key={i} className="bloque5-example-card">
                            {/* Columna izquierda: Oración en inglés con letras grandes y resaltados */}
                            <div className="bloque5-example__english-col">
                                <span className="bloque5-example__num">{i + 1}</span>
                                <p className="bloque5-example__english-text">
                                    {ejemplo.ingles.map((palabra, j) => {
                                        let wordContent;
                                        if (palabra.highlight) {
                                            // Si es una contracción como We'd better, resalta 'd better
                                            const match = palabra.text.match(/^(.*)('d better)(.*)$/i);
                                            if (match) {
                                                const [, pronoun, contractPart, rest] = match;
                                                wordContent = (
                                                    <span>
                                                        {pronoun}
                                                        <span className="b5-highlight">{contractPart}</span>
                                                        {rest}
                                                    </span>
                                                );
                                            } else {
                                                wordContent = (
                                                    <span className="b5-highlight">
                                                        {palabra.text}
                                                    </span>
                                                );
                                            }
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
                            <div className="bloque5-example__arrow-col">
                                <span className="bloque5-example__arrow">➜</span>
                            </div>

                            {/* Columna derecha: Traducción al español */}
                            <div className="bloque5-example__spanish-col">
                                <div className="bloque5-example__spanish-box">
                                    <p className="bloque5-example__spanish-text">
                                        {ejemplo.espanol}
                                    </p>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>

                {/* Pie de pantalla: Teclas de acceso rápido para la grabación */}
                <footer className="bloque5-footer">
                    <div className="bloque5-footer__hint">
                        <span>Avanzar: <kbd className="bloque5-kbd">Espacio</kbd> o <kbd className="bloque5-kbd">→</kbd></span>
                        <span>Retroceder: <kbd className="bloque5-kbd">←</kbd></span>
                        <span>Reiniciar: <kbd className="bloque5-kbd">R</kbd></span>
                    </div>
                    <span className="bloque5-footer__status">
                        {step === 0 && 'Estado inicial'}
                        {step === 1 && 'Significado revelado'}
                        {step === 2 && 'Ejemplo 1 visible'}
                        {step === 3 && 'Ejemplo 1 y 2 visibles'}
                        {step === 4 && 'Todos los ejemplos en pantalla (1, 2 y 3)'}
                    </span>
                </footer>
            </div>
        </section>
    );
};