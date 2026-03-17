import { useState } from "react";
import { StyleSheet, Image } from "react-native";
import { AnimatedRegion, Marker } from "react-native-maps";

interface TruckMarkerProps {
  coordinate: AnimatedRegion;
  rotation: number;
}

export function TruckMarker({ coordinate, rotation }: TruckMarkerProps) {
  const [tracksViewChanges, setTracksViewChanges] = useState(true);

  return (
    <Marker.Animated
      coordinate={coordinate}
      rotation={rotation}
      anchor={{ x: 0.5, y: 0.5 }}
      tracksViewChanges={tracksViewChanges}
    >
      <Image
        source={require("../../assets/caminhao-referencia.png")}
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