import * as React from "react";
import { GooglePlacesAutocomplete, GooglePlacesAutocompleteProps, GooglePlacesAutocompleteRef } from "react-native-google-places-autocomplete";

export const SearchAddress = React.forwardRef<GooglePlacesAutocompleteRef, Partial<GooglePlacesAutocompleteProps>>(
    (props, ref) => {
        return (
            <GooglePlacesAutocomplete
                ref={ref}
                placeholder='Seu endereço aqui'
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
                styles={{
                    container: {
                        flex: 0,
                        width: '100%',
                        marginTop: 20,
                        zIndex: 1,
                    },
                    textInputContainer: {
                        backgroundColor: "transparent",
                        height: 54,
                        marginHorizontal: 20,
                        borderTopWidth: 0,
                        borderBottomWidth: 0,
                        marginBottom: 0,
                    },
                    textInput: {
                        height: 54,
                        margin: 0,
                        borderRadius: 20,
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