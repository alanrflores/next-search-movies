import { MoviesDetails } from "@/components/MoviesDetails";
import {
  MoviesDetail,
} from "@/types";
import { Box } from "@chakra-ui/react";
import { useRouter } from "next/router";
import {  useState } from "react";
import axios from "axios";
import { useQuery } from "@tanstack/react-query";

export default function Detail() {
  // const [detail, setDetail] = useState<MoviesDetail | null>(null);
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  const { id } = router.query;

  const url = `http://www.omdbapi.com/?apikey=${process.env.NEXT_PUBLIC_API_KEY}&i=${id}&plot=full`;

  const getMoviesDetail = async (id: string | string[] | undefined) => {
    if (id) {
      setLoading(true);
      const result = await axios.get(url);
      setLoading(false);
      return result.data;
    }
  };

  const { data, isSuccess, isError } = useQuery<MoviesDetail>(
    ["details", id],
    () => getMoviesDetail(id)
  );

  return (
    <>
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          flexDirection: "column",
          padding: 6,
          margin: 4,
        }}
      >
        <Box>
          {loading ? (
            <div style={{ padding: 8, marginTop: 30 }}>
              <h2 style={{ textAlign: "center", fontFamily: 'Cascadia code', fontWeight: 'bold' }}>Cargando...</h2>
            </div>
          ) : null}
          {isError && (
            <div style={{ padding: 8, marginTop: 30 }}>
              <h2 style={{ textAlign: "center" , fontFamily: 'Cascadia code', fontWeight: 'bold'}}>Ops, Algo salio mal...</h2>
            </div>
          )}
          {isSuccess && <MoviesDetails moviesDetail={data} />}
        </Box>
      </div>
    </>
  );
}
