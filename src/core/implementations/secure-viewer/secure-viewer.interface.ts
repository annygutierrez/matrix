import { CardValidationModalProps } from '../../../../libs/card-secure-modal/CardSecureModal';

export enum SecureViewerEnum {
    CREDIT_CARD = 'credit-card',
}

export interface SecureViewer  {
    SecureViewer: (props: CardValidationModalProps) => React.JSX.Element
}