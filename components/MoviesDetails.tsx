import { MoviesDetailProps } from "@/types";
import styles from '@/styles/MoviesDetail.module.css'

export const MoviesDetails: React.FC<MoviesDetailProps> = ({ moviesDetail }) => {
//  console.log('moviesDetail', moviesDetail)

 const { Actors,  Director, Genre, Language, Plot, Poster, Title, Type } = moviesDetail;
return (
    <div className={styles.detail}>
      <div className={styles.detailImg}>
      <img src={Poster} alt={Title} />
      </div>
      <h1>{Title}</h1>
      <ul>
        <li>Trama : {Plot}</li>
        <hr />
        <li>Actores : {Actors}</li>
        <hr />
        <li>Directores : {Director}</li>
        <hr />
        <li>Genero : {Genre}</li>
        <hr />
        <li>Idioma : {Language}</li>
        <hr />
        <li>Tipo : {Type}</li>
        <hr />
      </ul>
    </div>
)
};