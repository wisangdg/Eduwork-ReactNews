import React, { useState, useEffect } from "react";
import Navbar from "./1. NavBar components/NavBar";
import Logo from "./1. NavBar components/Logo";
import Nav from "./1. NavBar components/Nav";
import Search from "./1. NavBar components/Search";
import Main from "./2. Main components/Main";
import News from "./2. Main components/News";
import Footer from "./3. Footer components/Footer";

const API_KEY =
  "ab78ce1999f73505d962cd212aa70a6d2c6e5346f3012612eb0bb8806462f7b5";

//https://serpapi.com/search?engine=google_news

function App() {
  const [query, setQuery] = useState("");
  const [news, setNews] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchNews = async () => {
      console.log("fetchNews called with query:", query);

      try {
        setLoading(true);
        setError("");
        const response = await fetch(
          query === ""
            ? `https://cors-anywhere.herokuapp.com/https://serpapi.com/search.json?tbm=nws&engine=google&q=lastest&api_key=${API_KEY}`
            : `https://cors-anywhere.herokuapp.com/https://serpapi.com/search.json?tbm=nws&engine=google&q=${encodeURIComponent(
                query
              )}&api_key=${API_KEY}`
        );

        console.log("Response Status:", response.status);

        const data = await response.json();
        console.log("checking for data:", data);

        if (response.ok) {
          setNews(data.news_results || []);
        } else {
          setError(data.message || "Error fetching news");
          setNews([]);
        }
      } catch (error) {
        console.log("Error occurred:", error);
        setError(error.message || "Error fetching news");
      } finally {
        setLoading(false);
      }
    };

    fetchNews();
  }, [query]);

  function Loader() {
    return <p>Loading...</p>;
  }

  return (
    <>
      <Navbar>
        <Logo />
        <Nav />
        <Search query={query} setQuery={setQuery} />
      </Navbar>
      <Main>
        {loading && <Loader />}
        {error && <p>{error}</p>}
        <News news={news} />
      </Main>
      <Footer />
    </>
  );
}

export default App;
