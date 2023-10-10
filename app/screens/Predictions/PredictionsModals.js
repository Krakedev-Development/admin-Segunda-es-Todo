import { StyleSheet, Text, View, Image, FlatList, TouchableOpacity, TouchableWithoutFeedback } from "react-native";
import theme from "../../theme/theme";

export const ModalPredictionOption = ({ navigation, setNewPredictionModal })  =>{
    return(
    <View style={styles.container}>
        <TouchableWithoutFeedback onPress={() => setNewPredictionModal(false)}>
            <View style={styles.modalContainer}>
                <View style={styles.modalContent}>
                    <Text style={styles.modalText}>
                    Qué tipo de predicción quiere crear?
                    </Text>
                    <View
                    style={{
                        flexDirection: "row",
                        alignItems: "center",
                        justifyContent: "space-around",
                    }}
                    >
                    <TouchableOpacity
                        onPress={() =>{
                            setNewPredictionModal(false)
                            navigation.navigate("PredictionVS")
                            }
                        }
                        style={[
                        styles.modalButton,
                        { backgroundColor: theme.colors.orangeSegunda },
                        ]}
                    >
                        <Text style={styles.buttonText}>1 VS 1</Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                        onPress={() =>{
                            setNewPredictionModal(false)
                            navigation.navigate("PredictionList")
                            }
                        }
                        style={[
                        styles.modalButton,
                        { backgroundColor: theme.colors.orangeSegunda },
                        ]}
                    >
                        <Text style={styles.buttonText}>LISTA</Text>
                    </TouchableOpacity>
                    </View>
                </View>
            </View>
        </TouchableWithoutFeedback>
    </View>
    )
}

const styles = StyleSheet.create({
    container: {
      flex: 1,
      justifyContent: "center",
      alignItems: "center",
      backgroundColor: "rgba(0, 0, 0, 0.5)",
    },
    buttonText: {
      color: "white",
      fontSize: 16,
    },
    modalContainer: {
      flex: 1,
      justifyContent: "center",
      alignItems: "center",
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
  