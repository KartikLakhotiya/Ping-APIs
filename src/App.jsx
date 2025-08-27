import React, { useEffect, useState } from "react";

const API_URLS = [
  "https://ems-25p6.onrender.com/api/employees/v1",
  "https://member-data-6l3t.onrender.com",
  "https://student-dashboard-cfg7.onrender.com",
];

function App() {
  const [logs, setLogs] = useState([]);
  const [data, setData] = useState([]);
  const [theme, setTheme] = useState("light");

  // Utility for time formatting
  const getTimestamp = () => new Date().toLocaleString();

  // Ping a single API
  const fetchApi = async (url, index) => {
    setLogs((logs) => [
      ...logs,
      { timestamp: getTimestamp(), message: `Pinging ${url}` },
    ]);
    try {
      const res = await fetch(url);
      const text = await res.text();
      setLogs((logs) => [
        ...logs,
        { timestamp: getTimestamp(), message: `✅ Success: ${url}` },
      ]);
      setData((prev) => {
        const newData = [...prev];
        newData[index] = text;
        return newData;
      });
      return text;
    } catch (e) {
      setLogs((logs) => [
        ...logs,
        { timestamp: getTimestamp(), message: `❌ Error: ${url} - ${e.message}` },
      ]);
      return null;
    }
  };

  // Ping all APIs
  const fetchAllApis = async () => {
    setLogs((logs) => [
      ...logs,
      { timestamp: getTimestamp(), message: "🚀 Starting API batch ping..." },
    ]);
    await Promise.all(API_URLS.map((url, i) => fetchApi(url, i)));
  };

  // Load theme from localStorage on mount
  useEffect(() => {
    const storedTheme = localStorage.getItem("theme");
    if (storedTheme) {
      setTheme(storedTheme);
    }
  }, []);

  useEffect(() => {
    fetchAllApis();
    const interval = setInterval(fetchAllApis, 300000); // every 10 mins
    return () => clearInterval(interval);
  }, []);

  const toggleTheme = () => {
    setTheme((prev) => {
      const newTheme = prev === "light" ? "dark" : "light";
      localStorage.setItem("theme", newTheme); // Save in localStorage
      return newTheme;
    });
  };

  const isDark = theme === "dark";

  // Ensure body background matches theme (removes white border around root div)
  useEffect(() => {
    document.body.style.backgroundColor = isDark ? "#121212" : "#f5f5f5";
    document.body.style.margin = 0;
  }, [isDark]);

  return (
    <div
      style={{
        padding: "20px",
        background: isDark ? "#121212" : "#f5f5f5",
        color: isDark ? "#f5f5f5" : "#121212",
        minHeight: "100vh",
        transition: "all 0.3s ease", // smooth transition
      }}
    >
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
        <h1 style={{ marginBottom: "20px" }}>API Monitor Dashboard</h1>
        <button
          onClick={toggleTheme}
          style={{
            marginBottom: "20px",
            padding: "8px 16px",
            background: isDark ? "#444" : "#ddd",
            color: isDark ? "#f5f5f5" : "#121212",
            border: "none",
            borderRadius: "5px",
            cursor: "pointer",
            transition: "all 0.3s ease",
          }}
        >
          {isDark ? "🌞 Light Mode" : "🌙 Dark Mode"}
        </button>
      </div>

      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "20px" }}>
        {/* API Cards */}
        <div>
          <h2>APIs</h2>
          {API_URLS.map((url, i) => (
            <div
              key={i}
              style={{
                border: isDark ? "1px solid #333" : "1px solid #ddd",
                borderRadius: "8px",
                marginBottom: "15px",
                background: isDark ? "#1e1e1e" : "white",
                boxShadow: "0 2px 5px rgba(0,0,0,0.1)",
                transition: "all 0.3s ease",
              }}
            >
              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                  padding: "10px 15px",
                  borderBottom: isDark ? "1px solid #333" : "1px solid #eee",
                }}
              >
                <span style={{ fontWeight: "bold", fontSize: "14px" }}>{url}</span>
                <button
                  onClick={() => fetchApi(url, i)}
                  style={{
                    padding: "6px 12px",
                    background: "#28a745",
                    color: "white",
                    border: "none",
                    borderRadius: "4px",
                    cursor: "pointer",
                  }}
                >
                  Ping
                </button>
              </div>
              <pre
                style={{
                  padding: "10px",
                  margin: 0,
                  fontSize: "12px",
                  maxHeight: "150px",
                  overflow: "auto",
                  background: isDark ? "#2c2c2c" : "#f9f9f9",
                  color: isDark ? "#ddd" : "#000",
                  transition: "all 0.3s ease",
                }}
              >
                {data[i] ? data[i].slice(0, 200) + "" : "No data yet"}
              </pre>
            </div>
          ))}
          <button
            onClick={fetchAllApis}
            style={{
              marginBottom: "20px",
              padding: "10px 20px",
              background: "#007bff",
              color: "white",
              border: "none",
              borderRadius: "5px",
              cursor: "pointer",
            }}
          >
            🔄 Ping All APIs
          </button>
        </div>

        {/* Logs */}
        <div>
          <h2>Logs</h2>
          <div
            style={{
              background: isDark ? "#0d0d0d" : "#f1f1f1",
              color: isDark ? "#00ff00" : "#006400",
              padding: "10px",
              borderRadius: "8px",
              height: "500px",
              overflow: "auto",
              fontFamily: "monospace",
              fontSize: "13px",
              border: isDark ? "1px solid #333" : "1px solid #ccc",
              transition: "all 0.3s ease",
            }}
          >
            {[...logs].reverse().map((log, i) => (
              <div key={i}>
                <span style={{ color: isDark ? "#aaa" : "#555" }}>[{log.timestamp}]</span> {log.message}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
