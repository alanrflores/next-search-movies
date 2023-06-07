import Head from "next/head";
import Image from "next/image";
import { Inter } from "next/font/google";
import styles from "@/styles/Home.module.css";
import PageLayout from "@/components/PageLayout";
import React, { useEffect, useState } from "react";
import { Movies, MoviesListProps } from "@/types";
import { MoviesList } from "@/components/MoviesList";
import {
  Button,
  Flex,
  Center,
  Input,
  Container,
  Stack,
  Box,
} from "@chakra-ui/react";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import MoviesPopularity from "@/components/MoviesPopularity";



const inter = Inter({ subsets: ["latin"] });

export default function Home() {
  const [movies, setMovies] = useState<Movies[]>([]);
  const [search, setSearch] = useState<string>("");
  const [loading, setLoading] = useState(false);

  const url = `https://www.omdbapi.com/?apikey=${process.env.NEXT_PUBLIC_API_KEY}&s=${search}`;

  const getMovies = async (search: string): Promise<Movies[] | undefined> => {
    if (search) {
      setLoading(true);
      const response = await axios.get(url);
      setLoading(false);
      return response.data.Search;
    }
  };

  const { data, isSuccess, isError, refetch } = useQuery(
    ["movies", search],
    () => getMovies(search),
    {
      enabled: false,
    }
  );

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (search === "") return;
    getMovies(search);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearch(e.target.value);
  };
  

  return (
    <>
      <PageLayout title="Next - Home">
        <div className={styles.containerMovies}>
          <Container>
            <h1>PelisNext</h1>
            <h3>Busca tus peliculas favoritas</h3>
            <form action="" onSubmit={handleSubmit}>
              <Box py={3}>
                <Input
                  variant="filled"
                  placeholder="Batman.. Superman.. etc"
                  type="text"
                  name="search"
                  value={search}
                  onChange={handleChange}
                />
              </Box>
              <Button
                colorScheme='facebook'
                variant="outline"
                border="none"
                onClick={() => refetch()}
              >
                Buscar
              </Button>
            </form>
          </Container>
          <Box>
            {loading ? (
              <div style={{ padding: 8, marginTop: 30 }}>
                <h2 style={{ textAlign: "center" }}>Cargando...</h2>
              </div>
            ) : null}
            {isError && (
              <div style={{ padding: 8, marginTop: 30 }}>
                <h2 style={{ textAlign: "center" }}>Ops, Algo salio mal...</h2>
              </div>
            )}
            {isSuccess && <MoviesList movies={data} />}
          </Box>
          <Box>
           <MoviesPopularity />
          </Box>
        </div>
      </PageLayout>
    </>
  );
}
