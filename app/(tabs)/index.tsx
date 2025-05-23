import React from 'react';
import {
  StyleSheet,
  View,
  Text,
  SafeAreaView,
  ScrollView,
  TouchableOpacity,
} from 'react-native';
import { router } from 'expo-router';
import Animated, {
  FadeIn,
  FadeInRight,
  FadeInDown,
} from 'react-native-reanimated';
import {
  Bell,
  CircleUser as UserCircle,
  Eye,
  Palette,
  Scan,
  Stethoscope,
} from 'lucide-react-native';
import CircleProgress from '@/components/common/CircleProgress';
import TestCard from '@/components/home/TestCard';
import ResultItem from '@/components/home/ResultItem';
import TipCard from '@/components/home/TipCard';
import Button from '@/components/common/Button';

export default function HomeScreen() {
  const userName = 'Sarah';
  const eyeHealthScore = 85;
  const lastScanDate = '2 days ago';

  const testCards = [
    {
      id: '1',
      title: 'Vision Test',
      description: 'Check your vision',
      icon: <Eye size={24} color="#4B96FF" />,
      onPress: () => router.push('/tests'),
    },
    {
      id: '2',
      title: 'Color Test',
      description: 'Test color vision',
      icon: <Palette size={24} color="#4B96FF" />,
      onPress: () => router.push('/tests'),
    },
    {
      id: '3',
      title: 'Eye Scan',
      description: 'AI-powered scan',
      icon: <Scan size={24} color="#4B96FF" />,
      onPress: () => router.push('/tests'),
    },
    {
      id: '4',
      title: 'Find Doctor',
      description: 'Book appointment',
      icon: <Stethoscope size={24} color="#4B96FF" />,
      onPress: () => {},
    },
  ];

  const results = [
    { id: '1', title: 'Vision Test', value: '20/20', date: 'Today' },
    { id: '2', title: 'Color Vision', value: 'Normal', date: 'Yesterday' },
    { id: '3', title: 'Eye Pressure', value: 'Normal', date: '3 days ago' },
  ];

  const tips = [
    {
      id: '1',
      title: '20-20-20 Rule',
      description:
        'Every 20 minutes, look at something 20 feet away for 20 seconds',
      imageUrl:
        'https://images.pexels.com/photos/3094230/pexels-photo-3094230.jpeg',
    },
    {
      id: '2',
      title: 'Healthy Diet',
      description: 'Include vitamins A, C, and E foods for better eye health',
      imageUrl:
        'https://images.pexels.com/photos/1640770/pexels-photo-1640770.jpeg',
    },
    {
      id: '3',
      title: 'Proper Lighting',
      description: 'Ensure adequate lighting when reading to reduce eye strain',
      imageUrl:
        'https://images.pexels.com/photos/4101143/pexels-photo-4101143.jpeg',
    },
  ];

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scrollContent}
      >
        <View style={styles.header}>
          <Animated.View
            entering={FadeIn.duration(400)}
            style={styles.logoContainer}
          >
            <Eye size={24} color="#4B96FF" />
            <Text style={styles.logoText}>Netram-Eye</Text>
          </Animated.View>

          <View style={styles.headerIcons}>
            <TouchableOpacity style={styles.iconButton}>
              <Bell size={24} color="#333333" />
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.iconButton}
              onPress={() => router.push('/profile')}
            >
              <UserCircle size={24} color="#333333" />
            </TouchableOpacity>
          </View>
        </View>

        <Animated.View
          entering={FadeInDown.duration(500).delay(200)}
          style={styles.greeting}
        >
          <Text style={styles.greetingText}>Good morning, {userName}</Text>
          <Text style={styles.greetingSubtext}>
            Let's check your eye health today
          </Text>
        </Animated.View>

        <Animated.View
          entering={FadeInRight.duration(600).delay(300)}
          style={styles.scoreCard}
        >
          <View style={styles.scoreContent}>
            <CircleProgress
              progress={eyeHealthScore}
              size={80}
              strokeWidth={10}
              color="#4B96FF"
              backgroundColor="#E5E5E5"
              duration={1500}
            />
            <View style={styles.scoreTextContainer}>
              <Text style={styles.scoreTitle}>Your Eye Health Score</Text>
              <View style={styles.lastScanRow}>
                <Bell size={14} color="#999999" />
                <Text style={styles.lastScanText}>
                  Last scan: {lastScanDate}
                </Text>
              </View>
              <Text style={styles.scoreStatus}>All metrics normal</Text>
            </View>
          </View>
        </Animated.View>

        <View style={styles.testCardsContainer}>
          <View style={styles.cardsGrid}>
            {testCards.map((card, index) => (
              <View key={card.id} style={styles.cardWrapper}>
                <TestCard
                  icon={card.icon}
                  title={card.title}
                  description={card.description}
                  onPress={card.onPress}
                  delay={400 + index * 100}
                />
              </View>
            ))}
          </View>
        </View>

        <View style={styles.sectionContainer}>
          <Text style={styles.sectionTitle}>Latest Results</Text>
          <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={styles.resultsContainer}
          >
            {results.map((result, index) => (
              <ResultItem
                key={result.id}
                title={result.title}
                value={result.value}
                date={result.date}
                delay={500 + index * 100}
              />
            ))}
          </ScrollView>
        </View>

        <View style={styles.sectionContainer}>
          <Text style={styles.sectionTitle}>Daily Eye Care Tips</Text>
          <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={styles.tipsContainer}
          >
            {tips.map((tip, index) => (
              <TipCard
                key={tip.id}
                title={tip.title}
                description={tip.description}
                imageUrl={tip.imageUrl}
                delay={600 + index * 100}
              />
            ))}
          </ScrollView>
        </View>

        <Animated.View
          entering={FadeIn.duration(400).delay(800)}
          style={styles.consultationContainer}
        >
          <Button title="Book Eye Consultation" onPress={() => {}} withArrow />
          <Text style={styles.consultationSubtext}>
            Next available: Tomorrow, 10 AM
          </Text>
        </Animated.View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },
  scrollContent: {
    paddingBottom: 40,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 24,
    paddingVertical: 16,
  },
  logoContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  logoText: {
    fontSize: 18,
    fontWeight: '600',
    marginLeft: 8,
    color: '#333333',
  },
  headerIcons: {
    flexDirection: 'row',
  },
  iconButton: {
    marginLeft: 16,
  },
  greeting: {
    paddingHorizontal: 24,
    marginBottom: 24,
  },
  greetingText: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#333333',
  },
  greetingSubtext: {
    fontSize: 16,
    color: '#666666',
    marginTop: 4,
  },
  scoreCard: {
    backgroundColor: '#EDF5FF',
    borderRadius: 16,
    marginHorizontal: 24,
    padding: 16,
    marginBottom: 24,
  },
  scoreContent: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  scoreTextContainer: {
    flex: 1,
    marginLeft: 16,
  },
  scoreTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#333333',
    marginBottom: 4,
  },
  lastScanRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 4,
  },
  lastScanText: {
    fontSize: 14,
    color: '#999999',
    marginLeft: 4,
  },
  scoreStatus: {
    fontSize: 14,
    color: '#4B96FF',
  },
  testCardsContainer: {
    marginHorizontal: 24,
    marginBottom: 24,
    marginTop: 20,
  },

  sectionContainer: {
    marginBottom: 24,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#333333',
    marginBottom: 16,
    paddingHorizontal: 24,
  },
  resultsContainer: {
    paddingLeft: 24,
    paddingRight: 8,
  },
  tipsContainer: {
    paddingLeft: 24,
    paddingRight: 8,
  },
  consultationContainer: {
    paddingHorizontal: 24,
  },
  consultationSubtext: {
    fontSize: 14,
    color: '#666666',
    textAlign: 'center',
    marginTop: 8,
  },
  cardWrapper: {
    width: '50%',
    paddingHorizontal: 6,
    marginBottom: 12,
  },
  cardsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginHorizontal: -6,
  },
});
