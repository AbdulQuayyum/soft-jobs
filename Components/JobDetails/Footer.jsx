import React from 'react'
import { View, Text, TouchableOpacity, Image, Linking } from "react-native";

import { Icons } from "../../Constants/Index"
import styles from '../../Styles/Footer';

const Footer = ({ url }) => {
    return (
        <View style={styles.container}>
            <TouchableOpacity style={styles.likeBtn}>
                <Image
                    source={Icons.HeartOutline}
                    resizeMode='contain'
                    style={styles.likeBtnImage}
                />
            </TouchableOpacity>

            <TouchableOpacity
                style={styles.applyBtn}
                onPress={() => Linking.openURL(url)}
            >
                <Text style={styles.applyBtnText}>Apply for job</Text>
            </TouchableOpacity>
        </View>
    );
};

export default Footer;