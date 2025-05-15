import React, { Fragment } from 'react';
import RoundedStepper from '../../themes/RoundedStepper';
import NavigationSlide from './NavigationSlide';
import styled from '@emotion/styled';

type VerticalNavigationProps = {
    links: any;
    className?: string
    step?: string;
}

const styles = {
    height: '100vh',
    position: 'absolute',
    top: '0',
    right: '0',
};
const VerticalNavigation = ({ links, className, step }: VerticalNavigationProps) => {
    return (
        <div className={className}>
            {
                (
                    step === 'story' ||
                    step === 'act' ||
                    step === 'message-send' ||
                    step === 'message-view'
                ) &&
                <>
                    <RoundedStepper // @ts-ignore
                        links={links}
                    />
                    <NavigationSlide // @ts-ignore
                        links={links}
                        step={step}
                    />
                </>
            }
        </div>
    );
};

// @ts-ignore
export default styled(VerticalNavigation)(styles);
