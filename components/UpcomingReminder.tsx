import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { Clock, CircleCheck as CheckCircle2, Pill } from 'lucide-react-native';
import { LinearGradient } from 'react-native-linear-gradient';

interface UpcomingReminderProps {
  medicineName: string;
  time: string;
  dosage: string;
  onTaken: () => void;
}

export function UpcomingReminder({
  medicineName,
  time,
  dosage,
  onTaken,
}: UpcomingReminderProps) {
  return (
    <LinearGradient
      colors={['#FFFFFF', '#F7FAFC']}
      style={styles.container}
    >
      <LinearGradient
        colors={['#667eea', '#764ba2']}
        style={styles.iconContainer}
      >
        <Pill size={24} color="#FFFFFF" />
      </LinearGradient>
      <View style={styles.content}>
        <View style={styles.header}>
          <Text style={styles.medicineName}>{medicineName}</Text>
          <View style={styles.timeContainer}>
            <Clock size={16} color="#6B7280" />
            <Text style={styles.time}>{time}</Text>
          </View>
        </View>
        <Text style={styles.dosage}>{dosage}</Text>
        <TouchableOpacity onPress={onTaken}>
          <LinearGradient
            colors={['#48BB78', '#38A169']}
            style={styles.takenButton}
          >
            <CheckCircle2 size={16} color="#FFFFFF" />
            <Text style={styles.takenText}>Mark as Taken</Text>
          </LinearGradient>
        </TouchableOpacity>
      </View>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  container: {
    borderRadius: 16,
    padding: 20,
    flexDirection: 'row',
    shadowColor: '#667eea',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.15,
    shadowRadius: 12,
    elevation: 8,
    borderWidth: 1,
    borderColor: 'rgba(102, 126, 234, 0.1)',
  },
  iconContainer: {
    width: 56,
    height: 56,
    borderRadius: 28,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 16,
  },
  content: {
    flex: 1,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 4,
  },
  medicineName: {
    fontSize: 19,
    fontWeight: '700',
    color: '#2D3748',
    flex: 1,
  },
  timeContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  time: {
    fontSize: 15,
    color: '#4A5568',
    fontWeight: '600',
  },
  dosage: {
    fontSize: 15,
    color: '#718096',
    marginBottom: 16,
    fontWeight: '500',
  },
  takenButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 20,
    paddingVertical: 12,
    borderRadius: 12,
    gap: 6,
  },
  takenText: {
    color: '#FFFFFF',
    fontWeight: '700',
    fontSize: 15,
  },
});