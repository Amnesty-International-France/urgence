export const defaultData = {
    title: '',
    story: [],
    call_to_action: '',
    recipient: {
        mail: '',
        copies_to: '',
        cci: '',
    },
    message_template: [],
    object_indication: '',
    email_thank: {
        title: '',
        text: '',
    },
    letter_thank: {
        title: '',
        text: '',
    },
};

export const defaultStory = {
    content: null,
    displayOptions: {
        backgroundColor: null,
        mediumPosition: null,
    },
    medium: null,
};

export const merge = (formData) => ({...defaultData, ...formData});