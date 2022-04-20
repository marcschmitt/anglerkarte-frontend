import { useContext } from "react";
import StateContext from "../contexts/StateContext";
import * as c from "../constants/constants";

export default function Legend() {
  const { legend } = useContext(StateContext);

  const fishingZones = [
    { title: "Angeln erlaubt", strokeColor: c.COLOR_ALLOWED },
    { title: "Angeln verboten", strokeColor: c.COLOR_FORBIDDEN },
    {
      title: "Angeln zeitweise verboten",
      strokeColor: c.COLOR_TEMPORARILY_NOT_POSSIBLE,
    },
    {
      title: "Angeln eingeschränkt möglich",
      strokeColor: c.COLOR_LIMITED_POSSIBLE,
    },
    { title: "Angeln nicht möglich", strokeColor: c.COLOR_NOT_POSSIBLE },
  ];

  const iconExplanations = [
    { title: "Hafen", imageSrc: c.HARBOR, imageAlt: "Hafen" },
    {
      title: "Flachwasserzone",
      imageSrc: c.SHALLOW_WATER_ZONE,
      imageAlt: "Flachwasserzone",
    },
    {
      title: "Fischschonbezirk",
      imageSrc: c.TEMPORARILY_NOT_POSSIBLE,
      imageAlt: "Fischschonbezirk",
    },
    { title: "Anlegestelle", imageSrc: c.BOAT_DOCK, imageAlt: "Anlegestelle" },
    {
      title: "Eingeschränkt möglich",
      imageSrc: c.RESTRICTED,
      imageAlt: "Eingeschränkt möglich",
    },
  ];

  return (
    // TODO Transition hinzufügen
    <>
      {legend && (
        <div className="absolute right-1 opacity-95 sm:right-0 z-50 max-w-md overflow-auto bg-white shadow max-h-[calc(100vh_-_100px)] top-20 rounded-sm sm:rounded-lg">
          <div className="px-4 py-5 sm:px-6">
            <p className="max-w-2xl mt-1 text-sm font-bold text-gray-500">
              Angel-Erlaubnisbereiche
            </p>
          </div>
          <div className="border-t border-gray-200">
            <dl>
              {fishingZones.map((fishingZone) => (
                <div
                  className="px-4 py-3 bg-gray-50 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6"
                  key={fishingZone.title}
                >
                  <dt className="text-sm font-medium text-gray-500 sm:col-span-2">
                    {fishingZone.title}
                  </dt>
                  <dd className="flex items-center mt-1 text-sm text-green-500 sm:mt-0">
                    <svg
                      width="30"
                      height="4"
                      viewBox="0 0 51 4"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <line
                        x1="0.998169"
                        y1="2"
                        x2="50.9982"
                        y2="2"
                        stroke={fishingZone.strokeColor}
                        strokeWidth="3"
                      />
                    </svg>
                  </dd>
                </div>
              ))}
            </dl>
          </div>
          <div className="px-4 py-5 sm:px-6">
            <p className="max-w-2xl mt-1 text-sm font-bold text-gray-500">
              Zusatzinformationen
            </p>
          </div>
          <div className="border-t border-gray-200">
            <dl>
              {iconExplanations.map((iconExplanation) => (
                <div
                  className="px-4 py-3 bg-gray-50 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6"
                  key={iconExplanation.title}
                >
                  <dt className="text-sm font-medium text-gray-500 sm:col-span-2">
                    {iconExplanation.title}
                  </dt>
                  <dd className="mt-1 text-sm text-gray-900 sm:mt-0 ">
                    <img
                      src={iconExplanation.imageSrc}
                      height="25"
                      width="25"
                      alt={iconExplanation.imageAlt}
                    />
                  </dd>
                </div>
              ))}
            </dl>
          </div>
        </div>
      )}
    </>
  );
}
