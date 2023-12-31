import React from 'react'
import { View, Text, TouchableOpacity, Image } from "react-native";

import styles from "../../Styles/PopularJobCard"
import { CheckImageUrl } from "../../Utilities/Index"

const PopularJobCard = ({ item, selectedJob, HandleCardPress }) => {
    return (
        <TouchableOpacity
            style={styles.container(selectedJob, item)}
            onPress={() => HandleCardPress(item)}
        >
            <TouchableOpacity style={styles.logoContainer(selectedJob, item)}>
                <Image
                    source={{
                        uri: CheckImageUrl(item?.employer_logo)
                            ? item.employer_logo
                            : "https://cdn1.sportngin.com/attachments/photo/7726/1001/No_Logo_Available.png",
                    }}
                    resizeMode='contain'
                    style={styles.logoImage}
                />
            </TouchableOpacity>
            <Text style={styles.companyName} numberOfLines={1}>
                {item.employer_name}
            </Text>

            <View style={styles.infoContainer}>
                <Text style={styles.jobName(selectedJob, item)} numberOfLines={1}>
                    {item.job_title}
                </Text>
                <View style={styles.infoWrapper}>
                    <Text style={styles.publisher(selectedJob, item)}>
                        {item?.job_publisher} -
                    </Text>
                    <Text style={styles.location}> {item.job_country}</Text>
                </View>
            </View>
        </TouchableOpacity>
    );
};

export default PopularJobCard