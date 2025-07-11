import { usePurchesesContext } from "../contexts/PurchesesContex";
import Loading from "./Loading";
function PurchasesBox() {
  const { purchasesList, isLoading } = usePurchesesContext();
  return (
    <>
      {isLoading ? (
        <Loading />
      ) : (
        purchasesList.map((item, index) => (
          <div
            key={index}
            className="width-100"
            style={{ marginBottom: "15px" }}
          >
            <div className="purchases-item ">
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
