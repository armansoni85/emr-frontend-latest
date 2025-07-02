import { Link, NavLink, useLocation } from "react-router-dom";
import {
  setActiveMenu,
  setMenuByRole,
  toggleSidebar,
} from "../../../redux/reducers/sidebarReducer";
import { useDispatch, useSelector } from "react-redux";
import { useTheme } from "@src/context/ThemeContext";

import { EachLoop } from "../../../utils/EachLoop";
import { useEffect } from "react";

const SideBar = () => {
  const { isSidebarOpen, activeMenu, activeSubMenu, menus } = useSelector(
    (state) => state.sideNavBar
  );

  const { user } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const { theme, setTheme } = useTheme();

  const location = useLocation();
  const { pathname } = location;

  useEffect(() => {
    const matchingMenu = menus.find(
      (menu) =>
        menu.path === pathname ||
        (menu.children &&
          menu.children.some((child) => child.path === pathname)) // Match sub-menu
    );

    if (matchingMenu) {
      if (matchingMenu.children) {
        const matchingChild = matchingMenu.children.find(
          (child) => child.path === pathname
        );
        if (matchingChild) {
          if (
            activeMenu?.id === matchingMenu.id &&
            activeSubMenu?.id === matchingChild.id
          ) {
            return;
          }
          dispatch(
            setActiveMenu({
              parentId: matchingMenu.id,
              childId: matchingChild.id,
            })
          );
          return;
        }
      }

      if (activeMenu?.id === matchingMenu.id) {
        return;
      }
      dispatch(setActiveMenu({ parentId: matchingMenu.id }));
    } else {
      if (activeMenu) {
        dispatch(setActiveMenu({ parentId: null, childId: null }));
      }
    }
  }, [pathname, dispatch, menus, activeMenu, activeSubMenu]);

  useEffect(() => {
    if (user) {
      dispatch(setMenuByRole({ role: user.role }));
    }
  }, [user, dispatch]);

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < 768) {
        dispatch(toggleSidebar(false));
      } else {
        dispatch(toggleSidebar(true));
      }
    };

    // Handle on first load
    handleResize();

    window.addEventListener("resize", handleResize);

    // Cleanup on component unmount
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, [dispatch]);

  const iconType = (type, icon, isChild = false) => {
    switch (type) {
      case "image":
        return <img src={`/assets/icons/${icon}`} />;
      case "material-icon":
        return (
          <i
            className={`material-icons ${isChild ? "text-xs mr-2" : "align-middle"
              }`}
          >
            {icon}
          </i>
        );
      default:
        return null;
    }
  };

  return (
    <div
      id="sidebar"
      className={`transition-all min-h-screen h-fit max-h-screen overflow-auto text-white p-4 sidebar z-[999] ${isSidebarOpen ? "md:sidebar-visible sidebar-visible" : "sidebar-hidden"
        }`}
      style={{
        backgroundColor: theme.primaryColor,
        color: "var(--body-text-color)",
      }}
    >
      <div
        className="flex items-center justify-center mb-6 bg-white text-primary rounded-xl h-24"
        style={{
          color: "var(--primary-color)",
          fontFamily: "var(--font-family)",
        }}
      >
        <img src="/assets/images/LogoIcon.png" alt="Logo" className="mr-3" />
        <h2
          className={`text-2xl font-bold sidebar-text ${isSidebarOpen ? "" : "hide-text"
            }`}
          style={{
            color: "var(--primary-color)",
            fontFamily: "var(--font-family)",
          }}
        >
          MEDAIPRO
        </h2>
        <button
          className="material-icons text-3xl cursor-pointer block md:hidden"
          onClick={() => dispatch(toggleSidebar())}
          style={{ color: "var(--primary-color)" }}
        >
          close
        </button>
      </div>
      <ul>
        <EachLoop
          of={menus}
          render={(item) => {
            return (
              <>
                <li className="text-white">
                  {item.children ? (
                    <Link
                      id={item.id}
                      className={`tab p-4 rounded cursor-pointer flex gap-2 ${item.children ? "flex items-center" : ""
                        } ${activeMenu?.id === item.id ? "active" : ""}`}
                      onClick={(e) => {
                        e.preventDefault();
                        dispatch(setActiveMenu({ parentId: item.id }));
                      }}
                    >
                      {iconType(item.iconType, item.icon)}
                      <span
                        className={`ml-2 sidebar-text text-white ${isSidebarOpen ? "" : "hide-text"
                          }`}
                      >
                        {item.text} {item.childState}
                      </span>
                      {item.children && (
                        <span className="material-icons ml-auto">
                          {item.childState ? "expand_more" : "chevron_right"}
                        </span>
                      )}
                    </Link>
                  ) : (
                    <Link
                      id={item.id}
                      className={`tab p-4 rounded cursor-pointer flex gap-2 ${activeMenu?.id === item.id ? "active" : ""
                        }`}
                      to={item.path}
                      onClick={() =>
                        dispatch(setActiveMenu({ parentId: item.id }))
                      }
                    >
                      {iconType(item.iconType, item.icon)}
                      <span
                        className={`ml-2 sidebar-text ${isSidebarOpen ? "" : "hide-text"
                          }`}
                      >
                        {item.text}
                      </span>
                    </Link>
                  )}
                </li>
                {item.children && (
                  <ul
                    id={`sub-${item.id}`}
                    className={`space-y-2 pl-6 text-white ${item.childState ? "" : "hidden"
                      }`}
                  >
                    <EachLoop
                      of={item.children}
                      render={(child) => {
                        return (
                          <li>
                            <Link
                              to={child.path}
                              id={child.id}
                              className={`text-gray-300 hover:text-white cursor-pointer flex items-center ${activeSubMenu?.id === child.id
                                ? "active text-white"
                                : ""
                                }`}
                              onClick={(e) => {
                                dispatch(
                                  setActiveMenu({
                                    parentId: item.id,
                                    childId: child.id,
                                  })
                                );
                              }}
                            >
                              {iconType(child.iconType, child.icon, true)}
                              <span className="ml-2 text-sm">{child.text}</span>
                            </Link>
                          </li>
                        );
                      }}
                    />
                  </ul>
                )}
              </>
            );
          }}
        />
      </ul>
    </div>
  );
};

export default SideBar;
