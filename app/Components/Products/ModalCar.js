import { StyleSheet,View,Modal,TouchableWithoutFeedback} from 'react-native';
import { ModalScreenAcceptPedido, ModalScreenDeletePedido } from "./IndividualProductsModals";

/* CODE EXPLANATION 

    -sendModalVisible:                          *Recive a Function that changes the state of a boolean const.
    -modalCanjearVisible/modalCancelarVisible:  *Recive a boolean const that determine if the Modal is visible or not
    -sendPressButton:                           *Recive a Function that will be execute on a Modal View Button

Author's name in the file footer
 */

export const ModalReddeemProduct  = (
    {
        modalCanjearVisible,
        sendModalVisible,

    }) =>{return( 
    <View>     
        <Modal
            animationType="none"
            transparent={true}
            visible={modalCanjearVisible}
            onRequestClose={() => {sendModalVisible(!modalCanjearVisible);}}
        >
            {/* Close the modal when the user clicks outside of it */}
            <TouchableWithoutFeedback onPress={() => sendModalVisible(!modalCanjearVisible)}>
                <View style={styles.centeredView}>
                    {/* Call to Modal "Accept Pedido" and pass the parameters that is declarete in other file*/}
                    <ModalScreenAcceptPedido sendModalVisible={sendModalVisible}/>
                </View>
            </TouchableWithoutFeedback>

        </Modal>
    </View>)
}

export const ModalDeleteProduct  = (
    {
        modalCancelarVisible,
        sendModalVisible

    }) =>{return( 
    <View>
        <Modal
            animationType="none"
            transparent={true}
            visible={modalCancelarVisible}
            onRequestClose={() => {sendModalVisible(!modalCancelarVisible);}}
        >
            {/* Close the modal when the user clicks outside of it */}
            <TouchableWithoutFeedback onPress={() => sendModalVisible(!modalCancelarVisible)}>
                <View style={styles.centeredView}>
                    {/* Call to Modal "Delete Pedido" and pass the parameters that is declarete in other file*/}
                    <ModalScreenDeletePedido sendModalVisible={sendModalVisible}/>
                </View>
            </TouchableWithoutFeedback>

        </Modal>
    </View>)
}

const styles = StyleSheet.create({
    centeredView: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgba(0,0,0, 0.3)',
      },
});