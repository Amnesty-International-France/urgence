import { RichTextInput } from 'ra-input-rich-text';
import { BooleanInput, Labeled, NumberInput } from 'react-admin';

type ParticipationInputProps = {
    source: string;
};

export const ParticipationInput = ({ source }: ParticipationInputProps) => (
    <Labeled label="Participation">
        <>
            <BooleanInput label="Affichage compteur participations" source={`${source}.display`} />
            <NumberInput
                label="Objectif"
                source={`${source}.objective`}
                step={1}
                defaultValue={500}
                fullWidth
            />
            <NumberInput
                label="Affichage compteur : nombre de participations minimum"
                source={`${source}.display_threshold`}
                step={1}
                fullWidth
            />
            <RichTextInput
                source={`${source}.message`}
                label="Message"
                defaultValue="Déjà {{count}} participations sur un objectif de {{objective}}"
            />
        </>
    </Labeled>
);
