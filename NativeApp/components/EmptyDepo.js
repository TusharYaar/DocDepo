import React, { useRef, useEffect, useState } from "react";
import { StyleSheet, View } from "react-native";
import LottieView from "lottie-react-native";

const EmptyDepo = () => {
  const visualizerRef = useRef(null);
  const [randomValue, setRandomValue] = useState(0.5);
  useEffect(() => {
    visualizerRef.current.play();
  }, []);

  const refreshVisualizer = () => {
    const value = Math.random();
    if (randomValue < 0.5) {
      setRandomValue(value);
      visualizerRef.current.play(204, 240); // Blinking Animation
    } else if (randomValue < 0.87) {
      setRandomValue(value);
      visualizerRef.current.play(74, 240); // Fly comming out animation
    } else if (randomValue < 1) {
      visualizerRef.current.play(72, 0); // Going Back animation
      setRandomValue(1);
    } else if (randomValue === 1) {
      visualizerRef.current.pause();
      setTimeout(function () {
        visualizerRef.current.play(0, 240); // complete Animation from start to finish
      }, 800);
      setRandomValue(value);
    }
  };
  return (
    <View style={styles.container}>
      <LottieView
        ref={visualizerRef}
        speed={0.7}
        style={{
          width: "100%",
          backgroundColor: "#f2f2f2",
        }}
        source={require("../assets/lottie/emptyDepo.json")}
        onAnimationFinish={refreshVisualizer}
        loop={false}
      />
    </View>
  );
};

export default EmptyDepo;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});
