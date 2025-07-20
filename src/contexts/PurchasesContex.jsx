import { createContext, useContext, useEffect, useState } from "react";
import { getBills } from "../server/api";

const PurchasesContext = createContext();

export const usePurchasesContext = () => useContext(PurchasesContext);

export const PurchasesProvider = ({ children }) => {
  const [purchasesList, setPurchasesList] = useState([]);
  const [reloadPurchases, setReloadPurchases] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const loadBills = async () => {
      setIsLoading(true);
      try {
        const billsResult = await getBills();
        setPurchasesList(billsResult.reverse());
      } catch (error) {
        console.log(error);
      }
      setIsLoading(false);
    };
    loadBills();
  }, [reloadPurchases]);

  const value = {
    purchasesList,
    setReloadPurchases,
    isLoading,
    setPurchasesList,
  };

  return (
    <PurchasesContext.Provider value={value}>
      {children}
    </PurchasesContext.Provider>
  );
};
