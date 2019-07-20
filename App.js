import React, { Component } from 'react';
import { StyleSheet, View, Dimensions, Animated, Platform } from 'react-native';
import { Svg, Text, TSpan, G } from 'react-native-svg';

const { width, height } = Dimensions.get('window');
const AnimatedText = Animated.createAnimatedComponent(Text);
const ios = Platform.OS === 'ios';

function getInitialState() {
  const anim = new Animated.Value(0);
  const oneTo1E3 = anim.interpolate({
    inputRange: [0, 1],
    outputRange: [1, 1000],
  });
  const TINY5x3 = anim.interpolate({
    inputRange: [0, 1],
    outputRange: ios ? [450, 1000] : [2, 180],
  });
  return { anim, oneTo1E3, TINY5x3 };
}

export default class App extends Component {
  state = getInitialState();

  componentDidMount() {
    const { anim } = this.state;
    Animated.timing(anim, {
      toValue: 1,
      duration: 15E3,
      useNativeDriver: true,
    }).start();
  }

  render() {
    const { oneTo1E3, TINY5x3 } = this.state;
    return (
      <View style={styles.container}>
        <Svg width={width} height={height} style={StyleSheet.absoluteFill} viewBox="40 0 700 700">
          <Text fontSize={30}>
            <TSpan x={50} y={100}>System font</TSpan>
            <TSpan x={50} y={300}>IBMPlexSansVar</TSpan>
            <TSpan x={50} y={500}>PublicSans-Thin_Regular</TSpan>
            <TSpan x={50} y={700}>TINY5x3</TSpan>
          </Text>
        </Svg>
        <Svg width={width} height={height} style={StyleSheet.absoluteFill} viewBox="30 0 700 700">
          <G fontSize={90}>
            <Text fontWeight={100}>
              <TSpan x={50} y={200}>Testing</TSpan>
              <TSpan x={50} y={400} fontFamily="IBMPlexSansVar">Testing</TSpan>
              <TSpan x={50} y={600} fontFamily="PublicSans-Thin_Regular">Testing</TSpan>
              <TSpan x={50} y={800} fontFamily="TINY5x3" fontWeight={ios ? 450 : 60}>Testing</TSpan>
            </Text>
          </G>
        </Svg>
        <Svg width={width} height={height} style={StyleSheet.absoluteFill} viewBox="-300 0 700 700">
          <G fontSize={90}>
            <AnimatedText fontWeight={oneTo1E3}>
              <TSpan x={50} y={200}>Testing</TSpan>
              <TSpan x={50} y={400} fontFamily="IBMPlexSansVar">Testing</TSpan>
              <TSpan x={50} y={600} fontFamily="PublicSans-Thin_Regular">Testing</TSpan>
            </AnimatedText>
            <AnimatedText fontWeight={TINY5x3}>
              <TSpan x={50} y={800} fontFamily="TINY5x3">Testing</TSpan>
            </AnimatedText>
          </G>
        </Svg>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#ecf0f1',
  },
});
