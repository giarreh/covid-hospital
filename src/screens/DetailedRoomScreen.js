import { useNavigation } from "@react-navigation/native";
import React, { useEffect, useState } from "react";
import {
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  FlatList,
  Dimensions,
  ScrollView,
} from "react-native";
import { auth } from "../../firebase";
import { db } from "../../firebase";
import {
  collection,
  getDoc,
  getDocs,
  addDoc,
  updateDoc,
  deleteDoc,
  doc,
  orderBy,
  limit,
  query,
  where,
  Timestamp,
} from "firebase/firestore";
import { LineChart } from "react-native-chart-kit";
import {
  randomBreathRate,
  randomheartRate,
  randomOxygenSatLvl,
} from "../utils/generateData";
import {Entypo, FontAwesome, FontAwesome5} from '@expo/vector-icons';

const DetailedRoomScreen = ({ route }) => {
  const navigation = useNavigation();
  const { data } = route.params;
  const [measurements, setMeasurements] = useState([]);

  useEffect(() => {
    const fetchMeasurements = async () => {
      if (data.id) {
        const measurementsCollectionRef = collection(db, "measurements");
        const newData = await getDocs(
          query(
            measurementsCollectionRef,
            orderBy("date", "desc"),
            where("patientID", "==", data.id),
            limit(10)
          )
        );
        setMeasurements(
          newData.docs.map((doc) => ({ ...doc.data(), id: doc.id })).reverse()
        );
      }
    };
    fetchMeasurements();
  }, []);

  useEffect(() => {
    const interval = setInterval(async () => {
      if (data.id) {
        const measurementsCollectionRef = collection(db, "measurements");
        const newData = await getDocs(
          query(
            measurementsCollectionRef,
            orderBy("date", "desc"),
            where("patientID", "==", data.id),
            limit(10)
          )
        );
        setMeasurements(
          newData.docs.map((doc) => ({ ...doc.data(), id: doc.id })).reverse()
        );
      }
    }, 60000);

    return () => clearInterval(interval);
  }, []);

  const handleSignOut = () => {
    auth
      .signOut()
      .then(() => {
        navigation.replace("Login");
      })
      .catch((error) => alert(error.message));
  };

  const width = Dimensions.get("window").width;
  const height = 220;
  const chartconfig = {
    backgroundColor: "#022173",
    backgroundGradientFrom: "#022173",
    backgroundGradientTo: "#1b3fa0",
    color: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
    style: {
      borderRadius: 16,
    },
  };
  const chartconfig_heartrate = {
    backgroundColor: "#f52f2f",
    backgroundGradientFrom: "#f52f2f",
    backgroundGradientTo: "#f52f84",
    color: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
    style: {
      borderRadius: 16,
    },
  };

  const chartconfig_oxygenSat = {
    backgroundColor: "#0d85db",
    backgroundGradientFrom: "#0d85db",
    backgroundGradientTo: "#2a8dd4",
    color: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
    style: {
      borderRadius: 16,
    },
  };
  if (measurements.length > 0) {
    const dataBreathRate = {
      labels: measurements.map((el) =>
        String(
          new Date(el.date.toDate()).toLocaleTimeString("no-NO", {
            hour: "2-digit",
            minute: "2-digit",
          }).replace(/(:\d{2}| [AP]M)$/, "")
        )
      ),
      datasets: [
        {
          data: measurements.map((el) => parseInt(el.breathRate)),
        },
      ],
    };

    const dataHeartRate = {
      labels: measurements.map((el) =>
        new Date(el.date.toDate()).toLocaleTimeString("no-NO", {
          hour: "2-digit",
          minute: "2-digit",
        }).replace(/(:\d{2}| [AP]M)$/, "")
      ),
      datasets: [
        {
          data: measurements.map((el) => parseInt(el.heartRate)),
        },
      ],
    };

    const dataOxygenSatLvlRate = {
      labels: measurements.map((el) =>
        new Date(el.date.toDate()).toLocaleTimeString("no-NO", {
          hour: "2-digit",
          minute: "2-digit",
        }).replace(/(:\d{2}| [AP]M)$/, "")
      ),
      datasets: [
        {
          data: measurements.map((el) => el.oxygenSatLvl),
        },
      ],
    };
    return (
      <ScrollView style={styles.container}>
        <Text
        style={styles.textTitle}>
          Detailed information for patient {data.fName} {data.lName}
        </Text>

        <Text
        style={styles.text}>
        <FontAwesome name="heartbeat" size={26} color="red" /> Heart Rate</Text>
        <LineChart
          style={styles.chart}
          data={dataHeartRate}
          width={width}
          height={height}
          chartConfig={chartconfig_heartrate}
        />

        <Text
        style={styles.text}>
        <Entypo name="air" size={26} color="blue"/> Oxygen Saturation Level</Text>
        <LineChart
          style={styles.chart}
          data={dataOxygenSatLvlRate}
          width={width}
          height={height}
          chartConfig={chartconfig_oxygenSat}
        />

        <Text
        style={styles.text}><FontAwesome5 name="lungs" size={24} color="pink" /> Breath Rate</Text>
        <LineChart
          style={styles.chart}        
          data={dataBreathRate}
          width={width}
          height={height}
          chartConfig={chartconfig}
        />



      </ScrollView>
    );
  } else {
    return <Text style={styles.textTitle}>Loading...</Text>;
  }
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  chart: {
    marginBottom: 15,
  },
  textTitle: {
    textAlign: "center",
    fontSize: 32,
    marginBottom: 15,
    color: "white",
  },
  text: {
    textAlign: "center",
    fontSize: 26,
    color: "white",
  },
})
export default DetailedRoomScreen;
