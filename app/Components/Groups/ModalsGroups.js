import { StyleSheet,View, Modal, TouchableWithoutFeedback} from 'react-native';
import { 
    ModalScreenCreateGroup,
    ModalScreenShareCodeGroup,
    ModalScreenEnterGroupsCode,
    ModalScreenLeaveGroup
} from './IndividualGroupsModals';

/* CODE EXPLANATION 

    -sendModalVisible/sendModalShareVisible:                 *Recive a Function that changes the state of a boolean const.
    -modalVisibleCrearGrupo/modalShareGroup/modalJoinGroup:  *Recive a boolean const that determine if the Modal is visible or not
    -sendNombreGrupo:                                        *Recive a Function that changes the state of a string const use for the TextInput changes.
    -nombreGrupo:                                            *Recive a String const that is show in TextInput and allow repaint the Screen
    -sendPressButton:                                        *Recive a Function that will be execute on a Modal View Button

Author's name in the file footer
 */


/* Component that call the Modal "Create Group" and "Share Group" when is necesary */
export const ModalCreateNewGroup = (
    {
        /* Modal Create New Group Parameters*/
        sendModalVisible, modalVisibleCrearGrupo, sendNombreGrupo, nombreGrupo, sendPressButton,
        /* Modal Share Link of the New Group Parameters*/
        sendModalShareVisible, modalShareGroup
    }
    ) =>{
    return(
        <View>

            <Modal
                animationType="none"
                transparent={true}
                visible={modalVisibleCrearGrupo}
                onRequestClose={() => {sendModalVisible(!modalVisibleCrearGrupo);}}
            >
                {/* Close the modal when the user clicks outside of it */}
                <TouchableWithoutFeedback onPress={() => sendModalVisible(!modalVisibleCrearGrupo)}>
                    <View style={styles.centeredView}>
                        {/* Call to Modal "Create Group" and pass the parameters that is declarete in other file*/}
                        <ModalScreenCreateGroup
                        sendModalVisible={sendModalVisible} 
                        sendNombreGrupo={sendNombreGrupo} 
                        nombreGrupo={nombreGrupo}
                        sendPressButton={sendPressButton}
                        />
                    </View>

                </TouchableWithoutFeedback> 

            </Modal>

            <ModalShareGroup
                sendModalShareVisible = {sendModalShareVisible}
                modalShareGroup       = {modalShareGroup}
            />

        </View>
    )
}

/* Component that call the Modal "Enter Groups Code" when is necesary */
export const ModalJoinGroup = (
    {
        /* Modal Join Group */
        sendModalVisible, modalJoinGroup, sendGroupsCode, GroupsCode, sendPressButton
    }
    ) =>{
    return(
        <View>
            {/* Declaration of the Modal  */}
            <Modal
                animationType="none"
                transparent={true}
                visible={modalJoinGroup}
                onRequestClose={() => {sendModalVisible(!modalJoinGroup);}}
            >
                {/* Close the modal when the user clicks outside of it */}
                <TouchableWithoutFeedback onPress={() => sendModalVisible(!modalJoinGroup)}>

                    <View style={styles.centeredView}>
                        {/* Call to Modal Enter Groups Code and pass the parameters that is declarete in other file*/}
                        <ModalScreenEnterGroupsCode 
                            sendModalVisible = {sendModalVisible}
                            sendGroupsCode   = {sendGroupsCode} 
                            GroupsCode       = {GroupsCode} 
                            sendPressButton  = {sendPressButton}
                            />
                    </View>

                </TouchableWithoutFeedback> 
            </Modal>

        </View>
    )
}

/* Component that call the Modal "Enter Groups Code" when is necesary */
export const ModalShareGroup = (
    {
        /* Modal Share Group */
        sendModalShareVisible, modalShareGroup
    }
    ) =>{
    return(
        <View>
            {/* Declaration of the Modal  */}
            <Modal
                animationType="none"
                transparent={true}
                visible={modalShareGroup}
                onRequestClose={() => {sendModalShareVisible(!modalShareGroup);}}
            >
                {/* Close the modal when the user clicks outside of it */}
                <TouchableWithoutFeedback onPress={() => sendModalShareVisible(!modalShareGroup)}>
                    <View style={styles.centeredView}>
                        {/* Call to Modal "Share Group" and pass the parameters that is declarete in other file*/}
                        <ModalScreenShareCodeGroup  sendModalVisible={sendModalShareVisible} />
                    </View>

                </TouchableWithoutFeedback> 

            </Modal>

        </View>
    )
}

export const ModalLeaveGroup = (
    {
        /* Modal Share Group */
        sendModalLeaveGroupVisible, modalLeaveGroup
    }
    ) =>{
    return(
        <View>
            {/* Declaration of the Modal  */}
            <Modal
                animationType="none"
                transparent={true}
                visible={modalLeaveGroup}
                onRequestClose={() => {sendModalLeaveGroupVisible(!modalLeaveGroup);}}
            >
                {/* Close the modal when the user clicks outside of it */}
                <TouchableWithoutFeedback onPress={() => sendModalLeaveGroupVisible(!modalLeaveGroup)}>
                    <View style={styles.centeredView}>
                        {/* Call to Modal "Share Group" and pass the parameters that is declarete in other file*/}
                        <ModalScreenLeaveGroup  sendModalVisible={sendModalLeaveGroupVisible} />
                    </View>

                </TouchableWithoutFeedback> 

            </Modal>

        </View>
    )
}

const styles = StyleSheet.create({
    centeredView: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgba(0,0,0, 0.3)'
    },
    });

/* All Code in this file has been written by Enrique Pérez S */