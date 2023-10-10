import React, { useEffect, useState } from "react";
import { View, Text, Modal, StyleSheet, Image } from "react-native";
import theme from "../../theme/theme";
import { Button, TextInput } from "react-native-paper";
import {
  fetchDinamicData,
  updateDinamicDocument,
} from "../../Services/firebase";
import axios from "axios";
import * as ImagePicker from "expo-image-picker";
import { TouchableOpacity } from "react-native";
import { uploadDinamicImage } from "../../Services/ImagesSrv";

//----------------------------MODAL EDIT----------------------------------------------------------------------------

export const ModalEdit = ({
  item,
  visible,
  onCloseModal,
  name,
  refresh,
  setRefresh,
  pts,
  img,
  onEdit,
}) => {
  useEffect(() => {
    console.log("ESTO ES DE ITEM: ", item);
    setNewImg(item?.imgUrl);
    setNewdata({ ...item });
    setLoading(false);
  }, [item]);

  const [newImg, setNewImg] = useState(item?.imgUrl);
  const [loading, setLoading] = useState(false);
  const [usersWithToken, setUsersWithToken] = useState([]);
  const [newData, setNewdata] = useState({
    name: item?.name,
    description: item?.description,
    stock: item?.stock,
    goldCoins: item?.goldCoins,
    silverCoins: item?.silverCoins,
    goldRatio: item?.goldRatio,
    silverRatio: item?.silverRatio,
  });

  const handleEdit = async () => {
    setLoading(true);
    let updateData = newData;
    console.log("Esto esta en new data: ", newData);
    let imageUrl = null;
    if (newImg !== item?.imgUrl) {
      try {
        imageUrl = await uploadDinamicImage(newImg, newData.id);
      } catch (error) {
        console.error("Error al cargar la imagen:", error);
      }
    }
    if (imageUrl) {
      updateData.imgUrl = imageUrl;
    }
    updateDinamicDocument(updateData.id, "products", updateData);
    setLoading(false);
    setRefresh(!refresh);
    onCloseModal();
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
      setNewImg(result.assets[0].uri);
    }
    //setErrorImage("");
  };

  return (
    <Modal
      animationType="slide"
      transparent={true}
      visible={visible}
      onRequestClose={onCloseModal}
    >
      <View style={styles.modalContainer}>
        <View style={styles.modalContent}>
          <View style={{ flex: 1 }}>
            <View
              style={{
                flexDirection: "row",
                flex: 1,
                //backgroundColor: "green",
              }}
            >
              <View style={{ width: "100%", marginRight: 5, flex: 3 }}>
                <Text
                  style={{
                    fontFamily: theme.fonts.text,
                    fontSize: 15,
                    color: "white",
                  }}
                >
                  Nombre:{" "}
                </Text>

                <TextInput
                  value={newData.name}
                  style={styles.textInput}
                  placeholder={name}
                  onChangeText={(txt) => {
                    setNewdata({ ...newData, name: txt });
                  }}
                />
              </View>
              <View style={{ width: "100%", marginRight: 5, flex: 1 }}>
                <Text
                  style={{
                    fontFamily: theme.fonts.text,
                    fontSize: 15,
                    color: "white",
                    //paddingTop: 10,
                  }}
                >
                  Stock:{" "}
                </Text>

                <TextInput
                  //contentStyle={{ width: "50%", backgroundColor: "pink" }}
                  value={newData.stock ? newData.stock.toString() : ""}
                  maxLength={5}
                  style={styles.textInput}
                  keyboardType="numeric"
                  placeholder={newData.stock ? "" : "Sin stock"}
                  onChangeText={(txt) => {
                    setNewdata({ ...newData, stock: parseInt(txt) });
                  }}
                />
              </View>
            </View>
            <View style={{ flex: 1 }}>
              <Text
                style={{
                  fontFamily: theme.fonts.text,
                  fontSize: 15,
                  color: "white",
                }}
              >
                Descripción:{" "}
              </Text>

              <TextInput
                value={newData.description}
                style={styles.textInput}
                placeholder={newData.description}
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
                <Text
                  style={{
                    fontFamily: theme.fonts.text,
                    fontSize: 15,
                    color: "white",

                    //paddingTop: 10,
                  }}
                >
                  M.de oro:{" "}
                </Text>

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
                <Text
                  style={{
                    fontFamily: theme.fonts.text,
                    fontSize: 15,
                    color: "white",
                    //paddingTop: 10,
                  }}
                >
                  M.de plata:{" "}
                </Text>

                <TextInput
                  //contentStyle={{ width: "50%", backgroundColor: "black" }}
                  value={
                    newData.silverCoins ? newData.silverCoins.toString() : ""
                  }
                  style={styles.textInput}
                  placeholder={"Monedas de plata"}
                  keyboardType="numeric"
                  onChangeText={(txt) => {
                    setNewdata({ ...newData, silverCoins: parseInt(txt) });
                  }}
                />
              </View>
            </View>

            <View style={{ flexDirection: "row", flex: 2 }}>
              <View
                style={{
                  justifyContent: "center",
                  alignItems: "center",
                  flex: 1,
                }}
              >
                <Text
                  style={{
                    fontFamily: theme.fonts.text,
                    fontSize: 15,
                    color: "white",
                    right: "33%",
                  }}
                >
                  Imagen:{" "}
                </Text>
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
                    source={{ uri: newImg }}
                    style={{
                      width: 120,
                      height: 120,
                      resizeMode: "contain",
                      flex: 1,
                    }}
                  />
                </TouchableOpacity>
              </View>

              <View style={{ flex: 1 }}>
                <View style={{ width: "100%", marginRight: 5 }}>
                  <Text
                    style={{
                      fontFamily: theme.fonts.text,
                      fontSize: 15,
                      color: "white",
                      paddingTop: 10,
                    }}
                  >
                    P.de oro:{" "}
                  </Text>

                  <TextInput
                    //contentStyle={{ width: "50%", backgroundColor: "pink" }}
                    value={
                      newData.goldRatio ? newData.goldRatio.toString() : ""
                    }
                    style={styles.textInput}
                    keyboardType="numeric"
                    placeholder={"Proporción de oro"}
                    onChangeText={(txt) => {
                      setNewdata({ ...newData, goldRatio: parseInt(txt) });
                    }}
                  />
                </View>
                <View style={{ width: "100%", marginRight: 5 }}>
                  <Text
                    style={{
                      fontFamily: theme.fonts.text,
                      fontSize: 15,
                      color: "white",
                      paddingTop: 10,
                    }}
                  >
                    P.de plata:{" "}
                  </Text>

                  <TextInput
                    //contentStyle={{ width: "50%", backgroundColor: "pink" }}
                    value={
                      newData.silverRatio ? newData.silverRatio.toString() : ""
                    }
                    style={styles.textInput}
                    keyboardType="numeric"
                    placeholder={"Proporción de plata"}
                    onChangeText={(txt) => {
                      setNewdata({ ...newData, silverRatio: parseInt(txt) });
                    }}
                  />
                </View>
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
                style={{ margin: 5, flex: 1, borderRadius: 5, height: "40%" }}
                textColor="white"
                buttonColor={theme.colors.redSegunda}
                onPress={onCloseModal}
              >
                Cancelar
              </Button>
            </View>
          </View>
        </View>
      </View>
    </Modal>
  );
};

export default ModalEdit;

const styles = StyleSheet.create({
  modalContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0, 0, 0, 0.3)",
  },
  modalContent: {
    //flex: 0.65,
    backgroundColor: theme.colors.blackSegunda,
    padding: 15,
    borderRadius: 8,
    borderColor: "white",
    borderWidth: 1,
    width: "90%",
    height: "70%",
  },
  textInput: {
    paddingHorizontal: 10, // Espaciado horizontal del TextInput
    fontSize: 15, // Tamaño de la fuente del texto
    width: "100%", // Ancho del TextInput
    marginVertical: 10,
    height: 40,
  },
});
