import theme from "../theme/theme";
import { ButtonGeneral } from "./GeneralComponents/ButtonGeneral";
import { Image, View, Text } from "react-native";
import IconEntypo from "react-native-vector-icons/FontAwesome5";
import IconMAterialIcons from "react-native-vector-icons/MaterialIcons";
export const ItemPromotion = ({ data, onPress }) => {
  return (
    <View
      style={{
        backgroundColor: "black",
        height: 80,
        flexDirection: "row",
        alignItems: "center",
        padding: 8,
        borderRadius: 5,
        justifyContent: "space-between",
        marginBottom: 3,
        marginHorizontal: 10,
        marginTop: 10,
      }}
    >
      <Image
        source={{
          uri: data?.img
            ? data.img
            : "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ-fEwbH-a-rpzPl-jC96nrvp6oYRyodcISOA&usqp=CAU",
        }}
        style={{ width: 80, height: "100%", borderRadius: 5 }}
      />
      <View
        style={{
          flex: 3,
          paddingHorizontal: 10,
          backgroundColor: "black",
          //   textAlign: "left",
        }}
      >
        <Text
          style={{
            color: "white",
            // textAlign: "center",
            fontSize: 17,
          }}
        >
          {data?.nameProd ? data.nameProd : "Ceviche"}
        </Text>

        <Text
          style={{
            color: "white",
            // textAlign: "center",
            fontSize: 15,
          }}
        >
          {data?.ptos ? data.ptos : "50 ptos"}
        </Text>
      </View>

      <View
        style={{
          flex: 2,
          justifyContent: "space-between",
          // backgroundColor: "cyan",
          color: "white",
          fontSize: 20,
          flexDirection: "row",
        }}
      >
        <ButtonGeneral
          width={40}
          size={40}
          onPress={onPress}
          border={5}
          background={theme.colors.orangeSegunda}
          icon={
            <IconEntypo
              name={"edit"}
              size={20}
              type={"entypo"}
              color={"white"}
            />
          }
        />
        <ButtonGeneral
          width={40}
          size={40}
          onPress={onPress}
          border={5}
          background={theme.colors.redSegunda}
          icon={
            <IconMAterialIcons
              name={"delete-outline"}
              size={25}
              type={"entypo"}
              color={"white"}
            />
          }
        />
      </View>
    </View>
  );
};
