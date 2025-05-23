import React from 'react';
import { StyleSheet, Text, View, Switch, Platform } from 'react-native';
import Animated, { FadeIn } from 'react-native-reanimated';

type PermissionItemProps = {
  icon: React.ReactNode;
  title: string;
  description: string;
  value: boolean;
  onValueChange: (value: boolean) => void;
  delay?: number;
};

const PermissionItem = ({ 
  icon, 
  title, 
  description, 
  value, 
  onValueChange,
  delay = 0 
}: PermissionItemProps) => {
  return (
    <Animated.View 
      entering={FadeIn.duration(300).delay(delay)} 
      style={styles.container}
    >
      <View style={styles.iconContainer}>
        {icon}
      </View>
      <View style={styles.textContainer}>
        <Text style={styles.title}>{title}</Text>
        <Text style={styles.description}>{description}</Text>
      </View>
      <Switch
        value={value}
        onValueChange={onValueChange}
        trackColor={{ false: '#E0E0E0', true: '#9ECAFF' }}
        thumbColor={value ? '#4B96FF' : '#F5F5F5'}
        ios_backgroundColor="#E0E0E0"
      />
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#F8F9FA',
    borderRadius: 16,
    padding: 16,
    marginVertical: 8,
    ...Platform.select({
      ios: {
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 0.05,
        shadowRadius: 2,
      },
      android: {
        elevation: 1,
      },
    }),
  },
  iconContainer: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#4B96FF',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 16,
  },
  textContainer: {
    flex: 1,
  },
  title: {
    fontSize: 16,
    fontWeight: '600',
    color: '#333333',
    marginBottom: 4,
  },
  description: {
    fontSize: 14,
    color: '#666666',
  },
});

export default PermissionItem;