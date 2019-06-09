import React, { useEffect, useReducer, useState } from 'react';
import axios from 'axios';
import { message } from 'antd';
import * as QS from 'query-string';
import { withRouter } from 'react-router-dom';
import Main from './Main';
import { API_KEY, getDefaultSelectVal, getApiEndpoint } from '../../constants';

function preparingData(data = []) {
  return Array.isArray(data)
    ? data.map(item => ({
      id: item.id,
      name: item.name,
      cmcRank: item.cmc_rank,
      price: item.quote.USD.price,
      priceChange24: item.quote.USD.percent_change_24h,
      marketCap: item.quote.USD.market_cap,
      volume24: item.quote.USD.volume_24h,
    }))
    : [];
}

const initialState = {
  data: [],
  loading: false,
};

const LOADING = 'loading';
const SUCCESS = 'success';
const ERROR = 'error';

function reducer(state, action) {
  switch (action.type) {
    case LOADING:
      return {
        data: [],
        loading: true,
      };
    case SUCCESS:
      return {
        data: preparingData(action.data),
        loading: false,
      };
    case ERROR:
      return initialState;
    default:
      return state;
  }
}

function useFetchData() {
  const [state, dispatch] = useReducer(reducer, initialState);

  async function fetchData(url, params) {
    dispatch({ type: LOADING });

    try {
      const res = await axios(url, {
        params: {
          CMC_PRO_API_KEY: API_KEY,
          start: 1,
          convert: 'USD',
          ...params,
        },
      });
      dispatch({ type: SUCCESS, data: res.data.data });
    } catch (e) {
      dispatch({ type: ERROR });
      message.error('Something is wrong! Try again!');
    }
  }

  return [state, fetchData];
}

function MainContainer({ history, location }) {
  const [state, fetchData] = useFetchData();
  const [limit, setLimit] = useState(QS.parse(location.search).limit || getDefaultSelectVal());

  useEffect(() => {
    fetchData(getApiEndpoint(), { limit });
  }, [limit]);

  function changeLimit(value) {
    // save state in query params
    const prevSearch = QS.parse(location.search);
    const newSearch = QS.stringify({
      ...prevSearch,
      limit: value,
    });
    history.push(`?${newSearch}`);

    setLimit(value);
  }

  return (
    <Main
      data={state.data}
      loading={state.loading}
      limit={limit}
      changeLimit={changeLimit}
    />
  );
}

export default withRouter(MainContainer);
