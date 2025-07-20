import Title from "../components/Title";
import "../css/PayList.css";
import GroupList from "../components/GroupList";
import { useGroupListContext } from "../contexts/GroupContext";
import Loading from "../components/Loading";
import { useEffect } from "react";

function PayList() {
  const {
    currentMonth,
    lastMonth,
    groupList,
    setGroupList,
    previousGroupList,
    setPreviousGroupList,
    allUnPaidPastMonths,
    payRequest,
    payButtons,
    isGroupListLoading,
    isPreviousGroupListLoading,
    isAllUnPaidPasstMonthsLoading,
    setPayButtons,
  } = useGroupListContext();
  useEffect(() => {
    setPayButtons(payButtons);
  }, [payButtons]);
  return (
    <>
      <Title title={`القطة:`}/>
      {
        <>
          <div className="pay-puttons">
            {payButtons.map((element, index) => (
              <button
                className="payMonthsGatah"
                key={index}
                onClick={() => {
                  payRequest(element.user_id, element.date);
                }}
              >
                {`دفع شهر ${element.date.substr(element.date.length - 1)}`}
              </button>
            ))}
          </div>

          <div className="pay-list">
            {isGroupListLoading ? (
              <Loading />
            ) : (
              <GroupList
                groupList={groupList}
                monthOrder="current"
                setGroupList={setGroupList}
                month={currentMonth}
              />
            )}
            <span style={{ display: "block", height: "15px" }}></span>
            {previousGroupList.length != 0 ? (
              isPreviousGroupListLoading ? (
                !isGroupListLoading ? (
                  <Loading />
                ) : (
                  ""
                )
              ) : (
                <GroupList
                  groupList={previousGroupList}
                  monthOrder="previous"
                  setGroupList={setPreviousGroupList}
                  month={lastMonth}
                />
              )
            ) : (
              ""
            )}
            {allUnPaidPastMonths.length != 0 ? (
              isAllUnPaidPasstMonthsLoading ? (
                !isPreviousGroupListLoading ? (
                  <Loading />
                ) : (
                  ""
                )
              ) : (
                <GroupList
                  groupList={allUnPaidPastMonths}
                  monthOrder="previous"
                  setGroupList={setPreviousGroupList}
                  month={lastMonth - 1 + " " + "وماقبل"}
                  home="home-page-group-previous"
                  allLiset={true}
                />
              )
            ) : (
              ""
            )}
          </div>
        </>
      }
    </>
  );
}

export default PayList;
