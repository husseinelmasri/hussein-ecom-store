import { Link, useLocation, useNavigate } from 'react-router-dom';
import { isCartSelected, isStoreSelected } from 'utilities/checkroutes';

import { useContext } from 'react';
import { MainContext } from 'utilities/context';
import { signOutUser } from 'utilities/firebaseFunctions'; // ✅ import added

function DesktopMenu() {
  const { user, loading } = useContext(MainContext);
  const loc = useLocation();
  const navigate = useNavigate();

  // ✅ Fixed: function reference, not immediate call
  const handleSignOut = async () => {
    try {
      await signOutUser();
      navigate('/authenticate'); // optional: redirect after sign out
    } catch (err) {
      console.error(err);
    }
  };

  if (loading) return null; // optional: wait for auth state

  return (
    <>
      <Link
        to="/"
        className={`navbar_right-side_item ${
          isStoreSelected(loc.pathname)
            ? 'navbar_right-side_item--selected'
            : ''
        }`}>
        Store
      </Link>

      <Link
        to="/cart"
        className={`navbar_right-side_item ${
          isCartSelected(loc.pathname) ? 'navbar_right-side_item--selected' : ''
        }`}>
        Cart
      </Link>

      {user ? (
        <button
          onClick={handleSignOut} // ✅ corrected
          className="navbar_right-side_btn primary">
          Sign Out
        </button>
      ) : (
        <button
          onClick={() => navigate('/authenticate')}
          className="navbar_right-side_btn primary">
          Log In
        </button>
      )}
    </>
  );
}

export default DesktopMenu;
