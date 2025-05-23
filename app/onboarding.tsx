import React, { useState } from 'react';
import {
  StyleSheet,
  View,
  Text,
  Image,
  SafeAreaView,
  ScrollView,
} from 'react-native';
import { router } from 'expo-router';
import Animated, {
  FadeIn,
  FadeInDown,
  SlideInDown,
} from 'react-native-reanimated';
import { Camera, Bell, Activity } from 'lucide-react-native';
import Button from '@/components/common/Button';
import FeatureCard from '@/components/common/FeatureCard';
import PermissionItem from '@/components/common/PermissionItem';

export default function Onboarding() {
  const [permissions, setPermissions] = useState({
    camera: false,
    notifications: false,
    healthData: false,
  });

  const togglePermission = (key: keyof typeof permissions) => {
    setPermissions((prev) => ({
      ...prev,
      [key]: !prev[key],
    }));
  };

  const handleGetStarted = () => {
    router.replace('/(tabs)');
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        <Animated.View
          entering={FadeInDown.duration(800).delay(200)}
          style={styles.logoContainer}
        >
          <View style={styles.logoCircle}>
            <Image
              source={{
                uri: 'https://images.pexels.com/photos/1231265/pexels-photo-1231265.jpeg',
              }}
              style={styles.logoImage}
            />
          </View>
        </Animated.View>

        <Animated.View entering={FadeIn.duration(800).delay(400)}>
          <Text style={styles.title}>Welcome to Netram-Eye</Text>
          <Text style={styles.subtitle}>
            Your AI-Powered Vision Care Assistant
          </Text>
        </Animated.View>

        <Animated.Text
          entering={FadeIn.duration(800).delay(600)}
          style={styles.description}
        >
          Smart eye tests, health tracking, and expert care - all in one place
        </Animated.Text>

        <View style={styles.featuresContainer}>
          <FeatureCard
            icon={<Activity size={24} color="white" />}
            title="Smart Eye Tests"
            description="Quick and accurate vision assessments powered by AI"
            delay={700}
          />

          <FeatureCard
            icon={<Bell size={24} color="white" />}
            title="Expert Connect"
            description="Book appointments with qualified eye specialists"
            delay={800}
          />

          <FeatureCard
            icon={<Camera size={24} color="white" />}
            title="Vision Tracking"
            description="Monitor your eye health progress over time"
            delay={900}
          />
        </View>

        <Animated.View
          entering={SlideInDown.duration(800).delay(1000)}
          style={styles.permissionsContainer}
        >
          <Text style={styles.permissionsTitle}>Enable Features</Text>
          <Text style={styles.permissionsSubtitle}>
            Netram-Eye needs these permissions to help you better
          </Text>

          <View style={styles.permissionsList}>
            <PermissionItem
              icon={<Camera size={20} color="white" />}
              title="Camera"
              description="For vision tests and eye scanning"
              value={permissions.camera}
              onValueChange={() => togglePermission('camera')}
              delay={100}
            />

            <PermissionItem
              icon={<Bell size={20} color="white" />}
              title="Notifications"
              description="For test reminders and health updates"
              value={permissions.notifications}
              onValueChange={() => togglePermission('notifications')}
              delay={200}
            />

            <PermissionItem
              icon={<Activity size={20} color="white" />}
              title="Health Data"
              description="To track your vision progress"
              value={permissions.healthData}
              onValueChange={() => togglePermission('healthData')}
              delay={300}
            />
          </View>
        </Animated.View>
      </ScrollView>

      <Animated.View
        entering={SlideInDown.duration(400).delay(1200)}
        style={styles.buttonContainer}
      >
        <Button title="Get Started" onPress={handleGetStarted} withArrow />
      </Animated.View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },
  scrollContent: {
    flexGrow: 1,
    paddingHorizontal: 24,
    paddingTop: 48,
    paddingBottom: 140,
  },
  logoContainer: {
    alignItems: 'center',
    marginBottom: 40,
  },
  logoCircle: {
    width: 140,
    height: 140,
    borderRadius: 70,
    backgroundColor: '#F5F7FA',
    padding: 10,
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 4,
  },
  logoImage: {
    width: 120,
    height: 120,
    borderRadius: 60,
  },
  title: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#333333',
    textAlign: 'center',
    marginBottom: 12,
  },
  subtitle: {
    fontSize: 20,
    color: '#4B96FF',
    textAlign: 'center',
    marginBottom: 16,
  },
  description: {
    fontSize: 16,
    color: '#666666',
    textAlign: 'center',
    marginBottom: 40,
    lineHeight: 24,
  },
  featuresContainer: {
    marginBottom: 40,
    gap: 16,
  },
  permissionsContainer: {
    marginTop: 8,
  },
  permissionsTitle: {
    fontSize: 24,
    fontWeight: '600',
    color: '#333333',
    marginBottom: 12,
  },
  permissionsSubtitle: {
    fontSize: 16,
    color: '#666666',
    marginBottom: 24,
    lineHeight: 24,
  },
  permissionsList: {
    marginTop: 8,
    gap: 16,
  },
  buttonContainer: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    padding: 24,
    paddingBottom: 32,
    backgroundColor: 'white',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: -4 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 8,
  },
  paginationContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    position: 'absolute',
    bottom: 100,
    left: 0,
    right: 0,
  },
  paginationDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: '#E0E0E0',
    marginHorizontal: 4,
  },
  activeDot: {
    backgroundColor: '#4B96FF',
    width: 24,
  },
});
