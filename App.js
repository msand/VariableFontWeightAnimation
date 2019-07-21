import React, { PureComponent } from 'react';
import {
  View,
  Animated,
  Dimensions,
  StyleSheet,
  TouchableOpacity,
  Text as NativeText,
} from 'react-native';
import Slider from '@react-native-community/slider';
import { Svg, Text, TSpan, G } from 'react-native-svg';

const { width, height } = Dimensions.get('window');
const AnimatedText = Animated.createAnimatedComponent(Text);

class AnimatedFontWeight extends PureComponent {
  render() {
    const { anim } = this.props;
    const oneTo1E3 = anim.interpolate({
      inputRange: [0, 1],
      outputRange: [1, 1000],
    });
    const TINY5x3 = anim.interpolate({
      inputRange: [0, 1],
      outputRange: [2, 300],
    });
    return (
      <Svg
        width={width}
        height={height}
        viewBox="-350 -30 700 700"
        style={StyleSheet.absoluteFill}
      >
        <G transform="translate(0, 100)" fontSize={90}>
          <AnimatedText fontWeight={oneTo1E3}>
            <TSpan x={0} y={0}>
              Testing
            </TSpan>
            <TSpan x={0} y={200} fontFamily="IBMPlexSansVar">
              Testing
            </TSpan>
            <TSpan x={0} y={400} fontFamily="PublicSans-Thin_Regular">
              Testing
            </TSpan>
          </AnimatedText>
          <AnimatedText fontWeight={TINY5x3}>
            <TSpan x={0} y={600} fontFamily="TINY5x3">
              Testing
            </TSpan>
          </AnimatedText>
        </G>
      </Svg>
    );
  }
}

class VariableFontWeight extends PureComponent {
  render() {
    const { value } = this.props;
    return (
      <Svg
        width={width}
        height={height}
        viewBox="-10 -30 700 700"
        style={StyleSheet.absoluteFill}
      >
        <Text fontSize={30}>
          <TSpan x={0} y={0}>
            System font
          </TSpan>
          <TSpan x={0} y={200}>
            IBMPlexSansVar
          </TSpan>
          <TSpan x={0} y={400}>
            PublicSans-Thin_Regular
          </TSpan>
          <TSpan x={0} y={600}>
            TINY5x3
          </TSpan>
        </Text>
        <G transform="translate(10, 100)">
          <Text fontSize={90} fontWeight={value || 100}>
            <TSpan x={0} y={0}>
              Testing
            </TSpan>
            <TSpan x={0} y={200} fontFamily="IBMPlexSansVar">
              Testing
            </TSpan>
            <TSpan x={0} y={400} fontFamily="PublicSans-Thin_Regular">
              Testing
            </TSpan>
            <TSpan x={0} y={600} fontFamily="TINY5x3" fontWeight={value || 60}>
              Testing
            </TSpan>
          </Text>
        </G>
      </Svg>
    );
  }
}

class FontWeightSlider extends PureComponent {
  render() {
    return (
      <Slider
        minimumValue={1}
        maximumValue={1000}
        style={styles.slider}
        minimumTrackTintColor="#FFFFFF"
        maximumTrackTintColor="#000000"
        onValueChange={this.props.onValueChange}
      />
    );
  }
}

export default class App extends PureComponent {
  state = { anim: new Animated.Value(0) };

  componentDidMount() {
    this.toggle();
  }

  toggle = () => {
    const { anim } = this.state;
    const up = (this.up = !this.up);
    Animated.timing(anim, {
      toValue: up ? 1 : 0,
      duration: 5e3,
      useNativeDriver: true,
    }).start();
  };

  onValueChange = value => this.setState({ value });

  render() {
    const { anim, value } = this.state;
    return (
      <View style={styles.container}>
        <TouchableOpacity onPress={this.toggle} style={styles.touchable}>
          <VariableFontWeight value={value} />
          <AnimatedFontWeight anim={anim} />
        </TouchableOpacity>
        <View style={styles.sliderView}>
          <FontWeightSlider onValueChange={this.onValueChange} />
          <NativeText>{(value && +value.toFixed(3)) || ''}</NativeText>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#ecf0f1',
  },
  touchable: {
    backgroundColor: 'white',
    width: '100%',
    height: '100%',
  },
  sliderView: {
    position: 'absolute',
    padding: '10%',
    width: '100%',
    height: 120,
  },
  slider: {
    alignSelf: 'center',
    width: '80%',
    height: 50,
  },
});
