import { config } from '@tamagui/config';
import { createTamagui } from 'tamagui';

export const appConfig = createTamagui(config);

export type AppConfig = typeof appConfig;

declare module 'tamagui' {
    interface TamaguiCustomConfig extends AppConfig {}
}
