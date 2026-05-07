import { useState } from "react";
import { StyleSheet, Image, Platform } from "react-native";
import { AnimatedRegion, Marker } from "react-native-maps";

interface TruckMarkerProps {
  coordinate: AnimatedRegion;
  rotation: number;
}

export function TruckMarker({ coordinate, rotation }: TruckMarkerProps) {
  const [tracksViewChanges, setTracksViewChanges] = useState(true);
  const truckImage = require("../../assets/caminhao-referencia.png");

  return (
    <Marker.Animated
      coordinate={coordinate}
      rotation={rotation}
      anchor={{ x: 0.5, y: 0.5 }}
      tracksViewChanges={tracksViewChanges}
    >
        <Image
          source={truckImage}
          style={styles.truckMarker}
          resizeMode="contain"
          onLoad={() => setTracksViewChanges(false)}
        />
    </Marker.Animated>
  );
}

const styles = StyleSheet.create({
  truckMarker: {
    width: 50,
    height: 50,
  },
});