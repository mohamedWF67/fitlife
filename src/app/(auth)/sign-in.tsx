import { useState } from 'react';
import { View, TextInput, Button, Alert } from 'react-native';
import { supabase } from '@/services/supabase';

export default function SignIn() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [loading, setLoading] = useState(false);

    const signIn = async () => {
        setLoading(true);
        const { error } = await supabase.auth.signInWithPassword({ email, password });
        if (error) Alert.alert(error.message);
        setLoading(false);
    };

    const signUp = async () => {
        setLoading(true);
        const { error } = await supabase.auth.signUp({ email, password });
        if (error) Alert.alert(error.message);
        else Alert.alert('Check your inbox to confirm your email');
        setLoading(false);
    };

    return (
        <View style={{ padding: 24, gap: 12, marginTop: 80 }}>
            <TextInput placeholder="Email" autoCapitalize="none" value={email} onChangeText={setEmail} />
            <TextInput placeholder="Password" secureTextEntry value={password} onChangeText={setPassword} />
            <Button title="Sign in" onPress={signIn} disabled={loading} />
            <Button title="Sign up" onPress={signUp} disabled={loading} />
        </View>
    );
}