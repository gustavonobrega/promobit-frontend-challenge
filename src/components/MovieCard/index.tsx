import { Container } from './styles';

export function MovieCard() {
  return (
    <Container>
      <img
        src="https://image.tmdb.org/t/p/w500/1g0dhYtq4irTY1GPXvft6k4YLjm.jpg"
        alt="Spider-man no way home"
      />

      <div>
        <strong>Spider-Man: No Way Home</strong>
        <span>15 DEZ 2021</span>
      </div>
    </Container>
  );
}
