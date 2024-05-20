// Definizione del componente grafico che estende BaseComponent
class Component1 extends BaseComponent {
    constructor() {
        super();
        this.htmlSegment = `
            <table border="1">
                <thead>
                    <tr>
                        <th>Nome</th>
                        <th>Cognome</th>
                        <th>Causale</th>
                        <th>Importo</th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td>Pippo</td>
                        <td>Scaiola</td>
                        <td>Spese condominiali</td>
                        <td>1'000 euro</td>
                    </tr>
                    <tr>
                        <td>Stefania</td>
                        <td>Abruzzese</td>
                        <td>Rifacimento tettoia</td>
                        <td>2'700 euro</td>
                    </tr>
                </tbody>
            </table>
        `;
        this.container.innerHTML = this.htmlSegment;
    }

    // Sovrascrivere il metodo initialize per ulteriori inizializzazioni se necessario
    initialize() {
        // Inizializzazioni specifiche di Componente1, se necessarie
    }

    // Sovrascrivere il metodo addEventListeners per aggiungere eventi se necessario
    addEventListeners(container) {
        // Aggiungere eventi specifici di Componente1, se necessari
    }
}

// Rendi la classe accessibile globalmente
window.Componente1 = Componente1;
