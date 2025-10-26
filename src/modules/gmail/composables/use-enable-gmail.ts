import { useStorage } from '@/shared/composables/use-storage';

export const GMAIL_PLUGIN_ON = 'gmail-plugin-on';

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
