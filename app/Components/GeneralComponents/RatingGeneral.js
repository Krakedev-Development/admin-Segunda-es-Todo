import React, { useState } from "react";
import {
  Alert,
  Modal,
  StyleSheet,
  Text,
  Pressable,
  View,
  TouchableOpacity,
} from "react-native";
import theme from "../../theme/theme";
import { Rating } from "react-native-elements";

export const RatingGeneral = ({ size, setRating, rating, readOnly, color }) => {
  return (
    <Rating
      // showRating //ver rating
      fractions="{1}"
      onFinishRating={(e) => {
        if (setRating) {
          setRating(e);
        }
      }}
      startingValue={rating ? rating : 0}
      tintColor={color ? color : "black"}
      ratingColor={theme.colors.orangeSegunda}
      // starStyle={{ color: "blue" }}
      readonly={readOnly ? true : false}
      type="custom"
      // type="heart"
      imageSize={size ? size : 28} // Tamaño de las estrellas
      // style={{ paddingVertical: 10 }}
    />
  );
};
