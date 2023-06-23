import React from 'react'
import { View, Text, Image } from "react-native";

import { CheckImageUrl } from "../../Utilities/Index"
import { Icons } from '../../Constants/Index';
import styles from "../../Styles/Company"

const Company = ({ companyLogo, jobTitle, companyName, location }) => {
    return (
        <View style={styles.container}>
            <View style={styles.logoBox}>
                <Image
                    source={{
                        uri: CheckImageUrl(companyLogo)
                            ? companyLogo
                            : "https://cdn1.sportngin.com/attachments/photo/7726/1001/No_Logo_Available.png",
                    }}
                    style={styles.logoImage}
                />
            </View>

            <View style={styles.jobTitleBox}>
                <Text style={styles.jobTitle}>{jobTitle}</Text>
            </View>

            <View style={styles.companyInfoBox}>
                <Text style={styles.companyName}>{companyName} / </Text>
                <View style={styles.locationBox}>
                    <Image
                        source={Icons.Location}
                        resizeMode='contain'
                        style={styles.locationImage}
                    />
                    <Text style={styles.locationName}>{location}</Text>
                </View>
            </View>
        </View>
    );
};

export default Company;