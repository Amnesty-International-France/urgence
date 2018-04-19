import React from 'react';
import { View } from 'react-primitives';
import glamorous from 'glamorous-primitives';

import Carousel from './Carousel';

const Item = glamorous.view({
    backgroundColor: 'darkorange',
    padding: 50,
    textAlign: 'center',
    width: '100%',
});

const ItemText = glamorous.text({
    textAlign: 'center',
    color: 'white',
});

const Home = () => (
    <View>
        <Carousel>
            <Item>
                <ItemText>1</ItemText>
            </Item>
            <Item>
                <ItemText>2</ItemText>
            </Item>
            <Item>
                <ItemText>3</ItemText>
            </Item>
        </Carousel>
    </View>
);

export default Home;
