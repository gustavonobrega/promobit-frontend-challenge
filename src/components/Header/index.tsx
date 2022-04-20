import Link from 'next/link';
import { Container, Content } from './styles';

export function Header() {
  return (
    <Container>
      <Content>
        <Link href="/">
          <a>
            <img src="/images/tmdb.svg" alt="tmdb" />
          </a>
        </Link>
      </Content>
    </Container>
  );
}
