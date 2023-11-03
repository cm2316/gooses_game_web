import { AppItem } from '@/services/apps/types/AppItem';
import store from 'store';

const key = 'History_Player_Game';

export const getStore = (): AppItem[] => {
  return store.get(key, []);
};

export const addStore = (value: AppItem) => {
  const apps: AppItem[] = getStore();
  const index = apps.findIndex((app) => app.id === value.id);
  if (index > -1) {
    apps.splice(index, 1);
  }
  apps.unshift(value);
  store.set(key, apps);
};

export const removeStore = (index: number) => {
  const apps: AppItem[] = getStore();
  apps.splice(index, 1);
  store.set(key, apps);
};
