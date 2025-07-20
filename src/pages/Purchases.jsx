import AddBill from "../components/AddBill";
import PurchasesBox from "../components/PurchasesBox";
import Title from "../components/Title";
import "../css/purcheses.css";
import { PurchasesProvider } from "../contexts/PurchasesContex";

function Purchases() {
  return (
    <>
      <PurchasesProvider>
        <Title title="المشتريات:" />
        <AddBill />
        <div className="purchases-container">
          <div className="purchases">
            <PurchasesBox />
          </div>
        </div>
      </PurchasesProvider>
    </>
  );
}

export default Purchases;
