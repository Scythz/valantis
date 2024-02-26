import { Button, Form, InputGroup } from "react-bootstrap";
import { Search } from "react-bootstrap-icons";
import useCustomFormik from "../hooks/useCustomFormik";
import "./ProductSearchForm.css"; // Предположим, что стили и анимации добавлены

const ProductSearchForm = ({ setProducts }) => {
  const formik = useCustomFormik({
    initialValues: { productName: '' },
    onSubmit: async (values) => {
      // Обработка формы с оптимизацией запроса
    },
  });

  return (
      <Form onSubmit={formik.handleSubmit} className="search-form-animate">
        <InputGroup className="mb-3">
          <Form.Control
              required
              aria-label="название продукта..."
              name="productName"
              placeholder="Введите название продукта"
              value={formik.values.productName}
              onChange={formik.handleChange}
          />
          <Button
              type="submit"
              variant="outline-dark"
              id="button-addon2"
              className="button-animate"
          >
            <Search />
          </Button>
        </InputGroup>
      </Form>
  );
};

export default ProductSearchForm;
