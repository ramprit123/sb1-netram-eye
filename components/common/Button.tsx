import React from 'react';
import { 
  StyleSheet,
  Text,
  TouchableOpacity,
  ViewStyle,
  TextStyle,
  ActivityIndicator,
  Platform
} from 'react-native';
import Animated, { FadeIn } from 'react-native-reanimated';
import { ChevronRight } from 'lucide-react-native';

type ButtonProps = {
  title: string;
  onPress: () => void;
  style?: ViewStyle;
  textStyle?: TextStyle;
  primary?: boolean;
  secondary?: boolean;
  disabled?: boolean;
  loading?: boolean;
  icon?: React.ReactNode;
  withArrow?: boolean;
};

const Button = ({
  title,
  onPress,
  style,
  textStyle,
  primary = true,
  secondary = false,
  disabled = false,
  loading = false,
  icon,
  withArrow = false,
}: ButtonProps) => {
  
  const buttonStyle = [
    styles.button,
    primary && styles.primary,
    secondary && styles.secondary,
    disabled && styles.disabled,
    style,
  ];

  const buttonTextStyle = [
    styles.text,
    primary && styles.primaryText,
    secondary && styles.secondaryText,
    disabled && styles.disabledText,
    textStyle,
  ];

  return (
    <TouchableOpacity
      onPress={onPress}
      disabled={disabled || loading}
      style={buttonStyle}
      activeOpacity={0.8}
    >
      <Animated.View entering={FadeIn.duration(300)} style={styles.contentContainer}>
        {loading ? (
          <ActivityIndicator 
            color={primary ? '#FFFFFF' : '#4B96FF'} 
            size="small" 
          />
        ) : (
          <>
            {icon && <Animated.View style={styles.iconContainer}>{icon}</Animated.View>}
            <Text style={buttonTextStyle}>{title}</Text>
            {withArrow && (
              <ChevronRight 
                size={20} 
                color={primary ? '#FFFFFF' : '#4B96FF'}
                style={styles.arrowIcon} 
              />
            )}
          </>
        )}
      </Animated.View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  button: {
    borderRadius: 16,
    paddingVertical: 16,
    paddingHorizontal: 28,
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 4,
    ...Platform.select({
      web: {
        cursor: 'pointer',
      },
    }),
  },
  contentContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  primary: {
    backgroundColor: '#4B96FF',
  },
  secondary: {
    backgroundColor: '#EDF5FF',
    borderWidth: 1,
    borderColor: '#D1E3FF',
  },
  disabled: {
    backgroundColor: '#E0E0E0',
    opacity: 0.7,
  },
  text: {
    fontSize: 16,
    fontWeight: '600',
    textAlign: 'center',
  },
  primaryText: {
    color: 'white',
  },
  secondaryText: {
    color: '#4B96FF',
  },
  disabledText: {
    color: '#9E9E9E',
  },
  iconContainer: {
    marginRight: 12,
  },
  arrowIcon: {
    marginLeft: 12,
  },
});

export default Button;