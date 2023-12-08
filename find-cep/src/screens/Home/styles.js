import styled from 'styled-components/native';
import * as Animatable from 'react-native-animatable';

export const Container = styled.View`
    align-items: center;
    background-color: white;
    flex: 1;
    padding: 20px;
`;

export const Animation = styled(Animatable.View)`
    align-items: center;
    width: 100%;
`;

export const Input = styled.TextInput`
    background-color: #C2D9CD;
    border-radius: 5px;
    color: #FFF;
    font-size: 16px;
    margin-top: 20px;
    padding: 8px 16px;
    width: 100%;
`;

export const Button = styled.TouchableOpacity`
    align-items: center;
    background-color: #404B45;
    border-radius: 5px;
    margin-top: 20px;
    padding: 8px;
    width: 100%;
`;

export const ButtonText = styled.Text`
    font-size: 18px;
    font-weight: bold;
    color: white;
    text-transform: uppercase;
`;

export const AddressArea = styled.View`
    align-items: center;
    margin-top: 15px;
    background-color: #404B45;
    width: 80%;
    border-radius: 10px;
`;

export const Text = styled.Text`
    font-size: 18px;
    color: white
`;