import React, { useEffect, useState } from "react";
import { View, Text, Modal, StyleSheet, Image } from "react-native";
import theme from "../../theme/theme";
import { Button, TextInput } from "react-native-paper";
import {
  createDinamicDocument,
  fetchDinamicData,
  updateDinamicDocument,
} from "../../Services/firebase";
import axios from "axios";
import * as ImagePicker from "expo-image-picker";
import { TouchableOpacity } from "react-native";
import { uploadDinamicImage } from "../../Services/ImagesSrv";
import Constants from "expo-constants";
import StyledText from "../../theme/StyledText";
import { ScrollView } from "react-native";
import { NEW_PRODUCTS } from "../../theme/Images";
import SelectDropdown from "react-native-select-dropdown";
import { Icon } from "@rneui/base";

export const NewProducts = ({ navigation, route }) => {
  const { refresh, setRefresh, length } = route.params;
  const [loading, setLoading] = useState(false);
  const [newData, setNewdata] = useState({
    name: null,
    productId: "producto-" + length,
    description: null,
    stock: null,
    goldCoins: null,
    silverCoins: null,
    goldRatio: null,
    silverRatio: null,
    category: { categoryId: "001", name: "dish" },
    image: null,
  });

  const filters = ["Platos", "Bebidas", "Regalos"];
  const [filterSelected, setFilterSelected] = useState("Platos");

  useEffect(() => {
    console.log("NUEVO REGISTRO DE PRODUCTOS: ", newData);
  }, []);

  useEffect(() => {
    console.log("ESTO TIENE EL COMBO: ", filterSelected);
    switch (filterSelected) {
      case "Platos":
        setNewdata({
          ...newData,
          category: { categoryId: "001", name: "dish" },
        });
        break;
      case "Bebidas":
        setNewdata({
          ...newData,
          category: { categoryId: "002", name: "Bebidas" },
        });
        break;
      case "Regalos":
        setNewdata({
          ...newData,
          category: { categoryId: "003", name: "Regalos" },
        });
        break;
    }
  }, [filterSelected]);

  //   useEffect(() => {
  //     loadProductsSize();
  //   }, [refresh]);

  //   const handleInteractiveModal = () => {
  //     setModalVisible(!modalVisible);
  //   };

  //   const loadProductsSize = async () => {
  //     try {
  //       let data = await fetchDinamicData("products");

  //       setNewdata({ ...newData, productId: "producto-" + (data.length + 1) });
  //     } catch (error) {
  //       console.error("Error al cargar los datos:", error);
  //     } finally {
  //       setLoad(false);
  //     }
  //   };

  const handleEdit = async () => {
    setLoading(true);
    let updateData = newData;
    console.log("Esto esta en new data: ", newData);
    let imageUrl = null;
    if (
      updateData.stock === null ||
      updateData.stock === undefined ||
      updateData.stock === 0
    ) {
      delete updateData.stock;
    }

    try {
      imageUrl = await uploadDinamicImage(newData.image, newData.id);
    } catch (error) {
      console.error("Error al cargar la imagen:", error);
    }

    if (imageUrl) {
      updateData.imgUrl = imageUrl;
    }
    createDinamicDocument(updateData.productId, "products", updateData);
    setRefresh(!refresh);
    navigation.goBack();
    setLoading(false);
  };

  const pickImage = async () => {
    // No permissions request is necessary for launching the image library
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: false,
      aspect: [4, 3],
      quality: 1,
    });

    console.log(result.assets[0].uri);

    if (!result.canceled) {
      setNewdata({ ...newData, image: result.assets[0].uri });
    }
    //setErrorImage("");
  };

  return (
    <ScrollView
      style={[styles.container, { marginTop: Constants.statusBarHeight }]}
      contentContainerStyle={styles.contentContainer}
    >
      <StyledText
        style={{
          fontFamily: theme.fonts.textBold,
          color: "white",
          marginBottom: 10,
        }}
      >
        Completa los campos para agregar un nuevo producto
      </StyledText>
      <View style={{ flex: 1 }}>
        <View
          style={{
            flexDirection: "row",
            flex: 1,
            //backgroundColor: "green",
          }}
        >
          <View style={{ width: "100%", marginRight: 5, flex: 2 }}>
            <StyledText
              style={{
                fontFamily: theme.fonts.textBold,
                color: "white",
                marginBottom: 5,
              }}
            >
              Nombre:{" "}
            </StyledText>

            <TextInput
              value={newData.name}
              style={styles.textInput}
              placeholder={"Nombre del producto"}
              onChangeText={(txt) => {
                setNewdata({ ...newData, name: txt });
              }}
            />
          </View>
          <View
            style={{
              width: "100%",
              marginRight: 5,
              flex: 1,
            }}
          >
            <StyledText
              style={{
                fontFamily: theme.fonts.textBold,
                color: "white",
                marginBottom: 5,
              }}
            >
              Stock:{" "}
            </StyledText>

            <TextInput
              //contentStyle={{ width: "50%", backgroundColor: "pink" }}
              value={newData.stock ? newData.stock.toString() : ""}
              maxLength={5}
              style={styles.textInput}
              keyboardType="numeric"
              placeholder={"Stock del producto"}
              onChangeText={(txt) => {
                setNewdata({ ...newData, stock: parseInt(txt) });
              }}
            />
          </View>
        </View>
        <View style={{ flex: 1 }}>
          <StyledText
            style={{
              fontFamily: theme.fonts.textBold,
              color: "white",
              marginBottom: 5,
            }}
          >
            Descripción:{" "}
          </StyledText>

          <TextInput
            value={newData.description}
            style={styles.textInput}
            placeholder={"Descripción del producto"}
            multiline
            onChangeText={(txt) => {
              setNewdata({ ...newData, description: txt });
            }}
          />
        </View>

        <View
          style={{
            flexDirection: "row",
            width: "100%",
            flex: 1,
            //backgroundColor: "gold",
          }}
        >
          <View style={{ width: "49%", marginRight: 5 }}>
            <StyledText
              style={{
                fontFamily: theme.fonts.textBold,
                color: "white",
                marginBottom: 5,
              }}
            >
              M.de oro:{" "}
            </StyledText>

            <TextInput
              //contentStyle={{ width: "50%", backgroundColor: "pink" }}
              value={newData.goldCoins ? newData.goldCoins.toString() : ""}
              style={styles.textInput}
              placeholder={"Monedas de oro"}
              keyboardType="numeric"
              onChangeText={(txt) => {
                setNewdata({ ...newData, goldCoins: parseInt(txt) });
              }}
            />
          </View>
          <View
            style={{
              width: "49%",

              //backgroundColor: "blue",
            }}
          >
            <StyledText
              style={{
                fontFamily: theme.fonts.textBold,
                color: "white",
                marginBottom: 5,
              }}
            >
              M.de plata:{" "}
            </StyledText>

            <TextInput
              //contentStyle={{ width: "50%", backgroundColor: "black" }}
              value={newData.silverCoins ? newData.silverCoins.toString() : ""}
              style={styles.textInput}
              placeholder={"Monedas de plata"}
              keyboardType="numeric"
              onChangeText={(txt) => {
                setNewdata({ ...newData, silverCoins: parseInt(txt) });
              }}
            />
          </View>
        </View>
        <View style={{ flex: 1, flexDirection: "row" }}>
          <View style={{ width: "100%", marginRight: 5, flex: 1 }}>
            <StyledText
              style={{
                fontFamily: theme.fonts.textBold,
                color: "white",
                marginBottom: 5,
              }}
            >
              P.de oro:{" "}
            </StyledText>

            <TextInput
              //contentStyle={{ width: "50%", backgroundColor: "pink" }}
              value={newData.goldRatio ? newData.goldRatio.toString() : ""}
              style={styles.textInput}
              keyboardType="numeric"
              placeholder={"P. de oro"}
              onChangeText={(txt) => {
                setNewdata({ ...newData, goldRatio: parseInt(txt) });
              }}
            />
          </View>
          <View style={{ width: "100%", marginRight: 5, flex: 1 }}>
            <StyledText
              style={{
                fontFamily: theme.fonts.textBold,
                color: "white",
                marginBottom: 5,
              }}
            >
              P.de plata:{" "}
            </StyledText>

            <TextInput
              //contentStyle={{ width: "50%", backgroundColor: "pink" }}
              value={newData.silverRatio ? newData.silverRatio.toString() : ""}
              style={styles.textInput}
              keyboardType="numeric"
              placeholder={"P. de plata"}
              onChangeText={(txt) => {
                setNewdata({ ...newData, silverRatio: parseInt(txt) });
              }}
            />
          </View>
          <View
            style={{
              //marginLeft: 5,
              flex: 1.05,
              height: 80,
              width: "100%",
              //marginTop: 10,
              //top: "3%",
              //backgroundColor: "red",
              justifyContent: "center",
              alignItems: "flex-start",
            }}
          >
            <StyledText
              style={{
                fontFamily: theme.fonts.textBold,
                color: "white",
                marginBottom: 5,
              }}
            >
              Categoría:
            </StyledText>
            <SelectDropdown
              data={filters}
              onSelect={(selectedItem, index) => {
                console.log(selectedItem, index);
                setFilterSelected(selectedItem);
              }}
              //defaultButtonText={"Todos"}
              defaultValueByIndex={0}
              buttonTextAfterSelection={(selectedItem, index) => {
                // text represented after item is selected
                // if data array is an array of objects then return selectedItem.property to render after item is selected
                return selectedItem;
              }}
              rowTextForSelection={(item, index) => {
                // text represented for each item in dropdown
                // if data array is an array of objects then return item.property to represent item in dropdown
                return item;
              }}
              buttonStyle={styles.dropdown1BtnStyle}
              buttonTextStyle={styles.dropdown1BtnTxtStyle}
              renderDropdownIcon={(isOpened) => {
                return (
                  <Icon
                    name={isOpened ? "chevron-up" : "chevron-down"}
                    type="font-awesome"
                    color={"#444"}
                    size={18}
                  />
                );
              }}
              dropdownIconPosition={"right"}
              dropdownStyle={styles.dropdown1DropdownStyle}
              rowStyle={styles.dropdown1RowStyle}
              rowTextStyle={styles.dropdown1RowTxtStyle}
            />
          </View>
        </View>

        <View style={{ flex: 2 }}>
          <View
            style={{
              justifyContent: "center",
              //alignItems: "center",
              flex: 1,
            }}
          >
            <StyledText
              style={{
                fontFamily: theme.fonts.textBold,
                color: "white",
                marginBottom: 5,
              }}
            >
              Imagen:{" "}
            </StyledText>

            <TouchableOpacity
              onPress={pickImage}
              style={{
                //padding: 10,
                alignItems: "center",
                //marginBottom: 10,
                justifyContent: "center",
                flex: 1,
              }}
            >
              <Image
                source={newData.image ? { uri: newData.image } : NEW_PRODUCTS}
                style={{
                  width: 120,
                  height: 120,
                  resizeMode: "contain",
                  flex: 1,
                }}
              />
            </TouchableOpacity>
          </View>
        </View>

        <View
          style={{
            //marginBottom: 10,
            flexDirection: "row",
            flex: 1,
            //backgroundColor: "orange",
            justifyContent: "space-between",
            alignItems: "flex-end",
          }}
        >
          <Button
            style={{
              margin: 5,
              flex: 1,
              borderRadius: 5,
              height: "40%",
              justifyContent: "center",
              //alignItems: "center",
            }}
            loading={loading}
            disabled={loading}
            //contentStyle={{ margin: 5 }}
            textColor="white"
            buttonColor={theme.colors.orangeSegunda}
            onPress={handleEdit}
          >
            Guardar
          </Button>
          <Button
            style={{
              margin: 5,
              flex: 1,
              borderRadius: 5,
              height: "40%",
              justifyContent: "center",
              //alignItems: "center",
            }}
            textColor="white"
            buttonColor={theme.colors.redSegunda}
            onPress={() => navigation.goBack()}
          >
            Cancelar
          </Button>
        </View>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    width: "100%",
    height: "100%",
    flex: 1,
    backgroundColor: theme.colors.blackSegunda,
    //alignItems: "center",
    padding: 10,
  },
  contentContainer: {
    flex: 1,
  },
  dropdownsRow: {
    flexDirection: "row",
    width: "100%",
    paddingHorizontal: "5%",
  },

  dropdown1BtnStyle: {
    flex: 1,
    width: 125,
    height: 30,
    backgroundColor: "rgba(248, 248, 255,0.93)",
    borderRadius: 8,
    borderWidth: 1,
    borderColor: "#444",
  },
  dropdown1BtnTxtStyle: {
    color: "#444",
    textAlign: "left",
    fontSize: 15,
    fontFamily: theme.fonts.textBold,
  },
  dropdown1DropdownStyle: { backgroundColor: "#EFEFEF" },
  dropdown1RowStyle: {
    backgroundColor: "#EFEFEF",
    borderBottomColor: "#C5C5C5",
  },
  dropdown1RowTxtStyle: {
    color: "#444",
    textAlign: "left",
    fontSize: 15,
    fontFamily: theme.fonts.textBold,
  },
  divider: { width: 12 },
});
