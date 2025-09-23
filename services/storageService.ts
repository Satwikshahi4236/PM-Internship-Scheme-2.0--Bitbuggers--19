import AsyncStorage from '@react-native-async-storage/async-storage';

const STORAGE_KEYS = {
  PROFILE: '@swaasth_profile',
  MEDICINES: '@swaasth_medicines',
  APPOINTMENTS: '@swaasth_appointments',
  FAMILY_MEMBERS: '@swaasth_family_members',
  FAMILY_MESSAGES: '@swaasth_family_messages',
  SETTINGS: '@swaasth_settings',
};

class StorageService {
  // Profile methods
  async getProfile() {
    try {
      const profile = await AsyncStorage.getItem(STORAGE_KEYS.PROFILE);
      return profile ? JSON.parse(profile) : null;
    } catch (error) {
      console.error('Error getting profile:', error);
      return null;
    }
  }

  async saveProfile(profile: any) {
    try {
      await AsyncStorage.setItem(STORAGE_KEYS.PROFILE, JSON.stringify(profile));
    } catch (error) {
      console.error('Error saving profile:', error);
      throw error;
    }
  }

  // Medicines methods
  async getMedicines() {
    try {
      const medicines = await AsyncStorage.getItem(STORAGE_KEYS.MEDICINES);
      return medicines ? JSON.parse(medicines) : this.getDefaultMedicines();
    } catch (error) {
      console.error('Error getting medicines:', error);
      return this.getDefaultMedicines();
    }
  }

  async addMedicine(medicine: any) {
    try {
      const medicines = await this.getMedicines();
      medicines.push(medicine);
      await AsyncStorage.setItem(STORAGE_KEYS.MEDICINES, JSON.stringify(medicines));
    } catch (error) {
      console.error('Error adding medicine:', error);
      throw error;
    }
  }

  async markMedicineTaken(medicineId: string) {
    try {
      const medicines = await this.getMedicines();
      const updatedMedicines = medicines.map((med: any) =>
        med.id === medicineId ? { ...med, taken: !med.taken } : med
      );
      await AsyncStorage.setItem(STORAGE_KEYS.MEDICINES, JSON.stringify(updatedMedicines));
    } catch (error) {
      console.error('Error marking medicine as taken:', error);
      throw error;
    }
  }

  async deleteMedicine(medicineId: string) {
    try {
      const medicines = await this.getMedicines();
      const filteredMedicines = medicines.filter((med: any) => med.id !== medicineId);
      await AsyncStorage.setItem(STORAGE_KEYS.MEDICINES, JSON.stringify(filteredMedicines));
    } catch (error) {
      console.error('Error deleting medicine:', error);
      throw error;
    }
  }

  // Appointments methods
  async getAppointments() {
    try {
      const appointments = await AsyncStorage.getItem(STORAGE_KEYS.APPOINTMENTS);
      return appointments ? JSON.parse(appointments) : this.getDefaultAppointments();
    } catch (error) {
      console.error('Error getting appointments:', error);
      return this.getDefaultAppointments();
    }
  }

  async addAppointment(appointment: any) {
    try {
      const appointments = await this.getAppointments();
      appointments.push(appointment);
      await AsyncStorage.setItem(STORAGE_KEYS.APPOINTMENTS, JSON.stringify(appointments));
    } catch (error) {
      console.error('Error adding appointment:', error);
      throw error;
    }
  }

  async deleteAppointment(appointmentId: string) {
    try {
      const appointments = await this.getAppointments();
      const filteredAppointments = appointments.filter((appt: any) => appt.id !== appointmentId);
      await AsyncStorage.setItem(STORAGE_KEYS.APPOINTMENTS, JSON.stringify(filteredAppointments));
    } catch (error) {
      console.error('Error deleting appointment:', error);
      throw error;
    }
  }

  // Family members methods
  async getFamilyMembers() {
    try {
      const members = await AsyncStorage.getItem(STORAGE_KEYS.FAMILY_MEMBERS);
      return members ? JSON.parse(members) : this.getDefaultFamilyMembers();
    } catch (error) {
      console.error('Error getting family members:', error);
      return this.getDefaultFamilyMembers();
    }
  }

  async addFamilyMember(member: any) {
    try {
      const members = await this.getFamilyMembers();
      members.push(member);
      await AsyncStorage.setItem(STORAGE_KEYS.FAMILY_MEMBERS, JSON.stringify(members));
    } catch (error) {
      console.error('Error adding family member:', error);
      throw error;
    }
  }

  // Family messages methods
  async getFamilyMessages() {
    try {
      const messages = await AsyncStorage.getItem(STORAGE_KEYS.FAMILY_MESSAGES);
      return messages ? JSON.parse(messages) : this.getDefaultFamilyMessages();
    } catch (error) {
      console.error('Error getting family messages:', error);
      return this.getDefaultFamilyMessages();
    }
  }

  async addFamilyMessage(message: any) {
    try {
      const messages = await this.getFamilyMessages();
      messages.push({ ...message, id: Date.now().toString() });
      await AsyncStorage.setItem(STORAGE_KEYS.FAMILY_MESSAGES, JSON.stringify(messages));
    } catch (error) {
      console.error('Error adding family message:', error);
      throw error;
    }
  }

  // Settings methods
  async getSettings() {
    try {
      const settings = await AsyncStorage.getItem(STORAGE_KEYS.SETTINGS);
      return settings ? JSON.parse(settings) : this.getDefaultSettings();
    } catch (error) {
      console.error('Error getting settings:', error);
      return this.getDefaultSettings();
    }
  }

