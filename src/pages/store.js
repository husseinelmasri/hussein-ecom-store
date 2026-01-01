import ProductCard from 'components/product-card/product-card';
import { products } from 'utilities/products';

function Store() {
  return (
    <div className="store">
      {products.map((product) => {
        return <ProductCard product={product} />;
      })}
    </div>
  );
}

export default Store;
