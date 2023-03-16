export const BASE_URL = 'https://v2.jokeapi.dev/';

export const GET_CATEGORY = 'categories';
export const GET_NESTED_CATEGORY = category => {
  return `joke/${category}?type=single&amount=2`;
};
