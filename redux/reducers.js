import { combineReducers } from 'redux';

const initialState = {
  data: [],
  detailData: [],
  loading: false,
  error: null
};

const dataReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'FETCH_DATA_REQUEST':
      return {
        ...state,
        loading: true
      };
    case 'FETCH_DATA_SUCCESS':
      return {
        ...state,
        loading: false,
        data: action.payload,
        error: null
      };
    case 'FETCH_DATA_FAILURE':
      return {
        ...state,
        loading: false,
        error: action.payload
      };
      case 'FETCH_DETAIL_REQUEST':
      return {
        ...state,
        loading: true
      };
    case 'FETCH_DETAIL_SUCCESS':
      return {
        ...state,
        loading: false,
        detailData: action.payload,
        error: null
      };
    case 'FETCH_DETAIL_FAILURE':
      return {
        ...state,
        loading: false,
        error: action.payload
      };
    default:
      return state;
  }
};

export default combineReducers({
  data: dataReducer
});
