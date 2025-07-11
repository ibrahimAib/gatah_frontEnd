import "../css/Home.css";
import Title from "../components/Title";
import Balance from "../components/Balance";
import GroupList from "../components/GroupList";
import Loading from "../components/Loading";
import { useGroupListContext } from "../contexts/GroupContext";
import { Link } from "react-router-dom";
import { getBalance } from "../server/api";
import { useEffect, useState } from "react";
function Home() {
  const [balanceR, setBalanceR] = useState();

  useEffect(() => {
    const loadBalance = async () => {
      const loadedBalance = await getBalance();
      setBalanceR(loadedBalance);
    };

    loadBalance();
  }, []);

  const balanceH = 0;
  const {
    groupList,
    setGroupList,
    previousGroupList,
    setPreviousGroupList,
    lastMounth,
    currentMounth,
    allUnPaidPasstMonths,
    isGroupListLoading,
    isPreviousGroupListLoading,
    isAllUnPaidPasstMonthsLoading,
  } = useGroupListContext();
  return (
    <>
      <Title title="الرئيسية" img="home" alt="" />
      <div className="home">
        <Balance balanceR={balanceR} balanceH={balanceH} />
        <span style={{ display: "block", height: "15px" }}></span>

        <Link to="/paylist" style={{ display: "contents" }}>
          {isGroupListLoading ? (
            <Loading />
          ) : (
            <GroupList
              groupList={groupList}
              monthOrder="last"
              setGroupList={setGroupList}
              home="home-page-group"
              month={currentMounth}
            />
          )}
          {isPreviousGroupListLoading ? (
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
              home="home-page-group-previous"
            />
          )}
          {allUnPaidPasstMonths.length == 0 ? (
            ""
          ) : isAllUnPaidPasstMonthsLoading ? (
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
            />
          )}
        </Link>
      </div>
    </>
  );
}

export default Home;
