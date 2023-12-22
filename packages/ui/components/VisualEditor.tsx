// VisualEditor.tsx
import React, { useState, useEffect } from 'react';
import SchemaObject from './SchemaObject';

export const VisualEditor = ({ schema, onSchemaChange }) => {
    const [schemaObject, setSchemaObject] = useState({ type: 'object', properties: {}, required: [] });

    useEffect(() => {
        try {
            const parsedSchema = JSON.parse(schema);
            setSchemaObject(parsedSchema);
        } catch (e) {
            console.error('Invalid JSON schema:', e);
        }
    }, [schema]);

    const handleSchemaChange = (path, newPropertySchema) => {
        const paths = path.split('.').filter(p => p);
        let currentSchema = schemaObject;

        // Traverse the schema to find the right place to apply the changes
        for (let i = 0; i < paths.length; i++) {
            if (i === paths.length - 1) {
                currentSchema.properties[paths[i]] = newPropertySchema;
            } else {
                currentSchema = currentSchema.properties[paths[i]];
            }
        }

        // Update the state and the parent component
        setSchemaObject({ ...schemaObject });
        onSchemaChange(JSON.stringify(schemaObject, null, 2));
    };

    return (
        <div className="visual-editor">
            <h2>Visual Editor</h2>
            <SchemaObject
                schema={schemaObject}
                onSchemaChange={handleSchemaChange}
                path=""
                level={0}
            />
        </div>
    );
};

export default VisualEditor;
