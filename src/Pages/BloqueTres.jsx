import { useState, useEffect, useCallback } from 'react';
import { Link } from 'react-router-dom';
import logo from '../assets/logo Ingles.png';
import '../Styles/BloqueTres.css';

// 1. Estructura de datos con arrays y objetos indicando highlight: true / 'pos' / false
// Resaltando la frase "make up ... mind" en azul eléctrico y los posesivos en verde neón lima
const ejemplos = [
    {
        ingles: [
            { text: "I can't", highlight: false },
            { text: "make up", highlight: true },
            { text: "my", highlight: "pos" },
            { text: "mind", highlight: true },
            { text: "between the red or the blue shirt.", highlight: false },
        ],
        espanol: "No puedo decidirme entre la camisa roja o la azul."
    },
    {
        ingles: [
            { text: "She", highlight: false },
            { text: "made up", highlight: true },
            { text: "her", highlight: "pos" },
            { text: "mind", highlight: true },
            { text: "to study abroad.", highlight: false },
        ],
        espanol: "Ella decidió estudiar en el extranjero."
    },
    {
        ingles: [
            { text: "Come on,", highlight: false },
            { text: "make up", highlight: true },
            { text: "your", highlight: "pos" },
            { text: "mind!", highlight: true },
        ],
        espanol: "¡Vamos, decídete!"
    }
];

// Lista de pronombres posesivos para mostrar en el paso 3
const possessivesList = ['My', 'Your', 'His', 'Her', 'Our', 'Their'];

