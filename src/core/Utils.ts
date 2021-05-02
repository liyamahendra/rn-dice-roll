import { Alert } from 'react-native';
export default {
    displayAlert: (title: string, message: string) => {
        Alert.alert(
            title,
            message,
            [
                { text: "OK", onPress: () => {} }
            ]
        )
    },
    displayAlertWithCallback: (title: string, message: string, callback: any) => {
        Alert.alert(
            title,
            message,
            [
                { text: "OK", onPress: callback }
            ]
        )
    },
    getRandomValue: (max: number) => {
        return Math.floor(Math.random() * max + 1);
    },
    getRandomValueBetweenNumbers: (min: number, max: number) => {
        return Math.floor(Math.random() * (max - min + 1) + min);
    },
    randomize: (size: number) => {
        var randomized = [];
        while(randomized.length < size){
            var r = Math.floor(Math.random() * size) + 1;
            if(randomized.indexOf(r) === -1) {
                randomized.push(r);
            }
        }

        return randomized;
    }
}