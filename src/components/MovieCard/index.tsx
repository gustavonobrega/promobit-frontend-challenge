import { Container } from './styles';

interface MovieCardProps {
  title: string;
  releaseDate: string;
  imgUrl: string;
}

export function MovieCard({ title, releaseDate, imgUrl }: MovieCardProps) {
  return (
    <Container>
      <img src={`https://image.tmdb.org/t/p/w500/${imgUrl}`} alt={title} />

      <div>
        <strong>{title}</strong>
        <span>{releaseDate}</span>
      </div>
    </Container>
  );
}
