import React, { useEffect, useState } from 'react';
import { View, ScrollView, Image, Text, TouchableOpacity, StyleSheet, Linking, Dimensions } from 'react-native';
import { RouteProp } from '@react-navigation/native';
import { RepositoryItem, Languages } from './types';

type StackParamList = {
    DetailsScreen: {
        item: RepositoryItem;
    };
};

interface DetailsScreenProps {
    route: RouteProp<StackParamList, 'DetailsScreen'>;
}
const DetailsScreen: React.FC<DetailsScreenProps> = ({ route }) => {
    const { item } = route.params;
    const [languages, setLanguages] = useState<Languages>({});

    const openURL = async () => {
        const supported = await Linking.canOpenURL(item.html_url);
        if (supported) {
            await Linking.openURL(item.html_url);
        } else {
            console.error("Don't know how to open this URL: " + item.html_url);
        }
    };

    useEffect(() => {
        const fetchLanguages = async () => {
            const ownerLogin = item.owner.login;
            const repoName = item.name;
            const url = `https://api.github.com/repos/${ownerLogin}/${repoName}/languages`;
            try {
                const response = await fetch(url);
                const data = await response.json();
                setLanguages(data);
            } catch (error) {
                console.error("Failed to fetch repository languages:", error);
            }
        };

        fetchLanguages();
    }, [item]);


    return (
        <View style={styles.fullScreen}>
            <ScrollView style={styles.container}>
                {/* Top Container */}
                <View style={styles.contentContainer}>
                    <Image source={{ uri: item.owner.avatar_url }} style={styles.avatar} />
                    <Text style={styles.name}>{item.full_name}</Text>
                    <View style={styles.detailSection}>
                        <Image source={require('./assets/eye.png')} style={styles.icon} />
                        <Text style={styles.countText}>{item.watchers_count}k</Text>
                        <Image source={require('./assets/repo-forked.png')} style={styles.icon} />
                        <Text style={styles.countText}>{item.forks_count}k</Text>
                        <Image source={require('./assets/star.png')} style={styles.icon} />
                        <Text style={styles.countText}>{item.stargazers_count}k</Text>
                    </View>
                </View>

                {/* Divider */}
                <View style={styles.divider} />

                {/* Bottom Container */}
                <View style={styles.bottomContainer}>
                    <Text style={styles.description}>{item.description}</Text>
                    <View style={styles.languagesContainer}>
                        <Text style={styles.languagesHeader}>Languages</Text>
                        {Object.keys(languages).map((language) => (
                            <Text key={language} style={styles.languageItem}>{language}</Text>
                        ))}
                    </View>
                </View>
            </ScrollView>

            {/*Button*/}
            <TouchableOpacity onPress={openURL} style={styles.linkButton}>
                <Text style={styles.linkButtonText}>Go to Repository</Text>
            </TouchableOpacity>
        </View>
    );
};

const screenWidth = Dimensions.get('window').width;

const styles = StyleSheet.create({
    fullScreen: {
        flex: 1,
    },
    container: {
        flex: 1,
    },
    avatar: {
        width: 76,
        height: 76,
        borderRadius: 50,
    },
    contentContainer: {
        paddingLeft: 30,
        paddingRight: 10,
        paddingTop: 100,
        paddingBottom: 24,
    },
    bottomContainer: {
        paddingLeft: 30,
        paddingRight: 10,
        paddingTop: 24,
    },
    name: {
        fontSize: 18,
        fontWeight: 'bold',
        marginVertical: 8,
    },
    detailSection: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 14,
    },
    detailItem: {
        flexDirection: 'row',
        alignItems: 'center',
        marginRight: 5,
        width: 180,
        height: 16,
    },
    icon: {
        width: 16,
        height: 16,

    },
    countText: {
        fontFamily: 'SF Pro',
        fontWeight: '590',
        fontSize: 12,
        lineHeight: 12,
        color: '#707070',
    },
    description: {
        marginLeft: 4,
        fontSize: 14,
        marginVertical: 8,
    },

    languagesContainer: {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'flex-start',
        padding: 0,
        marginLeft: 4,
        marginTop: 10,
        width: 314,
        height: 173,
    },
    languagesHeader: {
        fontWeight: 'bold',
        marginBottom: 8,
        fontSize: 16,
        color: '#000',
    },

    languageItem: {
        fontFamily: 'SF Pro',
        fontStyle: 'normal',
        fontWeight: '400',
        fontSize: 14,
        lineHeight: 17,
        letterSpacing: -0.01,
        color: '#242424',
        alignSelf: 'stretch',
        flexGrow: 0,
        marginBottom: 4,
    },
    linkButton: {
        position: 'absolute',
        bottom: 48,
        left: '50%',
        transform: [{ translateX: -157.5 }],
        backgroundColor: '#1F6FEB',
        padding: 20,
        width: 315,
        borderRadius: 24,
    },

    linkButtonText: {
        color: 'white',
        textAlign: 'center',
        fontWeight: 'bold',
    },
    divider: {
        width: screenWidth,
        height: 1,
        backgroundColor: '#DDDDDD',
        marginTop: -1,
    },
});

export default DetailsScreen;
