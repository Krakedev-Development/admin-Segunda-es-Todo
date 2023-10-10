
import { StyleSheet, Text, View, Image, Animated, Dimensions, TouchableOpacity, FlatList } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import { Card } from '@rneui/themed'
import theme from '../theme/theme';

import Crown from '../../assets/imgEjemplos/Crown.png'
import Alarm from '../../assets/imgEjemplos/Alarm.png'
import {ImageUsersImport} from '../theme/Images'


let screen = Dimensions.get('window');
let width = screen.width;
let height = screen.height;

let cardHeight = height * 0.1
let cardWidth = width * 0.8


//Screen user groups


const users = [
    { id: 1, name: 'Julio Perez', coin: '200', Imagen: ImageUsersImport.user1 },
    { id: 2, name: 'Marlon Lalangui', coin: '100', Imagen: ImageUsersImport.user2},
    { id: 3, name: 'Juan Perez', coin: '10', Imagen: ImageUsersImport.user3 },
];

const renderCard = ({ item }) => {
    const isUserWithId1 = item.id === 1;
    return (
        <View style={styles.cardUser}>
            <Image
                source={item.Imagen}
                style={styles.imgUser}
            />
            <View style={styles.bodyCard}>

                <View style={styles.nameCard}>

                    {isUserWithId1 && (
                        <View >
                            <Image
                                source={Crown}
                                style={styles.imgCrown}
                            />
                        </View>
                    )}
                    <Text style={styles.title}>{item.name}</Text>


                </View>

                <View style={styles.coinCard}>
                    <Text style={styles.coin}>Aporto: </Text>
                    <Text style={styles.coin}>{item.coin}</Text>
                    <Text style={styles.coin}> pts</Text>
                </View>

            </View>

            <View style={styles.AlarmCard}>
                <Image
                    source={Alarm}
                    style={styles.imgAlarm}
                />
            </View>


        </View>
    );
};


export const UserGroupCard = () => {
    return (
        <FlatList
            data={users}
            renderItem={renderCard}
            keyExtractor={(item, index) => index.toString()}
        />
    );
}




//Screen users



export const GroupCard = () => {

    return (
        <View style={styles.container}>

            <Card containerStyle={styles.card}>

                <View style={styles.aling}>

                    <View style={{ flex: 1 }}>
                        <Text style={styles.title}>Chupiza</Text>
                        <Text style={styles.Panas}>
                            3 panas
                        </Text>
                    </View>

                    <View style={{ flex: 2, flexDirection: 'row', justifyContent: 'center', alignItems: 'flex-end' }}>
                        <Image
                            source={ImageUsersImport.user1}
                            style={styles.img}
                        />
                        <Image
                            source={ImageUsersImport.user2}
                            style={styles.img}
                        />
                        <Image
                            source={ImageUsersImport.user3}
                            style={styles.img}
                        />
                    </View>

                    <View style={{ justifyContent: 'center' }}>
                        <Icon name='bars' size={20} color={theme.colors.whiteSegunda} />
                    </View>

                </View>
            </Card>
        </View>
    );
};




const styles = StyleSheet.create({
    container: {
        width: 175,
        flexDirection: 'row',

    },
    card: {
        width: cardWidth,
        height: cardHeight,
        backgroundColor: theme.colors.blackSegunda,
        borderRadius: 10,

    },
    aling: {
        flexDirection: 'row',
    },
    texto: {

    },
    title: {
        color: theme.colors.whiteSegunda,
        fontFamily: theme.fonts.text,
        fontSize: 18,
    }, Panas: {
        color: theme.colors.whiteSegunda,

    }, img: {
        width: 35,
        height: 35,
        borderRadius: 100,
        marginRight: 5
    },
    imgUser: {
        flex: 0.8,
        width: 35,
        height: 55,
        borderRadius: 100,
        margin: 10
    },
    cardUser: {
        width: cardWidth,
        height: cardHeight,
        backgroundColor: theme.colors.blackSegunda,
        flexDirection: 'row',
        borderRadius: 10,
        marginBottom: 10,
        flex: 3,
    },
    imgCrown: {
        width: 25,
        height: 25,
        marginRight: 5,
    },
    bodyCard: {
        flexDirection: 'column',
        justifyContent: 'center',
        flex: 2

    },
    nameCard: {
        flexDirection: 'row',
        alignItems: 'center'
    },
    coin: {
        color: theme.colors.whiteSegunda,
        fontSize: 13,
    },
    coinCard: {
        flexDirection: 'row'
    },
    imgAlarm: {

        width: 35,
        height: 35,
        marginTop: 10,

    },
    AlarmCard:{
       flex: 1,
       alignItems: 'center',
       paddingTop: 10,
    },




});



