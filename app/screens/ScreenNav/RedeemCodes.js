import { StyleSheet, Text, View, Image, TouchableOpacity } from "react-native";
import theme from "../../theme/theme";
import logos from "../../theme/logos";
import { ButtonGeneral } from "../../Components/GeneralComponents/ButtonGeneral";
import { TextGeneral } from "../../Components/GeneralComponents/TextGeneral";
import Icon from "react-native-vector-icons/Ionicons";
import Icon2 from "react-native-vector-icons/Entypo";
import User from "react-native-vector-icons/FontAwesome";
import { collection, addDoc, doc, setDoc } from "firebase/firestore";
import RNFS from "react-native-fs";
import RNHTMLtoPDF from "react-native-html-to-pdf";
import Share from "react-native-share";
import { StatusBar } from "expo-status-bar";
import { useContext, useRef, useState } from "react";
import { cerrarSesion } from "../../Services/AutenticacionSrv";
import { getAuth } from "firebase/auth";
import { SessionContext } from "../../context/SessionContext";
import { LoadGeneral } from "../../Components/GeneralComponents/LoadGeneral";
import { HelperText, TextInput } from "react-native-paper";
import StyledText from "../../theme/StyledText";
// import PDFLib from "react-native-pdf-lib";
export const RedeemCode = () => {
  const [codes, setCodes] = useState([]);
  const auth = getAuth();
  const { user } = useContext(SessionContext);
  const codesRef = useRef([]);
  const [load, setLoad] = useState(false);
  const [ValueGolden, setValueGolden] = useState();
  const [ValuePlata, setValuePlata] = useState();
  const [CodigosGenerales, setCodigosGenerales] = useState(false);
  const [CodeText, setCodeText] = useState("");
  const [errorInputsGeneral, setErrorInputsGeneral] = useState(false);
  const [errorInputsCustom, setErrorInputsCustom] = useState(false);

  const generateRandomCode = () => {
    let code = "";
    const characters =
      "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
    const codeLength = 5; // Longitud del código generado (puedes ajustarlo según tus necesidades)

    for (let i = 0; i < codeLength; i++) {
      const randomIndex = Math.floor(Math.random() * characters.length);
      code += characters.charAt(randomIndex);
    }
    console.log("code generade:::::", code);
    return code;
  };
  const generateCodes = (ValuePlata, ValueGolden, Type) => {
    const codes = [];

    if (Type === "GeneralCode") {
      for (let i = 0; i < 10; i++) {
        codes.push({
          code: generateRandomCode(),
          status: true,
          value: {
            goldCoins: parseInt(ValueGolden),
            silverCoins: parseInt(ValuePlata),
          },
          Type: Type,
        });
      }
      setCodes(codes);
      codesRef.current = codes;
      // console.log("codes::::::::::::::::::", codes);
      return codes;
    }
    if (Type === "PersonalCode") {
      for (let i = 0; i < 10; i++) {
        codes.push({
          code: CodeText,
          status: true,
          value: {
            goldCoins: parseInt(ValueGolden),
            silverCoins: parseInt(ValuePlata),
          },
          Type: Type,
        });
      }
      setCodes(codes);
      codesRef.current = codes;
      // console.log("codes::::::::::::::::::", codes);
      return codes;
    } else {
    }
  };

  const saveCodes = (codes) => {
    console.log(global.dbCon);
    const clienteRef = collection(global.dbCon, "codes");

    for (const code of codes) {
      const newCodeDocRef = doc(clienteRef, code.code); // Utiliza el código como ID del documento
      setDoc(newCodeDocRef, code);
    }
    // console.log("generateCodes", generateCodes());
    // addDoc(clienteRef, { codes: codes });
  };

  const generarNombreArchivoUnico = () => {
    const fechaActual = new Date();
    const anio = fechaActual.getFullYear();
    const mes = fechaActual.getMonth() + 1;
    const dia = fechaActual.getDate();
    const hora = fechaActual.getHours();
    const nombreArchivoConGuion = `${anio}-${mes
      .toString()
      .padStart(2, "0")}-${dia.toString().padStart(2, "0")}-${hora}`;
    const nombreArchivo = `codigos_${nombreArchivoConGuion}`;
    return nombreArchivo;
    // return Platform.OS === "ios"
    //   ? `${RNFS.TemporaryDirectoryPath}/${nombreArchivo}`
    //   : `${RNFS.ExternalDirectoryPath}/${nombreArchivo}`;
  };

  const generarPDFyDescargar = async () => {
    // setLoad(true);
    try {
      const halfLength = Math.ceil(codesRef.current.length / 2);
      const leftColumn = codesRef.current.slice(0, halfLength);
      const rightColumn = codesRef.current.slice(halfLength);
      saveCodes(codesRef.current);
      // Crea el; contenido HTML con los códigos en dos columnas dentro de una tabla
      const htmlContent = `
        <html>
          <body>
            <h1>Códigos de muestra</h1>
            <table style="width: 100%; border-collapse: collapse">
              <tbody>
                <tr>
                  <td style="width: 50%;">
                    ${leftColumn
                      .map(
                        (codigo) => `
                      <p style="border: 1px dashed black; margin: 0; padding: 5px;">Canjea puntos:  ${codigo.code} 😎🍻  ${codigo.value}</p>
                    `
                      )
                      .join("")}
                  </td>
                  <td style="width: 50%;">
                    ${rightColumn
                      .map(
                        (codigo) => `
                      <p style="border: 1px dashed black; margin: 0; padding: 5px;">Canjea puntos: ${codigo.code} 😎🍻  ${codigo.value}</p>
                    `
                      )
                      .join("")}
                  </td>
                </tr>
              </tbody>
            </table>
          </body>
        </html>
      `;

      // Configura las opciones para el PDF
      const options = {
        html: htmlContent,
        fileName: generarNombreArchivoUnico(),
        directory: "Documents",
        height: 842, // Tamaño de página A4 (tamaño predeterminado)
        width: 595,
      };

      // Genera el PDF
      const pdf = await RNHTMLtoPDF.convert(options);

      // Obtiene la ruta del PDF generado
      const pdfPath = pdf.filePath;

      console.log("PDF generado:", pdfPath);

      await Share.open({
        url: `file://${pdfPath}`,
        type: "application/pdf",
        failOnCancel: false,
      });
      const nombreArchivo = generarNombreArchivoUnico();
      await RNFS.moveFile(pdfPath, nombreArchivo);

      console.log("PDF movido a:", nombreArchivo);
    } catch (error) {
      console.error("Error al generar y mover el PDF:", error);
    }
    // setLoad(false);
  };
  return (
    <View style={styles.container}>
      <View
        style={{
          backgroundColor: "black",
          height: 50,
          justifyContent: "space-between",
          alignItems: "center",
          flexDirection: "row",
          paddingHorizontal: 8,
        }}
      >
        <View style={{ flexDirection: "row", alignItems: "center" }}>
          <User
            name={"user"}
            size={25}
            type={"entypo"}
            color={"white"}
            style={{ marginRight: 15 }}
          />
          <View style={{ flexDirection: "column" }}>
            <Text style={{ color: "white" }}>
              Bienvenido {user?.name ? user.name : "Usuario"} {user?.lastName}
            </Text>
            <Text style={{ color: "white" }}>{auth?.currentUser?.email}</Text>
          </View>
        </View>

        <TouchableOpacity
          onPress={() => cerrarSesion()}
          style={{ flexDirection: "row", alignItems: "center" }}
        >
          <Text style={{ color: "white", marginRight: 5 }}>Salir</Text>
          <Icon name={"exit"} size={25} type={"entypo"} color={"white"} />
        </TouchableOpacity>
      </View>
      <View
        style={{
          backgroundColor: "black",
          flex: 5,
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Image source={logos.blanco} style={{ width: 180, height: 160 }} />
      </View>
      <View style={{ backgroundColor: "black", flex: 10 }}>
        <View
          style={{
            backgroundColor: theme.colors.blackSegunda,
            height: "100%",
            borderTopLeftRadius: 20,
            borderTopEndRadius: 20,
            alignItems: "center",
            justifyContent: "center",
            padding: 20,
          }}
        >
          <View
            style={{
              flex: 1,
              flexDirection: "row",
              justifyContent: "space-around",
              //paddingHorizontal: 20,
              width: "100%",
              //backgroundColor: "red",
              //marginVertical: 20,
              //marginTop: 20,
            }}
          >
            <TouchableOpacity
              style={{
                backgroundColor: CodigosGenerales
                  ? theme.colors.orangeSegunda
                  : theme.colors.grey,
                padding: 10,
                borderRadius: 5,
              }}
              onPress={() => setCodigosGenerales(true)}
            >
              <StyledText
                style={{
                  //marginHorizontal: 30,
                  //textDecorationLine: "underline",
                  color: "white",
                }}
              >
                Codigos Generales
              </StyledText>
            </TouchableOpacity>

            <TouchableOpacity
              style={{
                backgroundColor: CodigosGenerales
                  ? theme.colors.grey
                  : theme.colors.orangeSegunda,
                padding: 10,
                borderRadius: 5,
              }}
              onPress={() => setCodigosGenerales(false)}
            >
              <StyledText
                style={{
                  //marginHorizontal: 30,
                  //textDecorationLine: "underline",
                  color: "white",
                }}
              >
                Codigos Personalizados
              </StyledText>
            </TouchableOpacity>
          </View>
          <View
            style={{
              flex: 10,
              //backgroundColor: "green",
              width: "100%",
              alignItems: "flex-start",
              padding: 10,
            }}
          >
            {CodigosGenerales ? (
              <View
                style={
                  {
                    //flex: 10,
                    //backgroundColor: "green",
                    //width: "100%",
                    //alignItems: "center",
                    //padding: 10,
                  }
                }
              >
                <TextGeneral
                  text={"Código General"}
                  color={"white"}
                  size={18}
                  style={[styles.textIn]}
                />
                <View style={{ flexDirection: "row", flex: 1, width: "100%" }}>
                  <View style={{ flex: 1 }}>
                    <TextInput
                      label="Monedas Oro."
                      value={ValueGolden}
                      onChangeText={setValueGolden}
                      mode="outlined"
                      style={{ width: "95%" }}
                      outlineStyle={styles.marcoEntradaCodigo}
                      keyboardType="numeric"
                      //error={!ValueGolden ? true : false}
                    />
                  </View>
                  <View style={{ flex: 1 }}>
                    <TextInput
                      label="Monedas Plata."
                      value={ValuePlata}
                      onChangeText={setValuePlata}
                      mode="outlined"
                      style={{ width: "95%" }}
                      outlineStyle={styles.marcoEntradaCodigo}
                      keyboardType="numeric"
                    />
                  </View>
                </View>
                {errorInputsGeneral && (
                  <HelperText
                    style={{
                      color: "red",
                      fontFamily: theme.fonts.textBold,
                      fontSize: 16,
                      bottom: 180,
                    }}
                  >
                    LLene todos los campos correctamente
                  </HelperText>
                )}
                <ButtonGeneral
                  icon={
                    <Icon2
                      name={"ticket"}
                      size={45}
                      type={"entypo"}
                      color={"white"}
                      style={{ marginRight: 5 }}
                    />
                  }
                  background={theme.colors.orangeSegunda}
                  border={8}
                  size={60}
                  onPress={() => {
                    if (
                      ValuePlata != undefined ||
                      (ValuePlata != null && ValueGolden != undefined) ||
                      ValueGolden != null
                    ) {
                      setErrorInputsGeneral(false);
                      generateCodes(ValuePlata, ValueGolden, "GeneralCode");
                      console.log(
                        "mis codes son--------------------------->",
                        codesRef.current
                      );
                      // saveCodes(codes);
                      generarPDFyDescargar();
                      console.log(
                        "Valor de codigo:",
                        ValuePlata,
                        "Valor GOLd",
                        ValueGolden
                      );
                      // generateRandomCode()
                    } else {
                      console.log(
                        "No se puedieron generar los codigos de manera correcta"
                      );
                      setErrorInputsGeneral(true);
                    }
                  }}
                  width={"100%"}
                />
              </View>
            ) : (
              <View
                style={{
                  //backgroundColor: "red",
                  width: "100%",
                  height: "100%",
                  flex: 1,
                }}
              >
                <TextGeneral
                  text={"Generar código Personalizado"}
                  color={"white"}
                  size={18}
                  style={[styles.textIn]}
                />
                <TextInput
                  label="Genera el codigo"
                  value={CodeText}
                  onChangeText={setCodeText}
                  mode="outlined"
                  style={{ width: 200 }}
                  outlineStyle={styles.marcoEntradaCodigo}
                  keyboardType="numeric"
                />
                <View style={{ flexDirection: "row", flex: 1, width: "100%" }}>
                  <View style={{ flex: 1 }}>
                    <TextInput
                      label="Monedas Plata."
                      value={ValuePlata}
                      onChangeText={setValuePlata}
                      mode="outlined"
                      style={{ width: "95%" }}
                      outlineStyle={styles.marcoEntradaCodigo}
                      keyboardType="numeric"
                    />
                  </View>
                  <View style={{ flex: 1 }}>
                    <TextInput
                      label="Monedas Oro."
                      value={ValueGolden}
                      onChangeText={setValueGolden}
                      mode="outlined"
                      style={{ width: "95%" }}
                      outlineStyle={styles.marcoEntradaCodigo}
                      keyboardType="numeric"
                    />
                  </View>
                </View>
                {errorInputsCustom && (
                  <HelperText
                    style={{
                      color: "red",
                      fontFamily: theme.fonts.textBold,
                      fontSize: 16,
                      bottom: 100,
                    }}
                  >
                    LLene todos los campos correctamente
                  </HelperText>
                )}
                <ButtonGeneral
                  icon={
                    <Icon2
                      name={"ticket"}
                      size={40}
                      type={"entypo"}
                      color={"white"}
                      style={{ marginRight: 5 }}
                    />
                  }
                  background={theme.colors.orangeSegunda}
                  border={8}
                  size={60}
                  onPress={() => {
                    if (
                      ValuePlata != undefined &&
                      ValueGolden != undefined &&
                      CodeText != undefined
                    ) {
                      setErrorInputsCustom(false);
                      generateCodes(ValuePlata, ValueGolden, "PersonalCode");

                      console.log(
                        "mis codes son--------------------------->",
                        codesRef.current
                      );
                      // saveCodes(codes);
                      generarPDFyDescargar();
                      console.log(
                        "Valor de codigo:",
                        ValuePlata,
                        "Valor Gold",
                        ValueGolden
                      );
                      // generateRandomCode()
                    } else {
                      console.log(
                        "No se pudieron generar los codigos de manera correcta"
                      );
                      setErrorInputsCustom(true);
                    }
                  }}
                  width={"100%"}
                />
              </View>
            )}
          </View>
        </View>
      </View>
      <StatusBar style="auto" />
    </View>
  );
};
const styles = StyleSheet.create({
  container: {
    paddingTop: 25,
    flex: 1,
    backgroundColor: "black",
    flexDirection: "column",
    // paddingHorizontal: theme.separation.horizontalSeparation,
    justifyContent: "flex-start",
  },
  textIn: {
    marginBottom: 15,
    marginTop: 10,
  },
});
