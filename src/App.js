import logo from "./logo.svg";
import "./App.css";
import { useState, useEffect, Fragment } from "react";

function App() {
  const [error, setError] = useState(false);
  const [isLoaded, setIsLoaded] = useState(false);
  const [items, setItems] = useState({});
  //const [filter, setFilter] = useState({filterType: "type", value:"education"});
  const [filter, setFilter] = useState({
    filterType: "participants",
    value: "2",
  });

  // Note: the empty deps array [] means
  // this useEffect will run once
  // similar to componentDidMount()
  // useEffect(() => {
  //   fetch(`http://www.boredapi.com/api/activity?${filter.filterType}=${filter.value}`)
  //     .then(res => res.json())
  //     .then(
  //       (result) => {
  //         //setIsLoaded(true);
  //         setItems(result);
  //         console.log(items);
  //       },
  //       // Note: it's important to handle errors here
  //       // instead of a catch() block so that we don't swallow
  //       // exceptions from actual bugs in components.
  //       (error) => {
  //         //setIsLoaded(true);
  //         setError(error);
  //       }
  //     )
  // }, [])

  const newActivity = () => {
    fetch(
      `http://www.boredapi.com/api/activity?${filter.filterType}=${filter.value}`
    )
      .then((res) => res.json())
      .then(
        (result) => {
          setIsLoaded(true);
          setItems(result);
          console.log(items);
        },
        // Note: it's important to handle errors here
        // instead of a catch() block so that we don't swallow
        // exceptions from actual bugs in components.
        (error) => {
          setIsLoaded(false);
          setError(error);
        }
      );
  };

  if (error) {
    return <div>Error: {error.message}</div>;
  } else {
    return (
      <Fragment>
        <div className="bg-hero-mobile md:bg-hero-desktop bg-cover bg-bottom bg-no-repeat text-center py-40">
          <h1 className="text-3xl font-bold underline">Buster</h1>
          <button onClick={newActivity} className="border border-black border-1">Generate new activity</button>
        </div>
        <div className="text-center">
          {!isLoaded && <p></p>}
          <p>{items.activity}</p>
        </div>
      </Fragment>
    );
  }
}

export default App;
