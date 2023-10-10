import React from "react";
import { View, Text, StyleSheet } from "react-native";
import { TouchableOpacity } from "react-native-gesture-handler";
export const ButtonGeneral = ({
  margin,
  size,
  title,
  onPress,
  border,
  width,
  background,
  icon,
  textSize,
  style,
}) => {
  const styles = StyleSheet.create({
    container: {
      //   flex: 1,
      justifyContent: "center",
      alignItems: "center",
      backgroundColor: background ? background : "lightblue",
      height: size ? size : 50,
      width: width ? width : "100%",
      borderRadius: border ? border : 0,
      margin: margin ? 5 : 0,
    },
    text: {
      fontSize: textSize ? textSize : 20,
      fontWeight: "bold",
      color: "white",
    },
    btnIcon: {
      flexDirection: "row",
      alignItems: "center",
    },
  });
  return (
    // <View>
    <TouchableOpacity
      {...style}
      onPress={onPress}
      style={
        icon ? { ...styles.container, ...styles.btnIcon } : styles.container
      }
    >
      {icon ? icon : <></>}

      <Text style={styles.text}>{title ? title : ""}</Text>
    </TouchableOpacity>
    // </View>
  );
};
