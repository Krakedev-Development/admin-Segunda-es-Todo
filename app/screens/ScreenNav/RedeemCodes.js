import {
  StyleSheet,
  Text,
  View,
  Platform,
  PermissionsAndroid,
} from "react-native";
import React, { useState, useRef } from "react";
import QRCode from "react-native-qrcode-svg";
import ViewShot from "react-native-view-shot";
import RNFS from "react-native-fs";
import { Button, TextInput } from "react-native-paper";
import {
  createDinamicDocumentWithinId,
  updateDinamicDocument,
} from "../../Services/firebase";
import theme from "../../theme/theme";
import StyledText from "../../theme/StyledText";
import { TouchableOpacity } from "react-native";
import Constants from "expo-constants";

export const RedeemCodes = () => {
  const [gold, setGold] = useState("5");
  const [silver, setSilver] = useState("5");
  const [attempts, setAttempts] = useState("5");
  const [qrCode, setQrCode] = useState(null);
  const [specialCode, setSpecialCode] = useState(false);
  const [generateCode, setGenerateCode] = useState(false);
  const qrCodeRef = useRef(null);
  const viewShotRef = useRef(null);

  const handleDownloadQRCode = async () => {
    setGenerateCode(true);
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
    try {
      if (Platform.OS === "android") {
        const granted = await PermissionsAndroid.request(
          PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE
        );
        if (granted !== PermissionsAndroid.RESULTS.GRANTED) {
          alert("Permisos denegados");
        }
      }
      await viewShotRef.current.capture().then(async (uri) => {
        const path =
          RNFS.PicturesDirectoryPath + "/" + firebaseCode.id + ".png";
        await RNFS.moveFile(uri, path);
        await RNFS.scanFile(path);
        alert("El QR ha sido guardado exitosamente.");
      });
      setGenerateCode(false);
    } catch (error) {
      setGenerateCode(false);
      console.log("ERROR: ", error);
    }
  };

  return (
    <View style={[styles.container, { marginTop: Constants.statusBarHeight }]}>
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
      <View style={{ flexDirection: "row", width: "90%" }}>
        <TextInput
          style={{ width: "48%", marginVertical: 10, marginRight: 10 }}
          onChangeText={(txt) => setGold(txt)}
          value={gold}
          label={"Monedas de oro"}
          keyboardType="numeric"
          mode="outlined"
        />
        <TextInput
          style={{ width: "50%", marginVertical: 10 }}
          onChangeText={(txt) => setSilver(txt)}
          value={silver}
          label={"Monedas de plata"}
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
      {qrCode && (
        <View style={{ marginTop: 30 }}>
          <View style={{ marginVertical: 20 }}>
            <View
              style={{ width: "100%", alignItems: "center", marginBottom: 10 }}
            >
              <StyledText
                style={{ color: "white", fontFamily: theme.fonts.textBold }}
              >
                DATOS DEL QR
              </StyledText>
            </View>
            <StyledText
              style={{ color: "white", fontFamily: theme.fonts.textBold }}
            >
              ID: {qrCode?.id}
            </StyledText>
            <StyledText
              style={{ color: "white", fontFamily: theme.fonts.textBold }}
            >
              MONEDAS DE ORO: {qrCode?.money?.gold}
            </StyledText>
            <StyledText
              style={{ color: "white", fontFamily: theme.fonts.textBold }}
            >
              MONEDAS DE PLATA: {qrCode?.money?.silver}
            </StyledText>
            {qrCode?.attempts && (
              <StyledText
                style={{ color: "white", fontFamily: theme.fonts.textBold }}
              >
                INTENTOS: {qrCode?.attempts}
              </StyledText>
            )}
          </View>
          <ViewShot ref={viewShotRef} options={{ format: "png", quality: 1.0 }}>
            <QRCode
              ref={qrCodeRef}
              value={JSON.stringify(qrCode)}
              size={300}
              color="black"
              backgroundColor="white"
            />
          </ViewShot>
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    //justifyContent: "center",
    backgroundColor: theme.colors.blackSegunda,
    paddingVertical: 30,
    alignItems: "center",
  },
});
