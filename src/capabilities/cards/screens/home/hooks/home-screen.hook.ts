import { useState } from "react";
import { SecureViewerFactory } from "../../../../../core/implementations/secure-viewer/secure-viewer.factory";
import { useSessionContext } from "../../../../auth/providers/session/hooks";
import { useCardsContext } from "../../../providers/cards/hooks";
import { Card } from "../../../providers";
import encHex from 'crypto-js/enc-hex';
import { defaultCardValues } from "../utils/home.config";
import { HmacSHA256 } from "crypto-js";

export const useHomeScreen = () => {
  const [visible, setVisible] = useState(false);
  const [selectedCard, setSelectedCard] = useState<Card>({ visible: false });
  const { userProfile } = useSessionContext();
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
        onCloseModal
    }
}