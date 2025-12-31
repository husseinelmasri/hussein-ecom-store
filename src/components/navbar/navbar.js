import { Link } from 'react-router-dom';
import useWindowSize from 'utilities/useWindowSize';
import DesktopMenu from './desktop-menu/desktop-menu';
import MobileMenu from './mobile-menu/mobile-menu';
import { useState, useEffect } from 'react';
import { AiOutlineClose } from 'react-icons/ai';
import { RxHamburgerMenu } from 'react-icons/rx';

function NavBar() {
  const { width } = useWindowSize();
  const [isMenuOpened, setIsOpenedMenu] = useState(false);

  const openMenu = () => {
    setIsOpenedMenu(true);
  };
  const closeMenu = () => {
    setIsOpenedMenu(false);
  };
  useEffect(() => {
    if (width > 800) {
      closeMenu();
    }
  }, [width]);
  return (
    <div>
      <div className="navbar">
        <div className="navbar_left-side">
          <Link to="/">
            <div className="navbar_left-side_logo">
              <span className="navbar_left-side_logo_text">
                Hussein<b> Ecom</b> Store
              </span>
            </div>
          </Link>
        </div>

        <div className="navbar_right-side">
          {width < 800 ? (
            isMenuOpened ? (
              <AiOutlineClose
                className="navbar_right-side_icon"
                onClick={closeMenu}
              />
            ) : (
              <RxHamburgerMenu
                className="navbar_right-side_icon"
                onClick={openMenu}
              />
            )
          ) : (
            <DesktopMenu />
          )}
        </div>
      </div>

      {isMenuOpened && <MobileMenu closeFn={closeMenu} />}
    </div>
  );
}

export default NavBar;
