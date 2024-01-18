import React, { useEffect, useState } from "react";
import axios from "axios";
import { Chart } from "react-google-charts";

function CategoryUsageChart() {
  const [chartData, setChartData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          "http://127.0.0.1:8000/api/category-usage-chart-data"
        );
        console.log("API data:", response.data); // Provera podataka iz API-ja
        setChartData(response.data);
      } catch (error) {
        console.error("Error fetching data:", error); // Provera grešaka
      }
    };

    fetchData();
  }, []);

  const formattedData = [
    ["Category", "Count"],
    ...chartData.map((item) => [item.category, item.count]),
  ];

  return (
    <div>
      {chartData.length > 0 ? (
        <Chart
          chartType="PieChart"
          width="100%"
          height="400px"
          data={formattedData}
          options={{
            title: "Category Usage",
            is3D: true,
          }}
        />
      ) : (
        <p>Loading chart data...</p>
      )}
    </div>
  );
}

export default CategoryUsageChart;
