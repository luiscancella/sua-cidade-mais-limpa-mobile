import * as React from "react";
import { StyleSheet } from "react-native";
import { GooglePlaceData, GooglePlaceDetail, GooglePlacesAutocomplete, GooglePlacesAutocompleteProps, GooglePlacesAutocompleteRef } from "react-native-google-places-autocomplete";
import { UserLocation } from "src/types";
import UserMapper from "src/mapper/UserMapper";
import { useModal } from "src/hooks/useModal";

interface SearchAddressProps extends Partial<GooglePlacesAutocompleteProps> {
    icon?: React.ReactNode;
    iconStyles?: React.CSSProperties;
    onLocationSelected?: (location: UserLocation) => void;
    onError?: (message: string) => void;
}

export const GoogleAutocompleteInput = React.forwardRef<GooglePlacesAutocompleteRef, SearchAddressProps>(
    ({ icon, iconStyles, styles: propsStyle = {}, onLocationSelected, onError, ...props }, ref) => {
        const [searchFocused, setSearchFocused] = React.useState(false);
        const { showConfirmation } = useModal();

        function handleLocationPress(data: GooglePlaceData, details: GooglePlaceDetail | null) {
            const userLocation = UserMapper.fromGoogleAutocomplete(data, details);

            if (!userLocation) {
                console.error("Erro ao mapear localização do autocomplete");
                onError?.("Não foi possível processar o endereço selecionado");
                return;
            }

            showConfirmation(
                "Confirmação",
                "Deseja alterar seu endereço para o endereço selecionado?",
                userLocation.short_address,
                () => onLocationSelected?.(userLocation),
                () => { 
                    if (ref && typeof ref !== 'function' && ref.current) {
                        ref.current.setAddressText('');
                    }
                }
            );
        };


        const renderedIcon = React.isValidElement(icon)
            ? React.cloneElement(icon, { style: [styles.icon, iconStyles] } as React.CSSProperties)
            : null;

        const defaultStyles = {
            container: {
                flex: 0,
                zIndex: 1,
            },
            textInputContainer: {
                backgroundColor: "#fff",
                height: 54,
                borderWidth: 1,
                borderRadius: 15,
                borderColor: "#DDD",
            },
            textInput: {
                backgroundColor: "transparent",
                height: "100%",
                marginVertical: "auto",
                paddingTop: 0,
                paddingBottom: 0,
                paddingLeft: 8,
                paddingRight: 8,
                marginTop: 0,
                marginLeft: 0,
                marginRight: 0,
                fontSize: 16,
            },
            listView: {
                position: "absolute",
                top: 54,
                backgroundColor: "#FFF",
                borderWidth: 1,
                borderColor: "#DDD",
                marginHorizontal: 20,
                elevation: 5,
                shadowColor: "#000",
                shadowOpacity: 0.1,
                shadowOffset: { x: 0, y: 0 },
                shadowRadius: 15,
                marginTop: 10,
                keyboardShouldPersistTaps: "handled",
            }
        };

        function mergeStyles(defaults: Record<string, any>, overrides: Record<string, any>) {
            const merged: Record<string, any> = { ...defaults };
            for (const key in overrides) {
                merged[key] = { ...(defaults[key] || {}), ...overrides[key] };
            }
            return merged;
        }

        const mergedStyles = mergeStyles(defaultStyles, propsStyle);

        return (
            <GooglePlacesAutocomplete
                ref={ref}
                placeholder='Buscar Endereço'
                renderLeftButton={() => renderedIcon}
                query={{
                    key: 'AIzaSyC06VItPhore2tT6caeS9djCD6iCuPEfFE',
                    language: 'pt',
                    components: 'country:br',
                    types: 'address',
                }}
                enableHighAccuracyLocation
                filterReverseGeocodingByTypes={['street_address']}
                minLength={4}
                debounce={200}
                timeout={20000}
                fetchDetails
                predefinedPlaces={[]}
                textInputProps={{
                    onFocus: () => setSearchFocused(true),
                    onBlur: () => setSearchFocused(false),
                    autoCapitalize: "none",
                    autoCorrect: false
                }}
                listViewDisplayed={searchFocused}
                enablePoweredByContainer={false}
                onFail={(error) => console.error(error)}
                onTimeout={() => console.error("TIMEOUT")}
                onNotFound={() => console.warn("NOT FOUND SIMILAR ADDRESS")}
                onPress={handleLocationPress}
                keyboardShouldPersistTaps="handled"
                styles={mergedStyles}
                {...props}
            />
        );
    }
);

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    icon: {
        marginVertical: "auto",
        marginLeft: 10,
    }
});