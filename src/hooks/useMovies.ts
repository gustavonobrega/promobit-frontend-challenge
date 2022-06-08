import { useQuery } from 'react-query';
import { api } from '../services/api';

interface Movie {
  id: number;
  title: string;
  release_date: string;
  poster_path: string;
  genre_ids: number[];
}

interface GetMoviesResponse {
  totalPages: number;
  movies: Movie[];
}

async function getMovies(page: number): Promise<GetMoviesResponse> {
  const { data } = await api.get(
    `/movie/popular?api_key=${process.env.NEXT_PUBLIC_API_KEY}&language=pt-BR&page=${page}`
  );

  const totalPages = data.total_pages;

  const movies = data.results.map((movie: Movie) => {
    return {
      id: movie.id,
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

  return { movies, totalPages };
}

export function useMovies(page: number) {
  return useQuery(['movies', page], () => getMovies(page), {
    staleTime: 60 * 60 // 1 hour
  });
}
