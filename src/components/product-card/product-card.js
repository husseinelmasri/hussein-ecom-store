import { AiFillDelete } from 'react-icons/ai';
import { removeArrayData } from '../../utils/firebaseFunctions';
function ProductCard({ product }) {
  const { name, description, wasPrice, price, imageURL } = product;

  const handleDelete = async () => {
    await removeArrayData(product);
  };
  return (
    <div className="product-card">
      <div className="product-card_content">
        <img src={imageURL} alt={name} className="product-card_image"></img>
        <span className="product-card_title">{name}</span>
        <span className="product-card_description">{description}</span>
        <div className="product-card_price">
          <span className="product-card_was-price">$ {wasPrice}</span>
          <span className="product-card_now-price">$ {price}</span>
        </div>
      </div>
      <button>Add to Cart</button>
      <AiFillDelete className="product-card_icon" onClick={handleDelete} />
    </div>
  );
}
export default ProductCard;
