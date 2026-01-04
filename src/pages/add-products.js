import { useState } from 'react';
import {
  getFrontendErrorMessage,
  handleImageChange,
  addProduct,
} from 'utils/firebaseFunctions';
import { useNavigate } from 'react-router-dom';

function AddProducts() {
  const [inputs, setInputs] = useState({
    title: '',
    price: '',
    wasPrice: '',
    description: '',
  });
  const [selectedImage, setSelectedImage] = useState(null); // Store the file
  const [imageURL, setImageURL] = useState(''); // Store the uploaded URL
  const [error, setError] = useState(null);
  const [isUploading, setIsUploading] = useState(false);
  const navigate = useNavigate();

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setInputs({
      ...inputs,
      [name]: value,
    });
  };

  const handleAddProduct = async (e) => {
    e.preventDefault();
    setError(null);

    if (!selectedImage) {
      setError('Please select an image');
      return;
    }

    if (!imageURL) {
      setError('Please wait for the image to finish uploading');
      return;
    }

    try {
      const productData = {
        ...inputs,
        price: parseFloat(inputs.price),
        wasPrice: parseFloat(inputs.wasPrice),
        imageURL: imageURL,
      };

      const res = await addProduct(productData);
      if (res.success) {
        navigate('/');
      } else {
        setError(res.error);
      }
    } catch (error) {
      setError(error.message);
    }
  };

  const handleFileChange = async (event) => {
    const file = event.target.files[0];
    if (!file) return;

    setSelectedImage(file);
    setIsUploading(true);
    setError(null);

    try {
      const downloadURL = await handleImageChange(event);
      setImageURL(downloadURL);
      setIsUploading(false);
    } catch (error) {
      setError(`Image upload failed: ${error.message}`);
      setIsUploading(false);
      setSelectedImage(null);
      setImageURL('');
    }
  };

  return (
    <div className="add-products">
      <form onSubmit={handleAddProduct} className="form">
        <h2 className="form__title">Add a product</h2>

        <div className="form__group">
          <label className="form__label" htmlFor="image">
            Image
          </label>
          <input
            className="form__input"
            onChange={handleFileChange}
            type="file"
            accept="image/*"
            name="image"
            required
            disabled={isUploading}
          />
          {isUploading && <p className="form__uploading">Uploading image...</p>}
          {imageURL && !isUploading && (
            <p className="form__success">✓ Image uploaded successfully</p>
          )}
        </div>

        <div className="form__group">
          <label className="form__label" htmlFor="title">
            Title
          </label>
          <input
            className="form__input"
            onChange={handleInputChange}
            value={inputs.title}
            type="text"
            name="title"
            required
            placeholder="Enter product title"
            disabled={isUploading}
          />
        </div>

        <div className="form__group">
          <label className="form__label" htmlFor="price">
            Price
          </label>
          <input
            className="form__input"
            onChange={handleInputChange}
            value={inputs.price}
            type="number"
            step="0.01"
            min="0"
            name="price"
            required
            placeholder="Enter price"
            disabled={isUploading}
          />
        </div>

        <div className="form__group">
          <label className="form__label" htmlFor="wasPrice">
            Was Price
          </label>
          <input
            className="form__input"
            onChange={handleInputChange}
            value={inputs.wasPrice}
            type="number"
            step="0.01"
            min="0"
            name="wasPrice"
            required
            placeholder="Enter original price"
            disabled={isUploading}
          />
        </div>

        <div className="form__group">
          <label className="form__label" htmlFor="description">
            Description
          </label>
          <textarea
            className="form__input"
            onChange={handleInputChange}
            value={inputs.description}
            name="description"
            required
            rows={4}
            placeholder="Enter product description"
            disabled={isUploading}
          />
        </div>

        {error && (
          <div className="form__group">
            <p className="form__error">
              {getFrontendErrorMessage(error) || error}
            </p>
          </div>
        )}

        <button
          className="form__button primary"
          type="submit"
          disabled={isUploading || !imageURL}>
          {isUploading ? 'Uploading...' : 'Add Product'}
        </button>
      </form>
    </div>
  );
}

export default AddProducts;
