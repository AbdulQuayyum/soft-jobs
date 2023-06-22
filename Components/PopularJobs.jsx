import React, { useState } from 'react'
import { useRouter } from "expo-router";
import { View, Text, TouchableOpacity, FlatList, ActivityIndicator } from "react-native";

import { COLORS, SIZES } from '../Constants/Theme';
import styles from "../Styles/PopularJobs"
import PopularJobCard from "../Components/Index"
import UseFetch from "../Utilities/UseFetch"

const PopularJobs = () => {
    return (
        <View>
            <Text> PopularJobs </Text>
        </View>
    )
}

export default PopularJobs