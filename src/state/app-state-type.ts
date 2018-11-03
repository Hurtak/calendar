import * as types from "../shared/types";
import { HttpData } from "../shared/api";

export default interface IAppStateProps {
  state: {
    // Browser state
    online: boolean;

    // Menu states
    menuOpened: boolean;

    // Background image
    imageLocalIndex: number;
    imageBing: HttpData<{
      url: string;
      title?: string;
      link?: string;
      description: string;
    }>;
    imageBingFetching: boolean;

    // App settings
    selectedView: types.View;
    imageSource: types.ImageSource;
    clockShowSeconds: boolean;
    ageDateOfBirthTimestamp: number;
    ageDateOfBirthValue: string;
    settingsHidden: boolean;
  };

  computed: any;
  initImage: any;
  setAgeDateOfBirth: any;
  setViewType: any;
  setImageSource: any;
  shiftImageLocalIndex: any;
  setImageLocalRandom: any;
  toggleMenu: any;
  toggleSettingsHidden: any;
  resetAppState: any;
  toggleClockShowSeconds: any;
}
