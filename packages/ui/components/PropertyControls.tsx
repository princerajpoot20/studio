// PropertyControls.tsx
import React, { useState } from 'react';

const PropertyControls = ({ onAdd, onRemove, onToggleRequired, schemaPath, level, requiredFields }) => {
  const [key, setKey] = useState('');
  const [type, setType] = useState('');
  const [isPropertyRequired, setIsPropertyRequired] = useState(false);
  const [error, setError] = useState('');
  const [itemType, setItemType] = useState('');

  const handleAddProperty = () => {
    if (!key) {
      setError('Property name is required.');
      return;
    }
    if (!type) {
      setError('Property type is required.');
      return;
    }

    let propertySchema = { type };
    if (type === 'array') {
      propertySchema.items = { type: itemType || 'string' }; // Default to string if not specified
    }

    const newProperty = {
      name: key,
      schema: propertySchema,
      isRequired: isPropertyRequired
    };

    // Clear fields and errors
    setKey('');
    setType('');
    setIsPropertyRequired(false);
    setError('');

    onAdd(schemaPath, newProperty);
  };

  const handleTypeChange = (event) => {
    setType(event.target.value);

    // Automatically set or unset required based on type
    if (event.target.value === 'object' || event.target.value.startsWith('array')) {
      setIsPropertyRequired(true);
    } else {
      setIsPropertyRequired(false);
    }
  };

  const handleRemoveProperty = (propertyName) => {
    onRemove(schemaPath, propertyName);
  };

  const handleToggleRequired = (propertyName) => {
    onToggleRequired(schemaPath, propertyName);
  };

  return (
    <div style={{ marginLeft: `${level * 20}px` }}>
      <div>
        <input
          type="text"
          value={key}
          onChange={(e) => setKey(e.target.value)}
          placeholder="Property name"
        />
        <select value={type} onChange={handleTypeChange}>
          <option value="">Select type</option>
          <option value="string">String</option>
          <option value="number">Number</option>
          <option value="boolean">Boolean</option>
          <option value="object">Object</option>
          <option value="array">Array</option>
        </select>
        {type === "array" && (
        <select value={itemType} onChange={(e) => setItemType(e.target.value)}>
          <option value="">Select item type</option>
          <option value="string">String</option>
          <option value="number">Number</option>
          <option value="boolean">Boolean</option>
          <option value="object">Object</option>
        </select>
      )}
        <button onClick={handleAddProperty}>Add Property</button>
      </div>
      {error && <p style={{ color: 'red' }}>{error}</p>}
      <div>
        {requiredFields.map((fieldName, index) => (
          <div key={index}>
            <span>{fieldName}</span>
            <button onClick={() => handleRemoveProperty(fieldName)}>Remove</button>
            <button onClick={() => handleToggleRequired(fieldName)}>
              Toggle Required
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default PropertyControls;
