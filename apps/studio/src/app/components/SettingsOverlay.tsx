import {
  Dispatch,
  SetStateAction,
  useContext,
  useEffect,
  useState,
} from 'react';
import { SettingsContext } from '../context/settings.context';
import {
  getAudioInputDevices,
  getAudioOutputDevices,
  getVideoDevices,
} from '../utils/media-devices.util';
import { Divider, Modal, Tabs, TabsProps } from 'antd';
import { AudioSettings } from './AudioSettings';
import { CameraSettings } from './CameraSettings';

interface SettingsOverlayProps {
  isOpen: boolean;
  setIsOpen: Dispatch<SetStateAction<boolean>>;
  mediaSource: MediaSource | null;
  setMediaSource: Dispatch<SetStateAction<MediaSource | null>>;
}

export function SettingsOverlay() {
  const { isOpen, closeSettings } = useContext(SettingsContext);
  const [videoInputDevices, setVideoInputDevices] = useState<MediaDeviceInfo[]>(
    []
  );

  useEffect(() => {
    getDevices();
  }, []);

  async function getDevices() {
    setVideoInputDevices(await getVideoDevices());
  }

  const items: TabsProps['items'] = [
    {
      key: '1',
      label: 'General',
      children: '',
    },
    {
      key: '2',
      label: 'Camera',
      children: <CameraSettings />,
    },
    {
      key: '3',
      label: 'Audio',
      children: <AudioSettings />,
    },
  ];
  return (
    <Modal
        title="Settings"
        open={isOpen}
        onOk={closeSettings}
        onCancel={closeSettings}
      >
        <Divider />
        <Tabs defaultActiveKey="1" tabPosition="left" items={items}></Tabs>
      </Modal>
  );
}
