import { MoviesListProps } from "@/types";
import styles from "@/styles/MoviesList.module.css";
import Link from "next/link";
export const MoviesList: React.FC<MoviesListProps> = ({ movies }) => {
  return (
    <div className={styles.movies}>
      {movies?.map((movie) => (
        <div key={movie.imdbID} className={styles.moviesDetail}>
        <Link href={`/detail/${movie.imdbID}`}>
          <img src={movie.Poster} alt={movie.Title} />
          <h4>{movie.Title}</h4>
          <span>{movie.Year}</span>
        </Link>
        </div>
      ))}
    </div>
  );
};
