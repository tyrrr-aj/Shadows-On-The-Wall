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
    type: "problem",
    votes: 0,
    date: "Sat Jan 11 19:50:36 2020"
  },
  nodes: [
    {
      pk: 10,
      type: "solution",
      votes: 2,
      date: "Sat Jan 11 19:21:47 2020"
    },
    {
      pk: 11,
      type: "solution",
      votes: 0,
      date: "Sat Jan 11 19:23:12 2020"
    }
  ],
  edges: [
    {
      source_type: "problem",
      source: 1,
      end_type: "solution",
      end: 10
    },
    {
      source_type: "problem",
      source: 1,
      end_type: "solution",
      end: 11
    }
  ]
};

const ProblemGraph = props => {
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
        `${edge.source_type}-${edge.source}`,
        `${edge.end_type}-${edge.end}`
      ];
    });
  };

  const handleSelectNode = (id, type) => {
    //show panel with details isRoot ?
  };

  return (
    <div>
      Problem grap h
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
              onSelectNode={() => handleSelectNode(node.id, node.type)}
              node={{ id: node.id, label: node.label }}
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