  async saveSettings(settings: any) {
    try {
      await AsyncStorage.setItem(STORAGE_KEYS.SETTINGS, JSON.stringify(settings));
    } catch (error) {
      console.error('Error saving settings:', error);
      throw error;
    }
  }

  // Clear all data
  async clearAllData() {
    try {
      await AsyncStorage.multiRemove(Object.values(STORAGE_KEYS));
    } catch (error) {
      console.error('Error clearing all data:', error);
      throw error;
    }
  }

  // Default data generators
  private getDefaultMedicines() {
    return [
      {
        id: '1',
        name: 'Lisinopril',
        dosage: '10mg',
        frequency: 'Once daily',
        taken: false,
        nextDose: new Date(Date.now() + 2 * 60 * 60 * 1000).toISOString(),
        schedule: [new Date(Date.now() + 2 * 60 * 60 * 1000).toISOString()],
        instructions: 'Take with or without food',
        createdAt: new Date().toISOString(),
      },
      {
        id: '2',
        name: 'Metformin',
        dosage: '500mg',
        frequency: 'Twice daily',
        taken: true,
        nextDose: new Date(Date.now() + 6 * 60 * 60 * 1000).toISOString(),
        schedule: [new Date(Date.now() + 6 * 60 * 60 * 1000).toISOString()],
        instructions: 'Take with meals',
        createdAt: new Date().toISOString(),
      },
      {
        id: '3',
        name: 'Vitamin D3',
        dosage: '1000 IU',
        frequency: 'Daily',
        taken: false,
        nextDose: new Date(Date.now() + 4 * 60 * 60 * 1000).toISOString(),
        schedule: [new Date(Date.now() + 4 * 60 * 60 * 1000).toISOString()],
        instructions: 'Take with fat-containing meal',
        createdAt: new Date().toISOString(),
      },
    ];
  }

  private getDefaultAppointments() {
    const today = new Date();
    const nextWeek = new Date(today.getTime() + 7 * 24 * 60 * 60 * 1000);
    const lastMonth = new Date(today.getTime() - 30 * 24 * 60 * 60 * 1000);

    return [
      {
        id: '1',
        doctorName: 'Sarah Johnson',
        specialty: 'Cardiologist',
        date: nextWeek.toISOString(),
        time: '10:30 AM',
        location: 'Heart Care Center, 123 Medical Ave',
        notes: 'Routine checkup for blood pressure monitoring',
        createdAt: new Date().toISOString(),
      },
      {
        id: '2',
        doctorName: 'Michael Chen',
        specialty: 'General Practice',
        date: new Date(today.getTime() + 3 * 24 * 60 * 60 * 1000).toISOString(),
        time: '2:15 PM',
        location: 'Family Health Clinic, 456 Wellness Blvd',
        notes: 'Annual physical examination',
        createdAt: new Date().toISOString(),
      },
      {
        id: '3',
        doctorName: 'Emily Rodriguez',
        specialty: 'Endocrinologist',
        date: lastMonth.toISOString(),
        time: '9:00 AM',
        location: 'Diabetes Care Center, 789 Health St',
        notes: 'Follow-up for diabetes management',
        createdAt: new Date().toISOString(),
      },
    ];
  }

  private getDefaultFamilyMembers() {
    return [
      {
        id: '1',
        name: 'Emma Thompson',
        relationship: 'Daughter',
        phone: '+1 (555) 123-4567',
        email: 'emma.thompson@email.com',
        emergencyContact: true,
        createdAt: new Date().toISOString(),
      },
      {
        id: '2',
        name: 'James Thompson',
        relationship: 'Son',
        phone: '+1 (555) 765-4321',
        email: 'james.thompson@email.com',
        emergencyContact: false,
        createdAt: new Date().toISOString(),
      },
      {
        id: '3',
        name: 'Margaret Wilson',
        relationship: 'Sister',
        phone: '+1 (555) 987-6543',
        email: 'margaret.wilson@email.com',
        emergencyContact: true,
        createdAt: new Date().toISOString(),
      },
    ];
  }

  private getDefaultFamilyMessages() {
    return [
      {
        id: '1',
        text: 'Hi Mom! Just checking in to see how you\'re feeling today. Did you take your morning medications?',
        sender: 'Emma',
        timestamp: new Date(Date.now() - 2 * 60 * 60 * 1000).toISOString(),
        type: 'received',
        read: false,
      },
      {
        id: '2',
        text: 'Yes, I took them all. Feeling much better today! Thank you for caring.',
        sender: 'You',
        timestamp: new Date(Date.now() - 1.5 * 60 * 60 * 1000).toISOString(),
        type: 'sent',
        read: true,
      },
      {
        id: '3',
        text: 'Don\'t forget about your appointment with Dr. Johnson next week!',
        sender: 'James',
        timestamp: new Date(Date.now() - 1 * 60 * 60 * 1000).toISOString(),
        type: 'received',
        read: false,
      },
      {
        id: '4',
        text: 'Good morning! Hope you slept well. Remember to check your blood pressure today.',
        sender: 'Margaret',
        timestamp: new Date(Date.now() - 0.5 * 60 * 60 * 1000).toISOString(),
        type: 'received',
        read: false,
      },
    ];
  }

  private getDefaultSettings() {
    return {
      medicineReminders: true,
      appointmentReminders: true,
      familyNotifications: true,
      emergencyAlerts: true,
    };
  }
}

export const storageService = new StorageService();