import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { User, Clock } from 'lucide-react-native';

interface Message {
  id: string;
  text: string;
  sender: string;
  timestamp: string;
  type: 'sent' | 'received';
  read?: boolean;
}

interface MessageCardProps {
  message: Message;
}

export function MessageCard({ message }: MessageCardProps) {
  const isReceived = message.type === 'received';
  const messageTime = new Date(message.timestamp);

  return (
    <View style={[styles.container, isReceived ? styles.receivedContainer : styles.sentContainer]}>
      <View style={styles.header}>
        <View style={styles.senderInfo}>
          <View style={[styles.avatarContainer, isReceived ? styles.receivedAvatar : styles.sentAvatar]}>
            <User size={16} color={isReceived ? '#10B981' : '#2563EB'} />
          </View>
          <Text style={styles.sender}>{message.sender}</Text>
        </View>
        <View style={styles.timeContainer}>
          <Clock size={12} color="#9CA3AF" />
          <Text style={styles.timestamp}>
            {messageTime.toLocaleTimeString([], {
              hour: '2-digit',
              minute: '2-digit',
            })}
          </Text>
        </View>
      </View>

      <View style={[styles.messageContent, isReceived ? styles.receivedMessage : styles.sentMessage]}>
        <Text style={[styles.messageText, isReceived ? styles.receivedText : styles.sentText]}>
          {message.text}
        </Text>
      </View>

      {isReceived && !message.read && (
        <View style={styles.unreadIndicator}>
          <View style={styles.unreadDot} />
          <Text style={styles.unreadText}>New</Text>
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginBottom: 16,
  },
  receivedContainer: {
    alignItems: 'flex-start',
  },
  sentContainer: {
    alignItems: 'flex-end',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    width: '100%',
    marginBottom: 8,
  },
  senderInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  avatarContainer: {
    width: 32,
    height: 32,
    borderRadius: 16,
    justifyContent: 'center',
    alignItems: 'center',
  },
  receivedAvatar: {
    backgroundColor: '#F0FDF4',
  },
  sentAvatar: {
    backgroundColor: '#EFF6FF',
  },
  sender: {
    fontSize: 14,
    fontWeight: '600',
    color: '#374151',
  },
  timeContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  timestamp: {
    fontSize: 12,
    color: '#9CA3AF',
  },
  messageContent: {
    maxWidth: '80%',
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderRadius: 18,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 2,
    elevation: 1,
  },
  receivedMessage: {
    backgroundColor: '#F0FDF4',
    borderBottomLeftRadius: 4,
    alignSelf: 'flex-start',
  },
  sentMessage: {
    backgroundColor: '#2563EB',
    borderBottomRightRadius: 4,
    alignSelf: 'flex-end',
  },
  messageText: {
    fontSize: 16,
    lineHeight: 22,
  },
  receivedText: {
    color: '#374151',
  },
  sentText: {
    color: '#FFFFFF',
  },
  unreadIndicator: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 4,
    gap: 4,
  },
  unreadDot: {
    width: 6,
    height: 6,
    borderRadius: 3,
    backgroundColor: '#EF4444',
  },
  unreadText: {
    fontSize: 10,
    fontWeight: '600',
    color: '#EF4444',
    textTransform: 'uppercase',
  },
});