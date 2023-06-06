import {
    Children,
    cloneElement,
    isValidElement,
    ReactElement,
    ReactNode,
    useCallback,
    useContext,
    useEffect,
    useRef,
    useState,
} from 'react';
import {
    FormDataConsumer,
    FormGroupsContext,
    getFormGroupState,
    Toolbar,
    useTranslate,
} from 'react-admin';
import { useFormState } from 'react-hook-form';
import { Card, CardContent, MenuItem, MenuList, SxProps } from '@mui/material';
import { styled } from '@mui/material/styles';
import get from 'lodash/get';
import isEqual from 'lodash/isEqual';
import LinearProgress, { linearProgressClasses } from '@mui/material/LinearProgress';

import { useScrollSpy } from './useScrollSpy';
import { LongFormSectionProps } from './LongFormSection';
import { FormData } from './index';
import { MailtoCheck } from '../MailtoCheck';
import PreviewLink from '../PreviewLink';
import PreviewQrCode from '../PreviewQrCode';


const BorderLinearProgress = styled(LinearProgress)(({ theme }) => ({
  height: 10,
  borderRadius: 5,
  [`&.${linearProgressClasses.colorPrimary}`]: {
    backgroundColor: 'grey',
  },
  [`& .${linearProgressClasses.bar}`]: {
    borderRadius: 5,
    backgroundColor: '#1a90ff',
  },
}));
const normalise = (value: number) => (value * 100) / 2000;

const MailtoLength = ({ mailto }: { mailto: string }) => {
    return (
        <>
            <p>Longeur de l'email : {mailto.length}/2000</p>
            <BorderLinearProgress variant="determinate" value={normalise(mailto.length)} />
        </>
    )
}


const getMailtoLink = (data: any) => {
    if (!data) {
        return `mailto:?subject=&body=`;
    }
    return `mailto:${data.recipient && data.recipient.mail ? encodeURIComponent(data.recipient.mail) : ''}
        ?subject=${data.object_example ? encodeURIComponent(data.object_example) : ''}
        &body=${data.message_template && data.message_template[0] && data.message_template[0].value ? encodeURIComponent(data.message_template[0].value) : ''}
        ${data.recipient && data.recipient.copies_to ? '&cc=' + encodeURIComponent(data.recipient.copies_to) : ''}
        ${data.recipient && data.recipient.cci ? '&bcc=' + encodeURIComponent(data.recipient.cci) : ''}`;
};

/**
 * Form layout for long forms.
 *
 * Renders a fixed table of contents and toolbar, as well as section headers.
 * Expects `<LongForm.Section>` as children, each having a label.
 *
 * @example
 * import { LongForm } from '@react-admin/ra-form-layout';
 *
 * const CustomerEdit = () => (
 *     <Edit component="div">
 *         <LongForm>
 *             <LongForm.Section label="Identity">
 *                 <Labeled label="id">
 *                     <TextField source="id" />
 *                 </Labeled>
 *                 <TextInput source="first_name" validate={required()} />
 *                 <TextInput source="last_name" validate={required()} />
 *                 <DateInput source="dob" label="born" validate={required()} />
 *                 <SelectInput source="sex" choices={sexChoices} />
 *             </LongForm.Section>
 *             <LongForm.Section label="Occupations">
 *                 <ArrayInput source="occupations" label="">
 *                     <SimpleFormIterator>
 *                         <TextInput source="name" validate={required()} />
 *                         <DateInput source="from" validate={required()} />
 *                         <DateInput source="to" />
 *                     </SimpleFormIterator>
 *                 </ArrayInput>
 *             </LongForm.Section>
 *             <LongForm.Section label="Preferences">
 *                 <SelectInput
 *                     source="language"
 *                     choices={languageChoices}
 *                     defaultValue="en"
 *                 />
 *                 <BooleanInput source="dark_theme" />
 *                 <BooleanInput source="accepts_emails_from_partners" />
 *             </LongForm.Section>
 *         </LongForm>
 *     </Edit>
 * );
 */
