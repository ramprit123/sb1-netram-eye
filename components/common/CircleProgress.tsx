import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import Animated, { 
  useSharedValue, 
  useAnimatedProps, 
  withTiming, 
  useAnimatedStyle,
  Easing
} from 'react-native-reanimated';
import Svg, { Circle } from 'react-native-svg';

const AnimatedCircle = Animated.createAnimatedComponent(Circle);

type CircleProgressProps = {
  size?: number;
  strokeWidth?: number;
  progress: number;
  duration?: number;
  delay?: number;
  color?: string;
  backgroundColor?: string;
  showPercentage?: boolean;
  children?: React.ReactNode;
};

const CircleProgress = ({
  size = 100,
  strokeWidth = 10,
  progress = 75,
  duration = 1000,
  delay = 0,
  color = '#4B96FF',
  backgroundColor = '#E5E5E5',
  showPercentage = true,
  children,
}: CircleProgressProps) => {
  const radius = (size - strokeWidth) / 2;
  const circumference = 2 * Math.PI * radius;
  const halfSize = size / 2;
  
  const animatedProgress = useSharedValue(0);
  const opacity = useSharedValue(0);
  
  React.useEffect(() => {
    setTimeout(() => {
      animatedProgress.value = withTiming(progress, {
        duration,
        easing: Easing.bezier(0.25, 0.1, 0.25, 1),
      });
      opacity.value = withTiming(1, { duration: 300 });
    }, delay);
  }, []);

  const animatedProps = useAnimatedProps(() => {
    const strokeDashoffset = circumference - (circumference * animatedProgress.value) / 100;
    return {
      strokeDashoffset,
    };
  });

  const containerAnimatedStyle = useAnimatedStyle(() => {
    return {
      opacity: opacity.value,
    };
  });

  return (
    <Animated.View style={[styles.container, { width: size, height: size }, containerAnimatedStyle]}>
      <Svg width={size} height={size}>
        <Circle
          cx={halfSize}
          cy={halfSize}
          r={radius}
          stroke={backgroundColor}
          strokeWidth={strokeWidth}
          fill="transparent"
        />
        <AnimatedCircle
          cx={halfSize}
          cy={halfSize}
          r={radius}
          stroke={color}
          strokeWidth={strokeWidth}
          fill="transparent"
          strokeDasharray={circumference}
          strokeDashoffset={0}
          strokeLinecap="round"
          animatedProps={animatedProps}
        />
      </Svg>
      <View style={[styles.labelContainer, { width: size, height: size }]}>
        {showPercentage ? (
          <Text style={styles.percentageText}>{Math.round(progress)}%</Text>
        ) : children}
      </View>
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  container: {
    position: 'relative',
  },
  labelContainer: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    justifyContent: 'center',
    alignItems: 'center',
  },
  percentageText: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#333',
  },
});

export default CircleProgress;