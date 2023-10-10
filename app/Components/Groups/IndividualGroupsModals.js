import { StyleSheet, Text, View} from 'react-native';
import { Button } from "@rneui/themed";
import { TextInput } from "react-native-paper";
import theme from '../../theme/theme';
import Icon from 'react-native-vector-icons/FontAwesome';

/* Here are declarete the Screens for Modals Views of the Groups's Screen */

/* Modals for the List Groups Scren */
export const ModalScreenCreateGroup   = ({sendModalVisible, sendNombreGrupo, nombreGrupo, sendPressButton}) => {
    return (
        <View style={styles.modalView}>
        
            <View style={styles.header}>
                <Text style={[styles.textHeader,styles.textStyle]}>Ingresa el nombre del grupo:</Text>
            </View>

            <TextInput  
                label="Nombre del grupo"
                value={nombreGrupo}
                onChangeText={sendNombreGrupo}
                mode="outlined"
                style={styles.entradaNombre}
                outlineStyle={styles.marcoEntradaCodigo}
            />

            <View style={styles.buttons}>

                <Button
                title='Siguiente'
                titleStyle={styles.tittleButton}
                buttonStyle={[styles.buttonStyleCreateGroup,{backgroundColor: theme.colors.orangeSegunda}]}
                onPress={()=>{
                    sendModalVisible(false)
                    sendPressButton(true)
                }}
                />

            </View>
            
        </View>
    );
}

/* Modal for the Specific Group or Create new Group next Modal */
export const ModalScreenShareCodeGroup   = ({sendModalVisible}) => {
    return (
        <View style={styles.modalView}>
        
            <View style={styles.header}>

                <Text style={[styles.textHeader,styles.textStyle]}>Ingresa el nombre del grupo:</Text>

            </View>

            <View style={styles.body}>

                <Text style={[styles.modalText,styles.textStyle]}>Invita a tus panas por whatsapp o copia el código y reenvialo.</Text>

                <View style={styles.shareCodigo}>

                    <View style={styles.codigo}>
                        <Text style={[styles.textStyle,styles.codigoText]}> SAKDJO1289SJD</Text>
                    </View>

                    <View style={styles.copyIcon}>
                        <Icon name='copy' size={24} type='antdesing' color="black"/>
                    </View>
                    
                </View>

                <View style={styles.ShareIcon}>
                        <Icon name='whatsapp' size={70} type='antdesing' color="green"/>
                </View>

            </View>

            <View style={styles.buttons}>

                <Button
                title='Listo'
                titleStyle={styles.tittleButton}
                buttonStyle={[styles.buttonStyleCreateGroup,{backgroundColor: theme.colors.orangeSegunda}]}
                onPress={()=>{
                    sendModalVisible(false)
                }}
                />

            </View>
            
        </View>
    );
}

export const ModalScreenEnterGroupsCode   = ({sendModalVisible, sendGroupsCode, GroupsCode, sendPressButton}) => {
    return (
        <View style={styles.modalView}>
        
            <View style={styles.header}>
                <Text style={[styles.textHeader,styles.textStyle]}>Ingresa el código del grupo:</Text>
            </View>

            <TextInput  
                label="codigo del grupo"
                value={GroupsCode}
                onChangeText={sendGroupsCode}
                mode="outlined"
                style={styles.entradaNombre}
                outlineStyle={styles.marcoEntradaCodigo}
            />

            <View style={styles.buttons}>
                <Button
                title='Listo'
                titleStyle={styles.tittleButton}
                buttonStyle={[styles.buttonStyleCreateGroup,{backgroundColor: theme.colors.orangeSegunda}]}
                onPress={()=>{
                    sendModalVisible(false)
                }}
                />
            </View>
            
        </View>
    );
}

export const ModalScreenLeaveGroup = ({sendModalVisible}) => {
    return (
      <View style={styles.modalView}>
  
          <View style={styles.header}>
              <Text style={[styles.textHeader,styles.textStyle]}>¿Está seguro de dejar el grupo?</Text>
          </View>
  
          <View style={styles.body}>
              <Text style={[styles.modalText,styles.textStyle]}>Vas a peder los puntos aportados al grupo</Text>
          </View>
  
          <View style={styles.buttons}>
              <Button
                title='Si'
                titleStyle={styles.tittleButton}
                buttonStyle={[styles.individualButton,{backgroundColor: theme.colors.orangeSegunda}]}
                onPress={()=>{sendModalVisible(false)}}
              />
              <Button
                title='No'
                titleStyle={styles.tittleButton}
                buttonStyle={[styles.individualButton,{backgroundColor: theme.colors.redSegunda}]}
                onPress={()=>{sendModalVisible(false)}}
              />
          </View>
          
      </View>
    );}

const styles = StyleSheet.create({
    centeredView: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgba(0,0,0, 0.3)'
    },
    modalView: {
        backgroundColor: 'white',
        borderRadius: 10,
        justifyContent: 'space-between',
        width: theme.ViewSize.width,
    },
    header: {
        alignItems: 'center',
        backgroundColor: theme.colors.blackSegunda,
        paddingVertical: 12,
        paddingHorizontal: 10,
        borderTopEndRadius: 10,
        borderTopStartRadius: 10,
    },
    textHeader:{
        fontSize: 18,
        color: theme.colors.whiteSegunda
    },
    body:{
        paddingTop: 10,
    },
    textStyle: {
        fontFamily: theme.fonts.text
    },
    modalText: {
        marginBottom: 15,
        textAlign: 'center',
        color: theme.colors.blackSegunda,
        paddingHorizontal: 30,  
    },
    buttons:{
        flexDirection: 'row',
        justifyContent: 'space-evenly',
        paddingBottom: 15,
    },
    tittleButton:{
        fontSize: theme.fontSize.modalButtons,
        fontFamily: theme.fonts.text,
    },
    individualButton:{
        width: 80,
        borderRadius: 10,
      },

    //Modal Crear Grupo:
    buttonStyleCreateGroup:{
        borderRadius: 10,
        marginTop: 25,
        width: 130,
      },
    //ShareGroup:
    shareCodigo:{
        flexDirection: 'row',
        paddingHorizontal: 15,
    },
    codigo:{
        flex: 4,
        backgroundColor:theme.colors.greySegunda,
        borderRadius: 5,
        height: 30,
        justifyContent: 'center'
    },
    codigoText:{
        fontSize: theme.fontSize.body,
        paddingLeft: 3,
    },
    copyIcon:{
        flex: 1,
        alignItems: 'center'
    },
    ShareIcon:{
        marginTop: 20,
        alignItems: 'center',
    },
    /* Text Input Style */
    entradaNombre:{
        marginHorizontal: 20,
        marginTop: 20,
        height: 35,
    },
    marcoEntradaCodigo:{
        borderRadius: 10,
        borderColor:theme.colors.greySegunda,
        backgroundColor: theme.colors.greySegunda,
    },
    });

/* All Code in this file has been written by Enrique Pérez S */