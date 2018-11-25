import { FLASH_MESSAGE } from './types';

export const sendFlashMessage = (isOpen, message, variant, className) => {
  return {
    type: FLASH_MESSAGE,
    payload: {
      isOpen,
      message,
      variant,
      className
    }
  }
};

export const closeFlashMessage = () => {
  return {
    type: FLASH_MESSAGE,
    payload: {isOpen: false}
  }
};
