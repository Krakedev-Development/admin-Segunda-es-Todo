import { StyleSheet, Text, View, Image, TouchableOpacity } from "react-native";
import theme from "../../theme/theme";
import ImagenImport from "../../theme/Images";
import { useState } from "react";

export const ButtonCategoryProducts = ({ SendCategory }) => {
  const [categorySelected, setCategorySelected] = useState("lunch");

  const colorPrimary = theme.colors.orangeSegunda;
  const colorSecondary = theme.colors.pink;

  const getColor = (category) => {
    return categorySelected === category ? colorPrimary : colorSecondary;
  };

  const SelectCategory = (category) => {
    setCategorySelected(category);
    SendCategory(category);
  };

  return (
    <View style={styles.buttonsCat}>
      <TouchableOpacity onPress={() => SelectCategory("lunch")}>
        <View
          style={[
            styles.buttonCategory,
            { backgroundColor: getColor("lunch") },
          ]}
        >
          <Image
            source={ImagenImport.lounch}
            style={{ width: 30, height: 34, borderRadius: 8 }}
            resizeMode="cover"
          />
        </View>
      </TouchableOpacity>

      <TouchableOpacity onPress={() => SelectCategory("drinks")}>
        <View
          style={[
            styles.buttonCategory,
            { backgroundColor: getColor("drinks") },
          ]}
        >
          <Image
            source={ImagenImport.drinks}
            style={{ width: 30, height: 34, borderRadius: 8 }}
            resizeMode="cover"
          />
        </View>
      </TouchableOpacity>

      <TouchableOpacity onPress={() => SelectCategory("gifts")}>
        <View
          style={[
            styles.buttonCategory,
            { backgroundColor: getColor("gifts") },
          ]}
        >
          <Image
            source={ImagenImport.gifts}
            style={{ width: 30, height: 34, borderRadius: 8 }}
            resizeMode="cover"
          />
        </View>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  buttonsCat: {
    flex: 1,
    justifyContent: "space-between",
    flexDirection: "row",
    marginVertical: 2,
    paddingVertical: 6,
    paddingRight: 10,
    borderRadius: 8,
  },
  buttonCategory: {
    padding: 7,
    borderRadius: 7,
    marginHorizontal: 2,
  },
});
