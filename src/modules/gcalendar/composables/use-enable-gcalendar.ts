import { useStorage } from '@/shared/composables/use-storage';

export const GCALENDAR_PLUGIN_ON = 'gcalendar-plugin-on';

export const useEnableGcalendar = () => {
  const isGcalendarEnable = useStorage(GCALENDAR_PLUGIN_ON, false);
  const setIsGcalendarEnable = (value: boolean) => {
    isGcalendarEnable.value = value;
  };
  return {
    isGcalendarEnable,
    setIsGcalendarEnable,
  };
};
