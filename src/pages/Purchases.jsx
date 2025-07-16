import AddBill from "../components/AddBill";
import PurchasesBox from "../components/PurchasesBox";
import Title from "../components/Title";
import "../css/purcheses.css";
import { PurchesesProvider } from "../contexts/PurchesesContex";

function Purchases() {
  return (
    <>
      <PurchesesProvider>
        <Title title="المشتريات:" img="purchases" />
        <AddBill />
        <div className="purchases-container">
          <div className="purchases">
            <PurchasesBox />
          </div>
        </div>
      </PurchesesProvider>
    </>
  );
}

export default Purchases;
