import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import ProductsPage from "./components/ProductsPage";
import Nav from './components/Nav';
import { Container, Form, Dropdown, Col, Row, InputGroup, Button, Navbar } from "react-bootstrap";
import { Search } from "react-bootstrap-icons";
import {useState, useEffect} from "react";
import useCustomFormik from "./hooks/useCustomFormik";
import axios from "axios";
import md5 from "md5";
import ProductSearchFrom from "./components/ProductSearchFrom";


function App() {
  const [products, setProducts] = useState([]);
  const [filterNames, setFilterNames] = useState([]);

  const [filters, setFilters] = useState({});

  const [productName, setProductName] = useState('');

  const [showPriceDropdown, setShowPriceDropdown] = useState(false);
  const [showBrandDropdown, setShowBrandDropdown] = useState(false);


  useEffect(() => {
    const fetchFields = async() => {
      const timestamp = new Date().toISOString().split('T')[0].replace(/-/g, '');
      const authHeader = md5(`Valantis_${timestamp}`);

      try {
        const { data: { result } } = await axios.post('http://api.valantis.store:40000/', { action: 'get_fields' }, {
          headers: { 'X-Auth': authHeader },
        });
        setFilterNames(result);
        const initialFiltersState = Object.fromEntries(result.map((key) => [key, '']));
        setFilters(initialFiltersState);

      } catch(err) {
        console.log(err)
      }
    }
    fetchFields();
  }, []);


  const priceFormik = useCustomFormik({
    initialValues: { price: '' },
    onSubmit: (values) => {
      setFilters(prevFilters => ({ ...prevFilters, price: values.price }));
      setShowPriceDropdown(false);
      console.log( values.price);
    },
  });

  const brandFormik = useCustomFormik({
    initialValues: { brand: '' },
    onSubmit: (values) => {
      setFilters(prevFilters => ({ ...prevFilters, brand: values.brand }));
      setShowBrandDropdown(false);
      console.log(filters);
    },
  });


  return (
    <Container fluid>
       <Nav />
      {
        filterNames.includes('product') &&  <Row className="mt-5 mb-3 d-flex justify-content-center">
          <Col lg={7}>
            <ProductSearchFrom  products={products} setProducts={setProducts}/>
          </Col>
        </Row>
      }

      <Row className="mb-3">
        <Col className="d-flex gap-3">
          <Dropdown show={showPriceDropdown} onToggle={() => setShowPriceDropdown(!showPriceDropdown)}>
            <Dropdown.Toggle
              variant={filters.price ? "dark" : "outline-dark"}
              id="dropdown-basic"
            >
              Цена
            </Dropdown.Toggle>

            <Dropdown.Menu>
              <Form onSubmit={priceFormik.handleSubmit}>
                <div className="d-flex flex-column">
                  <Form.Control
                    required={true}
                    autoFocus
                    name="price"
                    className="mx-3 my-2 w-auto"
                    placeholder="Введите цену"
                    value={priceFormik.values.price}
                    onChange={priceFormik.handleChange}
                  />
                  <div className="text-end py-2 px-2">
                    <Button
                      type="submit"
                      variant="danger"
                    >
                      Применить
                    </Button>
                  </div>

                </div>
              </Form>
            </Dropdown.Menu>
          </Dropdown>

          <Dropdown show={showBrandDropdown} onToggle={() => setShowBrandDropdown(!showBrandDropdown)}>
            <Dropdown.Toggle
              id="dropdown-autoclose-true"
              variant={filters.brand ? "dark" : "outline-dark"}
            >
              Бренд
            </Dropdown.Toggle>

            <Dropdown.Menu>
              <Form onSubmit={brandFormik.handleSubmit}>
                <div className="d-flex flex-column">
                  <Form.Control
                    required={true}
                    autoFocus
                    name="brand"
                    className="mx-3 my-2 w-auto"
                    placeholder="Введите бренд"
                    value={brandFormik.values.brand}
                    onChange={brandFormik.handleChange}
                  />
                  <div className="text-end py-2 px-2">
                    <Button
                      type="submit"
                      variant="danger"
                    >
                      Применить
                    </Button>
                  </div>

                </div>
              </Form>
            </Dropdown.Menu>
          </Dropdown>

          {filters.price || filters.brand ? (
                <Button
                  className="text-decoration-underline fw-semibold border-0"
                  variant="nofill-body"
                  onClick={() => {
                    priceFormik.resetForm();
                    brandFormik.resetForm();
                    setFilters({});
                  }}
                >
                  Сбросить фильтры
                </Button>
          ) : null}
        </Col>

      </Row>
      <ProductsPage products={products} setProducts={setProducts}/>
    </Container>

  );
}

export default App;
