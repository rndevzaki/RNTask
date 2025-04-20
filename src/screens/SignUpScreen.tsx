import React, { useState } from 'react';
import { Text, View, ScrollView, ActivityIndicator, StyleSheet } from 'react-native';
import { Button } from '../components/Button';
import { CustomTextInput } from '../components/CustomTextInput';
import { FontSizes } from '../styles/FontSizes';
import { useNavigation } from '@react-navigation/native';
import { register } from '../services/auth'; 
import { RootStackParamList } from '../utils/types'; 
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import axios from 'axios';

type SignupScreenNavigationProp = NativeStackNavigationProp<RootStackParamList, 'SignupScreen'>;

export default function SignupScreen() {
    const navigation = useNavigation<SignupScreenNavigationProp>();
    const [email, setEmail] = useState(''); 
    const [username, setUserName] = useState('');
    const [password, setPassword] = useState(''); 
    const [confirmPassword, setConfirmPassword] = useState('');
    const [showPassword, setShowPassword] = useState(false);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const validateForm = () => {
        if (!username || !email || !password || !confirmPassword) {
            setError('All fields are required');
            return false;
        }
        if (password !== confirmPassword) {
            setError('Passwords do not match');
            return false;
        }
        return true;
    };

    const handleSignUp = async () => {
        if (!validateForm()) return;

        setLoading(true);
        setError(null);

        try {
            const token = await register(email, password);
            navigation.navigate('AppTabs');
        } catch (err) {
            console.log(err)
            let errorMessage = 'Registration failed. Please try again.';
            
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
            <ScrollView contentContainerStyle={{ alignItems: 'center' }}>
                <Text style={styles.title}>
                    Create Account
                </Text>

                {error && (
                    <Text style={{ color: 'red', marginBottom: 10 }}>
                        {error}
                    </Text>
                )}

                <CustomTextInput
                    value={username}
                    onChangeText={setUserName}
                    title="User Name"
                    placeholder="Enter your username"
                />

                <CustomTextInput
                    value={email}
                    onChangeText={setEmail}
                    title="Email Address"
                    placeholder="Enter your email"
                    keyboardType="email-address"
                />

                <CustomTextInput
                    value={password}
                    onChangeText={setPassword}
                    title="Password"
                    placeholder="Enter your password"
                    rightIcon={true}
                    onPressRightIcon={() => setShowPassword(!showPassword)}
                    secureTextEntry={!showPassword}
                />

                <CustomTextInput
                    value={confirmPassword}
                    onChangeText={setConfirmPassword}
                    title="Confirm Password"
                    placeholder="Confirm your password"
                    rightIcon={true}
                    onPressRightIcon={() => setShowPassword(!showPassword)}
                    secureTextEntry={!showPassword}
                />

                <Button
                    title={loading ? 'Creating Account...' : 'Sign Up'}
                    onPress={handleSignUp}
                    disabled={loading}                />

                <Text onPress={() => navigation.navigate('SignInScreen')}>
                    Already Have Account? Login
                </Text>
            </ScrollView>
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