import { useEffect, useRef, useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  Image,
  FlatList,
  Modal,
  Button,
  TouchableOpacity,
} from "react-native";
import { FAB } from "react-native-paper";
import theme from "../../theme/theme";

import { ImagenLunchCategory } from "../../theme/Images";
import { ButtonGeneral } from "../GeneralComponents/ButtonGeneral";
import IconEntypo from "react-native-vector-icons/FontAwesome5";
import IconMAterialIcons from "react-native-vector-icons/MaterialIcons";
import { Divider, color } from "@rneui/base";

export function Card({ item, onPressEdit, onPressDelete }) {
  const [modalVisible, setModalVisible] = useState(false);
  const [points, setPoints] = useState(0);

  const handleOpenModal = () => {
    setModalVisible(true);
  };
  const handleCloseModal = () => {
    setModalVisible(false);
  };

  const CalculatePoints = () => {
    if (item.category === "soccer") {
      let totalPoints = 0;
      //console.log("MATCH BET:", item.matchBet);
      const match = item.matchBet || [];
      if (match.length > 0) {
        match.forEach((singleMatch) => {
          console.log(singleMatch.userPoints);
          totalPoints += singleMatch.userPoints;
        });
        //console.log("PUNTOS:", totalPoints);
      }
      setPoints(totalPoints);
      console.log("PUNTOS DE LA APUESTA: ", totalPoints);
    } else {
      console.log(" BET RIGHT:", item.betRight);
      console.log(" BET LEFT:", item.betLeft);
    }
  };

  useEffect(() => {
    CalculatePoints();
  }, []);

  return (
    <View
      style={{
        backgroundColor: "black",
        height: 110,
        //flexDirection: "row",
        alignItems: "center",
        padding: 10,
        borderRadius: 5,
        //justifyContent: "space-between",
        margin: 6,
        //marginHorizontal: 10,
        //marginTop: 10,
      }}
    >
      <View
        style={{
          flex: 5,
          flexDirection: "row",
          justifyContent: "space-between",
        }}
      >
        <View
          style={{
            flex: 3,
            padding: 3,
            //justifyContent: "center",
            //alignItems: "center",
            //backgroundColor: "red",
          }}
        >
          <View
            style={{
              flex: 2,
              //backgroundColor: "yellow",
              padding: 5,
              alignItems: "center",
            }}
          >
            <Image
              source={{ uri: item.avatarLeft }}
              style={{ width: 100, height: 40, flex: 1, resizeMode: "contain" }}
            />
          </View>
          <View
            style={{
              flex: 1,
              padding: 5,
              //backgroundColor: "green",
              width: "100%",
            }}
          >
            <Text
              style={{
                color: "white",
                fontSize: 14,
                flex: 1,
                textAlign: "center",
              }}
            >
              {item?.teamLeft ? item.teamLeft : ""}
            </Text>
          </View>
        </View>
        <View
          style={{ flex: 0.5, justifyContent: "center", alignItems: "center" }}
        >
          <Text
            style={{
              color: "white",
              fontSize: 15,
              //flex: 1,
            }}
          >
            -
          </Text>
        </View>
        <View
          style={{
            flex: 3,
            padding: 3,
            //justifyContent: "center",
            //alignItems: "center",
            //backgroundColor: "red",
          }}
        >
          <View
            style={{
              flex: 2,
              //backgroundColor: "yellow",
              padding: 5,
              alignItems: "center",
            }}
          >
            <Image
              source={{ uri: item.avatarRight }}
              style={{ width: 100, height: 40, flex: 1, resizeMode: "contain" }}
            />
          </View>
          <View
            style={{
              flex: 1,
              padding: 5,
              //backgroundColor: "green",
              width: "100%",
            }}
          >
            <Text
              style={{
                color: "white",
                fontSize: 14,
                flex: 1,
                textAlign: "center",
              }}
            >
              {item?.teamRight ? item.teamRight : ""}
            </Text>
          </View>
        </View>

        <View
          style={{
            flex: 1,
            padding: 10,
            //paddingTop: 30,
            justifyContent: "center",
            alignItems: "center",
            //backgroundColor: "blue",
          }}
        >
          <ButtonGeneral
            width={40}
            border={10}
            size={35}
            //margin={1}
            onPress={onPressEdit}
            background={theme.colors.orangeSegunda}
            icon={
              <IconEntypo
                name={"edit"}
                size={15}
                type={"entypo"}
                color={"white"}
              />
            }
          />
          <ButtonGeneral
            width={40}
            border={10}
            size={35}
            margin={1}
            onPress={handleOpenModal}
            background={theme.colors.redSegunda}
            icon={
              <IconMAterialIcons
                name={"delete-outline"}
                size={20}
                type={"entypo"}
                color={"white"}
              />
            }
          />
        </View>

        <Modal visible={modalVisible} animationType="slide" transparent>
          <View style={styles.modalContainer}>
            <View style={styles.modalContent}>
              <Text style={styles.modalText}>
                ¿Estás seguro de eliminar la predicción seleccionada?
              </Text>
              <View
                style={{
                  flexDirection: "row",
                  alignItems: "center",
                  justifyContent: "space-around",
                }}
              >
                <TouchableOpacity
                  onPress={() => onPressDelete()}
                  style={[
                    styles.modalButton,
                    { backgroundColor: theme.colors.redSegunda },
                  ]}
                >
                  <Text style={styles.buttonText}>Confirmar</Text>
                </TouchableOpacity>
                <TouchableOpacity
                  onPress={handleCloseModal}
                  style={[
                    styles.modalButton,
                    { backgroundColor: theme.colors.orangeSegunda },
                  ]}
                >
                  <Text style={styles.buttonText}>Cancelar</Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>
        </Modal>
      </View>
      <View style={{ flex: 1, width: "100%", paddingVertical: 2 }}>
        <Divider />
        <View
          style={{
            flexDirection: "row",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <Text style={{ color: "white" }}>Total apostado: {points}</Text>
          <View
            style={{
              justifyContent: "center",
              alignItems: "center",
              paddingVertical: 5,
            }}
          >
            <View
              style={{
                width: 8,
                height: 8,
                borderRadius: 5,
                backgroundColor:
                  item.state === "available"
                    ? "green"
                    : theme.colors.redSegunda,
              }}
            ></View>
          </View>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  button: {
    backgroundColor: "#4CAF50",
    padding: 10,
    borderRadius: 5,
  },
  buttonText: {
    color: "white",
    fontSize: 16,
  },
  modalContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0, 0, 0, 0.5)",
  },
  modalContent: {
    backgroundColor: "white",
    padding: 20,
    borderRadius: 10,
    backgroundColor: theme.colors.blackSegunda,
    borderColor: "white",
    borderWidth: 1,
    width: 320,
  },
  modalText: {
    fontSize: 18,
    marginBottom: 10,
    color: theme.colors.whiteSegunda,
    alignItems: "center",
    justifyContent: "center",
    textAlign: "center",
  },
  modalButton: {
    padding: 10,
    borderRadius: 5,
    marginTop: 10,
    alignItems: "center",
    width: 120,
  },
});
