import { useState } from "react";
import { usePurchesesContext } from "../contexts/PurchesesContex";
import Loading from "./Loading";
import SmallLoading from "./SmallLoading";
import { deleteBill } from "../server/api";
function PurchasesBox() {
  const { purchasesList, setPurchasesList, isLoading } = usePurchesesContext();
  const [isDeleteBillLoading, setIsDeleteBillLoading] = useState(false);
  const [deleteConfirmationBox, setDeleteConfirmationBox] = useState(false);
  const [billDeletingId, setBillDeletingId] = useState();

  const openDeleteConfirmation = (billId) => {
    setBillDeletingId(billId);
    setDeleteConfirmationBox(true);
  };
  async function handeldeleteBill(e) {
     e.currentTarget.classList.add('gray');
    setIsDeleteBillLoading(true);

    try {
      let isDeleted = await deleteBill(billDeletingId);
      if (isDeleted) {
        setPurchasesList((prev) =>
          prev.filter((bill) => bill.bill_id !== billDeletingId)
        );
      }
    } catch (error) {
      console.error("فشل الحذف:", error);
    } finally {
      setDeleteConfirmationBox(false);

      setIsDeleteBillLoading(false);
    }
  }
  return (
    <>
      {isLoading ? (
        <Loading />
      ) : deleteConfirmationBox ? (
        <div className="delete-confirmation-bg">
          <div className="delete-confirmation-box">
            <span>هل انت متأكد من حذف الفاتورة؟</span>
            <div className="delete-confirmation-btns-box">
              <button onClick={handeldeleteBill}>
                {isDeleteBillLoading ? <SmallLoading /> : "حذف"}
              </button>
              <button
                onClick={() => {
                  setDeleteConfirmationBox(false);
                }}
              >
                الغاء
              </button>
            </div>
          </div>
        </div>
      ) : (
        purchasesList.map((item, index) => (
          <div key={index} className="width-100" id={`bill${item.bill_id}`}>
            <div className="purchases-item ">
              {item.is_deleteable ? (
                <div
                  className="bill-delete-btn"
                  onClick={() => openDeleteConfirmation(item.bill_id)}
                >
                  <img src="delete.png" alt="" />
                </div>
              ) : (
                ""
              )}
              <div className="entry">
                <div className="purchases-item-title">
                  <span className="user">{`${item.user_name}:`}</span>
                  <div className="price">
                    <img
                      src={`${item.is_paid == "paid" ? "paid" : "review"}.png`}
                      width="30px"
                      alt=""
                    />
                  </div>
                </div>
                <div className="item-box">
                  {item.percheses.map((it, idx) => (
                    <div key={idx} className="item">
                      <span className="price ">{it.title}</span>
                      <span className="price">{it.price}</span>
                    </div>
                  ))}
                </div>
                <div className="purchases-sum ">
                  <span className="user">المجموع:</span>
                  <div>
                    <span className="price">{item.bill_total}</span>
                    <img src="saudic.png" width="25px" />
                  </div>
                </div>
              </div>
            </div>
          </div>
        ))
      )}
    </>
  );
}

export default PurchasesBox;
