import { useState } from 'react';
import { View, Text, StyleSheet, Pressable } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import Animated, {
  useAnimatedStyle,
  withSpring,
  interpolate,
  useSharedValue,
  withSequence,
  withTiming,
} from 'react-native-reanimated';
import { faker } from '@faker-js/faker';
import { BlurView } from 'expo-blur';

const CARD_NUMBER = faker.finance.creditCardNumber('#### #### #### ####');
const EXPIRY_DATE = faker.date.future().toLocaleDateString('en-US', { month: '2-digit', year: '2-digit' });
const CVV = faker.finance.creditCardCVV();

export default function YoloPayScreen() {
  const [isFrozen, setIsFrozen] = useState(false);
  const freezeAnimation = useSharedValue(0);
  const blurAnimation = useSharedValue(0);

  const handleFreezeToggle = () => {
    setIsFrozen(!isFrozen);
    freezeAnimation.value = withSequence(
      withSpring(1, { damping: 12 }),
      withSpring(0, { damping: 12 })
    );
    blurAnimation.value = withTiming(isFrozen ? 0 : 1, { duration: 300 });
  };

  const cardAnimatedStyle = useAnimatedStyle(() => {
    const scale = interpolate(freezeAnimation.value, [0, 0.5, 1], [1, 0.95, 1]);
    const rotate = interpolate(freezeAnimation.value, [0, 0.5, 1], [0, -5, 0]);

    return {
      transform: [
        { scale },
        { rotateZ: `${rotate}deg` },
      ],
    };
  });

  const blurAnimatedStyle = useAnimatedStyle(() => {
    const opacity = interpolate(blurAnimation.value, [0, 1], [0, 0.8]);
    return {
      opacity,
    };
  });

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.title}>select payment mode</Text>
      <Text style={styles.subtitle}>
        choose your preferred payment method to make payment.
      </Text>

      <View style={styles.toggleContainer}>
        <Pressable style={styles.toggleButton}>
          <Text style={styles.toggleButtonText}>pay</Text>
        </Pressable>
        <Pressable style={[styles.toggleButton, styles.toggleButtonActive]}>
          <Text style={[styles.toggleButtonText, styles.toggleButtonTextActive]}>
            card
          </Text>
        </Pressable>
      </View>

      <Text style={styles.cardTitle}>YOUR DIGITAL DEBIT CARD</Text>

      <View style={styles.cardContainer}>
        <Animated.View style={[styles.card, cardAnimatedStyle]}>
          <View style={styles.cardHeader}>
            <Text style={styles.cardLogo}>YOLO</Text>
            <Text style={styles.cardBank}>YES BANK</Text>
          </View>
          <View style={styles.cardDetails}>
            <Text style={styles.cardNumber}>{CARD_NUMBER}</Text>
            <View style={styles.cardInfo}>
              <Text style={styles.cardInfoText}>
                {EXPIRY_DATE}
              </Text>
              <Text style={styles.cardInfoText}>CVV: {CVV}</Text>
            </View>
          </View>
          <View style={styles.cardFooter}>
            <Text style={styles.cardType}>RuPay</Text>
            <Text style={styles.cardVariant}>PREPAID</Text>
          </View>
        </Animated.View>
        {isFrozen && (
          <Animated.View style={[StyleSheet.absoluteFill, styles.blurOverlay, blurAnimatedStyle]}>
            <BlurView intensity={20} style={StyleSheet.absoluteFill} />
          </Animated.View>
        )}
      </View>

      <Pressable
        style={[styles.freezeButton, isFrozen && styles.freezeButtonActive]}
        onPress={handleFreezeToggle}>
        <Text style={[styles.freezeButtonText, isFrozen && styles.freezeButtonTextActive]}>
          {isFrozen ? 'unfreeze' : 'freeze'}
        </Text>
      </Pressable>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000000',
    padding: 20,
  },
  title: {
    fontSize: 24,
    color: '#ffffff',
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 14,
    color: '#666666',
    marginBottom: 24,
  },
  toggleContainer: {
    flexDirection: 'row',
    marginBottom: 32,
  },
  toggleButton: {
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderRadius: 20,
    marginRight: 8,
  },
  toggleButtonActive: {
    backgroundColor: '#ff3b30',
  },
  toggleButtonText: {
    color: '#666666',
    fontSize: 16,
  },
  toggleButtonTextActive: {
    color: '#ffffff',
  },
  cardTitle: {
    fontSize: 12,
    color: '#666666',
    marginBottom: 16,
  },
  cardContainer: {
    position: 'relative',
    height: 220,
  },
  card: {
    backgroundColor: '#1c1c1e',
    borderRadius: 16,
    padding: 24,
    height: '100%',
    justifyContent: 'space-between',
  },
  blurOverlay: {
    backgroundColor: 'rgba(0, 0, 0, 0.3)',
    borderRadius: 16,
    overflow: 'hidden',
  },
  cardHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  cardLogo: {
    color: '#ffffff',
    fontSize: 24,
    fontWeight: 'bold',
  },
  cardBank: {
    color: '#ffffff',
    fontSize: 16,
  },
  cardDetails: {
    marginVertical: 24,
  },
  cardNumber: {
    color: '#ffffff',
    fontSize: 20,
    letterSpacing: 2,
    marginBottom: 16,
  },
  cardInfo: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  cardInfoText: {
    color: '#ffffff',
    fontSize: 14,
  },
  cardFooter: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  cardType: {
    color: '#ffffff',
    fontSize: 20,
    fontWeight: 'bold',
  },
  cardVariant: {
    color: '#666666',
    fontSize: 12,
  },
  freezeButton: {
    position: 'absolute',
    bottom: 40,
    right: 20,
    backgroundColor: 'transparent',
    borderWidth: 1,
    borderColor: '#ff3b30',
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderRadius: 20,
  },
  freezeButtonActive: {
    backgroundColor: '#ff3b30',
  },
  freezeButtonText: {
    color: '#ff3b30',
    fontSize: 16,
  },
  freezeButtonTextActive: {
    color: '#ffffff',
  },
});