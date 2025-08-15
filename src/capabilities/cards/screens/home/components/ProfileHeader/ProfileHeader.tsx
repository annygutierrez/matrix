import { View, StyleSheet } from 'react-native';
import { Avatar, Text } from '../../../../../../ui';
import { ProfileTag } from '../ProfileTag/ProfileTag';

export const ProfileHeader = ({
    avatar,
    userName,
    club
}: {
    avatar: string,
    userName: string,
    club: string
}) => {
    return (
      <View style={styles.container}>
        <View style={styles.avatarContainer}>
            <Avatar width={50} height={50} uri={avatar} />
        </View>
        <View style={styles.textsContainer}>
            <Text.Header>{userName}</Text.Header>
            <ProfileTag description={club} />
        </View>
      </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row'
    },
    avatarContainer: {
        width: 50,
        height: 50
    },
    textsContainer: {
        paddingLeft: 10,
        rowGap: 5
    }
})