import { useState, useEffect, useCallback } from 'react';
import { Link } from 'react-router-dom';
import logo from '../assets/logo Ingles.png';
import '../Styles/BloqueCuatro.css';

// 1. Estructura de datos con arrays y objetos indicando highlight: true / 'ing' / false
// Resaltando la frase "looking forward to" en azul índigo y únicamente "ing" en naranja fuego
const ejemplos = [
    {
        ingles: [
            { text: "I'm", highlight: false },
            { text: "looking forward to", highlight: true },
            { text: "meeting", highlight: "ing" },
            { text: "you.", highlight: false },
        ],
        espanol: "Tengo muchas ganas de conocerte."
    },
    {
        ingles: [
            { text: "We're", highlight: false },
            { text: "looking forward to", highlight: true },
            { text: "working", highlight: "ing" },
            { text: "with you.", highlight: false },
        ],
        espanol: "Estamos ansiosos de trabajar con usted."
    },
    {
        ingles: [
            { text: "She's", highlight: false },
            { text: "looking forward to", highlight: true },
            { text: "the weekend.", highlight: false },
        ],
        espanol: "Ella está esperando con ansias el fin de semana."
    }
];

export const BloqueCuatro = () => {
    // Control de flujo secuencial por clics
    // 0: Solo h1 "Look forward to"
    // 1: <h2> "Estar ansioso por / Esperar con ilusión / Tener muchas ganas de"
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
        <section className="bloque4-main">
            {/* Fondo animado con rejilla y orbes índigo y naranja */}
            <div className="bloque4-main__grid"></div>
            <div className="bloque4-main__orb bloque4-main__orb--1"></div>
            <div className="bloque4-main__orb bloque4-main__orb--2"></div>

            {/* Marca de agua fija centrada */}
            <div className="marca-agua">
                <img src={logo} alt="marca de agua" />
            </div>

            <div className="bloque4-main__content">
                {/* Cabecera: h1 a la izquierda y controles a la derecha */}
                <header className="bloque4-header">
                    <div className="bloque4-header__left">
                        {/* 0: Solo h1 "Look forward to" */}
                        <h1 className="bloque4-title">
                            Look forward to
                        </h1>

                        {/* 1: <h2> Estar ansioso por / Esperar con ilusión / Tener muchas ganas de */}
                        {step >= 1 && (
                            <h2 className="bloque4-subtitle">
                                <span className="bloque4-subtitle__tag">Significado:</span>
                                Estar ansioso por / Esperar con ilusión / Tener muchas ganas de
                            </h2>
                        )}
                    </div>

                    <div className="bloque4-header__right">
                        {/* Controles: Selector de bloque, indicador de pasos y botón de avance */}
                        <div className="bloque4-controls">
                            <Link to="/bloque-uno" className="bloque4-nav-link" title="Ir a Bloque 1">
                                Bloque 1
                            </Link>
                            <Link to="/bloque-dos" className="bloque4-nav-link" title="Ir a Bloque 2">
                                Bloque 2
                            </Link>
                            <Link to="/bloque-tres" className="bloque4-nav-link" title="Ir a Bloque 3">
                                Bloque 3
                            </Link>
                            <Link to="/bloque-cinco" className="bloque4-nav-link" title="Ir a Bloque 5">
                                Bloque 5
                            </Link>
                            <span className="bloque4-step-indicator">
                                Paso {step} / {maxSteps}
                            </span>
                            <button
                                className={`bloque4-btn ${step === maxSteps ? 'bloque4-btn--reset' : ''}`}
                                onClick={nextStep}
                                title="Presiona clic, Espacio o Flecha Derecha para avanzar"
                            >
                                {step === maxSteps ? 'Reiniciar ↺' : 'Mostrar'}
                            </button>
                        </div>
                    </div>
                </header>

                {/* Sección de Ejemplos: Aparecen uno por uno a partir del paso 2 */}
                <div className="bloque4-examples-wrapper">
                    {ejemplosAMostrar.map((ejemplo, i) => (
                        <div key={i} className="bloque4-example-card">
                            {/* Columna izquierda: Oración en inglés con letras grandes y resaltados */}
                            <div className="bloque4-example__english-col">
                                <span className="bloque4-example__num">{i + 1}</span>
                                <p className="bloque4-example__english-text">
                                    {ejemplo.ingles.map((palabra, j) => {
                                        let wordContent;
                                        if (palabra.highlight === 'ing') {
                                            // Resalta exclusivamente el sufijo "ing", dejando la raíz normal
                                            const match = palabra.text.match(/^(.*)(ing)(.*)$/i);
                                            if (match) {
                                                const [, before, ing, after] = match;
                                                wordContent = (
                                                    <span className="bloque4-word-with-ing">
                                                        {before}
                                                        <span className="b4-highlight b4-highlight--ing">{ing}</span>
                                                        {after}
                                                    </span>
                                                );
                                            } else {
                                                wordContent = (
                                                    <span className="b4-highlight b4-highlight--ing">
                                                        {palabra.text}
                                                    </span>
                                                );
                                            }
                                        } else if (palabra.highlight === true) {
                                            // Frase verbal en azul índigo
                                            wordContent = (
                                                <span className="b4-highlight">
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
                            <div className="bloque4-example__arrow-col">
                                <span className="bloque4-example__arrow">➜</span>
                            </div>

                            {/* Columna derecha: Traducción al español */}
                            <div className="bloque4-example__spanish-col">
                                <div className="bloque4-example__spanish-box">
                                    <p className="bloque4-example__spanish-text">
                                        {ejemplo.espanol}
                                    </p>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>

                {/* Pie de pantalla: Teclas de acceso rápido para la grabación */}
                <footer className="bloque4-footer">
                    <div className="bloque4-footer__hint">
                        <span>Avanzar: <kbd className="bloque4-kbd">Espacio</kbd> o <kbd className="bloque4-kbd">→</kbd></span>
                        <span>Retroceder: <kbd className="bloque4-kbd">←</kbd></span>
                        <span>Reiniciar: <kbd className="bloque4-kbd">R</kbd></span>
                    </div>
                    <span className="bloque4-footer__status">
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