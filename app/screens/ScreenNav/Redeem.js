import { useEffect, useRef, useState } from "react";
import theme from "../../theme/theme";
import {
  StyleSheet,
  Text,
  View,
  Image,
  Modal,
  TouchableOpacity,
} from "react-native";
import { ScrollView } from "react-native-gesture-handler";
import { TextGeneral } from "../../Components/GeneralComponents/TextGeneral";
import { ItemComent } from "../../Components/GeneralComponents/ItemComent";
import Icon from "react-native-vector-icons/FontAwesome5";
import Icon2 from "react-native-vector-icons/AntDesign";
import logos from "../../theme/logos";
import {
  fetchRedeemDB,
  fetchRedeemRealtimeDatabase,
  updateRedeemDB,
} from "../../Services/CanjesSrv";
import { LoadGeneral } from "../../Components/GeneralComponents/LoadGeneral";
import { ButtonGeneral } from "../../Components/GeneralComponents/ButtonGeneral";
import * as Notifications from "expo-notifications";

export const Reedem = () => {
  const [modalVisible, setModalVisible] = useState(false);
  const [orderClient, setOrderClient] = useState([]);
  const [redeemData, setRedeemData] = useState([]);
  const [load, setLoad] = useState(false);

  const firebaseConfig = {
    apiKey: "AIzaSyD3tzUWpDwEMzeBnH0Zc1Z4_NFV_noTyjc",
    authDomain: "segundaestodoapp.firebaseapp.com",
    projectId: "segundaestodoapp",
    storageBucket: "segundaestodoapp.appspot.com",
    messagingSenderId: "917966498579",
    appId: "1:917966498579:web:e7c247c1f79709056048e6",
    measurementId: "G-NMH9NR2JMD",
  };

  useEffect(() => {
    loadData(); // Notifications.requestPermissionsAsync();
    // const registerForPushNotifications = async () => {
    //   try {
    //     console.log("Inicie mi registro");
    //     const { status: existingStatus } =
    //       await Notifications.getPermissionsAsync();
    //     let finalStatus = existingStatus;
    //     console.log("Mi finalStatus", finalStatus);

    //     if (existingStatus !== "granted") {
    //       const { status } = await Notifications.requestPermissionsAsync();
    //       finalStatus = status;
    //     }

    //     // if (finalStatus !== "granted") {
    //     //   return;
    //     // }

    //     const token = await Notifications.getExpoPushTokenAsync();
    //     console.log("mi token:::::::::", token);
    //     // Envía el token a tu backend para futuras notificaciones
    //   } catch (error) {
    //     console.log(error);
    //   }
    // };

    // registerForPushNotifications();
  }, []);

  const sendNotification = async () => {
    const token = await Notifications.getExpoPushTokenAsync();
    console.log("mi token:::::::::", token);
    console.log("aplaste mi notificar");
    await Notifications.scheduleNotificationAsync({
      content: {
        title: "Nueva notificación",
        body: "¡Esta es una notificación de prueba!",
      },
      trigger: null, // Puedes configurar el disparador si deseas una notificación programada
    });
  };

  const cargarRDB = async () => {
    console.log(
      "ejecute el boton______________________________________________________"
    );
    // await fetchRedeemRealtimeDatabase();
    await fetchRedeemRealtimeDatabase();
    // console.log("Mi alt realtime database: ", alt);
  };

  // const cargarDatosRealTime = () => {
  //   const firebase = require("firebase/app");
  //   require("firebase/database");

  //   const firebaseConfig = {
  //     apiKey: "AIzaSyD3tzUWpDwEMzeBnH0Zc1Z4_NFV_noTyjc",
  //     authDomain: "segundaestodoapp.firebaseapp.com",
  //     projectId: "segundaestodoapp",
  //     storageBucket: "segundaestodoapp.appspot.com",
  //     messagingSenderId: "917966498579",
  //     appId: "1:917966498579:web:e7c247c1f79709056048e6",
  //     measurementId: "G-NMH9NR2JMD",
  //   };

  //   firebase.initializeApp(firebaseConfig);
  //   const database = firebase.database();
  //   const ref = database.ref(
  //     "https://segundaestodoapp-default-rtdb.firebaseio.com/__collections__/orders"
  //   );
  //   ref
  //     .once("value")
  //     .then((snapshot) => {
  //       const data = snapshot.val();
  //       console.log(data);
  //     })
  //     .catch((error) => {
  //       console.error("Error al leer datos:", error);
  //     });
  // };

  const loadData = async () => {
    setLoad(true);
    try {
      const data = await fetchRedeemDB();
      const sortedData = data.sort((a, b) => b.date - a.date);
      const filter = sortedData.filter((order) => order?.pending);
      console.log("mi datos de canjes son-------------------------->", filter);
      setRedeemData(filter);
    } catch (error) {}
    setLoad(false);
  };

  const updateRedeemStatus = async (id) => {
    try {
      await updateRedeemDB(id);
    } catch (error) {}

    setModalVisible(false);
    loadData();
  };

  return (
    <View style={styles.container}>
      <View
        style={{
          backgroundColor: "black",
          flex: 1,
          alignItems: "center",
          justifyContent: "space-between",
          flexDirection: "row",
        }}
      >
        <TextGeneral
          text={"Canjes"}
          color={"white"}
          center
          size={30}
          style={[styles.title]}
        />
        <Image source={logos.blanco} style={{ width: 100, height: 80 }} />
        {/* <ButtonGeneral title={"Notify"} onPress={sendNotification} /> */}
      </View>
      <View style={{ backgroundColor: "black", flex: 4 }}>
        {/* //________________________________________________________________________________________________________________________ */}
        <Modal animationType="slide" transparent={true} visible={modalVisible}>
          <View style={styles.centeredView}>
            <View style={styles.modalView}>
              <View
                style={{
                  flex: 1,
                  //   backgroundColor: "green",
                  justifyContent: "center",
                }}
              >
                <View style={styles.modalText}>
                  <Text style={{ color: "white" }}>
                    {orderClient?.client?.name
                      ? orderClient?.client?.name
                      : "a"}
                  </Text>
                  <Text style={{ color: "white" }}>
                    {orderClient?.totalAmount ? orderClient?.totalAmount : "2 "}{" "}
                    monedas
                  </Text>
                </View>
                <View
                  style={{
                    backgroundColor: "#404040",
                    borderRadius: 3,
                    padding: 6,
                    flex: 3,
                    marginBottom: 10,
                  }}
                >
                  <ScrollView
                    contentContainerStyle={styles.scrollViewContentModal}
                  >
                    {orderClient.products?.map((prod, index) => (
                      <View
                        key={index}
                        style={{
                          backgroundColor: theme.colors.blackSegunda,
                          height: 80,
                          flexDirection: "row",
                          alignItems: "center",
                          padding: 8,
                          borderRadius: 5,
                          justifyContent: "space-between",
                          marginBottom: 3,
                        }}
                      >
                        <Image
                          source={{ uri: prod?.imgUrl ? prod?.imgUrl : "" }}
                          style={{ width: 80, height: "100%", borderRadius: 5 }}
                        />
                        <View style={{ flex: 4, paddingHorizontal: 10 }}>
                          <Text
                            style={{
                              color: "white",
                              textAlign: "center",
                              fontSize: 15,
                            }}
                          >
                            {prod?.name ? prod?.name : "Ceviche"}
                          </Text>
                        </View>

                        <Text
                          style={{
                            flex: 1,
                            //   backgroundColor: "cyan",
                            color: "white",
                            textAlign: "center",
                            fontSize: 17,
                          }}
                        >
                          x{prod.quantity}
                        </Text>
                      </View>
                    ))}
                  </ScrollView>
                </View>
                {/* <View
                  style={{
                    backgroundColor: "#404040",
                    borderRadius: 3,
                    padding: 6,
                    flex: 1,
                    marginBottom: 20,
                  }}
                >
                  <Text style={{ color: "white" }}>
                    Total:{orderClient.totalAmount}
                  </Text>
                  <Text style={{ color: "white" }}>Costo:</Text>
                </View> */}
              </View>
              <View
                style={{
                  flexDirection: "row",
                  //   backgroundColor: "green",
                  justifyContent: "space-around",
                }}
              >
                {orderClient.status ? (
                  <></>
                ) : (
                  <TouchableOpacity
                    style={styles.buttonClose}
                    onPress={() => {
                      // updateRedeemDB(orderClient.id);
                      // setModalVisible(false);
                      updateRedeemStatus(orderClient.id);
                    }}
                  >
                    <Text style={styles.closeButtonText}>Procesar Canje</Text>
                  </TouchableOpacity>
                )}

                <TouchableOpacity
                  style={styles.buttonClose}
                  onPress={() => {
                    setModalVisible(false);
                  }}
                >
                  <Text style={styles.closeButtonText}>Cerrar</Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>
        </Modal>
        {/* //________________________________________________________________________________________________________________________ */}
        <View
          style={{
            backgroundColor: theme.colors.blackSegunda,
            flex: 1,
            marginBottom: 40,
            borderRadius: 8,
            // alignItems: "center",
          }}
        >
          <TextGeneral
            text={"Lista de canjes:"}
            color={"white"}
            center
            style={[styles.subtitle]}
          />

          <ScrollView contentContainerStyle={styles.scrollViewContent}>
            {/* <Text style={styles.text}>Contenido del ScrollView</Text> */}
            {redeemData?.map((item, index) => (
              <ItemComent
                key={index}
                textSize={17}
                onPress={() => {
                  setOrderClient(item);
                  setModalVisible(true);

                  // console.log("item---------------->", item.products);
                }}
                background={
                  // item.status ? theme.colors.redSegunda : theme.colors.grey
                  "black"
                }
                width={"90%"}
                border={2}
                data={item?.client}
                icon={
                  <Icon
                    name={item?.isGroup ? "users" : "user-alt"}
                    size={20}
                    type={"entypo"}
                    color={
                      item?.isGroup ? theme.colors.orangeSegunda : "orange"
                    }
                  />
                }
                icon2={
                  <Icon2
                    name={item.status ? "checkcircle" : "checkcircleo"}
                    size={20}
                    type={"entypo"}
                    color={item.status ? "#82EF7B" : "white"}
                  />
                }
              />
            ))}
          </ScrollView>
          {/* <ButtonGeneral title={"boton"} onPress                               
          
          ={cargarRDB} /> */}
        </View>
      </View>
      {load && <LoadGeneral load={load} />}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: theme.separation.horizontalSeparation,
    backgroundColor: "black",
    flexDirection: "column",
    justifyContent: "flex-start",
  },
  scrollViewContainer: {
    height: 200,
    backgroundColor: "white",
    borderRadius: 10,
    overflow: "hidden",
  },
  scrollViewContent: {
    justifyContent: "center",
    alignItems: "center",
    minWidth: "100%",
  },
  text: {
    fontSize: 20,
    fontWeight: "bold",
    color: "white",
    marginVertical: 10,
  },
  subtitle: {
    width: "100%",
    paddingHorizontal: "5%",
    marginVertical: 8,
    // marginLeft: 17,

    // paddingBottom: 55,
    // backgroundColor: "green",
  },

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
    height: "80%",
    width: "90%",
  },

  modalText: {
    backgroundColor: theme.colors.blackSegunda,
    borderRadius: 5,
    marginBottom: 15,
    textAlign: "justify",
    color: "white",
    flexDirection: "row",
    justifyContent: "space-between",
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
    width: 150,
  },
  scrollViewContentModal: {
    justifyContent: "center",
    // alignItems: "center",
    textAlign: "justify",
    minWidth: "100%",
  },
});
