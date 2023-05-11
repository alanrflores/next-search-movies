import { MoviesDetails } from "@/components/MoviesDetails";
import { MoviesDetail } from "@/types";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";


export default function Detail() {
  const [detail, setDetail] = useState<MoviesDetail[]>([]);
  const router = useRouter();
  const { id } = router.query;

  const url = `http://www.omdbapi.com/?apikey=${process.env.NEXT_PUBLIC_API_KEY}&i=${id}&plot=full`;

  const getMoviesDetail = (id: string | string[] | undefined ) => {
    fetch(url)
      .then((res) => res.json())
      .then((data) => setDetail(data))
      .catch((error) => console.log(error));
  };

  useEffect(() => {
    getMoviesDetail(id);
  }, []);

  return (
    <>
    <div  style={{
              display: "flex",
              justifyContent: "center",
              flexDirection: "column",
              padding: 6,
              margin: 4,
            }}>
      
      {detail 
       ? (<MoviesDetails moviesDetail={detail}/>)
       : ( <h2>Busque una pelicula para obtener sus detalles.</h2>)
       }
    </div>
    </>
  );
}
