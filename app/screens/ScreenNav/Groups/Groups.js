
import { StyleSheet, Text, View, Image, ScrollView, Dimensions, TouchableOpacity } from 'react-native';
import { HeadbarGroup } from '../../../PruebaComponents/Headbar'
import theme from "../../../theme/theme";
import { UserGroupCard } from '../../../PruebaComponents/GroupCard';
import { Button } from '@rneui/themed';
import {ModalShareGroup, ModalLeaveGroup} from '../../../Components/Groups/ModalsGroups'
import { useState} from "react";

export const Groups = ({navigation}) => {
    /* Boolean const that use to Shows or hide Modals Views */
    const [modalShareGroup, setModalShareGroup] = useState(false);
    const [modalLeaveGroup, setLeaveGroup] = useState(false);

     /* Function that allow Changes the const the View State of the Modals */
    const ReciveModalShareGroup  = (modalShareGroup) => {setModalShareGroup(modalShareGroup)}
    const ReciveModalLeaveGroup  = (modalLeaveGroup) => {setLeaveGroup(modalLeaveGroup)}

    return (
        <View style={styles.container}>
            
            <ModalShareGroup
                sendModalShareVisible={ReciveModalShareGroup}
                modalShareGroup={modalShareGroup}
            />

            <ModalLeaveGroup
                sendModalLeaveGroupVisible = {ReciveModalLeaveGroup}
                modalLeaveGroup       = {modalLeaveGroup}
            />

            <View style={styles.head}>
                <HeadbarGroup />
            </View>



            <View style={styles.body}>

                <View style={styles.ButtonContainer}>
                    <Button color={theme.colors.orangeSegunda}  buttonStyle={styles.button} onPress={()=>{setModalShareGroup(true)}}>Invitar</Button>
                    <Button color={theme.colors.redSegunda}     buttonStyle={styles.button} onPress={()=>{setLeaveGroup(true)}}>Salir del grupo</Button>
                </View>

                <View style={styles.textGroup}>
                    <Text style={styles.text}>
                        Toca la campana para que tu pana o pelada te haga caso
                    </Text>
                </View>

                <View style={styles.card}>
                    <UserGroupCard />
                </View>

            </View>

            <View style={styles.buttonBot}>

                <Button color={theme.colors.blackSegunda} buttonStyle={styles.buttonBielas} onPress={()=>{navigation.navigate("SupGroups")}}>Pon para las bielas</Button>

            </View>


        </View>

    );
}




const styles = StyleSheet.create({
    container: {

        backgroundColor: theme.colors.whiteSegunda,
        dColor: "gray",
        flex: 3,


    },
    head: {

        justifyContent: 'flex-start',
        paddingTop: theme.separation.headSeparation,
        flex: 0.2,
    },
    body: {

        paddingHorizontal: theme.separation.horizontalSeparation,
        flex: 1.8,

    },
    ButtonContainer: {
        flexDirection: 'row',
        justifyContent: 'center'


    },
    button: {
        borderRadius: 10,
        width: 140,
        height: 41,
        margin: 10,
    },
    text: {
        color: '#7A7A7A',
        fontSize: 12,
    },
    card: {
        flex: 0,
        backgroundColor: theme.colors.greySegunda,
        borderRadius: 10,
        height: 425,
        padding: 15
    },
    textGroup: {
        marginBottom: 25,
        alignItems: 'center'
    },
    buttonBot: {
        flex: 0.35,
        alignItems: 'center',
    },
    buttonBielas:{
        borderRadius: 10,
        width: 180,
        height: 45,
        margin: 10, 
    },
});



