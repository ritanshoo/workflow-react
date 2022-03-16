import React, { useState, useEffect, useCallback } from 'react';
import ReactFlow, { useNodesState, useEdgesState, addEdge, MiniMap, Controls } from 'react-flow-renderer';
import {
    connectionLineStyle, snapGrid,
    nodeTypes, starterEdges, starterNodes, availableNodes
} from "../../utilities";
import "./style.css"


const WorkFlow = (props)=>{
    const [nodes, setNodes, onNodesChange] = useNodesState([]);
    const [edges, setEdges, onEdgesChange] = useEdgesState([]);
    const [bgColor, setBgColor] = useState("#1A192B");
    const [newNode, setNewNode] = useState("");
    const [predictions,setPredictions] = useState([])

    useEffect(() => {
        setNodes(starterNodes);
        setEdges(starterEdges);
    }, []);

    const onConnect = useCallback(
        (params) => setEdges((eds) => addEdge({ ...params, animated: true, style: { stroke: '#fff' } }, eds)),
        []
    );

    function getPredictions(value) {
        return availableNodes.filter(item => item.toLowerCase().indexOf(value.toLowerCase()) !== -1);
    }

    const onAdd = useCallback((nodelabel) => {
        const newNode = {
            id: `randomnode_${+new Date()}`,
            data: { label: nodelabel },
            position: {
                x: 400,
                y: 200,
            },
        };
        setNodes((nds) => nds.concat(newNode));
    }, [setNodes]);

    const handleNewNodeSelect = (value)=>{
        setNewNode(value);
        setPredictions([])
        onAdd(value)
    }

    function onChange(e) {
        clearTimeout(timeout);
        const value = e.target.value;
        setNewNode(value)
        if (value.length > 0) {
            var timeout = setTimeout(() => {
                const predictions = getPredictions(value);
                setPredictions(predictions)
            }, 250);
        } else {
            setPredictions([])
        }
    }

    return(
        <React.Fragment>
            <div className="w-100 mt-5 ">
                <div className=" p-3 p-md-5">
                    <div className=" border-custom  m-auto">
                        <div className="mx-auto w-75 mt-5 w-md-50 my-4">
                            <input
                                placeholder={"Add new node ...."}
                                type="text"
                                className="form-control"
                                onChange={onChange}
                                value={newNode}
                            />
                            <div className="bg-white ">
                                {
                                    predictions.map((item, index) => (
                                        <div
                                            className="form-control hoverable-custom border "
                                            key={index + item}
                                            onClick={(e)=>{
                                                e.preventDefault();
                                                handleNewNodeSelect(item)
                                            }}
                                        >
                                            {item}
                                        </div>
                                    ))
                                }
                            </div>
                        </div>
                        <ReactFlow
                            nodes={nodes}
                            edges={edges}
                            onNodesChange={onNodesChange}
                            onEdgesChange={onEdgesChange}
                            onConnect={onConnect}
                            style={{ background: bgColor }}
                            nodeTypes={nodeTypes}
                            connectionLineStyle={connectionLineStyle}
                            snapToGrid={true}
                            snapGrid={snapGrid}
                            defaultZoom={1.5}
                            fitView
                            attributionPosition="bottom-left"
                        >
                            <MiniMap
                                nodeStrokeColor={(n) => {
                                    if (n.type === 'input') return '#0041d0';
                                    if (n.type === 'caseSwitchNode') return bgColor;
                                    if (n.type === 'output') return '#ff0072';
                                }}
                                nodeColor={(n) => {
                                    if (n.type === 'selectorNode') return bgColor;
                                    return '#fff';
                                }}
                            />
                            <Controls />
                        </ReactFlow>
                    </div>
                </div>
            </div>
        </React.Fragment>
    )
}
export default WorkFlow;
