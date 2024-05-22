const Json = {
    serialize: (obj) => {
        return JSON.stringify(obj);
    },
    deserialize: (jsonString) => {
        try {
            const parsedObject = JSON.parse(jsonString);
            if (typeof parsedObject === 'object' && parsedObject !== null) {
                return parsedObject;
            } else {
                throw new Error('Invalid JSON format');
            }
        } catch (error) {
            console.error('Failed to deserialize JSON string:', error);
            return null;
        }
    }
};

export default json;
