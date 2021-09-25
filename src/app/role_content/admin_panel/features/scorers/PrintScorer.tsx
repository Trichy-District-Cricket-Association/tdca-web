import React from 'react';

import { Page, Text, View, Document, StyleSheet, Image } from '@react-pdf/renderer';

import Scorer from '../../../../../models/Scorer';
const logo = `${process.env.PUBLIC_URL}/assets/images/logo.jpg`;
type ScorerPrintProps = {
    scorer: Scorer;
};
// Create styles
const styles = StyleSheet.create({
    page: {
        flexDirection: 'column',
    },
    section: {
        justifyContent: 'center',
        padding: 4,
        flexDirection: 'row',
    },
    top: {
        width: '100%',
        height: 50,
        backgroundColor: '#0d4194',
        flexDirection: 'row',
        justifyContent: 'center',
    },
    heading: {
        marginTop: 10,
        color: '#fff',
        marginLeft: 25,
        fontSize: 16,
        fontWeight: 'bold',
    },
    heading1: {
        marginTop: 10,
        color: '#0d4194',
        textAlign: 'center',
    },
    logo: {
        width: 40,
        height: 40,
        borderRadius: 10,
        marginLeft: 15,
    },
    profile: {
        marginTop: 10,
        width: 130,
        borderRadius: 5,
        height: 130,
    },
    attribute: {
        fontSize: 12,
        fontWeight: 10,
        marginBottom: 3,
        color: '#0d4194',
    },
    text: {
        fontSize: 13,
        marginBottom: 12,
    },
    data: {
        marginTop: 15,
    },
    section1: {
        display: 'flex',
        justifyContent: 'space-evenly',
        flexDirection: 'row',
    },
});

// Create Document Component
const PrintScorer: React.FC<ScorerPrintProps> = ({ scorer }): JSX.Element => (
    <Document>
        <Page size="A4" style={styles.page}>
            <View style={styles.top}>
                <Image src={logo} style={styles.logo} />
                <Text style={styles.heading}>The Tiruchirappalli Cricket Association </Text>
            </View>
            <Text style={styles.heading1}>Scorer Details</Text>
            <View style={styles.section}>
                <Image style={styles.profile} src={`https://cors.bridged.cc/${scorer.avatarUrl}`} />
            </View>
            <View style={styles.section1}>
                <View style={styles.data}>
                    <Text style={styles.attribute}>Scorer Name </Text>
                    <Text style={styles.text}>{scorer.scorerName ?? 'NA'}</Text>
                    <Text style={styles.attribute}>Scorer Id </Text>
                    <Text style={styles.text}>{scorer.scorerId ?? 'NA'} </Text>
                    <Text style={styles.attribute}>Email Id </Text>
                    <Text style={styles.text}>{scorer.emailId ?? 'NA'}</Text>

                    <Text style={styles.attribute}>Date of Birth </Text>
                    <Text style={styles.text}>{scorer.dateOfBirth?.toISOString().substr(0, 10) ?? 'NA'} </Text>
                    <Text style={styles.attribute}>Panel </Text>
                    <Text style={styles.text}>{scorer.panel}</Text>
                    <Text style={styles.attribute}>Primary Contact</Text>
                    <Text style={styles.text}>{scorer.primaryContact ?? 'NA'}</Text>
                    <Text style={styles.attribute}>Secondary Contact</Text>
                    <Text style={styles.text}>{scorer.secondaryContact ?? 'NA'}</Text>
                    <Text style={styles.attribute}>Address </Text>
                    <Text style={styles.text}>{scorer.address}</Text>
                </View>
                <View style={styles.data}>
                    <Text style={styles.attribute}>Aadhar Number </Text>
                    <Text style={styles.text}>{scorer.aadharNumber ?? 'NA'}</Text>
                </View>
            </View>
        </Page>
    </Document>
);
export default PrintScorer;
