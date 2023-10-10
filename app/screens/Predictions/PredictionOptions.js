import { useRef, useState } from "react";
import { StyleSheet, Text, View, Image, FlatList, Modal, Button } from "react-native";
import { FAB } from "react-native-paper";
import theme from "../../theme/theme";
import { TextGeneral } from "../../Components/GeneralComponents/TextGeneral";
import logos from "../../theme/logos";
import { TouchableOpacity } from "react-native-gesture-handler";


export const NewPredictionOptions = ({ navigation }) => {


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
                <View>
                    <TextGeneral
                        text={"Pronosticos"}
                        color={"white"}
                        center
                        size={30}
                        style={[styles.title]}

                    />
                    <Text style={{
                        color: 'white',
                        fontFamily: theme.fonts.text,


                    }}>Seleccione una opcion</Text>

                </View>
                <Image source={logos.blanco} style={{ width: 100, height: 80 }} />
            </View>



            <View style={{
                flex: 3.5,
                backgroundColor: theme.colors.blackSegunda,
                borderRadius: 10,
                justifyContent: 'center',
                alignItems: 'center',
                marginBottom: 40
                
            }}>

                <TouchableOpacity onPress={() => { navigation.navigate("PredictionVS") }} containerStyle={{
                    backgroundColor: theme.colors.orangeSegunda,
                    borderRadius: 5,
                    alignItems: 'center',
                    justifyContent: 'center',
                    width: 200,
                    height: 35,



                }}>
                    <Text style={{ color: 'white', fontFamily: theme.fonts.text, fontSize: 25 }}>1 VS 1</Text>
                </TouchableOpacity>


                <TouchableOpacity onPress={() => { navigation.navigate("PredictionList") }} containerStyle={{
                    marginTop: 20,
                    backgroundColor: theme.colors.orangeSegunda,
                    borderRadius: 5,
                    alignItems: 'center',
                    justifyContent: 'center',
                    width: 200,
                    height: 35,

                }}>
                    <Text style={{ color: 'white', fontFamily: theme.fonts.text, fontSize: 25 }}>Lista</Text>
                </TouchableOpacity>




            </View>


        </View>
    );
};




//MODAL


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
    },

});
