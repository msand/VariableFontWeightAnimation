import React, { PureComponent } from 'react';
import { StyleSheet, View, Dimensions, Animated, Text as NativeText } from 'react-native';
import { Svg, Text, TSpan, G } from 'react-native-svg';
import Slider from '@react-native-community/slider';

const { width, height } = Dimensions.get('window');
const AnimatedText = Animated.createAnimatedComponent(Text);

function getInitialState() {
  const anim = new Animated.Value(0);
  const oneTo1E3 = anim.interpolate({
    inputRange: [0, 1],
    outputRange: [1, 1000],
  });
  const TINY5x3 = anim.interpolate({
    inputRange: [0, 1],
    outputRange: [2, 300],
  });
  return { anim, oneTo1E3, TINY5x3 };
}

export default class App extends PureComponent {
  state = getInitialState();

  componentDidMount() {
    const { anim } = this.state;
    Animated.timing(anim, {
      toValue: 1,
      duration: 15E3,
      useNativeDriver: true,
    }).start();
  }

  onValueChange = value => this.setState({ value });

  render() {
    const { oneTo1E3, TINY5x3, value } = this.state;
    return (
      <View style={styles.container}>
        <Svg width={width} height={height} style={StyleSheet.absoluteFill} viewBox="-10 -30 700 700">
          <Text fontSize={30}>
            <TSpan x={0} y={0}>System font</TSpan>
            <TSpan x={0} y={200}>IBMPlexSansVar</TSpan>
            <TSpan x={0} y={400}>PublicSans-Thin_Regular</TSpan>
            <TSpan x={0} y={600}>TINY5x3</TSpan>
          </Text>
          <G transform="translate(10, 100)">
            <Text fontSize={90} fontWeight={value || 100}>
              <TSpan x={0} y={0}>Testing</TSpan>
              <TSpan x={0} y={200} fontFamily="IBMPlexSansVar">Testing</TSpan>
              <TSpan x={0} y={400} fontFamily="PublicSans-Thin_Regular">Testing</TSpan>
              <TSpan x={0} y={600} fontFamily="TINY5x3" fontWeight={value || 60}>Testing</TSpan>
            </Text>
          </G>
        </Svg>
        <Svg width={width} height={height} style={StyleSheet.absoluteFill} viewBox="-350 -30 700 700">
          <G transform="translate(0, 100)" fontSize={90}>
            <AnimatedText fontWeight={oneTo1E3}>
              <TSpan x={0} y={0}>Testing</TSpan>
              <TSpan x={0} y={200} fontFamily="IBMPlexSansVar">Testing</TSpan>
              <TSpan x={0} y={400} fontFamily="PublicSans-Thin_Regular">Testing</TSpan>
            </AnimatedText>
            <AnimatedText fontWeight={TINY5x3}>
              <TSpan x={0} y={600} fontFamily="TINY5x3">Testing</TSpan>
            </AnimatedText>
          </G>
        </Svg>
        <View style={styles.sliderView}>
          <Slider
            style={styles.slider}
            minimumValue={1}
            maximumValue={1000}
            minimumTrackTintColor="#00FFFF"
            maximumTrackTintColor="#000000"
            onValueChange={this.onValueChange}
          />
          <NativeText>
            {this.state.value && +this.state.value.toFixed(3) || ''}
          </NativeText>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#ecf0f1',
  },
  sliderView: {
    padding: '10%',
    height: '100%',
    width: '100%',
  },
  slider: {
    alignSelf: 'center',
    width: '80%',
    height: 50
  },
});
