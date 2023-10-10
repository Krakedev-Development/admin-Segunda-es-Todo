
import { StyleSheet, Text, View, Image, Animated, Dimensions, TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import { Card } from '@rneui/themed'
import User from '../../assets/UserExample.png'


export const UserCard = () => {

    let screen = Dimensions.get('window');
    let width = screen.width;
    let height = screen.height;

    let cardHeight = height * 0.23
    let cardWidth = width * 0.84



    return (
        <View style={styles.container}>

            <Card containerStyle={{ width: cardWidth, height: cardHeight, borderRadius: 10, }}>
                <View style={styles.icon}>
                    <Image source={User} style={styles.img} />
                    <View style={styles.text}>
                        <Text style={{ fontSize: 17 }}>Santiago Mosquera</Text>
                        <Text>santi@gmail.com</Text>
                        <Text>0987052604</Text>
                    </View>

                </View>


                <TouchableOpacity style={styles.edit}>
                    <Icon name="edit" size={24} type="font-awesome-5" color={'#F25B0C'} />
                    <Text style={{ color: '#F25B0C' }}>Edita tu informacion</Text>
                </TouchableOpacity>


              

            </Card>
        </View>
    );
};


const styles = StyleSheet.create({
    container: {
        width: 175,
        flexDirection: 'row',
    }, icon: {
        flexDirection: 'row',
        alignItems: 'stretch',
        justifyContent: 'space-between'
    }, text: {
        paddingTop: 15,
        alignItems: 'flex-end',
    }, img: {
        height: 95,
        width: 95,
    }, edit: {
        paddingTop: 15,
        flexDirection: 'row',
        justifyContent: 'center',
    },


});



