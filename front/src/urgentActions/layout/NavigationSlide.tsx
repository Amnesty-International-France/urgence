import styled from '@emotion/styled';
import IconButton from '../../themes/IconButton';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowDown, faArrowUp } from '@fortawesome/free-solid-svg-icons';
import { black, yellow } from 'amnesty-components';
import classnames from 'classnames';
import { useLocation, useNavigate } from 'react-router';
import { useEffect } from 'react';

const styles = {
    position: 'absolute',
    bottom: '1rem',
    right: '1rem',

    '& .up, .down': {
        width: '3.6rem',
        height: '3.6rem',
        '@media (min-width: 1441px)': {
            width: '4.5rem',
            height: '4.5rem',
        },
    },

    '& > .up': {
        marginBottom: '0.8rem',
        backgroundColor: 'transparent',
        border: '1px solid rgba(0,0,0,0.5)',
    },

    '& > .down.act': {
        backgroundColor: black,
        '& svg': {
            color: yellow,
        },
    },

    '& > .up.act': {
        border: '1px solid black',
        '& svg': {
            color: black,
        },
    },

    '& > .down.last': {
        opacity: 0.5,
        background: 'rgba(0,0,0,0.3)',
    },

    '& > .up.last': {
        background: black,
        '& svg': {
            color: yellow,
        },
    },

    '& .box-shadow-none': {
        boxShadow: 'none',
    },
};

type NavigationSlideProps = {
    className?: string;
    links?: any;
    step: string;
    page: any;
};

const NavigationSlide = ({ className, links, step, page }: NavigationSlideProps) => {
    const { pathname } = useLocation();
    const navigate = useNavigate();
    let index = links.indexOf(pathname);
    

    const nextPage = () => {
        if (index >= links.length) {
            navigate(links[links.length]);
        }

        navigate(links[index + 1]);
    };

    const prevPage = () => {
        if (index < 0) {
            navigate(links[0]);
        }

        navigate(links[index - 1]);
    };

    useEffect(() => {
        const handleKeyDown = (e: { key: string }) => {
            if (e.key === 'ArrowUp') {
                prevPage();
            }

            if (e.key === 'ArrowDown') {
                nextPage();
            }
        };

        window.addEventListener('keydown', handleKeyDown);

        return () => {
            window.removeEventListener('keydown', handleKeyDown);
        };
    }, [index, nextPage, prevPage]);

    return (
        <div className={className}>
            {index > 0 && (
                <IconButton
                    className={classnames(
                        'up box-shadow-none',
                        step === 'act' && 'act',
                        index === links.length - 1 && 'last',
                    )}
                    onClick={prevPage}
                >
                    <FontAwesomeIcon icon={faArrowUp} className="icon" color={'rgba(0,0,0,0.5)'} />
                </IconButton>
            )}

            <IconButton
                className={classnames(
                    'down box-shadow-none',
                    step === 'act' && 'act',
                    index === links.length - 1 && 'last',
                )}
                onClick={() => nextPage()}
            >
                <FontAwesomeIcon icon={faArrowDown} color={black} className="icon" />
            </IconButton>
        </div>
    );
};

// @ts-ignore
export default styled(NavigationSlide)(styles);
