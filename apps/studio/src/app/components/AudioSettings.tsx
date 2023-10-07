import { Select } from 'antd';
import { useEffect, useState } from 'react';
import {
  getAudioInputDevices,
  getAudioOutputDevices,
} from '../utils/media-devices.util';
import { mapToSelectOptions } from '../utils/select.util';

export function AudioSettings() {
  const [audioInputDevices, setAudioInputDevices] = useState<
    {
      label: MediaDeviceInfo[keyof MediaDeviceInfo];
      value: MediaDeviceInfo[keyof MediaDeviceInfo];
    }[]
  >([]);
  const [audioOutputDevices, setAudioOutputDevices] = useState<
    {
      label: MediaDeviceInfo[keyof MediaDeviceInfo];
      value: MediaDeviceInfo[keyof MediaDeviceInfo];
    }[]
  >([]);

  useEffect(() => {
    getDevices();
  }, []);

  async function getDevices() {
    setAudioInputDevices(
      mapToSelectOptions(await getAudioInputDevices(), 'label', 'deviceId')
    );
    setAudioOutputDevices(
      mapToSelectOptions(await getAudioOutputDevices(), 'label', 'deviceId')
    );
  }

  return (
    <section className="flex flex-col gap-6">
      <label>
        <span className="inline-block mb-2">Microphone</span>
        <Select className={'w-full'} options={audioInputDevices} />
      </label>
      <label>
        <span className="inline-block mb-2">Speakers</span>
        <Select className={'w-full'} options={audioOutputDevices} />
      </label>
    </section>
  );
}
