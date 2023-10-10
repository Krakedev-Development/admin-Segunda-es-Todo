import React from "react";
import { Dimensions } from "react-native";
import { ActivityIndicator, MD2Colors } from "react-native-paper";
export const LoadGeneral = ({ load, zIndex, transparent }) => {
  return (
    <ActivityIndicator
      animating={load}
      color={MD2Colors.red800}
      size={"large"}
      style={{
        zIndex: zIndex,
        position: "absolute",
        backgroundColor: transparent ? "rgba(0, 0, 0, 0.5)" : "black",
        height: Dimensions.get("window").height,
        width: Dimensions.get("window").width,
      }}
    />
  );
};
