import { useEffect, useRef } from "react";
import * as d3 from "d3";

const GraphVisualization = ({ data, setNodeDetails }) => {
  const svgRef = useRef(null);

  useEffect(() => {
    if (!data || data.length === 0) {
      return;
    }

    const width = 1000;
    const height = 800;

    // Remove any existing SVG elements before appending
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
    const nodeHoverColor = "gray"; // Color for node hover effect

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

    const simulation = d3
      .forceSimulation(nodes)
      .force("charge", d3.forceManyBody().strength(-200))
      .force(
        "link",
        d3
          .forceLink(links)
          .id((d) => d.id)
          .distance(150)
      )
      .force("center", d3.forceCenter(width / 2, height / 2));

    const link = svg
      .append("g")
      .attr("class", "links")
      .selectAll(".link")
      .data(links)
      .enter()
      .append("line")
      .attr("class", "link")
      .attr("stroke", linkColor);

    const node = svg
      .append("g")
      .attr("class", "nodes")
      .selectAll(".node")
      .data(nodes)
      .enter()
      .append("g")
      .attr("class", "node")
      .call(
        d3
          .drag()
          .on("start", dragstarted)
          .on("drag", dragged)
          .on("end", dragended)
      );

    node
      .append("circle")
      .attr("r", 30)
      .attr("fill", (d) =>
        d.type === "paper" ? paperNodeColor : topicNodeColor
      )
      .attr("stroke", "white")
      .attr("stroke-width", 2)
      .on("mouseenter", function (event, d) {
        // Store the original color in a data attribute
        d3.select(this)
          .attr("data-original-color", d3.select(this).attr("fill"))
          .attr("fill", nodeHoverColor) // Change node color on hover
          .style("cursor", "pointer"); // Change cursor to pointer
      })
      .on("mousemove", function (event, d) {
        d3.select(this)
          .attr("fill", nodeHoverColor) // Ensure node remains hover color
          .style("cursor", "pointer"); // Ensure cursor remains pointer
      })
      .on("mouseleave", function (event, d) {
        // Restore the original color from the data attribute
        d3.select(this)
          .attr("fill", d3.select(this).attr("data-original-color"))
          .style("cursor", "default"); // Change cursor back to default
      })
      .on("mouseout", function (event, d) {
        // Ensure original color is reset from the data attribute
        d3.select(this)
          .attr("fill", d3.select(this).attr("data-original-color"))
          .style("cursor", "default"); // Change cursor back to default
      });

    // Add tooltip for hover
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
      link
        .attr("x1", (d) => d.source.x)
        .attr("y1", (d) => d.source.y)
        .attr("x2", (d) => d.target.x)
        .attr("y2", (d) => d.target.y);

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

    function dragstarted(event, d) {
      if (!event.active) simulation.alphaTarget(0.3).restart();
      d.fx = d.x;
      d.fy = d.y;
    }

    function dragged(event, d) {
      d.fx = event.x;
      d.fy = event.y;
    }

    function dragended(event, d) {
      if (!event.active) simulation.alphaTarget(0);
      d.fx = null;
      d.fy = null;
    }

    function zoomed({ transform }) {
      svg.selectAll(".nodes").attr("transform", transform);
      svg.selectAll(".links").attr("transform", transform);
    }

    // Function to get short title
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
