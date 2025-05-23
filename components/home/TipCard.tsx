import React from 'react';
import { StyleSheet, Text, View, Image, ImageBackground, Dimensions } from 'react-native';
import Animated, { FadeIn } from 'react-native-reanimated';

type TipCardProps = {
  title: string;
  description: string;
  imageUrl: string;
  delay?: number;
};

const { width } = Dimensions.get('window');
const cardWidth = width * 0.8;

const TipCard = ({ title, description, imageUrl, delay = 0 }: TipCardProps) => {
  return (
    <Animated.View 
      entering={FadeIn.duration(400).delay(delay)}
      style={styles.container}
    >
      <ImageBackground
        source={{ uri: imageUrl }}
        style={styles.imageBackground}
        imageStyle={styles.image}
      >
        <View style={styles.overlay}>
          <View style={styles.tipIndicator}>
            <Text style={styles.tipIcon}>✓</Text>
          </View>
          <Text style={styles.title}>{title}</Text>
        </View>
      </ImageBackground>
      <View style={styles.contentContainer}>
        <Text style={styles.description}>{description}</Text>
      </View>
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: cardWidth,
    borderRadius: 16,
    backgroundColor: 'white',
    overflow: 'hidden',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 8,
    elevation: 2,
    marginRight: 16,
  },
  imageBackground: {
    height: 120,
    justifyContent: 'flex-end',
  },
  image: {
    borderTopLeftRadius: 16,
    borderTopRightRadius: 16,
  },
  overlay: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
    backgroundColor: 'rgba(0, 0, 0, 0.3)',
  },
  tipIndicator: {
    width: 24,
    height: 24,
    borderRadius: 12,
    backgroundColor: '#4CD964',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 8,
  },
  tipIcon: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 12,
  },
  title: {
    color: 'white',
    fontSize: 16,
    fontWeight: '600',
  },
  contentContainer: {
    padding: 16,
  },
  description: {
    fontSize: 14,
    color: '#666666',
    lineHeight: 20,
  },
});

export default TipCard;