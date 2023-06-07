import {
    RichTextInput,
    RichTextInputToolbar,
    LevelSelect,
    FormatButtons,
    LinkButtons,
} from 'ra-input-rich-text';
import { required, TextInput } from 'react-admin';

type ThanksInputProps = {
    source: string;
};

export const Part9Thanks = ({ source }: ThanksInputProps) => {
    const defaultTitle = 'Bienvenue !';
    const defaultText = 'Nous comptons sur vous pour la prochaine action urgente.';

    return (
        <>
            <TextInput
                source={`${source}.title`}
                label="Title"
                fullWidth
                defaultValue={defaultTitle}
                validate={[required()]}
            />
            <RichTextInput
                source={`${source}.text`}
                label="Text"
                defaultValue={defaultText}
                validate={[required()]}
                toolbar={
                    <RichTextInputToolbar>
                        <LevelSelect />
                        <FormatButtons />
                        <LinkButtons />
                    </RichTextInputToolbar>
                }
            />
        </>
    );
};

export default Part9Thanks;
