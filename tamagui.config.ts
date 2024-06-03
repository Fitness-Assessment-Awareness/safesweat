import { config } from '@tamagui/config';
import { createTamagui } from 'tamagui';

const appConfig = createTamagui(config);

export type AppConfig = typeof appConfig;

declare module 'tamagui' {
    interface TamaguiCustomConfig extends AppConfig {}
}

// eslint-disable-next-line import/no-default-export
export default appConfig;
