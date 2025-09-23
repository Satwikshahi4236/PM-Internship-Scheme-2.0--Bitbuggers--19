import { db } from '../database/connection';
import * as schema from '../database/schema';
import { eq, desc, and, or } from 'drizzle-orm';
import { nanoid } from 'nanoid';

export class DatabaseService {
  // User operations
  async createUser(userData: any) {
    const userId = nanoid();
    const user = await db.insert(schema.users).values({
      id: userId,
      ...userData,
    }).returning();
    return user[0];
  }

  async getUserById(userId: string) {
    const user = await db.select().from(schema.users).where(eq(schema.users.id, userId));
    return user[0];
  }

  async updateUser(userId: string, userData: any) {
    const user = await db.update(schema.users)
      .set({ ...userData, updatedAt: new Date().toISOString() })
      .where(eq(schema.users.id, userId))
      .returning();
    return user[0];
  }

  // Medicine operations
  async getMedicines(userId: string) {
    return await db.select().from(schema.medicines)
      .where(eq(schema.medicines.userId, userId))
      .orderBy(desc(schema.medicines.createdAt));
  }

  async addMedicine(userId: string, medicineData: any) {
    const medicineId = nanoid();
    const medicine = await db.insert(schema.medicines).values({
      id: medicineId,
      userId,
      ...medicineData,
    }).returning();
    return medicine[0];
  }

  async updateMedicine(medicineId: string, medicineData: any) {
    const medicine = await db.update(schema.medicines)
      .set({ ...medicineData, updatedAt: new Date().toISOString() })
      .where(eq(schema.medicines.id, medicineId))
      .returning();
    return medicine[0];
  }

  async deleteMedicine(medicineId: string) {
    await db.delete(schema.medicines).where(eq(schema.medicines.id, medicineId));
  }

  async markMedicineTaken(medicineId: string, taken: boolean) {
    const medicine = await db.update(schema.medicines)
      .set({ taken, updatedAt: new Date().toISOString() })
      .where(eq(schema.medicines.id, medicineId))
      .returning();
    return medicine[0];
  }

  // Appointment operations
  async getAppointments(userId: string) {
    return await db.select().from(schema.appointments)
      .where(eq(schema.appointments.userId, userId))
      .orderBy(desc(schema.appointments.date));
  }

  async addAppointment(userId: string, appointmentData: any) {
    const appointmentId = nanoid();
    const appointment = await db.insert(schema.appointments).values({
      id: appointmentId,
      userId,
      ...appointmentData,
    }).returning();
    return appointment[0];
  }

  async updateAppointment(appointmentId: string, appointmentData: any) {
    const appointment = await db.update(schema.appointments)
      .set({ ...appointmentData, updatedAt: new Date().toISOString() })
      .where(eq(schema.appointments.id, appointmentId))
      .returning();
    return appointment[0];
  }

  async deleteAppointment(appointmentId: string) {
    await db.delete(schema.appointments).where(eq(schema.appointments.id, appointmentId));
  }

  // Family member operations
  async getFamilyMembers(userId: string) {
    return await db.select().from(schema.familyMembers)
      .where(eq(schema.familyMembers.userId, userId))
      .orderBy(desc(schema.familyMembers.createdAt));
  }

  async addFamilyMember(userId: string, memberData: any) {
    const memberId = nanoid();
    const member = await db.insert(schema.familyMembers).values({
      id: memberId,
      userId,
      ...memberData,
    }).returning();
    return member[0];
  }

  async updateFamilyMember(memberId: string, memberData: any) {
    const member = await db.update(schema.familyMembers)
      .set({ ...memberData, updatedAt: new Date().toISOString() })
      .where(eq(schema.familyMembers.id, memberId))
      .returning();
    return member[0];
  }

  async deleteFamilyMember(memberId: string) {
    await db.delete(schema.familyMembers).where(eq(schema.familyMembers.id, memberId));
  }

  // Message operations
  async getMessages(userId: string) {
    return await db.select().from(schema.messages)
      .where(eq(schema.messages.userId, userId))
      .orderBy(desc(schema.messages.createdAt));
  }

  async addMessage(userId: string, messageData: any) {
    const messageId = nanoid();
    const message = await db.insert(schema.messages).values({
      id: messageId,
      userId,
      ...messageData,
    }).returning();
    return message[0];
  }

  async markMessageRead(messageId: string) {
    await db.update(schema.messages)
      .set({ read: true })
      .where(eq(schema.messages.id, messageId));
  }

  // Health vitals operations
  async getHealthVitals(userId: string, type?: string) {
    const query = db.select().from(schema.healthVitals)
      .where(eq(schema.healthVitals.userId, userId));
    
    if (type) {
      query.where(and(eq(schema.healthVitals.userId, userId), eq(schema.healthVitals.type, type)));
    }
    
    return await query.orderBy(desc(schema.healthVitals.recordedAt));
  }

  async addHealthVital(userId: string, vitalData: any) {
    const vitalId = nanoid();
    const vital = await db.insert(schema.healthVitals).values({
      id: vitalId,
      userId,
      ...vitalData,
    }).returning();
    return vital[0];
  }

  // Settings operations
  async getSettings(userId: string) {
    const settings = await db.select().from(schema.settings)
      .where(eq(schema.settings.userId, userId));
    return settings[0];
  }

  async updateSettings(userId: string, settingsData: any) {
    const existingSettings = await this.getSettings(userId);
    
    if (existingSettings) {
      const settings = await db.update(schema.settings)
        .set({ ...settingsData, updatedAt: new Date().toISOString() })
        .where(eq(schema.settings.userId, userId))
        .returning();
      return settings[0];
    } else {
      const settingsId = nanoid();
      const settings = await db.insert(schema.settings).values({
        id: settingsId,
        userId,
        ...settingsData,
      }).returning();
      return settings[0];
    }
  }

  // Analytics and dashboard data
  async getDashboardStats(userId: string) {
    const medicines = await this.getMedicines(userId);
    const appointments = await this.getAppointments(userId);
    const messages = await this.getMessages(userId);
    const familyMembers = await this.getFamilyMembers(userId);

    const today = new Date().toDateString();
    const now = new Date();

    return {
      medicines: {
        total: medicines.length,
        taken: medicines.filter(med => med.taken).length,
        pending: medicines.filter(med => !med.taken).length,
        nextMedicine: medicines
          .filter(med => !med.taken && med.nextDose)
          .sort((a, b) => new Date(a.nextDose!).getTime() - new Date(b.nextDose!).getTime())[0],
      },
      appointments: {
        total: appointments.length,
        upcoming: appointments.filter(apt => new Date(apt.date) >= now).length,
        past: appointments.filter(apt => new Date(apt.date) < now).length,
        next: appointments
          .filter(apt => new Date(apt.date) >= now)
          .sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime())[0],
      },
      family: {
        total: familyMembers.length,
        emergencyContacts: familyMembers.filter(member => member.emergencyContact).length,
      },
      messages: {
        total: messages.length,
        unread: messages.filter(msg => !msg.read && msg.type === 'received').length,
      },
    };
  }
}

export const databaseService = new DatabaseService();