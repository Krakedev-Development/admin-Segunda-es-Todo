
import { StyleSheet, Text, View, Image, TouchableOpacity } from 'react-native';
import { Button } from '@rneui/themed'
import { Card } from '@rneui/themed'
import Icon from 'react-native-vector-icons/FontAwesome';
import Game from '../../assets/Game_Home.png'
import Dices from '../../assets/Dices_Home.png'




export const ButtonBot = () => {
    return (
        <View style={styles.container}>
            <TouchableOpacity onPress={() => console.log('Botón presionado')} style={styles.Button}>
                <Text style={styles.text}>Juegos</Text>
                <Image source={Game} style={styles.img} />
            </TouchableOpacity>
            <TouchableOpacity onPress={() => console.log('Botón presionado')} style={styles.Button}>
                <Text style={styles.text}>Predicciones</Text>
                <Image source={Dices} style={styles.img} />
            </TouchableOpacity>
        </View>
    )
}

export const ButtonBotUser = () => {
    return (
        <View>
            <Card containerStyle={{ borderRadius: 10,  }}>
                <View style={styles.UserButton}>
                    <TouchableOpacity onPress={() => console.log('Botón presionado')} style={styles.styleUserButton}>
                        <View style={styles.icon}> 
                            <Icon name="shopping-cart" size={24} type="entypo" color={'white'} />
                        </View>


                        <View style={styles.textButton}>
                            <Text style={styles.text}>Carrito de compras</Text>
                        </View>

                    </TouchableOpacity>

                    <TouchableOpacity onPress={() => console.log('Botón presionado')} style={styles.styleUserButton}>
                        <View style={styles.icon}>
                            <Icon name="ticket" size={25} type="entypo" color={'white'} />
                        </View>


                        <View style={styles.textButton}>
                            <Text style={styles.text}>Canjear Codigo</Text>
                        </View>

                    </TouchableOpacity>

                    <TouchableOpacity onPress={() => console.log('Botón presionado')} style={styles.styleUserButton}>
                        <View style={styles.icon}>
                            <Icon name="lock" size={24} type="font-awesome-5" color={'white'} />
                        </View>

                        <View style={styles.textButton}>
                            <Text style={styles.text}>Terminos y Condiciones</Text>
                        </View>

                    </TouchableOpacity>
                </View>

            </Card>

        </View>
    )
}



const styles = StyleSheet.create({

    Button: {

        backgroundColor: '#2E2E2E',
        borderRadius: 10,
        padding: 10,
        flexDirection: 'row',
        alignItems: 'center',
        marginRight: 10,
        width: 157,
        height: 48,
        justifyContent: 'space-between',
        shadowColor: 'black',

    },
    text: {
        color: 'white',


    },
    container: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        
    },
    img: {
        width: 40,
        height: 40,
    },
    UserButton: {
        alignItems: 'stretch'
    },
    styleUserButton: {
        backgroundColor: '#2E2E2E',
        borderRadius: 5,
        marginBottom: 10,
        flexDirection: 'row',
        padding: 10,
    },
    textButton: {
        flex: 2,
    },
    icon: {
        paddingRight: 20,
        flex: 1,
        alignItems: 'flex-end',
    },

});
