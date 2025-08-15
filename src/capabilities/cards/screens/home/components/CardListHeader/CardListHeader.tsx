import { View, StyleSheet } from 'react-native';
import { Text } from '../../../../../../ui';

export const CardListHeader = ({ numberOfCards = 0 }: { numberOfCards?: number }) => {
    return (
        <View style={styles.container}>
            <Text.Label style={styles.text}>({numberOfCards}) cards</Text.Label>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        marginTop: 20,
        paddingBottom: 20
    },
    text: {
        color: '#6E6E67',
        fontSize: 12
    }
})