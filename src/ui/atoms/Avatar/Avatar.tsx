import { Image, StyleSheet } from 'react-native';

export const Avatar = ({
    uri = '',
    width = 0,
    height = 0,
    testID = 'avatar-image'
}) => {
    return (
        <Image
          testID={testID}
          width={width}
          height={height}
          style={styles.image}
          resizeMode='cover'
          source={{
            uri
          }}
        />
    )
}

const styles = StyleSheet.create({
  image: {
    borderRadius: 100,
    elevation: 5
  }
})