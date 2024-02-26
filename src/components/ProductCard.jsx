import { Card, Col } from "react-bootstrap";
import styles from "./ProductCard.module.css"; // Импорт стилей как модуль

const ProductCard = ({ brand, id, price, product }) => {
  return (
      <Col lg={4} md={6}>
        <Card className={`${styles.card} shadow bg-body-tertiary h-100`}>
          <Card.Header className={styles.cardHeader}>{product}</Card.Header>
          <Card.Body className="mt-auto">
            <Card.Text>
              <div><b>Артикул</b>: {id}</div>
            </Card.Text>
            <Card.Text><b>Цена</b>: {price} руб.</Card.Text>
            <Card.Text><b>Бренд</b>: {brand}</Card.Text>
          </Card.Body>
        </Card>
      </Col>
  )
};

export default ProductCard;
