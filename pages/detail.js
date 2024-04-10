import { useEffect } from 'react';
import styles from '../styles/Detail.module.scss';
import { useRouter } from 'next/router'
import { useSelector, useDispatch } from 'react-redux';
import { fetchDetail } from '../redux/actions';
import Image from 'next/image'

export default function Detail({ Component, pageProps }) {
    const router = useRouter();
    const movieData = useSelector(state => state.data.detailData);
    const dispatch = useDispatch();
    const loading = useSelector(state => state.data.loading);
    const error = useSelector(state => state.data.error);



    const { Ratings, Poster, imdbID, ...rest } = movieData;
    const headers = Object.keys(movieData);

    useEffect(() => {
        if(router.query.id){
            dispatch(fetchDetail(router.query.id))
        }
        
    }, [dispatch, router])
    return (
        <div className={styles.detailPageWrapper}>
            <div className={styles.posterWrapper}>
                {getImgUrl(movieData.Poster)}
            </div>
            <div className={styles.tableWrapper}>
                <table>
                    <tbody>
                        {Object.entries(rest).map(([key, value], index) => (
                            <tr key={index}>
                                <td><strong>{key}</strong></td>
                                <td>{value}</td>
                            </tr>
                        ))}
                        {Ratings && (
                            <tr>
                                <td><strong>Ratings</strong></td>
                                <td>
                                    <ul>
                                        {Ratings.map((rating, index) => (
                                            <li key={index}>{rating.Source}: {rating.Value}</li>
                                        ))}
                                    </ul>
                                </td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>
        </div>
    )

    function getImgUrl(poster) {
        if (poster !== "N/A") {
            return <Image src={poster} alt='' width={300} height={400}></Image>
        }
    }

}
