import { useEffect } from 'react';
import styles from './filmList.module.scss';
import Image from 'next/image'
import { useRouter } from 'next/router';

export default function FilmList({ Component, pageProps, filmData }) {
    const router = useRouter();

  return (
      <div className={styles.cardsWrapper}>
        {
          filmData.filmData?.Search?.map((film) => {
            return <div className={styles.cardWrapper} key={film.imdbID} onClick={() => handleRedirect(film.imdbID)}>
              <div className={styles.posterWrapper}>
              {getImgUrl(film.Poster)}
              </div>
              <h5>{film.Title}</h5>
              <div>{film.Type}</div>
              <div>{film.Year}</div>
            </div>
          })
        }
      </div>
  );

  function getImgUrl(poster){
    if(poster !== "N/A"){
      return <Image src={poster} alt='' width={150} height={200}></Image>
    }
  }

  function handleRedirect(id){
    router.push("/detail?id=" + id)
  }

}
