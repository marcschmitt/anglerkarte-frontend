import { useState, useContext } from "react";
import { NavLink } from "react-router-dom";
import ClosedSeason from "../components/ClosedSeason";
import FishingLaws from "../components/FishingLaws";
import StateContext from "../contexts/StateContext";
import Legend from "../components/Legend";
import * as c from "../constants/constants";

export default function Navbar() {
  let [showMobileMenu, setShowMobileMenu] = useState(false);

  const { fishingLaws } = useContext(StateContext);
  const { showFishingLawsModal } = useContext(StateContext);
  const { legend } = useContext(StateContext);
  const { showLegendModal } = useContext(StateContext);

  console.log(process.env.MAP_KEY);

  return (
    <>
      <nav className="sticky top-0 bg-gray-50">
        <div className="px-2 mx-auto max-w-7xl sm:px-6 lg:px-8">
          <div className="relative flex items-center justify-between h-16">
            <div className="flex items-center justify-center flex-1 sm:justify-between">
              <div className="flex items-center shrink-0">
                <div>
                  <img
                    className="block w-auto h-6 mr-8"
                    src={c.LOGO}
                    alt="Anglerkarte Saar"
                  />
                </div>
                <ClosedSeason nav={true} />
              </div>
              <div className="flex items-center sm:items-stretch">
                <div className="hidden sm:block sm:ml-6">
                  <div className="flex space-x-4">
                    <button
                      className={`px-3 py-2 text-sm font-medium font-manrope ${
                        !fishingLaws
                          ? " text-gray-600 rounded-md hover:bg-gray-200 hover:text-gray-800"
                          : " text-gray-800 rounded-md hover:bg-gray-200 bg-gray-200 "
                      }`}
                      onClick={() => showFishingLawsModal(!fishingLaws)}
                    >
                      Fischereigesetze
                    </button>
                    <button
                      className={`px-3 py-2 text-sm font-medium ${
                        !legend
                          ? " text-gray-600 rounded-md hover:bg-gray-200 hover:text-gray-800"
                          : " text-gray-800 rounded-md hover:bg-gray-200 bg-gray-200 "
                      }`}
                      onClick={() => showLegendModal(!legend)}
                    >
                      Legende
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* <!-- Mobile menu, show/hide based on menu state. --> */}
        {showMobileMenu && (
          <div className="sm:hidden" id="mobile-menu">
            <div className="px-2 pt-2 pb-3 space-y-1">
              {/* <!-- Current: "bg-gray-900 text-white", Default: "text-gray-300 hover:bg-gray-700 hover:text-white" --> */}

              <NavLink
                to="/"
                onClick={() => setShowMobileMenu(false)}
                className={({ isActive }) =>
                  isActive
                    ? "bg-gray-900 text-white block px-3 py-2 text-base font-medium rounded-md"
                    : "text-gray-400 hover:bg-gray-700 hover:text-white block px-3 py-2 text-base font-medium rounded-md"
                }
              >
                Karte
              </NavLink>
              <NavLink
                to="/laws"
                onClick={() => setShowMobileMenu(false)}
                className={({ isActive }) =>
                  isActive
                    ? "bg-gray-900 text-white block px-3 py-2 text-base font-medium rounded-md"
                    : "text-gray-400 hover:bg-gray-700 hover:text-white block px-3 py-2 text-base font-medium rounded-md"
                }
              >
                Fischereigesetze
              </NavLink>
              <NavLink
                to="/information"
                onClick={() => setShowMobileMenu(false)}
                className={({ isActive }) =>
                  isActive
                    ? "bg-gray-900 text-white block px-3 py-2 text-base font-medium rounded-md"
                    : "text-gray-400 hover:bg-gray-700 hover:text-white block px-3 py-2 text-base font-medium rounded-md"
                }
              >
                Informationen
              </NavLink>
            </div>
          </div>
        )}
      </nav>
      <FishingLaws />
      <Legend />
    </>
  );
}
