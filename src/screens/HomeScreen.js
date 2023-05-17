import { useNavigation } from "@react-navigation/native";
import React, { useEffect, useState } from "react";
import {
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  FlatList,
  ScrollView
} from "react-native";
import { auth } from "../../firebase";
import { db } from "../../firebase";
import {
  collection,
  getDocs,
  addDoc,
  updateDoc,
  deleteDoc,
  doc,
} from "firebase/firestore";

import RoomComponent from "../components/RoomComponent";

const HomeScreen = () => {
  const navigation = useNavigation();
  const [rooms, setRooms] = useState({});

  useEffect(() => {
    const fetchRooms = async () => {
      const roomCollectionRef = collection(db, "rooms");
      const data = await getDocs(roomCollectionRef);
      setRooms(data.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
    };
    fetchRooms();
  }, []);

  const handleSignOut = () => {
    auth
      .signOut()
      .then(() => {
        navigation.replace("Login");
      })
      .catch((error) => alert(error.message));
  };

  return (
    <View style={styles.container}>
      <Text style={styles.text}></Text>
      <Text style={styles.text}>Welcome to Covid Monitoring App</Text>
      <Text style={styles.text}></Text>
      <Text style={styles.text}>Select a room below</Text>
      <Text style={styles.text}></Text>
      <FlatList
        data={rooms}
        renderItem={(roomItem) => <RoomComponent item={roomItem} />}
        keyExtractor={(item) => item.id}
      />
      <TouchableOpacity onPress={handleSignOut} style={styles.button}>
        <Text style={styles.buttonText}>Sign out</Text>
      </TouchableOpacity>
      <Text style={styles.text}></Text>
    </View>
  );
};

export default HomeScreen;

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
  },
  buttonText: {
    color: "white",
    fontWeight: "700",
    fontSize: 16,
  },
  text: {
    fontSize: 20,
    padding: 5,
    color: "white",
    textAlign: "center",
  },
});
