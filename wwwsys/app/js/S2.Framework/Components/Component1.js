import { BaseComponent } from '../Core/BaseComponent.js';

export class Component1 extends BaseComponent {
    constructor(properties = {}, cssFileUrl = null) {
        super(properties, cssFileUrl);
        this.htmlSegment = `
            <table>
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
                        <td>1000 euro</td>
                    </tr>
                    <tr>
                        <td>Stefania</td>
                        <td>Abruzzese</td>
                        <td>Rifacimento tettoia</td>
                        <td>2700 euro</td>
                    </tr>
                </tbody>
            </table>
        `;
    }

    initialize() {
        console.log('Component1 initialized');
    }
}
