import React from 'react';

export type Card = {
    bankLogo: string;
    sponsorLogo: string;
    cardNumber: string;
    expirationDate: string;
    cardId: string;
    gradient: string[];
    visible: boolean;
    hmacSignature: string;
    cvv: string;
    expiryMonth: number;
    expiryYear: number;
    cardholder: string;
    sessionToken: string;
    tokenExpiresAt: number;
    hmacKey: string;
}

export const cardsDefaultValues = [
    {
        bankLogo: 'https://www.io.pe/images/logo-io-oscuro.png',
        sponsorLogo: 'https://www.bcp.com.bo/ProgramaTravel/Content/Images/logo_white.png',
        cardNumber: '**** **** **** 3890',
        expirationDate: '**/****',
        cardId: '12345',
        gradient: ['#52566A', '#41434D', '#313131'],
        hmacSignature: '',
        cvv: '123',
        expiryMonth: 5,
        expiryYear: 2030,
        cardholder: 'Anny Gutierrez',
        sessionToken: 'tok_abc',
        tokenExpiresAt: 0,
        hmacKey: 'secret',
        visible: false
    },
    {
        bankLogo: 'https://muevete.falabella.com/static/media/banco-falabella.4b58696271d1d19083c0.png',
        sponsorLogo: 'https://upload.wikimedia.org/wikipedia/commons/thumb/2/2a/Mastercard-logo.svg/2560px-Mastercard-logo.svg.png',
        cardNumber: '**** **** **** 1287',
        expirationDate: '**/****',
        cardId: '12346',
        gradient: ['#008042', '#0B846E', '#168798'],
        hmacSignature: '',
        cvv: '456',
        expiryMonth: 2,
        expiryYear: 2022,
        cardholder: 'Anny Gutierrez',
        sessionToken: 'tok_abc',
        tokenExpiresAt: 0,
        hmacKey: 'secret',
        visible: false
    }
]

export interface CardsContextProps {
    cards: Card[];
    setCards: React.Dispatch<
    React.SetStateAction<Card[]>
  >;
}
