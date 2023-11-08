import { useEffect, useRef, useState } from "react";
import theme from "../../theme/theme";
import {
  StyleSheet,
  Text,
  View,
  Image,
  TouchableOpacity,
  Linking,
  ActivityIndicator,
  Alert,
} from "react-native";
import { ScrollView } from "react-native-gesture-handler";
import { TextGeneral } from "../../Components/GeneralComponents/TextGeneral";
import { ItemComent } from "../../Components/GeneralComponents/ItemComent";
//import Icon from "react-native-vector-icons/FontAwesome5";
import Icon2 from "react-native-vector-icons/AntDesign";
import logos from "../../theme/logos";
import {
  fetchRedeemDB,
  fetchRedeemRealtimeDatabase,
  updateRedeemDB,
} from "../../Services/CanjesSrv";
import { LoadGeneral } from "../../Components/GeneralComponents/LoadGeneral";
import StyledText from "../../theme/StyledText";
import ImagenImport, { QR_READER } from "../../theme/Images";
import { BarCodeScanner } from "expo-barcode-scanner";
import Modal from "react-native-modal";
import { Icon } from "@rneui/base";
import { getDinamicDoc, updateDinamicDocument } from "../../Services/firebase";
import { MoneysView } from "../../Components/MoneysView";
import { FlatList } from "react-native";
import { useContext } from "react";
import { OrdersContext } from "../../context/orders/OrdersContext";

