import React, { Component, useState, useEffect } from "react";

const getStateFromLocalStorage = () => {
  const storage = localStorage.getItem("counterState");
  if (storage) return JSON.parse(storage).count;

  return { count: 0 };
};

const storageStateInLocalStorage = (count) => {
  localStorage.setItem("counterState", JSON.stringify({ count }));
  console.log(localStorage);
};

const useLocalStorage = (initialState, key) => {
  const get = () => {
    const storage = localStorage.getItem(key);
    if (storage) return JSON.parse(storage).value;

    return initialState;
  };

  const [value, setValue] = useState(get());

  useEffect(() => {
    localStorage.setItem(key, JSON.stringify({ value }));
  }, [value]);

  return [value, setValue];
};

const Counter = ({ max, step }) => {
  const [count, setCount] = useLocalStorage(0, "count");

  const increment = () => {
    setCount((prevState) => {
      if (prevState >= max) return prevState;
      return prevState + step;
    });
  };

  const decrement = () => {
    setCount(count - 1);
  };
  const reset = () => {
    setCount(0);
  };

  useEffect(() => {
    document.title = `Counter ${count}`;
  }, [count]);

  useEffect(() => {
    storageStateInLocalStorage(count);
  }, [count]);

  return (
    <div className="Counter">
      <p className="count">{count}</p>
      <section className="controls">
        <button onClick={increment} className="increment">
          Increment
        </button>
        <button onClick={decrement}>Decrement</button>
        <button onClick={reset}>Reset</button>
      </section>
    </div>
  );
};

export default Counter;
