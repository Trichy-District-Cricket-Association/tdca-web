import React from 'react';

import { Page, Text, View, Document, StyleSheet, Image } from '@react-pdf/renderer';

import Umpire from '../../../../../models/Umpire';
const logo = `${process.env.PUBLIC_URL}/assets/images/logo.jpg`;
type UmpirePrintProps = {
    umpire: Umpire;
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
const Printumpire: React.FC<UmpirePrintProps> = ({ umpire }): JSX.Element => (
    <Document>
        <Page size="A4" style={styles.page}>
            <View style={styles.top}>
                <Image src={logo} style={styles.logo} />
                <Text style={styles.heading}>The Tiruchirappalli Cricket Association </Text>
            </View>
            <Text style={styles.heading1}>Umpire Details</Text>
            <View style={styles.section}>
                <Image style={styles.profile} src={`https://cors.bridged.cc/${umpire.avatarUrl}`} />
            </View>
            <View style={styles.section1}>
                <View style={styles.data}>
                    <Text style={styles.attribute}>Umpire Name </Text>
                    <Text style={styles.text}>{umpire.umpireName ?? 'NA'}</Text>
                    <Text style={styles.attribute}>Umpire Id </Text>
                    <Text style={styles.text}>{umpire.umpireId ?? 'NA'} </Text>
                    <Text style={styles.attribute}>Email Id </Text>
                    <Text style={styles.text}>{umpire.emailId ?? 'NA'}</Text>

                    <Text style={styles.attribute}>Date of Birth </Text>
                    <Text style={styles.text}>{umpire.dateOfBirth?.toISOString().substr(0, 10) ?? 'NA'} </Text>
                    <Text style={styles.attribute}>Panel </Text>
                    <Text style={styles.text}>{umpire.panel}</Text>
                    <Text style={styles.attribute}>Primary Contact</Text>
                    <Text style={styles.text}>{umpire.primaryContact ?? 'NA'}</Text>
                    <Text style={styles.attribute}>Secondary Contact</Text>
                    <Text style={styles.text}>{umpire.secondaryContact ?? 'NA'}</Text>
                    <Text style={styles.attribute}>Address </Text>
                    <Text style={styles.text}>{umpire.address}</Text>
                </View>
                <View style={styles.data}>
                    <Text style={styles.attribute}>Aadhar Number </Text>
                    <Text style={styles.text}>{umpire.aadharNumber ?? 'NA'}</Text>
                </View>
            </View>
        </Page>
    </Document>
);
export default Printumpire;
