import { useEffect, useRef, useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  Image,
  FlatList,
  Modal,
  TouchableOpacity,
} from "react-native";
import { FAB } from "react-native-paper";
import theme from "../../theme/theme";
import { TextGeneral } from "../../Components/GeneralComponents/TextGeneral";
import logos from "../../theme/logos";
import ImagenImport, { ImagenLunchCategory } from "../../theme/Images";
import ModalComponent from "../../Components/Promotions/ModalPromotion";
import { Tarjeta } from "../../Components/Promotions/CardPromotion";
import { fetchPromotions } from "../../Services/PromotionSrv";
import { LoadGeneral } from "../../Components/GeneralComponents/LoadGeneral";
import { fetchDinamicData } from "../../Services/firebase";
import { Card } from "../../Components/Predictions/Card";
import StyledText from "../../theme/StyledText";

export const Trivia = ({ navigation }) => {
  const [promotionEdit, setPromotionEdit] = useState([]);
  const [image, setImage] = useState(null);
  const editing = useRef(false);
  const [dataDB, setDataDB] = useState([]);
  const [load, setLoad] = useState(false);
  const [refresh, setRefresh] = useState(false);

  useEffect(() => {
    loadData();
  }, [refresh]);

  const openModal = () => {
    setModalVisible(true);
  };

  //   const renderItem = ({ item }) => {
  //     return (
  //       <Card
  //         item={item}
  //         onPressEdit={() => {
  //           editing.current = true;
  //           setPromotionEdit(Object.assign({}, item));
  //           openModal();
  //         }}
  //         onPressDelete={() => {
  //           console.log("mi iten a eliminar es::::::::::::::::", item);
  //           deletedPredictionDB(item);
  //         }}
  //       />
  //     );
  //   };

  const renderItem = ({ item }) => {
    return (
      <TouchableOpacity
        onPress={() =>
          navigation.navigate("triviaDetails", {
            trivia: item,
            setRefresh: setRefresh,
            refresh: refresh,
          })
        }
        style={{
          flex: 1,
          backgroundColor: "black",
          margin: 5,
          borderRadius: 5,
          flexDirection: "row",
          padding: 5,
        }}
      >
        <View style={{ flex: 1 }}>
          <Image
            source={{ uri: item.image }}
            style={{ width: 100, height: 120, borderRadius: 10 }}
          />
        </View>

        <View style={{ flex: 2 }}>
          <StyledText
            style={{ fontSize: 20, flex: 1, fontWeight: "bold" }}
            color={"white"}
          >
            {item.title}
          </StyledText>
          <StyledText
            style={{ fontSize: 16, marginVertical: 5, flex: 1 }}
            color={"white"}
          >
            {item.description}
          </StyledText>
          <View
            style={{
              flex: 1,
              //backgroundColor: "red",
              flexDirection: "row",
              alignItems: "center",
              justifyContent: "space-between",
            }}
          >
            <StyledText
              color={"white"}
              style={{
                fontSize: 14,
                marginVertical: 5,
                //backgroundColor: "red",
                flex: 1,
                justifyContent: "center",
              }}
            >
              Monedas: {item.points}{" "}
              <Image
                source={ImagenImport.coin}
                style={{
                  width: 15,
                  height: 15,
                  resizeMode: "contain",
                  flex: 1,
                }}
              />
            </StyledText>
            <StyledText
              color={"white"}
              style={{
                fontSize: 14,
                marginVertical: 5,
                flex: 1,
                justifyContent: "center",
              }}
            >
              Preguntas: {item.trivia.length}{" "}
            </StyledText>
          </View>
        </View>
      </TouchableOpacity>
    );
  };

  const [modalVisible, setModalVisible] = useState(false);
  const [modalNewPredictionVisible, ssetModalNewPredictionVisible] =
    useState(false);

  const loadData = async () => {
    setLoad(true);
    try {
      const data = await fetchDinamicData("trivias");
      console.log("los datos de predicciones son::::::::::::::::::", data);
      setDataDB(data);
    } catch (error) {}
    setLoad(false);
  };

  const deletedPredictionDB = async (deleted) => {
    setLoad(true);
    console.log("ENTRAMOS A LA FUNCION ELIMINAR");

    try {
      const filename1 = deleted.avatarLeft.substring(
        deleted.avatarLeft.lastIndexOf("/") + 1
      );
      console.log("RUTA IMAGEN IZQUIERDA=================", filename1);

      const filename2 = deleted.avatarRight.substring(
        deleted.avatarRight.lastIndexOf("/") + 1
      );
      console.log("RUTA IMAGEN DERECHA===============", filename2);

      const filenameLeft = filename1.split("?")[0];
      const imgLeft = decodeURIComponent(filenameLeft);

      console.log("RUTA DECODIFICADA Izquierda===============", imgLeft);

      const filename = filename2.split("?")[0];
      const imgRight = decodeURIComponent(filename);
      console.log("RUTA DECODIFICADA DERECHA===============", imgRight);
      console.log("Objeto deleted -------------", deleted);
      // console.log("el nobre de mi imagen es::::::", filename);
      loadData();
    } catch (error) {}
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
      <Modal
        visible={modalNewPredictionVisible}
        animationType="slide"
        transparent
        style={styles.modal}
      ></Modal>
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
          text={"Trivias"}
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
        onPress={() => {
          navigation.navigate("new-trivia", {
            setRefresh: setRefresh,
            refresh: refresh,
          });
        }}
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
