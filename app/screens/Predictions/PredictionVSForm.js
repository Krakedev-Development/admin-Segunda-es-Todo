import { useRef, useState, useEffect } from "react";
import { StyleSheet, Text, View, Image, FlatList, Modal, Button, SafeAreaView } from "react-native";
import { FAB } from "react-native-paper";
import theme from "../../theme/theme";
import { TextGeneral } from "../../Components/GeneralComponents/TextGeneral";
import logos from "../../theme/logos";
import { RadioButton, SegmentedButtons } from 'react-native-paper';
import { ImagenLunchCategory } from "../../theme/Images";
import ModalComponent from "../../Components/Promotions/ModalPromotion";
import { Tarjeta } from "../../Components/Promotions/CardPromotion"
import ModalEdit from "../../Components/Promotions/ModalEditPromotion";
import { TextInput } from "react-native-gesture-handler";
import * as React from 'react';
/* import Versus from "../../../assets/versus.png" */



export const PredictionVSForm = ({ navigation, route }) => {
  const { setmatches, matches } = route.params;
  const { index } = route.params;
  const [team1, setTeam1] = useState('');
  const [imgTeam1, setImgTeam1] = useState();
  const [team2, setTeam2] = useState('');
  const [imgTeam2, setImgTeam2] = useState();
  const [team1Goals, setTeam1Goals] = useState('');
  const [team2Goals, setTeam2Goals] = useState('');
  const [show, setShow] = React.useState('');


  useEffect(() => {
    if (typeof index !== 'undefined') {
      const teamToEdit = matches[index];
      setTeam1(teamToEdit.team1);
      setTeam2(teamToEdit.team2);
      setTeam1Goals(teamToEdit.team1Goals);
      setTeam2Goals(teamToEdit.team2Goals);
    }
  }, [index, matches]);


  const addMatch = () => {
    if (typeof index !== 'undefined') {
      const updatedMatches = [...matches];
      updatedMatches[index] = {
        ...updatedMatches[index],
        team1,
        team2,
        team1Goals,
        team2Goals,
      };
      setmatches(updatedMatches);
    } else {
      const newMatch = { team1, team2, team1Goals, team2Goals };
      setmatches(matches => [...matches, newMatch]);
    }
    navigation.goBack();
  };


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


          }}>Juego entre 2 equipos</Text>

        </View>
        <Image source={logos.blanco} style={{ width: 100, height: 80 }} />
      </View>


      <View style={{
        flex: 3,
        backgroundColor: theme.colors.blackSegunda,
        borderRadius: 10,
        marginBottom: 40
      }}>

        <View style={{
          marginHorizontal: theme.separation.horizontalSeparation,
          marginVertical: theme.separation.headSeparation
        }}>

          <View>

            <SafeAreaView style={{
              alignItems: 'center',
              marginBottom: 20,
            }} >
              <SegmentedButtons
                style={{ backgroundColor: theme.colors.whiteSegunda, borderRadius: 25 }}
                value={show}
                onValueChange={setShow}
                buttons={[
                  {
                    value: 'score',
                    label: 'Puntuacion',
                  },
                  {
                    value: 'select',
                    label: 'Seleccionar',
                  },

                ]}
              />
            </SafeAreaView>

          </View>

          <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>

            <View style={{ alignItems: 'center', flex: 1 }}>
              <Text style={{
                color: 'white',
                fontFamily: theme.fonts.text,
                paddingBottom: 20

              }} >EQUIPO 1</Text>

              <Image source={ImagenLunchCategory.ceviche} style={{ width: 97, borderRadius: 5 }} />
              <Text style={{ color: 'white', marginBottom: 5, marginTop: 5 }}>Nombre: </Text>

              <TextInput
                style={styles.textInput}
                value={team1}
                onChangeText={text => setTeam1(text)}
                placeholder={team1}
                placeholderTextColor="rgba(255, 255, 255, 0.5)"
                underlineColorAndroid="transparent"
                selectionColor="white"
                // Asegúrate de establecer el valor del fondo con transparencia
                backgroundColor="rgba(0, 0, 0, 0.2)"

              />

              {show === 'score' && (
                <Text style={{ color: 'white', marginBottom: 5, marginTop: 5 }}>Goles: </Text>
              )}


              {show === 'score' && (
                <TextInput
                  style={styles.textInput}
                  placeholder="Ej. 5"
                  value={team1Goals}
                  onChangeText={text => setTeam1Goals(text)}
                  placeholderTextColor="rgba(255, 255, 255, 0.5)"
                  underlineColorAndroid="transparent"
                  selectionColor="white"
                  // Asegúrate de establecer el valor del fondo con transparencia
                  backgroundColor="rgba(0, 0, 0, 0.2)"
                  keyboardType="numeric"
                />
              )}




            </View>

            <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
              {/* <Image
                source={Versus}
                style={{
                  width: 55,
                  height: 60
                }}
              /> */}
            </View>

            <View style={{ alignItems: 'center', flex: 1 }}>
              <Text style={{
                color: 'white',
                fontFamily: theme.fonts.text,
                paddingBottom: 20

              }} >EQUIPO 2</Text>

              <Image source={ImagenLunchCategory.superBowPollo} style={{ width: 97, borderRadius: 5 }} />
              <Text style={{ color: 'white', marginBottom: 5, marginTop: 5 }}>Nombre: </Text>

              <TextInput
                style={styles.textInput}
                placeholder={team2}
                value={team2}
                onChangeText={text => setTeam2(text)}
                placeholderTextColor="rgba(255, 255, 255, 0.5)"
                underlineColorAndroid="transparent"
                selectionColor="white"
                // Asegúrate de establecer el valor del fondo con transparencia
                backgroundColor="rgba(0, 0, 0, 0.2)"
              />


              {show === 'score' && (
                <Text style={{ color: 'white', marginBottom: 5, marginTop: 5 }}>Goles: </Text>
              )}

              {show === 'score' && (
                <TextInput
                  style={styles.textInput}
                  placeholder="Ej. 5"
                  value={team2Goals}
                  onChangeText={text => setTeam2Goals(text)}
                  placeholderTextColor="rgba(255, 255, 255, 0.5)"
                  underlineColorAndroid="transparent"
                  selectionColor="white"
                  // Asegúrate de establecer el valor del fondo con transparencia
                  backgroundColor="rgba(0, 0, 0, 0.2)"
                  keyboardType="numeric"
                />
              )}


            </View>
          </View>

          {show === 'select' && (
            <View style={{ marginTop: 30 }}>

              <RadioButton.Group onValueChange={newValue => setValue(newValue)} value={value}>
                <View style={{ flexDirection: 'row' }}>

                  <View style={{ alignItems: 'center', flex: 1 }}>
                    <Text style={{ color: 'white', fontFamily: theme.fonts.text }}>Gana equipo 1</Text>
                    <RadioButton value="win1" />
                  </View>

                  <View style={{ alignItems: 'center', flex: 1 }}>
                    <Text style={{ color: 'white', fontFamily: theme.fonts.text }}>Empate</Text>
                    <RadioButton value="draw" />
                  </View>

                  <View style={{ alignItems: 'center' }}>
                    <Text style={{ color: 'white', fontFamily: theme.fonts.text }}>Gana Equipo 2</Text>
                    <RadioButton value="win2" />
                  </View>

                </View>

              </RadioButton.Group>

            </View>
          )}

          <View style={{ marginTop: 20 }}>
            <View style={{ marginVertical: 10 }}>
              <Button title="Guardar" color={theme.colors.orangeSegunda} onPress={addMatch} />
            </View>

            <Button title="Cancelar" color={theme.colors.redSegunda} onPress={() => { navigation.goBack() }} />
          </View>
        </View>
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
  textInput: {
    width: 100,
    height: 40,
    color: 'white',
    borderWidth: 1,
    borderColor: 'white',
    borderRadius: 5,
    paddingHorizontal: 10,
  },
  button: {
    backgroundColor: '#007AFF',
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 5,
  },
  cancelButton: {
    backgroundColor: '#FF3B30',
  },
  buttonText: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 16,
  },

});
