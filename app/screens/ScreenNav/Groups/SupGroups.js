
import { StyleSheet, Text, View, Image, ScrollView, Dimensions, TouchableOpacity, TextInput } from 'react-native';
import { HeadbarGroup } from '../../../PruebaComponents/Headbar'
import theme from "../../../theme/theme";
import Beer from '../../../../assets/imgEjemplos/Beer.png'
import Treasure from '../../../../assets/imgEjemplos/Treasure.png'
import { UsersPoints } from '../../../Components/User/UserData'
import { Button } from '@rneui/themed';

let screen = Dimensions.get('window');
let width = screen.width;
let height = screen.height;

let imgWith = width * 0.4;
let imgHeight = height * 0.2;

let imgTWith = width * 0.1;
let imgTHeight = height * 0.045;


export const SupGroups = ({ navigation }) => {
    return (
        <View style={styles.container}>
            <View style={styles.head}>
                <HeadbarGroup />
            </View>

            <View style={styles.body}>

                <View style={styles.First}>
                    <Text style={{ fontSize: 25, width: width * 0.5, textAlign: 'center' }}>Unete con tus panas y Gana!</Text>

                </View>

                <View style={styles.beer}>
                    <Image
                        source={Beer}
                        style={{ height: imgHeight, width: imgWith }}
                    />
                </View>

                <View style={styles.message}>
                    <Text style={{ fontFamily: theme.fonts.text, fontSize: 21, alignItems: 'center' }}>
                        Con cuanto acolitaras hoy?
                    </Text>
                </View>

                <View style={styles.points}>
                    <Text style={{ fontStyle: theme.fonts.text, fontSize: 18, paddingHorizontal: 10}}>Tus puntos: </Text>
                    <UsersPoints />
                </View>

                <View style={styles.contribute}>

                    <Image
                        source={Treasure}
                        style={{ height: imgTHeight, width: imgTWith }}
                    />

                    <TextInput
                        style={styles.input}
                        keyboardType='numeric'

                    />
                </View>

                <View style={styles.buttonContainer}>
                    <Button color={theme.colors.orangeSegunda} buttonStyle={styles.button}>ACEPTAR</Button>
                    <Text style={{ textAlign: 'center', fontFamily: theme.fonts.text, fontSize: 15, paddingTop: 20, color: '#7A7A7A' }}>Recuerda que una vez aceptado no podrás modificar tu decisión</Text>
                </View>

            </View>

        </View>

    );
}




const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: theme.colors.whiteSegunda,
        dColor: "gray",

    },
    head: {
        flex: 1,
        justifyContent: 'flex-start',
        paddingTop: theme.separation.headSeparation,
    },
    body: {
        flex: 10,
        alignItems: 'center',
        paddingHorizontal: theme.separation.horizontalSeparation,
        

    },
    First: {
        flex: 0.2,

    },
    beer: {
        flex: 0.5,
        alignContent: 'center',
        justifyContent: 'center'


    },
    points: {
        flex: 0.07,
        flexDirection: 'row',
        marginTop: 10,
        justifyContent: 'center'
    },
    contribute: {
        flex: 0.2,
        flexDirection: 'row',
        alignItems: 'center'
    },
    input: {
        borderColor: theme.colors.greySegunda,
        borderWidth: 1,
        marginLeft: 20,
        borderRadius: 10,
        width: 100,
        height: 35,

    },
    message: {
        flex: 0.14,
        backgroundColor: '#FDD844',
        borderRadius: 10,
        justifyContent: 'center',
        paddingHorizontal: 10,
    },
    buttonContainer: {
        flex: 0.35,
        alignItems: 'center'
    },
    button: {
        borderRadius: 10,
        width: 129,
        height: 43,
    },

});



