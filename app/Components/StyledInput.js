

import React, { useContext, useEffect, useState } from "react";
import { Image, StyleSheet, TouchableOpacity, View } from "react-native";


import Icons from "./Icons";
import StyledText from "./StyledText";

import theme from "../theme/theme";
import { HelperText, Modal, TextInput } from 'react-native-paper';
export default function StyledInput({ value, onChangeText, label, icon, isIcon,mensajeError }) {
    let hasError
    mensajeError!=null ? hasError=true :hasError=false


    return (
        <View>
            <TextInput
                label={label}
                value={value}
                mode="outlined"
                onChangeText={onChangeText}
                style={styles.entradaCodigo}
                outlineStyle={styles.marcoEntradaCodigo}
                left={
                    isIcon
                        ? <TextInput.Icon
                            icon={icon}
                            iconColor={theme.colors.blackSegunda}
                        />
                        : null
                }
            />

          {hasError?  <HelperText type="error" visible={hasError}>
                {mensajeError}
            </HelperText>:null}
        </View>
    );
}

const styles = StyleSheet.create({
    entradaCodigo: {
        fontFamily: "Lato_400Regular_Italic",
        fontSize: theme.fontSize.body,
        backgroundColor: theme.colors.whiteSegunda,
        marginTop: 5,
        color: theme.colors.grey,
    },
    marcoEntradaCodigo: {
        borderRadius: 15,
        borderColor: theme.colors.greySegunda,
    }
});