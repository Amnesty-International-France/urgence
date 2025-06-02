import styled from '@emotion/styled';
import { RichText, yellow } from 'amnesty-components';
import ToUrgentActionPageLink from '../ToUrgentActionPageLink';
import classnames from 'classnames';
import { useLocation, useNavigate } from 'react-router';
import get from 'lodash.get';
import { ThankStep, ThanksType } from '../ThankStep';
import generateUrl from '../../services/generateUrl';
import SendMail from '../messageSend/SendMail';
import MessageSend from '../messageSend/MessageSend';
import Act from '../Act';
import MessageView from '../messageView/MessageView';
import ToMessageSendButton from '../messageView/ToMessageSendButton';
import ShareStep from '../share/ShareStep';
import Register from '../register/Register';
import RegisterButton from '../register/RegisterButton';

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
                '& > p:first-of-type': {
                    marginTop: '0',
                },
                '& > p:last-child': {
                    marginBottom: '0',
                },
            },
        },
    },

    '& > .item.yellow': {
        padding: '0 6rem 0 3rem',

        '& p': {
            margin: 0,
        },

        '& > .act': {
            '.step': {
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',

                margin: '100px 20px 60px',
                '@media (min-width: 350px)': {
                    margin: '160px 20px 80px',
                },

                '& .progress': {
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

        '& > .act > .step > .text > .rich-text': {
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
    '& > .item.message-send': {
        '& > .message-view': {
            overflowY: 'auto',
        },
    },

    '& > .item.share': {
        '& > .share': {
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
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
        '& .thank': {
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            height: '100%',

            '&> .paper': {
                width: '100%',
                padding: '20px',
            },

            '& >.paper-share': {
                marginTop: '20px',
            },
        },

        '@media (orientation: landscape)': {
            padding: '60px 120px 20px 60px',
        },
    },

    '& > .item.none': {
        display: 'none !important',
    },
    '& > .item.current': {
        opacity: 1,
        transform: 'translate(-50%, -50%) scale(100%)',
    },
    '& > .item.before': {
        top: 0,
        pointerEvents: 'none',
    },
    '& > .item.after': {
        top: '100%',
        pointerEvents: 'none',
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

    const callToAction = get(data, 'UrgentAction.call_to_action');

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
                            linkIndex < data.UrgentAction.story.length && 'before',
                            linkIndex > data.UrgentAction.story.length && 'after',
                        )}
                    >
                        <Act
                            data={{
                                ...callToAction,
                                response_count: get(data, 'UrgentAction.response_count'),
                                auId: get(data, 'UrgentAction.id'),
                            }}
                            actions={() =>
                                callToAction && callToAction.button ? (
                                    <ToUrgentActionPageLink
                                        label={callToAction.button}
                                        step="act"
                                        pageName="message-view"
                                        buttonName="OpenMessageView"
                                    />
                                ) : null
                            }
                        />
                    </div>
                    <div
                        className={classnames(
                            'item message-view',
                            linkIndex === data.UrgentAction.story.length + 1 && 'current',
                            linkIndex < data.UrgentAction.story.length + 1 && 'before',
                            linkIndex > data.UrgentAction.story.length + 1 && 'after',
                        )}
                    >
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
                    <div
                        className={classnames(
                            'item message-send',
                            linkIndex === data.UrgentAction.story.length + 2 && 'current',
                            linkIndex < data.UrgentAction.story.length + 2 && 'before',
                            linkIndex > data.UrgentAction.story.length + 2 && 'after',
                        )}
                    >
                        <MessageSend // @ts-ignore
                            text={get(data, 'UrgentAction.message.text_send') as string}
                            messageTemplate={get(data, 'UrgentAction.message.message_template')}
                            gdprMessage={get(data, 'GdprMessage.content')}
                            step={step}
                            action={
                                <SendMail // @ts-ignore
                                    label={get(
                                        data,
                                        'UrgentAction.message.button_send',
                                        "J'envoie",
                                    )}
                                    step={step}
                                    recipient={get(data, 'UrgentAction.message.recipient')}
                                    messageTemplate={get(
                                        data,
                                        'UrgentAction.message.message_template',
                                    )}
                                    auId={get(data, 'UrgentAction.id')}
                                    afterMail={({ failed, registered }: any) => {
                                        if (failed) {
                                            global.console.log('Failed to open mailto link');
                                        }
                                        navigate(
                                            generateUrl(registered ? 'share' : 'register', {
                                                slug,
                                            }),
                                        );
                                    }}
                                />
                            }
                        />
                    </div>
                    {step === 'share' && (
                        <div
                            className={classnames(
                                'item share',
                                linkIndex === data.UrgentAction.story.length + 3 && 'current',
                                linkIndex < data.UrgentAction.story.length + 3 && 'before',
                                linkIndex > data.UrgentAction.story.length + 3 && 'after',
                            )}
                        >
                            <ShareStep // @ts-ignore
                                slug={slug}
                                step={step}
                                data={get(data, 'UrgentAction.email_thank')}
                            />
                        </div>
                    )}
                    {step === 'thanks-end' && (
                        <div
                            className={classnames(
                                'item thanks-end',
                                linkIndex === data.UrgentAction.story.length + 5 && 'current',
                                linkIndex < data.UrgentAction.story.length + 5 && 'before',
                                linkIndex > data.UrgentAction.story.length + 5 && 'after',
                            )}
                        >
                            <ThankStep // @ts-ignore
                                data={get(data, 'UrgentAction.end_thank') as ThanksType | undefined}
                                slug={slug}
                                step={step}
                                dataShare={get(data, 'UrgentAction.email_thank')}
                            />
                        </div>
                    )}
                    {step === 'register' && (
                        <div
                            className={classnames(
                                'item register',
                                linkIndex === data.UrgentAction.story.length + 4 && 'current',
                                linkIndex < data.UrgentAction.story.length + 4 && 'before',
                                linkIndex > data.UrgentAction.story.length + 4 && 'after',
                            )}
                        >
                            <Register // @ts-ignore
                                step={step}
                                data={data.UrgentAction.register}
                                gdprRegister={get(data, 'GdprMessage.content')}
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
                    )}
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
