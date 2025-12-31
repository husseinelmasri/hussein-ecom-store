import { Link, useLocation } from 'react-router-dom';
import { isCartSelected, isStoreSelected } from 'utilities/checkroutes';
function DesktopMenu() {
  const loc = useLocation();
  return (
    <>
      <Link
        to="/"
        className={`navbar_right-side_item ${
          isStoreSelected(loc.pathname) && 'navbar_right-side_item--selected'
        }`}>
        Store
      </Link>
      <Link
        to="/cart"
        className={`navbar_right-side_item ${
          isCartSelected(loc.pathname) && 'navbar_right-side_item--selected'
        }`}>
        Cart
      </Link>
      <button className="navbar_right-side_btn primary">LogIn</button>
    </>
  );
}
export default DesktopMenu;
