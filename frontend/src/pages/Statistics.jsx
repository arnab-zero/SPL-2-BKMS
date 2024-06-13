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
        borderColor: topTopics.map(() =>
          generateRandomColor().replace(", 0.5)", ", 1)")
        ),
        borderWidth: 1,
      },
    ],
  };

  const pieChartData = {
    labels: Array.from(new Set(data.map((item) => item.topic.properties.name))),
    datasets: [
      {
        data: Array.from(
          new Set(data.map((item) => item.topic.properties.name))
        ).map(
          (topicName) =>
            data.filter((item) => item.topic.properties.name === topicName)
              .length
        ),
        backgroundColor: Array.from(
          new Set(data.map((item) => item.topic.properties.name))
        ).map(
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
    <div className="container mx-auto p-8 bg-gray-100 min-h-screen">
      <h1 className="text-4xl font-bold text-center text-black mt-10 mb-20">
        Research Paper Statistics
      </h1>

      {/* Bar chart and Pie chart side by side */}
      <div className="grid grid-cols-2 gap-6 mb-10">
        {/* Bar chart */}
        <div className="bg-white px-8 py-14 rounded-lg shadow-md">
          {/* Year selection above the bar chart */}
          <div className="mb-10 text-center">
            <label
              htmlFor="year-select"
              className="block font-bold text-2xl mb-2 text-gray-700"
            >
              Select Year:
            </label>
            <select
              id="year-select"
              value={selectedYear}
              onChange={handleYearChange}
              className="border border-gray-300 rounded-md px-3 py-2 text-lg w-[45%] text-center"
            >
              {Array.from({ length: 20 }, (_, i) => 2023 - i).map((year) => (
                <option key={year} value={year}>
                  {year}
                </option>
              ))}
            </select>
          </div>
          <Bar
            data={barChartData}
            options={{ animation: { duration: 1000 }, responsive: true }}
          />
          <div className="text-center mt-4 text-lg font-medium text-gray-600">
            Total Topics in {selectedYear}:{" "}
            {topTopics.reduce((sum, [, count]) => sum + count, 0)}
          </div>
        </div>

        {/* Pie chart */}
        <div className="bg-white p-8 rounded-lg shadow-md">
          <h2 className="text-center font-bold text-xl text-gray-700 mb-4">
            Number of Papers per Topic
          </h2>
          <Pie
            data={pieChartData}
            options={{ animation: { duration: 1000 }, responsive: true }}
          />
          <div className="text-center mt-4 text-lg font-medium text-gray-600">
            Total Papers: {data.length}
          </div>
        </div>
      </div>

      {/* Line chart and Select Topics */}
      <div className="bg-white p-8 rounded-lg shadow-md grid grid-cols-2 gap-6">
        {/* Select Topics */}
        <div>
          <label
            htmlFor="topic-select"
            className="block font-semibold text-lg mb-2 text-center text-gray-700"
          >
            Select Topics:
          </label>
          <select
            id="topic-select"
            multiple
            value={selectedTopics}
            onChange={handleTopicChange}
            className="block w-full border border-gray-300 rounded-md px-3 py-2 text-lg"
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

        {/* Line chart */}
        <div className="bg-white p-8 rounded-lg shadow-md">
          <h2 className="text-center font-bold text-xl text-gray-700 mb-4">
            Publication Trend for Selected Topics
          </h2>
          <Line
            data={{
              labels: Array.from({ length: 20 }, (_, i) => 2023 - i),
              datasets: selectedTopics.map((topic) => ({
                label: topic,
                data: Array.from({ length: 20 }, (_, i) => {
                  const year = 2023 - i;
                  if (!Array.isArray(data) || data.length === 0) return 0;
                  const count = data.filter(
                    (item) =>
                      item.topic.properties.name === topic &&
                      new Date(
                        item.paper.properties.publicationDate
                      ).getFullYear() === year
                  ).length;
                  return count;
                }),
                fill: false,
                borderColor: `rgba(${Math.floor(
                  Math.random() * 256
                )}, ${Math.floor(Math.random() * 256)}, ${Math.floor(
                  Math.random() * 256
                )}, 1)`,
                borderWidth: 2,
              })),
            }}
            options={{ animation: { duration: 1000 }, responsive: true }}
          />
          <div className="text-center mt-4 text-lg font-medium text-gray-600">
            Total Papers for Selected Topics:{" "}
            {selectedTopics.reduce(
              (sum, topic) =>
                sum +
                data.filter((item) => item.topic.properties.name === topic)
                  .length,
              0
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Statistics;
