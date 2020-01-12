import React from "react";
import PropTypes from "prop-types";
import {
  InteractiveForceGraph,
  ForceGraphNode,
  ForceGraphLink
} from "react-vis-force";

const ProblemGraph = ({ graphData, getSubmission }) => {
  const prepareNodes = graphData => {
    const nodes = Object.assign([], graphData.nodes);
    const root = Object.assign({}, graphData.root);
    nodes.push(root);

    return nodes.map(node => {
      return {
        id: `${node.type}-${node.pk}`,
        label: node.pk,
        type: node.type
      };
    });
  };

  const prepareEdges = graphData => {
    return graphData.edges.map(edge => {
      return [
        `${edge.start_type}-${edge.start}`,
        `${edge.end_type}-${edge.end}`
      ];
    });
  };

  const handleSelectNode = (pk, type) => {
    //show panel with details isRoot ?
    console.log(pk, type);
    getSubmission(pk, type);
  };

  return (
    <div>
      <InteractiveForceGraph
        simulationOptions={{ height: 300, width: 300 }}
        labelAttr="label"
        onSelectNode={(event, node) => handleSelectNode(node.pk, node.type)}
        highlightDependencies
      >
        {prepareNodes(graphData).map(node => {
          // TODO: size + color depends on the metric value!
          return (
            <ForceGraphNode
              node={{
                id: node.id,
                label: node.label,
                pk: node.label,
                type: node.type
              }}
              fill="red"
            />
          );
        })}

        {prepareEdges(graphData).map(edge => {
          return <ForceGraphLink link={{ source: edge[0], target: edge[1] }} />;
        })}
      </InteractiveForceGraph>
    </div>
  );
};

ProblemGraph.propTypes = {};

export default ProblemGraph;
