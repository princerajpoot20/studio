import React, { useState } from 'react';
import { VisualEditor, CodeEditor, Examples } from '@asyncapi/studio-ui';

// visualeditor.stories.tsx
// import React, { useState } from 'react';
// import VisualEditor from './VisualEditor'; // Update the import path as needed
// import CodeEditor from './CodeEditor'; // Update the import path as needed

export default {
  title: 'SchemaEditor/VisualEditor',
  component: VisualEditor,
  parameters: {
    layout: 'fullscreen',
  },
};

const Template = ({ initialSchema }) => {
  const [schema, setSchema] = useState(initialSchema);
  const [editorType, setEditorType] = useState('visual'); // 'visual' or 'code'

  return (
    <div>
      <div style={{ marginBottom: 10 }}>
        <button onClick={() => setEditorType('visual')}>Visual Editor</button>
        <button onClick={() => setEditorType('code')}>Code Editor</button>
      </div>
      <div>
        {editorType === 'visual' && (
          <VisualEditor schema={schema} onSchemaChange={setSchema} />
        )}
        {editorType === 'code' && (
          <CodeEditor schema={schema} onSchemaChange={setSchema} />
        )}
      </div>
    </div>
  );
};

export const DefaultView = () => <Template initialSchema="{}" />;

export const WithSampleSchema = () => (
  <Template
    initialSchema={JSON.stringify({
      type: "object",
      properties: {
        firstName: { type: "string" },
        lastName: { type: "string" },
        age: { type: "integer" },
        address: {
          type: "object",
          properties: {
            street: { type: "string" },
            city: { type: "string" }
          },
          required: ["street", "city"]
        }
      },
      required: ["firstName", "lastName"]
    }, null, 2)}
  />
);

export const SingleProperty = () => (
  <Template
    initialSchema={JSON.stringify({
      "type": "string"
  }, null, 2)}
  />
);

export const WithObject = () => (
  <Template
    initialSchema={JSON.stringify({
      "type": "object",
      "properties": {
        "firstName": {
          "type": "string"
        },
        "lastName": {
          "type": "string"
        },
        "age": {
          "type": "integer"
        },
        "address": {
          "type": "object",
          "properties": {
            "street": {
              "type": "string"
            },
            "city": {
              "type": "string"
            }
          },
          "required": [
            "street",
            "city"
          ]
        }
      },
      "required": [
        "firstName",
        "lastName"
      ]
    }, null, 2)}
  />
);





export const WithArray_obj_and_obj = () => (
  <Template
    initialSchema={JSON.stringify({
      "type": "object",
      "properties": {
        "books": {
          "type": "array",
          "items": {
            "type": "object",
            "properties": {
              "title": {
                "type": "string"
              },
              "author": {
                "type": "string"
              }
            },
  
            "required": [ "title"]
          }
        },
        "list": {
              "type": "object",
              "properties": {
                  "hii": {
                    "type": "string"
                  }
              }
          }
      }
    }, null, 2)}
  />
);