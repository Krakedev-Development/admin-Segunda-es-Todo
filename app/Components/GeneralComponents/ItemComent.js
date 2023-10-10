import React from "react";
import { View, Text, StyleSheet } from "react-native";
import { TouchableOpacity } from "react-native-gesture-handler";
export const ItemComent = ({
  size,
  title,
  onPress,
  border,
  width,
  background,
  icon,
  icon2,
  textSize,
  data,
}) => {
  const styles = StyleSheet.create({
    container: {
      //   flex: 1,
      marginVertical: 2,
      // justifyContent: "space-around",
      paddingHorizontal: 18,
      alignItems: "center",
      backgroundColor: background ? background : "lightblue",
      height: size ? size : 50,
      minWidth: width ? width : "100%",
      borderRadius: border ? border : 0,
      flexDirection: "row",
    },
    text: {
      fontSize: textSize ? textSize : 20,
      fontWeight: "bold",
      color: "white",
      alignItems: "center",
      textAlign: "center",
      flex: 1,
    },
    btnIcon: {
      alignItems: "center",
    },
  });
  return (
    // <View>
    <TouchableOpacity onPress={onPress} style={styles.container}>
      {icon ? icon : <></>}

      <Text style={styles.text}>
        {data?.name ? data?.name : "#Codigo-User-00..."}
      </Text>
      {icon2 ? icon2 : <></>}
    </TouchableOpacity>
    // </View>
  );
};
