import * as React from "react";
import { StyleSheet, TouchableOpacity, View, ViewStyle } from "react-native";
import { GooglePlacesAutocomplete, GooglePlacesAutocompleteProps, GooglePlacesAutocompleteRef } from "react-native-google-places-autocomplete";

interface SearchAddressProps extends Partial<GooglePlacesAutocompleteProps> {
    icon?: React.ReactNode;
    iconStyles?: React.CSSProperties;
}

export const SearchAddress = React.forwardRef<GooglePlacesAutocompleteRef, SearchAddressProps>(
    ({ icon, iconStyles, ...props }, ref) => {
        const googlePlacesRef = React.useRef<GooglePlacesAutocompleteRef | null>(null);

        const renderedIcon = React.isValidElement(icon)
            ? React.cloneElement(icon, { style: [styles.icon, iconStyles] } as React.CSSProperties)
            : null;

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
                predefinedPlaces={[]}
                textInputProps={{
                    autoCapitalize: "none",
                    autoCorrect: false
                }}
                fetchDetails
                enablePoweredByContainer={false}
                onFail={(error) => console.error(error)}
                onTimeout={() => console.error("TIMEOUT")}
                onNotFound={() => console.warn("NOT FOUND SIMILAR ADDRESS")}
                keyboardShouldPersistTaps="handled"
                styles={true ? {
                    container: {
                        flex: 0,
                        zIndex: 1,
                        width: "100%",
                    },
                    textInputContainer: {
                        backgroundColor: "#fff",
                        height: 54,
                        elevation: 5,
                        borderTopWidth: 0,
                        borderBottomWidth: 0,
                        marginBottom: 0,
                        borderWidth: 1,
                        borderRadius: 15,
                        shadowRadius: 15,
                        shadowColor: "#000",
                        shadowOpacity: 0.1,
                        shadowOffset: { width: 1, height: 1 },
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
                        fontSize: 17,
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
                } : {
                    container: {
                        flex: 0,
                        width: "100%",
                        zIndex: 1,
                        // borderWidth: 1,
                    },
                    textInputContainer: {
                        backgroundColor: "transparent",
                        height: 54,
                        borderTopWidth: 0,
                        borderBottomWidth: 0,
                        marginBottom: 0,
                    },
                    textInput: {
                        height: 54,
                        margin: 0,
                        borderRadius: 15,
                        paddingTop: 0,
                        paddingBottom: 0,
                        paddingLeft: 20,
                        paddingRight: 20,
                        marginTop: 0,
                        marginLeft: 0,
                        marginRight: 0,
                        elevation: 5,
                        shadowColor: "#000",
                        shadowOpacity: 0.1,
                        shadowOffset: { width: 0, height: 0 },
                        shadowRadius: 15,
                        borderWidth: 1,
                        borderColor: "#DDD",
                        fontSize: 17
                    },
                    listView: {
                        position: "absolute",
                        top: 54,
                        borderWidth: 1,
                        borderColor: "#DDD",
                        backgroundColor: "#FFF",
                        marginHorizontal: 20,
                        elevation: 5,
                        shadowColor: "#000",
                        shadowOpacity: 0.1,
                        shadowOffset: { x: 0, y: 0 },
                        shadowRadius: 15,
                        marginTop: 10,
                        keyboardShouldPersistTaps: "handled",
                    }
                }}
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