import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  Alert,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import {
  Plus,
  Calendar as CalendarIcon,
  Clock,
  MapPin,
  User,
  Phone,
} from 'lucide-react-native';
import { AppointmentCard } from '@/components/AppointmentCard';
import { AddAppointmentModal } from '@/components/AddAppointmentModal';
import { enhancedStorageService } from '@/services/enhancedStorageService';

export default function AppointmentsScreen() {
  const [appointments, setAppointments] = useState([]);
  const [showAddModal, setShowAddModal] = useState(false);
  const [selectedFilter, setSelectedFilter] = useState('upcoming'); // upcoming, past, all

  useEffect(() => {
    loadAppointments();
  }, []);

  const loadAppointments = async () => {
    try {
      const appointmentList = await enhancedStorageService.getAppointments();
      setAppointments(appointmentList);
    } catch (error) {
      console.error('Error loading appointments:', error);
    }
  };

  const handleAddAppointment = async (appointmentData) => {
    try {
      await enhancedStorageService.addAppointment(appointmentData);
      setShowAddModal(false);
      loadAppointments();
      Alert.alert('Success', 'Appointment scheduled successfully!');
    } catch (error) {
      Alert.alert('Error', 'Failed to schedule appointment');
    }
  };

  const handleDeleteAppointment = async (appointmentId) => {
    Alert.alert(
      'Cancel Appointment',
      'Are you sure you want to cancel this appointment?',
      [
        { text: 'No', style: 'cancel' },
        {
          text: 'Yes, Cancel',
          style: 'destructive',
          onPress: async () => {
            try {
              await enhancedStorageService.deleteAppointment(appointmentId);
              loadAppointments();
              Alert.alert('Success', 'Appointment cancelled');
            } catch (error) {
              Alert.alert('Error', 'Failed to cancel appointment');
            }
          },
        },
      ]
    );
  };

  const now = new Date();
  const filteredAppointments = appointments
    .filter((appointment) => {
      const appointmentDate = new Date(appointment.date);
      if (selectedFilter === 'upcoming') return appointmentDate >= now;
      if (selectedFilter === 'past') return appointmentDate < now;
      return true;
    })
    .sort((a, b) => new Date(a.date) - new Date(b.date));

  const upcomingCount = appointments.filter(
    (appt) => new Date(appt.date) >= now
  ).length;
  const pastCount = appointments.filter(
    (appt) => new Date(appt.date) < now
  ).length;

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Appointments</Text>
        <TouchableOpacity
          style={styles.addButton}
          onPress={() => setShowAddModal(true)}
        >
          <Plus size={20} color="#FFFFFF" />
        </TouchableOpacity>
      </View>

      {/* Stats Cards */}
      <View style={styles.statsContainer}>
        <View style={[styles.statCard, styles.upcomingCard]}>
          <CalendarIcon size={20} color="#2563EB" />
          <Text style={styles.statNumber}>{upcomingCount}</Text>
          <Text style={styles.statLabel}>Upcoming</Text>
        </View>
        <View style={[styles.statCard, styles.pastCard]}>
          <Clock size={20} color="#6B7280" />
          <Text style={styles.statNumber}>{pastCount}</Text>
          <Text style={styles.statLabel}>Completed</Text>
        </View>
        <View style={[styles.statCard, styles.totalCard]}>
          <User size={20} color="#10B981" />
          <Text style={styles.statNumber}>{appointments.length}</Text>
          <Text style={styles.statLabel}>Total</Text>
        </View>
      </View>

      {/* Filter Tabs */}
      <View style={styles.filterContainer}>
        {[
          { key: 'upcoming', label: 'Upcoming' },
          { key: 'past', label: 'Past' },
          { key: 'all', label: 'All' },
        ].map((filter) => (
          <TouchableOpacity
            key={filter.key}
            style={[
              styles.filterTab,
              selectedFilter === filter.key && styles.activeFilterTab,
            ]}
            onPress={() => setSelectedFilter(filter.key)}
          >
            <Text
              style={[
                styles.filterText,
                selectedFilter === filter.key && styles.activeFilterText,
              ]}
            >
              {filter.label}
            </Text>
          </TouchableOpacity>
        ))}
      </View>

      {/* Appointments List */}
      <ScrollView style={styles.appointmentsList} showsVerticalScrollIndicator={false}>
        {filteredAppointments.length === 0 ? (
          <View style={styles.emptyState}>
            <CalendarIcon size={48} color="#9CA3AF" />
            <Text style={styles.emptyTitle}>No appointments found</Text>
            <Text style={styles.emptyDescription}>
              {appointments.length === 0
                ? "Schedule your first appointment"
                : `No ${selectedFilter} appointments`}
            </Text>
            {appointments.length === 0 && (
              <TouchableOpacity
                style={styles.emptyActionButton}
                onPress={() => setShowAddModal(true)}
              >
                <Plus size={20} color="#2563EB" />
                <Text style={styles.emptyActionText}>Schedule Appointment</Text>
              </TouchableOpacity>
            )}
          </View>
        ) : (
          <View style={styles.appointmentsGrid}>
            {filteredAppointments.map((appointment) => (
              <AppointmentCard
                key={appointment.id}
                appointment={appointment}
                onDelete={() => handleDeleteAppointment(appointment.id)}
                onCall={() => {
                  Alert.alert(
                    'Call Doctor',
                    `Call ${appointment.doctorName}?`,
                    [
                      { text: 'Cancel', style: 'cancel' },
                      { text: 'Call', onPress: () => console.log('Calling...') },
                    ]
                  );
                }}
              />
            ))}
          </View>
        )}
      </ScrollView>

      {/* Add Appointment Modal */}
      <AddAppointmentModal
        visible={showAddModal}
        onClose={() => setShowAddModal(false)}
        onAdd={handleAddAppointment}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F8FAFC',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingVertical: 16,
    backgroundColor: '#FFFFFF',
    borderBottomWidth: 1,
    borderBottomColor: '#E5E7EB',
  },
  title: {
    fontSize: 24,
    fontWeight: '700',
    color: '#1F2937',
  },
  addButton: {
    backgroundColor: '#2563EB',
    width: 40,
    height: 40,
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#2563EB',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 4,
  },
  statsContainer: {
    flexDirection: 'row',
    paddingHorizontal: 20,
    paddingVertical: 16,
    gap: 12,
  },
  statCard: {
    flex: 1,
    padding: 16,
    borderRadius: 12,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 3,
    elevation: 2,
  },
  upcomingCard: {
    backgroundColor: '#EFF6FF',
  },
  pastCard: {
    backgroundColor: '#F9FAFB',
  },
  totalCard: {
    backgroundColor: '#F0FDF4',
  },
  statNumber: {
    fontSize: 24,
    fontWeight: '700',
    color: '#1F2937',
    marginTop: 8,
  },
  statLabel: {
    fontSize: 12,
    color: '#6B7280',
    marginTop: 4,
    fontWeight: '500',
  },
  filterContainer: {
    flexDirection: 'row',
    paddingHorizontal: 20,
    paddingBottom: 16,
    gap: 8,
  },
  filterTab: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
    backgroundColor: '#F3F4F6',
  },
  activeFilterTab: {
    backgroundColor: '#2563EB',
  },
  filterText: {
    fontSize: 14,
    fontWeight: '500',
    color: '#6B7280',
  },
  activeFilterText: {
    color: '#FFFFFF',
  },
  appointmentsList: {
    flex: 1,
  },
  appointmentsGrid: {
    paddingHorizontal: 20,
    paddingBottom: 20,
  },
  emptyState: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 20,
    paddingVertical: 60,
  },
  emptyTitle: {
    fontSize: 20,
    fontWeight: '600',
    color: '#374151',
    marginTop: 16,
    textAlign: 'center',
  },
  emptyDescription: {
    fontSize: 16,
    color: '#6B7280',
    marginTop: 8,
    textAlign: 'center',
    lineHeight: 24,
  },
  emptyActionButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#EFF6FF',
    paddingHorizontal: 20,
    paddingVertical: 12,
    borderRadius: 12,
    marginTop: 20,
    gap: 8,
  },
  emptyActionText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#2563EB',
  },
});