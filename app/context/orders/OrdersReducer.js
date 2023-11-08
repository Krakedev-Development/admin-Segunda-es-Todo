import { HANDLE_CHANGE_ORDERS } from "./OrdersTypes";

export const OrdersReducer = (state, action) => {
  const { type, payload } = action;
  switch (type) {
    case HANDLE_CHANGE_ORDERS: {
      return { ...state, orders: payload };
    }
    default:
      break;
  }
};
