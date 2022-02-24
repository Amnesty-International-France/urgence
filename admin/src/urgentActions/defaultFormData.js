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
    object_example: '',
    email_thank: {
        title: '',
        text: '',
    },
    end_thank: {
        title: '',
        text: '',
    },
    register: {
        text: '',
        button: '',
    },
    social_metadata: {
        title: '',
    }
};

export const defaultStory = {
    content: null,
    displayOptions: {
        backgroundColor: null,
        mediumPosition: null,
    },
    medium: null,
};

const removeUndefinedProperties = object => {
    const cleanedObject = { ...object };
    Object.keys(cleanedObject).forEach(key => {
        if (cleanedObject[key] === undefined) {
            delete cleanedObject[key];
        }
    });
    return cleanedObject;
};

export const merge = formData => ({ ...defaultData, ...removeUndefinedProperties(formData) });
