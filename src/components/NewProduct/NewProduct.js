import Section from '../UI/Section';
import ProductForm from './ProductForm';
import useHttp from '../hooks/use-Http';

const NewProduct = (props) => {
    const { isLoading, error, sendHttpRequest: sendProduct } = useHttp();

    const createProduct = (productText, productData) => {
        const generatedId = productData.name;
        const createdProduct = { id: generatedId, text: productText };

        props.onAddProduct(createdProduct);
    };

    const enterProductHandler = async (productText) => {
        sendProduct(
            {
                endpoint:
                    'https://dmytro-84d92-default-rtdb.asia-southeast1.firebasedatabase.app/products.json',
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: { text: productText },
            },
            createProduct.bind(null, productText)
        );
    };

    return (
        <Section>
            <ProductForm
                onEnterProduct={enterProductHandler}
                loading={isLoading}
            />
            {error && <p>{error}</p>}
        </Section>
    );
};

export default NewProduct;
