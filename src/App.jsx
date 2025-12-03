import React from 'react'
import Search from './components/Search.jsx';
import {  useEffect, useState  } from 'react';
import { Spinner } from './components/Spinner.jsx';
import { MovieCard } from './components/MovieCard.jsx';
import { useDebounce } from 'react-use';



 const API_BASE_URL = 'https://api.themoviedb.org/3/';

  const API_KEY = import.meta.env.VITE_TMDB_API_KEY;


  const API_OPTIONS = {
  method: 'GET',
  headers: {
    accept: 'application/json',
    Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI5ZGQzOTQ4MjU3MDI4ZGVjYzUyYjYyOGI0ZDc2OTM2YiIsIm5iZiI6MTc2NDcwNTU0NC4yNzAwMDAyLCJzdWIiOiI2OTJmNDUwOGU0MWU5Y2MyMWMzZWE5OWMiLCJzY29wZXMiOlsiYXBpX3JlYWQiXSwidmVyc2lvbiI6MX0.BlQoThzs4zl3j8NkbSYV9LtMKpuBWnaCB3sTgC8mJhY'
  }
};

const App = () => {

 

const [searchTerm, setSearchTerm] = useState('');
const [errorMessage, setErrorMessage] = useState('');
const [movieList, setMovieList] = useState([]);
const [isLoading, setIsLoading] = useState(false);
const [debouncedSearchTerm, setDebouncedSearchTerm] = useState(''); 


// Debounce the search term to prevent making too many API request by waiting for the user to stop typing for 500ms
useDebounce( () => setDebouncedSearchTerm(searchTerm),500, [searchTerm])

const fetchMovies = async (query = '') => {
  setIsLoading(true);
  setErrorMessage('');
  try {
    const endpoint = query 
    ? `${API_BASE_URL}/search/movie?query=${encodeURIComponent(query)}`
    : `${API_BASE_URL}discover/movie?sort_by=popularity.desc`;
    const response = await fetch(endpoint, API_OPTIONS);

    if (!response.ok) {
      throw new Error('Failed to fetch movies.');
    }

    const data = await response.json();

    // TMDB returns an array under `results`
    if (!data || !Array.isArray(data.results)) {
      throw new Error('Unexpected API response shape.');
    }

    setMovieList(data.results);
  } catch (error) {
    console.log(`Error fetching movies: ${error}`);
    setMovieList([]);
    setErrorMessage('Error fetching movies. Please try again later.');
  } finally {
    setIsLoading(false);
  }
}


useEffect(
  () => {
  fetchMovies(debouncedSearchTerm);
  }, [debouncedSearchTerm]
);

  return (
    <main>
      <div className='pattern' />
    

   <div className='wrapper'>
    <header>
      <img src="./hero.png" alt="Hero Background"/>
      <h1>Find <span className='text-gradient'>Movie</span> You'll Enjoy Without the Hassle </h1>

    <Search searchTerm={searchTerm} setSearchTerm={setSearchTerm}/>
    </header>
    <section className="all-movies">
    <h2 className='mt-[40px]'>All movies</h2>

    {isLoading ? (
      <Spinner />
    ) : errorMessage ? (
      <p className='text-red-500'>{errorMessage}</p>
    ): (
      <ul>
        {movieList.map((movie) => (
         <MovieCard  key = {movie.id} movie={movie} />
        ))}
      </ul>
    )}

    {errorMessage && <p className="text-red-500">{errorMessage}</p>}
    </section>
    </div>
    </main>
  )
}

export default App