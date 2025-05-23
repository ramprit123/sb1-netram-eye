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
  SlideInRight 
} from 'react-native-reanimated';
import { Eye, Palette, Clock, ArrowDown, CalendarDays, Share2, Download, ChartPie as PieChart } from 'lucide-react-native';
import Card from '@/components/common/Card';
import CircleProgress from '@/components/common/CircleProgress';
import Button from '@/components/common/Button';

export default function ReportsScreen() {
  const [activeFilter, setActiveFilter] = useState('all');

  const filters = [
    { id: 'all', label: 'All Tests' },
    { id: 'vision', label: 'Vision' },
    { id: 'color', label: 'Color' },
    { id: 'pressure', label: 'Pressure' }
  ];

  const reports = [
    {
      id: '1',
      title: 'Vision Acuity Test',
      date: 'Today, 10:30 AM',
      score: 95,
      status: 'Excellent',
      icon: <Eye size={24} color="#4B96FF" />,
      details: [
        { label: 'Left Eye', value: '20/20' },
        { label: 'Right Eye', value: '20/25' }
      ]
    },
    {
      id: '2',
      title: 'Color Vision Test',
      date: 'Yesterday, 2:15 PM',
      score: 100,
      status: 'Perfect',
      icon: <Palette size={24} color="#4B96FF" />,
      details: [
        { label: 'Red-Green', value: 'Normal' },
        { label: 'Blue-Yellow', value: 'Normal' }
      ]
    },
    {
      id: '3',
      title: 'Astigmatism Test',
      date: 'May 15, 2024',
      score: 80,
      status: 'Good',
      icon: <Eye size={24} color="#4B96FF" />,
      details: [
        { label: 'Left Eye', value: 'Mild' },
        { label: 'Right Eye', value: 'Normal' }
      ]
    }
  ];

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Your Reports</Text>
        <View style={styles.headerActions}>
          <TouchableOpacity style={styles.headerButton}>
            <CalendarDays size={20} color="#666666" />
          </TouchableOpacity>
          <TouchableOpacity style={styles.headerButton}>
            <ArrowDown size={20} color="#666666" />
          </TouchableOpacity>
        </View>
      </View>

      <Animated.View 
        entering={FadeIn.duration(400)}
        style={styles.filtersContainer}
      >
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.filtersScroll}
        >
          {filters.map((filter) => (
            <TouchableOpacity
              key={filter.id}
              style={[
                styles.filterButton,
                activeFilter === filter.id && styles.activeFilterButton
              ]}
              onPress={() => setActiveFilter(filter.id)}
            >
              <Text
                style={[
                  styles.filterButtonText,
                  activeFilter === filter.id && styles.activeFilterButtonText
                ]}
              >
                {filter.label}
              </Text>
            </TouchableOpacity>
          ))}
        </ScrollView>
      </Animated.View>

      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scrollContent}
      >
        <Animated.View 
          entering={SlideInRight.duration(500).delay(200)}
          style={styles.summaryCard}
        >
          <Text style={styles.summaryTitle}>Monthly Summary</Text>
          <View style={styles.summaryContent}>
            <CircleProgress
              progress={85}
              size={100}
              strokeWidth={10}
              color="#4B96FF"
              backgroundColor="#E5E5E5"
              duration={1500}
            />
            <View style={styles.summaryStats}>
              <View style={styles.statItem}>
                <Text style={styles.statValue}>12</Text>
                <Text style={styles.statLabel}>Tests Taken</Text>
              </View>
              <View style={styles.statDivider} />
              <View style={styles.statItem}>
                <Text style={styles.statValue}>85%</Text>
                <Text style={styles.statLabel}>Avg. Score</Text>
              </View>
            </View>
          </View>
          <View style={styles.summaryActions}>
            <Button
              title="View Trends"
              onPress={() => {}}
              primary={false}
              secondary={true}
              icon={<PieChart size={16} color="#4B96FF" />}
              style={styles.summaryButton}
            />
            <Button
              title="Share Results"
              onPress={() => {}}
              primary={false}
              secondary={true}
              icon={<Share2 size={16} color="#4B96FF" />}
              style={styles.summaryButton}
            />
          </View>
        </Animated.View>

        <View style={styles.reportsListContainer}>
          <View style={styles.reportsListHeader}>
            <Text style={styles.reportsListTitle}>Recent Test Reports</Text>
            <TouchableOpacity>
              <Text style={styles.viewAllText}>View All</Text>
            </TouchableOpacity>
          </View>

          {reports.map((report, index) => (
            <Animated.View
              key={report.id}
              entering={FadeIn.duration(400).delay(300 + index * 100)}
              style={styles.reportCardContainer}
            >
              <Card
                title={report.title}
                subtitle={report.date}
                icon={report.icon}
                onPress={() => {}}
                style={styles.reportCard}
              >
                <View style={styles.reportCardContent}>
                  <View style={styles.reportScoreRow}>
                    <View style={styles.scoreContainer}>
                      <Text style={styles.scoreValue}>{report.score}</Text>
                      <Text style={styles.scoreUnit}>/100</Text>
                    </View>
                    <View style={styles.statusContainer}>
                      <Text style={styles.statusLabel}>Status:</Text>
                      <Text style={styles.statusValue}>{report.status}</Text>
                    </View>
                  </View>

                  <View style={styles.detailsContainer}>
                    {report.details.map((detail, i) => (
                      <View key={i} style={styles.detailItem}>
                        <Text style={styles.detailLabel}>{detail.label}:</Text>
                        <Text style={styles.detailValue}>{detail.value}</Text>
                      </View>
                    ))}
                  </View>

                  <View style={styles.reportActions}>
                    <TouchableOpacity style={styles.reportAction}>
                      <Share2 size={16} color="#666666" />
                      <Text style={styles.reportActionText}>Share</Text>
                    </TouchableOpacity>
                    <View style={styles.actionDivider} />
                    <TouchableOpacity style={styles.reportAction}>
                      <Download size={16} color="#666666" />
                      <Text style={styles.reportActionText}>Download</Text>
                    </TouchableOpacity>
                  </View>
                </View>
              </Card>
            </Animated.View>
          ))}
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
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 24,
    paddingTop: 16,
    paddingBottom: 8,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#333333',
  },
  headerActions: {
    flexDirection: 'row',
  },
  headerButton: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: '#F5F7FA',
    justifyContent: 'center',
    alignItems: 'center',
    marginLeft: 8,
  },
  filtersContainer: {
    marginVertical: 16,
  },
  filtersScroll: {
    paddingHorizontal: 16,
  },
  filterButton: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
    marginHorizontal: 6,
    backgroundColor: '#F5F7FA',
  },
  activeFilterButton: {
    backgroundColor: '#EDF5FF',
  },
  filterButtonText: {
    fontSize: 14,
    color: '#666666',
  },
  activeFilterButtonText: {
    fontWeight: '600',
    color: '#4B96FF',
  },
  scrollContent: {
    paddingBottom: 40,
  },
  summaryCard: {
    backgroundColor: '#F8F9FA',
    borderRadius: 16,
    padding: 20,
    marginHorizontal: 24,
    marginBottom: 24,
  },
  summaryTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#333333',
    marginBottom: 16,
  },
  summaryContent: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
  },
  summaryStats: {
    flex: 1,
    flexDirection: 'row',
    marginLeft: 16,
    backgroundColor: 'white',
    borderRadius: 12,
    padding: 16,
  },
  statItem: {
    flex: 1,
    alignItems: 'center',
  },
  statValue: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#333333',
    marginBottom: 4,
  },
  statLabel: {
    fontSize: 12,
    color: '#666666',
  },
  statDivider: {
    width: 1,
    backgroundColor: '#EEEEEE',
    marginHorizontal: 8,
  },
  summaryActions: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  summaryButton: {
    flex: 1,
    marginHorizontal: 6,
  },
  reportsListContainer: {
    paddingHorizontal: 24,
  },
  reportsListHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  reportsListTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#333333',
  },
  viewAllText: {
    fontSize: 14,
    color: '#4B96FF',
  },
  reportCardContainer: {
    marginBottom: 16,
  },
  reportCard: {
    padding: 16,
  },
  reportCardContent: {
    marginTop: 8,
  },
  reportScoreRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  scoreContainer: {
    flexDirection: 'row',
    alignItems: 'baseline',
  },
  scoreValue: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#333333',
  },
  scoreUnit: {
    fontSize: 16,
    color: '#999999',
    marginLeft: 2,
  },
  statusContainer: {
    backgroundColor: '#F0F7FF',
    borderRadius: 16,
    paddingHorizontal: 12,
    paddingVertical: 6,
    flexDirection: 'row',
    alignItems: 'center',
  },
  statusLabel: {
    fontSize: 14,
    color: '#666666',
    marginRight: 4,
  },
  statusValue: {
    fontSize: 14,
    fontWeight: '600',
    color: '#4B96FF',
  },
  detailsContainer: {
    backgroundColor: '#F8F9FA',
    borderRadius: 12,
    padding: 12,
    marginBottom: 16,
  },
  detailItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 8,
  },
  detailLabel: {
    fontSize: 14,
    color: '#666666',
  },
  detailValue: {
    fontSize: 14,
    fontWeight: '500',
    color: '#333333',
  },
  reportActions: {
    flexDirection: 'row',
    borderTopWidth: 1,
    borderTopColor: '#EEEEEE',
    paddingTop: 12,
  },
  reportAction: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  reportActionText: {
    fontSize: 14,
    color: '#666666',
    marginLeft: 6,
  },
  actionDivider: {
    width: 1,
    backgroundColor: '#EEEEEE',
    height: '100%',
  },
});