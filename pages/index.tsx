import Head from "next/head";
import Image from "next/image";
import { Inter } from "next/font/google";
import styles from "@/styles/Home.module.css";
import PageLayout from "@/components/PageLayout";
import React, { useEffect, useState } from "react";
import { Movies } from "@/types";
import { MoviesList } from "@/components/MoviesList";

const inter = Inter({ subsets: ["latin"] });

export default function Home() {
  const [movies, setMovies] = useState<Movies[]>([]);
  const [search, setSearch] = useState<string>("");

  const url = `https://www.omdbapi.com/?apikey=${process.env.NEXT_PUBLIC_API_KEY}&s=${search}`;

  const getMovies = (search: string | string[] | undefined) => {
    if (search) {
      fetch(url)
        .then((res) => res.json())
        .then((data) => setMovies(data.Search))
        .catch((error) => console.log(error));
    }
  };
  useEffect(() => {
    getMovies(search);
  }, []);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (search === "") return;
    getMovies(search);
    setSearch("");
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearch(e.target.value);
  };

  return (
    <>
      <PageLayout title="Next - Home">
        <main>
          <div className="peliculas">
            <h2>Peliculasdb</h2>

            <form action="" onSubmit={handleSubmit}>
              <input
                style={{ width: 160, borderRadius: 4 }}
                type="text"
                name="search"
                placeholder="Batman.. Superman.. etc"
                value={search}
                onChange={handleChange}
              />
              <button type="submit">Search</button>
            </form>
            {movies.length === 0 && <h3>Busca tus peliculas favoritas.</h3>}
            {movies.length > 0 && <MoviesList movies={movies} />}
          </div>
        </main>
      </PageLayout>
    </>
  );
}
