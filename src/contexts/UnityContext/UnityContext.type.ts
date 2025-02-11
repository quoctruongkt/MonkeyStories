export type TUnityContext = {
  isUnityVisible: boolean;
  showUnity: () => void;
  hideUnity: () => void;
};

export type TUnityProvider = {
  children: React.ReactNode;
};
