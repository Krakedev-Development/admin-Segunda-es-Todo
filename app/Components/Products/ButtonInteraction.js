import { StyleSheet, Text, View, TouchableOpacity } from "react-native";
import Icon from "react-native-vector-icons/FontAwesome";
import theme from "../../theme/theme";

export const ButtonItem = ({ amount }) => {
  return (
    <View style={styles.container}>
      <TouchableOpacity>
        <Icon name="plus" size={12} type="entypo" color={"white"} />
      </TouchableOpacity>

      <View>
        <Text style={styles.texto}>{amount}</Text>
      </View>
      <TouchableOpacity>
        <Icon name="minus" size={12} color={"white"} />
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    backgroundColor: theme.colors.blackSegunda,
    width: 86,
    height: 30,
    borderRadius: 20,
    paddingHorizontal: 10,
    alignItems: "center",
    justifyContent: "space-between",
  },
  texto: {
    fontFamily: theme.fonts.text,
    color: theme.colors.whiteSegunda,
  },
});
