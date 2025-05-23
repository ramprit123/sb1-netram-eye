import React, { useState } from 'react';
import { 
  StyleSheet, 
  View, 
  Text, 
  SafeAreaView, 
  ScrollView, 
  Image, 
  TouchableOpacity, 
  Switch 
} from 'react-native';
import Animated, { 
  FadeIn,
  SlideInUp
} from 'react-native-reanimated';
import { CircleUser as UserCircle, Clock, History, Shield, Phone, Moon, FileSliders as Sliders, Languages, AlignLeft, Bell, Lock, CircleHelp as HelpCircle } from 'lucide-react-native';
import Button from '@/components/common/Button';
import SettingsItem from '@/components/common/SettingsItem';

export default function ProfileScreen() {
  const [darkMode, setDarkMode] = useState(false);
  const [voiceGuide, setVoiceGuide] = useState(false);
  const [screenReader, setScreenReader] = useState(false);
  const [colorBlindMode, setColorBlindMode] = useState(false);
  const [motionReduction, setMotionReduction] = useState(false);
  const [contrastValue, setContrastValue] = useState(50);

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scrollContent}
      >
        <Animated.View 
          entering={FadeIn.duration(600)}
          style={styles.profileHeader}
        >
          <View style={styles.profileImageContainer}>
            <Image
              source={{ uri: 'https://images.pexels.com/photos/774909/pexels-photo-774909.jpeg' }}
              style={styles.profileImage}
            />
          </View>
          <Text style={styles.profileName}>Sarah Johnson</Text>
          <Text style={styles.profileEmail}>sarah.j@email.com</Text>
          <Button
            title="Edit Profile"
            onPress={() => {}}
            primary={false}
            secondary={true}
            style={styles.editProfileButton}
          />
        </Animated.View>

        <Animated.View 
          entering={SlideInUp.duration(600).delay(200)}
          style={styles.infoCard}
        >
          <Text style={styles.sectionTitle}>Health Information</Text>
          <View style={styles.infoRow}>
            <Text style={styles.infoLabel}>Last Eye Test</Text>
            <Text style={styles.infoValue}>March 15, 2024</Text>
          </View>
          <View style={styles.infoRow}>
            <Text style={styles.infoLabel}>Prescription Status</Text>
            <Text style={[styles.infoValue, styles.updatedText]}>Updated</Text>
          </View>
          <View style={styles.infoRow}>
            <Text style={styles.infoLabel}>Next Checkup</Text>
            <Text style={styles.infoValue}>April 30, 2024</Text>
          </View>
        </Animated.View>

        <View style={styles.settingsContainer}>
          <Text style={styles.sectionTitle}>Account Settings</Text>
          
          <Animated.View entering={FadeIn.duration(400).delay(300)}>
            <SettingsItem
              icon={<UserCircle size={20} color="#4B96FF" />}
              title="Personal Information"
              onPress={() => {}}
              showChevron
            />
            
            <SettingsItem
              icon={<History size={20} color="#4B96FF" />}
              title="Medical History"
              onPress={() => {}}
              showChevron
            />
            
            <SettingsItem
              icon={<Shield size={20} color="#4B96FF" />}
              title="Insurance Details"
              onPress={() => {}}
              showChevron
            />
            
            <SettingsItem
              icon={<Phone size={20} color="#4B96FF" />}
              title="Emergency Contacts"
              onPress={() => {}}
              showChevron
            />
          </Animated.View>

          <Text style={[styles.sectionTitle, styles.visualSection]}>Visual Preferences</Text>
          
          <Animated.View entering={FadeIn.duration(400).delay(400)}>
            <SettingsItem
              icon={<Moon size={20} color="#4B96FF" />}
              title="Dark Mode"
              hasToggle
              toggleValue={darkMode}
              onToggleChange={setDarkMode}
            />
            
            <SettingsItem
              icon={<Sliders size={20} color="#4B96FF" />}
              title="Contrast"
              rightContent={
                <View style={styles.sliderContainer}>
                  <View style={styles.slider}>
                    <View 
                      style={[
                        styles.sliderFill, 
                        { width: `${contrastValue}%` }
                      ]} 
                    />
                  </View>
                </View>
              }
            />
            
            <SettingsItem
              icon={<AlignLeft size={20} color="#4B96FF" />}
              title="Font Size"
              rightContent={
                <Text style={styles.rightValueText}>Medium</Text>
              }
              showChevron
            />
          </Animated.View>
          
          <Text style={[styles.sectionTitle, styles.accessibilitySection]}>Accessibility</Text>
          
          <Animated.View entering={FadeIn.duration(400).delay(500)}>
            <SettingsItem
              icon={<Bell size={20} color="#4B96FF" />}
              title="Voice Guide"
              hasToggle
              toggleValue={voiceGuide}
              onToggleChange={setVoiceGuide}
            />
            
            <SettingsItem
              icon={<UserCircle size={20} color="#4B96FF" />}
              title="Screen Reader"
              hasToggle
              toggleValue={screenReader}
              onToggleChange={setScreenReader}
            />
            
            <SettingsItem
              icon={<Sliders size={20} color="#4B96FF" />}
              title="Color Blind Mode"
              hasToggle
              toggleValue={colorBlindMode}
              onToggleChange={setColorBlindMode}
            />
            
            <SettingsItem
              icon={<Clock size={20} color="#4B96FF" />}
              title="Motion Reduction"
              hasToggle
              toggleValue={motionReduction}
              onToggleChange={setMotionReduction}
            />
          </Animated.View>
          
          <Text style={[styles.sectionTitle, styles.appSection]}>App Settings</Text>
          
          <Animated.View entering={FadeIn.duration(400).delay(600)}>
            <SettingsItem
              icon={<Bell size={20} color="#4B96FF" />}
              title="Notifications"
              onPress={() => {}}
              showChevron
            />
            
            <SettingsItem
              icon={<Languages size={20} color="#4B96FF" />}
              title="Language"
              rightContent={
                <Text style={styles.rightValueText}>English</Text>
              }
              onPress={() => {}}
              showChevron
            />
            
            <SettingsItem
              icon={<Lock size={20} color="#4B96FF" />}
              title="Privacy"
              onPress={() => {}}
              showChevron
            />
            
            <SettingsItem
              icon={<HelpCircle size={20} color="#4B96FF" />}
              title="Help & Support"
              onPress={() => {}}
              showChevron
            />
          </Animated.View>
        </View>
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
  profileHeader: {
    alignItems: 'center',
    paddingVertical: 24,
    paddingHorizontal: 24,
    borderBottomWidth: 1,
    borderBottomColor: '#F0F0F0',
  },
  profileImageContainer: {
    width: 100,
    height: 100,
    borderRadius: 50,
    backgroundColor: '#F5F7FA',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
    overflow: 'hidden',
  },
  profileImage: {
    width: 100,
    height: 100,
    borderRadius: 50,
  },
  profileName: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#333333',
    marginBottom: 4,
  },
  profileEmail: {
    fontSize: 16,
    color: '#666666',
    marginBottom: 16,
  },
  editProfileButton: {
    paddingHorizontal: 24,
    paddingVertical: 8,
  },
  infoCard: {
    marginHorizontal: 24,
    marginTop: 24,
    marginBottom: 16,
    backgroundColor: '#F8F9FA',
    borderRadius: 16,
    padding: 16,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#333333',
    marginBottom: 16,
    marginTop: 8,
  },
  infoRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 12,
  },
  infoLabel: {
    fontSize: 16,
    color: '#666666',
  },
  infoValue: {
    fontSize: 16,
    fontWeight: '500',
    color: '#333333',
  },
  updatedText: {
    color: '#4CD964',
  },
  settingsContainer: {
    paddingHorizontal: 24,
  },
  visualSection: {
    marginTop: 32,
  },
  accessibilitySection: {
    marginTop: 32,
  },
  appSection: {
    marginTop: 32,
  },
  sliderContainer: {
    width: 100,
    height: 20,
    justifyContent: 'center',
  },
  slider: {
    height: 4,
    backgroundColor: '#E0E0E0',
    borderRadius: 2,
  },
  sliderFill: {
    height: 4,
    backgroundColor: '#4B96FF',
    borderRadius: 2,
  },
  rightValueText: {
    fontSize: 16,
    color: '#666666',
    marginRight: 8,
  },
});