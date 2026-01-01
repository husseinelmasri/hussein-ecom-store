function ProductCard({ product }) {
  const { name, description, wasPrice, price, imageURL } = product;

  return (
    <div className="product-card">
      <div className="product-card_content">
        <img src={imageURL} alt={name} className="product-card_content_image" />

        <span className="product-card_content_title">{name}</span>

        <span className="product-card_content_description">{description}</span>

        <div className="product-card_content_price">
          <span className="product-card_content_price_now">{price}</span>
          <span className="product-card_content_price_slash">{wasPrice}</span>
        </div>
      </div>

      <button className="product-card_btn">Add to Cart</button>
    </div>
  );
}

export default ProductCard;
