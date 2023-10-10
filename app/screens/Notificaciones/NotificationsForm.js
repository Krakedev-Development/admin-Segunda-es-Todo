import {
  Alert,
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import React, { useEffect, useState } from "react";
import Constants from "expo-constants";
import StyledText from "../../theme/StyledText";
import { TextInput } from "react-native-paper";
import theme from "../../theme/theme";
import ImagenImport from "../../theme/Images";
import * as ImagePicker from "expo-image-picker";
import { Icon } from "@rneui/base";
import axios from "axios";
import {
  fetchDinamicData,
  updateDinamicDocument,
} from "../../Services/firebase";
import { LoadGeneral } from "../../Components/GeneralComponents/LoadGeneral";
import { uploadDinamicImage } from "../../Services/ImagesSrv";

export const NotificationsForm = () => {
  const [imageDB, setImageDB] = useState(null);
  const [usersWithToken, setUsersWithToken] = useState([]);
  const [load, setLoad] = useState(false);
  const [refresh, setRefresh] = useState(false);
  const [users, setUsers] = useState([]);
  const [notificationsForm, setNotificationsForm] = useState({
    title: null,
    description: null,
  });
  useEffect(() => {
    console.log("IMAGEN: ", imageDB);
  }, [imageDB]);

  useEffect(() => {
    loadUsers();
  }, [refresh]);

  const loadUsers = async () => {
    setLoad(true);
    try {
      let data = await fetchDinamicData("users");
      let allUsers = data;
      data = data.filter((user) => user.expoToken);
      console.log(
        "los datos de USUARIOS CON NOTI SON son::::::::::::::::::",
        data
      );
      let myUser = data.filter(
        (user) => user.userId === "ulm0Yep30MVGu4e3Oe2Tvsth7Yw1"
      );
      console.log("DATOS DE MI SUARIO: ", myUser);
      setUsers(allUsers);
      setUsersWithToken(data);
    } catch (error) {}
    setLoad(false);
  };

  const pickImage = async () => {
    // No permissions request is necessary for launching the image library
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: false,
      aspect: [4, 3],
      quality: 1,
    });

    console.log(result.assets[0].uri);

    if (!result.canceled) {
      setImageDB(result.assets[0].uri);
    }
    //setErrorImage("");
  };

  const sendMasiveNotificationsWithToken = () => {
    setLoad(true);
    if (usersWithToken.length > 0) {
      usersWithToken.forEach((user) => {
        sendExpoNotification(
          user?.expoToken,
          notificationsForm.title,
          notificationsForm.description,
          "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ4IzvgbIXK0JTRjns_eszXg1H11xs1bWdVCLyZHpWsj27J2U0fXQB0lIikGfG7mt3YNRI&usqp=CAU"
        );
      });
    }
    setLoad(false);
    Alert.alert("Notificaciones enviadas", " Ya está la huevada");
  };

  async function sendExpoNotification(token, title, body, imageUrl) {
    try {
      const expoPushEndpoint = "https://exp.host/--/api/v2/push/send";
      const message = {
        to: token,
        title,
        body,
        data: {
          imageUrl, // Puedes incluir la URL de la imagen aquí
        },
        sound: "default",
      };

      const response = await axios.post(expoPushEndpoint, message);
      console.log("Notificación enviada con éxito:", response.data);
    } catch (error) {
      console.error("Error al enviar la notificación:", error.message);
    }
  }

  return (
    <View style={[styles.container, { marginTop: Constants.statusBarHeight }]}>
      <View style={{ flex: 1, paddingVertical: 5 }}>
        <View style={{ flex: 6 }}>
          <StyledText subtitle color={"white"} style={{ marginVertical: 10 }}>
            Notificaciones
          </StyledText>
          <TextInput
            label={"Título"}
            value={notificationsForm.title}
            onChangeText={(txt) => {
              setNotificationsForm({ ...notificationsForm, title: txt });
            }}
            style={{ margin: 5, marginVertical: 10 }}
          />
          <TextInput
            label={"Descripción"}
            value={notificationsForm.description}
            onChangeText={(txt) => {
              setNotificationsForm({ ...notificationsForm, description: txt });
            }}
            style={{ margin: 5, marginVertical: 10 }}
            multiline
          />
          <View>
            <Image
              source={
                imageDB
                  ? { uri: imageDB }
                  : {
                      uri: "https://img.freepik.com/free-vector/modern-quiz-background-with-colorful-shapes_23-2147598078.jpg",
                    }
              }
              style={{
                width: theme.ViewSize.width + 25,
                height: 250,
                resizeMode: "cover",
                margin: 5,
                marginVertical: 10,
                opacity: 0.7,
              }}
            />
            <TouchableOpacity
              onPress={pickImage}
              style={{ position: "absolute", top: "40%", left: "45%" }}
            >
              <Icon
                name="insert-photo"
                type="MaterialIcons"
                size={50}
                color={"white"}
              />
            </TouchableOpacity>
          </View>
        </View>

        <View style={{ flex: 1 }}>
          <TouchableOpacity
            onPress={
              //     () => {
              //   let allDataNotification = {
              //     ...notificationsForm,
              //     image: imageDB,
              //   };
              //   console.log("DATOS DE LA NOTI: ", allDataNotification);
              //   sendExpoNotification(
              //     "ExponentPushToken[8HoxHfKxWcZvdpo7WbotNz]",
              //     notificationsForm.title,
              //     notificationsForm.description,
              //     { customData: {} }
              //   );
              // }
              sendMasiveNotificationsWithToken
            }
            style={{
              flex: 1,
              padding: 10,
              margin: 5,
              justifyContent: "center",
              alignItems: "center",
              backgroundColor: theme.colors.orangeSegunda,
            }}
          >
            <StyledText color={"white"}>Enviar push</StyledText>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={async () => {
              setLoad(true);
              let imageUrl = null;
              if (imageDB) {
                try {
                  imageUrl = await uploadDinamicImage(imageDB, "new-noti");
                } catch (error) {
                  console.error("Error al cargar la imagen:", error);
                }
              }
              for (const user of users) {
                console.log("NOTIS DEL USUARIO: ", user?.notifications);
                if (user?.notifications || user?.notifications?.length > 0) {
                  let updateNotifications = [
                    ...user?.notifications,
                    {
                      title: notificationsForm.title,
                      description: notificationsForm.description,
                      isNew: true,
                      date: new Date(),
                      image: imageUrl
                        ? imageUrl
                        : "https://www.google.com/url?sa=i&url=https%3A%2F%2Fwww.facebook.com%2Fsegundaestodo.uio%2F&psig=AOvVaw3FArqnlOB59sZkSODDCzpL&ust=1696361278005000&source=images&cd=vfe&opi=89978449&ved=0CBEQjRxqFwoTCPiN3K6M2IEDFQAAAAAdAAAAABAD",
                    },
                  ];

                  console.log("ASI SE VA A LA BASE: ", updateNotifications);
                  updateNotifications.sort((a, b) => b.date - a.date);

                  console.log(
                    " - -  - - - - - - - - - -  - - - - - - - - - - - - "
                  );
                  console.log("ASÍ ESTAN ORDENADAS: ", updateNotifications);
                  console.log(
                    " - -  - - - - - - - - - -  - - - - - - - - - - - - "
                  );

                  updateDinamicDocument(user?.userId, "users", {
                    notifications: updateNotifications,
                  });
                } else {
                  let updateNotifications = [
                    {
                      title: notificationsForm.title,
                      description: notificationsForm.description,
                      isNew: true,
                      date: new Date(),
                      image: imageUrl
                        ? imageUrl
                        : "https://www.google.com/url?sa=i&url=https%3A%2F%2Fwww.facebook.com%2Fsegundaestodo.uio%2F&psig=AOvVaw3FArqnlOB59sZkSODDCzpL&ust=1696361278005000&source=images&cd=vfe&opi=89978449&ved=0CBEQjRxqFwoTCPiN3K6M2IEDFQAAAAAdAAAAABAD",
                    },
                  ];

                  console.log("ASI SE VA A LA BASE: ", updateNotifications);

                  console.log(
                    " - -  - - - - - - - - - -  - - - - - - - - - - - - "
                  );
                  console.log("ASÍ ESTAN ORDENADAS: ", updateNotifications);
                  console.log(
                    " - -  - - - - - - - - - -  - - - - - - - - - - - - "
                  );

                  updateDinamicDocument(user?.userId, "users", {
                    notifications: updateNotifications,
                  });
                }
              }

              setLoad(false);
              setRefresh(!refresh);
              Alert.alert("Noti enviada", "Según yo creo que está bien");
            }}
            style={{
              flex: 1,
              padding: 10,
              margin: 5,
              justifyContent: "center",
              alignItems: "center",
              backgroundColor: theme.colors.orangeSegunda,
            }}
          >
            <StyledText color={"white"}>
              Enviar por documento (persistencia)
            </StyledText>
          </TouchableOpacity>
        </View>
      </View>
      {load && <LoadGeneral load={load} />}
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, padding: 5, backgroundColor: "black" },
});
