import { StyleSheet, Text, View,Image, TouchableOpacity } from 'react-native';
import theme from '../../theme/theme';
import ImagenImport from '../../theme/Images';
import Icon from 'react-native-vector-icons/FontAwesome';

export const ShowCategoryProduct = ({item})=>{
    return(<View style={styles.tarjeta}>
        <View style={{flex: 1, justifyContent: 'center'}}>
            <Image
            source={item.imagen}
            style={{ width: 85, height: 85,borderRadius: 8}}
            resizeMode="cover"
            />
        </View>
        
        <View style={styles.rightSide}>
            <View style={styles.SpacePadding}>
                <Text style={[styles.textBold,styles.nameProduct]}>{item.nombre}</Text>
            </View>

            <View style={[styles.footer,styles.SpacePadding]}>
                <View>
                    <Text style={[styles.texto,styles.descriptionStyle]}>{item.description}</Text>
                    <Text style={[styles.texto,styles.pointsProducto]}>Costo: {item.puntos} pts</Text>
                </View>
                <TouchableOpacity
                    style={styles.button}
                >
                    <Icon name="plus" size={12} type="entypo" color={'white'} />
                </TouchableOpacity>
            </View>
        </View>
        
    </View>
    );
}

const styles = StyleSheet.create({
    tarjeta:{
        flex: 1,
        justifyContent: "flex-start",
        flexDirection: 'row',
        marginVertical: 2,
        paddingVertical: 6,
        paddingLeft: 6,
        paddingRight: 10,
        backgroundColor: theme.colors.greylow,
        borderRadius: 8,
    },
    rightSide:{
        flex: 2.5,
        justifyContent: 'space-around',
    },
    footer:{
        flexDirection: "row",
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    texto:{
        fontFamily: theme.fonts.text,
    },
    textBold:{
        fontFamily: theme.fonts.textBold,
    },
    SpacePadding:{
        paddingLeft: 12,
    },
    nameProduct:{
        fontSize: theme.fontSize.carProducts,
    },
    descriptionStyle:{
        fontSize: 12,
        color: theme.colors.blackSegunda,
        paddingRight: 35,
    },
    pointsProducto:{
        marginTop: 3,
        fontSize: theme.fontSize.pointsCarProductos,
        color: theme.colors.blackSegunda,
    },
    button:{
        position: 'absolute',
        right: 0,
        backgroundColor: theme.colors.orangeSegunda,
        paddingVertical: 12,
        paddingHorizontal: 12,
        borderRadius: 6,
    }
})