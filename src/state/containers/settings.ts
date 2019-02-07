import { state } from "../state";
import { timestampToDateInputValue } from "../../shared/time";

type View =
  | "CLOCK"
  // | "CALENDAR"
  // | "YEAR_PROGRESS"
  | "AGE"
  | "NOTHING";

const initialDateOfBirth = Date.UTC(1990, 0, 1);

export const settings = {
  //
  // State
  //

  opened: false,
  selectedView: "CLOCK" as View,
  clockShowSeconds: false,
  ageDateOfBirthTimestamp: initialDateOfBirth,
  ageDateOfBirthInputValue: timestampToDateInputValue(initialDateOfBirth),
  settingsHidden: false,
  scheduledAppReset: false,

  //
  // Actions
  //

  toggleOpenedState(): void {
    state.settings.opened = !state.settings.opened;
  },

  setSelectedView(selectedView: View): void {
    state.settings.selectedView = selectedView;
  },

  toggleClockShowSeconds(): void {
    state.settings.clockShowSeconds = !state.settings.clockShowSeconds;
  },

  setAgeDateOfBirth({
    ageDateOfBirthTimestamp,
    ageDateOfBirthInputValue
  }: {
    ageDateOfBirthTimestamp: number | null;
    ageDateOfBirthInputValue: string;
  }): void {
    state.settings.ageDateOfBirthInputValue = ageDateOfBirthInputValue;
    if (ageDateOfBirthTimestamp) {
      state.settings.ageDateOfBirthTimestamp = ageDateOfBirthTimestamp;
    }
  },

  toggleSettingsHidden(): void {
    state.settings.settingsHidden = !state.settings.settingsHidden;
  },

  resetAppState(): void {
    state.settings.scheduledAppReset = true;
    state.storage.clear();
    window.location.reload();
  }
};
