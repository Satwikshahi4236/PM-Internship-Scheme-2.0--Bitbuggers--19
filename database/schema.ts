import { sqliteTable, text, integer, real, blob } from 'drizzle-orm/sqlite-core';
import { sql } from 'drizzle-orm';

// Users table
export const users = sqliteTable('users', {
  id: text('id').primaryKey(),
  name: text('name').notNull(),
  email: text('email').unique(),
  phone: text('phone'),
  dateOfBirth: text('date_of_birth'),
  emergencyContact: text('emergency_contact'),
  address: text('address'),
  medicalHistory: text('medical_history'),
  profileImage: text('profile_image'),
  createdAt: text('created_at').default(sql`CURRENT_TIMESTAMP`),
  updatedAt: text('updated_at').default(sql`CURRENT_TIMESTAMP`),
});

// Medicines table
export const medicines = sqliteTable('medicines', {
  id: text('id').primaryKey(),
  userId: text('user_id').references(() => users.id),
  name: text('name').notNull(),
  dosage: text('dosage').notNull(),
  frequency: text('frequency').notNull(),
  instructions: text('instructions'),
  startDate: text('start_date'),
  endDate: text('end_date'),
  nextDose: text('next_dose'),
  taken: integer('taken', { mode: 'boolean' }).default(false),
  reminderEnabled: integer('reminder_enabled', { mode: 'boolean' }).default(true),
  createdAt: text('created_at').default(sql`CURRENT_TIMESTAMP`),
  updatedAt: text('updated_at').default(sql`CURRENT_TIMESTAMP`),
});

// Appointments table
export const appointments = sqliteTable('appointments', {
  id: text('id').primaryKey(),
  userId: text('user_id').references(() => users.id),
  doctorName: text('doctor_name').notNull(),
  specialty: text('specialty'),
  date: text('date').notNull(),
  time: text('time').notNull(),
  location: text('location'),
  notes: text('notes'),
  status: text('status').default('scheduled'), // scheduled, completed, cancelled
  reminderEnabled: integer('reminder_enabled', { mode: 'boolean' }).default(true),
  createdAt: text('created_at').default(sql`CURRENT_TIMESTAMP`),
  updatedAt: text('updated_at').default(sql`CURRENT_TIMESTAMP`),
});

// Family members table
export const familyMembers = sqliteTable('family_members', {
  id: text('id').primaryKey(),
  userId: text('user_id').references(() => users.id),
  name: text('name').notNull(),
  relationship: text('relationship').notNull(),
  phone: text('phone'),
  email: text('email'),
  emergencyContact: integer('emergency_contact', { mode: 'boolean' }).default(false),
  profileImage: text('profile_image'),
  createdAt: text('created_at').default(sql`CURRENT_TIMESTAMP`),
  updatedAt: text('updated_at').default(sql`CURRENT_TIMESTAMP`),
});

// Messages table
export const messages = sqliteTable('messages', {
  id: text('id').primaryKey(),
  userId: text('user_id').references(() => users.id),
  senderId: text('sender_id'),
  senderName: text('sender_name').notNull(),
  content: text('content').notNull(),
  type: text('type').notNull(), // sent, received
  read: integer('read', { mode: 'boolean' }).default(false),
  createdAt: text('created_at').default(sql`CURRENT_TIMESTAMP`),
});

// Health vitals table
export const healthVitals = sqliteTable('health_vitals', {
  id: text('id').primaryKey(),
  userId: text('user_id').references(() => users.id),
  type: text('type').notNull(), // blood_pressure, heart_rate, weight, blood_sugar, temperature
  value: text('value').notNull(),
  unit: text('unit'),
  notes: text('notes'),
  recordedAt: text('recorded_at').default(sql`CURRENT_TIMESTAMP`),
  createdAt: text('created_at').default(sql`CURRENT_TIMESTAMP`),
});

// Settings table
export const settings = sqliteTable('settings', {
  id: text('id').primaryKey(),
  userId: text('user_id').references(() => users.id),
  medicineReminders: integer('medicine_reminders', { mode: 'boolean' }).default(true),
  appointmentReminders: integer('appointment_reminders', { mode: 'boolean' }).default(true),
  familyNotifications: integer('family_notifications', { mode: 'boolean' }).default(true),
  emergencyAlerts: integer('emergency_alerts', { mode: 'boolean' }).default(true),
  theme: text('theme').default('light'),
  language: text('language').default('en'),
  updatedAt: text('updated_at').default(sql`CURRENT_TIMESTAMP`),
});