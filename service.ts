import axios from "axios";


export const GetMoviesRequest = async (page: string) => {
  try {
    const peti = await axios
      .get(
        `https://api.themoviedb.org/3/discover/movie?api_key=2d8dc0d0266172bfbc6469eb21b8c1c8&language=es&sort_by=popularity.desc&page=` +
          page
      )
      .catch(function (error) {
        if (error.response) {
          throw new Error(error.response);
        }
      });
    return Promise.resolve(peti);
  } catch (error) {
    return Promise.resolve('error');
  }
};

export const GetSearchMoviesRequest = async (search: string) => {
  try {
    const peti = await axios
      .get(
        `https://api.themoviedb.org/3/search/movie?api_key=2d8dc0d0266172bfbc6469eb21b8c1c8&language=es&query=` +
          search
      )
      .catch(function (error) {
        if (error.response) {
          throw new Error(error.response);
        }
      });
    return Promise.resolve(peti);
  } catch (error) {
    return Promise.resolve("error");
  }
};

export const GetMovieDetailRequest = async (id: string) => {
  try {
    const peti = await axios
      .get(
        'https://api.themoviedb.org/3/movie/' +
          id +
          '?api_key=2d8dc0d0266172bfbc6469eb21b8c1c8&language=es'
      )
      .catch(function (error) {
        if (error.response) {
          throw new Error(error.response);
        }
      });
    return Promise.resolve(peti);
  } catch (error) {
    return Promise.resolve("error");
  }
};