export const BloqueTres = () => {
    // Control de flujo secuencial por clics
    // 0: Solo h1 "Make up [someone's] mind", resaltando "[someone's]"
    // 1: <p> "hacer la mente de alguien" (a la derecha por 5s)
    // 2: <h2> "Decidirse... / Tomar una decisión..."
    // 3: <h2> My, Your, His, Her, Our, Their
    // 4: Ejemplo 1
    // 5: Ejemplo 2
    // 6: Ejemplo 3
    const [step, setStep] = useState(0);

    // Estado para controlar la visibilidad del texto temporal
    const [showTempP, setShowTempP] = useState(false);
    const tempPText = "hacer la mente de alguien";

    const maxSteps = 6;

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
    // Paso 4: 1 ejemplo
    // Paso 5: 2 ejemplos
    // Paso 6: 3 ejemplos
    const visibleExamplesCount = step >= 4 ? Math.min(step - 3, ejemplos.length) : 0;
    const ejemplosAMostrar = ejemplos.slice(0, visibleExamplesCount);

    return (
        <section className="bloque3-main">
            {/* Fondo animado con rejilla y orbes azul / lima */}
            <div className="bloque3-main__grid"></div>
            <div className="bloque3-main__orb bloque3-main__orb--1"></div>
            <div className="bloque3-main__orb bloque3-main__orb--2"></div>

            {/* Marca de agua fija centrada */}
            <div className="marca-agua">
                <img src={logo} alt="marca de agua" />
            </div>

            <div className="bloque3-main__content">
                {/* Cabecera: h1 a la izquierda, etiquetas temporales y botón a la derecha */}
                <header className="bloque3-header">
                    <div className="bloque3-header__left">
                        {/* 0: Solo h1 Make up [someone's] mind, resaltando [someone's] */}
                        <h1 className="bloque3-title">
                            <span className="bloque3-title__word">Make up</span>
                            <span className="bloque3-title__someone">[someone's]</span>
                            <span className="bloque3-title__word">mind</span>
                        </h1>

                        {/* 2: <h2> Decidirse... / Tomar una decisión... */}
                        {step >= 2 && (
                            <h2 className="bloque3-subtitle">
                                <span className="bloque3-subtitle__tag">Significado:</span>
                                Decidirse... / Tomar una decisión...
                            </h2>
                        )}

                        {/* 3: <h2> My, Your, His, Her, Our, Their */}
                        {step >= 3 && (
                            <h2 className="bloque3-possessives-box">
                                <span className="bloque3-possessives__tag">Posesivos:</span>
                                <div className="bloque3-possessives__list">
                                    {possessivesList.map((pos, idx) => (
                                        <h2 key={idx} className="bloque3-pos-pill">
                                            {pos}
                                        </h2>
                                    ))}
                                </div>
                            </h2>
                        )}
                    </div>

                    <div className="bloque3-header__right">
                        {/* Controles: Selector de bloque, indicador de pasos y botón de avance */}
                        <div className="bloque3-controls">
                            <Link to="/bloque-uno" className="bloque3-nav-link" title="Ir a Bloque 1">
                                Bloque 1
                            </Link>
                            <Link to="/bloque-dos" className="bloque3-nav-link" title="Ir a Bloque 2">
                                Bloque 2
                            </Link>
                            <Link to="/bloque-cuatro" className="bloque3-nav-link" title="Ir a Bloque 4">
                                Bloque 4
                            </Link>
                            <Link to="/bloque-cinco" className="bloque3-nav-link" title="Ir a Bloque 5">
                                Bloque 5
                            </Link>
                            <span className="bloque3-step-indicator">
                                Paso {step} / {maxSteps}
                            </span>
                            <button
                                className={`bloque3-btn ${step === maxSteps ? 'bloque3-btn--reset' : ''}`}
                                onClick={nextStep}
                                title="Presiona clic, Espacio o Flecha Derecha para avanzar"
                            >
                                {step === maxSteps ? 'Reiniciar ↺' : 'Mostrar'}
                            </button>
                        </div>

                        {/* 1: <p> hacer la mente de alguien (a la derecha por 5s) */}
                        {showTempP && (
                            <div className="bloque3-temp-card">
                                <p className="bloque3-temp-p">{tempPText}</p>
                                <div className="bloque3-temp-progress"></div>
                            </div>
                        )}
                    </div>
                </header>

                {/* Sección de Ejemplos: Aparecen uno por uno a partir del paso 4 */}
                <div className="bloque3-examples-wrapper">
                    {ejemplosAMostrar.map((ejemplo, i) => (
                        <div key={i} className="bloque3-example-card">
                            {/* Columna izquierda: Oración en inglés con letras grandes y resaltados */}
                            <div className="bloque3-example__english-col">
                                <span className="bloque3-example__num">{i + 1}</span>
                                <p className="bloque3-example__english-text">
                                    {ejemplo.ingles.map((palabra, j) => {
                                        let wordContent;
                                        if (palabra.highlight === 'pos') {
                                            // Posesivo resaltado en verde lima
                                            wordContent = (
                                                <span className="b3-highlight b3-highlight--pos">
                                                    {palabra.text}
                                                </span>
                                            );
                                        } else if (palabra.highlight === true) {
                                            // Frase resaltada en azul cielo
                                            wordContent = (
                                                <span className="b3-highlight">
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
                            <div className="bloque3-example__arrow-col">
                                <span className="bloque3-example__arrow">➜</span>
                            </div>

                            {/* Columna derecha: Traducción al español */}
                            <div className="bloque3-example__spanish-col">
                                <div className="bloque3-example__spanish-box">
                                    <p className="bloque3-example__spanish-text">
                                        {ejemplo.espanol}
                                    </p>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>

                {/* Pie de pantalla: Teclas de acceso rápido para la grabación */}
                <footer className="bloque3-footer">
                    <div className="bloque3-footer__hint">
                        <span>Avanzar: <kbd className="bloque3-kbd">Espacio</kbd> o <kbd className="bloque3-kbd">→</kbd></span>
                        <span>Retroceder: <kbd className="bloque3-kbd">←</kbd></span>
                        <span>Reiniciar: <kbd className="bloque3-kbd">R</kbd></span>
                    </div>
                    <span className="bloque3-footer__status">
                        {step === 0 && 'Estado inicial'}
                        {step === 1 && 'Literal en pantalla (5s)'}
                        {step === 2 && 'Significado revelado'}
                        {step === 3 && 'Posesivos mostrados'}
                        {step === 4 && 'Ejemplo 1 visible'}
                        {step === 5 && 'Ejemplo 1 y 2 visibles'}
                        {step === 6 && 'Todos los ejemplos en pantalla (1, 2 y 3)'}
                    </span>
                </footer>
            </div>
        </section>
    );
};