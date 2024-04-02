import {Alert, View} from "react-native";
import Title from "../Title";
import FormInput from "../Form/FormInput";
import Button from "../Button";
import {useState} from "react";
import {globalStyles} from "../../shared/globalStyles";
import {Auth} from "../../shared/classes/Auth";

type LoginFormOptions = {
    initialUsername?: string,
    auth: Auth
}

export default function LoginForm({initialUsername, auth}: LoginFormOptions) {

    const [username, setUsername] = useState(initialUsername || "")
    const [password, setPassword] = useState("")

    const handleLogin = async () => {
        try {
            await auth.loginWithPassword(username, password)
        }
        catch (e: any) {
            Alert.alert("Erreur d'autentification", e?.message || "Erreur inconnue")
        }
    }

    const handlePasswordChange = (newValue: string) => {
        setPassword(() => newValue)
    }

    const handleUsernameChange = (newValue: string) => {
        setUsername(() => newValue)
    }

    return (
        <View style={[globalStyles.body, globalStyles.contentCenter]}>
            <Title title={"Connexion"} style={[globalStyles.textCenter]} size={"xl"} />

            <View style={globalStyles.my2Container}>
                <FormInput
                    label={"Adresse mail"}
                    type={"text"}
                    value={username}
                    onChange={handleUsernameChange}
                />

                <FormInput
                    label={"Mot de passe"}
                    type={"text"}
                    value={password}
                    onChange={handlePasswordChange}
                    options={{
                        secureTextEntry: true
                    }}
                />

                <Button
                    title={"Connexion"}
                    onPress={handleLogin}
                    variant={"lg"}
                />
            </View>
        </View>
    )

}