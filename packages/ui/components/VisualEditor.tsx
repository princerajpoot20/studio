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

    const handleSchemaChange = (newSchema) => {
        setSchemaObject(newSchema);
        onSchemaChange(JSON.stringify(newSchema, null, 2));
    };

    return (
        <div className="visual-editor">
            <h2>Visual Editor</h2>
            <SchemaObject
                schema={schemaObject}
                path=""
                onSchemaChange={handleSchemaChange}
                level={0}
            />
        </div>
    );
};

export default VisualEditor;