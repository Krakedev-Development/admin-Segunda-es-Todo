import { useEffect, useRef, useState } from "react";
import { StyleSheet, Text, View, Image, FlatList, Modal } from "react-native";
import { FAB } from "react-native-paper";
import theme from "../../theme/theme";
import { TextGeneral } from "../../Components/GeneralComponents/TextGeneral";
import logos from "../../theme/logos";
import { ImagenLunchCategory } from "../../theme/Images";
import ModalComponent from "../../Components/Promotions/ModalPromotion";
import { Tarjeta } from "../../Components/Promotions/CardPromotion";
import {
  fetchPromotions,
} from "../../Services/PromotionSrv";
import { deletePrediction, deleteImageStorage } from "./PredictionSrv";
import { LoadGeneral } from "../../Components/GeneralComponents/LoadGeneral";
import { fetchDinamicData } from "../../Services/firebase";
import { Card } from "../../Components/Predictions/Card";
import { ModalPredictionOption } from "./PredictionsModals";

export const Predictions = ({ navigation }) => {
  const [promotionEdit, setPromotionEdit] = useState([]);
  const [image, setImage] = useState(null);
  const editing = useRef(false);
  const [dataDB, setDataDB] = useState([]);
  const [load, setLoad] = useState(false);

  useEffect(() => {
    loadData();
  }, []);

  const openModal = () => {
    setModalVisible(true);
  };

  const renderItem = ({ item }) => {
    return (
      <Card
        item={item}
        onPressEdit={() => {
          editing.current = true;
          setPromotionEdit(Object.assign({}, item));
          openModal();
        }}
        onPressDelete={() => {
          console.log("mi iten a eliminar es::::::::::::::::", item);
          deletedPredictionDB(item);
        }}
      />
    );
  };

  const [modalVisible, setModalVisible] = useState(false);
  const [modalNewPredictionVisible, setModalNewPredictionVisible] = useState(false);
  const loadData = async () => {
    setLoad(true);
    try {
      const data = await fetchDinamicData("predictions");
      console.log("los datos de predicciones son::::::::::::::::::", data);
      setDataDB(data);
    } catch (error) { }
    setLoad(false);
  };

  const deletedPredictionDB = async (deleted) => {
    setLoad(true);
    console.log("ENTRAMOS A LA FUNCION ELIMINAR");


    try {
      const filename1 = deleted.avatarLeft.substring(
        deleted.avatarLeft.lastIndexOf("/") + 1 
      )
      console.log("RUTA IMAGEN IZQUIERDA=================", filename1);

      const filename2 = deleted.avatarRight.substring(
        deleted.avatarRight.lastIndexOf("/") + 1
      );
      console.log("RUTA IMAGEN DERECHA===============",filename2);


      const filenameLeft = filename1.split("?")[0];
      const imgLeft = decodeURIComponent(filenameLeft);

      console.log("RUTA DECODIFICADA Izquierda===============", imgLeft);
      
      const filename = filename2.split("?")[0];
      const imgRight = decodeURIComponent(filename);
      console.log("RUTA DECODIFICADA DERECHA===============", imgRight);
      console.log("Objeto deleted -------------",deleted)
      deleteImageStorage(imgRight);
      deleteImageStorage(imgLeft);
      deletePrediction(deleted?.id);
      // console.log("el nobre de mi imagen es::::::", filename);
      loadData();
    } catch (error) { }
    setLoad(false);
  };

  const handleOpenModal = () => {
    // console.log("el EDITING antes es:", editing);

    editing.current = false;
    setPromotionEdit(null);
    // setEditing(false);
    // console.log("el EDITING despues es:", editing);
    setModalVisible(true);
  };

  const handleCloseModal = () => {
    setModalVisible(false);
  };
  return (
    <View style={styles.container}>
      {/* Modal para elegir que tipo de pronóstico nuevo quiere crear */}
      <Modal visible={modalNewPredictionVisible} animationType="slide" transparent style={styles.modal}>
        <ModalPredictionOption navigation = {navigation} setNewPredictionModal = {setModalNewPredictionVisible} />
      </Modal>
      <View
        style={{
          backgroundColor: "black",
          flex: 1,
          alignItems: "center",
          justifyContent: "space-between",
          flexDirection: "row",
        }}
      >

        <TextGeneral
          text={"Predicciones"}
          color={"white"}
          center
          size={30}
          style={[styles.title]}
        />
        <Image
          source={logos.blanco}
          style={{ width: 100, height: 80, resizeMode: "contain" }}
        />
      </View>
      <View style={{ backgroundColor: "black", flex: 4 }}>
        <View
          style={{
            backgroundColor: theme.colors.blackSegunda,
            flex: 1,
            marginBottom: 40,
            borderRadius: 8,
          }}
        >
          <View>
            <FlatList
              data={dataDB}
              renderItem={renderItem}
              keyExtractor={(item) => item?.id}
            />
          </View>
        </View>
      </View>
      <FAB
        icon="plus"
        style={styles.fab}
        onPress={() => {setModalNewPredictionVisible(true)}}
        color="white"
      />
      {/* Renderizamos el componente del modal solo cuando el estado es true */}
      <ModalComponent
        editing={editing.current}
        data={promotionEdit}
        visible={modalVisible}
        onCloseModal={handleCloseModal}
        image={image}
        loadData={loadData}
      />
      {load && <LoadGeneral load={load} />}
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
  text: {
    fontSize: 20,
    fontWeight: "bold",
    color: "white",
    marginVertical: 10,
  },
  fab: {
    position: "absolute",
    margin: 16,
    right: 0,
    bottom: 0,
    backgroundColor: theme.colors.orangeSegunda,
    color: "white",
  },
  button: {
    borderRadius: 20,
    padding: 10,
    elevation: 2,
  },
});
