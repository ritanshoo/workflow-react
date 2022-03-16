import CaseSwitchNode from "../components/ColorSelectorNode";

export const connectionLineStyle = { stroke: '#fff' };

export const snapGrid = [20, 20];

export const nodeTypes = {
    caseSwitchNode: CaseSwitchNode,
};

export const starterEdges = [
    {
        id: 'e1-2',
        source: '1',
        target: '2',
        animated: true,
        style: { stroke: '#fff' },
    },
    {
        id: 'e2a-3',
        source: '2',
        target: '3',
        sourceHandle: 'a',
        animated: true,
        style: { stroke: '#fff' },
    },
    {
        id: 'e2b-4',
        source: '2',
        target: '4',
        sourceHandle: 'b',
        animated: true,
        style: { stroke: '#fff' },
    }
]

export const starterNodes = [
    {
        id: '1',
        type: 'input',
        data: { label: 'Data Generator' },
        position: { x: 0, y: 50 },
        sourcePosition: 'right',
    },
    {
        id: '2',
        type: 'caseSwitchNode',
        data: {  label: 'CASE Switch Data', color: "#FFF"},
        style: { border: '1px solid #777', padding: 10 },
        position: { x: 300, y: 50 },
    },
    {
        id: '3',
        type: 'output',
        data: { label: 'Cluster Assigner' },
        position: { x: 650, y: 50 },
        targetPosition: 'left',
    },
]

export const availableNodes = [
    'New Node',
    'A2 node',
    'input node',
    'text node',
    'select node',
    'test node',
    'block node',
]