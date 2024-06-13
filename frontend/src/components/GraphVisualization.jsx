import { useEffect, useRef } from "react";
import * as d3 from "d3";

const GraphVisualization = ({ data, setNodeDetails }) => {
  const svgRef = useRef(null);

  useEffect(() => {
    if (!data || data.length === 0) {
      return;
    }

    const width = 800;
    const height = 800;

    d3.select(svgRef.current).selectAll("*").remove();

    const svg = d3
      .select(svgRef.current)
      .attr("width", width)
      .attr("height", height)
      .style("background-color", "white")
      .call(d3.zoom().scaleExtent([0.5, 5]).on("zoom", zoomed));

    const linkColor = "black";
    let paperNodeColor = "#DaB495";
    paperNodeColor = d3.color(paperNodeColor);
    paperNodeColor.opacity = 0.5;
    paperNodeColor = paperNodeColor.formatHex();
    const topicNodeColor = "#c1793f";
    const nodeHoverColor = "gray";

    const nodes = data
      .map(({ topic, paper }) => ({
        id: topic.elementId,
        type: "topic",
        ...topic,
      }))
      .concat(
        data.map(({ paper }) => ({
          id: paper.elementId,
          type: "paper",
          ...paper,
        }))
      );

    const links = data.map(({ topic, paper }) => ({
      source: nodes.find((node) => node.id === topic.elementId),
      target: nodes.find((node) => node.id === paper.elementId),
    }));

    const connectedNodes = nodes.filter((node) =>
      links.some((link) => link.source === node || link.target === node)
    );

    const filteredLinks = links.filter(
      (link) =>
        connectedNodes.includes(link.source) && connectedNodes.includes(link.target)
    );

    const simulation = d3
      .forceSimulation(connectedNodes)
      .force("charge", d3.forceManyBody().strength(-500))
      .force(
        "link",
        d3
          .forceLink(filteredLinks)
          .id((d) => d.id)
          .distance(200)
          .strength(1)
      )
      .force("center", d3.forceCenter(width / 2, height / 2))
      .force(
        "x",
        d3
          .forceX(width / 2)
          .strength(0.07)
      )
      .force(
        "y",
        d3
          .forceY(height / 2)
          .strength(0.07)
      )
      .force(
        "collide",
        d3.forceCollide().radius(50).iterations(5)
      );

    const linkCurveGenerator = d3
      .linkHorizontal()
      .x((d) => d.x)
      .y((d) => d.y)
      .context(window.null); // Set the context to null to disable bundling

    const link = svg
      .append("g")
      .attr("class", "links")
      .selectAll(".link")
      .data(filteredLinks)
      .enter()
      .append("path")
      .attr("class", "link")
      .attr("stroke", linkColor)
      .attr("fill", "none")
      .attr("d", (d) => linkCurveGenerator(d));

    const node = svg
      .append("g")
      .attr("class", "nodes")
      .selectAll(".node")
      .data(connectedNodes)
      .enter()
      .append("g")
      .attr("class", "node");

    node
      .append("circle")
      .attr("r", 30)
      .attr("fill", (d) =>
        d.type === "paper" ? paperNodeColor : topicNodeColor
      )
      .attr("stroke", "white")
      .attr("stroke-width", 2)
      .on("mouseenter", function (event, d) {
        d3.select(this)
          .attr("data-original-color", d3.select(this).attr("fill"))
          .attr("fill", nodeHoverColor)
          .style("cursor", "pointer");
      })
      .on("mousemove", function (event, d) {
        d3.select(this)
          .attr("fill", nodeHoverColor)
          .style("cursor", "pointer");
      })
      .on("mouseleave", function (event, d) {
        d3.select(this)
          .attr("fill", d3.select(this).attr("data-original-color"))
          .style("cursor", "default");
      });

    node
      .append("title")
      .text((d) =>
        d.type === "paper" ? d.properties.title : d.properties.name
      );

    node
      .append("text")
      .attr("dy", ".35em")
      .attr("text-anchor", "middle")
      .style("font-size", "12px")
      .text((d) =>
        d.type === "paper"
          ? getShortTitle(d.properties.title)
          : getShortTitle(d.properties.name)
      );

    simulation.on("tick", () => {
      link.attr("d", (d) => linkCurveGenerator(d));
      node.attr("transform", (d) => `translate(${d.x}, ${d.y})`);
    });

    function handleNodeClick(event, d) {
      if (d.type === "paper") {
        const paperDetails = data.find((item) => item.paper.elementId === d.id);
        console.log("Paper details:", paperDetails.paper);
        setNodeDetails(paperDetails);
      }
    }

    node.on("click", handleNodeClick);

    function zoomed({ transform }) {
      svg.selectAll(".nodes").attr("transform", transform);
      svg.selectAll(".links").attr("transform", transform);
    }

    function getShortTitle(title) {
      return title.length > 5 ? title.substring(0, 5) + "..." : title;
    }

    return () => {
      simulation.stop();
    };
  }, [data]);

  return <svg ref={svgRef}></svg>;
};

export default GraphVisualization;