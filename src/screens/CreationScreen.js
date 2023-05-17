import { useNavigation } from "@react-navigation/native";
import React, { useEffect, useState } from "react";
import {
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  FlatList,
  Dimensions,
  TextInput,
  KeyboardAvoidingView,
} from "react-native";
import AddPatientScreen from "./AddPatientScreen";
import AddRoomScreen from "./AddRoomScreen";

const CreationScreen = () => {
    const navigation = useNavigation();

    return(
        <View style={styles.container}>
            <TouchableOpacity
            onPress={() => {
            navigation.navigate(AddRoomScreen);
            }}
            style={styles.button}>
            <Text
            style={styles.buttonText}>Add a Room </Text>
            </TouchableOpacity>

            <TouchableOpacity
            onPress={() => {
            navigation.navigate(AddPatientScreen);
            }}
            style={styles.button}>
            <Text
            style={styles.buttonText}>Add a Patient </Text>
            </TouchableOpacity>
        </View>
    )
}
const styles = StyleSheet.create({
    container: {
      flex: 1,
      justifyContent: "center",
      alignItems: "center",
    },
    button: {
      backgroundColor: "#0782F9",
      width: "60%",
      padding: 15,
      borderRadius: 10,
      alignItems: "center",
      marginBottom: 25,
    },
    buttonText: {
      color: "white",
      fontWeight: "700",
      fontSize: 16,
    },
  });
  
export default CreationScreen;