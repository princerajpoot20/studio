// VisualEditor.tsx 
import React, { useState, useEffect } from 'react';
import SchemaObject from './SchemaObject';
import PropertyControls from './PropertyControls';

export const VisualEditor = ({ schema, onSchemaChange }) => {
    const [schemaObject, setSchemaObject] = useState({});

    useEffect(() => {
        try {
            const parsedSchema = JSON.parse(schema);
            setSchemaObject(parsedSchema);
        } catch (e) {
            console.error('Invalid JSON schema:', e);
        }
    }, [schema]);

    const handleSchemaChange = (path, newSchema) => {
        let updatedSchema = { ...schemaObject };

        if (path) {
            const pathParts = path.split('.');
            let current = updatedSchema;

            for (let i = 0; i < pathParts.length - 1; i++) {
                current = current[pathParts[i]] || {};
            }

            current[pathParts[pathParts.length - 1]] = newSchema;
        } else {
            updatedSchema = newSchema;
        }

        setSchemaObject(updatedSchema);
        onSchemaChange(JSON.stringify(updatedSchema, null, 2));
        console.log(`Schema updated. Path: ${path}, New Schema:`, JSON.stringify(newSchema, null, 2));
        console.log('Updated Schema Object:', JSON.stringify(updatedSchema, null, 2));
    };


    const renderRootTypeSelector = () => {
        return (
            <div>
                <strong>Root Type:</strong>
                <select
                    value={schemaObject.type || ''}
                    onChange={(e) => handleSchemaChange('', { type: e.target.value, properties: {}, required: [] })}
                >
                    <option value="">Select type</option>
                    <option value="object">Object</option>
                    <option value="array">Array</option>
                    <option value="string">String</option>
                    <option value="number">Number</option>
                    <option value="boolean">Boolean</option>
                </select>
            </div>
        );
    };

    const renderArrayItemTypeSelector = () => {
        if (schemaObject.type === 'array') {
            return (
                <div>
                    <strong>Array Item Type:</strong>
                    <select
                        value={schemaObject.items?.type || ''}
                        onChange={(e) => handleSchemaChange('', { ...schemaObject, items: { type: e.target.value } })}
                    >
                        <option value="">Select item type</option>
                        <option value="string">String</option>
                        <option value="number">Number</option>
                        <option value="boolean">Boolean</option>
                        <option value="object">Object</option>
                        <option value="array">Array</option>
                    </select>
                </div>
            );
        }
        return null;
    };

    return (
        <div className="visual-editor">
            <h2>Visual Editor</h2>
            {renderRootTypeSelector()}
            {renderArrayItemTypeSelector()}

            {/* Render SchemaObject or PropertyControls based on root type */}
            {schemaObject.type === 'object' && (
                <SchemaObject
                    schema={schemaObject}
                    onSchemaChange={handleSchemaChange}
                    path=""
                    level={0}
                />
            )}

            {schemaObject.type === 'array' && schemaObject.items?.type === 'object' && (
                <SchemaObject
                    schema={schemaObject.items}
                    onSchemaChange={(newItemsSchema) => handleSchemaChange('', { ...schemaObject, items: newItemsSchema })}
                    path="items"
                    level={1}
                />
            )}
        </div>
    );
};

export default VisualEditor;