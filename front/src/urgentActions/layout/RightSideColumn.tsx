import styled from '@emotion/styled';
import { black, RichText, yellow } from 'amnesty-components';
import ToUrgentActionPageLink from '../ToUrgentActionPageLink';
import get from 'lodash.get';
import classnames from 'classnames';
import generateUrl from '../../services/generateUrl';
import { useLocation } from 'react-router';
import { buildStyles, CircularProgressbarWithChildren } from 'react-circular-progressbar';

const styles = {
    height: '100%',
    transition: ' transform .5s ease-in-out',
    '& .item': {
        position: 'absolute',
        width: '100%',
        height: '100%',
        left: '50%',
        top: '50%',
        transform: 'translate(-50%, -50%) scale(30%)',
        opacity: 0,
        transition: 'all ease 0.5s',

        '.card': {
            zIndex: '20',
            position: 'absolute',
            padding: '35px',
            width: 'calc(100% - 1rem)',
            maxWidth: '50rem',
            backgroundColor: 'white',
            top: '50%',
            left: '-5rem',
            transform: 'translateY(-50%)',
            boxShadow: '0 0 40px 0 rgba(0, 0, 0, 0.15)',

            '& >.rich-text': {
                '& > p': {
                    fontSize: '20px !important',
                    '@media (min-width: 1280px)': {
                        fontSize: '22px !important',
                    },
                    '@media (min-width: 1441px)': {
                        fontSize: '28px !important',
                    },
                },
                '& > p:first-child': {
                    marginTop: '0',
                },
                '& > p:last-child': {
                    marginBottom: '0',
                },
            },
        },
    },

    '& .item.yellow': {
        padding: '0 6rem 0 3rem',
        display: 'flex',
        gap: '34px',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        '& p': {
            margin: 0,
        },

        '& > .progress': {
            width: '18rem',
            backgroundColor: 'transparent',
            borderRadius: '50%',
            position: 'relative',

            '& .progress-info': {
                position: 'absolute',
                width: '82%',
                height: '82%',
                borderRadius: '50%',
                top: '50%',
                left: '50%',
                transform: 'translate(-50%,-50%)',
                backgroundColor: 'white',
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',

                '& .progressChartContent': {
                    fontSize: 22,
                    paddingLeft: '25px',
                    paddingRight: '25px',
                    textAlign: 'center',
                    fontWeight: 300,
                    lineHeight: 1.3,
                    '@media (min-width: 1441px)': {
                        fontSize: 25,
                    },
                },
            },
        },

        '& > p.title': {
            fontSize: '2rem',
            textAlign: 'center',
            letterSpacing: '0',
            fontWeight: '700',
            fontFamily: 'Amnesty Trade Gothic Condensed',
            textTransform: 'uppercase',
            margin: 0,
            '@media (min-width: 1441px)': {
                fontSize: '3rem!important',
            },
        },

        '& > p.message': {
            textAlign: 'center',
            letterSpacing: '0',
            fontSize: '20px !important',
            '@media (min-width: 1441px)': {
                fontSize: '28px !important',
            },
            margin: 0,
            '& strong': {
                fontWeight: '700',
            },
        },
    },

    '& .item.none': {
        display: 'none !important',
    },
    '& .item.current': {
        opacity: 1,
        transform: 'translate(-50%, -50%) scale(100%)',
    },
    '& .item.before': {
        top: 0,
    },
    '& .item.after': {
        top: '100%',
    },
};

type RightSideColumnProps = {
    className?: string;
    step?: string;
    data: any;
    page?: string;
    slug?: string;
};
const RightSideColumn = ({ className, data, step, page, slug }: RightSideColumnProps) => {
    const { pathname } = useLocation();

    const story = get(data, 'story');

    const act = get(data, 'call_to_action');
    const messageView = get(data, 'message.text_view');
    const messageSend = get(data, 'message.text_send');

    const storyLink = story.map((story: any, index: number) => `/ua/${slug}/story/${index}`);

    const actLink = act ? generateUrl('act', { slug }) : '';
    const messageViewLink = messageView ? generateUrl('message-view', { slug }) : '';
    const messageSendLink = messageSend ? generateUrl('message-send', { slug }) : '';

    let links = [...storyLink, actLink, messageViewLink, messageSendLink];

    let linkIndex = links.indexOf(pathname);

    const textToHtml = (str: any) => (str ? str.replace(/\r\n|\r|\n/g, '<br/>') : '');
    const formatText = (text: any) => {
        if (!text) {
            return '';
        }

        text = text.replace('{{count}}', data.response_count);
        text = text.replace('{{objective}}', data.call_to_action.progress.objective);
        return text;
    };
    return (
        <>
            <div className="right">
                <div className={className}>
                    {data.story.map((story: any, index: number) => (
                        <div
                            key={index}
                            className={classnames(
                                'item',
                                index === 0 && 'none',
                                linkIndex === index && 'current',
                                index < linkIndex && 'before',
                                index > linkIndex && 'after',
                            )}
                        >
                            <div className="card">
                                <RichText html={story.content} />
                            </div>
                        </div>
                    ))}
                    <div
                        className={classnames(
                            'item yellow',
                            linkIndex === data.story.length && 'current',
                        )}
                    >
                        {data.call_to_action.progress.display && (
                            <div className="progress">
                                <div className="progressChart">
                                    <CircularProgressbarWithChildren
                                        value={data.responseCount}
                                        maxValue={data.call_to_action.progress.objective}
                                        background
                                        backgroundPadding={1}
                                        styles={buildStyles({
                                            backgroundColor: black,
                                            textColor: 'red',
                                            pathColor: 'black',
                                            trailColor: yellow,
                                        })}
                                    >
                                        <div className={'progress-info'}>
                                            <div
                                                className="progressChartContent"
                                                dangerouslySetInnerHTML={{
                                                    __html: textToHtml(
                                                        formatText(
                                                            data.call_to_action.progress.message,
                                                        ),
                                                    ),
                                                }}
                                            ></div>
                                        </div>
                                    </CircularProgressbarWithChildren>
                                </div>
                            </div>
                        )}

                        <p className="title">{data.call_to_action.title}</p>

                        <p
                            className={'message'}
                            dangerouslySetInnerHTML={{ __html: data.call_to_action.message ?? '' }}
                        />
                        <div style={{ width: 'fit-content' }}>
                            <ToUrgentActionPageLink
                                label={data.call_to_action.button}
                                step="act"
                                pageName="message-view"
                                buttonName="OpenMessageView"
                            />
                        </div>
                    </div>
                </div>
            </div>
            <div
                style={{
                    width: '55vw',
                    height: '100vh',
                    position: 'fixed',
                    opacity: linkIndex === data.story.length ? 1 : 0,
                    background: yellow,
                    right: 0,
                    top: 0,
                    zIndex: -1,
                    transition: 'all ease 0.5s',
                }}
            />
        </>
    );
};
// @ts-ignore
export default styled(RightSideColumn)(styles);
