import { Text, StyleSheet, TextProps } from 'react-native';

type HeaderProps = React.PropsWithChildren<TextProps>;

export const Header: React.FC<HeaderProps> = ({ children, ...rest }) => {
    return (
        <Text style={styles.text} {...rest}>{children}</Text>
    )
}

const styles = StyleSheet.create({
    text: {
        fontSize: 25
    }
})