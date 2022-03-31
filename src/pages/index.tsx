/* eslint-disable no-nested-ternary */
import { GetStaticProps } from 'next';
import Head from 'next/head';
import Link from 'next/link';
import { useState } from 'react';
import { AiFillCloseCircle } from 'react-icons/ai';
import { LoadingSpinner } from '../components/LoadingSpinner';

import { MovieCard } from '../components/MovieCard';
import { Pagination } from '../components/Pagination';
import { useMovies } from '../hooks/useMovies';
import { api } from '../services/api';

import {
  Container,
  FilterMovies,
  Movies,
  FilterButton,
  Loading,
  Error
} from '../styles/Home';

interface Movie {
  id: number;
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
  genres: Genre[];
}

export default function Home({ genres }: HomeProps) {
  const [page, setPage] = useState(1);
  const [moviesByGenre, setMoviesByGenre] = useState<Movie[] | undefined>([]);
  const [selectedGenre, setSelectedGenre] = useState(null);

  const { data, isLoading, error } = useMovies(page);

  function handleFilterMoviesByGenre(id: any) {
    if (selectedGenre === id) {
      setSelectedGenre(null);
    } else {
      const filteredMovies = data?.movies.filter(movie =>
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
                disabled={isLoading || !!error}
              >
                {genre.name}
                {selectedGenre === genre.id && <AiFillCloseCircle />}
              </FilterButton>
            </li>
          ))}
        </ul>
      </FilterMovies>

      {isLoading ? (
        <Loading>
          <LoadingSpinner />
        </Loading>
      ) : error ? (
        <Error>
          <h1>Falha ao obter dados dos filmes.</h1>
        </Error>
      ) : (
        <Movies>
          {selectedGenre
            ? moviesByGenre?.map(movie => (
                <Link key={movie.id} href={`/movies/${movie.id}`}>
                  <a>
                    <MovieCard
                      title={movie.title}
                      releaseDate={movie.release_date}
                      imgUrl={movie.poster_path}
                    />
                  </a>
                </Link>
              ))
            : data?.movies.map(movie => (
                <Link key={movie.id} href={`/movies/${movie.id}`}>
                  <a>
                    <MovieCard
                      key={movie.title}
                      title={movie.title}
                      releaseDate={movie.release_date}
                      imgUrl={movie.poster_path}
                    />
                  </a>
                </Link>
              ))}
        </Movies>
      )}

      {data && <Pagination />}
    </Container>
  );
}

export const getStaticProps: GetStaticProps = async () => {
  const genresResponse = await api.get(
    `/genre/movie/list?api_key=${process.env.NEXT_PUBLIC_API_KEY}&language=pt-BR`
  );

  return {
    props: {
      genres: genresResponse.data.genres
    },
    revalidate: 60 * 60 * 24 // 24 hours
  };
};
