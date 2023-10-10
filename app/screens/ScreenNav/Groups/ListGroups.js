import { StyleSheet, Text, View,ScrollView, Modal, TouchableOpacity, TouchableWithoutFeedback } from 'react-native';
import { HeadbarGroup } from '../../../PruebaComponents/Headbar'
import theme from "../../../theme/theme";
import { useState} from "react";
import { GroupCard } from '../../../PruebaComponents/GroupCard';
import { Button } from '@rneui/themed';
import {ModalCreateNewGroup, ModalJoinGroup } from '../../../Components/Groups/ModalsGroups';

export const ListGroups = ({ navigation }) => {
    /* Declarate Function and Const for Modal´s Funcion */

        /* Boolean const that use to Shows or hide Modals Views */
        const [modalCrearGrupo, setModalCrearGrupo] = useState(false);
        const [modalShareGroup, setModalShareGroup] = useState(false);
        const [modalJoinGrupo, setModalJoinGrupo]   = useState(false);

        /*Strings const that Use for TextInputs */
        const [nombreGrupo, setNombreGrupo] = useState(false);
        const [GroupsCode, setGroupsCode]   = useState(false);

        /* Function that allow Changes the const the View State of the Modals */
        const ReceiveModalCrearGrupo = (modalCrearGrupo) => {setModalCrearGrupo(modalCrearGrupo)}
        const ReciveModalShareGroup  = (modalShareGroup) => {setModalShareGroup(modalShareGroup)}
        const ReciveModalJoinGroup   = (modalJoinGrupo)  => {setModalJoinGrupo(modalJoinGrupo)}
        
        /* Function that allow Changes the TextInput const of the Modals */
        const ReciveNombreGrupo =(nombreGrupo) => {setNombreGrupo(nombreGrupo)}
        const ReciveGroupsCode =(GroupsCode)   => {setGroupsCode(GroupsCode)}

    /*--- This part of code is made by Enrique Pérez S ---*/


      return (
        <View style={styles.container}>
        
        {/*---    Use of the Modal Componentes    ---*/}

            {/* Call to Component for the "Create New Group" Button */}
            <ModalCreateNewGroup
                sendModalVisible={ReceiveModalCrearGrupo} 
                modalVisibleCrearGrupo={modalCrearGrupo}
                sendNombreGrupo={ReciveNombreGrupo} 
                nombreGrupo={nombreGrupo}
                sendPressButton={ReciveModalShareGroup}
                sendModalShareVisible={ReciveModalShareGroup}
                modalShareGroup={modalShareGroup}
            />

            {/* Call to Component for the "Join Group" Button */}
            <ModalJoinGroup
                sendModalVisible = {ReciveModalJoinGroup}
                modalJoinGroup   = {modalJoinGrupo}
                sendGroupsCode   = {ReciveGroupsCode}
                GroupsCode       = {GroupsCode}
                sendPressButton  = {ReciveModalJoinGroup}
            /> 
        {/*--- This part of code is made by Enrique Pérez S --- */}

            <View style={styles.head}>
                <HeadbarGroup />
            </View>



            <View style={styles.body}>

                <View style={styles.Text}>
                    <Text style={{ color: '#7A7A7A', fontStyle: theme.fonts.text }}>
                        Invita a tus panas para unir sus puntos y conseguir más recompensas
                    </Text>
                </View>



                <ScrollView style={styles.card}>
                    <TouchableOpacity onPress={()=>{navigation.navigate("Groups")}}>
                        <GroupCard />
                    </TouchableOpacity>
                    <TouchableOpacity>
                        <GroupCard />
                    </TouchableOpacity>
                    <TouchableOpacity>
                        <GroupCard />
                    </TouchableOpacity>
                </ScrollView>

                <View style={styles.ButtonContainer}>
                    <Button color={theme.colors.blackSegunda} buttonStyle={styles.button} onPress={()=>{setModalCrearGrupo(true)}}>Crear grupo Nuevo</Button>
                    <Button color={theme.colors.orangeSegunda} buttonStyle={styles.button} onPress={()=>{setModalJoinGrupo(true)}}>Unirse a un grupo</Button>
                </View>

            </View>


        </View>

    );
}




const styles = StyleSheet.create({
    container: {

        backgroundColor: theme.colors.whiteSegunda,
        dColor: "gray",

    },
    head: {

        justifyContent: 'flex-start',
        paddingTop: theme.separation.headSeparation,
    },
    body: {

        paddingHorizontal: theme.separation.horizontalSeparation,

    },
    card: {
        flex: 0,
        backgroundColor: theme.colors.greySegunda,
        borderRadius: 10,
        height: 400,

    }, Text: {
        paddingTop: 30,
        flex: 0,
        paddingBottom: 20,
    },
    button: {
        flex: 0,
        borderRadius: 10,
        marginHorizontal: 10,
        width: 300,
        marginBottom: 5,
        height: 50,

    },
    ButtonContainer: {
        marginTop: 30,
        alignItems: 'center',
    },
});



