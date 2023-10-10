import { useRef, useState, useEffect } from "react";
import { StyleSheet, Text, View, Image, FlatList, Modal, Button, TouchableOpacity } from "react-native";
import { FAB } from "react-native-paper";
import theme from "../../theme/theme";
import { TextGeneral } from "../../Components/GeneralComponents/TextGeneral";
import logos from "../../theme/logos";
import { RadioButton } from 'react-native-paper';
import { ImagenLunchCategory } from "../../theme/Images";
import ModalComponent from "../../Components/Promotions/ModalPromotion";
import { Tarjeta } from "../../Components/Promotions/CardPromotion"
import ModalEdit from "../../Components/Promotions/ModalEditPromotion";
/* Arreglar
import CompetitionForm from "../../Components/Predictions/CompList"; */
import * as React from 'react';
import { Icon } from "react-native-elements";




export const PredictionList = ({ navigation }) => {

    const [participantsList, setParticipantsList] = useState([]);

    useEffect(() => {
        // Este efecto se ejecutará cada vez que 'matches' cambie
        // Puedes colocar aquí cualquier lógica necesaria para actualizar la lista
    }, [participantsList]);



    const [value, setValue] = React.useState('first');

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


                    }}>Seleccion Multiple</Text>

                </View>
                <Image source={logos.blanco} style={{ width: 100, height: 80 }} />
            </View>



            <View style={{
                flex: 3.5,
                backgroundColor: theme.colors.blackSegunda,
                borderRadius: 10,
                marginBottom: 40
            }}>

                <FlatList
                    data={participantsList}
                    renderItem={({ item }) => (
                        <View style={styles.matchItem}>


                            <TouchableOpacity style={{
                                backgroundColor: theme.colors.orangeSegunda,
                                alignItems: 'center',
                                borderRadius: 5,
                                padding: 10,
                                margin: 10,


                            }}

                                onPress={console.log("editar")}

                            >
                                <Text style={{ color: 'white' }}>{item.competitionName}</Text>
                            </TouchableOpacity>
                        </View>
                    )}
                    keyExtractor={(item, index) => index.toString()}
                />

                <FAB
                    icon="plus"
                    style={styles.fab}
                    onPress={() => { navigation.navigate('PredictionListForm', { setParticipantsList }) }}
                />

            </View>


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
    },
    button: {
        width: 50,
        height: 50,
        backgroundColor: theme.colors.orangeSegunda,
        borderRadius: 25,
        justifyContent: 'center',
        alignItems: 'center',
    },
    fab: {
        position: "absolute",
        margin: 16,
        right: 0,
        bottom: 0,
        backgroundColor: theme.colors.whiteSegunda,
    },

});
