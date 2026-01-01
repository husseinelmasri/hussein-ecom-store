import { Link, useLocation, useNavigate } from 'react-router-dom';
import { isCartSelected, isStoreSelected } from 'utilities/checkroutes';
function DesktopMenu() {
  const loc = useLocation();
  const navigate = useNavigate();
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
      <button
        onClick={() => navigate('/authenticate')}
        className="navbar_right-side_btn primary">
        LogIn
      </button>
    </>
  );
}
export default DesktopMenu;
