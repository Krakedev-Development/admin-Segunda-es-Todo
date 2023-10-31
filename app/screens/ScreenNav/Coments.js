import { useEffect, useRef, useState } from "react";
import theme from "../../theme/theme";
import { StyleSheet, Text, View, Image, Dimensions } from "react-native";
import { ScrollView } from "react-native-gesture-handler";
import { TextGeneral } from "../../Components/GeneralComponents/TextGeneral";
import { ItemComent } from "../../Components/GeneralComponents/ItemComent";
import Icon from "react-native-vector-icons/FontAwesome5";
import logos from "../../theme/logos";
import { ModalGeneral } from "../../Components/GeneralComponents/ModalGeneral";
import { RatingGeneral } from "../../Components/GeneralComponents/RatingGeneral";
import { fetchComents } from "../../Services/ComentsSrv";
import { ActivityIndicator, MD2Colors } from "react-native-paper";
import { LoadGeneral } from "../../Components/GeneralComponents/LoadGeneral";

export const Coments = () => {
  const [modalVisible, setModalVisible] = useState(false);
  const [coment, setComent] = useState([]);
  const [comentDb, setComentDb] = useState([]);
  const [averageClients, setAverageClients] = useState(0);
  const [load, setLoad] = useState(false);
  // const onRatingChange = (newRating) => {
  //   setRating(newRating);
  // };
  useEffect(() => {
    loadComents();
  }, []);

  const loadComents = async () => {
    setLoad(true);
    try {
      const a = await fetchComents(setComentDb);
      const valores = a?.map((dato) => dato?.raiting);
      const promedio =
        valores?.reduce((total, valor) => total + valor, 0) / valores?.length;
      setAverageClients(parseFloat(promedio));
    } catch (error) {}
    setLoad(false);
    // console.log(
    //   "mis comentarios son: ---------------------------> ",
    //   parseFloat(promedio)
    // );
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
        <View>
          <TextGeneral
            text={"Valoraciones"}
            color={"white"}
            center
            size={30}
            style={[styles.title]}
          />
          <View style={{ alignItems: "center", justifyContent: "flex-start" }}>
            <Text style={{ color: "white" }}>Promedio: </Text>
            <RatingGeneral rating={averageClients} readOnly />
          </View>
        </View>

        <Image source={logos.blanco} style={{ width: 100, height: 80 }} />
      </View>

      <View style={{ backgroundColor: "black", flex: 4 }}>
        <ModalGeneral
          data={coment}
          visible={modalVisible}
          onClose={() => {
            setModalVisible(false);
          }}
        />
        <View
          style={{
            backgroundColor: theme.colors.blackSegunda,
            flex: 1,
            marginBottom: 40,
            borderRadius: 8,
          }}
        >
          <TextGeneral
            text={"Lista de comentarios:"}
            color={"white"}
            center
            style={[styles.subtitle]}
          />

          <ScrollView contentContainerStyle={styles.scrollViewContent}>
            {/* <Text style={styles.text}>Contenido del ScrollView</Text> */}
            {comentDb?.map((item, index) => (
              <ItemComent
                key={index}
                textSize={17}
                onPress={() => {
                  setModalVisible(true);
                  setComent(item);
                }}
                background={theme.colors.orangeSegunda}
                width={"90%"}
                border={2}
                data={item.user}
                raiting={item}
                icon={
                  <Icon
                    name={"user-alt"}
                    size={20}
                    type={"entypo"}
                    color={"white"}
                  />
                }
              />
            ))}
          </ScrollView>
        </View>
      </View>
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
});
