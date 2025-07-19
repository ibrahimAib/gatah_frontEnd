import { useLocation } from "react-router-dom";
import { useGroupListContext } from "../contexts/GroupContext";

function GroupList({
  monthOrder = "",
  groupList,
  home = "",
  month,
  allLiset = false,
}) {
  const { payRequest } = useGroupListContext();
  const userphone = localStorage.getItem("userphone");
  const isCurrentMounth = monthOrder == "current";
  const location = useLocation().pathname;

  const payButton = (name, user_id, date) => {
    return (
      <button name={name} onClick={() => payRequest(user_id, date)}>
        <img src="pay.png" alt="" />
      </button>
    );
  };

  return (
    <>
      <div className="label">
        <span>
          {month == "القطات الغير مسددة"
            ? "القطات الغير مسددة"
            : `قطة شهر ${month}:`}
        </span>
      </div>

      <div
        className={`list-group ${monthOrder} ${home} ${
          monthOrder == "current" ? "list-group-active" : ""
        }`}
        onClick={(e) => {
          // Remove the class from all elements
          document.querySelectorAll(".list-group").forEach((el) => {
            el.classList.remove("list-group-active");
          });

          // Add the class to the clicked element
          e.currentTarget.classList.add("list-group-active");
        }}
      >
        {[...groupList].reverse().map((menubar, index) => {
          const shouldShow =
            isCurrentMounth || (!isCurrentMounth && menubar.isPaid != "paid");

          if (!shouldShow) return null;

          return (
            <div key={index} className="member-block">
              <div className="menubar">
                <span className="menubar-name">{menubar.name}</span>

                {allLiset && <span>{menubar.date}</span>}
                {menubar.phone == userphone &&
                menubar.isPaid != "paid" &&
                menubar.isPaid != "review" &&
                location != "/" ? (
                  payButton(menubar.name, menubar.user_id, menubar.date)
                ) : (
                  <img src={`${menubar.isPaid}.png`} alt="" />
                )}
              </div>
              {index != groupList.length - 1 && <hr className="hr" />}
            </div>
          );
        })}
      </div>
    </>
  );
}

export default GroupList;