export const LongFormView = ({ children, sx, toolbar }: LongFormViewProps) => {
    // section refs allow to build the table of contents automatically
    const nbSections = Children.count(children);
    const sectionRefs = useRef<HTMLElement[]>(new Array(nbSections));

    // track the scroll to highlight the current section
    const activeSection = useScrollSpy({
        sectionElements: sectionRefs.current,
        offsetPx: -80,
    });

    const translate = useTranslate();

    // track validation state of each group to change toc item color
    const { dirtyFields, touchedFields, errors, isSubmitted } = useFormState();
    const [formGroupStates, setFormGroupStates] = useState<{
        [key: string]: FieldState;
    }>({});
    const formGroups = useContext(FormGroupsContext);
    const updateGroupState = useCallback(
        // eslint-disable-next-line
        (label: string) => {
            const fields = formGroups.getGroupFields(label);
            const fieldStates = fields
                .map<FieldState>(field => {
                    return {
                        name: field,
                        error: get(errors, field, undefined),
                        isDirty: get(dirtyFields, field, false),
                        isValid: get(errors, field, undefined) == undefined, // eslint-disable-line
                        isTouched: get(touchedFields, field, false),
                    };
                })
                .filter(fieldState => fieldState != undefined); // eslint-disable-line
            const newState = getFormGroupState(fieldStates);
            setFormGroupStates((oldState: any) => {
                if (isEqual(oldState[label], newState)) {
                    return oldState;
                }
                return { ...oldState, [label]: newState };
            });
            // eslint-disable-next-line react-hooks/exhaustive-deps
        },
        [dirtyFields, errors, touchedFields, formGroups]
    );
    useEffect(
        () => {
            Children.toArray(children).map(section => {
                if (!isValidElement(section)) return;
                updateGroupState(section.props.label);
            });
        },
        // eslint-disable-next-line
        [
            // eslint-disable-next-line
            JSON.stringify({ dirtyFields, errors, touchedFields }),
            updateGroupState,
        ]
    );
    useEffect(() => {
        // Whenever the group content changes (input are added or removed)
        // we must update its state
        const subscriptions = Children.toArray(children).map(section => {
            if (!isValidElement(section)) return;
            return formGroups.subscribe(section.props.label, () => {
                updateGroupState(section.props.label);
            });
        });
        return () => {
            subscriptions.forEach(unsubscribe => {
                if (typeof unsubscribe === 'function') {
                    unsubscribe();
                }
            });
        };
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [formGroups, updateGroupState]);

    return (
        <Root sx={sx}>
            <Card className={LongFormViewClasses.toc}>
                <MenuList>
                    {Children.map(children, (formSection, index: number) =>
                        isValidElement(formSection) ? (
                            <MenuItem
                                selected={activeSection === index}
                                key={index}
                                onClick={() => {
                                    window.scrollTo(
                                        0,
                                        sectionRefs.current[index].offsetTop -
                                            60
                                    );
                                }}
                                className={
                                    !formGroupStates[formSection.props?.label]
                                        ?.isValid &&
                                    (formGroupStates[formSection.props?.label]
                                        ?.isTouched ||
                                        isSubmitted)
                                        ? LongFormViewClasses.error
                                        : ''
                                }
                            >
                                {translate(formSection.props?.label, {
                                    _: formSection.props?.label,
                                })}
                                {formSection.props?.cardinality
                                    ? ` (${
                                          (formSection as ReactElement)?.props
                                              ?.cardinality
                                      })`
                                    : null}
                            </MenuItem>
                        ) : null
                    )}
                </MenuList>
                <CardContent>
                    <FormDataConsumer>
                        {({ formData }: { formData: FormData }) => {
                            //@ts-ignore
                            const data = formData.message;
                            const mailto = getMailtoLink(data);
                            return (
                                <>
                                    <MailtoCheck mailto={mailto} />
                                    <MailtoLength mailto={mailto} />
                                    <PreviewLink />
                                    <PreviewQrCode />
                                </>
                            );
                        }}
                    </FormDataConsumer>
                </CardContent>
            </Card>
            <Card className={LongFormViewClasses.main}>
                <CardContent>
                    {Children.map(children, (formSection, index: number) =>
                        isValidElement<LongFormSectionProps>(formSection)
                            ? cloneElement<any>(formSection, {
                                  ref: (ref: any) => {
                                      if (ref == null) {
                                          return;
                                      }
                                      sectionRefs.current[index] = ref;
                                  },
                                  key: index,
                              })
                            : null
                    )}
                </CardContent>
                {toolbar ? (
                    cloneElement(toolbar, {
                        className: LongFormViewClasses.toolbar,
                    })
                ) : (
                    <Toolbar className={LongFormViewClasses.toolbar} />
                )}
            </Card>
            
        </Root>
    );
};

export interface LongFormViewProps {
    children?: ReactNode;
    className?: string;
    sx?: SxProps;
    toolbar?: ReactElement;
}

const PREFIX = 'RaLongForm';

export const LongFormViewClasses = {
    toc: `${PREFIX}-toc`,
    main: `${PREFIX}-main`,
    toolbar: `${PREFIX}-toolbar`,
    error: `${PREFIX}-error`,
};

const Root = styled('div', {
    name: PREFIX,
    overridesResolver: (props: any, styles) => styles.root,
})(({ theme }) => ({
    [`& .${LongFormViewClasses.toc}`]: { position: 'fixed', width: 200 },
    [`& .${LongFormViewClasses.main}`]: {
        marginLeft: '220px',
        overflow: 'visible',
    },
    [`& .${LongFormViewClasses.toolbar}`]: {
        position: 'sticky',
        bottom: 0,
        zIndex: 2,
    },
    [`& .${LongFormViewClasses.error}`]: {
        color: theme.palette.error.main,
    },
}));

type FieldState = {
    name: string;
    error?: any;
    isDirty: boolean;
    isTouched: boolean;
    isValid: boolean;
};
