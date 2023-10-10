import { useRef, useState } from "react";
import { StyleSheet, Text, View, Image, FlatList, Modal, Button } from "react-native";
import { FAB, TextInput } from "react-native-paper";
import theme from "../../theme/theme";
import { TextGeneral } from "../../Components/GeneralComponents/TextGeneral";
import logos from "../../theme/logos";
/* Arreglar después */
// import CompetitionForm from "../../Components/Predictions/CompList";
import * as React from 'react';

import { TouchableOpacity } from "react-native-gesture-handler";
import { Icon } from "react-native-elements";




export const PredictionListForm = ({ navigation,route}) => {

  
  //VARIABLES 
  const {setParticipantsList} = route.params;
  const [competitionName, setCompetitionName] = useState('');
  const [participants, setParticipants] = useState([{ Name: '', img: '' }]);

  const addParticipant = () => {
    setParticipants([...participants, { Name: '', img: '' }]);
  };

  const removeParticipant = index => {
    const updatedParticipants = [...participants];
    updatedParticipants.splice(index, 1);
    setParticipants(updatedParticipants);
  };

  const saveData = () => {
    // Aquí puedes guardar la información de la competencia y los participantes en una lista o base de datos
    console.log('Competencia:', competitionName);
    console.log('Participantes:', participants);
    const newList = { competitionName, participants };
    setParticipantsList(participantsList => [...participantsList, newList]);
    navigation.navigate("PredictionList")
  };

  const cancelForm = () => {
    setCompetitionName('');
    setParticipants([{ Name: '', img: '' }]);
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
        marginBottom: 40,
        padding: 15,
      }}>

        <View style={{ alignItems: 'center', borderBottomWidth: 1, borderBottomColor: 'gray', marginBottom: 15, paddingBottom: 15 }}>
          <Text style={{ color: 'white', fontFamily: theme.fonts.text, marginBottom: 5, fontSize: 15 }}>Titulo de la Competencia:</Text>

          <TextInput
            value={competitionName}
            onChangeText={text => setCompetitionName(text)}
            placeholder="Titulo de la competencia"
            style={styles.input}
            placeholderTextColor="gray"
            mode='outlined'
            textColor='white'

            activeOutlineColor={theme.colors.orangeSegunda}
          />
        </View>


        <Text style={{ color: 'white' }}>Participantes:</Text>

        <View style={{

          marginTop: 10,
        }}>

          {participants.map((participant, index) => (
            <View key={index} style={{ flexDirection: 'row' }}>

              <TextInput
                value={participant.Name}
                mode='outlined'
                textColor='white'
                placeholderTextColor="gray"
                activeOutlineColor={theme.colors.orangeSegunda}
                onChangeText={text => {
                  const updatedParticipants = [...participants];
                  updatedParticipants[index].Name = text;
                  setParticipants(updatedParticipants);
                }}
                placeholder="Nombre: "
                style={{
                  backgroundColor: 'transparent',
                  marginBottom: 10,
                  padding: 1,
                  marginRight: 10,
                  color: 'white',
                  width: 190,
                  height: 30
                }}
              />



              <TouchableOpacity >
                <Icon
                  name="camera"
                  type="entypo"
                  color="white"
                  size={42}

                />
              </TouchableOpacity>

              <TouchableOpacity onPress={() => { removeParticipant(index) }}>
                <Icon
                  name="delete"
                  size={42}
                  color={theme.colors.redSegunda}
                />
              </TouchableOpacity>



            </View>
          ))}



        </View>




        <View style={{ flexDirection: 'row', marginTop: 10, justifyContent: 'space-around' }}>

          <View>
            <Button title="Agregar" onPress={addParticipant} color={theme.colors.orangeSegunda} />
          </View>

          <Button title="Guardar" onPress={saveData} color={theme.colors.orangeSegunda} />
          <Button title="Cancelar" onPress={cancelForm} color={theme.colors.redSegunda} />

        </View>





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
  input: {
    backgroundColor: 'transparent',
    marginBottom: 10,
    padding: 1,
    marginRight: 10,
    color: 'white',
    width: 225


},

});
