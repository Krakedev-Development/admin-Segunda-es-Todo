import { useRef, useState } from "react";
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
import { ButtonGeneral } from "../../Components/GeneralComponents/ButtonGeneral";
import IconEntypo from "react-native-vector-icons/FontAwesome5";
import IconMAterialIcons from "react-native-vector-icons/MaterialIcons";
import ModalEdit from "./ModalEditPromotion";
import { color } from "@rneui/base";

export function Tarjeta({ item, onPressEdit, onPressDelete }) {
  const [modalVisible, setModalVisible] = useState(false);

  const handleOpenModal = () => {
    setModalVisible(true);
  };
  const handleCloseModal = () => {
    setModalVisible(false);
  };
  return (
    <View
      style={{
        backgroundColor: "black",
        height: 80,
        flexDirection: "row",
        alignItems: "center",
        padding: 8,
        borderRadius: 5,
        justifyContent: "space-between",
        marginBottom: 3,
        marginHorizontal: 10,
        marginTop: 10,
      }}
    >
      <Image
        source={{ uri: item?.imgUrl ? item.imgUrl : null }}
        style={{ width: 80, height: "100%", borderRadius: 10 }}
      />

      <View
        style={{
          flex: 3,
          paddingHorizontal: 10,
          backgroundColor: "black",
        }}
      >
        <Text
          style={{
            color: "white",
            fontSize: 17,
          }}
        >
          {item?.name ? item.name : ""}
        </Text>

        <Text
          style={{
            color: "white",
            fontSize: 15,
          }}
        >
          {item?.price ? item.price : ""} pts
        </Text>
      </View>

      <View
        style={{
          flex: 2,
          justifyContent: "space-between",
          color: "white",
          fontSize: 20,
          flexDirection: "row",
        }}
      >
        <ButtonGeneral
          width={40}
          border={10}
          size={40}
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
          size={40}
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

        <Modal visible={modalVisible} animationType="slide" transparent>
          <View style={styles.modalContainer}>
            <View style={styles.modalContent}>
              <Text style={styles.modalText}>¿Estás seguro de eliminar?</Text>
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

        {/* {isVisible && (
          <ModalEdit
            item={item}
            visible={isVisible}
            onCloseModal={toggleVisibility}
            name={name}
            pts={pts}
            img={img}
            onEdit={onEdit}
          />
        )} */}
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
