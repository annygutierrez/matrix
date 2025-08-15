import React from 'react';
import type {NativeProps} from '../../specs/CardValidationModalNativeComponent';
import CardValidationModalNative from '../../specs/CardValidationModalNativeComponent';

export type CardValidationModalProps = NativeProps;

export default function CardSecureModal(props: CardValidationModalProps) {
  return <CardValidationModalNative {...props} />;
}
