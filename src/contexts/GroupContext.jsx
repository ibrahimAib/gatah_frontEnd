import { createContext, use, useContext, useEffect, useState } from "react";
import { getGatah, getPastGatahs, submitGatah } from "../server/api";

const GroupListContext = createContext();

export const useGroupListContext = () => useContext(GroupListContext);

export const GroupListProvider = ({ children }) => {
  const [groupList, setGroupList] = useState([]);
  const [previousGroupList, setPreviousGroupList] = useState([]);
  const [allUnPaidPasstMonths, setAllUnPaidPasstMonths] = useState([]);
  const [allUnPaid, setAllUnPaid] = useState([]);

  const [currentDate, setCurrentDate] = useState("");
  const [pastDate, setPastDate] = useState("");
  const [currentMounth, setCurrentMounth] = useState();
  const [lastMounth, setLastMounth] = useState();
  const [payButtons, setPayButtons] = useState([]);

  // const [isLoading, setIsLoading] = useState(false);
  const [isGroupListLoading, setIsGroupListLoading] = useState(false);
  const [isPreviousGroupListLoading, setIsPreviousGroupListLoading] =
    useState(false);
  const [isAllUnPaidPasstMonthsLoading, setIsAllUnPaidPasstMonthsLoading] =
    useState(false);
  const [updatePayButtons, setUpdatePayButtons] = useState(1);
  // get time ===============================================
  useEffect(() => {
    const today = new Date();
    const month = today.getMonth() + 1;
    const currentDateLocal = `${today.getFullYear()}-${String(
      today.getMonth() + 1
    ).padStart(2, "0")}`;
    const pastDateLocal = `${today.getFullYear()}-${String(
      today.getMonth()
    ).padStart(2, "0")}`;

    setCurrentMounth(month);
    setLastMounth(month - 1);

    setCurrentDate(currentDateLocal);
    setPastDate(pastDateLocal);
  }, []);

  useEffect(() => {
    const userphone = localStorage.getItem("userphone");
    let combined = [
      ...groupList,
      ...previousGroupList,
      ...allUnPaidPasstMonths,
    ];

    // Filter and deduplicate
    const filtered = combined
      .filter((user) => user.phone === userphone && user.isPaid === "unpaid")
      .reduce((acc, curr) => {
        // Keep only one item per date
        if (!acc.find((item) => item.date === curr.date)) {
          acc.push({ id: curr.user_id, date: curr.date });
        }
        return acc;
      }, []);

    setPayButtons(filtered);
  }, [groupList, previousGroupList, allUnPaidPasstMonths]);

  useEffect(() => {
    const loadGroupList = async (month, setter, setIsLoading) => {
      setIsLoading(true);
      try {
        let groupListResult = await getGatah(month);
        const statusOrder = { paid: 0, review: 1, unpaid: 2 };
        groupListResult.sort(
          (a, b) => statusOrder[a.isPaid] - statusOrder[b.isPaid]
        );
        setter(groupListResult);
      } catch (err) {
        console.log(err);
      }
      setIsLoading(false);
    };
    if (currentDate)
      loadGroupList(currentDate, setGroupList, setIsGroupListLoading);
    if (pastDate)
      loadGroupList(
        pastDate,
        setPreviousGroupList,
        setIsPreviousGroupListLoading
      );
  }, [currentDate, pastDate, updatePayButtons, updatePayButtons]);

  useEffect(() => {
    const loadAllUnPaidPasstMonths = async (month, setter, setIsLoading) => {
      setIsLoading(true);
      try {
        let groupListResult = await getPastGatahs(month);
        const statusOrder = { review: 0, unpaid: 1 };
        groupListResult.sort(
          (a, b) => statusOrder[a.isPaid] - statusOrder[b.isPaid]
        );
        setter(groupListResult);
      } catch (err) {
        console.log(err);
      }
      setIsLoading(false);
    };
    if (currentDate)
      loadAllUnPaidPasstMonths(
        currentDate,
        setAllUnPaidPasstMonths,
        setIsAllUnPaidPasstMonthsLoading
      );
  }, [currentDate, updatePayButtons]);

  useEffect(() => {
    // sort the groupList
    const statusOrder = { unpaid: 0, review: 1, paid: 2 };

    const sortedArray = [...groupList].sort(
      (a, b) => statusOrder[a.isPaid] - statusOrder[b.isPaid]
    );
    const isEqual = groupList.every(
      (item, index) => item === sortedArray[index]
    );

    if (!isEqual) {
      setGroupList(sortedArray);
    }
  }, [groupList]);

  useEffect(() => {
    setAllUnPaid(
      [...groupList, ...previousGroupList, ...allUnPaidPasstMonths].filter(
        (item) => item.isPaid !== "paid"
      )
    );
  }, [groupList, previousGroupList, allUnPaidPasstMonths]);

  const payRequest = async (user_id, date) => {
    let body = {
      date: date,
      user_id: user_id,
    };
    submitGatah(body);
    setUpdatePayButtons(updatePayButtons == 1 ? 2 : 1);
  };
  const value = {
    groupList,
    setGroupList,
    previousGroupList,
    setPreviousGroupList,
    currentMounth,
    lastMounth,
    allUnPaidPasstMonths,
    isGroupListLoading,
    isPreviousGroupListLoading,
    isAllUnPaidPasstMonthsLoading,
    payButtons,
    payRequest,
    allUnPaid,
    setAllUnPaid
  };

  return (
    <GroupListContext.Provider value={value}>
      {children}
    </GroupListContext.Provider>
  );
};

