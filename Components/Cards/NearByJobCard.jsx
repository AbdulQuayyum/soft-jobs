import React from 'react'
import { View, Text, TouchableOpacity, Image } from "react-native";

import styles from "../../Styles/NearByJobCard"
import { CheckImageUrl } from '../../Utilities/Index';

const NearByJobCard = ({ job, handleNavigate }) => {
    return (
        <TouchableOpacity style={styles.container} onPress={handleNavigate}>
            <TouchableOpacity style={styles.logoContainer}>
                <Image
                    source={{
                        uri: CheckImageUrl(job.employer_logo)
                            ? job.employer_logo
                            : "https://cdn1.sportngin.com/attachments/photo/7726/1001/No_Logo_Available.png",
                    }}
                    resizeMode='contain'
                    style={styles.logImage}
                />
            </TouchableOpacity>

            <View style={styles.textContainer}>
                <Text style={styles.jobName} numberOfLines={1}>
                    {job?.job_title}
                </Text>

                <Text style={styles.jobType}>{job?.job_employment_type}</Text>
            </View>
        </TouchableOpacity>
    );
};

export default NearByJobCard