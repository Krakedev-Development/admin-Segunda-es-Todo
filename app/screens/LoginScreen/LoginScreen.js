import {
  View,
  Text,
  Alert,
  StyleSheet,
  TouchableHighlight,
  Modal,
  Pressable,
  Dimensions,
} from "react-native";
import { Button, Icon } from "@rneui/base";
import { useState } from "react";
import { cerrarSesion } from "../../Services/AutenticacionSrv";
import { Ingresar } from "../../Services/AutenticacionSrv";
import { Image, Input } from "@rneui/themed";
import StyledText from "../../theme/StyledText";
import { HelperText, TextInput } from "react-native-paper";
import theme from "../../theme/theme";

export const LoginForm = ({ navigation }) => {
  const [usuario, setUsuario] = useState();
  const [contraseña, setcontraseña] = useState();
  const [errorCorreo, setErrorCorreo] = useState();
  const [errorPassword, setErrorPassword] = useState();
  const [hasErrorcorreo, sethasErrorcorreo] = useState(false);
  const [hasErrorcontraseña, sethasErrorcontraseña] = useState();
  const [cambiarOjo, setCambiarOjo] = useState(true);
  const [modalVisible, setModalVisible] = useState(false);
  const [hasErrorcontraseña2, sethasErrorcontraseña2] = useState(false);

  const [contraseña2, setcontraseña2] = useState();
  const emailRegex =
    /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/;

  const contraseñaRegex = /^(?=\w*\d)(?=\w*[A-Z])(?=\w*[a-z])\S{8,16}$/;

  const validaciones = async () => {
    console.log("Entro a la validacion");
    await Ingresar(usuario, contraseña, sethasErrorcontraseña2, setcontraseña2);
    // console.log("Estado MENSAJE eRROR", hasErrorcontraseña2);
    // console.log("Mensaje ERROR", contraseña2);

    if (contraseña == null || contraseña == "") {
      sethasErrorcontraseña(true);
      setErrorPassword("ingrese una contraseña");
      setModalVisible(true);
    } else {
      sethasErrorcontraseña(false);
      setModalVisible(true);

      if (!contraseñaRegex.test(contraseña)) {
        setErrorPassword(
          "Contraseña no valida \nIntente  nuevamente \nRecuerde que debe tener 1 Mayúscula  y 1 número"
        );
        sethasErrorcontraseña(true);
        setModalVisible(true);
      } else {
        sethasErrorcontraseña(false);
      }
    }
    if (usuario == null || usuario == "") {
      sethasErrorcorreo(true);
      setErrorCorreo("Ingrese un correo");
    } else {
      sethasErrorcorreo(false);

      if (!emailRegex.test(usuario)) {
        setErrorCorreo("Correo no valido \n Intente  nuevamente");
        sethasErrorcorreo(true);
        setModalVisible(true);
      } else {
        setErrorCorreo("Ingrese un correo");
        sethasErrorcorreo(false);
      }
    }
    // email, password, setErrorEStado, setErrorMessage
    // await Ingresar(usuario, contraseña, false, setErrorPassword);
  };

  const ValidarLogin = async () => {
    validaciones();
  };

  return (
    <View style={styles.container}>
      <View style={styles.cajaCabecera}>
        <Image
          source={require("../../../assets/logoWhiteSi.png")}
          style={{ width: 500, height: 160, margin: 30, resizeMode: "contain" }}
        />
      </View>
      <View style={styles.cajaCuerpo}>
        <Text
          style={{
            alignContent: "center",
            textAlign: "center",
            fontWeight: "bold",
            fontSize: 30,
            justifyContent: "flex-start",
          }}
        >
          Iniciar Sesión
        </Text>

        <View style={{ paddingTop: "8%" }}>
          <TextInput
            label="Ingresa tu correo electrónico"
            value={usuario}
            onChangeText={setUsuario}
            mode="outlined"
            placeholder="Correo"
            // autoFocus={true}
            outlineColor="#666666"
            activeOutlineColor="#666666"
          />
          <HelperText type="error" visible={hasErrorcorreo}>
            {errorCorreo}
          </HelperText>

          <TextInput
            label="Ingresa tu contraseña"
            placeholder="Contraseña"
            value={contraseña}
            onChangeText={setcontraseña}
            mode="outlined"
            outlineColor="#666666"
            activeOutlineColor="#666666"
            secureTextEntry={cambiarOjo}
            right={
              cambiarOjo ? (
                <TextInput.Icon
                  icon="eye"
                  onPress={() => {
                    setCambiarOjo(!cambiarOjo);
                    return false;
                  }}
                />
              ) : (
                <TextInput.Icon
                  icon="eye"
                  onPress={() => {
                    setCambiarOjo(!cambiarOjo);
                    return false;
                  }}
                />
              )
            }
          />
          {hasErrorcontraseña ? (
            <HelperText type="error" visible={hasErrorcontraseña}>
              {errorPassword}
            </HelperText>
          ) : null}

          <View style={{ alignSelf: "center" }}>
            <Button
              title="Ingresar"
              onPress={ValidarLogin}
              buttonStyle={{
                borderRadius: 10,
                backgroundColor: "#2e2e2e",
              }}
              containerStyle={{
                width: 200,
                paddingTop: 40,
              }}
            />
          </View>
        </View>

        {/*ffin del  view body */}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#2e2e2e",
    //alignItems: 'center',
    alignItems: "center",
    justifyContent: "center",
    // padding: 10,
  },
  cajaCabecera: {
    //backgroundColor: 'cyan',
    flex: 3,
    alignItems: "center",

    justifyContent: "flex-start",
    padding: 100,
  },
  cajaCuerpo: {
    //backgroundColor: 'brown',
    flex: 6,
    // alignItems: "stretch",
    paddingHorizontal: 30,
    justifyContent: "flex-start",
    paddingTop: "10%",
    borderTopStartRadius: 15,
    borderTopEndRadius: 15,
    backgroundColor: "#ffffff",
    width: theme.ViewSize.maxWidth,
    // alignContent: "center",
  },
  titulo: {
    fontSize: 16,
    fontWeight: "bold",
    paddingBottom: 39,
  },
  cajaBotones: {
    paddingBottom: 10,
    alignItems: "center",
    justifyContent: "flex-start",
    flex: 4,
  },

  txtinput: {
    borderWidth: 1,
    paddingVertical: 10,
    paddingHorizontal: 15,
    borderRadius: 10,
    borderColor: "gray",
    width: 310,
    height: 50,
  },
  label: {
    zIndex: 100,
    position: "absolute",
    backgroundColor: "white",
    top: -11,
    left: 10,
    marginLeft: 11,
  },
  centeredView: {
    flex: 1,
    justifyContent: "center",
    // alignItems: 'center',
    marginTop: "10%",
    // backgroundColor: 'red',
  },
  modalView: {
    backgroundColor: "white",
    borderRadius: 20,
    paddingTop: "5%",
    paddingHorizontal: "20%",
    justifyContent: "space-around",
    paddingBottom: "5%",
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  button: {
    borderRadius: 20,
    padding: 10,
    elevation: 2,
  },
  buttonOpen: {
    backgroundColor: "#F194FF",
  },
  buttonClose: {
    backgroundColor: "#2196F3",
  },
  textStyle: {
    color: "white",
    fontWeight: "bold",
    textAlign: "center",
  },
  modalText: {
    marginBottom: 15,
    textAlign: "center",
  },
  logo: {
    marginVertical: 20,
    resizeMode: "center",
  },
});
