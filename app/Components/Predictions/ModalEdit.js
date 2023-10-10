import React, { useState } from "react";
import { View, Text, Modal, Button, StyleSheet, Image } from "react-native";
import theme from "../../theme/theme";
import { TextInput } from "react-native-paper";

//----------------------------MODAL EDIT----------------------------------------------------------------------------

export function ModalEdit({
  item,
  visible,
  onCloseModal,
  name,
  pts,
  img,
  onEdit,
}) {
  const [editing, setEditing] = useState(false);
  const [newName, setNewName] = useState(item.name);
  const [newPts, setNewPts] = useState(item.pts);
  const [newImg, setNewImg] = useState(item.img);

  const handleEdit = () => {
    onEdit(newName, newPts);
    onCloseModal();
    setEditing(false);
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
          <View>
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
              value={newName}
              style={styles.textInput}
              placeholder={name}
            />

            <Text
              style={{
                fontFamily: theme.fonts.text,
                fontSize: 15,
                color: "white",
                paddingTop: 10,
              }}
            >
              Costo en puntos:{" "}
            </Text>

            <TextInput
              value={newPts}
              style={styles.textInput}
              placeholder={pts}
            />

            <Text
              style={{
                fontFamily: theme.fonts.text,
                fontSize: 15,
                color: "white",
              }}
            >
              Imagen:{" "}
            </Text>

            <View
              style={{ padding: 10, alignItems: "center", marginBottom: 10 }}
            >
              <Image source={img} style={{ size: 10 }} />
            </View>

            <View style={{ marginBottom: 10 }}>
              <Button
                title="Editar"
                color={theme.colors.orangeSegunda}
                onPress={handleEdit}
              />
            </View>

            <Button
              title="Cancelar"
              color={theme.colors.redSegunda}
              onPress={onCloseModal}
            />
          </View>
        </View>
      </View>
    </Modal>
  );
}

export default ModalEdit;

const styles = StyleSheet.create({
  modalContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0, 0, 0, 0.3)",
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
    marginTop: 10,
    height: 40,
    marginBottom: 20,
  },
});
