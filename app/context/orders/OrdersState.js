import { useCallback, useMemo, useReducer, useEffect, useState } from "react";
import { HANDLE_CHANGE_ORDERS } from "./OrdersTypes";
import { OrdersReducer } from "./OrdersReducer";
import { OrdersContext } from "./OrdersContext";
import { collection, onSnapshot, query } from "firebase/firestore";

export const OrdersState = ({ children }) => {
  const [listeners, setListeners] = useState(false);
  const initialValue = useMemo(
    () => ({
      orders: [],
    }),
    []
  );

  const [state, dispatch] = useReducer(OrdersReducer, initialValue);

  const handlechangeorders = useCallback((data) => {
    dispatch({ type: HANDLE_CHANGE_ORDERS, payload: data });
  }, []);

  //listener
  useEffect(() => {
    const initListeners = () => {
      const queryOrders = query(collection(global.dbCon, "orders"));
      onSnapshot(queryOrders, (querySnapshot) => {
        let dataListener = [];
        querySnapshot.forEach((doc) => {
          let object = { ...doc.data(), ...{ id: doc.id } };
          dataListener.push(object);
        });
        console.log("Listener = orders : ", dataListener);
        handlechangeorders(dataListener);
      });
    };
    if (!listeners) {
      console.log("inicializando  oyente ORDENES");
      initListeners();
      setListeners(true);
    }
  }, [listeners]);

  return (
    <OrdersContext.Provider value={{ ...state, ...{ handlechangeorders } }}>
      {children}
    </OrdersContext.Provider>
  );
};
