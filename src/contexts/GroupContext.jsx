import { createContext, useContext, useEffect, useState } from "react";
import { getGatah, getPastGatahs, submitGatah } from "../server/api";

// ✅ تغيير الاسم للتناسق
const GroupListContext = createContext();

export const useGroupListContext = () => useContext(GroupListContext);

export const GroupListProvider = ({ children }) => {
  const [groupList, setGroupList] = useState([]);
  const [previousGroupList, setPreviousGroupList] = useState([]);
  const [allUnPaidPastMonths, setAllUnPaidPastMonths] = useState([]); // ✅ تصحيح: Passt → Past
  const [allUnPaid, setAllUnPaid] = useState([]);

  const [currentDate, setCurrentDate] = useState("");
  const [pastDate, setPastDate] = useState("");
  const [currentMonth, setCurrentMonth] = useState(); // ✅ تصحيح: Mounth → Month
  const [lastMonth, setLastMonth] = useState(); // ✅
  const [payButtons, setPayButtons] = useState([]);

  const [isGroupListLoading, setIsGroupListLoading] = useState(false);
  const [isPreviousGroupListLoading, setIsPreviousGroupListLoading] =
    useState(false);
  const [isAllUnPaidPastMonthsLoading, setIsAllUnPaidPastMonthsLoading] =
    useState(false);
  const [reloadPayButtonsToggle, setReloadPayButtonsToggle] = useState(1); // ✅ تغيير اسم أوضح

  // ✅ تحديد التاريخ الحالي والسابق
  useEffect(() => {
    const today = new Date();
    const month = today.getMonth() + 1;

    setCurrentMonth(month);
    setLastMonth(month - 1);
    setCurrentDate(`${today.getFullYear()}-${String(month).padStart(2, "0")}`);
    setPastDate(`${today.getFullYear()}-${String(month - 1).padStart(2, "0")}`);
  }, []);

  // ✅ تحميل البيانات الحالية والسابقة
  useEffect(() => {
    const loadGroupList = async (month, setter, setIsLoading) => {
      setIsLoading(true);
      try {
        let result = await getGatah(month);
        const statusOrder = { paid: 0, review: 1, unpaid: 2 };
        result.sort((a, b) => statusOrder[a.isPaid] - statusOrder[b.isPaid]);
        setter(result);
      } catch (err) {
        console.log(err);
      }
      setIsLoading(false);
    };

    if (currentDate) {
      loadGroupList(currentDate, setGroupList, setIsGroupListLoading);
    }
    if (pastDate) {
      loadGroupList(
        pastDate,
        setPreviousGroupList,
        setIsPreviousGroupListLoading
      );
    }
  }, [currentDate, pastDate, reloadPayButtonsToggle]); // ✅ حذف التكرار في dependency

  // ✅ تحميل كل الأشهر غير المدفوعة
  useEffect(() => {
    const loadAllUnPaidPastMonths = async (month, setter, setIsLoading) => {
      setIsLoading(true);
      try {
        let result = await getPastGatahs(month);
        const statusOrder = { review: 0, unpaid: 1 };
        result.sort((a, b) => statusOrder[a.isPaid] - statusOrder[b.isPaid]);
        setter(result);
      } catch (err) {
        console.log(err);
      }
      setIsLoading(false);
    };

    if (currentDate) {
      loadAllUnPaidPastMonths(
        currentDate,
        setAllUnPaidPastMonths,
        setIsAllUnPaidPastMonthsLoading
      );
    }
  }, [currentDate, reloadPayButtonsToggle]);

  // ✅ دمج وفرز الكل لزر الدفع حسب التاريخ والمستخدم
  useEffect(() => {
    const userphone = localStorage.getItem("userphone");
    let combined = [...groupList, ...previousGroupList, ...allUnPaidPastMonths];

    const filtered = [];
    combined.forEach((user) => {
      if (user.phone === userphone && user.isPaid === "unpaid") {
        if (!filtered.some((item) => item.date === user.date)) {
          filtered.push({ id: user.user_id, date: user.date });
        }
      }
    });

    setPayButtons(filtered);
  }, [groupList, previousGroupList, allUnPaidPastMonths]);

  // ✅ ترتيب القائمة حسب الحالة فقط إذا تغير الترتيب فعلاً
  useEffect(() => {
    const statusOrder = { unpaid: 0, review: 1, paid: 2 };
    const sortedArray = [...groupList].sort(
      (a, b) => statusOrder[a.isPaid] - statusOrder[b.isPaid]
    );
    const isEqual = groupList.every((item, i) => item === sortedArray[i]);

    if (!isEqual) {
      setGroupList(sortedArray);
    }
  }, [groupList]);

  // ✅ إنشاء قائمة بكل العناصر الغير مدفوعة
  useEffect(() => {
    const all = [
      ...groupList,
      ...previousGroupList,
      ...allUnPaidPastMonths,
    ].filter((item) => item.isPaid !== "paid");
    setAllUnPaid(all);
  }, [groupList, previousGroupList, allUnPaidPastMonths]);

  // ✅ إرسال طلب الدفع
  const handlePayRequest = async (user_id, date) => {
    const body = { date, user_id };
    try {
      await submitGatah(body); // ✅ إضافة await
      setReloadPayButtonsToggle((prev) => (prev === 1 ? 2 : 1)); // ✅ تعديل التبديل
    } catch (err) {
      console.log("submitGatah error:", err);
    }
  };

  const value = {
    groupList,
    setGroupList,
    previousGroupList,
    setPreviousGroupList,
    currentMonth,
    lastMonth,
    allUnPaidPastMonths,
    isGroupListLoading,
    isPreviousGroupListLoading,
    isAllUnPaidPastMonthsLoading,
    payButtons,
    handlePayRequest,
    allUnPaid,
    setAllUnPaid,
    setPayButtons,
  };

  return (
    <GroupListContext.Provider value={value}>
      {children}
    </GroupListContext.Provider>
  );
};
