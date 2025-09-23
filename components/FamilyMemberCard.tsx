import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { User, Phone, Video, MessageCircle } from 'lucide-react-native';

interface FamilyMember {
  id: string;
  name: string;
  relationship: string;
  phone?: string;
  email?: string;
  emergencyContact?: boolean;
}

interface FamilyMemberCardProps {
  member: FamilyMember;
  onCall: () => void;
  onVideoCall: () => void;
}

export function FamilyMemberCard({ member, onCall, onVideoCall }: FamilyMemberCardProps) {
  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <View style={styles.memberInfo}>
          <View style={[styles.avatarContainer, member.emergencyContact && styles.emergencyAvatar]}>
            <User size={20} color={member.emergencyContact ? '#EF4444' : '#2563EB'} />
          </View>
          <View style={styles.details}>
            <Text style={styles.name}>{member.name}</Text>
            <Text style={styles.relationship}>{member.relationship}</Text>
            {member.phone && (
              <Text style={styles.phone}>{member.phone}</Text>
            )}
          </View>
        </View>
        {member.emergencyContact && (
          <View style={styles.emergencyBadge}>
            <Text style={styles.emergencyText}>Emergency</Text>
          </View>
        )}
      </View>

      <View style={styles.actions}>
        <TouchableOpacity style={styles.actionButton} onPress={onCall}>
          <Phone size={16} color="#10B981" />
          <Text style={styles.actionText}>Call</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.actionButton} onPress={onVideoCall}>
          <Video size={16} color="#2563EB" />
          <Text style={styles.actionText}>Video</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.actionButton}>
          <MessageCircle size={16} color="#F59E0B" />
          <Text style={styles.actionText}>Message</Text>
        </TouchableOpacity>
      </View>
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
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 12,
  },
  memberInfo: {
    flexDirection: 'row',
    flex: 1,
  },
  avatarContainer: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: '#EFF6FF',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  emergencyAvatar: {
    backgroundColor: '#FEF2F2',
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
  relationship: {
    fontSize: 14,
    color: '#6B7280',
    marginBottom: 2,
  },
  phone: {
    fontSize: 12,
    color: '#9CA3AF',
  },
  emergencyBadge: {
    backgroundColor: '#FEF2F2',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 12,
  },
  emergencyText: {
    fontSize: 10,
    fontWeight: '600',
    color: '#EF4444',
    textTransform: 'uppercase',
  },
  actions: {
    flexDirection: 'row',
    gap: 8,
  },
  actionButton: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 8,
    paddingHorizontal: 12,
    borderRadius: 8,
    backgroundColor: '#F9FAFB',
    gap: 4,
  },
  actionText: {
    fontSize: 12,
    fontWeight: '500',
    color: '#374151',
  },
});