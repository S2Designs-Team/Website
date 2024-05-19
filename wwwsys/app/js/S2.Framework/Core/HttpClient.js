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

/*📎DOCUMENTATION
* Author:      ㊙️anonimo㊙️
* Description: The Application HttpRequest manager class.
* last modify: 2024-05-19
* ClassName:   HttpRequest
* Version:     0.0.001
* Parameters:  none
*/
class HttpRequest {

    /*📎DOCUMENTATION
    * Author:      ㊙️anonimo㊙️
    * Description: Send an http/https request to the url defined by 'url' parameter. 
    *              It is possible to define a specified request method (GET, POST, UPDATE, DELETE).
    *              It is possible to specify a queryString and a body containing some data. 
    * last modify: 2024-05-19
    * MethodName:  send
    * Version:     0.0.001
    * Parameters:  [required] url                      => The url of the remote resource/api.
    *              [optional][default = 'GET'] method  => The request type (GET, POST, UPDATE, DELETE).
    *              [optional][default = {}]    headers => The header of the request.
    *              [optional][default = null]  query   => The queryString of the request to identify the data element.
    *              [optional][default = null]  body    => The data body of the request to send to the server.
    */
    static async send(url, method = 'GET', headers = {}, query = null, body = null) {
      
        const options = {
            method:  method,
            headers: headers
        };

        if (body) {
            options.body = JSON.stringify(body);
        }

        if (query) {
            url += '?' + new URLSearchParams(query);
        }

        try {
            const response = await fetch(url, options);
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            return await response.json();
        } catch (error) {
            console.error('There was a problem with the request:', error);
            return null;
        }
    }
}
