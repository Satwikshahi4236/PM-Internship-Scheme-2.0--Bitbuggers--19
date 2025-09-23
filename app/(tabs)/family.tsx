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
import {
  Plus,
  MessageCircle,
  Users,
  Phone,
  Video,
  Send,
  Shield,
} from 'lucide-react-native';
import { FamilyMemberCard } from '@/components/FamilyMemberCard';
import { MessageCard } from '@/components/MessageCard';
import { AddFamilyMemberModal } from '@/components/AddFamilyMemberModal';
import { enhancedStorageService } from '@/services/enhancedStorageService';

export default function FamilyScreen() {
  const [familyMembers, setFamilyMembers] = useState([]);
  const [messages, setMessages] = useState([]);
  const [showAddMemberModal, setShowAddMemberModal] = useState(false);
  const [newMessage, setNewMessage] = useState('');
  const [activeTab, setActiveTab] = useState('members'); // members, messages

  useEffect(() => {
    loadFamilyData();
  }, []);

  const loadFamilyData = async () => {
    try {
      const members = await enhancedStorageService.getFamilyMembers();
      const familyMessages = await enhancedStorageService.getFamilyMessages();
      setFamilyMembers(members);
      setMessages(familyMessages);
    } catch (error) {
      console.error('Error loading family data:', error);
    }
  };

  const handleAddFamilyMember = async (memberData) => {
    try {
      await enhancedStorageService.addFamilyMember(memberData);
      setShowAddMemberModal(false);
      loadFamilyData();
      Alert.alert('Success', 'Family member added successfully!');
    } catch (error) {
      Alert.alert('Error', 'Failed to add family member');
    }
  };

  const handleSendMessage = async () => {
    if (newMessage.trim()) {
      try {
        const messageData = {
          text: newMessage,
          sender: 'You',
          timestamp: new Date().toISOString(),
          type: 'sent',
        };
        await enhancedStorageService.addFamilyMessage(messageData);
        setNewMessage('');
        loadFamilyData();
      } catch (error) {
        Alert.alert('Error', 'Failed to send message');
      }
    }
  };

  const handleCall = (member) => {
    Alert.alert(
      'Call Family Member',
      `Call ${member.name}?`,
      [
        { text: 'Cancel', style: 'cancel' },
        { text: 'Call', onPress: () => console.log(`Calling ${member.name}...`) },
      ]
    );
  };

  const handleVideoCall = (member) => {
    Alert.alert(
      'Video Call',
      `Start video call with ${member.name}?`,
      [
        { text: 'Cancel', style: 'cancel' },
        { text: 'Start Call', onPress: () => console.log(`Video calling ${member.name}...`) },
      ]
    );
  };

  const handleEmergencyAlert = () => {
    Alert.alert(
      'Emergency Alert',
      'Send emergency alert to all family members?',
      [
        { text: 'Cancel', style: 'cancel' },
        {
          text: 'Send Alert',
          style: 'destructive',
          onPress: () => {
            console.log('Emergency alert sent to all family members');
            Alert.alert('Alert Sent', 'Emergency alert sent to all family members');
          },
        },
      ]
    );
  };

  const unreadCount = messages.filter(msg => !msg.read && msg.type === 'received').length;

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Family Care</Text>
        <View style={styles.headerActions}>
          <TouchableOpacity
            style={styles.emergencyButton}
            onPress={handleEmergencyAlert}
          >
            <Shield size={18} color="#FFFFFF" />
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.addButton}
            onPress={() => setShowAddMemberModal(true)}
          >
            <Plus size={20} color="#FFFFFF" />
          </TouchableOpacity>
        </View>
      </View>

      {/* Stats */}
      <View style={styles.statsContainer}>
        <View style={[styles.statCard, styles.membersCard]}>
          <Users size={20} color="#2563EB" />
          <Text style={styles.statNumber}>{familyMembers.length}</Text>
          <Text style={styles.statLabel}>Family Members</Text>
        </View>
        <View style={[styles.statCard, styles.messagesCard]}>
          <MessageCircle size={20} color="#10B981" />
          <Text style={styles.statNumber}>{messages.length}</Text>
          <Text style={styles.statLabel}>Messages</Text>
        </View>
        <View style={[styles.statCard, styles.unreadCard]}>
          <MessageCircle size={20} color="#F59E0B" />
          <Text style={styles.statNumber}>{unreadCount}</Text>
          <Text style={styles.statLabel}>Unread</Text>
        </View>
      </View>

      {/* Tab Navigation */}
      <View style={styles.tabContainer}>
        <TouchableOpacity
          style={[
            styles.tab,
            activeTab === 'members' && styles.activeTab,
          ]}
          onPress={() => setActiveTab('members')}
        >
          <Users size={20} color={activeTab === 'members' ? '#2563EB' : '#6B7280'} />
          <Text
            style={[
              styles.tabText,
              activeTab === 'members' && styles.activeTabText,
            ]}
          >
            Members
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[
            styles.tab,
            activeTab === 'messages' && styles.activeTab,
          ]}
          onPress={() => setActiveTab('messages')}
        >
          <MessageCircle size={20} color={activeTab === 'messages' ? '#2563EB' : '#6B7280'} />
          <Text
            style={[
              styles.tabText,
              activeTab === 'messages' && styles.activeTabText,
            ]}
          >
            Messages
          </Text>
          {unreadCount > 0 && (
            <View style={styles.badge}>
              <Text style={styles.badgeText}>{unreadCount}</Text>
            </View>
          )}
        </TouchableOpacity>
      </View>

      {/* Content */}
      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        {activeTab === 'members' ? (
          <View style={styles.membersContainer}>
            {familyMembers.length === 0 ? (
              <View style={styles.emptyState}>
                <Users size={48} color="#9CA3AF" />
                <Text style={styles.emptyTitle}>No family members added</Text>
                <Text style={styles.emptyDescription}>
                  Add family members to stay connected and share health updates
                </Text>
                <TouchableOpacity
                  style={styles.emptyActionButton}
                  onPress={() => setShowAddMemberModal(true)}
                >
                  <Plus size={20} color="#2563EB" />
                  <Text style={styles.emptyActionText}>Add Family Member</Text>
                </TouchableOpacity>
              </View>
            ) : (
              <View style={styles.membersGrid}>
                {familyMembers.map((member) => (
                  <FamilyMemberCard
                    key={member.id}
                    member={member}
                    onCall={() => handleCall(member)}
                    onVideoCall={() => handleVideoCall(member)}
                  />
                ))}
              </View>
            )}
          </View>
        ) : (
          <View style={styles.messagesContainer}>
            {messages.length === 0 ? (
              <View style={styles.emptyState}>
                <MessageCircle size={48} color="#9CA3AF" />
                <Text style={styles.emptyTitle}>No messages yet</Text>
                <Text style={styles.emptyDescription}>
                  Start a conversation with your family members
                </Text>
              </View>
            ) : (
              <View style={styles.messagesList}>
                {messages.map((message) => (
                  <MessageCard key={message.id} message={message} />
                ))}
              </View>
            )}
          </View>
        )}
      </ScrollView>

      {/* Message Input (only show on messages tab) */}
      {activeTab === 'messages' && (
        <View style={styles.messageInputContainer}>
          <TextInput
            style={styles.messageInput}
            placeholder="Type a message..."
            value={newMessage}
            onChangeText={setNewMessage}
            placeholderTextColor="#9CA3AF"
            multiline
            maxLength={500}
          />
          <TouchableOpacity
            style={[
              styles.sendButton,
              !newMessage.trim() && styles.sendButtonDisabled,
            ]}
            onPress={handleSendMessage}
            disabled={!newMessage.trim()}
          >
            <Send size={20} color={newMessage.trim() ? '#FFFFFF' : '#9CA3AF'} />
          </TouchableOpacity>
        </View>
      )}

      {/* Add Family Member Modal */}
      <AddFamilyMemberModal
        visible={showAddMemberModal}
        onClose={() => setShowAddMemberModal(false)}
        onAdd={handleAddFamilyMember}
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
  headerActions: {
    flexDirection: 'row',
    gap: 8,
  },
  emergencyButton: {
    backgroundColor: '#EF4444',
    width: 40,
    height: 40,
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#EF4444',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 4,
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
  membersCard: {
    backgroundColor: '#EFF6FF',
  },
  messagesCard: {
    backgroundColor: '#F0FDF4',
  },
  unreadCard: {
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
  tabContainer: {
    flexDirection: 'row',
    paddingHorizontal: 20,
    paddingBottom: 16,
    gap: 8,
  },
  tab: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 12,
    paddingHorizontal: 16,
    borderRadius: 12,
    backgroundColor: '#F3F4F6',
    gap: 8,
  },
  activeTab: {
    backgroundColor: '#EFF6FF',
  },
  tabText: {
    fontSize: 14,
    fontWeight: '600',
    color: '#6B7280',
  },
  activeTabText: {
    color: '#2563EB',
  },
  badge: {
    backgroundColor: '#EF4444',
    paddingHorizontal: 6,
    paddingVertical: 2,
    borderRadius: 10,
    minWidth: 20,
    alignItems: 'center',
  },
  badgeText: {
    fontSize: 12,
    fontWeight: '600',
    color: '#FFFFFF',
  },
  content: {
    flex: 1,
  },
  membersContainer: {
    flex: 1,
  },
  membersGrid: {
    paddingHorizontal: 20,
    paddingBottom: 20,
  },
  messagesContainer: {
    flex: 1,
  },
  messagesList: {
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
  messageInputContainer: {
    flexDirection: 'row',
    paddingHorizontal: 20,
    paddingVertical: 16,
    backgroundColor: '#FFFFFF',
    borderTopWidth: 1,
    borderTopColor: '#E5E7EB',
    gap: 12,
    alignItems: 'flex-end',
  },
  messageInput: {
    flex: 1,
    borderWidth: 1,
    borderColor: '#E5E7EB',
    borderRadius: 20,
    paddingHorizontal: 16,
    paddingVertical: 12,
    fontSize: 16,
    maxHeight: 100,
    color: '#1F2937',
  },
  sendButton: {
    backgroundColor: '#2563EB',
    width: 44,
    height: 44,
    borderRadius: 22,
    justifyContent: 'center',
    alignItems: 'center',
  },
  sendButtonDisabled: {
    backgroundColor: '#F3F4F6',
  },
});