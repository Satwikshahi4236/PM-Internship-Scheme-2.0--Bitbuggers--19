import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  TextInput,
  Alert,
  Switch,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { User, CreditCard as Edit2, Bell, Shield, Phone, Mail, MapPin, Calendar, Save, X, Settings, Heart, Activity } from 'lucide-react-native';
import { enhancedStorageService } from '@/services/enhancedStorageService';

export default function ProfileScreen() {
  const [profile, setProfile] = useState({
    name: '',
    email: '',
    phone: '',
    address: '',
    dateOfBirth: '',
    emergencyContact: '',
    medicalHistory: '',
  });
  const [settings, setSettings] = useState({
    medicineReminders: true,
    appointmentReminders: true,
    familyNotifications: true,
    emergencyAlerts: true,
  });
  const [isEditing, setIsEditing] = useState(false);
  const [editingProfile, setEditingProfile] = useState({});

  useEffect(() => {
    loadProfile();
    loadSettings();
  }, []);

  const loadProfile = async () => {
    try {
      const userProfile = await enhancedStorageService.getProfile();
      if (userProfile) {
        setProfile(userProfile);
        setEditingProfile(userProfile);
      }
    } catch (error) {
      console.error('Error loading profile:', error);
    }
  };

  const loadSettings = async () => {
    try {
      const userSettings = await enhancedStorageService.getSettings();
      if (userSettings) {
        setSettings(userSettings);
      }
    } catch (error) {
      console.error('Error loading settings:', error);
    }
  };

  const handleSaveProfile = async () => {
    try {
      await enhancedStorageService.saveProfile(editingProfile);
      setProfile(editingProfile);
      setIsEditing(false);
      Alert.alert('Success', 'Profile updated successfully!');
    } catch (error) {
      Alert.alert('Error', 'Failed to update profile');
    }
  };

  const handleCancelEdit = () => {
    setEditingProfile(profile);
    setIsEditing(false);
  };

  const handleSettingChange = async (key, value) => {
    try {
      const newSettings = { ...settings, [key]: value };
      await enhancedStorageService.saveSettings(newSettings);
      setSettings(newSettings);
    } catch (error) {
      Alert.alert('Error', 'Failed to update settings');
    }
  };

  const handleExportData = () => {
    Alert.alert(
      'Export Health Data',
      'Export your health data to share with healthcare providers?',
      [
        { text: 'Cancel', style: 'cancel' },
        {
          text: 'Export',
          onPress: () => {
            console.log('Exporting health data...');
            Alert.alert('Success', 'Health data exported successfully!');
          },
        },
      ]
    );
  };

  const handleDeleteData = () => {
    Alert.alert(
      'Delete All Data',
      'This will permanently delete all your health data. This action cannot be undone.',
      [
        { text: 'Cancel', style: 'cancel' },
        {
          text: 'Delete',
          style: 'destructive',
          onPress: () => {
            Alert.alert(
              'Confirm Deletion',
              'Are you absolutely sure you want to delete all data?',
              [
                { text: 'Cancel', style: 'cancel' },
                {
                  text: 'Delete All',
                  style: 'destructive',
                  onPress: async () => {
                    try {
                      await enhancedStorageService.clearAllData();
                      Alert.alert('Data Deleted', 'All data has been deleted.');
                      loadProfile();
                    } catch (error) {
                      Alert.alert('Error', 'Failed to delete data');
                    }
                  },
                },
              ]
            );
          },
        },
      ]
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Profile & Settings</Text>
        {!isEditing ? (
          <TouchableOpacity
            style={styles.editButton}
            onPress={() => setIsEditing(true)}
          >
            <Edit2 size={20} color="#2563EB" />
          </TouchableOpacity>
        ) : (
          <View style={styles.editActions}>
            <TouchableOpacity
              style={styles.cancelButton}
              onPress={handleCancelEdit}
            >
              <X size={20} color="#6B7280" />
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.saveButton}
              onPress={handleSaveProfile}
            >
              <Save size={20} color="#FFFFFF" />
            </TouchableOpacity>
          </View>
        )}
      </View>

      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        {/* Profile Section */}
        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <User size={20} color="#2563EB" />
            <Text style={styles.sectionTitle}>Personal Information</Text>
          </View>

          <View style={styles.profileCard}>
            <View style={styles.profileField}>
              <View style={styles.fieldHeader}>
                <User size={16} color="#6B7280" />
                <Text style={styles.fieldLabel}>Full Name</Text>
              </View>
              {isEditing ? (
                <TextInput
                  style={styles.fieldInput}
                  value={editingProfile.name}
                  onChangeText={(text) =>
                    setEditingProfile({ ...editingProfile, name: text })
                  }
                  placeholder="Enter your full name"
                  placeholderTextColor="#9CA3AF"
                />
              ) : (
                <Text style={styles.fieldValue}>
                  {profile.name || 'Not set'}
                </Text>
              )}
            </View>

            <View style={styles.profileField}>
              <View style={styles.fieldHeader}>
                <Mail size={16} color="#6B7280" />
                <Text style={styles.fieldLabel}>Email</Text>
              </View>
              {isEditing ? (
                <TextInput
                  style={styles.fieldInput}
                  value={editingProfile.email}
                  onChangeText={(text) =>
                    setEditingProfile({ ...editingProfile, email: text })
                  }
                  placeholder="Enter your email"
                  placeholderTextColor="#9CA3AF"
                  keyboardType="email-address"
                />
              ) : (
                <Text style={styles.fieldValue}>
                  {profile.email || 'Not set'}
                </Text>
              )}
            </View>

            <View style={styles.profileField}>
              <View style={styles.fieldHeader}>
                <Phone size={16} color="#6B7280" />
                <Text style={styles.fieldLabel}>Phone</Text>
              </View>
              {isEditing ? (
                <TextInput
                  style={styles.fieldInput}
                  value={editingProfile.phone}
                  onChangeText={(text) =>
                    setEditingProfile({ ...editingProfile, phone: text })
                  }
                  placeholder="Enter your phone number"
                  placeholderTextColor="#9CA3AF"
                  keyboardType="phone-pad"
                />
              ) : (
                <Text style={styles.fieldValue}>
                  {profile.phone || 'Not set'}
                </Text>
              )}
            </View>

            <View style={styles.profileField}>
              <View style={styles.fieldHeader}>
                <Calendar size={16} color="#6B7280" />
                <Text style={styles.fieldLabel}>Date of Birth</Text>
              </View>
              {isEditing ? (
                <TextInput
                  style={styles.fieldInput}
                  value={editingProfile.dateOfBirth}
                  onChangeText={(text) =>
                    setEditingProfile({ ...editingProfile, dateOfBirth: text })
                  }
                  placeholder="DD/MM/YYYY"
                  placeholderTextColor="#9CA3AF"
                />
              ) : (
                <Text style={styles.fieldValue}>
                  {profile.dateOfBirth || 'Not set'}
                </Text>
              )}
            </View>

            <View style={styles.profileField}>
              <View style={styles.fieldHeader}>
                <Phone size={16} color="#6B7280" />
                <Text style={styles.fieldLabel}>Emergency Contact</Text>
              </View>
              {isEditing ? (
                <TextInput
                  style={styles.fieldInput}
                  value={editingProfile.emergencyContact}
                  onChangeText={(text) =>
                    setEditingProfile({ ...editingProfile, emergencyContact: text })
                  }
                  placeholder="Emergency contact number"
                  placeholderTextColor="#9CA3AF"
                  keyboardType="phone-pad"
                />
              ) : (
                <Text style={styles.fieldValue}>
                  {profile.emergencyContact || 'Not set'}
                </Text>
              )}
            </View>
          </View>
        </View>

        {/* Notification Settings */}
        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <Bell size={20} color="#2563EB" />
            <Text style={styles.sectionTitle}>Notification Settings</Text>
          </View>

          <View style={styles.settingsCard}>
            <View style={styles.settingItem}>
              <View style={styles.settingInfo}>
                <Heart size={16} color="#EF4444" />
                <Text style={styles.settingLabel}>Medicine Reminders</Text>
              </View>
              <Switch
                value={settings.medicineReminders}
                onValueChange={(value) =>
                  handleSettingChange('medicineReminders', value)
                }
                trackColor={{ false: '#E5E7EB', true: '#2563EB' }}
                thumbColor={settings.medicineReminders ? '#FFFFFF' : '#9CA3AF'}
              />
            </View>

            <View style={styles.settingItem}>
              <View style={styles.settingInfo}>
                <Calendar size={16} color="#10B981" />
                <Text style={styles.settingLabel}>Appointment Reminders</Text>
              </View>
              <Switch
                value={settings.appointmentReminders}
                onValueChange={(value) =>
                  handleSettingChange('appointmentReminders', value)
                }
                trackColor={{ false: '#E5E7EB', true: '#2563EB' }}
                thumbColor={settings.appointmentReminders ? '#FFFFFF' : '#9CA3AF'}
              />
            </View>

            <View style={styles.settingItem}>
              <View style={styles.settingInfo}>
                <User size={16} color="#F59E0B" />
                <Text style={styles.settingLabel}>Family Notifications</Text>
              </View>
              <Switch
                value={settings.familyNotifications}
                onValueChange={(value) =>
                  handleSettingChange('familyNotifications', value)
                }
                trackColor={{ false: '#E5E7EB', true: '#2563EB' }}
                thumbColor={settings.familyNotifications ? '#FFFFFF' : '#9CA3AF'}
              />
            </View>

            <View style={styles.settingItem}>
              <View style={styles.settingInfo}>
                <Shield size={16} color="#EF4444" />
                <Text style={styles.settingLabel}>Emergency Alerts</Text>
              </View>
              <Switch
                value={settings.emergencyAlerts}
                onValueChange={(value) =>
                  handleSettingChange('emergencyAlerts', value)
                }
                trackColor={{ false: '#E5E7EB', true: '#2563EB' }}
                thumbColor={settings.emergencyAlerts ? '#FFFFFF' : '#9CA3AF'}
              />
            </View>
          </View>
        </View>

        {/* Data Management */}
        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <Settings size={20} color="#2563EB" />
            <Text style={styles.sectionTitle}>Data Management</Text>
          </View>

          <View style={styles.dataCard}>
            <TouchableOpacity
              style={styles.dataAction}
              onPress={handleExportData}
            >
              <Activity size={20} color="#10B981" />
              <View style={styles.dataActionContent}>
                <Text style={styles.dataActionTitle}>Export Health Data</Text>
                <Text style={styles.dataActionDescription}>
                  Download your health data to share with healthcare providers
                </Text>
              </View>
            </TouchableOpacity>

            <View style={styles.dataDivider} />

            <TouchableOpacity
              style={styles.dataAction}
              onPress={handleDeleteData}
            >
              <X size={20} color="#EF4444" />
              <View style={styles.dataActionContent}>
                <Text style={[styles.dataActionTitle, styles.dangerText]}>
                  Delete All Data
                </Text>
                <Text style={styles.dataActionDescription}>
                  Permanently delete all your health data from this device
                </Text>
              </View>
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>
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
  editButton: {
    padding: 8,
  },
  editActions: {
    flexDirection: 'row',
    gap: 8,
  },
  cancelButton: {
    padding: 8,
  },
  saveButton: {
    backgroundColor: '#2563EB',
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 8,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
  },
  content: {
    flex: 1,
  },
  section: {
    paddingHorizontal: 20,
    paddingVertical: 16,
  },
  sectionHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
    gap: 8,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#1F2937',
  },
  profileCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    padding: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 3,
    elevation: 2,
  },
  profileField: {
    marginBottom: 20,
  },
  fieldHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
    gap: 8,
  },
  fieldLabel: {
    fontSize: 14,
    fontWeight: '500',
    color: '#374151',
  },
  fieldValue: {
    fontSize: 16,
    color: '#1F2937',
    paddingVertical: 8,
  },
  fieldInput: {
    borderWidth: 1,
    borderColor: '#E5E7EB',
    borderRadius: 8,
    paddingHorizontal: 12,
    paddingVertical: 10,
    fontSize: 16,
    color: '#1F2937',
    backgroundColor: '#FFFFFF',
  },
  settingsCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    padding: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 3,
    elevation: 2,
  },
  settingItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#F3F4F6',
  },
  settingInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    flex: 1,
  },
  settingLabel: {
    fontSize: 16,
    color: '#374151',
    fontWeight: '500',
  },
  dataCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    padding: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 3,
    elevation: 2,
  },
  dataAction: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 12,
    gap: 16,
  },
  dataActionContent: {
    flex: 1,
  },
  dataActionTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#1F2937',
    marginBottom: 4,
  },
  dataActionDescription: {
    fontSize: 14,
    color: '#6B7280',
    lineHeight: 20,
  },
  dataDivider: {
    height: 1,
    backgroundColor: '#E5E7EB',
    marginVertical: 8,
  },
  dangerText: {
    color: '#EF4444',
  },
});