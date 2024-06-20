import "./App.css";
import React, { useState, useEffect } from "react";
import Select from "react-select";
import Card from "./SummaryCard";


export default function App() {
  const baseUrl = "https://disease.sh/v3/covid-19";
  const [activeLocation, setActiveLocation] = useState("CAN");
  const [timesUpdated, setTimesUpdated] = useState("");
  const [summaryData, setSummaryData] = useState({});

  const locationList = [
    { value: "CAN", label: "Canada" },
    { value: "USA", label: "United States" },
    { value: "MEX", label: "Mexico" },
    { value: "GBR", label: "United Kingdom" },
    { value: "FRA", label: "France" },
    { value: "DEU", label: "Germany" },
    { value: "ESP", label: "Spain" },
    { value: "ITA", label: "Italy" },
    { value: "RUS", label: "Russia" },
    { value: "BRA", label: "Brazil" },
    { value: "IND", label: "India" },
    { value: "CHN", label: "China" },
    { value: "JPN", label: "Japan" },
    { value: "AUS", label: "Australia" },
    { value: "ZAF", label: "South Africa" }
  ];


  useEffect(() => {
    getCountryCovidInformation();
  }, [activeLocation]);

  const getCountryCovidInformation = async () => {
    const country = locationList.find(options => options.value === activeLocation).label;
    const res = await fetch(`${baseUrl}/countries/${country}`);
    const data = await res.json();
    setTimesUpdated(data.updated);
    const summaryDataObject = {
      cases: data.cases,
      recovered: data.recovered,
      deaths: data.deaths,
      critical: data.critical
    };
    setSummaryData(summaryDataObject);
  };


return (
  <div className="App">
    <h1>COVID 19 Dashboard</h1>

    <div className="dashboard-container">
      <div className="dashboard-menu ">
        <Select className="dashboard-select"
          options={locationList}
          onChange={(selectedOption) =>
            setActiveLocation(selectedOption.value)
          }
          defaultValue={locationList.find(
            options => options.value === activeLocation
          )}
        />

        <p className="update-date">
          Times Updated : {timesUpdated}
        </p>
      </div>

      <div className="dashboard-timeseries">

      </div>

      <div className="dashboard-summary">
        <Card
          title="Total Cases"
          value={summaryData.cases}
        />
        <Card
          title="Total Recovered"
          value={summaryData.recovered}
        />
        <Card
          title="Total Deaths"
          value={summaryData.deaths}
        />
        <Card
          title="Critical Cases"
          value={summaryData.critical}
        />
      </div>
    </div>

  </div>
);
}
