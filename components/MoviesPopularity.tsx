import { Container } from "@chakra-ui/react";
import React, { useEffect, useState } from "react";
import axios from "axios";
import { MoviesPopularity } from "@/types";
import { useQuery } from "@tanstack/react-query";
import { MoviesPopularityDetails } from "./MoviesPopularityDetails";

let url = `https://api.themoviedb.org/3/discover/movie?api_key=${process.env.NEXT_PUBLIC_KEY_OMDB}&include_adult=false&include_video=true&language=en-US&page=1&sort_by=popularity.desc`;

function MoviesPopularity() {
  const getMoviesPopularity = async (): Promise<
    MoviesPopularity[] | undefined
  > => {
    try {
      const res = await axios.get(url);
      return res.data.results;
    } catch (error) {
      console.log(error);
    }
  };

  const { data, isError, isSuccess } = useQuery(
    ["popularity"],
    () => getMoviesPopularity(),
    {
      enabled: true,
    }
  );

  return <>{data && <MoviesPopularityDetails moviesPopularity={data} />}</>;
}

export default MoviesPopularity;
