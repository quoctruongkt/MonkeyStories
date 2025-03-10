import React, {useEffect, useMemo} from 'react';
import {Modal, View} from 'react-native';
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from 'react-native-reanimated';

import {styles} from './Modals.style';

import {ModalComponents} from '@/constants';
import {useModal} from '@/store';

type TModalsProps = {};

/**
 * Component duy nhất hiện các modal
 */
export const Modals: React.FC<TModalsProps> = () => {
  const {modals, currentModal} = useModal();
  const opacity = useSharedValue(0);
  const scale = useSharedValue(0);

  const animatedStyle = useAnimatedStyle(() => {
    return {
      opacity: opacity.value,
      transform: [{scale: scale.value}],
    };
  });

  const isVisible = useMemo(() => modals.length > 0, [modals]);

  const ModalComponent = useMemo(() => {
    const modalInfo = modals.find(modal => modal.id === currentModal);

    if (!modalInfo) {
      return null;
    }

    const Component = ModalComponents[modalInfo?.name];
    return Component ? (
      <Component {...modalInfo.props} id={modalInfo?.id} />
    ) : null;
  }, [currentModal, modals]);

  useEffect(() => {
    opacity.value = withTiming(0, {duration: 150}, () => {
      opacity.value = withTiming(1, {duration: 200});
      scale.value = withTiming(1, {duration: 200});
    });
  }, [currentModal]);

  return (
    <Modal visible={isVisible} backdropColor={'transparent'}>
      <View style={styles.modal}>
        <Animated.View style={animatedStyle}>{ModalComponent}</Animated.View>
      </View>
    </Modal>
  );
};
