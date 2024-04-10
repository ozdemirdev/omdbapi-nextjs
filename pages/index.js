import styles from '../styles/Home.module.scss';
import { useSelector, useDispatch } from 'react-redux';
import { fetchData } from '../redux/actions';
import { useEffect, useState } from 'react';
import FilmList from '../components/filmList';

export default function Home({ Component, pageProps }) {
  const dispatch = useDispatch();
  const filmData = useSelector(state => state.data.data);
  const loading = useSelector(state => state.data.loading);
  const error = useSelector(state => state.data.error);

  const [searchText, setsearchText] = useState("Pokemon")
  const [year, setYear] = useState()
  const [type, setType] = useState("")
  const [activePage, setActivePage] = useState(1)

  useEffect(() => {

    dispatch(fetchData(searchText, year, activePage, type))
  }, [dispatch, activePage]);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <div className={styles.pageWrapper}>
      <div className={styles.filterWrapper}>
        <form onSubmit={onSubmit}>
          <div>
            <label>Search: </label>
            <input type="text" required value={searchText} onChange={handleSearchChange} name="searchText" />
          </div>
          <div>
            <label>Year: </label>
            <input value={year} onChange={handleYearChange} type="number" name="year" min={1900} max={(new Date()).getFullYear()} />
          </div>
          <div>
            <label>Type: </label>
            <select name='type' value={type} onChange={(choice) => handleTypeSelection(choice)} id='type'>
              <option value="">All</option>
              <option value="movie">Movie</option>
              <option value="series">Series</option>
              <option value="episode">Episodes</option>
            </select>
          </div>


          <button type="submit">Search</button>
        </form>
      </div>

        <FilmList filmData={{filmData: filmData}}></FilmList>

      <div className={styles.pagerWrapper}>
        <div onClick={() => handlePageChange(false)}>Prev</div>
        <div>{activePage}</div>
        <div onClick={() => handlePageChange(true)}>Next</div>
      </div>
    </div>

  );

  async function onSubmit(event) {
    event.preventDefault();
    setsearchText(searchText)
    setYear(year),
    setActivePage(1),
    setType(type)
    dispatch(fetchData(searchText, year, activePage, type))
  }

  function handleSearchChange(e) {
    setsearchText(e.target.value)
  }

  function handleYearChange(e){
    setYear(e.target.value)
  }

  function handleTypeSelection(event){
    setType(event.target.value)
  }

  function handlePageChange(isNext){
    let maxPages = 0;
    if(filmData.totalResults % 10 > 0) {
      maxPages = (filmData.totalResults / 10) + 1;
    }
    else{
      maxPages = filmData.totalResults / 10;
    }
    
    if(isNext && maxPages !== activePage){
      setActivePage(activePage + 1)
    }
    else{
      if(activePage > 1){
        setActivePage(activePage - 1)
      }
    }
  }
}
