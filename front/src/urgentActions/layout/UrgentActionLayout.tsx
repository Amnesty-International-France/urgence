import React from 'react';
import styled from '@emotion/styled';
import get from 'lodash.get';
import LeftSideColumn from './LeftSideColumn';
import RightSideColumn from './RightSideColumn';
import { yellow } from 'amnesty-components';
import generateUrl from '../../services/generateUrl';
import VerticalNavigation from './VerticalNavigation';

const styles = {
    position: 'relative',
    display: 'flex',
    overflow: 'hidden',

    '& .right, .left': {
        width: '50%',
        height: '100vh',
    },

    '& .left': {
        padding: '3rem 0 3rem 3.5rem',
    },

    '& .right.act': {
        backgroundColor: yellow,
    },
    '& .right': {
        position: 'relative',
    },
};

type UrgentActionLayoutProps = {
    className?: string;
    slug: string;
    step?: string;
    data?: any;
    page?: string;
};

const UrgentActionLayout = ({ className, slug, step, data, page }: UrgentActionLayoutProps) => {
    const globalData = get(data, 'UrgentAction');
    const story = get(data, 'UrgentAction.story');
    const articleTitle = story[0].content;
    const imgSrc = story[0]['mediumDesktop'];
    const src = imgSrc['src'];
    const imageSrc = typeof src === 'string' ? src : '';
    const lastUrlParam = /\/([^/]*$)/;
    const croppedImageSrc = imageSrc.replace(lastUrlParam, '/crop-$1');
    const imagePath = `url(${croppedImageSrc}), url(${imageSrc})`;

    const storyLink = story.map((story: any, index: number) => `/ua/${slug}/story/${index}`);
    const actLink = get(data, 'UrgentAction.call_to_action') ? generateUrl('act', { slug }) : '';
    const messageViewLink = get(data, 'UrgentAction.message.text_view') ? generateUrl('message-view', { slug }) : '';
    const messageSendLink = get(data, 'UrgentAction.message.text_send') ? generateUrl('message-send', { slug }) : '';

    let links = [...storyLink, actLink, messageViewLink, messageSendLink];

    return (
        <div className={className}>
            <LeftSideColumn // @ts-ignore
                title={articleTitle}
                image={imagePath}
                page={page}
                step={step}
            />
            <VerticalNavigation // @ts-ignore
                links={links}
                step={step}
            />
            <RightSideColumn // @ts-ignore
                data={globalData}
                step={step}
                slug={slug}
                links={links}
            />
        </div>
    );
};

// @ts-ignore
export default styled(UrgentActionLayout)(styles);
