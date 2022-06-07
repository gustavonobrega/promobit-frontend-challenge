import { GetServerSideProps } from 'next';
import Link from 'next/link';
import { CircularProgressbar } from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css';
import { MovieCard } from '../../components/MovieCard';
import { api } from '../../services/api';

import {
  Container,
  MovieHeader,
  MovieInfoContent,
  AboutTheMovie,
  MovieRating,
  MovieBody,
  MovieCast,
  MovieTrailer,
  MovieRecommendations
} from './styles';

interface MovieInfos {
  title: string;
  overview: string;
  poster_path: string;
  vote_average: number;
  runtime: number;
  genres: [{ id: number; name: string }];
  certification: string;
  release_date: string;
}

interface MovieCrew {
  id: number;
  original_name: string;
  job: string;
}

interface MovieCast {
  original_name: string;
  character: string;
  profile_path: string;
}

interface MovieTrailer {
  name: string;
  key: string;
}

interface MovieRecommendations {
  id: number;
  title: string;
  release_date: string;
  poster_path: string;
}

interface MovieProps {
  movie: MovieInfos;
  movieCast: MovieCast[];
  movieTrailer: MovieTrailer;
  movieRecommendation: MovieRecommendations[];
  movieCrew: MovieCrew[];
}

export default function Movie({
  movie,
  movieCast,
  movieTrailer,
  movieRecommendation,
  movieCrew
}: MovieProps) {
  return (
    <Container>
      <MovieHeader>
        <MovieInfoContent>
          <img
            src={`https://image.tmdb.org/t/p/w500/${movie.poster_path}`}
            alt={movie.title}
          />

          <AboutTheMovie>
            <h1>{movie.title}</h1>

            <div>
              <span>
                {movie.certification ? `${movie.certification} anos` : ''}
              </span>
              <span> • {movie.release_date} </span>
              {movie.genres.map(genre => (
                <span>• {genre.name}, </span>
              ))}
              <span>• {movie.runtime}</span>
            </div>

            <MovieRating>
              <div>
                <CircularProgressbar
                  value={movie.vote_average}
                  text={`${movie.vote_average}%`}
                  background
                  strokeWidth={10}
                />
              </div>
              <p>
                Avaliação dos <br />
                usuários
              </p>
            </MovieRating>

            <strong>Sinopse</strong>
            <p>{movie.overview}</p>

            <ul>
              {movieCrew.map(person => (
                <li key={person.id}>
                  <strong>{person.original_name}</strong>
                  <p>{person.job}</p>
                </li>
              ))}
            </ul>
          </AboutTheMovie>
        </MovieInfoContent>
      </MovieHeader>

      <MovieBody>
        <MovieCast>
          <h1>Elenco</h1>

          <ul>
            {movieCast.map(cast => (
              <li key={cast.original_name}>
                <img
                  src={`https://image.tmdb.org/t/p/w500/${cast.profile_path}`}
                  alt={cast.original_name}
                />
                <strong>{cast.original_name}</strong>
                <p>{cast.character}</p>
              </li>
            ))}
          </ul>
        </MovieCast>

        <MovieTrailer>
          <h1>Trailer</h1>

          <iframe
            src={`https://www.youtube.com/embed/${movieTrailer.key}`}
            title={movieTrailer.name}
            frameBorder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
          />
        </MovieTrailer>

        <MovieRecommendations>
          <h1>Recomendações</h1>

          <div>
            {movieRecommendation.slice(0, 6).map(movieReco => (
              <Link key={movieReco.id} href={`/movie/${movieReco.id}`}>
                <a>
                  <MovieCard
                    title={movieReco.title}
                    releaseDate={movieReco.release_date}
                    imgUrl={movieReco.poster_path}
                  />
                </a>
              </Link>
            ))}
          </div>
        </MovieRecommendations>
      </MovieBody>
    </Container>
  );
}

export const getServerSideProps: GetServerSideProps = async context => {
  const { params } = context;

  const [
    movieInfo,
    movieDate,
    movieCredits,
    movieTrailer,
    movieRecommendations
  ] = await Promise.all([
    api.get(
      `/movie/${params?.id}?api_key=${process.env.NEXT_PUBLIC_API_KEY}&language=pt-BR`
    ),
    api.get(
      `/movie/${params?.id}/release_dates?api_key=${process.env.NEXT_PUBLIC_API_KEY}`
    ),
    api.get(
      `/movie/${params?.id}/credits?api_key=${process.env.NEXT_PUBLIC_API_KEY}&language=pt-BR`
    ),
    api.get(
      `/movie/${params?.id}/videos?api_key=${process.env.NEXT_PUBLIC_API_KEY}&language=pt-BR`
    ),
    api.get(
      `/movie/${params?.id}/recommendations?api_key=${process.env.NEXT_PUBLIC_API_KEY}&language=pt-BR&page=1`
    )
  ]);

  function movieDuration(duration: number) {
    const hours = duration / 60;
    const movieHours = Math.floor(hours);

    const minutes = (hours - movieHours) * 60;
    const movieMinutes = Math.round(minutes);

    return `${movieHours}h ${movieMinutes}m`;
  }

  const findReleaseDate = movieDate.data.results.find(
    (result: { iso_3166_1: string }) =>
      result.iso_3166_1 === 'BR' || result.iso_3166_1 === 'US'
  );

  const movie = {
    title: movieInfo.data.title,
    overview: movieInfo.data.overview,
    poster_path: movieInfo.data.poster_path,
    vote_average: movieInfo.data.vote_average.toString().replace('.', ''),
    runtime: movieDuration(movieInfo.data.runtime),
    genres: movieInfo.data.genres,
    certification: findReleaseDate.release_dates[0].certification,
    release_date: new Date(
      findReleaseDate.release_dates[0].release_date
    ).toLocaleDateString('pt-BR')
  };

  const filterCrewByDepartment = movieCredits.data.crew.filter(
    (person: { department: string; job: string }) => {
      return person.department === 'Writing' || person.job === 'Director';
    }
  );

  const movieCrew = filterCrewByDepartment.filter(
    (person: MovieCrew, index: number) =>
      filterCrewByDepartment.findIndex(
        (p: MovieCrew) => person.original_name === p.original_name
      ) === index
  );

  const movieRecommendation = movieRecommendations.data.results.map(
    (recommendations: MovieRecommendations) => {
      return {
        id: recommendations.id,
        title: recommendations.title,
        release_date: new Date(recommendations.release_date).toLocaleDateString(
          'pt-BR',
          {
            day: '2-digit',
            month: 'short',
            year: 'numeric'
          }
        ),
        poster_path: recommendations.poster_path
      };
    }
  );

  return {
    props: {
      movie,
      movieCast: movieCredits.data.cast,
      movieTrailer: movieTrailer.data.results[0],
      movieRecommendation,
      movieCrew
    }
  };
};
