import { Button, Input, Icon } from "@rneui/base"
import { useContext, useState } from "react"
import { View, StyleSheet, Text, Alert, ScrollView } from "react-native"
import { CrearUsuario } from "../../Services/AutenticacionSrv"
import { HelperText, Modal, TextInput } from 'react-native-paper';
import { Image } from '@rneui/themed';
import { guardarUSuario } from "../../Services/Usuarios";
import theme from '../../theme/theme'
import { PedidoContext } from "../../context/PedidosContext";
import StyledText from "../../theme/StyledText";
import StyledInput from "../../Components/StyledInput";
import { Calendar, CalendarUtils } from 'react-native-calendars';


export const Registrar = ({ navigation }) => {
    const { user, setUser } = useContext(PedidoContext);
    const [nombre, setNombre] = useState();
    const [Correo, setCorreo] = useState();
    const [clave, setClave] = useState();
    const [confirmar, setConfirmar] = useState();
    const [uid, setuid] = useState("");
    const [cambiarOjo, setCambiarOjo] = useState(true);
    const [cambiarOjo2, setCambiarOjo2] = useState(true);

    const [hasErrorusuario, sethasErrorusuario] = useState(false)
    const [hasErrorcedula, sethasErrorcedula] = useState(false)
    const [hasErrorcorreo, sethasErrorcorreo] = useState(false)
    const [hasErrorclave, sethasErrorclave] = useState(false)
    const [hasErrorconfirmacion, sethasErrorconfirmacion] = useState(false)
    const [selected, setSelected] = useState('');
    
    const [mensajeUsuario, setmensajeusuario] = useState("")
    const [mensajeCedula, setmensajecedula] = useState("")
    const [mensajeCorreo, setmensajecorreo] = useState("")
    const [mensajeclave, setmensajeclave] = useState("")
    const [mensajeConfirmacion, setmensajeconfirmacion] = useState("")
    const emailRegex = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/;

    const contraseñaRegex = /^(?=\w*\d)(?=\w*[A-Z])(?=\w*[a-z])\S{8,16}$/;


    const validaciones = () => {
        if (nombre == null || nombre == "") {
            sethasErrorusuario(true)
            setmensajeusuario("Ingrese un nombre")

        } else {
            sethasErrorusuario(false)

        }

        if (Correo == null || Correo == "") {
            sethasErrorcorreo(true)
            setmensajecorreo("Ingrese un correo")

        } else {
            sethasErrorcorreo(false)

        }
        if (clave == null || clave == "") {
            sethasErrorclave(true)
            setmensajeclave("Ingrese una contraseña")
        } else {
            sethasErrorclave(false)
            if (!contraseñaRegex.test(clave)) {
                setmensajeclave("Contraseña no valida \nIntente  nuevamente \nRecuerde que debe tener 1 Mayúscula  y 1 número");
                sethasErrorclave(true)



            } else {

                sethasErrorclave(false)
            }



        }
        if (confirmar == null || confirmar == "") {
            sethasErrorconfirmacion(true)
            setmensajeconfirmacion("Ingrese una confirmacion de contraseña")

        } else {
            sethasErrorclave(false)
            if (clave == confirmar) {
                console.log("COINCIDEN SIGUE ADELANTE VIAJERO")
                if (!contraseñaRegex.test(confirmar)) {
                    setmensajeclave("Contraseña no valida \nIntente  nuevamente \nRecuerde que debe tener 1 Mayúscula  y 1 número");
                    sethasErrorclave(true)



                } else {

                    crearUsuario();
                    // setModalVisible(true)
                    sethasErrorclave(false)
                }

            } else {
                console.log("NO COINCIDEN")
                sethasErrorclave(true)
                sethasErrorconfirmacion(true)
                setmensajeclave("Contraseña No Coincide")
                setmensajeconfirmacion("Contraseña No Coincide")

            }
        }

        if (hasErrorconfirmacion && hasErrorclave && hasErrorcorreo && hasErrorcedula && hasErrorusuario) {

            return null;
        } else {
            if (clave == confirmar) {

                console.log("COINCIDEN SIGUE ADELANTE VIAJERO")
                crearUser()
                sethasErrorclave(false)
                sethasErrorconfirmacion(false)
            } else {
                console.log("1.", clave, "2.", Q1)
                console.log("NO COINCIDEN")
                sethasErrorclave(true)
                sethasErrorconfirmacion(true)
                setmensajeclave("Contraseña No Coincide")
                setmensajeconfirmacion("Contraseña No Coincide")
            }

        }

    }

    const crearUser = async () => {

        try {
            await CrearUsuario(Correo, clave, setUser);
            console.log("uiID", global.userId)
            console.log("uiID2", uid)
            console.log("Usuario:", {
                nombre: nombre,
                correo: Correo,
                clave: clave,
                identificacion: global.userId
            })
            await guardarUSuario({
                nombre: nombre,
                correo: Correo,
                clave: clave,
                identificacion: global.userId
            });



        } catch (error) {

        }


    }



    const crearUsuario = () => {



        crearUser();
        console.log("User---------------------", user)

        navigation.navigate("LoginNav");

    }

    return <View style={styles.container}>


        <View style={styles.cajaCabecera}>
            <Image
                source={require("../../../assets/logoWhiteSi.png")}
                style={{ width: 500, height: 160, margin: 1, resizeMode: "contain" }}
            />
        </View>
        <View style={styles.cajaCuerpo} >

            <Text style={{ fontSize: theme.fontSize.title, textAlign: "center" }}>Registro</Text>
            <StyledInput
                label="¿A donde llegan tus notas?"
                value={Correo}
                isIcon={false}
                icon="tag-multiple-outline"
                onChangeText={setCorreo}

            />



            <StyledInput
                label="¿Como te puso tu mamá?"
                value={nombre}
                isIcon={false}
                icon="tag-multiple-outline"
                onChangeText={setNombre}

            />

            <StyledInput
                label='La que no compartes con tu novia'
                value={clave}
                isIcon={false}
                icon="tag-multiple-outline"
                onChangeText={setClave}

            />
            <StyledInput
                label='Confirma para confirmar'
                value={confirmar}
                isIcon={false}
                icon="tag-multiple-outline"
                onChangeText={setConfirmar}

            />

            <Calendar
                onDayPress={day => {
                    setSelected(day.dateString);
                }}
                markedDates={{
                    [selected]: { selected: true, disableTouchEvent: true, selectedDotColor: 'orange' }
                }}
            />
            <Button
                title='Crear Usuario'
                onPress={validaciones}
                buttonStyle={{ borderRadius: 10, backgroundColor: theme.colors.greySegunda, alignSelf: "center", justifyContent: "center" }}
                containerStyle={{
                    width: 200,
                    paddingTop: 40,
                    alignSelf: "center"
                }}
            />
        </View>












    </View>
}




