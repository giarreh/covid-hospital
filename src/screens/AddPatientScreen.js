import React, {useState } from "react";
import {
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  TextInput,
} from "react-native";
import { db } from "../../firebase";
import {
  collection,
  addDoc,
} from "firebase/firestore";

const AddPatientScreen = () => {

    const [NewPatientFName, setNewPatientFName] = useState("");
    const [NewPatientLName, setNewPatientLName] = useState("");
    const patientsCollectionRef = collection(db, "patients");

    const createPatient = async () => {
        await addDoc(patientsCollectionRef, {fName: NewPatientFName, lName: NewPatientLName});
      };

    return(
        <View style={styles.container} behavior="padding">
        <View style={styles.inputContainer}>
          <TextInput
            placeholder="First Name"
            value={NewPatientFName}
            onChangeText={(text) => setNewPatientFName(text)}
            style={styles.input}
          />
          <TextInput
            placeholder="Last name"
            value={NewPatientLName}
            onChangeText={(text) => setNewPatientLName(text)}
            style={styles.input}
          />
        </View>
  
        <View style={styles.buttonContainer}>
          <TouchableOpacity onPress={createPatient} style={styles.button}>
            <Text style={styles.buttonText}>Add Patient</Text>
          </TouchableOpacity>
        </View>
      </View>
    )
}


const styles = StyleSheet.create({
    container: {
      flex: 1,
      justifyContent: "center",
      alignItems: "center",
    },
    inputContainer: {
      width: "80%",
    },
    input: {
      backgroundColor: "white",
      paddingHorizontal: 15,
      paddingVertical: 10,
      borderRadius: 10,
      marginTop: 5,
    },
    buttonContainer: {
      width: "60%",
      justifyContent: "center",
      alignItems: "center",
      marginTop: 40,
    },
    button: {
      backgroundColor: "#0782F9",
      width: "100%",
      padding: 15,
      borderRadius: 10,
      alignItems: "center",
    },
    buttonOutline: {
      backgroundColor: "white",
      marginTop: 5,
      borderColor: "#0782F9",
      borderWidth: 2,
    },
    buttonText: {
      color: "white",
      fontWeight: "700",
      fontSize: 16,
    },
    buttonOutlineText: {
      color: "#0782F9",
      fontWeight: "700",
      fontSize: 16,
    },
  });


export default AddPatientScreen;