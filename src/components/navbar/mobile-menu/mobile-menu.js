import { Link, useLocation } from 'react-router-dom';
import { isCartSelected, isStoreSelected } from 'utilities/checkroutes';

function MobileMenu(closeFn) {
  const loc = useLocation();

  return (
    <div className="mobile-menu">
      <div className="mobile-menu_content">
        <Link
          onClick={closeFn}
          to="/"
          className={`mobile-menu_content_item ${
            isStoreSelected(loc.pathname)
              ? 'mobile-menu_content_item--selected'
              : ''
          }`}>
          Store
        </Link>

        <Link
          onClick={closeFn}
          to="/cart"
          className={`mobile-menu_content_item ${
            isCartSelected(loc.pathname)
              ? 'mobile-menu_content_item--selected'
              : ''
          }`}>
          Cart
        </Link>

        <button className="mobile-menu_content_btn primary">LogIn</button>
      </div>
    </div>
  );
}

export default MobileMenu;
