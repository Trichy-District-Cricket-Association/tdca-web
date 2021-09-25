import React from 'react';

import { Page, Text, View, Document, StyleSheet, Image } from '@react-pdf/renderer';
const defaultAvatar = `${process.env.PUBLIC_URL}/assets/images/defaultAvatar.jpg`;
const logo = `${process.env.PUBLIC_URL}/assets/images/logo.jpg`;
type PlayersPrintProps = {
    players: any;
    teamName: string | undefined;
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
    profile: {
        marginTop: 10,
        width: 100,
        borderRadius: 5,
        height: 100,
    },
    attribute: {
        fontSize: 12,
        fontWeight: 10,
        marginBottom: 3,
        color: '#0d4194',
    },
    top: {
        width: '100%',
        height: 50,
        backgroundColor: '#0d4194',
        flexDirection: 'row',
        justifyContent: 'center',
    },
    text: {
        fontSize: 13,
        marginBottom: 10,
    },

    data: {
        marginTop: 15,
        textAlign: 'center',
        flexDirection: 'column',
    },
    logo: {
        width: 40,
        height: 40,
        borderRadius: 10,
        marginLeft: 15,
    },
    heading: {
        marginTop: 10,
        color: '#fff',
        marginLeft: 25,
        fontSize: 16,
        fontWeight: 'bold',
    },
    container: {
        display: 'flex',
        height: '165px',
        flexDirection: 'row',
        justifyContent: 'space-evenly',
    },
});

// Create Document Component
const PrintSelectedTeamPlayers: React.FC<PlayersPrintProps> = ({ players, teamName }) => (
    <Document>
        <Page size="A4" style={styles.page}>
            <View style={styles.top}>
                <Image src={logo} style={styles.logo} />
                <Text style={styles.heading}>{teamName} </Text>
            </View>
            {players.map((player: any) => (
                <View key={player.playerId} style={styles.container}>
                    <View style={styles.section}>
                        <Image
                            style={styles.profile}
                            src={player.avatarUrl ? `https://cors.bridged.cc/${player.avatarUrl}` : defaultAvatar}
                        />
                    </View>

                    <View style={styles.data}>
                        <Text style={styles.attribute}>Player Name </Text>
                        <Text style={styles.text}>{player.playerName ?? 'NA'}</Text>
                        <Text style={styles.attribute}>Player Id </Text>
                        <Text style={styles.text}>{player.playerId ?? 'NA'} </Text>
                        <Text style={styles.attribute}>Date of Birth </Text>
                        <Text style={styles.text}>{player.dateOfBirth?.toISOString().substr(0, 10) ?? 'NA'} </Text>
                    </View>
                    <View style={styles.data}>
                        <Text style={styles.attribute}>Primary Contact</Text>
                        <Text style={styles.text}>{player.primaryContact ?? 'NA'}</Text>
                        <Text style={styles.attribute}>Aadhar Number</Text>
                        <Text style={styles.text}>{player.aadharNumber ?? 'NA'} </Text>
                        <Text style={styles.attribute}>Registeration Fee </Text>
                        <Text style={styles.text}>{player.registerationFee ?? 'NA'} </Text>
                    </View>
                </View>
            ))}
        </Page>
    </Document>
);
export default PrintSelectedTeamPlayers;
