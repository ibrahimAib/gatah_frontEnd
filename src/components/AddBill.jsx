import { useRef, useState } from "react";
import "../css/AddBill.css";
import { submitBill } from "../server/api";
import { usePurchesesContext } from "../contexts/PurchesesContex";
function AddBill() {
  const { setReloadPercheses } = usePurchesesContext();
  const [showBillForm, setAddBillForm] = useState(false);
  const [billListAdding, setBillListAdding] = useState([
    { title: "", price: 0 },
  ]);
  const addBillButton = () => {
    setAddBillForm(true);
  };
  function saveBill() {
    submitBill(billListAdding);
    setBillListAdding([{ title: "", price: 0 }]);
    setAddBillForm(false);
    setReloadPercheses("sd");
  }
  const inputRef = useRef();

  const handleClick = () => {
    inputRef.current.select();
  };
  return (
    <>
      <div className="testDiv"></div>
      {showBillForm && (
        <div className="add-bill">
          <div className="w-100 f-c-c-c">
            <div className="w-100 close-form">
              <button
                onClick={() => {
                  setAddBillForm(false);
                }}
              >
                <img src="unpaid.png" alt="" />
              </button>
            </div>
            <div className="add-bill-form">
              {billListAdding.map((item, ind) => (
                <div className="addBillSinglItem" key={ind}>
                  <label htmlFor="itemTitle">الغرض</label>
                  <input
                    type="text"
                    name="itemTitle"
                    id=""
                    value={item.title}
                    onClick={handleClick}
                    ref={inputRef}
                    onChange={(e) => {
                      const newList = [...billListAdding];
                      newList[ind].title = e.target.value;
                      setBillListAdding(newList);
                    }}
                  />

                  <label htmlFor="itemPrice">السعر</label>
                  <input
                    type="number"
                    name="itemPrice"
                    id=""
                    value={item.price}
                    onChange={(e) => {
                      const newList = [...billListAdding];
                      newList[ind].price = e.target.value;
                      setBillListAdding(newList);
                    }}
                  />
                </div>
              ))}
              <button
                className="addItemBtn"
                onClick={() =>
                  setBillListAdding([
                    ...billListAdding,
                    { title: "الاسم", qty: 1, price: 0 },
                  ])
                }
              >
                إضافة غرض
              </button>
            </div>

            <button className="addItemBtn" onClick={saveBill}>
              حفظ الفاتروة
            </button>
          </div>
        </div>
      )}

      <div className="add-btn-box">
        <button className="add-btn" onClick={addBillButton}>
          <img src="add.png" width="30px" />
        </button>
      </div>
    </>
  );
}

export default AddBill;
