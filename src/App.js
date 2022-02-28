import logo from './logo.svg';
import './App.css';
import { useState, useEffect } from 'react';

function App() {
  const [error, setError] = useState(null);
  const [isLoaded, setIsLoaded] = useState(false);
  const [items, setItems] = useState({});
  const [filter, setFilter] = useState({filterType: 'type', value:'education'});

    // Note: the empty deps array [] means
  // this useEffect will run once
  // similar to componentDidMount()
  useEffect(() => {
    fetch(`http://www.boredapi.com/api/activity?${filter.filterType}=${filter.filter}`)
      .then(res => res.json())
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
          setIsLoaded(true);
          setError(error);
        }
      )
  }, [])

  const newActivity = () => {
    fetch(`http://www.boredapi.com/api/activity?${filter.filterType}=${filter.filter}`)
      .then(res => res.json())
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
          setIsLoaded(true);
          setError(error);
        }
      )
  };

  if (error) {
    return <div>Error: {error.message}</div>;
  } else if (!isLoaded) {
    return <div>Loading...</div>;
  } else {
    return (
      <div>
        <h1 className="text-3xl font-bold underline">
          Hello world!
        </h1>
        <p>{items.activity}</p>
        <button onClick={newActivity}>New activity</button>
      </div>
    );
  }

}

export default App;
