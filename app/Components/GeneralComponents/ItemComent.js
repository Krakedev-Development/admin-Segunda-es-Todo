import React from "react";
import { View, Text, StyleSheet, Image } from "react-native";
import { TouchableOpacity } from "react-native-gesture-handler";
import { ImageUsersImport } from "../../theme/Images";
import theme from "../../theme/theme";
import StyledText from "../../theme/StyledText";
export const ItemComent = ({
  size,
  title,
  onPress,
  border,
  width,
  background,
  icon,
  icon2,
  textSize,
  data,
  date,
}) => {
  const styles = StyleSheet.create({
    container: {
      //   flex: 1,
      marginVertical: 2,
      // justifyContent: "space-around",
      paddingHorizontal: 18,
      alignItems: "center",
      backgroundColor: background ? background : "lightblue",
      height: size ? size : 50,
      minWidth: width ? width : "100%",
      borderRadius: border ? border : 0,
      flexDirection: "row",
    },
    text: {
      fontSize: textSize ? textSize : 20,
      //fontWeight: "bold",
      fontFamily: theme.fonts.textBold,
      color: "white",
      alignItems: "center",
      //textAlign: "center",
      //flex: 1,
    },
    btnIcon: {
      alignItems: "center",
    },
  });

  const formatDateSpanish = (fecha) => {
    if (!fecha) {
      return ""; // Manejo de fecha nula o indefinida
    }

    let newFecha;

    if (fecha?.seconds) {
      newFecha = new Date(fecha.seconds * 1000); // Multiplicamos por 1000 para convertir segundos a milisegundos
    } else {
      newFecha = new Date(fecha);
    }

    const dia = newFecha.getDate();
    const mesIndex = newFecha.getMonth(); // Obtener el índice del mes
    const anio = newFecha.getFullYear();
    const hora = newFecha.getHours();
    const minutos = newFecha.getMinutes();
    const segundos = newFecha.getSeconds();

    const mesesEnEspanol = [
      "enero",
      "febrero",
      "marzo",
      "abril",
      "mayo",
      "junio",
      "julio",
      "agosto",
      "septiembre",
      "octubre",
      "noviembre",
      "diciembre",
    ];

    const nombreMes = mesesEnEspanol[mesIndex];

    const fechaFormateada = `${dia} /${
      mesIndex + 1
    }/${anio} ${hora}:${minutos}`;
    //console.log("FECHA FORMATEADA: ", fechaFormateada);

    return fechaFormateada;
  };

  return (
    // <View>
    <TouchableOpacity onPress={onPress} style={styles.container}>
      {/* {icon ? icon : <></>} */}
      <View
        style={{
          flex: 1,
          //backgroundColor: "red",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Image
          source={data?.imgUrl ? { uri: data?.imgUrl } : ImageUsersImport.user2}
          style={{ width: 32, height: 32, borderRadius: 30 }}
        />
      </View>
      <View
        style={{
          flex: 3,
          //backgroundColor: "pink",
          justifyContent: "center",
          alignItems: "center",
          paddingHorizontal: 10,
        }}
      >
        <View
          style={{ flex: 1, justifyContent: "center", alignItems: "center" }}
        >
          <Text style={styles.text}>
            {data?.name
              ? data?.name.concat(" ", data?.lastName)
              : "#Codigo-User-00..."}
          </Text>
        </View>
        <View
          style={{ flex: 1, justifyContent: "center", alignItems: "center" }}
        >
          <StyledText style={{ color: "white", fontSize: 13 }}>
            {formatDateSpanish(date)}
          </StyledText>
        </View>
      </View>

      <View
        style={{
          flex: 1,
          //backgroundColor: "yellow",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        {icon2 ? icon2 : <></>}
      </View>
    </TouchableOpacity>
    // </View>
  );
};
