export const fetchData = (searchText, year, page, type) => {
    return async (dispatch) => {
        dispatch({ type: 'FETCH_DATA_REQUEST' });
        let url = "https://www.omdbapi.com/?"
      try {
        
        if(searchText){
            url = url + "s=" + searchText + "&"
        }
        if(year){
            url = url + "y=" + year + "&"
        }
        if(page){
            url = url + "page=" + page + "&"
        }
        if(type){
            url = url + "type=" + type + "&"
        }

        url = url + "apikey=" + process.env.KEY;
        const response = await fetch(url);
        const data = await response.json();
        dispatch({ type: 'FETCH_DATA_SUCCESS', payload: data });
      } catch (error) {
        dispatch({ type: 'FETCH_DATA_FAILURE', payload: error.message });
      }
    };
  };

  export const fetchDetail = (id) => {
    console.log("fetchhh", id)
    return async (dispatch) => {
        dispatch({ type: 'FETCH_DETAIL_REQUEST' });
        let url = "https://www.omdbapi.com/"
      try {
        url = url + "?i=" + id + "&apikey=" + process.env.KEY
        const response = await fetch(url);
        const data = await response.json();
        dispatch({ type: 'FETCH_DETAIL_SUCCESS', payload: data });
      } catch (error) {
        dispatch({ type: 'FETCH_DETAIL_FAILURE', payload: error.message });
      }
    };
  };


  