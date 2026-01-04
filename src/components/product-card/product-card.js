import { MainContext } from 'utils/context';
import { useContext, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { deleteProduct, updateArrayData } from 'utils/firebaseFunctions';
import { AiFillDelete } from 'react-icons/ai';

function ProductCard({ product, onDeleteSuccess }) {
  const { id, imageURL, title, wasPrice, description, price } = product;
  const { user, isAdmin } = useContext(MainContext);
  const [isDeleting, setIsDeleting] = useState(false);
  const [deleteError, setDeleteError] = useState(null);
  const navigate = useNavigate();

  const addProduct = async () => {
    await updateArrayData(product);
  };

  const redirectToLogin = () => {
    navigate('/authenticate');
  };

  const handleDelete = async () => {
    if (!window.confirm(`Are you sure you want to delete "${title}"?`)) {
      return;
    }

    setIsDeleting(true);
    setDeleteError(null);

    try {
      const result = await deleteProduct(id);

      if (result.success) {
        if (onDeleteSuccess) {
          onDeleteSuccess(id);
        }
      } else {
        setDeleteError(result.error);
      }
    } catch (error) {
      setDeleteError('Failed to delete product');
    } finally {
      setIsDeleting(false);
    }
  };

  return (
    <div className="product-card">
      <div className="product-card__content">
        <img
          className="product-card__content__image"
          alt={title}
          src={imageURL}
        />
        <span className="product-card__content__title"> {title}</span>
        <div className="product-card__content__price">
          ${parseFloat(price).toFixed(2)}{' '}
          {wasPrice && (
            <span className="product-card__content__price__slash">
              ${parseFloat(wasPrice).toFixed(2)}
            </span>
          )}
        </div>
        <span className={`${!isAdmin && 'product-card__content__description'}`}>
          {description}
        </span>

        {isAdmin && (
          <div className="product-card__admin-controls">
            <AiFillDelete
              className={`product-card__content__remove ${
                isDeleting ? 'deleting' : ''
              }`}
              onClick={!isDeleting ? handleDelete : undefined}
              title={isDeleting ? 'Deleting...' : 'Delete product'}
              disabled={isDeleting}
            />
            {isDeleting && <span className="deleting-text">Deleting...</span>}
          </div>
        )}

        {deleteError && isAdmin && (
          <div className="product-card__error">{deleteError}</div>
        )}
      </div>
      <button
        className="product-card__btn"
        onClick={(e) => {
          e.preventDefault(); // ADD THIS to prevent form submission
          if (user) {
            addProduct();
          } else {
            redirectToLogin();
          }
        }}
        disabled={isDeleting}>
        {isDeleting ? 'Processing...' : 'Add to cart'}
      </button>
    </div>
  );
}

export default ProductCard;
