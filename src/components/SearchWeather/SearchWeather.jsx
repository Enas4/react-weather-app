import React, { useEffect, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearch } from "@fortawesome/free-solid-svg-icons";
import { faCloud } from "@fortawesome/free-solid-svg-icons";
import { faSmog } from "@fortawesome/free-solid-svg-icons";
import { faCloudBolt } from "@fortawesome/free-solid-svg-icons";
import { faSmoking } from "@fortawesome/free-solid-svg-icons";
import { faCloudRain } from "@fortawesome/free-solid-svg-icons";
import { faSnowflake } from "@fortawesome/free-solid-svg-icons";
import { faCloudShowersWater } from "@fortawesome/free-solid-svg-icons";
import { hasSelectionSupport } from "@testing-library/user-event/dist/utils";

export const SearchWeather = () => {
  const [search, setSearch] = useState("karachi");
  const [data, setData] = useState([]);
  const [input, setInput] = useState("");
  let componentDidMount = true;

  useEffect(() => {
    const fetchWeather = async () => {
      const url = await fetch(
        `https://api.openweathermap.org/data/2.5/weather?q=${search}&appid=c2af346320d21309f0b39dc5d9dbaeeb`
      );
      if (componentDidMount) {
        setData(await url.json());
        console.log(data);
      }
      return () => {
        componentDidMount = false;
      };
    };
    fetchWeather();
  }, [search]);

  let emoji = null;
  if (typeof data.main !== "undefined") {
    if (data.weather[0].main === "Clouds") {
      emoji = faCloud;
    } else if (data.weather[0].main === "Thuderstorm") {
      emoji = faCloudBolt;
    } else if (data.weather[0].main === "Drizzle") {
      emoji = faCloudShowersWater;
    } else if (data.weather[0].main === "Rain") {
      emoji = faCloudRain;
    } else if (data.weather[0].main === "Snow") {
      emoji = faSnowflake;
    } else if (data.weather[0].main === "Smog") {
      emoji = faSmog;
    } else if (data.weather[0].main === "Smoke") {
      emoji = faSmoking;
    }
  } else {
    return <div>...loading</div>;
  }

  let tempi = (data.main.temp - 273.51).toFixed(2);
  let temp_min = (data.main.temp_min - 273.51).toFixed(2);
  let temp_max = (data.main.temp_max - 273.51).toFixed(2);

  //Date

  let d = new Date();
  let date = d.getDate();
  let year = d.getFullYear();
  let month = d.toLocaleDateString("default", { month: "long" });
  let day = d.toLocaleDateString("default", { weekday: "long" });

  //Time;
  let time = d.toLocaleTimeString([], {
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    setSearch(input);
  };
  return (
    <div className="container mt-5">
      <div className="row justify-content-center">
        <div className="col-md-4">
          <div className="card bg-dark text-white">
            <img
              src={`https://source.unsplash.com/600x900/?${data.weather[0].main}`}
              className="card-img"
              alt="..."
            />
            <div className="card-img-overlay">
              <form action="" onSubmit={handleSubmit}>
                <div className="input-group mb-4 w-75 mx-auto">
                  <input
                    type="search"
                    className="form-control"
                    placeholder="Search city"
                    aria-label="Search city"
                    aria-describedby="basic-addon2"
                    name="search"
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    required
                  />
                  <button
                    type="submit"
                    className="input-group-text"
                    id="basic-addon2"
                  >
                    <FontAwesomeIcon icon={faSearch} />
                  </button>
                </div>
              </form>
              <div className="bg-dark bg-opacity-50 py-3">
                <h2 className="card-title">{data.name}</h2>
                <p className="card-text lead">
                  {day} {month} {date}, {year}
                  <br />
                  {time}
                </p>
                <hr />
                <FontAwesomeIcon icon={emoji} />
                <h1 className="fw-bolder mb-5">{tempi} &&deg;C</h1>
                <p className="lead fw-bolder mb-0">{data.weather[0].main}</p>
                <p className="lead">
                  {temp_min} &&deg;C | {temp_max}&&deg;C
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
