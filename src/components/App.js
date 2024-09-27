import { useState, useEffect } from "react";
import Navbar from "./1. NavBar components/NavBar";
import Logo from "./1. NavBar components/Logo";
import Nav from "./1. NavBar components/Nav";
import Search from "./1. NavBar components/Search";
import Main from "./2. Main components/Main";
import News from "./2. Main components/News";
import Footer from "./3. Footer components/Footer";

const API_KEY = "d4204d98aee44af0abc7cecdf8c5dfd5";

function App() {
  const [query, setQuery] = useState("");
  const [news, setNews] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchNews = async () => {
      // {{ edit_1 }} Menambahkan log untuk memeriksa apakah fungsi dipanggil
      console.log("fetchNews called with query:", query);

      try {
        setLoading(true);
        setError("");
        const response = await fetch(
          `https://newsapi.org/v2/top-headlines?country=us&q=${query}&apiKey=${API_KEY}`
        );

        // {{ edit_1 }} Menambahkan log untuk memeriksa status respons
        console.log("Response Status:", response.status);

        const data = await response.json();
        console.log(data); // Menambahkan log untuk memeriksa data

        if (data.status === "ok") {
          setNews(data.articles || []);
        } else {
          setError(data.message || "Error fetching news");
          setNews([]);
        }
      } catch (error) {
        // {{ edit_2 }} Menambahkan log untuk kesalahan
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
        <News news={news}>
          {loading && <Loader />}
          {error && <p>{error}</p>}
        </News>
      </Main>
      <Footer />
    </>
  );
}

export default App;
