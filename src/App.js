import logo from "./logo.svg";
import "./App.css";
import { useState, useEffect, Fragment } from "react";
import { Tab, Tabs, TabList, TabPanel } from "react-tabs";
import "react-tabs/style/react-tabs.css";

function App() {
  const [error, setError] = useState(false);
  const [isLoaded, setIsLoaded] = useState(false);
  const [items, setItems] = useState({});
  const [tabIndex, setTabIndex] = useState(0);
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

  useEffect(() => {
    if (tabIndex == 0) {
      console.log("Filter type = None");     
    } else if (tabIndex == 1) {
      console.log("Filter type = Activity type")
    } else if (tabIndex == 2) {
      console.log("Filter type = Participants")
    } else if (tabIndex == 3) {
      console.log("Filter type = Participants")
    }

  }, [tabIndex])


  const newActivity = () => {
    let url = "http://www.boredapi.com/api/activity/"
    if (tabIndex !== 0){
      url = `http://www.boredapi.com/api/activity?${filter.filterType}=${filter.value}`
    }
    fetch(url)
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
        <div className="bg-hero-mobile md:bg-hero-desktop bg-cover bg-bottom bg-no-repeat text-center pt-40">
          <h1 className="text-3xl font-bold underline">Buster</h1>
          <Tabs selectedIndex={tabIndex} onSelect={index => setTabIndex(index)}>
          <TabList className="">
            <Tab selectedClassName="">None</Tab>
            <Tab selectedClassName="">Activity type</Tab>
            <Tab selectedClassName="">Participants</Tab>
            <Tab selectedClassName="">Price</Tab>
          </TabList>

          <TabPanel>
            <h2>No filters set</h2>
          </TabPanel>
          <TabPanel>
            <h2>Activity types</h2>
          </TabPanel>
          <TabPanel>
            <h2>No. participants</h2>
          </TabPanel>
          <TabPanel>
            <h2>Price ranges</h2>
          </TabPanel>
        </Tabs>
          <button
            onClick={newActivity}
            className="border border-black border-1"
          >
            Generate new activity
          </button>
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
