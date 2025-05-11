import React, { useEffect } from 'react';
import { StyleSheet, View } from 'react-native';
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withSpring,
  withSequence,
  withDelay,
  interpolate,
  Extrapolate,
} from 'react-native-reanimated';
import { IconSymbol } from './ui/IconSymbol';
import { Colors, Animation } from '@/constants/Theme';

interface RewardAnimationProps {
  isVisible: boolean;
  onComplete?: () => void;
}

export function RewardAnimation({ isVisible, onComplete }: RewardAnimationProps) {
  const scale = useSharedValue(0);
  const opacity = useSharedValue(0);
  const rotation = useSharedValue(0);

  useEffect(() => {
    if (isVisible) {
      // Reset values
      scale.value = 0;
      opacity.value = 0;
      rotation.value = 0;

      // Start animation sequence
      scale.value = withSpring(1, {
        damping: 10,
        stiffness: 100,
      });
      opacity.value = withSpring(1, {
        damping: 10,
        stiffness: 100,
      });

      // Rotate the star
      rotation.value = withSequence(
        withSpring(15, { damping: 10, stiffness: 100 }),
        withSpring(-15, { damping: 10, stiffness: 100 }),
        withSpring(0, { damping: 10, stiffness: 100 })
      );

      // Trigger completion callback after animation
      setTimeout(() => {
        if (onComplete) onComplete();
      }, Animation.duration.slow);
    }
  }, [isVisible]);

  const starStyle = useAnimatedStyle(() => {
    return {
      transform: [
        { scale: scale.value },
        { rotate: `${rotation.value}deg` },
      ],
      opacity: opacity.value,
    };
  });

  const particleStyle = useAnimatedStyle(() => {
    return {
      transform: [
        { scale: interpolate(scale.value, [0, 1], [0, 1], Extrapolate.CLAMP) },
      ],
      opacity: interpolate(opacity.value, [0, 1], [0, 0.8], Extrapolate.CLAMP),
    };
  });

  if (!isVisible) return null;

  return (
    <View style={styles.container}>
      <Animated.View style={[styles.starContainer, starStyle]}>
        <IconSymbol name="star.fill" size={64} color={Colors.secondary.main} />
      </Animated.View>
      
      {/* Particles */}
      {[...Array(8)].map((_, index) => (
        <Animated.View
          key={index}
          style={[
            styles.particle,
            particleStyle,
            {
              transform: [
                { rotate: `${(360 / 8) * index}deg` },
                { translateX: 40 },
              ],
            },
          ]}
        >
          <IconSymbol name="sparkles" size={16} color={Colors.secondary.main} />
        </Animated.View>
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    justifyContent: 'center',
    alignItems: 'center',
    pointerEvents: 'none',
  },
  starContainer: {
    position: 'absolute',
    justifyContent: 'center',
    alignItems: 'center',
  },
  particle: {
    position: 'absolute',
    justifyContent: 'center',
    alignItems: 'center',
  },
}); 