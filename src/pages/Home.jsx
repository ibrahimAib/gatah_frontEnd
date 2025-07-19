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
  const { allUnPaid, setAllUnPaid, isGroupListLoading } =
    useGroupListContext();
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
              groupList={allUnPaid}
              monthOrder=""
              allLiset={true}
              setGroupList={setAllUnPaid}
              home="home-page-group"
              month={'القطات الغير مسددة'}
            />
          )}
        </Link>
      </div>
    </>
  );
}

export default Home;
