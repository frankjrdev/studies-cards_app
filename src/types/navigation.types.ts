import { NavigatorScreenParams } from '@react-navigation/native';

export type StudyScreenParams = {
  startSession?: boolean;
};

export type TabParamList = {
  Home: undefined;
  Study: StudyScreenParams | undefined;
  Settings: undefined;
};

export type RootStackParamList = {
  Main: NavigatorScreenParams<TabParamList>;
};
