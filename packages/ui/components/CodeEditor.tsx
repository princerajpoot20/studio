// CodeEditor.tsx
import React, { useState, useEffect } from 'react';
import _ from 'lodash';
import debounce from 'lodash/debounce';

interface CodeEditorProps {
  schema: string;
  onSchemaChange: (newSchema: string) => void;
}

export const CodeEditor: React.FC<CodeEditorProps> = ({ schema, onSchemaChange }) => {
  const [value, setValue] = useState<string>(schema);
  const [error, setError] = useState<string>('');

  useEffect(() => {
    setValue(schema);
    setError('');
  }, [schema]);

  const handleChange = debounce((newValue: string) => {
    try {
      const parsed = JSON.parse(newValue);
      setError('');
      onSchemaChange(newValue);
      console.log('Schema valid and updated from Code Editor:', newValue);
    } catch (e) {
      if (_.isError(e)) {
        setError(`Invalid JSON: ${e.message}`);
        console.error('Error updating schema from Code Editor:', e.message);
      }
    }
  }, 250);

  const handleTextAreaChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const newValue = e.target.value;
    setValue(newValue);
    handleChange(newValue);
  };

  return (
    <div className="code-editor">
      <h2>Code Editor</h2>
      {error && <p style={{ color: 'red' }}>Error: {error}</p>}
      <textarea
        value={value}
        onChange={handleTextAreaChange}
        style={{ width: '100%', height: '400px' }}
      />
    </div>
  );
};

export default CodeEditor;
