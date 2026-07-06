// src/screens/HowRozWorksScreen.js
// Shown once on first app open after signup.
// Customer must tap "I Agree & Continue" to proceed.
// Saved to AsyncStorage so it never shows again.

import React, { useState } from 'react';
import {
  View, Text, TouchableOpacity, ScrollView,
  StyleSheet, SafeAreaView, ActivityIndicator
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

const STEPS = [
  {
    icon: '🏪',
    title: 'Real neighbourhood stores',
    body: 'Roz connects you with actual shops near you — the hardware store, the stationery mart, the pharmacy down the road. Real inventory, real merchants.',
  },
  {
    icon: '📦',
    title: 'Delivered today',
    body: 'Not 2-3 business days. Today. Delivery is handled by independent riders. Estimated time is shown by each store.',
  },
  {
    icon: '💰',
    title: 'Pay cash on delivery',
    body: 'Pay the rider when your order arrives. A small platform fee (10%) is included in your order total — shown clearly at checkout.',
  },
  {
    icon: '🛡️',
    title: 'We are a platform only',
    body: 'Roz connects you with merchants — we do not sell products ourselves. Your purchase contract is with the merchant. Product quality and availability are the merchant\'s responsibility.',
  },
  {
    icon: '🚚',
    title: 'Delivery is by third parties',
    body: 'Deliveries are handled by Borzo India. Roz is not responsible for delivery delays or damages. Optional insurance is available at checkout for eligible orders.',
  },
];

export default function HowRozWorksScreen({ navigation }) {
  const [agreeing, setAgreeing] = useState(false);

  async function handleAgree() {
    setAgreeing(true);
    await AsyncStorage.setItem('roz_onboarding_done', 'true');
    setAgreeing(false);
    navigation.replace('CustomerTabs');
  }

  return (
    <SafeAreaView style={s.container}>
      <ScrollView contentContainerStyle={s.content} showsVerticalScrollIndicator={false}>
        <Text style={s.logo}>Roz</Text>
        <Text style={s.title}>Before you start</Text>
        <Text style={s.subtitle}>Here's how Roz works and what you should know.</Text>

        {STEPS.map((step, idx) => (
          <View key={idx} style={s.step}>
            <Text style={s.stepIcon}>{step.icon}</Text>
            <View style={s.stepText}>
              <Text style={s.stepTitle}>{step.title}</Text>
              <Text style={s.stepBody}>{step.body}</Text>
            </View>
          </View>
        ))}

        <View style={s.disclaimer}>
          <Text style={s.disclaimerText}>
            By tapping "I Agree & Continue" you confirm that you are at least 18 years old and agree to Roz's{' '}
            <Text style={s.link} onPress={() => navigation.navigate('TermsOfService')}>Terms of Service</Text>,{' '}
            <Text style={s.link} onPress={() => navigation.navigate('PrivacyPolicy')}>Privacy Policy</Text>, and{' '}
            <Text style={s.link} onPress={() => navigation.navigate('RefundPolicy')}>Refund Policy</Text>.
          </Text>
        </View>

        <TouchableOpacity style={s.agreeBtn} onPress={handleAgree} disabled={agreeing}>
          {agreeing
            ? <ActivityIndicator color="#0a0a0f" />
            : <Text style={s.agreeBtnText}>I Agree & Continue →</Text>
          }
        </TouchableOpacity>

        <Text style={s.footer}>
          Roz is operated by <Text style={s.placeholder}>[BUSINESS NAME]</Text>, Bengaluru, Karnataka.{'\n'}
          Contact: rozhyperlocal@gmail.com
        </Text>
      </ScrollView>
    </SafeAreaView>
  );
}

const s = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#0a0a0f' },
  content: { padding: 28, paddingBottom: 48 },
  logo: { fontSize: 32, fontWeight: '900', color: '#f5c842', letterSpacing: -1, marginBottom: 24 },
  title: { fontSize: 26, fontWeight: '800', color: '#e8e4dc', letterSpacing: -0.5, marginBottom: 8 },
  subtitle: { fontSize: 15, color: '#666', marginBottom: 32, lineHeight: 22 },

  step: { flexDirection: 'row', gap: 16, marginBottom: 24, alignItems: 'flex-start' },
  stepIcon: { fontSize: 28, marginTop: 2, width: 36 },
  stepText: { flex: 1 },
  stepTitle: { fontSize: 16, fontWeight: '700', color: '#e8e4dc', marginBottom: 4 },
  stepBody: { fontSize: 14, color: '#888', lineHeight: 20 },

  disclaimer: {
    backgroundColor: 'rgba(255,255,255,0.04)',
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.08)',
    borderRadius: 14,
    padding: 16,
    marginTop: 8,
    marginBottom: 20,
  },
  disclaimerText: { fontSize: 13, color: '#666', lineHeight: 20 },
  link: { color: '#f5c842', fontWeight: '600' },

  agreeBtn: { backgroundColor: '#f5c842', borderRadius: 100, padding: 18, alignItems: 'center', marginBottom: 24 },
  agreeBtnText: { color: '#0a0a0f', fontWeight: '800', fontSize: 16 },

  footer: { fontSize: 11, color: '#333', textAlign: 'center', lineHeight: 18 },
  placeholder: { color: '#555', fontStyle: 'italic' },
});
