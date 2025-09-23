import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { LinearGradient } from 'react-native-linear-gradient';

interface DashboardCardProps {
  icon: React.ReactNode;
  title: string;
  value: string;
  subtitle: string;
  backgroundColor?: string;
  gradientColors?: string[];
}

export function DashboardCard({
  icon,
  title,
  value,
  subtitle,
  backgroundColor,
  gradientColors,
}: DashboardCardProps) {
  const CardContainer = gradientColors ? LinearGradient : View;
  const containerProps = gradientColors 
    ? { colors: gradientColors, start: { x: 0, y: 0 }, end: { x: 1, y: 1 } }
    : { style: { backgroundColor } };

  return (
    <CardContainer {...containerProps} style={styles.card}>
      <View style={styles.iconContainer}>{icon}</View>
      <Text style={styles.title}>{title}</Text>
      <Text style={styles.value}>{value}</Text>
      <Text style={styles.subtitle}>{subtitle}</Text>
    </CardContainer>
  );
}

const styles = StyleSheet.create({
  card: {
    width: '48%',
    padding: 18,
    borderRadius: 16,
    alignItems: 'center',
    marginBottom: 16,
    shadowColor: '#667eea',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.15,
    shadowRadius: 12,
    elevation: 8,
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.2)',
  },
  iconContainer: {
    marginBottom: 12,
  },
  title: {
    fontSize: 13,
    fontWeight: '600',
    color: '#4A5568',
    marginBottom: 6,
    textAlign: 'center',
    textTransform: 'uppercase',
    letterSpacing: 0.5,
  },
  value: {
    fontSize: 24,
    fontWeight: '800',
    color: '#2D3748',
    marginBottom: 4,
    textAlign: 'center',
  },
  subtitle: {
    fontSize: 11,
    color: '#718096',
    textAlign: 'center',
    fontWeight: '500',
  },
});