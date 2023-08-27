
import { StyleSheet} from "react-native";
import { LogBox } from "react-native";
import { useEffect } from "react";

import { db } from "./firebase";
import {
  collection,
  getDocs,
  addDoc,
  Timestamp,
} from "firebase/firestore";
import {
  randomBreathRate,
  randomheartRate,
  randomOxygenSatLvl,
} from "./src/utils/generateData";
import LoginScreen from "./src/screens/LoginScreen";
import HomeScreen from "./src/screens/HomeScreen";
import RoomScreen from "./src/screens/RoomScreen";
import DetailedRoomScreen from "./src/screens/DetailedRoomScreen";
import AddRoomScreen from "./src/screens/AddRoomScreen";
import CreationScreen from "./src/screens/CreationScreen";
import AddPatientScreen from "./src/screens/AddPatientScreen";
import AddMeasurementsScreen from "./src/screens/AddMeasurementsScreen";
import ExportScreen from "./src/screens/ExportScreen";
import EditRoomScreen from "./src/screens/EditRoomScreen";
import { Entypo, Ionicons, MaterialIcons } from "@expo/vector-icons";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { NavigationContainer, DefaultTheme } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();

function TabNavigator() {
  return (
    <Tab.Navigator>
      <Tab.Screen
        options={{
          unmountOnBlur: true,
          tabBarLabel: "Home",
          tabBarIcon: () => <Ionicons name="home" size={24} color="black" />,
        }}
        name="Home"
        component={HomeScreen}
      />
      <Tab.Screen
        name="Room"
        component={RoomScreen}
        options={{
          unmountOnBlur: true,
          tabBarLabel: "Room",
          tabBarIcon: () => (
            <MaterialIcons name="meeting-room" size={24} color="black" />
          ),
        }}
      />
      <Tab.Screen
        options={{
          tabBarLabel: "Creation",
          tabBarIcon: () => <Ionicons name="create" size={24} color="black" />,
        }}
        name="Creation"
        component={CreationScreen}
      />
      <Tab.Screen
        options={{
          tabBarLabel: "Export",
          tabBarIcon: () => <Entypo name="export" size={24} color="black" />,
        }}
        name="Export"
        component={ExportScreen}
      />
    </Tab.Navigator>
  );
}

const myTheme = {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
    primary: 'rgb(33, 36, 45)',
    background: 'rgb(33, 36, 45)',
  },
}

export default function App() {
  LogBox.ignoreLogs(["Setting a timer for a long period of time"]);
  LogBox.ignoreLogs(["AsyncStorage has been extracted from react-native"]);
  LogBox.ignoreLogs(["This can break usage such as persisting and restoring state."]);
  LogBox.ignoreLogs(["AsyncStorage has been extracted from react-native core and will be removed in a future release. It can now be installed and imported from '@react-native-async-storage/async-storage' instead of 'react-native'. See https://github.com/react-native-async-storage/async-storage"]);
  useEffect(() => {
    const interval = setInterval(async () => {
      const roomCollectionRef = collection(db, "rooms");
      const measurementsCollectionRef = collection(db, "measurements");
      const rooms = await getDocs(roomCollectionRef);
      const roomsData = rooms.docs.map((doc) => ({
        ...doc.data(),
        id: doc.id,
      }));
      roomsData.forEach(async (room) => {
        if (room.patientID != "") {
          await addDoc(measurementsCollectionRef, {
            patientID: room.patientID,
            heartRate: randomheartRate(),
            breathRate: randomBreathRate(),
            oxygenSatLvl: randomOxygenSatLvl(),
            date: Timestamp.now(),
          });
        }
      });
    }, 60000);

    return () => clearInterval(interval);
  }, []);

  return (
    <NavigationContainer theme={myTheme}>
      <Stack.Navigator>
        <Stack.Screen
          options={{ headerShown: false }}
          name="Login"
          component={LoginScreen}
        />
        <Stack.Screen
          options={{ headerShown: false, title: "" }}
          name="TabNavigator"
          component={TabNavigator}
        />
        <Stack.Screen
          options={{ title: "" }}
          name="DetailedRoom"
          component={DetailedRoomScreen}
        />
        <Stack.Screen
          options={{ title: "" }}
          name="AddRoomScreen"
          component={AddRoomScreen}
        />
        <Stack.Screen
          options={{ title: "" }}
          name="EditRoomScreen"
          component={EditRoomScreen}
        />
        <Stack.Screen
          options={{ title: "" }}
          name="AddPatientScreen"
          component={AddPatientScreen}
        />
        <Stack.Screen
          options={{ title: "" }}
          name="AddMeasurements"
          component={AddMeasurementsScreen}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});
