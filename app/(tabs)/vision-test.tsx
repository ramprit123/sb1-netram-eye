import React, { useState, useEffect, useCallback } from 'react';
import {
  StyleSheet,
  View,
  Text,
  TouchableOpacity,
  Dimensions,
  Alert,
  ScrollView,
} from 'react-native';
import { router } from 'expo-router';
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withTiming,
  FadeIn,
  FadeInDown,
} from 'react-native-reanimated';
import { ChevronRight } from 'lucide-react-native';

const { width } = Dimensions.get('window');

const getRandomLetter = (): string => {
  const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz';
  return chars.charAt(Math.floor(Math.random() * chars.length));
};

const VisionTestScreen = () => {
  const [currentStep, setCurrentStep] = useState(1);
  const [totalSteps] = useState(5);
  const [timeLeft, setTimeLeft] = useState(45);
  const [rotationDeg, setRotationDeg] = useState(0);
  const [fontSize, setFontSize] = useState(32);
  const [score, setScore] = useState(0);
  const [currentLetter, setCurrentLetter] = useState(getRandomLetter());

  const progressWidth = useSharedValue(0);
  const symbolRotation = useSharedValue(0);
  const fontSizeScale = useSharedValue(fontSize);

  useEffect(() => {
    progressWidth.value = withTiming((100 / totalSteps) * currentStep, {
      duration: 1000,
    });
    rotateSymbol();

    const timer = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev <= 1) {
          clearInterval(timer);
          handleTestComplete();
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  const rotateSymbol = useCallback(() => {
    const newDeg = Math.floor(Math.random() * 360);
    const newLetter = getRandomLetter();
    setRotationDeg(newDeg);
    setCurrentLetter(newLetter);
    symbolRotation.value = withTiming(newDeg, { duration: 800 });
  }, []);

  const zoomSymbol = () => {
    const newFontSize = fontSize + 4 > 64 ? 32 : fontSize + 4;
    setFontSize(newFontSize);
    fontSizeScale.value = withTiming(newFontSize, { duration: 300 });
  };

  const handleDirectionPress = () => {
    if (currentStep < totalSteps) {
      setCurrentStep((prev) => prev + 1);
      setScore((prev) => prev + 1);
      progressWidth.value = withTiming((100 / totalSteps) * (currentStep + 1), {
        duration: 500,
      });
      rotateSymbol();
    } else {
      setScore((prev) => prev + 1);
      handleTestComplete();
    }
  };

  const handleTestComplete = () => {
    Alert.alert(
      'Test Complete',
      `Your score: ${score + 1} out of ${totalSteps}`,
      [
        {
          text: 'OK',
          onPress: () =>
            router.push(`/test-summary?score=${score + 1}&total=${totalSteps}`),
        },
      ]
    );
  };

  const progressBarStyle = useAnimatedStyle(() => ({
    width: `${progressWidth.value}%`,
  }));

  const symbolStyle = useAnimatedStyle(() => ({
    transform: [{ rotate: `${symbolRotation.value}deg` }],
  }));

  const letterStyle = useAnimatedStyle(() => ({
    fontSize: fontSizeScale.value,
  }));

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  return (
    <ScrollView style={styles.container}>
      <Animated.View entering={FadeIn.duration(400)} style={styles.header}>
        <Text style={styles.title}>Vision Test</Text>
        <Text style={styles.subtitle}>Follow the instructions carefully</Text>

        <View style={styles.progressContainer}>
          <Text style={styles.stepText}>
            Step {currentStep} of {totalSteps}
          </Text>
          <View style={styles.progressBar}>
            <Animated.View style={[styles.progressFill, progressBarStyle]} />
          </View>
        </View>
      </Animated.View>

      <Animated.View
        entering={FadeInDown.duration(600).delay(300)}
        style={styles.symbolContainer}
      >
        <Animated.View style={[styles.symbol, symbolStyle]}>
          <Animated.Text style={[styles.letterE, letterStyle]}>
            {currentLetter}
          </Animated.Text>
        </Animated.View>
        <Text style={styles.distanceText}>Stand 2 meters away</Text>
      </Animated.View>

      <View style={styles.controlsContainer}>
        <TouchableOpacity
          style={styles.arrowButton}
          onPress={handleDirectionPress}
        >
          <ChevronRight size={24} color="#4B96FF" />
        </TouchableOpacity>

        <TouchableOpacity style={[styles.arrowButton]} onPress={zoomSymbol}>
          <Text style={{ color: '#4B96FF' }}>Zoom</Text>
        </TouchableOpacity>

        <View style={styles.timer}>
          <Text style={styles.timerText}>{formatTime(timeLeft)}</Text>
        </View>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
    paddingTop: 60,
  },
  header: {
    paddingHorizontal: 24,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#333333',
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 16,
    color: '#666666',
    marginBottom: 24,
  },
  progressContainer: {
    marginBottom: 32,
  },
  stepText: {
    fontSize: 14,
    color: '#666666',
    marginBottom: 8,
  },
  progressBar: {
    height: 8,
    backgroundColor: '#E5E5E5',
    borderRadius: 4,
    overflow: 'hidden',
  },
  progressFill: {
    height: '100%',
    backgroundColor: '#4B96FF',
    borderRadius: 4,
  },
  symbolContainer: {
    alignItems: 'center',
    marginBottom: 40,
  },
  symbol: {
    width: width * 0.5,
    height: width * 0.5,
    backgroundColor: '#FFFFFF',
    borderRadius: width * 0.25,
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 4,
    marginBottom: 16,
  },
  letterE: {
    color: '#333333',
    fontWeight: 'bold',
  },
  distanceText: {
    fontSize: 16,
    color: '#666666',
  },
  controlsContainer: {
    alignItems: 'center',
    display: 'flex',
    flexDirection: 'row',
    gap: 10,
    justifyContent: 'center',
  },
  arrowButton: {
    width: 64,
    height: 64,
    backgroundColor: '#EDF5FF',
    borderRadius: 32,
    justifyContent: 'center',
    alignItems: 'center',
  },
  timer: {
    width: 64,
    height: 64,
    borderRadius: 32,
    borderWidth: 3,
    borderColor: '#4CD964',
    justifyContent: 'center',
    alignItems: 'center',
  },
  timerText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#4CD964',
  },
});

export default VisionTestScreen;
