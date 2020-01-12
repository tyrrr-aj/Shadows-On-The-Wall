import React from "react";
import PropTypes from "prop-types";
import {
  InteractiveForceGraph,
  ForceGraphNode,
  ForceGraphLink
} from "react-vis-force";

const graphData = {
  root: {
    pk: 1,
    votes: 0,
    date: "Sat Jan 11 19:50:36 2020"
  },
  nodes: [
    {
      pk: 10,
      votes: 2,
      date: "Sat Jan 11 19:21:47 2020"
    },
    {
      pk: 11,
      votes: 0,
      date: "Sat Jan 11 19:23:12 2020"
    }
  ],
  edges: [
    {
      source: 1,
      end: 10
    },
    {
      source: 1,
      end: 11
    }
  ]
};

const InitiativeGraph = props => {
  const prepareNodes = graphData => {
    const nodes = Object.assign([], graphData.nodes);
    const root = Object.assign({}, graphData.root);
    nodes.push(root);

    return nodes.map(node => {
      return {
        pk: node.pk,
        label: node.pk
      };
    });
  };

  const prepareEdges = graphData => {
    return graphData.edges.map(edge => {
      return [edge.source, edge.end];
    });
  };

  const handleSelectNode = pk => {
    //show panel with details?
  };

  return (
    <div>
      <InteractiveForceGraph
        simulationOptions={{ height: 300, width: 300 }}
        labelAttr="label"
        onSelectNode={node => console.log(node)}
        highlightDependencies
      >
        {prepareNodes(graphData).map(node => {
          // TODO: size + color depends on the metric value!
          return (
            <ForceGraphNode
              onSelectNode={() => handleSelectNode(node.pk)}
              node={{ pk: node.pk, label: node.label }}
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

InitiativeGraph.propTypes = {};

export default InitiativeGraph;
