import { Container, MovieInfo, MovieInfoContent, MovieBody } from './styles';

export default function Movie() {
  return (
    <Container>
      <MovieInfo>
        <MovieInfoContent>
          <h1>Header</h1>

          <div>
            <h1>Header 2</h1>
          </div>
        </MovieInfoContent>
      </MovieInfo>

      <MovieBody>
        <h1>Body</h1>
      </MovieBody>
    </Container>
  );
}
