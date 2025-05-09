import { black, RichText, white, yellow } from 'amnesty-components';
import styled from '@emotion/styled';

const styles = {
    height: '100%',

    '& > .rich-text': {
        position: 'absolute',
        bottom: '5rem',
        left: '50%',
        transform: 'translateX(-50px)',
        transition: 'all .5s ease',
        width: '45vw',
        '& > h1': {
            fontFamily: 'Amnesty Trade Gothic Condensed',
            display: 'inline',
            color: black,
            backgroundColor: yellow,
            fontSize: '80px',
            lineHeight: '1.4',
            padding: '8px 14px',
            boxDecorationBreak: 'clone',
            '@media (min-width: 1441px)': {
                fontSize: '92px',
                padding: '20px 20px',
                lineHeight: '1.8',
            },
        },
        '& > h2': {
            fontFamily: 'Amnesty Trade Gothic Condensed',
            textTransform: 'uppercase',
            display: 'inline',
            color: white,
            backgroundColor: black,
            fontSize: '46px',
            padding: '10px 14px',
            lineHeight: '1.6',
            boxDecorationBreak: 'clone',
            '@media (min-width: 1441px)': {
                fontSize: '60px',
                padding: '10px 20px',
                lineHeight: '1.2',
            },
        },
    },

    '& .move.rich-text': {
        left: '5rem',
        bottom: '3rem',
        transformOrigin: 'left bottom',
        transform: 'translateX(-3rem) translateY(1rem) scale(0.7)',
    },
};

interface LeftSideColumnProps {
    className?: string;
    title?: string;
    image?: string;
    page?: string;
    step?: string;
}

const LeftSideColumn = ({ className, title, image, page, step }: LeftSideColumnProps) => {
    const moveTitle =
        Number(page) > 0 || step === 'act' || step === 'message-view' || step === 'message-send'
            ? 'move'
            : '';
    return (
        <div className={'left'}>
            <div
                className={className}
                style={{
                    backgroundImage: image,
                    backgroundPosition: 'top',
                    backgroundRepeat: 'no-repeat',
                    backgroundSize: 'cover',
                }}
            >
                <RichText html={title?.replace('<h2', '<br/><h2')} className={moveTitle} />
            </div>
        </div>
    );
};

// @ts-ignore
export default styled(LeftSideColumn)(styles);
