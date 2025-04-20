import React, { useState } from 'react';
import { Text, View, ImageBackground, Image, ActivityIndicator, StyleSheet } from 'react-native';
import { FontSizes } from '../styles/FontSizes';
import { useNavigation } from '@react-navigation/native';
import { CustomTextInput } from '../components/CustomTextInput';
import { Button } from '../components/Button';
import { login } from '../services/auth'; 
import { RootStackParamList } from '../utils/types'; 
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import axios from 'axios';

type SignInScreenNavigationProp = NativeStackNavigationProp<RootStackParamList, 'SignInScreen'>;

export default function SignInScreen() {
    const navigation = useNavigation<SignInScreenNavigationProp>();
    const [email, setEmail] = useState('eve.holt@reqres.in'); 
    const [password, setPassword] = useState('cityslicka'); 
    const [showPassword, setShowPassword] = useState(false);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const handleLogin = async () => {
        if (!email || !password) {
            setError('Please fill in all fields');
            return;
        }

        setLoading(true);
        setError(null);

        try {
            const token = await login(email, password);
            navigation.reset({
                index: 0,
                routes: [{ name: 'AppTabs' }],
              });
        } catch (err) {
            let errorMessage = 'Login failed. Please try again.';
            
            if (axios.isAxiosError(err)) {
                errorMessage = err.response?.data?.error || errorMessage;
            }
            
            setError(errorMessage);
        } finally {
            setLoading(false);
        }
    };

    return (
        <View style={styles.container}>
            <Text style={styles.title}>
                Enter Login Details
            </Text>

            {error && (
                <Text style={{ color: 'red', marginBottom: 10 }}>
                    {error}
                </Text>
            )}

            <CustomTextInput
                value={email}
                onChangeText={setEmail}
                title="Email"
                placeholder="Enter your email"
                keyboardType="email-address"
            />

            <CustomTextInput
                value={password}
                onChangeText={setPassword}
                title="Password"
                placeholder="*******"
              rightIcon={true}
              onPressRightIcon={()=>setShowPassword(!showPassword)}
              secureTextEntry={!showPassword}
            />

            <Button
                title={loading ? 'Logging in...' : 'Login'}
                onPress={handleLogin}
                disabled={loading}
            />

                <Text onPress={() => navigation.navigate('SignupScreen')} style={{padding:10,textAlign:'center'}}>
                    Don't have an account yet? Sign Up
                </Text>
            
        </View>
    );
}
const styles = StyleSheet.create({
    container: {
        alignItems: 'center', 
        flex: 1, 
        paddingTop: 70, 
        paddingHorizontal: 12
    },
    title:{
        fontSize: FontSizes.extraLarge, 
        fontWeight: 'bold', 
        paddingVertical: 10
    }
})