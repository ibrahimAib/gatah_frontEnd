function Balance({ balanceR, balanceH }) {
  const safeBalanceR = Number(balanceR) || 0;
  const safeBalanceH = Number(balanceH) || 0;

  return (
    <div className="balance-box">
      <div className="balance-span">
        <span>ميزانية الشالية:</span>
      </div>
      <div className="balance-bal">
        <span className="halalah">{`${safeBalanceH}. `}</span>
        <span>{safeBalanceR}</span>
        <img className="SAR-img" src="saudic.png" alt="" />
      </div>
      <div className="balance-span left">
        <span>الباقي:</span>
        <span>{8000 - safeBalanceR}</span>
        <img className="SAR-img" src="saudic.png" alt="" />
      </div>
    </div>
  );
}

export default Balance;
