import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  TextInput,
  Alert,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Plus, Search, Clock, Pill, CircleCheck as CheckCircle2, TriangleAlert as AlertTriangle } from 'lucide-react-native';
import { MedicineCard } from '@/components/MedicineCard';
import { AddMedicineModal } from '@/components/AddMedicineModal';
import { enhancedStorageService } from '@/services/enhancedStorageService';

export default function MedicinesScreen() {
  const [medicines, setMedicines] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [showAddModal, setShowAddModal] = useState(false);
  const [selectedFilter, setSelectedFilter] = useState('all'); // all, pending, taken

  useEffect(() => {
    loadMedicines();
  }, []);

  const loadMedicines = async () => {
    try {
      const medicineList = await enhancedStorageService.getMedicines();
      setMedicines(medicineList);
    } catch (error) {
      console.error('Error loading medicines:', error);
    }
  };

  const handleAddMedicine = async (medicineData) => {
    try {
      await enhancedStorageService.addMedicine(medicineData);
      setShowAddModal(false);
      loadMedicines();
      Alert.alert('Success', 'Medicine added successfully!');
    } catch (error) {
      Alert.alert('Error', 'Failed to add medicine');
    }
  };

  const handleMarkTaken = async (medicineId) => {
    try {
      await enhancedStorageService.markMedicineTaken(medicineId);
      loadMedicines();
    } catch (error) {
      Alert.alert('Error', 'Failed to update medicine status');
    }
  };

  const handleDeleteMedicine = async (medicineId) => {
    Alert.alert(
      'Delete Medicine',
      'Are you sure you want to delete this medicine?',
      [
        { text: 'Cancel', style: 'cancel' },
        {
          text: 'Delete',
          style: 'destructive',
          onPress: async () => {
            try {
              await enhancedStorageService.deleteMedicine(medicineId);
              loadMedicines();
            } catch (error) {
              Alert.alert('Error', 'Failed to delete medicine');
            }
          },
        },
      ]
    );
  };

  const filteredMedicines = medicines
    .filter((medicine) => {
      if (selectedFilter === 'taken') return medicine.taken;
      if (selectedFilter === 'pending') return !medicine.taken;
      return true;
    })
    .filter((medicine) =>
      medicine.name.toLowerCase().includes(searchQuery.toLowerCase())
    );

  const todayStats = {
    total: medicines.length,
    taken: medicines.filter((med) => med.taken).length,
    pending: medicines.filter((med) => !med.taken).length,
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>My Medicines</Text>
        <TouchableOpacity
          style={styles.addButton}
          onPress={() => setShowAddModal(true)}
        >
          <Plus size={20} color="#FFFFFF" />
        </TouchableOpacity>
      </View>

      {/* Stats Cards */}
      <View style={styles.statsContainer}>
        <View style={[styles.statCard, styles.totalCard]}>
          <Pill size={20} color="#2563EB" />
          <Text style={styles.statNumber}>{todayStats.total}</Text>
          <Text style={styles.statLabel}>Total</Text>
        </View>
        <View style={[styles.statCard, styles.takenCard]}>
          <CheckCircle2 size={20} color="#10B981" />
          <Text style={styles.statNumber}>{todayStats.taken}</Text>
          <Text style={styles.statLabel}>Taken</Text>
        </View>
        <View style={[styles.statCard, styles.pendingCard]}>
          <Clock size={20} color="#F59E0B" />
          <Text style={styles.statNumber}>{todayStats.pending}</Text>
          <Text style={styles.statLabel}>Pending</Text>
        </View>
      </View>

      {/* Search Bar */}
      <View style={styles.searchContainer}>
        <View style={styles.searchBar}>
          <Search size={20} color="#6B7280" />
          <TextInput
            style={styles.searchInput}
            placeholder="Search medicines..."
            value={searchQuery}
            onChangeText={setSearchQuery}
            placeholderTextColor="#9CA3AF"
          />
        </View>
      </View>

      {/* Filter Tabs */}
      <View style={styles.filterContainer}>
        {['all', 'pending', 'taken'].map((filter) => (
          <TouchableOpacity
            key={filter}
            style={[
              styles.filterTab,
              selectedFilter === filter && styles.activeFilterTab,
            ]}
            onPress={() => setSelectedFilter(filter)}
          >
            <Text
              style={[
                styles.filterText,
                selectedFilter === filter && styles.activeFilterText,
              ]}
            >
              {filter.charAt(0).toUpperCase() + filter.slice(1)}
            </Text>
          </TouchableOpacity>
        ))}
      </View>

      {/* Medicine List */}
      <ScrollView style={styles.medicineList} showsVerticalScrollIndicator={false}>
        {filteredMedicines.length === 0 ? (
          <View style={styles.emptyState}>
            <Pill size={48} color="#9CA3AF" />
            <Text style={styles.emptyTitle}>No medicines found</Text>
            <Text style={styles.emptyDescription}>
              {medicines.length === 0
                ? "Start by adding your first medicine"
                : "Try adjusting your search or filter"}
            </Text>
          </View>
        ) : (
          <View style={styles.medicineGrid}>
            {filteredMedicines.map((medicine) => (
              <MedicineCard
                key={medicine.id}
                medicine={medicine}
                onMarkTaken={() => handleMarkTaken(medicine.id)}
                onDelete={() => handleDeleteMedicine(medicine.id)}
              />
            ))}
          </View>
        )}
      </ScrollView>

      {/* Add Medicine Modal */}
      <AddMedicineModal
        visible={showAddModal}
        onClose={() => setShowAddModal(false)}
        onAdd={handleAddMedicine}
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
  totalCard: {
    backgroundColor: '#EFF6FF',
  },
  takenCard: {
    backgroundColor: '#F0FDF4',
  },
  pendingCard: {
    backgroundColor: '#FFFBEB',
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
  searchContainer: {
    paddingHorizontal: 20,
    paddingBottom: 16,
  },
  searchBar: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    paddingHorizontal: 16,
    paddingVertical: 12,
    gap: 12,
    borderWidth: 1,
    borderColor: '#E5E7EB',
  },
  searchInput: {
    flex: 1,
    fontSize: 16,
    color: '#1F2937',
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
  medicineList: {
    flex: 1,
  },
  medicineGrid: {
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
});