import { StyleSheet, Text, View} from 'react-native';
import { Button } from "@rneui/themed";
import theme from '../../theme/theme';


export const ModalScreenAcceptPedido = ({sendModalVisible}) => {
  return (
    <View style={styles.modalView}>

        <View style={styles.header}>
            <Text style={[styles.textHeader,styles.textStyle]}>¿Está seguro de canjear tus puntos?</Text>
        </View>

        <View style={styles.body}>
            <Text style={[styles.modalText,styles.textStyle]}>Recuerde que una vez aceptado no podrá modificar su pedido.</Text>
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

export const ModalScreenDeletePedido = ({sendModalVisible}) => {
  return (
    <View style={styles.modalView}>

        <View style={styles.header}>
            <Text style={[styles.textHeader,styles.textStyle]}>¿Está seguro de eliminar?</Text>
        </View>

        <View style={styles.body}>
          <Text style={[styles.modalText,styles.textStyle]}>
            Recuerde que una vez aceptado se eliminarán los productos del carrito
          </Text>
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

export const ModalLogOut   = ({sendModalVisible}) => {
  return (
    <View style={styles.modalView}>

        <View style={styles.header}>
            <Text style={[styles.textHeader,styles.textStyle]}>¿ ESTÁ SEGURO?</Text>
        </View>

        <View style={styles.body}>
            <Text style={[styles.modalText,styles.textStyle]}>Serás enviado a la pantalla de inicio de sesión </Text>
        </View>

        <View style={styles.buttons}>
            <Button
              title='Aceptar'
              titleStyle={styles.tittleButton}
              buttonStyle={[styles.individualButton,{backgroundColor: theme.colors.orangeSegunda}]}
              onPress={()=>{sendModalVisible(false)}}
            />
            <Button
              title='Volver'
              titleStyle={styles.tittleButton}
              buttonStyle={[styles.individualButton,{backgroundColor: theme.colors.redSegunda}]}
              onPress={()=>{sendModalVisible(false)}}
            />
        </View>
        
    </View>
  );}

const styles = StyleSheet.create({
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
      individualButton:{
        width: 80,
        borderRadius: 10,
      },
      tittleButton:{
        fontSize: theme.fontSize.modalButtons,
        fontFamily: theme.fonts.text,
      },
});