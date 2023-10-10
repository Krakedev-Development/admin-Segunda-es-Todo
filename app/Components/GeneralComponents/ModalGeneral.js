import React, { useState } from "react";
import {
  Alert,
  Modal,
  StyleSheet,
  Text,
  Pressable,
  View,
  TouchableOpacity,
} from "react-native";
import theme from "../../theme/theme";
import { ScrollView } from "react-native-gesture-handler";
import { RatingGeneral } from "./RatingGeneral";

export const ModalGeneral = ({ visible, onClose, data }) => {
  const styles = StyleSheet.create({
    centeredView: {
      flex: 1,
      justifyContent: "center",
      alignItems: "center",
      marginTop: 22,
    },
    modalView: {
      margin: 20,
      backgroundColor: theme.colors.blackSegunda,
      borderWidth: 1,
      borderColor: "white",
      borderRadius: 20,
      padding: 15,
      //   alignItems: "center",
      justifyContent: "space-between",
      shadowColor: "#000",
      shadowOffset: {
        width: 0,
        height: 2,
      },
      shadowOpacity: 0.25,
      shadowRadius: 4,
      elevation: 5,
      height: data.comentary ? 280 : "15%",
      width: "90%",
    },

    modalText: {
      backgroundColor: theme.colors.blackSegunda,
      borderRadius: 5,
      marginBottom: 15,
      textAlign: "justify",
      color: "white",
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
    },
    scrollViewContent: {
      justifyContent: "center",
      // alignItems: "center",
      textAlign: "justify",
      minWidth: "100%",
    },
  });

  return (
    <Modal
      animationType="slide"
      transparent={true}
      visible={visible}
      //   onRequestClose={onClose}
    >
      <View style={styles.centeredView}>
        <View style={styles.modalView}>
          <View
            style={{
              marginTop: 20,
              height: data.comentary ? 200 : 50,
              //   backgroundColor: "green",
              justifyContent: "center",
            }}
          >
            <View
              style={{ flexDirection: "row", justifyContent: "space-between" }}
            >
              <View style={styles.modalText}>
                <Text style={{ color: "white" }}>{data?.user?.idUser}</Text>
                <Text style={{ color: "white" }}>{data?.user?.name}</Text>
              </View>
              <View>
                <Text
                  style={{
                    color: "white",
                    // backgroundColor: "cyan",
                    textAlign: "right",
                  }}
                >
                  {data.date}
                </Text>
                <RatingGeneral
                  size={15}
                  color={theme.colors.blackSegunda}
                  readOnly
                  rating={data?.raiting}
                />
              </View>
            </View>
            {data.comentary ? (
              <View
                style={{
                  backgroundColor: "#404040",
                  borderRadius: 3,
                  padding: 6,
                  height: "75%",
                }}
              >
                <ScrollView contentContainerStyle={styles.scrollViewContent}>
                  <Text style={{ color: "white" }}>{data?.comentary}</Text>
                </ScrollView>
              </View>
            ) : (
              <></>
            )}
            <TouchableOpacity style={styles.buttonClose} onPress={onClose}>
              <Text style={styles.closeButtonText}>Cerrar</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </Modal>
  );
};
