import { useStorage } from '@/shared/composables/use-storage';
import { PRIMARY_EMAIL_ADDRESSES } from '@/modules/gmail/domain/constants';

export const usePriorityEmailsStore = () => {
  const PRIMARY_EMAILS_KEY = 'primary-emails';
  const CUSTOM_EMAILS_KEY = 'custom-emails';
  window.localStorage.setItem(
    PRIMARY_EMAILS_KEY,
    JSON.stringify(PRIMARY_EMAIL_ADDRESSES)
  );
  const primaryEmails = useStorage(PRIMARY_EMAILS_KEY, PRIMARY_EMAIL_ADDRESSES);
  const customEmails = useStorage<string[]>(CUSTOM_EMAILS_KEY, []);

  const addCustomEmail = (email: string) => {
    if (customEmails.value.includes(email.toLowerCase().trim())) {
      return;
    }
    customEmails.value = [...customEmails.value, email];
  };

  const removeCustomEmail = (email: string) => {
    if (!customEmails.value.includes(email.toLowerCase().trim())) {
      return;
    }
    customEmails.value = customEmails.value.filter(e => e !== email);
  };

  return {
    primaryEmails,
    customEmails,
    addCustomEmail,
    removeCustomEmail,
  };
};
