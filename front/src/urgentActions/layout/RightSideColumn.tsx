import styled from '@emotion/styled';
import { black, RichText, yellow } from 'amnesty-components';
import ToUrgentActionPageLink from '../ToUrgentActionPageLink';
import classnames from 'classnames';
import generateUrl from '../../services/generateUrl';
import { useLocation, useNavigate } from 'react-router';
import { buildStyles, CircularProgressbarWithChildren } from 'react-circular-progressbar';
import MessageView from '../messageView/MessageView';
import ToMessageSendButton from '../messageView/ToMessageSendButton';
import MessageSend from '../messageSend/MessageSend';
import SendMail from '../messageSend/SendMail';
import ShareStep from '../share/ShareStep';
import Register from '../register/Register';
import { RegisterButton } from '../register/RegisterButton';
import get from 'lodash.get';
import { ThankStep } from '../ThankStep';

const styles = {
    height: '100%',
    transition: ' transform .5s ease-in-out',

    '& > .item': {
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

    '& > .item.yellow, & > .item.message-view, & > .item.share, & > .item.thanks-end, .item.register ': {
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
    },

    '& > .item.yellow': {
        padding: '0 6rem 0 3rem',
        gap: '34px',

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
            margin: 0,

            '@media (min-width: 1441px)': {
                fontSize: '28px !important',
            },

            '& strong': {
                fontWeight: '700',
            },
        },
    },

    '& > .item.message-view': {
        '& > .message-view': {
            overflowY: 'auto',
        },
    },

    '& > .item.share': {
        '& > .share': {
            height: 'fit-content',

            '& .share-text': {
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
        },
    },

    '& > .item.share > .share, & > .item.thanks-end > .thank': {
        '& .share-block > .share-block-title, .share-text': {
            fontSize: '16px !important',

            '@media (min-width: 1441px)': {
                fontSize: '20px !important',
            },
            margin: 0,

            '& strong': {
                fontWeight: '700',
            },
        },
        '& .url': {
            textAlign: 'center',
            letterSpacing: '0',
            fontSize: '20px !important',

            '@media (min-width: 1441px)': {
                fontSize: '28px !important',
            },
            margin: 0,
            marginRight: '10px',

            '& strong': {
                fontWeight: '700',
            },
        },
    },

    '& > .item.thanks-end': {
        '& > .thank': {
            '@media (orientation: landscape)': {
                padding: '60px 120px 20px 60px',
            },

            '& > h1': {
                textAlign: 'center',
                letterSpacing: '0',
                fontSize: '20px !important',
                margin: 0,
                marginRight: '10px',

                '& strong': {
                    fontWeight: '700',
                },

                '@media (min-width: 1441px)': {
                    fontSize: '28px !important',
                },
            },

            '& > .rich-text': {
                textAlign: 'center',
                fontSize: '16px !important',

                '@media (min-width: 1441px)': {
                    fontSize: '20px !important',
                },
                margin: 0,

                '& strong': {
                    fontWeight: '700',
                },
            },
        },
    },

    '& > .item.register': {},

    '& > .item.none': {
        display: 'none !important',
    },
    '& > .item.current': {
        opacity: 1,
        transform: 'translate(-50%, -50%) scale(100%)',
    },
    '& > .item.before': {
        top: 0,
    },
    '& > .item.after': {
        top: '100%',
    },
};

type RightSideColumnProps = {
    links: any;
    className?: string;
    step?: string;
    data: any;
    slug?: string;
};
const RightSideColumn = ({ className, data, step, slug, links }: RightSideColumnProps) => {
    const { pathname } = useLocation();
    const navigate = useNavigate();

    let linkIndex = links.indexOf(pathname);

    const textToHtml = (str: any) => (str ? str.replace(/\r\n|\r|\n/g, '<br/>') : '');
    const formatText = (text: any) => {
        if (!text) {
            return '';
        }

        text = text.replace('{{count}}', data.UrgentAction.response_count);
        text = text.replace('{{objective}}', data.UrgentAction.call_to_action.progress.objective);
        return text;
    };

    return (
        <>
            <div className="right">
                <div className={className}>
                    {data.UrgentAction.story.map((story: any, index: number) => (
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
                            linkIndex === data.UrgentAction.story.length && 'current',
                        )}>
                        {data.UrgentAction.call_to_action.progress.display && (
                            <div className="progress">
                                <div className="progressChart">
                                    <CircularProgressbarWithChildren
                                        value={data.UrgentAction.responseCount}
                                        maxValue={data.UrgentAction.call_to_action.progress.objective}
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
                                                            data.UrgentAction.call_to_action.progress.message,
                                                        ),
                                                    ),
                                                }}
                                            ></div>
                                        </div>
                                    </CircularProgressbarWithChildren>
                                </div>
                            </div>
                        )}

                        <p className="title">{data.UrgentAction.call_to_action.title}</p>

                        <p
                            className={'message'}
                            dangerouslySetInnerHTML={{ __html: data.UrgentAction.call_to_action.message ?? '' }}
                        />
                        <div style={{ width: 'fit-content' }}>
                            <ToUrgentActionPageLink
                                label={data.UrgentAction.call_to_action.button}
                                step="act"
                                pageName="message-view"
                                buttonName="OpenMessageView"
                            />
                        </div>
                    </div>
                    <div className={classnames(
                        'item message-view',
                        linkIndex === data.UrgentAction.story.length + 1 && 'current',
                    )}>
                        <MessageView // @ts-ignore
                            text={data.UrgentAction.message.text_view}
                            objectIndication={data.UrgentAction.message.object_indication}
                            objectExample={data.UrgentAction.message.object_example}
                            messageTemplate={data.UrgentAction.message.message_template}
                            step={step}
                            action={
                                <ToMessageSendButton
                                    label={data.UrgentAction.message.button_view}
                                    step={step}
                                    pageName="message-send"
                                    objectExample={data.UrgentAction.message.object_example}
                                    buttonName="OpenMessageSend"
                                />
                            }
                        />
                    </div>
                    <div className={classnames(
                        'item message-send',
                        linkIndex === data.UrgentAction.story.length + 2 && 'current',
                    )}>
                        <MessageSend // @ts-ignore
                            text={data.UrgentAction.message.text_send}
                            messageTemplate={data.UrgentAction.message.text_send}
                            step={step}
                            action={
                                <SendMail // @ts-ignore
                                    label={data.UrgentAction.message.button_send}
                                    step={step}
                                    recipient={data.UrgentAction.message.recipient}
                                    messageTemplate={data.UrgentAction.message.message_template}
                                    auId={data.UrgentAction.id}
                                    afterMail={({ failed, registered }: any) => {
                                        if (failed) {
                                            global.console.log('Failed to open mailto link');
                                        }
                                        navigate(generateUrl(registered ? 'share' : 'register', { slug }));
                                    }}
                                />
                            }
                        />
                    </div>
                    <div className={classnames(
                        'item share',
                        linkIndex === data.UrgentAction.story.length + 3 && 'current',
                    )}>
                        <ShareStep // @ts-ignore
                            slug={slug}
                            step={step}
                            data={data.UrgentAction.emailThank}
                        />
                    </div>
                    <div className={classnames(
                        'item register',
                        linkIndex === data.UrgentAction.story.length + 4 && 'current',
                    )}>
                        <Register // @ts-ignore
                            step={step}
                            data={data.UrgentAction.register}
                            gdprRegister={get(data, 'GdprRegister.content')}
                            action={(disabled: any, formValues: any) => (
                                <RegisterButton
                                    auId={data.UrgentAction.id}
                                    step={step}
                                    disabled={disabled}
                                    buttonText={data.UrgentAction.register.button}
                                    formValues={formValues}
                                />
                            )}
                        />
                    </div>
                    <div className={classnames(
                        'item thanks-end',
                        linkIndex === data.UrgentAction.story.length + 5 && 'current',
                    )}>
                        <ThankStep // @ts-ignore
                            data={data.UrgentAction.end_thank}
                            slug={slug}
                            step={step}
                            dataShare={data.UrgentAction.end_thank.email_thank}
                        />
                    </div>
                </div>
            </div>
            <div
                style={{
                    width: '55vw',
                    height: '100vh',
                    position: 'fixed',
                    opacity: linkIndex === data.UrgentAction.story.length ? 1 : 0,
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
