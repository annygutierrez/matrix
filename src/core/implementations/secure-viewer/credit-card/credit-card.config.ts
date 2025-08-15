import { ViewProps } from 'react-native';
import type {DirectEventHandler, Double, Int32} from 'react-native/Libraries/Types/CodegenTypes';

export interface CreditCard extends ViewProps {
    visible: boolean;
    cardId: string;
    cardNumber: string;
    cvv: string;
    expiryMonth: Int32;
    expiryYear: Int32;
    cardholder: string;
    sessionToken: string;
    tokenExpiresAt: Double;
    hmacKey: string;
    hmacSignature: string;
    onPresented?: DirectEventHandler<Readonly<{cardId: string}>>;
    onClosed?: DirectEventHandler<Readonly<{cardId: string; reason?: string}>>;
    onTimeout?: DirectEventHandler<Readonly<{cardId: string}>>;
    onError?: DirectEventHandler<Readonly<{cardId: string; code: string; message: string}>>;
  }