// CodeEditor.tsx
import React, { useState, useEffect } from 'react';

export const CodeEditor = ({ schema, onSchemaChange }) => {
    const [value, setValue] = useState(schema);
    const [error, setError] = useState('');

    useEffect(() => {
        setValue(schema);
    }, [schema]);

    const handleChange = (event) => {
        const newValue = event.target.value;
        setValue(newValue);

        try {
            const parsedSchema = JSON.parse(newValue);
            setError('');
            onSchemaChange(JSON.stringify(parsedSchema, null, 2)); // Update the schema in a standardized format
        } catch (e) {
            if (e instanceof SyntaxError) {
                setError('Invalid JSON: ' + e.message);
            } else {
                setError('An error occurred: ' + e.message);
            }
        }
    };

    return (
        <div className="code-editor">
            <h2>Code Editor</h2>
            <textarea
                value={value}
                onChange={handleChange}
                style={{ width: '100%', height: '400px' }} // Adjust size as needed
            />
            {error && <p style={{ color: 'red' }}>{error}</p>}
        </div>
    );
};

export default CodeEditor;
