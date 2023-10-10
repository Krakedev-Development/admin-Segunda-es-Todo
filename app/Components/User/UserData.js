import { StyleSheet, Text, View, Image} from 'react-native';
import ImagenImport from "../../theme/Images";
import theme from '../../theme/theme';

export const UsersPoints = ({marTop,paddVert}) =>{
    return( 
        <View style={[styles.puntos,{marginTop: marTop, paddingVertical: paddVert,}]}>
            <Image
                source={ImagenImport.coin}
                style={{ width: 20, height: 20 }}
            />
            <Text style={styles.cantidadPuntos}>200</Text>
        </View>
    );
}
const styles = StyleSheet.create({
    puntos:{
        backgroundColor: theme.colors.blackSegunda,
        borderRadius: 50,
        width: 80,
        flexDirection: "row",
        alignItems: 'center',
        justifyContent: "space-evenly",
        
    },
    cantidadPuntos:{
        color: theme.colors.whiteSegunda,
    },
});