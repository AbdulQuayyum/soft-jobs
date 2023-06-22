import React, { useState } from 'react'
import { View, Text, TextInput, TouchableOpacity, Image, FlatList } from "react-native";
import { useRouter } from "expo-router";

import styles from "../Styles/Welcome"
import { Icons, SIZES } from "../Constants/Index"

const JobTypes = ["Full-time", "Part-time", "Contracts", "Internship"];

const Welcome = ({ searchTerm, setSearchTerm, HandleClick }) => {
    const router = useRouter();
    const [activeJobType, setActiveJobType] = useState("Full-time");

    return (
        <View>
            <View style={styles.container}>
                <Text style={styles.userName}>Hello Abdul-Quayym</Text>
                <Text style={styles.welcomeMessage}>Looking for a job?</Text>
            </View>
            <View style={styles.searchContainer}>
                <View style={styles.searchWrapper}>
                    <TextInput
                        style={styles.searchInput}
                        value={searchTerm}
                        onChangeText={(text) => setSearchTerm(text)}
                        placeholder='What are you looking for?'
                    />
                </View>
                <TouchableOpacity style={styles.searchBtn} onPress={HandleClick}>
                    <Image
                        source={Icons.Search}
                        resizeMode='contain'
                        style={styles.searchBtnImage}
                    />
                </TouchableOpacity>
            </View>
            <View style={styles.tabsContainer}>
                <FlatList
                    data={JobTypes}
                    renderItem={({ item }) => (
                        <TouchableOpacity
                            style={styles.tab(activeJobType, item)}
                            onPress={() => {
                                setActiveJobType(item);
                                router.push(`/Search/${item}`);
                            }}
                        >
                            <Text style={styles.tabText(activeJobType, item)}>{item}</Text>
                        </TouchableOpacity>
                    )}
                    keyExtractor={(item) => item}
                    contentContainerStyle={{ columnGap: SIZES.small }}
                    horizontal
                />
            </View>
        </View>
    )
}

export default Welcome