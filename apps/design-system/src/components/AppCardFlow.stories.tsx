import { StoryObj, Meta } from '@storybook/react';
import { AppCard } from '@asyncapi/studio-ui';
import ReactFlow, {
  ReactFlowProvider,
  useNodesState,
  useEdgesState,
  addEdge,
  Handle,
  MarkerType,
  EdgeLabelRenderer,
} from 'reactflow';

// CardType1 Node
const CardType1 = ({ data }) => (
  <>
    <Handle type="target" position="left" style={{ borderRadius: '50%' }} />
    <AppCard
      name={data.name}
      description={data.description}
      isServer={data.isServer}
      isClient={data.isClient}
      badges={data.badges}
    />
    <Handle type="source" position="right" style={{ borderRadius: '50%' }} />
  </>
);

// CardType2 Node
const CardType2 = ({ data }) => (
  <>
    <Handle type="target" position="left"  />
    <AppCard
      name={data.name}
      description={data.description}
      isServer={data.isServer}
      isClient={data.isClient}
      badges={data.badges}
    />
    <Handle type="source" position="right" style={{ borderRadius: '50%' }} />
  </>
);

const meta: Meta<typeof AppCardInteraction> = {
  component: AppCardInteraction,
  parameters: {
    backgrounds: {
      default: 'dark'
    }
  },
};

export default meta;

type Story = StoryObj<typeof AppCardInteraction>;

export const BasicInteraction: Story = {
  args: {
    initialNodes: [
      {
        id: '1',
        type: 'CardType1',
        data: {
          name: 'User SignedUp Reply',
          description: 'A reply',
          badges: [],
          isServer: false,
          isClient: false,
        },
        position: { x: 10, y: 100 },
      },
      {
        id: '2',
        type: 'CardType2',
        data: {
          name: 'Production Kafka Broker',
          description: 'From the `reply-to` header',
          badges: ['kafka'],
          isServer: false,
          isClient: false,
        },
        position: { x: 400, y: 100 },
      },
    ],
    initialEdges: [
      { id: 'e1-2', source: '1', target: '2', arrowHeadType: 'arrow' , label: '  ', 
        markerEnd: {
          type: MarkerType.ArrowClosed,
        }
      }, 
    ],
    
  },
};

function AppCardInteraction({ initialNodes, initialEdges }) {
  const [nodes, setNodes, onNodesChange] = useNodesState(initialNodes);
  const [edges, setEdges, onEdgesChange] = useEdgesState(initialEdges);

  const onConnect = (params) => setEdges((eds) => addEdge({ ...params, arrowHeadType: ArrowHeadType.Arrow }, eds));

  return (
    <ReactFlowProvider>
      <ReactFlow
        nodes={nodes}
        edges={edges}
        onNodesChange={onNodesChange}
        onEdgesChange={onEdgesChange}
        onConnect={onConnect}
        nodeTypes={{ CardType1: CardType1, CardType2: CardType2 }} // Register your custom nodes
      />
    </ReactFlowProvider>
  );
}
