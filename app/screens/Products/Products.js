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
import ModalEdit from "../../Components/Products/ModalEdit";

export const Products = ({ navigation }) => {
  const [modalVisible, setModalVisible] = useState(false);
  const [item, setItem] = useState(null);
  const [promotionEdit, setPromotionEdit] = useState([]);
  const [image, setImage] = useState(null);
  const editing = useRef(false);
  const [dataDB, setDataDB] = useState([]);
  const [load, setLoad] = useState(false);
  const [refresh, setRefresh] = useState(false);

  useEffect(() => {
    loadData();
  }, [refresh]);

  const handleInteractiveModal = () => {
    setModalVisible(!modalVisible);
  };

  const loadData = async () => {
    setLoad(true);
    try {
      let data = await fetchDinamicData("products");
      console.log("los datos de productos son::::::::::::::::::", data);

      data.sort((a, b) => {
        const stockA = a?.stock || 0;
        const stockB = b?.stock || 0;

        const compareStock = stockB - stockA;

        if (compareStock !== 0) {
          return compareStock;
        }

        return a.name.localeCompare(b.name);
      });

      setDataDB(data);
    } catch (error) {
      console.error("Error al cargar los datos:", error);
    } finally {
      setLoad(false);
    }
  };

  const renderItem = ({ item }) => {
    return (
      <TouchableOpacity
        onPress={() =>
          // navigation.navigate("triviaDetails", {
          //   trivia: item,
          //   setRefresh: setRefresh,
          //   refresh: refresh,
          // })
          {
            setItem(item);
            handleInteractiveModal();
          }
        }
        style={{
          flex: 1,
          backgroundColor: item?.stock ? theme.colors.orangeSegunda : "black",
          margin: 5,
          borderRadius: 5,
          flexDirection: "row",
          padding: 5,
        }}
      >
        <View style={{ flex: 1 }}>
          <Image
            source={{ uri: item.imgUrl }}
            style={{
              width: 100,
              height: 120,
              borderRadius: 10,
              resizeMode: "stretch",
            }}
          />
        </View>

        <View style={{ flex: 2 }}>
          <StyledText
            style={{ fontSize: 20, flex: 1, fontWeight: "bold" }}
            color={"white"}
          >
            {item.name}
          </StyledText>
          <StyledText
            style={{ fontSize: 16, marginVertical: 5, flex: 1 }}
            color={"white"}
          >
            {item.description}
          </StyledText>
          {item.stock && (
            <StyledText
              color={"white"}
              style={{
                fontSize: 14,
                marginVertical: 5,
                flex: 1,
                justifyContent: "center",
              }}
            >
              Stock: {item.stock}{" "}
            </StyledText>
          )}
          <View>
            <StyledText
              color={"white"}
              style={{
                fontSize: 14,
                marginVertical: 5,
                flex: 1,
                justifyContent: "center",
              }}
            >
              Proporción: {item.goldRatio}
              {"% "}
              <Image
                source={ImagenImport.coin}
                style={{
                  width: 15,
                  height: 15,
                  resizeMode: "contain",
                  flex: 1,
                }}
              />{" "}
              {item.silverRatio}
              {"% "}
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
          </View>
          <View style={{ flexDirection: "row" }}>
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
                M. oro: {item.goldCoins}{" "}
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
            </View>
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
                M. plata: {item.silverCoins}{" "}
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
            </View>
          </View>
        </View>
      </TouchableOpacity>
    );
  };

  return (
    <View style={styles.container}>
      {/* Modal para elegir que tipo de pronóstico nuevo quiere crear */}
      <ModalEdit
        item={item}
        visible={modalVisible}
        onCloseModal={handleInteractiveModal}
        refresh={refresh}
        setRefresh={setRefresh}
      />
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
          text={"Productos"}
          color={"white"}
          center
          size={30}
          style={[styles.title]}
        />
        <Image
          source={logos.blanco}
          style={{ width: 100, height: 80, resizeMode: "stretch" }}
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
