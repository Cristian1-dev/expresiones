import React from 'react';
import logo from '../assets/logo Ingles.png';
import '../Styles/Resumen.css';

export const Resumen = () => (
    <section className="resumen-main">
        {/* Marca de agua fija */}
        <div className="marca-agua">
            <img src={logo} alt="marca de agua" />
        </div>
        <div className="resumen-main__content">
            <header className="resumen-header">
                <div className="resumen-header__title-box">
                    <h1 className="resumen-title">Resumen de expresiones idiomáticas</h1>
                </div>
                <nav className="resumen-nav">
                    <a href="/" className="resumen-nav-link">Inicio</a>
                </nav>
            </header>

            <div className="resumen-table-container">
                <table className="resumen-table">
                    <thead>


                    </thead>
                    <tbody>
                        <tr className="resumen-row row-amber">
                            <td className="resumen-col-expr"><span className="res-hl res-hl--amber">Give [something] thought</span></td>
                            <td className="resumen-col-sign">Pensar / Reflexionar</td>
                            <td className="resumen-col-regla">Estructura separable; inserta el objeto (it) en el centro.</td>
                            <td className="resumen-col-ejemplo">
                                Before buying that expensive car, you should <span className="res-hl res-hl--amber">give it some thought</span>.
                            </td>
                            <td className="resumen-col-traduccion">
                                Antes de comprar ese auto tan caro, deberías <span className="res-hl res-hl--amber">pensarlo</span> un poco.
                            </td>
                        </tr>
                        <tr className="resumen-row row-teal">
                            <td className="resumen-col-expr"><span className="res-hl res-hl--teal">When it comes to ~</span></td>
                            <td className="resumen-col-sign">Cuando se trata de… / A la hora de...</td>
                            <td className="resumen-col-regla">Se usa para enfocar o cambiar de tema; si sigue un verbo, lleva -ING.</td>
                            <td className="resumen-col-ejemplo">
                                She is very creative <span className="res-hl res-hl--teal">when it comes to solving problems</span>.
                            </td>
                            <td className="resumen-col-traduccion">
                                Ella es muy creativa cuando se trata de <span className="res-hl res-hl--teal">resolver problemas</span>.
                            </td>
                        </tr>
                        <tr className="resumen-row row-crimson">
                            <td className="resumen-col-expr"><span className="res-hl res-hl--crimson">Had better</span></td>
                            <td className="resumen-col-sign">Será mejor que… / Más vale que…</td>
                            <td className="resumen-col-regla">Consejo firme en presente/futuro; suele contraerse a 'd better.</td>
                            <td className="resumen-col-ejemplo">
                                <span className="res-hl res-hl--crimson">You'd better</span> take an umbrella; it looks like it's going to rain.
                            </td>
                            <td className="resumen-col-traduccion">
                                <span className="res-hl res-hl--crimson">Más vale que</span> lleves una sombrilla; parece que va a llover.
                            </td>
                        </tr>
                        <tr className="resumen-row row-blue">
                            <td className="resumen-col-expr"><span className="res-hl res-hl--blue">Make up [someone's] mind</span></td>
                            <td className="resumen-col-sign">Decidirse / Tomar una decisión</td>
                            <td className="resumen-col-regla">El posesivo cambia según la persona que decide.</td>
                            <td className="resumen-col-ejemplo">
                                He can't <span className="res-hl res-hl--blue">make up his mind</span> about which university to choose.
                            </td>
                            <td className="resumen-col-traduccion">
                                Él no logra <span className="res-hl res-hl--blue">decidirse</span> sobre qué universidad elegir.
                            </td>
                        </tr>
                        <tr className="resumen-row row-indigo">
                            <td className="resumen-col-expr"><span className="res-hl res-hl--indigo">Look forward to ~</span></td>
                            <td className="resumen-col-sign">Estar ansioso por… / Esperar con ilusión…</td>
                            <td className="resumen-col-regla">Expresa entusiasmo por un futuro; si sigue un verbo lleva -ING.</td>
                            <td className="resumen-col-ejemplo">
                                Our team is <span className="res-hl res-hl--indigo">looking forward to starting</span> the new project next week.
                            </td>
                            <td className="resumen-col-traduccion">
                                Nuestro equipo está ansioso por <span className="res-hl res-hl--indigo">comenzar</span> el nuevo proyecto la próxima semana.
                            </td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </div>
    </section>
);
