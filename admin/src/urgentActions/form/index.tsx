import { LongForm } from './LongForm';
import Part1Camgaign from './Part1Campaign';
import Part2SocialNetworks from './Part2SocialNetworks';
import Part3Story from './Part3Story';
import Part4CallToAction from './Part4CallToAction';
import Part5MessageView from './Part5MessageView';
import Part6MessageSend from './Part6MessageSend';
import Part7Share from './Part7Share';
import Part8Register from './Part8Register';
import Part9Thanks from './Part9Thanks';

const ActionForm = () => {
    return (
        <LongForm>
            <LongForm.Section label="The Campaign">
                <Part1Camgaign />
            </LongForm.Section>
            <LongForm.Section label="Social Networks">
                <Part2SocialNetworks />
            </LongForm.Section>
            <LongForm.Section label="Story">
                <Part3Story />
            </LongForm.Section>
            <LongForm.Section label="Call to action">
                <Part4CallToAction />
            </LongForm.Section>
            <LongForm.Section label="Message view">
                <Part5MessageView />
            </LongForm.Section>
            <LongForm.Section label="Message send">
                <Part6MessageSend />
            </LongForm.Section>
            <LongForm.Section label="Share">
                <Part7Share />
            </LongForm.Section>
            <LongForm.Section label="Register">
                <Part8Register />
            </LongForm.Section>
            <LongForm.Section label="Thanks">
                <Part9Thanks />
            </LongForm.Section>
        </LongForm>
    );
};

export default ActionForm;
