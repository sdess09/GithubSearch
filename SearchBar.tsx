import React from 'react';
import { View, TextInput, Image, StyleSheet } from 'react-native';

interface SearchBarProps {
    onSearchChange: (text: string) => void;
}

const SearchBar: React.FC<SearchBarProps> = ({ onSearchChange }) => (
    <View style={styles.searchBox}>
        <Image
            source={require('./assets/search.png')}
            style={styles.searchIcon}
        />
        <TextInput
            placeholder="Search"
            placeholderTextColor="#838383"
            style={styles.searchInput}
            onChangeText={onSearchChange}
        />
    </View>
);

const styles = StyleSheet.create({
    searchBox: {
        flexDirection: 'row',
        alignItems: 'center',
        height: 48,
        backgroundColor: 'rgba(255, 255, 255, 0.3)',
        boxShadow: '0px 4px 4px rgba(0, 0, 0, 0.02)',
        borderRadius: 10,
    },
    searchIcon: {
        width: 24,
        height: 24,
        marginRight: 12,
        marginLeft: 12,
    },
    searchInput: {
        flex: 1,
        fontFamily: 'SF Pro',
        fontWeight: '400',
        fontSize: 14,
        color: '#000000',
        backgroundColor: 'transparent',
    },
});

export default SearchBar;
