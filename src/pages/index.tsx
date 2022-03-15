import { GetServerSideProps } from 'next';
import Head from 'next/head';
import { useState } from 'react';
import { AiFillCloseCircle } from 'react-icons/ai';

import { MovieCard } from '../components/MovieCard';
import { api } from '../services/api';

import { Container, FilterMovies, Movies, FilterButton } from '../styles/Home';

interface Movie {
  title: string;
  release_date: string;
  poster_path: string;
  genre_ids: number[];
}

interface Genre {
  id: number;
  name: string;
}

interface HomeProps {
  movies: Movie[];
  genres: Genre[];
}

export default function Home({ movies, genres }: HomeProps) {
  const [moviesByGenre, setMoviesByGenre] = useState<Movie[]>([]);
  const [selectedGenre, setSelectedGenre] = useState(null);

  function handleFilterMoviesByGenre(id: any) {
    if (selectedGenre === id) {
      setSelectedGenre(null);
    } else {
      const filteredMovies = movies.filter(movie =>
        movie.genre_ids.includes(id)
      );

      setMoviesByGenre(filteredMovies);
      setSelectedGenre(id);
    }
  }

  return (
    <Container>
      <Head>
        <title>Movies | TMDB</title>
      </Head>

      <FilterMovies>
        <h1>
          Milhões de filmes, séries e pessoas <br /> para descobrir. Explore já.
        </h1>
        <span>Filtre por:</span>

        <ul>
          {genres.map(genre => (
            <li key={genre.id}>
              <FilterButton
                selected={selectedGenre === genre.id}
                type="button"
                onClick={() => handleFilterMoviesByGenre(genre.id)}
              >
                {genre.name}
                {selectedGenre === genre.id && <AiFillCloseCircle />}
              </FilterButton>
            </li>
          ))}
        </ul>
      </FilterMovies>

      <Movies>
        {selectedGenre
          ? moviesByGenre.map(movie => (
              <MovieCard
                key={movie.title}
                title={movie.title}
                releaseDate={movie.release_date}
                imgUrl={movie.poster_path}
              />
            ))
          : movies.map(movie => (
              <MovieCard
                key={movie.title}
                title={movie.title}
                releaseDate={movie.release_date}
                imgUrl={movie.poster_path}
              />
            ))}
      </Movies>
    </Container>
  );
}

export const getServerSideProps: GetServerSideProps = async () => {
  const moviesResponse = await api.get(
    `/movie/popular?api_key=${process.env.API_KEY}&language=pt-BR`
  );

  const genresResponse = await api.get(
    `/genre/movie/list?api_key=${process.env.API_KEY}&language=pt-BR`
  );

  const movies = moviesResponse.data.results.map((movie: Movie) => {
    return {
      title: movie.title,
      release_date: new Date(movie.release_date).toLocaleDateString('pt-BR', {
        day: '2-digit',
        month: 'short',
        year: 'numeric'
      }),
      poster_path: movie.poster_path,
      genre_ids: movie.genre_ids
    };
  });

  return {
    props: {
      movies,
      genres: genresResponse.data.genres
    }
  };
};
