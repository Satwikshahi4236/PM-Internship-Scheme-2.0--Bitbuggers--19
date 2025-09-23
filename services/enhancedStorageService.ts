import { databaseService } from './databaseService';

class EnhancedStorageService {
  private currentUserId: string = 'default-user'; // In a real app, this would come from authentication

  // Initialize default user
  async initializeUser() {
    try {
      let user = await databaseService.getUserById(this.currentUserId);
      if (!user) {
        user = await databaseService.createUser({
          id: this.currentUserId,
          name: 'John Doe',
          email: 'john.doe@example.com',
          phone: '+1 (555) 123-4567',
          dateOfBirth: '1950-01-15',
          emergencyContact: '+1 (555) 987-6543',
        });
        
        // Add some sample data
        await this.initializeSampleData();
      }
      return user;
    } catch (error) {
      console.error('Error initializing user:', error);
      throw error;
    }
  }

  private async initializeSampleData() {
    // Add sample medicines
    const sampleMedicines = [
      {
        name: 'Lisinopril',
        dosage: '10mg',
        frequency: 'Once daily',
        instructions: 'Take with or without food',
        nextDose: new Date(Date.now() + 2 * 60 * 60 * 1000).toISOString(),
        taken: false,
      },
      {
        name: 'Metformin',
        dosage: '500mg',
        frequency: 'Twice daily',
        instructions: 'Take with meals',
        nextDose: new Date(Date.now() + 6 * 60 * 60 * 1000).toISOString(),
        taken: true,
      },
    ];

    for (const medicine of sampleMedicines) {
      await databaseService.addMedicine(this.currentUserId, medicine);
    }

    // Add sample appointments
    const sampleAppointments = [
      {
        doctorName: 'Sarah Johnson',
        specialty: 'Cardiologist',
        date: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toISOString(),
        time: '10:30 AM',
        location: 'Heart Care Center, 123 Medical Ave',
        notes: 'Routine checkup for blood pressure monitoring',
      },
    ];

    for (const appointment of sampleAppointments) {
      await databaseService.addAppointment(this.currentUserId, appointment);
    }

    // Add sample family members
    const sampleFamily = [
      {
        name: 'Emma Thompson',
        relationship: 'Daughter',
        phone: '+1 (555) 123-4567',
        email: 'emma.thompson@email.com',
        emergencyContact: true,
      },
      {
        name: 'James Thompson',
        relationship: 'Son',
        phone: '+1 (555) 765-4321',
        email: 'james.thompson@email.com',
        emergencyContact: false,
      },
    ];

    for (const member of sampleFamily) {
      await databaseService.addFamilyMember(this.currentUserId, member);
    }

    // Add sample messages
    const sampleMessages = [
      {
        senderId: 'emma-id',
        senderName: 'Emma',
        content: 'Hi Dad! Just checking in to see how you\'re feeling today. Did you take your morning medications?',
        type: 'received',
        read: false,
      },
      {
        senderId: this.currentUserId,
        senderName: 'You',
        content: 'Yes, I took them all. Feeling much better today! Thank you for caring.',
        type: 'sent',
        read: true,
      },
    ];

    for (const message of sampleMessages) {
      await databaseService.addMessage(this.currentUserId, message);
    }
  }

  // Profile methods
  async getProfile() {
    await this.initializeUser();
    return await databaseService.getUserById(this.currentUserId);
  }

  async saveProfile(profileData: any) {
    return await databaseService.updateUser(this.currentUserId, profileData);
  }

  // Medicine methods
  async getMedicines() {
    await this.initializeUser();
    return await databaseService.getMedicines(this.currentUserId);
  }

  async addMedicine(medicineData: any) {
    return await databaseService.addMedicine(this.currentUserId, medicineData);
  }

  async markMedicineTaken(medicineId: string) {
    const medicines = await this.getMedicines();
    const medicine = medicines.find(med => med.id === medicineId);
    if (medicine) {
      return await databaseService.markMedicineTaken(medicineId, !medicine.taken);
    }
  }

  async deleteMedicine(medicineId: string) {
    return await databaseService.deleteMedicine(medicineId);
  }

  // Appointment methods
  async getAppointments() {
    await this.initializeUser();
    return await databaseService.getAppointments(this.currentUserId);
  }

  async addAppointment(appointmentData: any) {
    return await databaseService.addAppointment(this.currentUserId, appointmentData);
  }

  async deleteAppointment(appointmentId: string) {
    return await databaseService.deleteAppointment(appointmentId);
  }

  // Family methods
  async getFamilyMembers() {
    await this.initializeUser();
    return await databaseService.getFamilyMembers(this.currentUserId);
  }

  async addFamilyMember(memberData: any) {
    return await databaseService.addFamilyMember(this.currentUserId, memberData);
  }

  // Message methods
  async getFamilyMessages() {
    await this.initializeUser();
    return await databaseService.getMessages(this.currentUserId);
  }

  async addFamilyMessage(messageData: any) {
    return await databaseService.addMessage(this.currentUserId, messageData);
  }

  // Settings methods
  async getSettings() {
    await this.initializeUser();
    const settings = await databaseService.getSettings(this.currentUserId);
    return settings || {
      medicineReminders: true,
      appointmentReminders: true,
      familyNotifications: true,
      emergencyAlerts: true,
    };
  }

  async saveSettings(settingsData: any) {
    return await databaseService.updateSettings(this.currentUserId, settingsData);
  }

  // Dashboard data
  async getDashboardStats() {
    await this.initializeUser();
    return await databaseService.getDashboardStats(this.currentUserId);
  }

  // Clear all data
  async clearAllData() {
    // This would clear all user data in a real implementation
    console.log('Clear all data requested');
  }
}

export const enhancedStorageService = new EnhancedStorageService();