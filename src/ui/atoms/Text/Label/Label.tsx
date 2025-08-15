import { Text, StyleSheet, TextProps } from 'react-native';

type LabelProps = React.PropsWithChildren<TextProps>;

export const Label: React.FC<LabelProps> = ({ children, ...rest }) => {
    return (
        <Text style={styles.text} {...rest}>{children}</Text>
    )
}

const styles = StyleSheet.create({
    text: {
        fontSize: 12
    }
})