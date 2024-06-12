import { useState, useEffect } from "react";
import { Bar, Line, Pie } from "react-chartjs-2";
import "chart.js/auto";
import axios from "axios";

const Statistics = () => {
  const [data, setData] = useState([]);
  const [selectedYear, setSelectedYear] = useState(2023);
  const [selectedTopics, setSelectedTopics] = useState([]);

  useEffect(() => {
    axios
      .get("http://localhost:8080/api/chart/data")
      .then((response) => {
        const responseData = Array.isArray(response.data) ? response.data : [];
        setData(responseData);
        if (responseData.length > 0) {
          setSelectedTopics([responseData[0].topic.properties.name]);
        }
      })
      .catch((error) => console.error("Error fetching data:", error));
  }, []);

  const getTopTopics = (year) => {
    const topicCounts = {};
    if (!Array.isArray(data) || data.length === 0) return [];
    data.forEach((item) => {
      const { topic, paper } = item;
      const publicationYear = new Date(paper.properties.publicationDate).getFullYear();
      if (publicationYear === year) {
        const topicName = topic.properties.name;
        topicCounts[topicName] = (topicCounts[topicName] || 0) + 1;
      }
    });
    return Object.entries(topicCounts).sort((a, b) => b[1] - a[1]).slice(0, 10);
  };

  const generateRandomColor = () => {
    const r = Math.floor(Math.random() * 256);
    const g = Math.floor(Math.random() * 256);
    const b = Math.floor(Math.random() * 256);
    return `rgba(${r}, ${g}, ${b}, 0.5)`;
  };

  const topTopics = getTopTopics(selectedYear);

  const barChartData = {
    labels: topTopics.map(([topic]) => topic),
    datasets: [
      {
        label: `Top 10 Contributed Topics in ${selectedYear}`,
        data: topTopics.map(([_, count]) => count),
        backgroundColor: topTopics.map(() => generateRandomColor()),
        borderColor: topTopics.map(() => generateRandomColor().replace(", 0.5)", ", 1)")),
        borderWidth: 1,
      },
    ],
  };

  const lineChartData = {
    labels: Array.from({ length: 20 }, (_, i) => 2023 - i),
    datasets: selectedTopics.map((topic) => ({
      label: topic,
      data: Array.from({ length: 20 }, (_, i) => {
        const year = 2023 - i;
        if (!Array.isArray(data) || data.length === 0) return 0;
        const count = data.filter(
          (item) =>
            item.topic.properties.name === topic &&
            new Date(item.paper.properties.publicationDate).getFullYear() === year
        ).length;
        return count;
      }),
      fill: false,
      borderColor: `rgba(${Math.floor(Math.random() * 256)}, ${Math.floor(Math.random() * 256)}, ${Math.floor(
        Math.random() * 256
      )}, 1)`,
      borderWidth: 2,
    })),
  };

  const pieChartData = {
    labels: Array.from(new Set(data.map((item) => item.topic.properties.name))),
    datasets: [
      {
        data: Array.from(new Set(data.map((item) => item.topic.properties.name))).map((topicName) =>
          data.filter((item) => item.topic.properties.name === topicName).length
        ),
        backgroundColor: Array.from(new Set(data.map((item) => item.topic.properties.name))).map(
          () =>
            `rgba(${Math.floor(Math.random() * 256)}, ${Math.floor(Math.random() * 256)}, ${Math.floor(
              Math.random() * 256
            )}, 0.5)`
        ),
      },
    ],
  };

  const handleYearChange = (event) => {
    setSelectedYear(parseInt(event.target.value));
  };

  const handleTopicChange = (event) => {
    const options = event.target.options;
    const selectedOptions = Array.from(options).filter((option) => option.selected).map((option) => option.value);
    setSelectedTopics(selectedOptions);
  };

  return (
    <div className="container mx-auto p-8 bg-gray-100 min-h-screen">
      <h1 className="text-4xl font-extrabold text-center text-blue-600 mb-12">Research Paper Statistics</h1>

      <div className="mb-10">
        <div className="mb-6">
          <label htmlFor="year-select" className="block font-semibold text-lg mb-2 text-center text-gray-700">
            Select Year:
          </label>
          <select
            id="year-select"
            value={selectedYear}
            onChange={handleYearChange}
            className="block mx-auto w-1/2 md:w-1/4 border border-gray-300 rounded-md px-3 py-2 text-lg"
          >
            {Array.from({ length: 20 }, (_, i) => 2023 - i).map((year) => (
              <option key={year} value={year}>
                {year}
              </option>
            ))}
          </select>
        </div>
        <div className="bg-white p-8 rounded-lg shadow-md">
          <Bar data={barChartData} options={{ animation: { duration: 1000 }, responsive: true }} />
          <div className="text-center mt-4 text-lg font-medium text-gray-600">
            Total Topics in {selectedYear}: {topTopics.reduce((sum, [, count]) => sum + count, 0)}
          </div>
        </div>
      </div>

      <div className="flex flex-col md:flex-row justify-between mb-10">
        <div className="w-full md:w-1/2 mb-10 md:mb-0">
          <div className="mb-6">
            <label htmlFor="topic-select" className="block font-semibold text-lg mb-2 text-center text-gray-700">
              Select Topics:
            </label>
            <select
              id="topic-select"
              multiple
              value={selectedTopics}
              onChange={handleTopicChange}
              className="block mx-auto w-3/4 border border-gray-300 rounded-md px-3 py-2 text-lg"
            >
              {Array.from(new Set(data.map((item) => item.topic.properties.name))).map((topic) => (
                <option key={topic} value={topic}>
                  {topic}
                </option>
              ))}
            </select>
          </div>
          <div className="bg-white p-8 rounded-lg shadow-md">
            <Line data={lineChartData} options={{ animation: { duration: 1000 }, responsive: true }} />
            <div className="text-center mt-4 text-lg font-medium text-gray-600">
              Total Papers for Selected Topics:{" "}
              {selectedTopics.reduce(
                (sum, topic) => sum + data.filter((item) => item.topic.properties.name === topic).length,
                0
              )}
            </div>
          </div>
        </div>

        <div className="w-full md:w-1/2">
          <div className="bg-white p-8 rounded-lg shadow-md">
            <h2 className="text-center font-bold text-xl text-gray-700 mb-4">Number of Papers per Topic</h2>
            <Pie data={pieChartData} options={{ animation: { duration: 1000 }, responsive: true }} />
            <div className="text-center mt-4 text-lg font-medium text-gray-600">
              Total Papers: {data.length}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Statistics;
