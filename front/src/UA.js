import React from 'react';

import glamorous from 'glamorous-primitives';

import Carousel from './Carousel';

const Item = glamorous.view({
    backgroundColor: 'darkorange',
    padding: 50,
    textAlign: 'center',
    width: '100%',
});

const ItemText = glamorous.text({
    color: 'white',
});

const UA = () => (
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
);

export default UA;
