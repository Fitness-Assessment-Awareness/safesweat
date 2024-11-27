import type { IconProps } from '@tamagui/helpers-icon';
import { ReactElement } from 'react';

export type SortOption = {
    key: string;
    name: string;
    orderBy: 'asc' | 'desc';
    icon: ReactElement<IconProps>;
    sort: (a: any, b: any) => number;
};
