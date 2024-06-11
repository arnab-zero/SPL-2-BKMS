import { useState, useEffect } from "react";
import { Bar, Line, Pie } from "react-chartjs-2";
import "chart.js/auto";

const Statistics = () => {
  const [data, setData] = useState([]);
  const [selectedYear, setSelectedYear] = useState(2023);
  const [selectedTopics, setSelectedTopics] = useState([]);

  useEffect(() => {
    fetch("/api/data")
      .then((response) => response.json())
      .then((data) => setData(data))
      .catch((error) => console.error("Error fetching data:", error));
  }, []);

  const getTopTopics = (year) => {
    const topicCounts = {};
    data.forEach((item) => {
      const { topic, paper } = item;
      const publicationYear = new Date(
        paper.properties.publicationDate
      ).getFullYear();
      if (publicationYear === year) {
        const topicName = topic.properties.name;
        topicCounts[topicName] = (topicCounts[topicName] || 0) + 1;
      }
    });
    return Object.entries(topicCounts)
      .sort((a, b) => b[1] - a[1])
      .slice(0, 10);
  };

  const topTopics = getTopTopics(selectedYear);

  const barChartData = {
    labels: topTopics.map(([topic]) => topic),
    datasets: [
      {
        label: `Top Topics in ${selectedYear}`,
        data: topTopics.map(([_, count]) => count),
        backgroundColor: "rgba(54, 162, 235, 0.5)",
      },
    ],
  };

  const lineChartData = {
    labels: Array.from({ length: 20 }, (_, i) => 2023 - i),
    datasets: selectedTopics.map((topic) => ({
      label: topic,
      data: Array.from({ length: 20 }, (_, i) => {
        const year = 2023 - i;
        const count = data.filter(
          (item) =>
            item.topic.properties.name === topic &&
            new Date(item.paper.properties.publicationDate).getFullYear() ===
              year
        ).length;
        return count;
      }),
      fill: false,
      borderColor: `rgba(${Math.floor(Math.random() * 256)}, ${Math.floor(
        Math.random() * 256
      )}, ${Math.floor(Math.random() * 256)}, 1)`,
    })),
  };

  const pieChartData = {
    labels: data.map((item) => item.topic.properties.name),
    datasets: [
      {
        data: data.map((item) => item.paper.properties.authors.length),
        backgroundColor: data.map(
          () =>
            `rgba(${Math.floor(Math.random() * 256)}, ${Math.floor(
              Math.random() * 256
            )}, ${Math.floor(Math.random() * 256)}, 0.5)`
        ),
      },
    ],
  };

  const handleYearChange = (event) => {
    setSelectedYear(parseInt(event.target.value));
  };

  const handleTopicChange = (event) => {
    const options = event.target.options;
    const selectedOptions = Array.from(options)
      .filter((option) => option.selected)
      .map((option) => option.value);
    setSelectedTopics(selectedOptions);
  };

  return (
    <div className="flex flex-col md:flex-row justify-between mx-10 my-10">
      <div className="w-full md:w-1/3 mb-8 md:mb-0">
        <div className="mb-4">
          <label htmlFor="year-select" className="block font-bold mb-2">
            Select Year:
          </label>
          <select
            id="year-select"
            value={selectedYear}
            onChange={handleYearChange}
            className="w-full border border-gray-300 rounded-md px-3 py-2"
          >
            {Array.from({ length: 20 }, (_, i) => 2023 - i).map((year) => (
              <option key={year} value={year}>
                {year}
              </option>
            ))}
          </select>
        </div>
        <Bar data={barChartData} options={{ animation: { duration: 1000 } }} />
      </div>

      <div className="w-full md:w-1/3 mb-8 md:mb-0">
        <div className="mb-4">
          <label htmlFor="topic-select" className="block font-bold mb-2">
            Select Topics:
          </label>
          <select
            id="topic-select"
            multiple
            value={selectedTopics}
            onChange={handleTopicChange}
            className="w-full border border-gray-300 rounded-md px-3 py-2"
          >
            {Array.from(
              new Set(data.map((item) => item.topic.properties.name))
            ).map((topic) => (
              <option key={topic} value={topic}>
                {topic}
              </option>
            ))}
          </select>
        </div>
        <Line
          data={lineChartData}
          options={{ animation: { duration: 1000 } }}
        />
      </div>

      <div className="w-full md:w-1/3">
        <Pie data={pieChartData} options={{ animation: { duration: 1000 } }} />
      </div>
    </div>
  );
};

export default Statistics;
