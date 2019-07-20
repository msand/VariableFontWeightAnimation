import React, { Component } from 'react';
import { StyleSheet, View, Dimensions, Animated } from 'react-native';
import { Svg, Text, TSpan } from 'react-native-svg';

const { width, height } = Dimensions.get('window');
const AnimatedText = Animated.createAnimatedComponent(Text);

function getInitialState() {
  const anim = new Animated.Value(0);
  const oneTo1E3 = anim.interpolate({
    inputRange: [0, 1],
    outputRange: [1, 1E3],
  });
  return { anim, oneTo1E3 };
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
    const { oneTo1E3 } = this.state;
    return (
      <View style={styles.container}>
        <Svg width={width} height={height} style={StyleSheet.absoluteFill} viewBox="0 0 70 70">
          <Text fontSize={3}>
            <TSpan x={10} y={10}>System font</TSpan>
            <TSpan x={10} y={30}>IBMPlexSansVar</TSpan>
            <TSpan x={10} y={50}>PublicSans-Thin_Regular</TSpan>
            <TSpan x={10} y={70}>TINY5x3</TSpan>
          </Text>
        </Svg>
        <Svg width={width} height={height} style={StyleSheet.absoluteFill} viewBox="0 0 70 70">
          <AnimatedText fontWeight={oneTo1E3}>
            <TSpan x={10} y={20}>Testing</TSpan>
            <TSpan x={10} y={40} fontFamily="IBMPlexSansVar">Testing</TSpan>
            <TSpan x={10} y={60} fontFamily="PublicSans-Thin_Regular">Testing</TSpan>
            <TSpan x={10} y={80} fontFamily="TINY5x3">Testing</TSpan>
          </AnimatedText>
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
