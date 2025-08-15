import { View, StyleSheet } from 'react-native';
import { useHomeScreen } from './hooks/home-screen.hook';
import { CardListHeader, CardsList, ProfileHeader } from './components';

export const HomeScreen = () => {
  const {
    userProfile,
    numberOfCards,
    cards,
    SecureViewer,
    selectedCard,
    onSelectCard,
    onCloseModal,
    handleError
} = useHomeScreen();

    return (
        <View style={styles.container}>
            <ProfileHeader
              avatar={userProfile?.avatarUrl}
              userName={userProfile?.userName}
              club={userProfile?.membersClub}
            />
            <CardListHeader numberOfCards={numberOfCards} />
            <CardsList onPressItem={onSelectCard} cards={cards} />
            <SecureViewer
                {...selectedCard}
                visible={selectedCard.visible}
                hmacSignature={selectedCard.hmacSignature}
                onPresented={({nativeEvent}) => console.log('presented', nativeEvent)}
                onClosed={({nativeEvent}) => {
                    onCloseModal()
                }}
                onTimeout={({nativeEvent}) => {
                    onCloseModal()
                }}
                onError={({nativeEvent}) => {
                    handleError(nativeEvent)
                }}
            />
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingHorizontal: 25,
        paddingTop: 65,
    }
})