// const [groupList, setGroupList] = useState([
//   {
//     name: "المؤسس",
//     phone: "0550070510",
//     isPaid: "paid",
//   },
//   {
//     name: "أبو عبدالملك",
//     phone: "0551290287",
//     isPaid: "unpaid",
//   },
//   {
//     name: "إبراهيم",
//     phone: "0533301365",
//     isPaid: "unpaid",
//   },
//   {
//     name: "أبو حسام",
//     phone: "0551861378",
//     isPaid: "review",
//   },
//   {
//     name: "الياس",
//     phone: "0582222565",
//     isPaid: "paid",
//   },
//   {
//     name: "عاصم بيك",
//     phone: "0555266068",
//     isPaid: "paid",
//   },
//   {
//     name: "أبو نورة",
//     phone: "533552258",
//     isPaid: "paid",
//   },
//   {
//     name: "أبو تميم",
//     phone: "0535356750",
//     isPaid: "paid",
//   },
//   {
//     name: "أبو المثنى",
//     phone: "0554476605",
//     isPaid: "paid",
//   },
//   {
//     name: "أبو سلمان",
//     phone: "0532960686",
//     isPaid: "paid",
//   },
//   {
//     name: "أبو أوس",
//     phone: "0556817126",
//     isPaid: "unpaid",
//   },
// ]);

// const [previousGroupList, setPreviousGroupList] = useState([
//   {
//     name: "المؤسس",
//     phone: "0550070510",
//     isPaid: "paid",
//   },
//   {
//     name: "أبو عبدالملك",
//     phone: "0551290287",
//     isPaid: "unpaid",
//   },
//   {
//     name: "أبو حسام",
//     phone: "0551861378",
//     isPaid: "review",
//   },
//   {
//     name: "الياس",
//     phone: "0582222565",
//     isPaid: "paid",
//   },
//   {
//     name: "عاصم بيك",
//     phone: "0555266068",
//     isPaid: "paid",
//   },
//   {
//     name: "أبو نورة",
//     phone: "533552258",
//     isPaid: "paid",
//   },
//   {
//     name: "أبو تميم",
//     phone: "0535356750",
//     isPaid: "paid",
//   },
//   {
//     name: "أبو المثنى",
//     phone: "0554476605",
//     isPaid: "paid",
//   },
//   {
//     name: "أبو سلمان",
//     phone: "0532960686",
//     isPaid: "paid",
//   },
//   {
//     name: "أبو أوس",
//     phone: "0556817126",
//     isPaid: "paid",
//   },
//   {
//     name: "إبراهيم",
//     phone: "0533301365",
//     isPaid: "unpaid",
//   },
// ]);
