// SchemaObject.tsx
import React from 'react';
import SchemaProperty from './SchemaProperty';
import PropertyControls from './PropertyControls';

const SchemaObject = ({
  schema,
  onSchemaChange,
  path,
  level
}) => {
  const handleAddProperty = (path, newProperty) => {
    const newSchema = { ...schema };
    if (!newSchema.properties) {
      newSchema.properties = {};
    }

    newSchema.properties[newProperty.name] = newProperty.schema; // Use the schema from newProperty

    if (newProperty.isRequired) {
      if (!newSchema.required) {
        newSchema.required = [];
      }
      newSchema.required.push(newProperty.name);
    }

    onSchemaChange(path, newSchema);
  };

  const handleRemoveProperty = (path, propertyName) => {
    const newSchema = { ...schema };
    delete newSchema.properties[propertyName];
    newSchema.required = newSchema.required?.filter(name => name !== propertyName);
    onSchemaChange(path, newSchema);
  };

  const handleToggleRequired = (path, propertyName) => {
    const newSchema = { ...schema };
    if (newSchema.required?.includes(propertyName)) {
      newSchema.required = newSchema.required.filter(name => name !== propertyName);
    } else {
      if (!newSchema.required) {
        newSchema.required = [];
      }
      newSchema.required.push(propertyName);
    }
    onSchemaChange(path, newSchema);
  };

  const handleTypeChange = (path, propertyName, newSchemaForProperty) => {
    const newSchema = { ...schema };
    newSchema.properties[propertyName] = newSchemaForProperty;
    onSchemaChange(path, newSchema);
  };

  return (
    <div style={{ margin: '10px 0' }}>
      {Object.keys(schema.properties || {}).map((propertyName) => (
        <SchemaProperty
          key={propertyName}
          name={propertyName}
          schema={schema.properties[propertyName]}
          onRemove={handleRemoveProperty}
          onToggleRequired={handleToggleRequired}
          isRequired={schema.required?.includes(propertyName)}
          onTypeChange={handleTypeChange}
          onAddNestedProperty={handleAddProperty}
          onRemoveNestedProperty={handleRemoveProperty}
          onToggleNestedRequired={handleToggleRequired}
          path={path ? `${path}.${propertyName}` : propertyName}
          level={level}
        />
      ))}
      <PropertyControls
        onAdd={handleAddProperty}
        onRemove={handleRemoveProperty}
        onToggleRequired={handleToggleRequired}
        schemaPath={path}
        level={level}
        requiredFields={schema.required || []}
      />
    </div>
  );
};

export default SchemaObject;
