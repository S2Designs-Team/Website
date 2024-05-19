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
    * Description: The class constructor.
    * last modify: 2024-05-19
    * Parameters:  [optional] baseUrl => the base URL for the requests
    */ 
    constructor(baseUrl = '') {
        this.baseUrl = baseUrl;
    }

    /*📎DOCUMENTATION
    * Author:      ㊙️anonimo㊙️
    * Description: A method to send a GET request.
    * last modify: 2024-05-19
    * MethodName:  get
    * Parameters:  [required] endpoint ==============> the endpoint for the request
    *              [optional][default = {}] options => additional fetch options
    * USAGE: ======================================================================
    * const httpRequest = new HttpRequest('https://api.example.com');
    * try {
    *     const data = await httpRequest.get('/data');
    *     console.log('GET request data:', data);
    * } catch (error) {
    *     console.error('Error during GET request:', error);
    * }
    */
    async get(endpoint, options = {}) {
        return this.send(endpoint, { ...options, method: 'GET' });
    }

   /*📎DOCUMENTATION
    * Author:      ㊙️anonimo㊙️
    * Description: A method to send a POST request.
    * last modify: 2024-05-19
    * MethodName:  post
    * Parameters:  [required] endpoint ==============> the endpoint for the request
    *              [required] body ==================> the body of the request
    *              [optional][default = {}] options => additional fetch options
    * USAGE: ======================================================================
    * const httpRequest = new HttpRequest('https://api.example.com');
    * const postData = { name: 'John Doe', age: 30 };
    * try {
    *     const response = await httpRequest.post('/data', postData);
    *     console.log('POST request response:', response);
    * } catch (error) {
    *     console.error('Error during POST request:', error);
    * }    
    */ 
    async post(endpoint, body, options = {}) {
        return this.send(endpoint, { ...options, method: 'POST', body: JSON.stringify(body) });
    }

    /*📎DOCUMENTATION
    * Author:      ㊙️anonimo㊙️
    * Description: A method to send a PUT request.
    * last modify: 2024-05-19
    * MethodName:  put
    * Parameters:  [required] endpoint ==============> the endpoint for the request
    *              [required] body ==================> the body of the request
    *              [optional][default = {}] options => additional fetch options
    * USAGE: ======================================================================
    * const httpRequest = new HttpRequest('https://api.example.com');
    * const updateData = { name: 'John Doe', age: 31 };
    * try {
    *     const response = await httpRequest.put('/data/1', updateData);
    *     console.log('PUT request response:', response);
    * } catch (error) {
    *     console.error('Error during PUT request:', error);
    * }
    */ 
    async put(endpoint, body, options = {}) {
        return this.send(endpoint, { ...options, method: 'PUT', body: JSON.stringify(body) });
    }

    /*📎DOCUMENTATION
    * Author:      ㊙️anonimo㊙️
    * Description: A method to send a DELETE request.
    * last modify: 2024-05-19
    * MethodName:  delete
    * Parameters:  [required] endpoint ==============> the endpoint for the request
    *              [optional][default = {}] options => additional fetch options
    * USAGE: ====================================================================== 
    * const httpRequest = new HttpRequest('https://api.example.com');
    * try {
    *     const response = await httpRequest.delete('/data/1');
    *     console.log('DELETE request response:', response);
    * } catch (error) {
    *     console.error('Error during DELETE request:', error);
    * }
    */ 
    async delete(endpoint, options = {}) {
        return this.send(endpoint, { ...options, method: 'DELETE' });
    }

    /*📎DOCUMENTATION
    * Author:      ㊙️anonimo㊙️
    * Description: A generic method to send an HTTP request.
    * last modify: 2024-05-19
    * MethodName:  request
    * Parameters:  [required] endpoint => the endpoint for the request
    *              [optional] options  => additional fetch options
    */ 
    async send(endpoint, options) {
        const url = '${this.baseUrl}${endpoint}';
        const response = await fetch(url, {
            headers: { 'Content-Type': 'application/json', ...(options.headers || {}) },
            ...options
        });
        return response.json();
    }
}
