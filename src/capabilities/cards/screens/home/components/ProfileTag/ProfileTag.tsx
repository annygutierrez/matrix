import { StyleSheet, View } from 'react-native';
import { Text } from '../../../../../../ui';

export const ProfileTag = ({ description = '' }: { description: string }) => {
    return (
        <View style={styles.container}>
             <Text.Label style={styles.text}>{description}</Text.Label>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: '#FFEC8D',
        marginRight: 'auto',
        paddingHorizontal: 8,
        paddingVertical: 3,
        borderRadius: 15
    },
    text: {
        color: '#F49417',
        fontSize: 11
    }
})