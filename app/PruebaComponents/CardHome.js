
import { StyleSheet, Text, View, Image, Animated, Dimensions } from 'react-native';
import CardImg from '../../assets/card.jpg'
import Icon from 'react-native-vector-icons/FontAwesome';
import { Card } from '@rneui/themed'
import theme from '../theme/theme';

export const CardHome = () => {

    let screen = Dimensions.get('window');
    let width = screen.width;
    let height = screen.height;

    let cardHeight = height * 0.277
    let cardWidth = width * 0.44

    let imgHeight = height * 0.17
    let imgWidth = width * 0.43


    return (
        <View style={styles.container}>
            <Image
                source={CardImg} style={{ width: imgWidth, height: imgHeight, borderTopLeftRadius: 5, borderTopRightRadius: 5 }}
            />

            <View style={styles.cardbody}>
                <Text style={styles.title}>
                    Super Bowl cerdo
                </Text>
                <Text style={styles.Descripcion}>
                    Mezcla perfecta de arroz amarillo, frejol, guacamole
                </Text>

                <View style={styles.plus}>
                    <Icon name='plus' size={24} color='#F25B0C' type='antdesing' />
                </View>

            </View>
        </View>
    );
};


const styles = StyleSheet.create({
    container: {
        height: 200,
        borderRadius: 5,
        marginRight: 0,
        width: theme.separation.cardSeparation,
        height: theme.separation.cardheight,
        backgroundColor: theme.colors.whiteSegunda,
        elevation: 10,
        marginRight: 5,
        marginLeft: 1,

    },
    cardbody: {
        paddingHorizontal: 5,

    },
    title: {
        width: 137,
        height: 20,
        flexDirection: 'column',
        color: '#000',
        fontSize: 13,
        fontStyle: 'normal',
        fontWeight: "400",
        paddingTop: 5,

    },
    Descripcion: {
        width: 163,
        height: 28,
        flexDirection: 'column',
        color: '#9DB2CE',
        fontSize: 11,
        fontStyle: 'normal',
        fontWeight: "400",

    },
    plus: {

        paddingTop: 5,
        borderRadius: 100,
        alignItems: 'flex-end',

    },
});



