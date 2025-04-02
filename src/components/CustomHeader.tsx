import { NavigationProp } from '@react-navigation/native';
import React from 'react';
import { Image, TouchableOpacity, View } from 'react-native';
import colors from '../theme/colors';

export default function CustomHeader({
  navigation,
}: {
  navigation: NavigationProp<any>;
}) {
  return (
    <View
      style={{
        marginTop: 30,
        flexDirection: 'row',
        justifyContent: 'flex-end',
        alignItems: 'center',
        paddingHorizontal: 15,
        paddingVertical: 10,
        backgroundColor: '#fff',
        borderBottomWidth: 1,
        borderBottomColor: '#ddd',
      }}
    >
      {/* 🔹 Avatar que lleva al perfil */}
      <TouchableOpacity onPress={() => navigation.navigate('ProfileScreen')}>
        <Image
          source={{ uri: 'https://randomuser.me/api/portraits/men/1.jpg' }} // Imagen de perfil
          style={{
            width: 40,
            height: 40,
            borderRadius: 20,
            borderWidth: 2,
            borderColor: colors.background,
          }}
        />
      </TouchableOpacity>
    </View>
  );
}
