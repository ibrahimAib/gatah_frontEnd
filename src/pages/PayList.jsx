import Title from "../components/Title";
import "../css/PayList.css";
import GroupList from "../components/GroupList";
import { useGroupListContext } from "../contexts/GroupContext";
import Loading from "../components/Loading";

function PayList() {
  const {
    currentMounth,
    lastMounth,
    groupList,
    setGroupList,
    previousGroupList,
    setPreviousGroupList,
    allUnPaidPasstMonths,
    payRequest,
    payButtons,
    isGroupListLoading,
    isPreviousGroupListLoading,
    isAllUnPaidPasstMonthsLoading,
  } = useGroupListContext();

  return (
    <>
      <Title title={`قطة شهر ${currentMounth}:`} img="saudic" />
      {
        <>
          <div>
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
                month={currentMounth}
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
                  month={lastMounth}
                />
              )
            ) : (
              ""
            )}
            {allUnPaidPasstMonths.length != 0 ? (
              isAllUnPaidPasstMonthsLoading ? (
                !isPreviousGroupListLoading ? (
                  <Loading />
                ) : (
                  ""
                )
              ) : (
                <GroupList
                  groupList={allUnPaidPasstMonths}
                  monthOrder="previous"
                  setGroupList={setPreviousGroupList}
                  month={lastMounth - 1 + " " + "وماقبل"}
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
