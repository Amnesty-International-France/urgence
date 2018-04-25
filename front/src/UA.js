import React from 'react';

import glamorous from 'glamorous-primitives';

import Carousel from './Carousel';
import { StoryStep } from './urgentActions/StoryStep';

const Item = glamorous.view({
    padding: 25,
    textAlign: 'center',
    width: '100%',
});

const ItemText = glamorous.text({
    color: 'white',
});

const UA = () => (
    <Carousel>
        <Item>
            <StoryStep
                medium={{
                    src: '/abdolfatah-soltani.jpg',
                    title: 'Abdolfatah Soltani',
                }}
                theme={{
                    position: 'top',
                    backgroundColor: 'red',
                }}
                content={`
                    <p>
                        <span style={{ fontSize: 24 }}>Abdolfatah Soltani</span> est un avocat iranien
                        célèbre, spécialisé dans la défense des droits humains.
                    </p>
                `}
            />
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
