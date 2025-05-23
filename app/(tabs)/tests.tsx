import React, { useState } from 'react';
import { 
  StyleSheet, 
  View, 
  Text, 
  SafeAreaView, 
  ScrollView, 
  TouchableOpacity 
} from 'react-native';
import Animated, { 
  FadeIn, 
  SlideInLeft,
  useAnimatedStyle,
  useSharedValue,
  withTiming,
  interpolate
} from 'react-native-reanimated';
import { Eye, Palette, Scan, Clock, Calendar, CircleAlert as AlertCircle, ChevronRight } from 'lucide-react-native';
import Card from '@/components/common/Card';
import Button from '@/components/common/Button';

type TestCategory = 'recommended' | 'vision' | 'color' | 'other';

const AnimatedTouchable = Animated.createAnimatedComponent(TouchableOpacity);

export default function TestsScreen() {
  const [activeCategory, setActiveCategory] = useState<TestCategory>('recommended');
  
  const categories: Array<{ id: TestCategory; label: string; icon: JSX.Element }> = [
    { id: 'recommended', label: 'Recommended', icon: <Clock size={16} color="#4B96FF" /> },
    { id: 'vision', label: 'Vision', icon: <Eye size={16} color="#4B96FF" /> },
    { id: 'color', label: 'Color', icon: <Palette size={16} color="#4B96FF" /> },
    { id: 'other', label: 'Other', icon: <Scan size={16} color="#4B96FF" /> },
  ];
  
  const recommendedTests = [
    {
      id: '1',
      title: 'Visual Acuity Test',
      subtitle: '5 minutes • Basic',
      icon: <Eye size={24} color="#4B96FF" />,
      description: 'Measure how well you can see at different distances',
      lastCompleted: '3 months ago',
    },
    {
      id: '2',
      title: 'Color Blindness Test',
      subtitle: '3 minutes • Basic',
      icon: <Palette size={24} color="#4B96FF" />,
      description: 'Check your ability to distinguish between colors',
      lastCompleted: '1 year ago',
    },
    {
      id: '3',
      title: 'Astigmatism Test',
      subtitle: '4 minutes • Intermediate',
      icon: <Scan size={24} color="#4B96FF" />,
      description: 'Detect blurred vision caused by irregular eye shape',
      lastCompleted: 'Never',
    },
  ];
  
  const renderCategoryTab = (category: (typeof categories)[0], index: number) => {
    const isActive = activeCategory === category.id;
    const scale = useSharedValue(1);
    
    const handlePressIn = () => {
      scale.value = withTiming(0.95, { duration: 100 });
    };
    
    const handlePressOut = () => {
      scale.value = withTiming(1, { duration: 200 });
    };
    
    const animatedStyle = useAnimatedStyle(() => {
      return {
        transform: [{ scale: scale.value }],
      };
    });
    
    return (
      <AnimatedTouchable
        key={category.id}
        style={[
          styles.categoryTab,
          isActive && styles.activeCategoryTab,
          animatedStyle
        ]}
        onPress={() => setActiveCategory(category.id)}
        onPressIn={handlePressIn}
        onPressOut={handlePressOut}
        activeOpacity={0.7}
      >
        <View style={styles.categoryTabContent}>
          {category.icon}
          <Text style={[
            styles.categoryLabel,
            isActive && styles.activeCategoryLabel
          ]}>
            {category.label}
          </Text>
        </View>
      </AnimatedTouchable>
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Vision Tests</Text>
        <Text style={styles.subtitle}>
          Complete these tests to track your eye health
        </Text>
      </View>
      
      <Animated.View 
        entering={FadeIn.duration(400)}
        style={styles.categoriesContainer}
      >
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.categoriesScroll}
        >
          {categories.map(renderCategoryTab)}
        </ScrollView>
      </Animated.View>
      
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scrollContent}
      >
        <View style={styles.nextTestContainer}>
          <Animated.View 
            entering={SlideInLeft.duration(400).delay(100)}
            style={styles.nextTestCard}
          >
            <View style={styles.calendarIcon}>
              <Calendar size={24} color="#4B96FF" />
            </View>
            <View style={styles.nextTestContent}>
              <Text style={styles.nextTestLabel}>Upcoming Eye Test</Text>
              <Text style={styles.nextTestTitle}>Annual Eye Checkup</Text>
              <Text style={styles.nextTestDate}>April 30, 2024</Text>
            </View>
            <TouchableOpacity style={styles.nextTestAction}>
              <Text style={styles.nextTestActionText}>Remind me</Text>
            </TouchableOpacity>
          </Animated.View>
        </View>
        
        <View style={styles.testsListContainer}>
          {recommendedTests.map((test, index) => (
            <Animated.View
              key={test.id}
              entering={FadeIn.duration(400).delay(200 + index * 100)}
              style={styles.testCardContainer}
            >
              <Card
                title={test.title}
                subtitle={test.subtitle}
                icon={test.icon}
                onPress={() => {}}
                style={styles.testCard}
              >
                <View style={styles.testCardContent}>
                  <Text style={styles.testDescription}>{test.description}</Text>
                  <View style={styles.testMetaContainer}>
                    <View style={styles.testLastCompletedContainer}>
                      <Clock size={14} color="#999999" />
                      <Text style={styles.testLastCompleted}>
                        {test.lastCompleted}
                      </Text>
                    </View>
                    <Button
                      title="Start Test"
                      onPress={() => {}}
                      primary={false}
                      secondary={true}
                      style={styles.startTestButton}
                      textStyle={styles.startTestButtonText}
                    />
                  </View>
                </View>
              </Card>
            </Animated.View>
          ))}
        </View>
        
        <Animated.View 
          entering={FadeIn.duration(400).delay(600)}
          style={styles.infoCard}
        >
          <View style={styles.infoIconContainer}>
            <AlertCircle size={24} color="#4B96FF" />
          </View>
          <View style={styles.infoContent}>
            <Text style={styles.infoTitle}>Eye Health Tip</Text>
            <Text style={styles.infoText}>
              Regular eye tests help detect vision problems early. 
              Experts recommend an eye exam every 1-2 years.
            </Text>
          </View>
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
  header: {
    paddingHorizontal: 24,
    paddingTop: 16,
    paddingBottom: 8,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#333333',
  },
  subtitle: {
    fontSize: 16,
    color: '#666666',
    marginTop: 4,
  },
  categoriesContainer: {
    marginVertical: 16,
  },
  categoriesScroll: {
    paddingHorizontal: 16,
  },
  categoryTab: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
    marginHorizontal: 6,
    backgroundColor: '#F5F7FA',
  },
  activeCategoryTab: {
    backgroundColor: '#EDF5FF',
  },
  categoryTabContent: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  categoryLabel: {
    fontSize: 14,
    color: '#666666',
    marginLeft: 6,
  },
  activeCategoryLabel: {
    fontWeight: '600',
    color: '#4B96FF',
  },
  scrollContent: {
    paddingBottom: 40,
  },
  nextTestContainer: {
    paddingHorizontal: 24,
    marginBottom: 24,
  },
  nextTestCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#F0F7FF',
    borderRadius: 16,
    padding: 16,
  },
  calendarIcon: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: 'white',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 16,
  },
  nextTestContent: {
    flex: 1,
  },
  nextTestLabel: {
    fontSize: 12,
    color: '#4B96FF',
    marginBottom: 4,
  },
  nextTestTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#333333',
    marginBottom: 2,
  },
  nextTestDate: {
    fontSize: 14,
    color: '#666666',
  },
  nextTestAction: {
    backgroundColor: 'white',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 16,
  },
  nextTestActionText: {
    fontSize: 14,
    color: '#4B96FF',
    fontWeight: '500',
  },
  testsListContainer: {
    paddingHorizontal: 24,
    marginBottom: 24,
  },
  testCardContainer: {
    marginBottom: 16,
  },
  testCard: {
    padding: 16,
  },
  testCardContent: {
    marginTop: 8,
  },
  testDescription: {
    fontSize: 14,
    color: '#666666',
    marginBottom: 16,
    lineHeight: 20,
  },
  testMetaContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  testLastCompletedContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  testLastCompleted: {
    fontSize: 12,
    color: '#999999',
    marginLeft: 4,
  },
  startTestButton: {
    paddingVertical: 8,
    paddingHorizontal: 12,
  },
  startTestButtonText: {
    fontSize: 14,
  },
  infoCard: {
    backgroundColor: '#F8F9FA',
    borderRadius: 16,
    padding: 16,
    marginHorizontal: 24,
    flexDirection: 'row',
    alignItems: 'center',
  },
  infoIconContainer: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: 'white',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 16,
  },
  infoContent: {
    flex: 1,
  },
  infoTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#333333',
    marginBottom: 4,
  },
  infoText: {
    fontSize: 14,
    color: '#666666',
    lineHeight: 20,
  },
});