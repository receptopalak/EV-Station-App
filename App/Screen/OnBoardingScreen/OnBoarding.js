import React from 'react';
import Onboarding from 'react-native-onboarding-swiper';
import { Button } from 'react-native';

const OnboardingScreen = ({ navigation }) => {
  return (
    <Onboarding
      onDone={() => navigation.replace('Home')}
      pages={[
        {
          backgroundColor: '#fff',
          image: <Button title="React Native" onPress={() => {}} />,
          title: 'Onboarding 1',
          subtitle: 'Birinci sayfa açıklaması.',
        },
        {
          backgroundColor: '#fe6e58',
          image: <Button title="Onboarding" onPress={() => {}} />,
          title: 'Onboarding 2',
          subtitle: 'İkinci sayfa açıklaması.',
        },
      ]}
    />
  );
};

export default OnboardingScreen;
