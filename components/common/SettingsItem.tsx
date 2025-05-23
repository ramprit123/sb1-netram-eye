import React from 'react';
import { StyleSheet, Text, View, TouchableOpacity, Switch } from 'react-native';
import { ChevronRight } from 'lucide-react-native';
import Animated, { 
  useAnimatedStyle, 
  useSharedValue, 
  withTiming 
} from 'react-native-reanimated';

type SettingsItemProps = {
  icon: React.ReactNode;
  title: string;
  onPress?: () => void;
  hasToggle?: boolean;
  toggleValue?: boolean;
  onToggleChange?: (value: boolean) => void;
  showChevron?: boolean;
  rightContent?: React.ReactNode;
};

const AnimatedTouchable = Animated.createAnimatedComponent(TouchableOpacity);

const SettingsItem = ({
  icon,
  title,
  onPress,
  hasToggle = false,
  toggleValue = false,
  onToggleChange,
  showChevron = true,
  rightContent,
}: SettingsItemProps) => {
  const scale = useSharedValue(1);

  const animatedStyle = useAnimatedStyle(() => {
    return {
      transform: [{ scale: scale.value }],
    };
  });

  const handlePressIn = () => {
    scale.value = withTiming(0.98, { duration: 100 });
  };

  const handlePressOut = () => {
    scale.value = withTiming(1, { duration: 200 });
  };

  const content = (
    <>
      <View style={styles.iconContainer}>{icon}</View>
      <Text style={styles.title}>{title}</Text>
      <View style={styles.rightContainer}>
        {rightContent}
        {hasToggle && (
          <Switch
            value={toggleValue}
            onValueChange={onToggleChange}
            trackColor={{ false: '#E0E0E0', true: '#9ECAFF' }}
            thumbColor={toggleValue ? '#4B96FF' : '#F5F5F5'}
            ios_backgroundColor="#E0E0E0"
          />
        )}
        {showChevron && !hasToggle && !rightContent && (
          <ChevronRight color="#CCCCCC" size={20} />
        )}
      </View>
    </>
  );

  if (onPress) {
    return (
      <AnimatedTouchable
        onPress={onPress}
        style={[styles.container, animatedStyle]}
        activeOpacity={0.7}
        onPressIn={handlePressIn}
        onPressOut={handlePressOut}
      >
        {content}
      </AnimatedTouchable>
    );
  }

  return <View style={styles.container}>{content}</View>;
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 14,
    paddingHorizontal: 8,
    backgroundColor: 'white',
  },
  iconContainer: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: '#EDF5FF',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 16,
  },
  title: {
    flex: 1,
    fontSize: 16,
    color: '#333333',
  },
  rightContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
});

export default SettingsItem;