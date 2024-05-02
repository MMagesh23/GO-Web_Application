import React, { useState, useEffect, useRef, useCallback } from "react";
import { Bar } from "react-chartjs-2";
import "../style/JobsChart.css";
import { Chart, CategoryScale, LinearScale, Title, Tooltip } from "chart.js";
import { BarController, BarElement } from "chart.js";
import axios from "axios";
import AuthService from "./authService";

Chart.register(
  CategoryScale,
  LinearScale,
  Title,
  BarController,
  BarElement,
  Tooltip
);

const JobsChart = () => {
  const [jobData, setJobData] = useState({});
  const [loading, setLoading] = useState(true);
  const chartRef = useRef(null);

  const processData = useCallback((chartData) => {
    return {
      labels: Object.keys(chartData),
      datasets: [
        {
          label: "Jobs",
          data: Object.values(chartData),
          backgroundColor: generateRandomColor(),
          borderColor: "rgba(0,0,0,0.5)", // Border color
          borderWidth: 1, // Border width
        },
      ],
    };
  }, []);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get("http://localhost:5000/jobschart", {
          headers: {
            Authorization: `Bearer ${AuthService.getAuthToken()}`,
          },
        });
        setJobData(processData(response.data.chartData));
        setLoading(false);
      } catch (error) {
        console.error("Error fetching data:", error);
        setLoading(false);
      }
    };

    fetchData();
  }, [processData]);

  useEffect(() => {
    if (!loading && Object.keys(jobData).length > 0 && chartRef.current) {
      if (chartRef.current.chartInstance) {
        chartRef.current.chartInstance.destroy();
      }
    }
  }, [loading, jobData]);

  useEffect(() => {
    const interval = setInterval(() => {
      // Generate new color every 5 seconds
      setJobData((prevData) => ({
        ...prevData,
        datasets: prevData.datasets.map((dataset) => ({
          ...dataset,
          backgroundColor: generateRandomColor(),
        })),
      }));
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  const generateRandomColor = () => {
    return `rgba(${Math.floor(Math.random() * 256)}, ${Math.floor(
      Math.random() * 256
    )}, ${Math.floor(Math.random() * 256)}, 0.6)`;
  };

  return (
    <div className="JobsChart-container">
      <h1 className="JobsChart-Head">JOBS PER CATEGORY</h1>
      {loading ? (
        <div>Loading...</div>
      ) : (
        <div style={{ height: "500px", width: "100%" }}>
          <Bar
            ref={chartRef}
            data={jobData}
            options={{
              maintainAspectRatio: false,
              scales: {
                x: {
                  title: {
                    display: true,
                    text: "Category",
                    font: {
                      size: 16,
                      weight: "bold",
                    },
                  },
                },
                y: {
                  title: {
                    display: true,
                    text: "Count",
                    font: {
                      size: 16,
                      weight: "bold",
                    },
                  },
                  beginAtZero: true,
                  precision: 0,
                },
              },
            }}
          />
        </div>
      )}
    </div>
  );
};

export default JobsChart;
