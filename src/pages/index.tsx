import Head from 'next/head';
import { MovieCard } from '../components/MovieCard';

import { Container, FilterMovies, Movies, FilterButtons } from '../styles/Home';

export default function Home() {
  return (
    <Container>
      <Head>
        <title>TMDB</title>
      </Head>

      <FilterMovies>
        <h1>
          Milhões de filmes, séries e pessoas <br /> para descobrir. Explore já.
        </h1>

        <span>Filtre por:</span>

        <FilterButtons>
          <li>
            <button type="button">Ação</button>
          </li>
          <li>
            <button type="button">Romance</button>
          </li>
          <li>
            <button type="button">Drama</button>
          </li>
          <li>
            <button type="button">Comédia</button>
          </li>
        </FilterButtons>
      </FilterMovies>

      <Movies>
        <MovieCard />
        <MovieCard />
        <MovieCard />
        <MovieCard />
        <MovieCard />
        <MovieCard />
        <MovieCard />
        <MovieCard />
      </Movies>
    </Container>
  );
}
