import { createContext, useContext, useEffect, useState } from "react";
import { getBills } from "../server/api";

const PurchesesContext = createContext();

export const usePurchesesContext = () => useContext(PurchesesContext);

export const PurchesesProvider = ({ children }) => {
  const [purchasesList, setPurchasesList] = useState([]);
  const [reloadPercheses, setReloadPercheses] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  useEffect(() => {
    const loadBills = async () => {
      setIsLoading(true);
      try {
        const billsResualt = await getBills();
        setPurchasesList(billsResualt.reverse()); // ✅ هنا التصحيح
      } catch (error) {
        console.log(error);
      }
      setIsLoading(false);
    };
    loadBills();
  }, [reloadPercheses]);
  const value = {
    purchasesList,
    setReloadPercheses,
    isLoading,
    setPurchasesList,
  };

  return (
    <PurchesesContext.Provider value={value}>
      {children}
    </PurchesesContext.Provider>
  );
};
