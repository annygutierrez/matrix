export const defaultCardValues = {
    bankLogo: '',
    sponsorLogo: '',
    cardNumber: '',
    expirationDate: '',
    cardId: '0',
    gradient: ['', '', ''],
    hmacSignature: '',
    cvv: '0',
    expiryMonth: 0,
    expiryYear: 0,
    cardholder: '',
    sessionToken: 'tok_abc',
    tokenExpiresAt: 0,
    hmacKey: '',
    cardNumberRaw: ''
}

export type SecureCardError = {
    message: string;
    code: string;
    cardId: string;
    target: number;
}
