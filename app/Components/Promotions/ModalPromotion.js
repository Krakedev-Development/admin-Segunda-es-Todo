import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  Modal,
  StyleSheet,
  Image,
  TouchableOpacity,
} from "react-native";
import theme from "../../theme/theme";
import { HelperText, TextInput } from "react-native-paper";
import * as ImagePicker from "expo-image-picker";
import { SubirFoto } from "../../Services/ImagesSrv";
import { addPromotionDB, updatePromotionDB } from "../../Services/PromotionSrv";
import { LoadGeneral } from "../GeneralComponents/LoadGeneral";
import { ScrollView } from "react-native-gesture-handler";
import { validaciones } from "./validationsPromotion";
//----------------------------MODAL PLUS----------------------------------------------------------------------------

const ModalComponent = ({ visible, onCloseModal, editing, data, loadData }) => {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [points, setPoints] = useState("");
  const [imageDB, setImageDB] = useState(null);
  const [load, setLoad] = useState(false);
  const [errorName, setErrorName] = useState("");
  const [errorDescription, setErrorDescription] = useState("");
  const [errorPoints, setErrorPoints] = useState("");
  const [errorImage, setErrorImage] = useState("");
  useEffect(() => {
    // console.log("mi data al editar es:::::", data);
    if (editing === false) {
      console.log("se limpiaron los campos");
      setImageDB(null);
      setName("");
      setDescription("");
      setPoints("");
    }

    if (data) {
      setName(data?.name);
      setDescription(data?.description);
      setPoints(data?.price);
      setImageDB(data?.imgUrl);
    } else {
      setImageDB(null);
    }
  }, [editing, data]);

  const changeImage = () => {
    // Cambiar a otra imagen o restablecer a null si no deseas mostrar ninguna imagen.
    // image = null;
    pickImage();
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
      setImageDB(result.assets[0].uri);
    }
    setErrorImage("");
  };

  const generateRandomId = (length) => {
    const characters =
      "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
    let result = "";
    const charactersLength = characters.length;

    for (let i = 0; i < length; i++) {
      const randomIndex = Math.floor(Math.random() * charactersLength);
      result += characters.charAt(randomIndex);
    }

    return result;
  };

  const randomId = generateRandomId(8);

  const upLoadImage = async () => {
    setLoad(true);
    try {
      await SubirFoto(imageDB, "PromocionImg" + randomId, (downloadURL) => {
        addPromotionDB({ ...docNew, ...{ imgUrl: downloadURL } });
        setImageDB(null);
        setName("");
        setDescription("");
        setPoints("");
        setLoad(false);
        onCloseModal();
        loadData();
      });
    } catch (error) {}
  };

  const editPromotion = async () => {
    setLoad(true);
    try {
      const filename1 = data?.imgUrl?.substring(
        data.imgUrl.lastIndexOf("/") + 6
      );
      const filenameTemp = filename1.split(".")[0];
      const rutaDecodificada = decodeURIComponent(filenameTemp);
      const IDFinal = rutaDecodificada.split("/")[2];

      //console.log("mi filename...........", IDFinal);

      await SubirFoto(imageDB, IDFinal, (downloadURL) => {
         updatePromotionDB(data.promotionId, {
          ...docNew,
          ...{ imgUrl: downloadURL },
        }); 
        setImageDB(null);
        setName("");
        setDescription("");
        setPoints("");
        setLoad(false);
        onCloseModal();
        loadData();
      }); 
      
    } catch (error) {}
  };

  let hasError = false;

  const saveData = () => {
    hasError = (!validaciones(name,setErrorName,description, setErrorDescription, points, setErrorPoints, imageDB, setErrorImage))
    console.log("name: "+name +" description "+description+" points "+points+" imageDB "+imageDB)
    console.log("Error: "+hasError)
    if (hasError) {
      console.log("se detiene")
      return;
    }

    if (editing) {
      editPromotion();
    } else {
      upLoadImage();
    }
  };

  let docNew = {
    promotionId: editing ? data.promotionId : "promocion" + randomId,
    name: name,
    description: description,
    price: points,
    imgUrl: editing ? data?.imgUrl : null,
  };

  return (
    <Modal
      animationType="slide"
      transparent={true}
      visible={visible}
      style={{ zIndex: 3 }}
    >
      <View style={styles.modalContainer}>
        <View style={styles.modalContent}>
          <ScrollView keyboardShouldPersistTaps="handled">
            <Text
              style={{
                fontFamily: theme.fonts.text,
                fontSize: 21,
                color: "white",
                paddingBottom: 20,
              }}
            >
              Promociones
            </Text>

            <Text style={styles.subtitle}>Nombre:</Text>

            <TextInput
              style={styles.textInput}
              placeholder="Escribe el nombre de la promoción"
              placeholderTextColor={"#909090"}
              value={name}
              onChangeText={(e) => {
                setName(e);
                setErrorName("");
              }}
              maxLength={50}
            />
            <HelperText
              type="error"
              visible={errorName}
              style={{ color: theme.colors.orangeSegunda }}
            >
              {errorName}
            </HelperText>
            <Text style={styles.subtitle}>Descripción:</Text>

            <TextInput
              style={styles.textInput}
              placeholderTextColor={"#909090"}
              value={description}
              onChangeText={(e) => {
                setDescription(e);
                setErrorDescription("");
              }}
              placeholder="Aqui la descripción de la promoción"
              maxLength={70}
            />
            <HelperText
              type="error"
              visible={errorDescription}
              style={{ color: theme.colors.orangeSegunda }}
            >
              {errorDescription}
            </HelperText>
            <Text style={styles.subtitle}>Costo en puntos:</Text>

            <TextInput
              style={styles.textInput}
              placeholderTextColor={"#909090"}
              placeholder="¿Cuántos puntos valdrá?"
              value={points}
              keyboardType="numeric"
              onChangeText={(e) => {
                setPoints(e);
                setErrorPoints("");
              }}
              maxLength={4}
            />
            <HelperText
              type="error"
              visible={errorPoints}
              style={{ color: theme.colors.orangeSegunda }}
            >
              {errorPoints}
            </HelperText>
            <View
              style={{
                justifyContent: "center",
                alignItems: "center",
                marginBottom: 5,
              }}
            >
              <Text style={[styles.subtitle, { marginBottom: 5 }]}>
                Imagen:
              </Text>
              {imageDB ? (
                <TouchableOpacity onPress={changeImage}>
                  <Image
                    source={{ uri: imageDB }}
                    style={{ width: 200, height: 200, borderRadius: 5 }}
                  />
                </TouchableOpacity>
              ) : (
                <TouchableOpacity onPress={pickImage}>
                  <View
                    style={{
                      width: 200,
                      height: 200,
                      backgroundColor: "lightgray",
                      justifyContent: "center",
                      alignItems: "center",
                      borderRadius: 5,
                    }}
                  >
                    <Text style={{ textAlign: "center", color: "#909090" }}>
                      Pincha aquí para seleccionar tu imagen
                    </Text>
                  </View>
                </TouchableOpacity>
              )}
              <HelperText
                type="error"
                visible={errorImage}
                style={{ color: theme.colors.orangeSegunda }}
              >
                {errorImage}
              </HelperText>
            </View>
            <View
              style={{
                flexDirection: "row",
                justifyContent: "space-around",
              }}
            >
              <TouchableOpacity
                style={styles.buttonClose}
                onPress={() => {
                  saveData();
                }}
              >
                <Text style={styles.closeButtonText}>Guardar</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={styles.buttonClose}
                onPress={() => {
                  onCloseModal();
                  setImageDB(null);
                  setName("");
                  setDescription("");
                  setPoints("");
                  setErrorDescription("");
                  setErrorImage("");
                  setErrorName("");
                  setErrorPoints("");
                }}
              >
                <Text style={styles.closeButtonText}>Cerrar</Text>
              </TouchableOpacity>
            </View>
          </ScrollView>
        </View>
      </View>
      {load && <LoadGeneral zIndex={1000} load={load} transparent />}
    </Modal>
  );
};

export default ModalComponent;

const styles = StyleSheet.create({
  modalContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0, 0, 0, 0.5)",
    zIndex: 3,
  },
  modalContent: {
    backgroundColor: theme.colors.blackSegunda,
    padding: 20,
    borderRadius: 8,
    borderColor: "white",
    borderWidth: 1,
    width: 320,
  },
  textInput: {
    paddingHorizontal: 16, // Espaciado horizontal del TextInput
    fontSize: 15, // Tamaño de la fuente del texto
    width: 275, // Ancho del TextInput
    // marginTop: 10,
    height: 40,
    // marginBottom: 10,
  },
  closeButtonText: {
    fontSize: 16,
    fontWeight: "bold",
    color: "white",
    textAlign: "center",
  },
  buttonClose: {
    backgroundColor: theme.colors.orangeSegunda,
    padding: 10,
    borderRadius: 6,
    marginTop: 5,
    width: 100,
  },
  subtitle: {
    fontFamily: theme.fonts.text,
    fontSize: 15,
    color: "white",
    marginBottom: 5,
    // backgroundColor: "green",
  },
});
