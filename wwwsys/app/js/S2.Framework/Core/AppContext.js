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

// Define the global AppContext
const AppContext = {
    appServices: [],
    appProperties: [],
    appNeedRefresh: false,
    appStatus: null,
    addService(service)       { this.appServices.push(service); },
    addProperty(property)     { this.appProperties.push(property); },
    getService(serviceName)   { return this.appServices.find(service => service.name === serviceName); },
    getProperty(propertyName) { return this.appProperties.find(property => property.name === propertyName); }
};

export { AppContext };
