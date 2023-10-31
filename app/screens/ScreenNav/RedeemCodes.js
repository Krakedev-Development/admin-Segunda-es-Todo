import {
  StyleSheet,
  Text,
  View,
  Platform,
  PermissionsAndroid,
  Image,
  ScrollView,
} from "react-native";
import React, { useState, useRef, useEffect } from "react";
import QRCode from "react-native-qrcode-svg";
import ViewShot from "react-native-view-shot";
import RNFS from "react-native-fs";
import { Button, TextInput } from "react-native-paper";
import Share from "react-native-share";
import {
  createDinamicDocumentWithinId,
  updateDinamicDocument,
} from "../../Services/firebase";
import theme from "../../theme/theme";
import StyledText from "../../theme/StyledText";
import { TouchableOpacity } from "react-native";
import Constants from "expo-constants";
import PDF from "react-native-pdf";
import RNHTMLtoPDF from "react-native-html-to-pdf";

export const RedeemCodes = () => {
  const [gold, setGold] = useState("5");
  const [silver, setSilver] = useState("5");
  const [attempts, setAttempts] = useState("5");
  const [codesNumber, setCodesNumber] = useState("5");
  const [qrCodes, setQRCodes] = useState([]);
  const [qrCode, setQrCode] = useState(null);
  const [specialCode, setSpecialCode] = useState(false);
  const [validateExport, setValidateExport] = useState(false);
  const [generateCode, setGenerateCode] = useState(false);
  const qrCodeRef = useRef(null);
  const viewShotRef = useRef(null);

  useEffect(() => {
    console.log("ESTO TIENE QRCODES:", qrCodes);
  }, [qrCodes]);

  const handleDownloadQRCode = async () => {
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
      };
      if (specialCode && attempts) {
        codeQR.attempts = attempts;
        codeQR.idClaimed = [];
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
  };

  const generateAndExportPDF = async () => {
    try {
      // Crea una página HTML con los códigos QR y sus imágenes
      const htmlContent = `
      <html>
      <body>
        <h1>${specialCode ? "CÓDIGOS PROMOCIONALES" : "CODIGOS DE COMPRA"} ${
        generarNombreArchivoUnico().dateFormat
      }</h1>
        <div style="display: flex; flex-direction: row; flex-wrap: wrap; justify-content: space-between;">
          ${qrCodes
            .map((qrCodeInfo, index) => {
              const { qrCode, uri } = qrCodeInfo;
              return `
                <div style="width: 48%; margin: 1%; box-sizing: border-box;">
                  <p>ID: ${qrCode.id}</p>
                  <p>MONEDAS DE ORO: ${qrCode.money.gold}</p>
                  <p>MONEDAS DE PLATA: ${qrCode.money.silver}</p>
                  <img src="file://${uri}" width="300" height="300" />
                  ${
                    qrCode.attempts ? `<p>INTENTOS: ${qrCode.attempts}</p>` : ""
                  }
                </div>
              `;
            })
            .join("")}
        </div>
      </body>
      </html>
    `;

      // Define las opciones para el PDF
      const options = {
        html: htmlContent,
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
    <ScrollView contentContainerStyle={{ height: "100%" }}>
      <View
        style={[styles.container, { marginTop: Constants.statusBarHeight }]}
      >
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
                    style={{ color: "black", fontFamily: theme.fonts.textBold }}
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
                    style={{ color: "black", fontFamily: theme.fonts.textBold }}
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
        <StyledText
          style={{
            color: "black",
            fontFamily: theme.fonts.textBold,
            marginVertical: 10,
          }}
        >
          QRS generados: {qrCodes.length}
        </StyledText>
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
});
