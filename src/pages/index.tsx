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
  const [selectedGenres, setSelectedGenres] = useState<number[]>([]);

  const { data, isLoading, error } = useMovies(page);

  function handleFilterMoviesByGenres(id: number) {
    if (selectedGenres.includes(id)) {
      const newSelectedGenres = selectedGenres.filter(
        selected => selected !== id
      );

      setSelectedGenres(newSelectedGenres);

      setMoviesByGenre(
        moviesByGenre?.filter(movie =>
          movie.genre_ids.find(genre => newSelectedGenres.includes(genre))
        )
      );
    } else {
      const filteredMovies = data?.movies.filter(movie =>
        movie.genre_ids.includes(id)
      );

      const filterUniqueMovies = filteredMovies?.filter(movie =>
        moviesByGenre?.every(m => m !== movie)
      );

      setMoviesByGenre(prevState => [
        ...(prevState ?? []),
        ...(filterUniqueMovies ?? [])
      ]);
      setSelectedGenres([...selectedGenres, id]);
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
                selected={selectedGenres.includes(genre.id)}
                type="button"
                onClick={() => handleFilterMoviesByGenres(genre.id)}
                disabled={isLoading || !!error}
              >
                {genre.name}
                {selectedGenres.includes(genre.id) && <AiFillCloseCircle />}
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
          {selectedGenres.length !== 0
            ? moviesByGenre?.map(movie => (
                <Link key={movie.id} href={`/movie/${movie.id}`}>
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
                <Link key={movie.id} href={`/movie/${movie.id}`}>
                  <a>
                    <MovieCard
                      title={movie.title}
                      releaseDate={movie.release_date}
                      imgUrl={movie.poster_path}
                    />
                  </a>
                </Link>
              ))}
        </Movies>
      )}

      {data && (
        <Pagination
          lastPage={data?.totalPages}
          currentPage={page}
          onPageChange={setPage}
          resetSelectedGenres={setSelectedGenres}
        />
      )}
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
