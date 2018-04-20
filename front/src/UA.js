import React from 'react';
import glamorous from 'glamorous-primitives';
import { Query } from 'react-apollo';
import gql from 'graphql-tag';
import { Text, View } from 'react-primitives';

import Title from './themes/Title';

const UA = () => (
    <Query
        query={gql`
            query {
                UrgentAction(id: "7ed78132-4b66-4320-a9f2-dd9c1a6552c2") {
                    id
                    title
                }
            }
        `}
    >
        {({ loading, error, data }) => {
            if (loading) {
                return (
                    <View>
                        <Text>Loading...</Text>
                    </View>
                );
            }
            if (error) {
                return <Text>Error: {error}</Text>;
            }

            if (!data.UrgentAction) {
                return <Title>Not found</Title>;
            }

            return <Title>{data.UrgentAction.title}</Title>;
        }}
        {/* <Carousel>
            <Item>
                <ItemText>1</ItemText>
            </Item>
            <Item>
                <ItemText>2</ItemText>
            </Item>
            <Item>
                <ItemText>3</ItemText>
            </Item>
        </Carousel> */}
    </Query>
);

export default UA;
