import { Container, Navbar } from "react-bootstrap";
import "./Nav.css"; // Предположим, что стили и анимации добавлены в этот файл

const Nav = () => {
    return (
        <Navbar className="bg-light shadow nav-animate">
            <Container>
                <Navbar.Brand href="#" className="brand-animate">
                    <img
                        src="https://img.hhcdn.ru/employer-logo/4104152.png" // Использование локального логотипа в формате SVG
                        alt="logo"
                        width={45}
                        height={45}
                    />{' '}
                    ВАЛАНТИС
                </Navbar.Brand>
            </Container>
        </Navbar>
    );
};

export default Nav;