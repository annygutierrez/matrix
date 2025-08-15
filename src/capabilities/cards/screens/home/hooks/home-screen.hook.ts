import { useState } from 'react';
import { SecureViewerFactory } from '../../../../../core/implementations/secure-viewer/secure-viewer.factory';
import { useSessionContext } from '../../../../auth/providers/session/hooks';
import { useCardsContext } from '../../../providers/cards/hooks';
import { Card } from '../../../providers';
import encHex from 'crypto-js/enc-hex';
import { defaultCardValues, SecureCardError } from '../utils/home.config';
import { HmacSHA256 } from 'crypto-js';
import { useToastContext } from '../../../../../shared/providers/ToastProvider/hooks';

export const useHomeScreen = () => {
  const [visible, setVisible] = useState(false);
  const [selectedCard, setSelectedCard] = useState<Card>({ visible: false });
  const { userProfile } = useSessionContext();
  const toast = useToastContext();
  const { cards } = useCardsContext();
  const { SecureViewer } = SecureViewerFactory.getLibrary();
  const tokenExpiresAt = Date.now() + 5 * 60_000;

  const onSelectCard = (card: Card) => {
    const secret = `${card.cardNumber}|${card.cvv}|${card.expiryMonth}|${card.expiryYear}|${card.sessionToken}`;
    const signature = HmacSHA256(secret, card.hmacKey).toString(encHex);
    setSelectedCard({
      ...card,
      tokenExpiresAt,
      hmacSignature: signature,
      visible: true
    });
  }

  const onCloseModal = () => {
    setSelectedCard({ ...defaultCardValues, visible: false });
  }

  const handleError = (nativeEvent: SecureCardError) => {
    onCloseModal();
    toast.show('Hubo un error: ' + nativeEvent.message)
  }

    return {
        userProfile,
        cards,
        numberOfCards: Number(cards?.length),
        SecureViewer,
        setVisible,
        visible,
        setSelectedCard,
        selectedCard,
        onSelectCard,
        onCloseModal,
        handleError
    }
}