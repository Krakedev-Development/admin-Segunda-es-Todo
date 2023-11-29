import {
  StyleSheet,
  Text,
  View,
  Platform,
  PermissionsAndroid,
  Image,
  ScrollView,
  Alert,
} from "react-native";
import React, { useState, useRef, useEffect } from "react";
import QRCode from "react-native-qrcode-svg";
import ViewShot from "react-native-view-shot";
import RNFS from "react-native-fs";
import { Button, Divider, TextInput } from "react-native-paper";
import Share from "react-native-share";
import {
  createDinamicDocumentWithinId,
  getDinamicDocs,
  updateDinamicDocument,
} from "../../Services/firebase";
import theme from "../../theme/theme";
import StyledText from "../../theme/StyledText";
import { TouchableOpacity } from "react-native";
import Constants from "expo-constants";
import PDF from "react-native-pdf";
import RNHTMLtoPDF from "react-native-html-to-pdf";
import Modal from "react-native-modal";
import { Icon } from "@rneui/base";
import SelectDropdown from "react-native-select-dropdown";

export const RedeemCodes = () => {
  const [gold, setGold] = useState("5");
  const [silver, setSilver] = useState("5");
  const [attempts, setAttempts] = useState("5");
  const [codesNumber, setCodesNumber] = useState("5");
  const [type, setType] = useState("5");
  const [qrCodes, setQRCodes] = useState([]);
  const [qrCode, setQrCode] = useState(null);
  const [specialCode, setSpecialCode] = useState(false);
  const [validateExport, setValidateExport] = useState(false);
  const [generateCode, setGenerateCode] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const [dbCodes, setDdbCodes] = useState([]);
  const qrCodeRef = useRef(null);
  const viewShotRef = useRef(null);
  const LOGO = require("../../../assets/Logo_gray.png");
  const filters = ["5", "10", "20"];
  const [filterSelected, setFilterSelected] = useState("5");

  useEffect(() => {
    console.log("ESTO TIENE QRCODES:", qrCodes);
  }, [qrCodes]);

  useEffect(() => {
    handleCodes();
  }, []);

  const handleCodes = async () => {
    let codesInDB = await getDinamicDocs("codes");
    setDdbCodes(codesInDB);
  };

  const OwnerClaimed = ({ code }) => {
    if (code.ownerData) {
      console.log(code.ownerData);
      return (
        <View style={{ flex: 1 }}>
          {!code.state && (
            <View
              style={{
                justifyContent: "center",
                alignItems: "center",
                flexDirection: "row",
                width: "100%",
                height: "100%",
                flex: 1,
              }}
            >
              <View
                style={{
                  justifyContent: "center",
                  alignItems: "center",
                  //width: "50%",
                  height: "100%",
                  flex: 0.5,
                  //backgroundColor: "blue",
                }}
              >
                <Image
                  source={{ uri: code.ownerData.image }}
                  style={{ width: 50, height: 50, borderRadius: 50 }}
                />
              </View>
              <View
                style={{
                  justifyContent: "center",
                  alignItems: "center",
                  //width: "50%",
                  height: "100%",
                  flex: 1,
                  //backgroundColor: "yellow",
                }}
              >
                <StyledText>
                  {code.ownerData.name.concat(" ", code.ownerData.lastName)}
                </StyledText>
              </View>
            </View>
          )}
        </View>
      );
    } else if (code.state && !code.dataClaimed) {
      return (
        <View style={{ justifyContent: "center", alignItems: "center" }}>
          <StyledText>Sin reclamar</StyledText>
        </View>
      );
    }
  };

  const EvaluateCode = ({ code }) => {
    if (code.ownerData) {
      console.log(code.ownerData);
      return (
        <View style={{ flex: 1 }}>
          {!code.state && (
            <View
              style={{
                justifyContent: "center",
                alignItems: "center",
                flexDirection: "row",
                width: "100%",
                height: "100%",
                flex: 1,
              }}
            >
              <View
                style={{
                  justifyContent: "center",
                  alignItems: "center",
                  //width: "50%",
                  height: "100%",
                  flex: 0.5,
                  //backgroundColor: "blue",
                }}
              >
                <Image
                  source={{ uri: code.ownerData.image }}
                  style={{ width: 50, height: 50, borderRadius: 50 }}
                />
              </View>
              <View
                style={{
                  justifyContent: "center",
                  alignItems: "center",
                  //width: "50%",
                  height: "100%",
                  flex: 1,
                  //backgroundColor: "yellow",
                }}
              >
                <StyledText>
                  {code.ownerData.name.concat(" ", code.ownerData.lastName)}
                </StyledText>
              </View>
            </View>
          )}
        </View>
      );
    } else if (code.state && !code.dataClaimed) {
      return (
        <View style={{ justifyContent: "center", alignItems: "center" }}>
          <StyledText>Sin reclamar</StyledText>
        </View>
      );
    } else {
      return (
        <View style={{ justifyContent: "center", alignItems: "center" }}>
          {code.dataClaimed &&
            code.dataClaimed.length > 0 &&
            code.dataClaimed.map((owner, index) => (
              <View
                key={index} // Añade una clave única para cada elemento en el mapa
                style={{
                  justifyContent: "center",
                  alignItems: "center",
                  flexDirection: "row",
                  width: "100%",
                  height: 50, // Altura de cada elemento dentro del ScrollView
                }}
              >
                <View
                  style={{
                    justifyContent: "center",
                    alignItems: "center",
                    flex: 0.5,
                  }}
                >
                  <Image
                    source={{ uri: owner.image }}
                    style={{ width: 50, height: 50, borderRadius: 50 }}
                  />
                </View>
                <View
                  style={{
                    justifyContent: "center",
                    alignItems: "center",
                    flex: 1,
                  }}
                >
                  <StyledText>
                    {owner.name.concat(" ", owner.lastName)}
                  </StyledText>
                </View>
              </View>
            ))}
        </View>
      );
    }
  };

  const formatDateSpanish = (fecha) => {
    if (!fecha) {
      return ""; // Manejo de fecha nula o indefinida
    }

    let newFecha;

    if (fecha?.seconds) {
      newFecha = new Date(fecha.seconds * 1000); // Multiplicamos por 1000 para convertir segundos a milisegundos
    } else {
      newFecha = new Date(fecha);
    }

    const dia = newFecha.getDate();
    const mesIndex = newFecha.getMonth(); // Obtener el índice del mes
    const anio = newFecha.getFullYear();
    const hora = newFecha.getHours();
    const minutos = newFecha.getMinutes();
    const segundos = newFecha.getSeconds();

    const mesesEnEspanol = [
      "enero",
      "febrero",
      "marzo",
      "abril",
      "mayo",
      "junio",
      "julio",
      "agosto",
      "septiembre",
      "octubre",
      "noviembre",
      "diciembre",
    ];

    const nombreMes = mesesEnEspanol[mesIndex];

    const fechaFormateada = `${dia} /${
      mesIndex + 1
    }/${anio} HORA: ${hora}:${minutos}`;
    //console.log("FECHA FORMATEADA: ", fechaFormateada);

    return fechaFormateada;
  };

  const HistotialRedeemModal = () => {
    return (
      <View style={{}}>
        <Modal
          testID={"modal"}
          isVisible={isVisible}
          onSwipeComplete={() => setIsVisible(false)}
          //swipeDirection={["down"]}
          style={{
            //backgroundColor: "white",
            height: 300,
            padding: 0,
            margin: 0,
            justifyContent: "flex-end",
          }}
        >
          <View
            style={{ backgroundColor: "white", height: "75%", padding: 10 }}
          >
            <ScrollView>
              <TouchableOpacity
                onPress={() => setIsVisible(false)}
                style={{ alignItems: "flex-end", marginBottom: 10 }}
              >
                <Icon
                  name="x"
                  type="feather"
                  size={25}
                  color={"black"}
                  //style={{ flex: 1 }}
                />
              </TouchableOpacity>
              <View style={{ flexDirection: "row", marginVertical: 10 }}>
                <View
                  style={{
                    flex: 1,
                    justifyContent: "center",
                    alignItems: "center",
                  }}
                >
                  <StyledText bolder>DATOS DEL CODIGO:</StyledText>
                </View>
                <View
                  style={{
                    flex: 1,
                    justifyContent: "center",
                    alignItems: "center",
                  }}
                >
                  <StyledText bolder>DATOS DEL PROPIETARIO:</StyledText>
                </View>
              </View>
              {dbCodes.length > 0 &&
                dbCodes.map((code) => {
                  return (
                    <View style={{ marginVertical: 5 }}>
                      <View style={{ flexDirection: "row" }}>
                        <View style={{ flex: 1 }}>
                          <StyledText>ID: {code.id}</StyledText>
                          <StyledText>
                            MONEDAS DE ORO: {code.money.gold}
                          </StyledText>
                          <StyledText>
                            MONEDAS DE PLATA: {code.money.silver}
                          </StyledText>
                          {code.hasOwnProperty("exchangeDate") && (
                            <StyledText>
                              FECHA : {formatDateSpanish(code.exchangeDate)}
                            </StyledText>
                          )}
                          {code.hasOwnProperty("dataClaimed") && (
                            <StyledText>
                              USOS DISPONIBLES : {code.attempts}
                            </StyledText>
                          )}
                        </View>
                        <View
                          style={{
                            flex: 1,
                            //backgroundColor: "red",
                            justifyContent: "center",
                            alignItems: "center",
                          }}
                        >
                          <EvaluateCode code={code} />
                        </View>
                      </View>
                      <View
                        style={{
                          justifyContent: "center",
                          alignItems: "center",
                        }}
                      >
                        <StyledText>
                          ____________________________________________________________
                        </StyledText>
                      </View>
                    </View>
                  );
                })}
            </ScrollView>
          </View>
        </Modal>
      </View>
    );
  };

  const handleDownloadQRCode = async () => {
    if (
      (gold !== "" && silver !== "" && codesNumber !== "" && type !== "") ||
      (gold !== "" &&
        silver !== "" &&
        codesNumber !== "" &&
        attempts !== "" &&
        specialCode)
    ) {
      console.log("GENERANDO - - - - -");
      setGenerateCode(true);
      //const numberOfCodes = 2; // Define cuántos códigos deseas generar
      const generatedQRCodes = []; // Arreglo para almacenar los datos de los códigos QR generados

      for (let i = 0; i < parseInt(codesNumber); i++) {
        let codeQR = {
          state: true,
          money: {
            gold: gold ? parseInt(gold) : 0,
            silver: silver ? parseInt(silver) : 0,
          },
          type: filterSelected,
        };
        if (specialCode && attempts) {
          codeQR.attempts = attempts;
          codeQR.dataClaimed = [];
          delete codeQR.type;
        }
        console.log("ASI SE VA A LA BASE: ", codeQR);
        let firebaseCode = await createDinamicDocumentWithinId("codes", codeQR);
        console.log("ESTO RECUPERO DE FIREBASE: ", firebaseCode);
        setQrCode(firebaseCode);
        // Capturar la vista y guardar la imagen
        if (viewShotRef.current) {
          try {
            const uri = await viewShotRef.current.capture();
            const path =
              RNFS.PicturesDirectoryPath + `/${firebaseCode.id}_${i}.png`;

            await RNFS.moveFile(uri, path);
            await RNFS.scanFile(path);

            // Agregar los datos del código QR generado al arreglo
            generatedQRCodes.push({ qrCode: firebaseCode, uri: path });
          } catch (error) {
            console.log("Error: ", error);
          }
          setValidateExport(true);
        } else {
          alert(
            "No se puede capturar la vista. Asegúrate de que viewShotRef esté definido."
          );
        }
      }

      // Agregar los códigos generados al estado
      setQRCodes(generatedQRCodes);
      setGenerateCode(false);
    } else {
      Alert.alert(
        "Erro al generar qrs",
        "Necesita ingresar valores correctos o mayores a 0 en los campos"
      );
    }
  };

  const generateAndExportPDF = async () => {
    try {
      // Crea una página HTML con los códigos QR y sus imágenes
      const htmlContent = `
<html>
<head>
  <style>
    /* Estilo para el contenedor principal */
    body {
      display: grid;
      grid-template-rows: auto 1fr repeat(4, 1fr); /* 6 filas con la primera fila auto */
      grid-template-columns: 1fr repeat(4, 1fr); /* 5 columnas */
      gap: 10px; /* Espacio entre celdas */
      margin: 0;
      height: 100vh; /* Ocupa toda la altura de la ventana */
    }

    /* Estilo para el título y la fecha */
    h2 {
      text-align: center;
      grid-row: 1; /* Se coloca en la primera fila */
      grid-column: 1 / span 5; /* Se extiende a lo ancho de las cinco columnas */
    }

    /* Estilo para el logotipo */
    .logo {
      grid-row: 1; /* Se coloca en la primera fila */
      grid-column: 5; /* Se coloca en la quinta columna */
      align-self: center;
    }

    /* Estilo para los códigos */
    .grid-item {
      border: 1px solid #000; /* Borde para separar las celdas */
      padding: 10px; /* Espacio interno dentro de las celdas */
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;
      font-size:12;
      text-align: center;
    }
  </style>
</head>
<body>
  <h2>${specialCode ? "CÓDIGO PROMOCIONAL" : "CÓDIGO DE COMPRA"} - Fecha: ${
        generarNombreArchivoUnico().dateFormat
      }</h2>
  <!-- Repite esto para cada elemento qrCode -->
  ${qrCodes
    .map((qrCodeInfo, index) => {
      const { qrCode, uri } = qrCodeInfo;
      return `
      <div class="grid-item">
        <p>ESCANEA EL CÓDIGO EN LA APP Y RECLAMA TUS MONEDAS</p>
        ${qrCode.attempts ? `<p>INTENTOS: ${qrCode.attempts}</p>` : ""}
        <img src="https://drive.google.com/uc?export=view&id=100pK5rHF8UVcp3NvGDSiLDiVvu4UGDxi" width="70" height="40" />
        ${
          !specialCode &&
          ` <p style="margin:2; font-size:10;">${qrCode.type}</p>`
        }
        <img src="file://${uri}" width="100" height="100" style="margin: 3;"/>
      </div>
    `;
    })
    .join("")}
</body>
</html>
`;

      const htmlContentSpecial = `<html>
<head>
  <style>
    /* Estilo para el contenedor principal */
    body {
      display: grid;
      grid-template-rows: auto 1fr repeat(4, 1fr); /* 6 filas con la primera fila auto */
      grid-template-columns: 1fr repeat(4, 1fr); /* 5 columnas */
      gap: 10px; /* Espacio entre celdas */
      margin: 0;
      height: 100vh; /* Ocupa toda la altura de la ventana */
    }

    /* Estilo para el título y la fecha */
    h2 {
      text-align: center;
      grid-row: 1; /* Se coloca en la primera fila */
      grid-column: 1 / span 5; /* Se extiende a lo ancho de las cinco columnas */
    }

    /* Estilo para el logotipo */
    .logo {
      grid-row: 1; /* Se coloca en la primera fila */
      grid-column: 5; /* Se coloca en la quinta columna */
      align-self: center;
    }

    /* Estilo para los códigos */
    .grid-item {
      border: 1px solid #000; /* Borde para separar las celdas */
      padding: 10px; /* Espacio interno dentro de las celdas */
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;
      font-size:12;
      text-align: center;
      width: 60vh;
    }
    
    .image {
      margin:10px 0px
    }
  </style>
</head>
<body>
  <h2>${specialCode ? "CÓDIGO PROMOCIONAL" : "CÓDIGO DE COMPRA"} - Fecha: ${
        generarNombreArchivoUnico().dateFormat
      }</h2>
  <!-- Repite esto para cada elemento qrCode -->
  ${qrCodes
    .map((qrCodeInfo, index) => {
      const { qrCode, uri } = qrCodeInfo;
      return `
      <div class="grid-item">
        <p>ESCANEA EL CÓDIGO EN LA APP Y RECLAMA TUS MONEDAS</p>
        ${qrCode.attempts ? `<p>INTENTOS: ${qrCode.attempts}</p>` : ""}
        <img src="https://drive.google.com/uc?export=view&id=100pK5rHF8UVcp3NvGDSiLDiVvu4UGDxi" width="110" height="80" />
        
        <img src="file://${uri}" width="230" height="230" class="image"/>
      </div>
    `;
    })
    .join("")}
</body>
</html>`;

      // Luego puedes usar htmlContent como desees, por ejemplo, para incrustarlo en una página HTML o enviarlo por correo electrónico.

      // Define las opciones para el PDF
      const options = {
        html: specialCode ? htmlContentSpecial : htmlContent,
        fileName: generarNombreArchivoUnico().fileName, // Nombre del archivo PDF
        directory: "Documents", // Cambia la ubicación
        height: 842, // Tamaño de página A4 (tamaño predeterminado)
        width: 595,
      };

      // const options = {
      //   html: htmlContent,
      //   fileName: generarNombreArchivoUnico(),
      //   directory: "Documents",
      //   height: 842, // Tamaño de página A4 (tamaño predeterminado)
      //   width: 595,
      // };

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
      const nombreArchivo = generarNombreArchivoUnico().fileName;
      await RNFS.moveFile(pdfPath, nombreArchivo);

      console.log("PDF movido a:", nombreArchivo);
      setValidateExport(false);
      // // Genera el PDF
      // const pdf = await RNHTMLtoPDF.convert(options);

      // console.log("PDF generado:", pdf.filePath);
      alert("Códigos QR exportados a PDF exitosamente.");
    } catch (error) {
      console.error("Error al generar el PDF:", error);
    }
  };

  // const handleExportToPDF = async () => {
  //   const pdfPath = RNFS.ExternalDirectoryPath + "/qr_codes.pdf";

  //   const pdfOptions = {
  //     path: pdfPath,
  //     type: "A4",
  //   };

  //   // Crear un documento PDF
  //   const pdf = new PDF(pdfOptions);

  //   for (const qrCodeInfo of qrCodes) {
  //     const { qrCode, uri } = qrCodeInfo;

  //     // Agregar una página al PDF
  //     pdf.addPage();

  //     // Agregar la imagen (nota: ajusta las coordenadas y el tamaño según tus necesidades)
  //     pdf.image(uri, 10, 10, { width: 100 });

  //     // Agregar información adicional si es necesario
  //     pdf.text(`ID: ${qrCode.id}`, 10, 120);
  //     pdf.text(`MONEDAS DE ORO: ${qrCode.money.gold}`, 10, 140);
  //     pdf.text(`MONEDAS DE PLATA: ${qrCode.money.silver}`, 10, 160);
  //   }

  //   // Guardar el PDF
  //   pdf.save().then(() => {
  //     alert("Códigos QR exportados a PDF exitosamente.");
  //   });
  // };

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
    return { fileName: nombreArchivo, dateFormat: nombreArchivoConGuion };
    // return Platform.OS === "ios"
    //   ? `${RNFS.TemporaryDirectoryPath}/${nombreArchivo}`
    //   : `${RNFS.ExternalDirectoryPath}/${nombreArchivo}`;
  };

  return (
    <ScrollView
      style={{
        height: "100%",
        width: "100%",
        marginTop: Constants.statusBarHeight,
      }}
      contentContainerStyle={{
        height: "100%",
        width: "100%",
      }}
    >
      <HistotialRedeemModal />
      <View style={{ width: "100%", height: "100%" }}>
        <View style={{}}>
          <Button
            contentStyle={{ width: 150 }}
            style={{ width: 150 }}
            onPress={() => {
              handleCodes(),
                console.log("Detalle de canje"),
                setIsVisible(true);
            }}
          >
            <StyledText>Historial de canje</StyledText>
          </Button>
        </View>
        <View style={[styles.container]}>
          <View
            style={{
              backgroundColor: theme.colors.blackSegunda,
              marginBottom: 15,
              borderRadius: 25,
            }}
          >
            <View
              style={{
                borderWidth: 0.2,
                borderColor: "white",
                borderRadius: 50,
                flexDirection: "row",
                justifyContent: "space-evenly",
                alignItems: "center",
                padding: 5,
                width: "90%",
              }}
            >
              <TouchableOpacity
                onPress={() => setSpecialCode(false)}
                style={{
                  backgroundColor: specialCode
                    ? theme.colors.blackSegunda
                    : theme.colors.orangeSegunda,
                  padding: 10,
                  //paddingHorizontal: 20,
                  justifyContent: "center",
                  alignItems: "center",
                  margin: 5,
                  flex: 1,
                  borderRadius: 25,
                }}
              >
                <StyledText
                  style={{ color: "white", fontFamily: theme.fonts.textBold }}
                >
                  Código personal
                </StyledText>
              </TouchableOpacity>
              <TouchableOpacity
                onPress={() => setSpecialCode(true)}
                style={{
                  backgroundColor: specialCode
                    ? theme.colors.orangeSegunda
                    : theme.colors.blackSegunda,
                  padding: 10,
                  flex: 1,
                  margin: 5,
                  borderRadius: 25,
                  justifyContent: "center",
                  alignItems: "center",
                }}
              >
                <StyledText
                  style={{ color: "white", fontFamily: theme.fonts.textBold }}
                >
                  Código promocional
                </StyledText>
              </TouchableOpacity>
            </View>
          </View>
          <View style={{ flexDirection: "row", width: "90%" }}>
            <TextInput
              style={{ width: "30%", marginVertical: 10, marginRight: 10 }}
              onChangeText={(txt) => setGold(txt)}
              value={gold}
              label={"Monedas de oro"}
              keyboardType="numeric"
              mode="outlined"
            />
            <TextInput
              style={{ width: "30%", marginVertical: 10, marginRight: 10 }}
              onChangeText={(txt) => setSilver(txt)}
              value={silver}
              label={"Monedas de plata"}
              keyboardType="numeric"
              mode="outlined"
            />
            <TextInput
              style={{ width: "30%", marginVertical: 10 }}
              onChangeText={(txt) => setCodesNumber(txt)}
              value={codesNumber}
              label={"Códigos"}
              keyboardType="numeric"
              mode="outlined"
            />
          </View>
          {!specialCode && (
            <View
              style={{
                //flex: 0.3,
                width: "90%",
                height: 40,
                //marginVertical: 5,
                flexDirection: "row",
                justifyContent: "space-between",
                alignItems: "center",
              }}
            >
              <View style={{ flex: 1 }}>
                <StyledText>Valor de la factura: </StyledText>
              </View>
              <View
                style={{
                  flex: 0.8,
                  //backgroundColor: "red",
                  alignItems: "center",
                }}
              >
                <SelectDropdown
                  data={filters}
                  onSelect={(selectedItem, index) => {
                    console.log(selectedItem, index);
                    setFilterSelected(selectedItem);
                  }}
                  //defaultButtonText={"Todos"}
                  defaultValueByIndex={0}
                  buttonTextAfterSelection={(selectedItem, index) => {
                    // text represented after item is selected
                    // if data array is an array of objects then return selectedItem.property to render after item is selected
                    return selectedItem;
                  }}
                  rowTextForSelection={(item, index) => {
                    // text represented for each item in dropdown
                    // if data array is an array of objects then return item.property to represent item in dropdown
                    return item;
                  }}
                  buttonStyle={styles.dropdown1BtnStyle}
                  buttonTextStyle={styles.dropdown1BtnTxtStyle}
                  renderDropdownIcon={(isOpened) => {
                    return (
                      <Icon
                        name={isOpened ? "chevron-up" : "chevron-down"}
                        type="font-awesome"
                        color={"#444"}
                        size={18}
                      />
                    );
                  }}
                  dropdownIconPosition={"right"}
                  dropdownStyle={styles.dropdown1DropdownStyle}
                  rowStyle={styles.dropdown1RowStyle}
                  rowTextStyle={styles.dropdown1RowTxtStyle}
                />
              </View>
            </View>
          )}
          {specialCode && (
            <TextInput
              style={{ width: "90%", marginBottom: 15 }}
              onChangeText={(txt) => setAttempts(parseInt(txt))}
              value={attempts ? attempts.toString() : null}
              keyboardType="numeric"
              label={"Intentos de reclamo"}
              mode="outlined"
            />
          )}

          <View style={{ flex: 1, marginVertical: 10 }}>
            {qrCode && (
              <ScrollView style={{ flex: 2 }}>
                <View style={{ marginVertical: 20 }}>
                  <View
                    style={{
                      width: "100%",
                      alignItems: "center",
                      marginBottom: 10,
                    }}
                  >
                    <StyledText
                      style={{
                        color: "black",
                        fontFamily: theme.fonts.textBold,
                      }}
                    >
                      DATOS DEL QR
                    </StyledText>
                  </View>
                  <StyledText
                    style={{ color: "black", fontFamily: theme.fonts.textBold }}
                  >
                    ID: {qrCode?.id}
                  </StyledText>
                  <StyledText
                    style={{ color: "black", fontFamily: theme.fonts.textBold }}
                  >
                    MONEDAS DE ORO: {qrCode?.money?.gold}
                  </StyledText>
                  <StyledText
                    style={{ color: "black", fontFamily: theme.fonts.textBold }}
                  >
                    MONEDAS DE PLATA: {qrCode?.money?.silver}
                  </StyledText>
                  {qrCode?.attempts && (
                    <StyledText
                      style={{
                        color: "black",
                        fontFamily: theme.fonts.textBold,
                      }}
                    >
                      INTENTOS: {qrCode?.attempts}
                    </StyledText>
                  )}
                </View>
                <ViewShot
                  ref={viewShotRef}
                  options={{ format: "png", quality: 1.0 }}
                >
                  <QRCode
                    ref={qrCodeRef}
                    value={JSON.stringify(qrCode)}
                    size={300}
                    color="black"
                    backgroundColor="white"
                  />
                </ViewShot>
              </ScrollView>
            )}
          </View>
          {validateExport && (
            <StyledText
              style={{
                color: "black",
                fontFamily: theme.fonts.textBold,
                marginVertical: 10,
              }}
            >
              QRS generados: {qrCodes.length}
            </StyledText>
          )}

          <Button
            onPress={handleDownloadQRCode}
            loading={generateCode}
            style={{
              backgroundColor: theme.colors.orangeSegunda,
              borderRadius: 5,
              //flex: 1,
              width: "90%",
            }}
          >
            <StyledText
              style={{ fontFamily: theme.fonts.textBold, color: "white" }}
            >
              {generateCode ? "Generando" : "Crear QR"}
            </StyledText>
          </Button>
          {/* <Image
        source={{
          uri: "file:///storage/emulated/0/Pictures/QgHrgViP7G59h4Fc3WJk_0.png",
        }}
        style={{ width: 100, height: 100, marginVertical: 20 }}
      /> */}
          {/* {qrCodes.map((qrCodeInfo, index) => (
        <View key={index}>
          <Image
            source={{ uri: "file://" + qrCodeInfo.uri }}
            style={{ width: 100, height: 100 }}
          />
          <Text>ID: {qrCodeInfo.qrCode.id}</Text>
          <Text>MONEDAS DE ORO: {qrCodeInfo.qrCode.money.gold}</Text>
          <Text>MONEDAS DE PLATA: {qrCodeInfo.qrCode.money.silver}</Text>
        </View>
      ))} */}

          {validateExport && (
            <Button
              style={{
                backgroundColor: theme.colors.greySegunda,
                marginVertical: 10,
                width: "90%",
                borderRadius: 5,
              }}
              onPress={generateAndExportPDF}
            >
              <StyledText
                style={{ fontFamily: theme.fonts.textBold }}
                color={"black"}
              >
                Exportar a PDF
              </StyledText>
            </Button>
          )}
        </View>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    //justifyContent: "center",
    height: "100%",
    backgroundColor: theme.colors.whiteSegunda,
    paddingVertical: 30,
    alignItems: "center",
  },
  dropdownsRow: {
    flexDirection: "row",
    width: "100%",
    paddingHorizontal: "5%",
  },

  dropdown1BtnStyle: {
    flex: 1,
    width: 125,
    height: 30,
    backgroundColor: "#FFF",
    borderRadius: 8,
    borderWidth: 1,
    borderColor: "#444",
  },
  dropdown1BtnTxtStyle: {
    color: "#444",
    textAlign: "left",
    fontSize: 15,
    fontFamily: theme.fonts.textBold,
  },
  dropdown1DropdownStyle: { backgroundColor: "#EFEFEF" },
  dropdown1RowStyle: {
    backgroundColor: "#EFEFEF",
    borderBottomColor: "#C5C5C5",
  },
  dropdown1RowTxtStyle: {
    color: "#444",
    textAlign: "left",
    fontSize: 15,
    fontFamily: theme.fonts.textBold,
  },
  divider: { width: 12 },
  dropdown2BtnStyle: {
    flex: 1,
    height: 40,
    backgroundColor: "#FFF",
    borderRadius: 8,
    borderWidth: 1,
    borderColor: "#444",
  },
  dropdown2BtnTxtStyle: {
    color: "#444",
    textAlign: "left",
    fontSize: 15,
    fontFamily: theme.fonts.textBold,
  },
  dropdown2DropdownStyle: { backgroundColor: "#EFEFEF" },
  dropdown2RowStyle: {
    backgroundColor: "#EFEFEF",
    borderBottomColor: "#C5C5C5",
  },
  dropdown2RowTxtStyle: { color: "#444", textAlign: "left" },
});
