import React, {
  createContext,
  Dispatch,
  PropsWithChildren,
  SetStateAction,
  useContext,
  useState,
} from 'react';
import { SettingsOverlay } from '../components/SettingsOverlay';

interface Settings {
  audio: {
    microphone: {
      source: MediaSource | null;
    };
    speaker: {
      source: MediaSource | null;
    };
  };
  camera: {
    source: MediaSource | null;
  };
}

const initialState: Settings = {
  audio: {
    microphone: {
      source: null,
    },
    speaker: {
      source: null,
    },
  },
  camera: {
    source: null,
  },
};

type SettingsContextType = {
  isOpen: boolean;
  closeSettings: () => void;
  settings: Settings;
  updateSettings: Dispatch<SetStateAction<Settings>>;
  openSettings: () => void;
};

export const SettingsContext = createContext<SettingsContextType>(
  null as unknown as SettingsContextType
);

export function SettingsProvider({ children }: PropsWithChildren) {
  const [settings, updateSettings] = useState(initialState);
  const [isOpen, setIsOpen] = useState(false);

  function openSettings() {
    setIsOpen(true);
  }

  function closeSettings() {
    setIsOpen(false);
  }

  return (
    <SettingsContext.Provider
      value={{ isOpen, closeSettings, settings, updateSettings, openSettings }}
    >
      {children}
      <SettingsOverlay />
    </SettingsContext.Provider>
  );
}
