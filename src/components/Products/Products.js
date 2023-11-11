import Section from '../UI/Section';
import ProductItem from './ProductItem';
import styles from './Products.module.css';

const Products = (props) => {
    let productList = <h2>No products found. Add at least one product!</h2>;

    if (props.items.length > 0) {
        productList = (
            <ul>
                {props.items.map((product) => (
                    <ProductItem key={product.id}>{product.text}</ProductItem>
                ))}
            </ul>
        );
    }

    let content = productList;

    if (props.error) {
        content = <button onClick={props.onFetch}>Try again</button>;
    }

    if (props.loading) {
        content = 'Product loading...';
    }

    return (
        <Section>
            <div className={styles.container}>{content}</div>
        </Section>
    );
};

export default Products;
