import { View, Image, StyleSheet, Pressable } from 'react-native';
import { Text } from '../../../../../../ui';
import LinearGradient from 'react-native-linear-gradient';
import { Card } from '../../../../providers';

export const CardTemplate = ({
    card,
    onPress = () => {}
}: {
  card: Card,
  onPress: (_card: Card) => void
}) => {
    return (
        <Pressable onPress={() => onPress(card)}>
            <LinearGradient colors={card?.gradient} style={styles.container}>
                <View style={styles.leftSide}>
                <Image resizeMode="contain" width={60} height={30} source={{ uri: card?.bankLogo }} />
                <Text.Label style={styles.cardNumber}>{card?.cardNumber}</Text.Label>
                </View>
                <View style={styles.rightSide}>
                <Text.Label style={styles.expiration}>Ven. {card?.expirationDate}</Text.Label>
                <Image resizeMode="contain" width={40} height={24} source={{ uri: card?.sponsorLogo }} />
                </View>
            </LinearGradient>
        </Pressable>
    )
}

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        borderRadius: 14,
        paddingHorizontal: 17,
        paddingVertical: 15,
        height: 180
    },
    cardNumber: {
        color: '#BEBEBE',
        fontSize: 20
    },
    leftSide: {
        justifyContent: 'space-between',
        paddingBottom: 20
    },
    rightSide: {
        justifyContent: 'space-between',
        alignItems: 'flex-end',
        flex: 1
    },
    expiration: {
        color: '#BEBEBE',
        fontSize: 12
    }
})