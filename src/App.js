import React, { useEffect, useState } from 'react';

import Products from './components/Products/Products';
import NewProduct from './components/NewProduct/NewProduct';
import useHttp from './components/hooks/use-Http';

function App() {
    const [products, setProducts] = useState([]);

    const { sendHttpRequest: fetchProducts, isLoading, error } = useHttp();

    useEffect(() => {
        const manageProducts = (productsData) => {
            const loadedProducts = [];

            for (const productKey in productsData) {
                loadedProducts.push({
                    id: productKey,
                    text: productsData[productKey].text,
                });
            }

            setProducts(loadedProducts);
        };
        fetchProducts(
            {
                endpoint:
                    'https://dmytro-84d92-default-rtdb.asia-southeast1.firebasedatabase.app/products.json',
            },
            manageProducts
        );
    }, [fetchProducts]);

    const productAddHandler = (product) => {
        setProducts((prevProducts) => prevProducts.concat(product));
    };

    return (
        <React.Fragment>
            <NewProduct onAddProduct={productAddHandler} />
            <Products
                items={products}
                loading={isLoading}
                error={error}
                onFetch={fetchProducts}
            />
        </React.Fragment>
    );
}

export default App;
