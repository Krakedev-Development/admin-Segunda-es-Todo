import { StyleSheet, Text, View,Image } from 'react-native';
import theme from '../../theme/theme';
import { ButtonItem } from './ButtonInteraction';

export const MostrarProducto = ({item})=>{
    return(<View style={styles.tarjeta}>
        <Image
          source={item.imagen}
          style={{ width: 80, height: 80,borderRadius: 8, flex: 1,}}
          resizeMode="cover"
        />
        <View style={styles.rightSide}>
            <View style={styles.SpaceName}>
                <Text style={[styles.textBold,styles.nameProduct]}>{item.nombre}</Text>
            </View>
            
            <View style={styles.footer}>
                <Text style={[styles.texto,styles.pointsProducto]}>{item.puntos} pts</Text>
                <ButtonItem amount={item.cantidad}/>
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
        paddingLeft: 19,
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
    SpaceName:{
        paddingLeft: 12,
    },
    nameProduct:{
        fontSize: theme.fontSize.carProducts,
    },
    pointsProducto:{
        fontSize: theme.fontSize.pointsCarProductos,
        color: theme.colors.redSegunda,
    }
})