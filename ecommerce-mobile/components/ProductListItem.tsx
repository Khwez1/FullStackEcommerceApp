import { Text } from 'react-native';

export function ProductListItem({ product }) {
    return <Text style={{ fontSize: 30 }}>{product.name}</Text>
}
