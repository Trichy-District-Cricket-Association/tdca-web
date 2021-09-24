import React from 'react';

import { Page, Text, View, Document, StyleSheet, Image } from '@react-pdf/renderer';
import Player from '../../../../../../models/Player';
const defaultAvatar = `${process.env.PUBLIC_URL}/assets/images/defaultAvatar.jpg`;
const logo = `${process.env.PUBLIC_URL}/assets/images/logo.jpg`;
type PlayerPrintProps = {
    player: Player;
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
const PrintPlayer: React.FC<PlayerPrintProps> = ({ player }): JSX.Element => (
    <Document>
        <Page size="A4" style={styles.page}>
            <View style={styles.top}>
                <Image src={logo} style={styles.logo} />
                <Text style={styles.heading}>The Tiruchirappalli Cricket Association </Text>
            </View>
            <Text style={styles.heading1}>Player Details</Text>
            <View style={styles.section}>
                <Image
                    style={styles.profile}
                    src={player.avatarUrl ? `https://cors.bridged.cc/${player.avatarUrl}` : defaultAvatar}
                />
            </View>
            <View style={styles.section1}>
                <View style={styles.data}>
                    <Text style={styles.attribute}>Player Name </Text>
                    <Text style={styles.text}>{player.playerName ?? 'NA'}</Text>
                    <Text style={styles.attribute}>Player Id </Text>
                    <Text style={styles.text}>{player.playerId ?? 'NA'} </Text>
                    <Text style={styles.attribute}>Email Id </Text>
                    <Text style={styles.text}>{player.emailId ?? 'NA'}</Text>
                    <Text style={styles.attribute}>Father&apos;s Name </Text>
                    <Text style={styles.text}>{player.fatherName ?? 'NA'}</Text>
                    <Text style={styles.attribute}>Date of Birth </Text>
                    <Text style={styles.text}>{player.dateOfBirth?.toISOString().substr(0, 10) ?? 'NA'} </Text>
                    <Text style={styles.attribute}>Team Name</Text>
                    <Text style={styles.text}>{player.teamName ?? 'NA'} </Text>
                    <Text style={styles.attribute}>Primary Contact</Text>
                    <Text style={styles.text}>{player.primaryContact ?? 'NA'}</Text>
                    <Text style={styles.attribute}>Date of Registeration </Text>
                    <Text style={styles.text}>{player.dateOfRegisteration?.toISOString().substr(0, 10) ?? 'NA'}</Text>
                </View>
                <View style={styles.data}>
                    <Text style={styles.attribute}>Registeration Fee </Text>
                    <Text style={styles.text}>{player.registerationFee ?? 'NA'} </Text>
                    <Text style={styles.attribute}>Aadhar Number </Text>
                    <Text style={styles.text}>{player.aadharNumber ?? 'NA'}</Text>
                    <Text style={styles.attribute}>Voter Id </Text>
                    <Text style={styles.text}> {player.voterId ?? 'NA'}</Text>
                    <Text style={styles.attribute}>Ration Card Number</Text>
                    <Text style={styles.text}>{player.rationCardNumber ?? 'NA'} </Text>
                    <Text style={styles.attribute}>Driving License</Text>
                    <Text style={styles.text}>{player.drivingLicense ?? 'NA'}</Text>
                    <Text style={styles.attribute}>Pan Card Number</Text>
                    <Text style={styles.text}>{player.panCardNumber ?? 'NA'} </Text>
                    <Text style={styles.attribute}>Passport </Text>
                    <Text style={styles.text}>{player.passport ?? 'NA'}</Text>
                </View>
            </View>
        </Page>
    </Document>
);
export default PrintPlayer;
