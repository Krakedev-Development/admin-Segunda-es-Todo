import { useEffect, useRef, useState } from "react";
import { StyleSheet, Text, View, Image, FlatList } from "react-native";
import { FAB } from "react-native-paper";
import theme from "../../theme/theme";
import { TextGeneral } from "../../Components/GeneralComponents/TextGeneral";
import logos from "../../theme/logos";
import { ImagenLunchCategory } from "../../theme/Images";
import ModalComponent from "../../Components/Promotions/ModalPromotion";
import { Tarjeta } from "../../Components/Promotions/CardPromotion";
import {
  deleteImageStorage,
  deletePromotion,
  fetchPromotions,
} from "../../Services/PromotionSrv";
import { LoadGeneral } from "../../Components/GeneralComponents/LoadGeneral";

export const Promotion = () => {
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
      <Tarjeta
        item={item}
        onPressEdit={() => {
          editing.current = true;
          setPromotionEdit(Object.assign({}, item));
          openModal();
        }}
        onPressDelete={() => {
          // console.log("mi iten a eliminar es::::::::::::::::", item);
          deletedPromotionDB(item);
        }}
      />
    );
  };

  const [modalVisible, setModalVisible] = useState(false);

  const loadData = async () => {
    setLoad(true);
    try {
      const data = await fetchPromotions();
      // console.log("los datos de promociones son::::::::::::::::::", data);
      setDataDB(data);
    } catch (error) {}
    setLoad(false);
  };

  const deletedPromotionDB = async (deleted) => {
    setLoad(true);
    try {
      const filename1 = deleted.imgUrl.substring(
        deleted.imgUrl.lastIndexOf("/") + 1
      );
    
      const filename = filename1.split("?")[0];
      const rutaDecodificada = decodeURIComponent(filename);
      deleteImageStorage(rutaDecodificada);
      deletePromotion(deleted?.promotionId);
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
          text={"Promociones"}
          color={"white"}
          center
          size={30}
          style={[styles.title]}
        />
        <Image source={logos.blanco} style={{ width: 100, height: 80 }} />
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
              keyExtractor={(item) => item?.promotionId}
            />
          </View>
        </View>
      </View>
      <FAB
        icon="plus"
        style={styles.fab}
        onPress={handleOpenModal}
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
