import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { Calendar, Clock, MapPin, Phone, User, Trash2 } from 'lucide-react-native';

interface Appointment {
  id: string;
  doctorName: string;
  specialty: string;
  date: string;
  time: string;
  location: string;
  notes?: string;
}

interface AppointmentCardProps {
  appointment: Appointment;
  onDelete: () => void;
  onCall: () => void;
}

export function AppointmentCard({ appointment, onDelete, onCall }: AppointmentCardProps) {
  const appointmentDate = new Date(appointment.date);
  const isUpcoming = appointmentDate >= new Date();
  const isPast = appointmentDate < new Date();

  return (
    <View style={[styles.container, isPast && styles.pastContainer]}>
      <View style={styles.header}>
        <View style={styles.appointmentInfo}>
          <View style={[styles.iconContainer, isPast && styles.pastIconContainer]}>
            <User size={20} color={isPast ? '#6B7280' : '#2563EB'} />
          </View>
          <View style={styles.details}>
            <Text style={[styles.doctorName, isPast && styles.pastText]}>
              Dr. {appointment.doctorName}
            </Text>
            <Text style={styles.specialty}>{appointment.specialty}</Text>
          </View>
        </View>
        <View style={styles.actions}>
          <TouchableOpacity style={styles.callButton} onPress={onCall}>
            <Phone size={16} color="#10B981" />
          </TouchableOpacity>
          <TouchableOpacity style={styles.deleteButton} onPress={onDelete}>
            <Trash2 size={16} color="#EF4444" />
          </TouchableOpacity>
        </View>
      </View>

      <View style={styles.appointmentDetails}>
        <View style={styles.detailItem}>
          <Calendar size={16} color="#6B7280" />
          <Text style={styles.detailText}>
            {appointmentDate.toLocaleDateString('en-US', {
              weekday: 'long',
              year: 'numeric',
              month: 'long',
              day: 'numeric',
            })}
          </Text>
        </View>

        <View style={styles.detailItem}>
          <Clock size={16} color="#6B7280" />
          <Text style={styles.detailText}>{appointment.time}</Text>
        </View>

        <View style={styles.detailItem}>
          <MapPin size={16} color="#6B7280" />
          <Text style={styles.detailText}>{appointment.location}</Text>
        </View>
      </View>

      {appointment.notes && (
        <View style={styles.notesContainer}>
          <Text style={styles.notesLabel}>Notes:</Text>
          <Text style={styles.notesText}>{appointment.notes}</Text>
        </View>
      )}

      {isUpcoming && (
        <View style={styles.statusBadge}>
          <Text style={styles.statusText}>Upcoming</Text>
        </View>
      )}

      {isPast && (
        <View style={[styles.statusBadge, styles.pastBadge]}>
          <Text style={[styles.statusText, styles.pastStatusText]}>Completed</Text>
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    padding: 16,
    marginBottom: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 3,
    elevation: 2,
    borderLeftWidth: 4,
    borderLeftColor: '#2563EB',
  },
  pastContainer: {
    borderLeftColor: '#6B7280',
    opacity: 0.7,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 12,
  },
  appointmentInfo: {
    flexDirection: 'row',
    flex: 1,
  },
  iconContainer: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#EFF6FF',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  pastIconContainer: {
    backgroundColor: '#F9FAFB',
  },
  details: {
    flex: 1,
  },
  doctorName: {
    fontSize: 16,
    fontWeight: '600',
    color: '#1F2937',
    marginBottom: 2,
  },
  pastText: {
    color: '#6B7280',
  },
  specialty: {
    fontSize: 14,
    color: '#6B7280',
  },
  actions: {
    flexDirection: 'row',
    gap: 8,
  },
  callButton: {
    padding: 4,
  },
  deleteButton: {
    padding: 4,
  },
  appointmentDetails: {
    gap: 8,
    marginBottom: 12,
  },
  detailItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  detailText: {
    fontSize: 14,
    color: '#374151',
    flex: 1,
  },
  notesContainer: {
    marginTop: 8,
    padding: 12,
    backgroundColor: '#F9FAFB',
    borderRadius: 8,
  },
  notesLabel: {
    fontSize: 12,
    fontWeight: '600',
    color: '#374151',
    marginBottom: 4,
  },
  notesText: {
    fontSize: 14,
    color: '#6B7280',
    lineHeight: 20,
  },
  statusBadge: {
    position: 'absolute',
    top: 12,
    right: 12,
    backgroundColor: '#EFF6FF',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 12,
  },
  pastBadge: {
    backgroundColor: '#F9FAFB',
  },
  statusText: {
    fontSize: 12,
    fontWeight: '600',
    color: '#2563EB',
  },
  pastStatusText: {
    color: '#6B7280',
  },
});