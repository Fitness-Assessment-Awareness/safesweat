import { fireEvent, render } from '@testing-library/react-native';
import { TamaguiProvider } from 'tamagui';
import appConfig from '../../../tamagui.config';
import { SearchBar } from '../SearchBar';

const PLACEHOLDER = 'Search';
const SEARCH_TEXT = 'Test search';

describe('<SearchBar />', () => {
    it('displays the placeholder text', () => {
        const { getByPlaceholderText } = render(
            <TamaguiProvider
                defaultTheme="light"
                config={appConfig}
            >
                <SearchBar
                    searchText=""
                    onChangeText={() => {}}
                    inputPlaceholder={PLACEHOLDER}
                />
                ,
            </TamaguiProvider>,
        );

        expect(getByPlaceholderText(PLACEHOLDER)).toBeTruthy();
    });

    it('displays the search text', () => {
        const { getByDisplayValue } = render(
            <TamaguiProvider
                defaultTheme="light"
                config={appConfig}
            >
                <SearchBar
                    searchText={SEARCH_TEXT}
                    onChangeText={() => {}}
                    inputPlaceholder={PLACEHOLDER}
                />
                ,
            </TamaguiProvider>,
        );
        expect(getByDisplayValue(SEARCH_TEXT)).toBeTruthy();
    });

    it('calls onChangeText when text is changed', () => {
        const onChangeTextMock = jest.fn();
        const { getByPlaceholderText } = render(
            <TamaguiProvider
                defaultTheme="light"
                config={appConfig}
            >
                <SearchBar
                    searchText=""
                    onChangeText={onChangeTextMock}
                    inputPlaceholder={PLACEHOLDER}
                />
            </TamaguiProvider>,
        );
        fireEvent.changeText(getByPlaceholderText(PLACEHOLDER), SEARCH_TEXT);
        expect(onChangeTextMock).toHaveBeenCalledWith(SEARCH_TEXT);
    });

    it('clears the search text when X button is pressed', () => {
        const onChangeTextMock = jest.fn();
        const { getByRole } = render(
            <TamaguiProvider
                defaultTheme="light"
                config={appConfig}
            >
                <SearchBar
                    searchText={SEARCH_TEXT}
                    onChangeText={onChangeTextMock}
                    inputPlaceholder={PLACEHOLDER}
                />
            </TamaguiProvider>,
        );
        fireEvent.press(getByRole('button'));
        expect(onChangeTextMock).toHaveBeenCalledWith('');
    });

    it('displays the Search icon when search text is empty', () => {
        const { getByLabelText } = render(
            <TamaguiProvider
                defaultTheme="light"
                config={appConfig}
            >
                <SearchBar
                    searchText=""
                    onChangeText={() => {}}
                    inputPlaceholder={PLACEHOLDER}
                />
            </TamaguiProvider>,
        );
        expect(getByLabelText('search icon')).toBeTruthy();
    });
});
