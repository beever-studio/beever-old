import { useEffect, useState } from 'react';
import { mapToSelectOptions } from '../utils/select.util';
import { getVideoDevices } from '../utils/media-devices.util';
import { Select } from 'antd';

export function CameraSettings() {
  const [videoInputDevices, setVideoInputDevices] = useState<
    {
      label: MediaDeviceInfo[keyof MediaDeviceInfo];
      value: MediaDeviceInfo[keyof MediaDeviceInfo];
    }[]
  >([]);

  useEffect(() => {
    getDevices();
  }, []);

  async function getDevices() {
    setVideoInputDevices(
      mapToSelectOptions(await getVideoDevices(), 'label', 'deviceId')
    );
  }

  return (
    <section className="flex flex-col gap-6">
      <label>
        <span className="inline-block mb-2">Camera</span>
        <Select className={'w-full'} options={videoInputDevices} />
      </label>
    </section>
  );
}
