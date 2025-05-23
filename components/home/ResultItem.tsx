import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import Animated, { FadeInRight } from 'react-native-reanimated';

type ResultItemProps = {
  title: string;
  value: string;
  date: string;
  delay?: number;
};

const ResultItem = ({ title, value, date, delay = 0 }: ResultItemProps) => {
  return (
    <Animated.View 
      entering={FadeInRight.duration(400).delay(delay)}
      style={styles.container}
    >
      <View>
        <Text style={styles.title}>{title}</Text>
        <Text style={styles.value}>{value}</Text>
        <Text style={styles.date}>{date}</Text>
      </View>
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#F8F9FA',
    borderRadius: 12,
    padding: 16,
    marginRight: 16,
    width: 120,
  },
  title: {
    fontSize: 14,
    color: '#666666',
    marginBottom: 8,
  },
  value: {
    fontSize: 20,
    fontWeight: '700',
    color: '#333333',
    marginBottom: 4,
  },
  date: {
    fontSize: 12,
    color: '#999999',
  },
});

export default ResultItem;