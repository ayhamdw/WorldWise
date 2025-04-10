import React from "react";
import Spinner from "./Spinner";
import Message from "./Message";
import styles from "./CountryList.module.css";
import CountryItem from "./CountryItem";
import { useCities } from "../context/CitiesContext";

function CountryList() {
  const countries = [];
  const { cities, isLoading } = useCities();

  if (isLoading) return <Spinner />;
  if (!cities.length)
    return (
      <Message message="Add Your First City By Clicking On a City On a Map" />
    );

  for (const city of cities) {
    const countryExists = countries.some(
      (item) => item.country === city.country,
    );

    if (!countryExists) {
      countries.push({ country: city.country, emoji: city.emoji });
    }
  }
  return (
    <ul className={styles.countryList}>
      {countries.map((country) => (
        <CountryItem country={country} key={country.key} />
      ))}
    </ul>
  );
}

export default CountryList;
