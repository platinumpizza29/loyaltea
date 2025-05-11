import React, { useState, useEffect } from 'react';
import { StyleSheet, View, TouchableOpacity, Animated, ViewStyle, TextStyle } from 'react-native';
import { ThemedView } from '@/components/ThemedView';
import { ThemedText } from '@/components/ThemedText';
import { IconSymbol } from '@/components/ui/IconSymbol';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { Colors, Typography, Spacing, BorderRadius, Shadows, Animation } from '@/constants/Theme';

export default function PrivacyScreen() {
  const insets = useSafeAreaInsets();
  const [isShareMode, setIsShareMode] = useState(false);
  const [pointsProgress] = useState(new Animated.Value(0));

  useEffect(() => {
    if (isShareMode) {
      Animated.loop(
        Animated.sequence([
          Animated.timing(pointsProgress, {
            toValue: 1,
            duration: Animation.duration.slow,
            useNativeDriver: false,
          }),
          Animated.timing(pointsProgress, {
            toValue: 0,
            duration: Animation.duration.slow,
            useNativeDriver: false,
          }),
        ])
      ).start();
    } else {
      pointsProgress.setValue(0);
    }
  }, [isShareMode]);

  const handleToggle = () => {
    setIsShareMode(!isShareMode);
  };

  const progressWidth = pointsProgress.interpolate({
    inputRange: [0, 1],
    outputRange: ['0%', '100%'],
  });

  return (
    <View style={[styles.container, { paddingTop: insets.top }]}>
      <ThemedView style={styles.header}>
        <ThemedText type="title" style={styles.title}>Privacy Settings</ThemedText>
        <ThemedText style={styles.subtitle}>Control your data sharing preferences</ThemedText>
      </ThemedView>

      <ThemedView style={styles.content}>
        <View style={styles.modeContainer}>
          <View style={styles.modeHeader}>
            <IconSymbol 
              name={isShareMode ? "lock.open.fill" : "lock.fill"} 
              size={24} 
              color={isShareMode ? Colors.secondary.main : Colors.neutral.dark} 
            />
            <ThemedText style={styles.modeTitle}>
              {isShareMode ? "Share & Earn Mode" : "Private Mode"}
            </ThemedText>
          </View>

          <ThemedText style={styles.modeDescription}>
            {isShareMode 
              ? "Earn bonus points by sharing anonymized shopping data"
              : "Enjoy an ad-free experience with no data sharing"}
          </ThemedText>

          <TouchableOpacity
            style={[styles.toggleButton, isShareMode && styles.toggleButtonActive]}
            onPress={handleToggle}
          >
            <View style={[styles.toggleCircle, isShareMode && styles.toggleCircleActive]} />
          </TouchableOpacity>
        </View>

        {isShareMode && (
          <View style={styles.bonusContainer}>
            <View style={styles.bonusHeader}>
              <IconSymbol name="star.fill" size={20} color={Colors.secondary.main} />
              <ThemedText style={styles.bonusTitle}>Bonus Points Potential</ThemedText>
            </View>
            
            <View style={styles.progressBar}>
              <Animated.View 
                style={[
                  styles.progressFill,
                  { width: progressWidth }
                ]} 
              />
            </View>

            <ThemedText style={styles.bonusDescription}>
              Your anonymized data helps improve the shopping experience while earning you points
            </ThemedText>

            <View style={styles.bonusFeatures}>
              <View style={styles.featureItem}>
                <IconSymbol name="checkmark.circle.fill" size={16} color={Colors.secondary.main} />
                <ThemedText style={styles.featureText}>100% Anonymized</ThemedText>
              </View>
              <View style={styles.featureItem}>
                <IconSymbol name="checkmark.circle.fill" size={16} color={Colors.secondary.main} />
                <ThemedText style={styles.featureText}>No Personal Data</ThemedText>
              </View>
              <View style={styles.featureItem}>
                <IconSymbol name="checkmark.circle.fill" size={16} color={Colors.secondary.main} />
                <ThemedText style={styles.featureText}>Transparent Usage</ThemedText>
              </View>
            </View>
          </View>
        )}
      </ThemedView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.background.light,
  } as ViewStyle,
  header: {
    padding: Spacing.lg,
  } as ViewStyle,
  title: {
    ...Typography.title,
    color: Colors.text.primary,
    marginBottom: Spacing.xs,
  } as TextStyle,
  subtitle: {
    ...Typography.caption,
    color: Colors.text.tertiary,
  } as TextStyle,
  content: {
    flex: 1,
    padding: Spacing.lg,
  } as ViewStyle,
  modeContainer: {
    backgroundColor: Colors.neutral.white,
    borderRadius: BorderRadius.lg,
    padding: Spacing.lg,
    ...Shadows.small,
  } as ViewStyle,
  modeHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: Spacing.sm,
    marginBottom: Spacing.sm,
  } as ViewStyle,
  modeTitle: {
    ...Typography.subtitle,
    color: Colors.text.primary,
  } as TextStyle,
  modeDescription: {
    ...Typography.caption,
    color: Colors.text.tertiary,
    marginBottom: Spacing.lg,
  } as TextStyle,
  toggleButton: {
    width: 60,
    height: 32,
    borderRadius: BorderRadius.full,
    backgroundColor: Colors.neutral.medium,
    justifyContent: 'center',
    padding: 2,
  } as ViewStyle,
  toggleButtonActive: {
    backgroundColor: Colors.secondary.light,
  } as ViewStyle,
  toggleCircle: {
    width: 28,
    height: 28,
    borderRadius: BorderRadius.full,
    backgroundColor: Colors.neutral.white,
  } as ViewStyle,
  toggleCircleActive: {
    transform: [{ translateX: 28 }],
  } as ViewStyle,
  bonusContainer: {
    marginTop: Spacing.lg,
    backgroundColor: Colors.neutral.white,
    borderRadius: BorderRadius.lg,
    padding: Spacing.lg,
    ...Shadows.small,
  } as ViewStyle,
  bonusHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: Spacing.sm,
    marginBottom: Spacing.md,
  } as ViewStyle,
  bonusTitle: {
    ...Typography.subtitle,
    color: Colors.text.primary,
  } as TextStyle,
  progressBar: {
    height: 8,
    backgroundColor: Colors.neutral.medium,
    borderRadius: BorderRadius.sm,
    marginBottom: Spacing.md,
    overflow: 'hidden',
  } as ViewStyle,
  progressFill: {
    height: '100%',
    backgroundColor: Colors.secondary.main,
    borderRadius: BorderRadius.sm,
  } as ViewStyle,
  bonusDescription: {
    ...Typography.caption,
    color: Colors.text.tertiary,
    marginBottom: Spacing.md,
  } as TextStyle,
  bonusFeatures: {
    gap: Spacing.sm,
  } as ViewStyle,
  featureItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: Spacing.sm,
  } as ViewStyle,
  featureText: {
    ...Typography.caption,
    color: Colors.text.secondary,
  } as TextStyle,
}); 