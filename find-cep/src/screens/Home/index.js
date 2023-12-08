import React, { useEffect, useState } from 'react';
import { Alert, Image } from 'react-native';
import {
    Container,
    Animation,
    Input,
    Button,
    ButtonText,
    AddressArea,
    Text
} from './styles';
import logo from '../../assets/logo.png';
import api from '../../services/api';
import MapView, { Marker } from 'react-native-maps';
import * as Location from 'expo-location';


export default function Home() {
    const [cep, setCep] = useState('');
    const [address, setAddress] = useState(null);
    const [initialRegion, setInitialRegion] = useState(null);

    async function handleBuscar() {
        try {
            const { status, data } = await api.get(`${cep}/json/`);

            if (status != 200 || data.erro) {
                Alert.alert('Buscar', 'Digite um CEP válido.');
            } else {
                setAddress(data);
            }

        } catch (error) {
            Alert.alert('Buscar', 'Digite um CEP válido');
        }
    };

    async function handleLimpar() {
        setAddress(null);
        setCep('');
    }

    useEffect(() => {
        const requestLocationPermission = async () => {
            try {
                const { status } = await Location.requestForegroundPermissionsAsync();

                if (status === 'granted') {
                    const location = await Location.getCurrentPositionAsync({});
                    const { latitude, longitude } = location.coords;

                    setInitialRegion({
                        latitude,
                        longitude,
                        latitudeDelta: 0.0922,
                        longitudeDelta: 0.0421,
                    });
                } else {
                    console.log('Permissão de localização negada');
                }
            } catch (error) {
                console.warn(error);
            }
        };

        requestLocationPermission();
    }, []);


    return (
        <Container>
            <Animation
                animation='bounceInDown'
                delay={100}
                duration={1500}
            >
                <Image source={logo} />
            </Animation>

            <Animation
                animation='bounceInRight'
                delay={100}
                duration={1500}
            >
                {!address &&
                    <Input
                        keyboardType="numeric"
                        maxLength={8}
                        onChangeText={setCep}
                        onSubmitEditing={handleBuscar}
                        placeholder="Digite o CEP que deseja buscar"
                        placeholderTextColor="#2F48D4"
                        value={cep}
                    />
                }

                <Button
                    activeOpacity={0.8}
                    onPress={address ? handleLimpar : handleBuscar}>
                    <ButtonText>
                        {address ? 'Limpar' : 'Buscar'}
                    </ButtonText>
                </Button>
            </Animation>


            {address &&
                <AddressArea>
                    <Text>CEP: {cep}</Text>
                    <Text>{address.logradouro}</Text>
                    <Text>Bairro: {address.bairro}</Text>
                    <Text>Cidade: {address.localidade}</Text>
                    <Text>IBGE: {address.ibge}</Text>
                    <Text>DDD: {address.ddd}</Text>
                    <Text>UF: {address.uf}</Text>

                </AddressArea>

            }
            {address && initialRegion && initialRegion.latitudeDelta !== 0 && initialRegion.longitudeDelta !== 0 && (
                <MapView
                    style={{ width: '80%', height: '25%'}}
                    initialRegion={initialRegion}
                    showsUserLocation={true}
                    followsUserLocation={true}
                >
                    <Marker coordinate={initialRegion} title="Você está aqui" />
                </MapView>
            )
            }
        </Container>
    );
}