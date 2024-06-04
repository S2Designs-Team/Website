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
* Description: Custom method that gets a more specific type
*              typeof is very useful, but it's not as versatile as might be required. For example, typeof [] is "object", as well as typeof new Date(), typeof /abc/, etc.
*              For greater specificity in checking types, here we present a custom type(value) function, which mostly mimics the behavior of typeof, but for non-primitives 
*              (i.e. objects and functions), it returns a more granular type name where possible.
* last modify: 2024-05-20
* ClassName:   TypeOfCheck
* Version:     0.0.001
*/
export class TypeOfCheck {

    /*📎DOCUMENTATION
    * Author:      ㊙️anonimo㊙️
    * Description: Static method that returns the most specific type of a value.
    * last modify: 2024-05-19
    * MethodName:  type
    * Parameters:  [required] value ==============> the value to check.
    */ 
    static type(value) {
        
        /*
        * If the value is null, return "null"
        */
        if (value === null) {
            return "null";
        }
        
        /*
        * Get the base type of the value
        */
        const baseType = typeof value;
        
        /* 
        * If the base type is not "object" or "function", return the base type
        */
        if (!["object", "function"].includes(baseType)) {
            return baseType;
        }
        
        /*
        * If the base type is a function
        */
        if (baseType === "function") {
            /*
            * Check if it's a class
            */
            if (value.toString().startsWith("class")) {
                return "class";
            }
            /*
            * Otherwise, return "function"
            */
            return "function";
        }
        
        /*
        * Get the string representation of the object's type using Symbol.toStringTag
        */
        const tag = Object.prototype.toString.call(value);
        /*
        * If the object is a plain object, return "object"
        */
        if (tag === "[object Object]") {
            return "object";
        }
        
        /*
        * Get the constructor name of the object
        */
        const className = value.constructor ? value.constructor.name : "";
        
        /*
        * If the constructor name is defined, return the constructor name
        */
        if (className) {
            return className;
        }
        
        /*
        * If it fails to determine the type, return the base type
        */
        return baseType;
    }
}
