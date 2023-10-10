import React from "react";
import { View } from "react-native";
import { Badge, Icon } from "@rneui/base";

export const BadgeIcon = (props) => {
  //   const { cart } = useContext(CartContext);
  return (
    <View>
      <Icon
        name={props.iconName}
        size={props.iconSize}
        color={props.iconColor}
        type={props.iconType}
      />
      {/* {cart.length > 0 ? ( */}
      <Badge
        value={5}
        status={props.badgeStatus}
        containerStyle={{ position: "absolute", top: -4, right: -4 }}
      />
      {/* ) : null} */}
    </View>
  );
};
