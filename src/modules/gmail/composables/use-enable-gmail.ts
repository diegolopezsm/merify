import { GMAIL_PLUGIN_ON } from '@/modules/gmail/domain/constants';
import { useStorage } from '@/shared/composables/use-storage';

export const useEnableGmail = () => {
  const isGmailEnable = useStorage(GMAIL_PLUGIN_ON, false);
  const setIsGmailEnable = (value: boolean) => {
    isGmailEnable.value = value;
  };
  return {
    isGmailEnable,
    setIsGmailEnable,
  };
};
