import React, { useEffect, useState } from "react";
import {
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  TextInput,
  KeyboardAvoidingView,
} from "react-native";
import { db } from "../../firebase";
import { collection, getDocs, addDoc } from "firebase/firestore";

const AddRoomScreen = () => {
  const [NewRoomName, setNewRoomName] = useState("");
  const [NewRoomNumber, setNewRoomNumber] = useState();
  const roomsCollectionRef = collection(db, "rooms");

  const createRoom = async () => {
    await addDoc(roomsCollectionRef, {
      roomName: NewRoomName,
      roomNumber: NewRoomNumber,
      patientID: "",
    });
  };

  return (
    <View style={styles.container} behavior="padding">
      <View style={styles.inputContainer}>
        <TextInput
          placeholder="Room name"
          value={NewRoomName}
          onChangeText={(text) => setNewRoomName(text)}
          style={styles.input}
        />
        <TextInput
          placeholder="Room number"
          value={NewRoomNumber}
          onChangeText={(text) => setNewRoomNumber(text)}
          style={styles.input}
        />
      </View>

      <View style={styles.buttonContainer}>
        <TouchableOpacity onPress={createRoom} style={styles.button}>
          <Text style={styles.buttonText}>Create room</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

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

export default AddRoomScreen;
