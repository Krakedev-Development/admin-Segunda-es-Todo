import { useRef, useState } from "react";
import { StyleSheet, Text, View, Image, FlatList } from "react-native";
import { FAB } from "react-native-paper";
import theme from "../../theme/theme";
import { TextGeneral } from "../../Components/GeneralComponents/TextGeneral";
import logos from "../../theme/logos";
import { ModalGeneral } from "../../Components/GeneralComponents/ModalGeneral";
import { ImagenLunchCategory } from '../../theme/Images'
import { ButtonGeneral } from '../../Components/GeneralComponents/ButtonGeneral';
import IconEntypo from "react-native-vector-icons/FontAwesome5";
import IconMAterialIcons from "react-native-vector-icons/MaterialIcons";






export const PromotionForm = () => {

  return (
    <View style={styles.container}>
      <Text style={{color: 'white'}}>FORMULARIO</Text>
    </View>
  );
};


const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: theme.separation.horizontalSeparation,
    backgroundColor: "black",
    flexDirection: "column",
    justifyContent: "flex-start",
  },
  scrollViewContainer: {
    height: 200,
    backgroundColor: "white",
    borderRadius: 10,
    overflow: "hidden",
  },
  scrollViewContent: {
    justifyContent: "center",
    alignItems: "center",
    minWidth: "100%",
  },
  text: {
    fontSize: 20,
    fontWeight: "bold",
    color: "white",
    marginVertical: 10,
  },
  subtitle: {
    width: "100%",
    paddingHorizontal: "5%",
    marginVertical: 8,
  },
  fab: {
    position: "absolute",
    margin: 16,
    right: 0,
    bottom: 0,
  },
});
