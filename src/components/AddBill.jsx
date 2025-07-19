import { useState } from "react";
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
  async function saveBill() {
    console.log(billListAdding.length);
    if (billListAdding.length == 0) {
      alert("لا يمكن إضافة فاتورة فارغة!!");
      return;
    }
    let localResponce = await submitBill(billListAdding);
    if (localResponce == "erorr") {
      return;
    }
    setBillListAdding([{ title: "الغرض", price: 0 }]);
    setAddBillForm(false);
    setReloadPercheses("sd");
  }

  return (
    <>
      {showBillForm && (
        <div className="add-bill">
          <div className="w-100 f-c-c-c">
            <div className="add-bill-form">
              {billListAdding.map((item, ind) => (
                <div
                  className={`addBillSinglItem ${
                    ind == 0 ? "none-border" : ""
                  }`}
                  key={ind}
                >
                  <div className=" ">
                    {ind == 0 ? (
                      ""
                    ) : (
                      <button
                        onClick={() => {
                          const updatedList = [...billListAdding]; // انسخ المصفوفة
                          updatedList.splice(ind, 1); // احذف العنصر بالفهرس
                          setBillListAdding(updatedList); // حدّث الحالة
                        }}
                      >
                        <img src="unpaid.png" alt="" />
                      </button>
                    )}
                  </div>
                  <label htmlFor="itemTitle">الغرض</label>
                  <input
                    type="text"
                    name="itemTitle"
                    id=""
                    value={item.title}
                    onClick={(e) => e.target.select()}
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
                    { title: "", qty: 1, price: 0 },
                  ])
                }
              >
                إضافة غرض
              </button>
            </div>
            <div className="form-btns">
              <button className="addItemBtn" onClick={saveBill}>
                حفظ
              </button>
              <button
                className="addItemBtn"
                onClick={() => {
                  setAddBillForm(false);
                }}
              >
                الغاء
              </button>
            </div>
          </div>
        </div>
      )}

      <div className="add-btn-box">
        <button onClick={addBillButton}>
          <img src="add.png" width="30px" />
        </button>
      </div>
    </>
  );
}

export default AddBill;
