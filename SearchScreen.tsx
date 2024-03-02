import React, { useEffect, useState } from 'react';
import {
    View,
    Animated,
    StyleSheet,
    TouchableOpacity,
    Image,
    Text,
    FlatList,
    ActivityIndicator,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import Header from './Header';
import SearchBar from './SearchBar';
import { RepositoryItem } from './types';

const SearchScreen: React.FC = () => {
    const [query, setQuery] = useState<string>('');
    const [debouncedQuery, setDebouncedQuery] = useState<string>(query);
    const [repos, setRepos] = useState<RepositoryItem[]>([]);
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [error, setError] = useState<string>('');
    const [noResults, setNoResults] = useState<boolean>(false);
    const navigation = useNavigation();

    useEffect(() => {
        const handler = setTimeout(() => {
            setDebouncedQuery(query);
        }, 500);

        return () => {
            clearTimeout(handler);
        };
    }, [query]);

    const fetchRepos = async () => {
        setError('');
        setNoResults(false);
        if (debouncedQuery.trim() === '') {
            setRepos([]);
            return;
        }
        setIsLoading(true);
        try {
            const response = await fetch(`https://api.github.com/search/repositories?q=${debouncedQuery}&per_page=20`, {
                headers: {
                    Authorization: `token ${process.env.GITHUB_ACCESS_TOKEN}`,
                },
            });
            const data = await response.json();
            if (data.items.length === 0) {
                setNoResults(true);
            } else {
                setRepos(data.items);
            }
        } catch (error) {
            setError("Failed to fetch data. Please try again.");
        } finally {
            setIsLoading(false);
        }
    };

    useEffect(() => {
        fetchRepos();
    }, [debouncedQuery]);

    return (
        <View style={styles.container}>
            {/*Github Log*/}
            <Header />
            {/*Search Bar */}
            <SearchBar onSearchChange={setQuery} />
            {isLoading ? (
                <ActivityIndicator size="large" color="#0000ff" style={styles.loader} />
            ) : error ? (
                <Text style={styles.errorText}>{error}</Text>
            ) : noResults ? (
                <Text style={styles.errorText}>No results found.</Text>
            ) : (
                <FlatList
                    data={repos}
                    keyExtractor={item => item.id.toString()}
                    renderItem={({ item }) => (
                        <TouchableOpacity onPress={() => navigation.navigate('DetailsScreen', { item })}>
                            <View style={styles.listItem}>
                                <View style={styles.textContainer}>
                                    <Image source={{ uri: item.owner.avatar_url }} style={styles.avatar} />
                                    <Text style={styles.itemName} numberOfLines={1} ellipsizeMode='tail'>
                                        {item.full_name}
                                    </Text>
                                </View>
                                <Text style={styles.description} numberOfLines={2} ellipsizeMode='tail'>
                                    {item.description}
                                </Text>
                            </View>
                        </TouchableOpacity>
                    )}
                    contentContainerStyle={{ paddingTop: 24 }}
                />
            )}
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: 'column',
        justifyContent: 'flex-start',
        alignItems: 'stretch',
        paddingTop: 60,
        paddingHorizontal: 30,
    },
    listItem: {
        flexDirection: 'column',
        alignItems: 'flex-start',
        padding: 16,
        marginBottom: 16,
        backgroundColor: '#FBFBFB',
        borderRadius: 10,
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 4,
        },
        shadowOpacity: 0.02,
        shadowRadius: 4,
        elevation: 2,
        minHeight: 100,
    },
    avatar: {
        width: 24,
        height: 24,
        borderRadius: 6,
        marginRight: 10,
    },
    textContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        width: '100%',
        marginBottom: 4,
    },
    itemName: {
        fontFamily: 'SF Pro',
        fontWeight: 'bold',
        fontSize: 14,
        color: '#000000',
        flexShrink: 1,
    },
    description: {
        fontFamily: 'SF Pro',
        fontWeight: 'normal',
        fontSize: 14,
        color: '#242424',
        marginTop: 4,
        lineHeight: 17,
        width: '100%',
        flexShrink: 1,
        overflow: 'hidden',
        textOverflow: 'ellipsis',
        numberOfLines: 2,
    },
    loader: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    errorText: {
        textAlign: 'center',
        color: 'red',
        fontSize: 16,
    },
});

export default SearchScreen;
