import { ScrollView, StyleSheet } from 'react-native';
import { CardTemplate } from '../CardTemplate/CardTemplate';
import { Card } from '../../../../providers';

export const CardsList = ({
    cards = [],
    onPressItem = () => {},
    testID = 'cardsList.scroll'
}: {
    cards: Card[],
    onPressItem: (_item: Card) => void,
    testID?: string
}) => {
    return (
        <ScrollView testID={testID} contentContainerStyle={styles.container}>
            {
                cards.map(card => (
                    <CardTemplate
                      key={card?.cardId}
                      card={card}
                      onPress={onPressItem}
                    />
                ))
            }
        </ScrollView>
    )
}

const styles = StyleSheet.create({
  container: {
    rowGap: 12
  }
})