export const Reedem = () => {
  const { orders } = useContext(OrdersContext);
  const [modalVisible, setModalVisible] = useState(false);
  const [orderClient, setOrderClient] = useState([]);
  const [redeemData, setRedeemData] = useState([]);
  const [refresh, setRefresh] = useState(false);
  const [load, setLoad] = useState(false);
  const [isActiveQrReader, setIsActiveQrReader] = useState(false);
  const [activeScanner, setActiveScanner] = useState(false);
  const [reading, setReading] = useState(false);
  const [isReading, setIsReading] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const [isVisiblePermissionsModal, setIsVisiblePermissionsModal] =
    useState(false);
  const [isActiveQrIndicator, setIsActiveQrIndicator] = useState(false);
  const [hasPermission, setHasPermission] = useState(null);
  const [scanned, setScanned] = useState(false);
  const [qrIndicator, setQrIndicator] = useState(false);
  const [X, setX] = useState(0);
  const [Y, setY] = useState(0);
  const [width, setWidth] = useState(0);
  const [height, setHeigth] = useState(0);
  const [orderId, setOrderId] = useState(null);

  useEffect(() => {
    loadData();
  }, [orders]);

  // useEffect(() => {
  //   loadData();
  // }, [refresh]);

  const cargarRDB = async () => {
    console.log(
      "ejecute el boton______________________________________________________"
    );
    // await fetchRedeemRealtimeDatabase();
    await fetchRedeemRealtimeDatabase();
    // console.log("Mi alt realtime database: ", alt);
  };

  const loadData = async () => {
    //setLoad(true);
    try {
      //const data = await fetchRedeemDB();
      console.log("Datos de canjes - - - ", orders);
      const sortedData = orders.sort((a, b) => b.date - a.date);
      //const filter = sortedData.filter((order) => order?.status);
      console.log(
        "mi datos de canjes son-------------------------->",
        sortedData
      );
      setRedeemData(sortedData);
    } catch (error) {}
    //setLoad(false);
  };

  const updateRedeemStatus = async (id) => {
    try {
      await updateRedeemDB(id);
    } catch (error) {}

    setModalVisible(false);
    //loadData();
  };

  const openAppSettings = () => {
    Linking.openSettings();
  };

  const getBarCodeScannerPermissions = async () => {
    const { status } = await BarCodeScanner.requestPermissionsAsync();
    setHasPermission(status === "granted");
    if (status === "granted") {
      console.log("PERMISOS CONCEDIDOS");
    } else {
      console.log("PERMISOS DENEGADOS");
      // Los permisos se han denegado
      //openAppSettings(); // Abre la configuración de permisos
    }

    return status;
  };

  useEffect(() => {
    getBarCodeScannerPermissions();
  }, []);

  const ScannerModal = ({ orderId, isActiveQrReader }) => {
    const [loading, setLoading] = useState({
      state: false,
      message: "",
    });
    const [orderData, setOrderData] = useState(null);
    const [showAlert, setShowAlert] = useState(false);

    useEffect(() => {
      if (isActiveQrReader) {
        setIsVisible(true);
        setLoading({ state: true, message: "Preparando cámara" });
        setTimeout(() => {
          setLoading({ state: false, message: "" });
        }, 500);
      } else {
        setTimeout(() => {
          setIsVisible(false);
        }, 1000);
      }
    }, [isActiveQrReader]);

    useEffect(() => {
      if (orderId) {
        setLoading({ state: true, message: "Validando el código" });
        console.log("ESTO TIENE EL QR: ", orderId);
        queryOrder(orderId, setLoading, setOrderData, setShowAlert);
      }
    }, [orderId]);

    useEffect(() => {
      if (showAlert) {
        console.log("mostrando la alerta: ", showAlert);
      }
      console.log("ESTADO DE LA ALERTA: ", showAlert);
    }, [showAlert]);

    return (
      <Modal
        isVisible={isVisible}
        onSwipeComplete={() => setIsVisible(false)}
        //swipeDirection={["left", "right"]}
        animationOut={"slideInDown"}
        animationOutTiming={600}
        style={{
          justifyContent: "flex-end",

          margin: 0,
        }}
      >
        <View
          style={{
            flex: 0.9,
            borderRadius: 10,
            padding: 10,

            backgroundColor: theme.colors.whiteSegunda,

            margin: 0,
          }}
        >
          <View
            style={{
              padding: 10,
              flex: 1,
              justifyContent: "center",
              alignItems: "center",
              //backgroundColor: "red",
            }}
          >
            <StyledText
              subheading
              //style={{ fontFamily: FONTS[900] }}
            >
              ESCANEA EL CÓDIGO QR
            </StyledText>
          </View>

          <View
            style={{
              flex: 20,
              width: "100%",
              height: "100%",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            {loading.state ? (
              <View
                style={{
                  flex: 1,
                  //backgroundColor: "red",
                  justifyContent: "center",
                  alignItems: "center",
                  width: "100%",
                }}
              >
                <View
                  style={{ flex: 1, padding: 25, justifyContent: "flex-end" }}
                >
                  <ActivityIndicator size={40} />
                </View>

                <View
                  style={{ flex: 1, padding: 25, justifyContent: "center" }}
                >
                  <StyledText
                    style={{
                      fontFamily: theme.fonts.textBold,
                      fontSize: 25,
                      flex: 1,
                    }}
                  >
                    {loading.message}
                  </StyledText>
                </View>
              </View>
            ) : showAlert ? (
              <View
                style={{
                  flex: 1,
                  justifyContent: "center",
                  alignItems: "center",
                  padding: 10,
                }}
              >
                <StyledText>
                  EL QR ESCANEADO NO PERTENECE A NUESTRO LOCAL
                </StyledText>
              </View>
            ) : orderData ? (
              <View
                style={{
                  flex: 1,
                  //backgroundColor: "red",
                  width: "100%",
                  height: "100%",
                  padding: 10,
                }}
              >
                <View
                  style={{ justifyContent: "center", alignItems: "center" }}
                >
                  <StyledText
                    subtitle
                    style={{ fontFamily: theme.fonts.textBold }}
                  >
                    DETALLE DEL PEDIDO
                  </StyledText>
                </View>
                <View style={{ paddingVertical: 10, flex: 5 }}>
                  <View
                    style={{
                      flexDirection: "row",
                      backgroundColor: theme.colors.greySegunda,
                      alignItems: "center",
                      justifyContent: "space-between",
                      borderRadius: 10,
                    }}
                  >
                    <View
                      style={{
                        flex: 1,
                        justifyContent: "center",
                        alignItems: "center",
                      }}
                    >
                      <Image
                        source={{ uri: orderData.client.imgUrl }}
                        style={{
                          width: 90,
                          height: 90,
                          resizeMode: "stretch",
                          borderRadius: 45,
                        }}
                      />
                    </View>
                    <View style={{ flex: 2.5, padding: 5 }}>
                      <StyledText color={"black"} style={{ fontSize: 19 }}>
                        {orderData.client.name.concat(
                          " ",
                          orderData.client.lastName
                        )}
                      </StyledText>
                      <View
                        style={{
                          justifyContent: "center",
                          alignItems: "center",
                          paddingVertical: 5,
                        }}
                      >
                        <View style={{ paddingVertical: 10 }}>
                          <StyledText color={"black"} style={{ fontSize: 19 }}>
                            Total del pedido:
                          </StyledText>
                        </View>
                        <View>
                          <MoneysView
                            gold={orderData.totalAmount.goldCoins}
                            silver={orderData.totalAmount.silverCoins}
                          />
                        </View>
                      </View>
                    </View>
                  </View>
                  <View
                    style={{
                      flex: 1,
                      backgroundColor: theme.colors.greySegunda,
                      alignItems: "center",
                      justifyContent: "center",
                      borderRadius: 10,
                      paddingVertical: 5,
                      marginVertical: 10,
                      //height: "60%",
                      //width: "100%",
                    }}
                  >
                    {/* <ScrollView>
                      {
                        orderData.products.map((product) => {
                          return (<View
                            style={{
                              flexDirection: "row",
                              justifyContent: "space-between",
                              alignItems: "center",
                              flex: 1,
                              //marginVertical: 2,
                              //backgroundColor: theme.colors.grey,
                              //height: "100%",
                              width: "72%",
                            }}
                          >
                            <View
                              style={{
                                flex: 1,
                                padding: 5,
                                justifyContent: "center",
                                alignItems: "center",
                                //backgroundColor: "blue",
                              }}
                            >
                              <Image
                                source={{ uri: product.image }}
                                style={{ width: 80, height: 80 }}
                              />
                            </View>
                            <View
                              style={{
                                flex: 3,
                                padding: 5,
                                //backgroundColor: "yellow",
                              }}
                            >
                              <View style={{ marginVertical: 1 }}>
                                <StyledText
                                  style={{
                                    fontFamily: theme.fonts.textBold,
                                    fontSize: 17,
                                  }}
                                >
                                  {product.name}
                                </StyledText>
                              </View>
                              <View style={{ marginVertical: 1 }}>
                                <StyledText>{product?.description}</StyledText>
                              </View>

                              <View
                                style={{
                                  width: "50%",
                                  paddingVertical: 5,
                                  //backgroundColor: "blue",
                                }}
                              >
                                <MoneysView
                                  gold={product.productTotalCoins?.goldCoins}
                                  silver={product.productTotalCoins?.silverCoins}
                                />
                              </View>
                            </View>
                          </View>
                          );
                        })
                      }
                    </ScrollView> */}
                    <FlatList
                      data={orderData.products}
                      style={{
                        flex: 1,
                        //height: "60%",
                        //width: "100%",
                        //backgroundColor: "pink",
                      }}
                      keyExtractor={(item, index) => item.id.toString()}
                      renderItem={({ item, index }) => {
                        return (
                          <View
                            style={{
                              flexDirection: "row",
                              justifyContent: "space-between",
                              alignItems: "center",
                              flex: 1,
                              //marginVertical: 2,
                              //backgroundColor: theme.colors.grey,
                              //height: "100%",
                              width: "72%",
                            }}
                          >
                            <View
                              style={{
                                flex: 1,
                                padding: 5,
                                justifyContent: "center",
                                alignItems: "center",
                                //backgroundColor: "blue",
                              }}
                            >
                              <Image
                                source={{ uri: item.image }}
                                style={{
                                  width: 80,
                                  height: 80,
                                  resizeMode: "stretch",
                                }}
                              />
                            </View>
                            <View
                              style={{
                                flex: 3,
                                padding: 5,
                                //backgroundColor: "yellow",
                              }}
                            >
                              <View style={{ marginVertical: 1 }}>
                                <StyledText
                                  style={{
                                    fontFamily: theme.fonts.textBold,
                                    fontSize: 17,
                                  }}
                                >
                                  {item.name}
                                </StyledText>
                              </View>
                              <View style={{ marginVertical: 1 }}>
                                <StyledText>{item?.description}</StyledText>
                              </View>

                              <View
                                style={{
                                  width: "50%",
                                  paddingVertical: 5,
                                  //backgroundColor: "blue",
                                }}
                              >
                                <MoneysView
                                  gold={item.productTotalCoins?.goldCoins}
                                  silver={item.productTotalCoins?.silverCoins}
                                />
                              </View>
                            </View>
                          </View>
                        );
                      }}
                    />
                  </View>
                </View>
                <View
                  style={{
                    padding: 9,
                    flex: 0.5,
                    justifyContent: "center",
                    alignItems: "center",
                    //backgroundColor: "pink",
                  }}
                >
                  {!orderData?.status ? (
                    <TouchableOpacity
                      style={{
                        padding: 10,
                        backgroundColor: theme.colors.orangeSegunda,
                        borderRadius: 5,
                        flexDirection: "row",
                        width: "100%",
                        flex: 1,
                        alignItems: "center",
                        //width: "55%",
                        justifyContent: "space-evenly",
                        shadowColor: "#333333",
                        shadowOffset: {
                          width: 0,
                          height: 2,
                        },
                        shadowOpacity: 0.27,
                        shadowRadius: 4.65,

                        elevation: 6,
                      }}
                      onPress={() => {
                        updateDinamicDocument(orderData.orderId, "orders", {
                          status: true,
                        });
                        setScanned(false);
                        setQrIndicator(false);
                        setIsVisible(false);
                        setIsActiveQrReader(false);
                        setIsVisiblePermissionsModal(false);
                        setIsActiveQrIndicator(false);
                        setRefresh(!refresh);
                        setOrderData(null);
                        setLoading({ state: false, message: "" });
                        setOrderId(null);
                        setShowAlert(false);
                        //setActiveScanner(false);
                      }}
                    >
                      <View
                        style={{
                          flex: 1,
                          alignItems: "center",
                          paddingHorizontal: 5,
                          //backgroundColor: "pink",
                        }}
                      >
                        <StyledText
                          style={{
                            fontFamily: theme.fonts.textBold,
                            color: "white",
                            fontSize: 20,
                            //marginLeft: 10,
                          }}
                        >
                          Confirmar canje
                        </StyledText>
                      </View>
                      {/* <View
                      style={{
                        flex: 1,
                        alignItems: "flex-start",
                        paddingHorizontal: 5,
                        //backgroundColor: "green",
                      }}
                    >
                      <Icon
                        name="x-circle"
                        type="feather"
                        size={25}
                        color={"white"}
                        //style={{ flex: 1 }}
                      />
                    </View> */}
                    </TouchableOpacity>
                  ) : (
                    <View>
                      <StyledText
                        style={{
                          fontFamily: theme.fonts.textBold,
                          //color: "white",
                          fontSize: 20,
                          //marginLeft: 10,
                        }}
                      >
                        Canje reclamado
                      </StyledText>
                    </View>
                  )}
                </View>
              </View>
            ) : (
              <BarCodeScanner
                BarCodeScannerSettings={{
                  barCodeTypes: [BarCodeScanner.Constants.BarCodeType.qr],
                }}
                onBarCodeScanned={scanned ? undefined : handleBarCodeScanned}
                style={[
                  StyleSheet.absoluteFillObject,
                  {
                    flex: 1,
                  },
                ]}
              />
            )}
          </View>
          {/* {isActiveQrIndicator && (
            <View
              style={{
                position: "absolute",
                top: Y,
                left: X,
                width: width,
                height: height,
                borderColor: "red",
                borderWidth: 2,
              }}
            ></View>
          )} */}

          <View
            style={{
              padding: 9,
              flex: 1.5,
              justifyContent: "center",
              alignItems: "center",
              //backgroundColor: "pink",
            }}
          >
            <TouchableOpacity
              style={{
                padding: 10,
                backgroundColor: theme.colors.redSegunda,
                borderRadius: 5,
                flexDirection: "row",
                width: "100%",
                flex: 1,
                alignItems: "center",
                //width: "55%",
                justifyContent: "space-evenly",
                shadowColor: "#333333",
                shadowOffset: {
                  width: 0,
                  height: 2,
                },
                shadowOpacity: 0.27,
                shadowRadius: 4.65,

                elevation: 6,
              }}
              onPress={() => {
                setScanned(false);
                setQrIndicator(false);
                setIsVisible(false);
                setIsActiveQrReader(false);
                setIsVisiblePermissionsModal(false);
                setIsActiveQrIndicator(false);
                //setRefresh(!refresh);
                setOrderData(null);
                setLoading({ state: false, message: "" });
                setOrderId(null);
                setShowAlert(false);
                //setActiveScanner(false);
              }}
            >
              <View
                style={{
                  flex: 1.3,
                  alignItems: "flex-end",
                  paddingHorizontal: 5,
                  //backgroundColor: "pink",
                }}
              >
                <StyledText
                  style={{
                    fontFamily: theme.fonts.textBold,
                    color: "white",
                    fontSize: 20,
                    //marginLeft: 10,
                  }}
                >
                  Cancelar
                </StyledText>
              </View>
              <View
                style={{
                  flex: 1,
                  alignItems: "flex-start",
                  paddingHorizontal: 5,
                  //backgroundColor: "green",
                }}
              >
                <Icon
                  name="x-circle"
                  type="feather"
                  size={25}
                  color={"white"}
                  //style={{ flex: 1 }}
                />
              </View>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    );
  };

  const PermissionsModal = () => {
    return (
      <Modal
        isVisible={isVisiblePermissionsModal}
        onSwipeComplete={() => setIsVisiblePermissionsModal(false)}
        swipeDirection={["up", "left", "right", "down"]}
        style={{
          justifyContent: "flex-end",
          //backgroundColor: "transparent",
          margin: 0,
        }}
      >
        <View
          style={{
            backgroundColor: theme.colors.whiteSegunda,
            height: "20%",
            bottom: 0,
            padding: 15,
            borderTopStartRadius: 15,
            borderTopEndRadius: 15,
          }}
        >
          <View style={{ flex: 1.5 }}>
            <StyledText
              style={{ fontFamily: theme.fonts.textBold, fontSize: 18 }}
            >
              Para escanear los códigos QR, necesitamos que proporciones los
              permisos de la cámara.
            </StyledText>
          </View>

          <View style={{ flexDirection: "row", flex: 1 }}>
            <TouchableOpacity
              onPress={() => {
                openAppSettings(), setIsVisiblePermissionsModal(false);
              }}
              style={{
                padding: 10,
                flex: 1,
                backgroundColor: theme.colors.orangeSegunda,
                borderRadius: 10,
                marginRight: 4,
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <StyledText
                style={{
                  fontFamily: theme.fonts.textBold,
                  fontSize: 17,
                  color: "white",
                }}
              >
                Conceder permisos
              </StyledText>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => setIsVisiblePermissionsModal(false)}
              style={{
                padding: 10,
                flex: 1,
                marginLeft: 4,
                backgroundColor: theme.colors.redSegunda,
                borderRadius: 10,
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <StyledText
                style={{
                  fontFamily: theme.fonts.textBold,
                  fontSize: 17,
                  color: "white",
                }}
              >
                Cancelar
              </StyledText>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    );
  };

  const queryOrder = async (
    orderId,
    setLoading,
    setOrderData,
    setShowAlert
  ) => {
    try {
      let orderData = await getDinamicDoc("orders", orderId);
      console.log("ORDER DATA: ", orderData);
      setOrderData(orderData);
      setLoading({ state: false, message: "" });
      setScanned(false);
      setQrIndicator(false);
    } catch (e) {
      setShowAlert(true);
      // setScanned(false);
      // setQrIndicator(false);
      // setIsActiveQrReader(false);
      // setActiveScanner(false);
      setLoading({ state: false, message: "" });
      //setOrderId(null);
      // setScanned(false);
      // setQrIndicator(false);
      console.log("ALERTA - - - - - - - - - - - - ");
    }
  };

  const handleBarCodeScanned = ({ bounds, data }, setLoading, setOrderData) => {
    setScanned(true);
    setQrIndicator(true);
    const { origin, size } = bounds;
    setX(origin.x);
    setY(origin.y);
    setHeigth(size.height);
    setWidth(size.width);

    console.log("DATA: ", data);
    try {
      //setQrIndicator(false);
      //let jsonObject = data;

      console.log("ESTO TIENE EL QR: ", data);
      setOrderId(data);
      //queryOrder(data, setLoading, setOrderData);
      //setReading(true);
      //validateQr(jsonObject);
    } catch (error) {
      setScanned(false);
      setQrIndicator(false);
      setIsActiveQrReader(false);
      setActiveScanner(false);
      setOrderId(null);
      Alert.alert(
        "Error al escanear el código QR",
        "Tuvimos problemas al leer el qr, por favor vuelve a intentarlo"
      );
      console.error("Error al analizar la cadena JSON:", error);
    }
  };

  return (
    <View style={styles.container}>
      <PermissionsModal />
      <ScannerModal orderId={orderId} isActiveQrReader={isActiveQrReader} />
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
                  <View
                    style={{
                      flex: 1,
                      justifyContent: "center",
                      alignItems: "center",
                    }}
                  >
                    <StyledText
                      style={{
                        color: "white",
                        fontFamily: theme.fonts.textBold,
                        fontSize: 15,
                      }}
                    >
                      {orderClient?.client?.name
                        ? orderClient?.client?.name.concat(
                            " ",
                            orderClient?.client?.lastName
                          )
                        : "a"}
                    </StyledText>
                  </View>

                  {/* <Text style={{ color: "white" }}>
                    {orderClient?.totalAmount?.goldCoins &&
                    orderClient?.totalAmount?.silverCoins
                      ? "M.Oro: " +
                        orderClient?.totalAmount?.goldCoins +
                        " M.Plata: " +
                        orderClient?.totalAmount?.silverCoins
                      : "2 "}{" "}
                  </Text> */}
                  <View
                    style={{
                      flexDirection: "row",
                      flex: 2,
                      paddingHorizontal: 10,
                    }}
                  >
                    <View
                      style={{
                        backgroundColor: theme.colors.blackSegunda,
                        padding: 5,
                        borderRadius: 20,
                        //width: "100%",
                        flexDirection: "row",
                        flex: 1,
                        justifyContent: "center",
                        alignItems: "center",
                        borderColor: theme.colors.whiteSegunda,
                        borderWidth: 1,
                        marginHorizontal: 5,
                      }}
                    >
                      <StyledText
                        style={{
                          fontFamily: theme.fonts.textBold,
                          color: "white",
                          fontSize: 15,
                        }}
                      >
                        {orderClient?.totalAmount?.goldCoins}
                      </StyledText>
                      <Image
                        source={ImagenImport.coin}
                        style={{
                          width: 15,
                          height: 15,
                          marginHorizontal: 5,
                        }}
                      />
                    </View>
                    <View
                      style={{
                        backgroundColor: theme.colors.blackSegunda,
                        padding: 5,
                        borderRadius: 20,
                        //width: "100%",
                        flexDirection: "row",
                        flex: 1,
                        justifyContent: "center",
                        alignItems: "center",
                        borderColor: theme.colors.whiteSegunda,
                        borderWidth: 1,
                        marginHorizontal: 5,
                      }}
                    >
                      <StyledText
                        style={{
                          fontFamily: theme.fonts.textBold,
                          color: "white",
                          fontSize: 15,
                        }}
                      >
                        {orderClient?.totalAmount?.silverCoins}
                      </StyledText>
                      <Image
                        source={ImagenImport.coin}
                        style={{
                          width: 15,
                          height: 15,
                          marginHorizontal: 5,
                        }}
                      />
                    </View>
                  </View>
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
                          source={{ uri: prod?.image ? prod?.image : "" }}
                          style={{
                            width: "25%",
                            height: "100%",
                            borderRadius: 5,
                            resizeMode: "stretch",
                          }}
                        />
                        <View style={{ flex: 1 }}>
                          <View
                            style={{
                              flex: 1,
                              //paddingHorizontal: 10,
                              //backgroundColor: "red",
                              paddingHorizontal: 5,
                            }}
                          >
                            <StyledText
                              style={{
                                color: "white",
                                //textAlign: "center",

                                fontSize: 15,
                                fontFamily: theme.fonts.textBold,
                              }}
                            >
                              {prod?.name ? prod?.name : "Ceviche"}
                            </StyledText>
                          </View>
                          <View
                            style={{
                              flexDirection: "row",
                              flex: 1,
                              justifyContent: "space-around",
                              alignItems: "center",
                              //backgroundColor: "pink",
                            }}
                          >
                            <View
                              style={{
                                flexDirection: "row",
                                flex: 6,
                                marginHorizontal: 5,
                                //backgroundColor: "blue",
                              }}
                            >
                              <View
                                style={{
                                  backgroundColor: theme.colors.blackSegunda,
                                  padding: 5,
                                  borderRadius: 20,
                                  //width: "100%",
                                  flexDirection: "row",
                                  flex: 1,
                                  justifyContent: "center",
                                  alignItems: "center",
                                  borderColor: theme.colors.whiteSegunda,
                                  borderWidth: 1,
                                }}
                              >
                                <StyledText
                                  style={{
                                    fontFamily: theme.fonts.textBold,
                                    color: "white",
                                    fontSize: 15,
                                  }}
                                >
                                  {prod?.productTotalCoins?.goldCoins}
                                </StyledText>
                                <Image
                                  source={ImagenImport.coin}
                                  style={{
                                    width: 15,
                                    height: 15,
                                    marginHorizontal: 5,
                                  }}
                                />
                              </View>
                              <View
                                style={{
                                  backgroundColor: theme.colors.blackSegunda,
                                  padding: 5,
                                  borderRadius: 20,
                                  //width: "100%",
                                  flex: 1,
                                  justifyContent: "center",
                                  alignItems: "center",
                                  marginHorizontal: 5,
                                  flexDirection: "row",
                                  borderColor: theme.colors.whiteSegunda,
                                  borderWidth: 1,
                                }}
                              >
                                <StyledText
                                  style={{
                                    fontFamily: theme.fonts.textBold,
                                    color: "white",
                                    fontSize: 15,
                                  }}
                                >
                                  {prod?.productTotalCoins?.silverCoins}
                                </StyledText>
                                <Image
                                  source={ImagenImport.coin}
                                  style={{
                                    width: 15,
                                    height: 15,
                                    marginHorizontal: 5,
                                    //marginLeft: 5,
                                  }}
                                />
                              </View>
                            </View>
                            <View
                              style={{
                                flex: 1,
                                //backgroundColor: "cyan",
                                justifyContent: "center",
                                alignItems: "center",
                              }}
                            >
                              <StyledText
                                style={{
                                  //flex: 1,
                                  //backgroundColor: "cyan",
                                  justifyContent: "center",
                                  alignItems: "center",
                                  fontFamily: theme.fonts.textBold,
                                  color: "white",
                                  textAlign: "center",
                                  fontSize: 15,
                                }}
                              >
                                x{prod.quantity}
                              </StyledText>
                            </View>
                          </View>
                        </View>
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
        <View
          style={{ flex: 1, justifyContent: "center", alignItems: "center" }}
        >
          <View
            style={{
              flexDirection: "row",
              padding: 5,
              //flex: 1.2,
              justifyContent: "space-evenly",
              alignItems: "center",
              backgroundColor: "white",
              borderRadius: 5,
              shadowColor: "#333333",
              shadowOffset: {
                width: 0,
                height: 2,
              },
              shadowOpacity: 0.27,
              shadowRadius: 4.65,
              //marginHorizontal: 10,
              elevation: 6,
              //paddingVertical: 5,
            }}
          >
            <View style={{ flex: 2, paddingHorizontal: 15 }}>
              <StyledText style={{ marginBottom: 15 }}>
                Escanea el código para validar el canje
              </StyledText>
              <TouchableOpacity
                onPress={async () => {
                  let status = await getBarCodeScannerPermissions();
                  console.log("ESTO DA STATUS: ", status);
                  if (status === "granted") {
                    //handleClosePress();
                    setIsActiveQrReader(true);

                    // setTimeout(() => {
                    //   setLoading({ state: false, message: "" });
                    //   //setActiveScanner(true);
                    // }, 250);
                  } else {
                    setIsVisiblePermissionsModal(true);
                    //openAppSettings();
                  }
                }}
                style={{
                  padding: 10,
                  marginVertical: 5,
                  backgroundColor: theme.colors.orangeSegunda,
                  borderRadius: 10,
                  justifyContent: "center",
                  alignItems: "center",
                }}
              >
                <StyledText
                  subheading
                  color={"white"}
                  //fontFamily={FONTS.bold_700}
                >
                  Escanear código QR
                </StyledText>
              </TouchableOpacity>
            </View>
            <View
              style={{
                flex: 1,
                paddingHorizontal: 15,
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <Image source={QR_READER} style={{ width: 100, height: 100 }} />
            </View>
          </View>
        </View>
        {/* //________________________________________________________________________________________________________________________ */}
        <View
          style={{
            backgroundColor: theme.colors.blackSegunda,
            flex: 5,
            marginVertical: 10,
            marginBottom: 20,
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
            {redeemData.length > 0 ? (
              redeemData?.map((item, index) => (
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
                  date={item?.date}
                  icon2={
                    <Icon2
                      name={item.status ? "checkcircle" : "checkcircleo"}
                      size={20}
                      type={"entypo"}
                      color={item.status ? "#82EF7B" : "white"}
                    />
                  }
                />
              ))
            ) : (
              <View
                style={{
                  //flex: 1,
                  justifyContent: "center",
                  alignItems: "center",
                  //backgroundColor: "red",
                  width: "100%",
                  //top: "50%",
                  height: "100%",
                }}
              >
                <StyledText color={"white"}>Sin canjes pendientes</StyledText>
              </View>
            )}
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
    width: "100%",
    //top: "50%",
    //height: "100%",
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
