import { CreditCardImpl } from './credit-card/credit-card.impl';
import { SecureViewer, SecureViewerEnum } from './secure-viewer.interface';

const SecureViewerMap: Record<SecureViewerEnum, SecureViewer> = {
  [SecureViewerEnum.CREDIT_CARD]: CreditCardImpl
};

export const SecureViewerFactory = {
  getLibrary(type = SecureViewerEnum.CREDIT_CARD): SecureViewer {
    const library = SecureViewerMap[type];
    if (!library) {
      throw new Error(`No secure-viewer library found for type: ${type}`);
    }
    return library;
  }
};
