import { createContext, useState } from "react";

const StateContext = createContext();

export function StateProvider({ children }) {
  let [fishingLaws, setFishingLaws] = useState(false);
  let [legend, setLegend] = useState(true);
  let [information, setInformation] = useState(false);

  const showFishingLawsModal = () => {
    setFishingLaws(!fishingLaws);
  };

  const showLegendModal = () => {
    setLegend(!legend);
  };

  const showInformationModal = () => {
    setInformation(!information);
  };

  return (
    <StateContext.Provider
      value={{
        fishingLaws,
        showFishingLawsModal,
        legend,
        showLegendModal,
        information,
        showInformationModal,
      }}
    >
      {children}
    </StateContext.Provider>
  );
}

export default StateContext;