const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#2e2e2e",
        //alignItems: 'center',
        alignItems: "center",
        justifyContent: "center",
        // padding: 10,
    },
    cajaCabecera: {
        //backgroundColor: 'cyan',
        flex: 2,
        alignItems: "center",

        justifyContent: "flex-start",
        padding: 100,
    },
    cajaCuerpo: {
        //backgroundColor: 'brown',
        flex: 10,
        // alignItems: "stretch",
        paddingHorizontal: 30,
        justifyContent: "flex-start",
        paddingTop: "10%",
        borderTopStartRadius: 15,
        borderTopEndRadius: 15,
        backgroundColor: "#ffffff",
        width: theme.ViewSize.maxWidth,

    },
    titulo: {
        fontSize: 16,
        fontWeight: "bold",
        paddingBottom: 39,
    },
    cajaBotones: {
        paddingBottom: 10,
        alignItems: "center",
        justifyContent: "flex-start",
        flex: 4,
    },

    txtinput: {
        borderWidth: 1,
        paddingVertical: 10,
        paddingHorizontal: 15,
        borderRadius: 10,
        borderColor: "gray",
        width: 310,
        height: 50,
    },
    label: {
        zIndex: 100,
        position: "absolute",
        backgroundColor: "white",
        top: -11,
        left: 10,
        marginLeft: 11,
    },
    centeredView: {
        flex: 1,
        justifyContent: "center",
        // alignItems: 'center',
        marginTop: "10%",
        // backgroundColor: 'red',
    },
    modalView: {
        backgroundColor: "white",
        borderRadius: 20,
        paddingTop: "5%",
        paddingHorizontal: "20%",
        justifyContent: "space-around",
        paddingBottom: "5%",
        alignItems: "center",
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 4,
        elevation: 5,
    },
    button: {
        borderRadius: 20,
        padding: 10,
        elevation: 2,
    },
    buttonOpen: {
        backgroundColor: "#F194FF",
    },
    buttonClose: {
        backgroundColor: "#2196F3",
    },
    textStyle: {
        color: "white",
        fontWeight: "bold",
        textAlign: "center",
    },
    modalText: {
        marginBottom: 15,
        textAlign: "center",
    },
    logo: {
        marginVertical: 20,
        resizeMode: "center",
    }, entradaCodigo: {
        fontFamily: "Lato_400Regular_Italic",
        fontSize: theme.fontSize.body,
        backgroundColor: theme.colors.whiteSegunda,
        marginTop: 20,
        color: theme.colors.grey,
    },
    marcoEntradaCodigo: {
        borderRadius: 15,
        borderColor: theme.colors.greySegunda,
    }
});
