export const BloqueUno = () => {
    return (
        <div>
            <h1>Give Thought</h1>
            //que aparezca del lado derecho por un corto tiempo lo siguiente:

            <p>Pensamiento</p>
            <p>Dar pensamiento</p>

            {/* debajo del h1 colocar: */}
            <h2>pensarlo / reflexionarlo / considerarlo</h2>
            //Luego despues de colocar en el h1 entre Give y Thought lo siguiente:
            <p>[algo]</p>

            {/* Ejemplos: */}
            <div>
                <div className="English">"I don't know, I need to give it some thought."</div>
                <div className="Espanol">No sé, necesito pensarlo un poco más</div>
                <div className="English">"Give it careful thought before deciding."</div>
                <div className="Espanol">Considéralo cuidadosamente antes de decidir.</div>
            </div>

        </div>
    )
}