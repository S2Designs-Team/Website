/*
# Created by S2DesignsTeam © 2035 (Phobetor1999 AKA ㊙️anonimo㊙️).
#
# Licensed under the Apache License, Version 2.0 (the "License");
# you may not use this file except in compliance with the License.
# You may obtain a copy of the License at
#
#      http://www.apache.org/licenses/LICENSE-2.0
#
# Unless required by applicable law or agreed to in writing, software
# distributed under the License is distributed on an "AS IS" BASIS,
# WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
# See the License for the specific language governing permissions and
# limitations under the License.
#
*/

export class Component1 extends AppContext.BaseComponent {
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
