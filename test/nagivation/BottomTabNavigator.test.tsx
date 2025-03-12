// BottomTabNavigator.test.tsx
import { NavigationContainer } from '@react-navigation/native';
import { render } from '@testing-library/react-native';
import React from 'react';
import BottomTabNavigation from '../../src/navigation/BottomTabNavigator';

// Make sure you don't import the extend-expect here as it's in the setup file

describe('BottomTabNavigation', () => {
  test('renders the bottom tab navigator with all screens', async () => {
    const { findByText } = render(
      <NavigationContainer>
        <BottomTabNavigation />
      </NavigationContainer>
    );

    // Verify that tab names render
    expect(await findByText('Home')).toBeTruthy();
    expect(await findByText('Projects')).toBeTruthy();
    expect(await findByText('Stats')).toBeTruthy();
  });

  test('renders correct tab icons', async () => {
    const { getByTestId } = render(
      <NavigationContainer>
        <BottomTabNavigation />
      </NavigationContainer>
    );

    expect(getByTestId('icon-home')).toBeTruthy();
    expect(getByTestId('icon-folder')).toBeTruthy();
    expect(getByTestId('icon-stats-chart')).toBeTruthy();
  });
});