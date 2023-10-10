import React from "react";
import { View, Text, StyleSheet } from "react-native";
export const TextGeneral = ({ text, color, size, style, bold, center }) => {
  const styles = StyleSheet.create({
    container: {
      justifyContent: center ? "center" : "flex-start",
      alignItems: center ? "center" : "flex-start",
    },
    text: {
      fontSize: size ? size : 20,
      fontWeight: bold && "bold",
      color: color ? color : "black",
    },
  });

  return (
    <View style={styles.container}>
      <Text style={style ? [styles.text, ...style] : styles.text}>
        {text ? text : "Soy un Text"}
      </Text>
    </View>
  );
};
