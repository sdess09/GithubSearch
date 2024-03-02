import React from 'react';
import { View, Text, Image, StyleSheet } from 'react-native';

const Header = () => (
    <View style={styles.logoTitleContainer}>
        <Image
            source={require('./assets/Vector.png')} // Replace with your logo image path
            style={styles.logo}
        />
        <Text style={styles.logoTitleText}>GitHub Repo Search</Text>
    </View>
);

const styles = StyleSheet.create({
    logoTitleContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingBottom: 24,
        height: 50,
    },
    logo: {
        width: 40,
        height: 40,
    },
    logoTitleText: {
        fontWeight: '700',
        fontSize: 14,
        lineHeight: 14,
        paddingLeft: 14,
        paddingTop: 10,
        color: '#000000',
    },
});

export default Header;
