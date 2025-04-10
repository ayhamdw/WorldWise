import React, { createContext, useState, useEffect, useContext } from "react";

const CitiesContext = createContext();

function CitiesProvider({ children }) {
  const URL = `http://localhost:9000/cities`;

  const [cities, setCities] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    async function fetchCities() {
      try {
        setIsLoading(true);
        const res = await fetch(URL);
        const data = await res.json();
        setCities(data);
      } catch (error) {
        alert("There was an error loading data... ", error);
      } finally {
        setIsLoading(false);
      }
    }
    fetchCities();
  }, []);

  return (
    <CitiesContext.Provider value={{ cities, isLoading }}>
      {children}
    </CitiesContext.Provider>
  );
}

function useCities() {
  const context = useContext(CitiesContext);
  if (context === undefined)
    throw new Error("Cities context used outside cities provider");
  return context;
}

export { CitiesProvider, useCities };
