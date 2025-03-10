import {create} from 'zustand';

import {EModalNames, ModalComponents} from '@/constants';

interface IModalItem {
  id: string;
  name: EModalNames;
  props: any;
}
interface IModals {
  modals: IModalItem[];
  showModal: <T extends EModalNames>(
    name: T,
    props: Parameters<(typeof ModalComponents)[T]>[0],
  ) => string;
  hideModal: (id: string) => void;
  currentModal: string | null;
}

export const useModal = create<IModals>((set, get) => ({
  modals: [],
  currentModal: null,
  showModal: (name, props) => {
    const id = Date.now().toString();
    set({modals: [...get().modals, {id, name, props}], currentModal: id});
    return id;
  },
  hideModal: id => {
    const lastModal = get().modals[get().modals.length - 2];

    set({
      modals: get().modals.filter(modal => modal.id !== id),
      currentModal: lastModal?.id ?? null,
    });
  },
}));
