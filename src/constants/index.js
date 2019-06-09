export const API = process.env.API || 'http://localhost:3000';
export const API_KEY = process.env.API_KEY || 'ebcccc1c-6e5b-4016-a005-ef950b7febe0';

export const MAX_LIMIT = 5000; // according to Coinmarketcap

export const DEFAULT_VALUE_IDX = 2;
export const SELECT_OPTIONS = [
  {
    value: 10,
    title: '10',
  },
  {
    value: 50,
    title: '50',
  },
  {
    value: 100,
    title: '100',
  },
  {
    value: MAX_LIMIT,
    title: 'all',
  },
];

export const getApiEndpoint = () => `${API}/v1/cryptocurrency/listings/latest`;
export const getDefaultSelectVal = () => SELECT_OPTIONS[DEFAULT_VALUE_IDX].value;