import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Alert } from 'react-native';
import { Pill, Clock, CircleCheck as CheckCircle2, Trash2 } from 'lucide-react-native';

interface Medicine {
  id: string;
  name: string;
  dosage: string;
  frequency: string;
  taken: boolean;
  nextDose: string;
}

interface MedicineCardProps {
  medicine: Medicine;
  onMarkTaken: () => void;
  onDelete: () => void;
}

export function MedicineCard({ medicine, onMarkTaken, onDelete }: MedicineCardProps) {
  const handleDelete = () => {
    Alert.alert(
      'Delete Medicine',
      `Are you sure you want to delete ${medicine.name}?`,
      [
        { text: 'Cancel', style: 'cancel' },
        { text: 'Delete', style: 'destructive', onPress: onDelete },
      ]
    );
  };

  return (
    <View style={[styles.container, medicine.taken && styles.takenContainer]}>
      <View style={styles.header}>
        <View style={styles.medicineInfo}>
          <View style={[styles.iconContainer, medicine.taken && styles.takenIconContainer]}>
            <Pill size={20} color={medicine.taken ? '#10B981' : '#2563EB'} />
          </View>
          <View style={styles.details}>
            <Text style={[styles.name, medicine.taken && styles.takenText]}>
              {medicine.name}
            </Text>
            <Text style={styles.dosage}>{medicine.dosage}</Text>
            <Text style={styles.frequency}>{medicine.frequency}</Text>
          </View>
        </View>
        <TouchableOpacity style={styles.deleteButton} onPress={handleDelete}>
          <Trash2 size={16} color="#EF4444" />
        </TouchableOpacity>
      </View>

      {!medicine.taken && (
        <View style={styles.footer}>
          <View style={styles.nextDose}>
            <Clock size={14} color="#6B7280" />
            <Text style={styles.nextDoseText}>
              Next: {new Date(medicine.nextDose).toLocaleTimeString([], {
                hour: '2-digit',
                minute: '2-digit',
              })}
            </Text>
          </View>
          <TouchableOpacity style={styles.takeButton} onPress={onMarkTaken}>
            <CheckCircle2 size={16} color="#FFFFFF" />
            <Text style={styles.takeButtonText}>Take Now</Text>
          </TouchableOpacity>
        </View>
      )}

      {medicine.taken && (
        <View style={styles.takenBadge}>
          <CheckCircle2 size={16} color="#10B981" />
          <Text style={styles.takenBadgeText}>Taken</Text>
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
  takenContainer: {
    borderLeftColor: '#10B981',
    opacity: 0.7,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 12,
  },
  medicineInfo: {
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
  takenIconContainer: {
    backgroundColor: '#F0FDF4',
  },
  details: {
    flex: 1,
  },
  name: {
    fontSize: 16,
    fontWeight: '600',
    color: '#1F2937',
    marginBottom: 2,
  },
  takenText: {
    textDecorationLine: 'line-through',
    color: '#6B7280',
  },
  dosage: {
    fontSize: 14,
    color: '#6B7280',
    marginBottom: 2,
  },
  frequency: {
    fontSize: 12,
    color: '#9CA3AF',
  },
  deleteButton: {
    padding: 4,
  },
  footer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  nextDose: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  nextDoseText: {
    fontSize: 12,
    color: '#6B7280',
    fontWeight: '500',
  },
  takeButton: {
    backgroundColor: '#10B981',
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 6,
    gap: 4,
  },
  takeButtonText: {
    color: '#FFFFFF',
    fontSize: 12,
    fontWeight: '600',
  },
  takenBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 4,
    paddingVertical: 4,
  },
  takenBadgeText: {
    color: '#10B981',
    fontSize: 14,
    fontWeight: '600',
  },
});