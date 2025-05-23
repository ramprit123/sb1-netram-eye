import React from 'react';
import { 
  StyleSheet, 
  View, 
  TouchableOpacity, 
  Text,
  ViewStyle,
  TextStyle 
} from 'react-native';
import Animated, { 
  useAnimatedStyle, 
  useSharedValue, 
  withTiming, 
  interpolate 
} from 'react-native-reanimated';

type CardProps = {
  title?: string;
  subtitle?: string;
  onPress?: () => void;
  children?: React.ReactNode;
  style?: ViewStyle;
  titleStyle?: TextStyle;
  subtitleStyle?: TextStyle;
  icon?: React.ReactNode;
  disabled?: boolean;
};

const AnimatedTouchable = Animated.createAnimatedComponent(TouchableOpacity);

const Card = ({
  title,
  subtitle,
  onPress,
  children,
  style,
  titleStyle,
  subtitleStyle,
  icon,
  disabled = false,
}: CardProps) => {
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

  const cardContent = (
    <>
      {(title || icon) && (
        <View style={styles.header}>
          {icon && <View style={styles.iconContainer}>{icon}</View>}
          <View style={styles.titleContainer}>
            {title && <Text style={[styles.title, titleStyle]}>{title}</Text>}
            {subtitle && <Text style={[styles.subtitle, subtitleStyle]}>{subtitle}</Text>}
          </View>
        </View>
      )}
      {children && <View style={styles.content}>{children}</View>}
    </>
  );

  if (onPress) {
    return (
      <AnimatedTouchable
        onPress={onPress}
        disabled={disabled}
        style={[styles.card, style, animatedStyle]}
        activeOpacity={0.9}
        onPressIn={handlePressIn}
        onPressOut={handlePressOut}
      >
        {cardContent}
      </AnimatedTouchable>
    );
  }

  return (
    <Animated.View style={[styles.card, style]}>
      {cardContent}
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  card: {
    backgroundColor: 'white',
    borderRadius: 16,
    padding: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 8,
    elevation: 2,
    overflow: 'hidden',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  iconContainer: {
    marginRight: 12,
  },
  titleContainer: {
    flex: 1,
  },
  title: {
    fontSize: 16,
    fontWeight: '600',
    color: '#333333',
  },
  subtitle: {
    fontSize: 14,
    color: '#666666',
    marginTop: 2,
  },
  content: {},
});

export default Card;