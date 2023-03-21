export const sendMailSpy = jest.fn();

const transport = {
    verify: jest.fn(),
    sendMail: sendMailSpy,
};

export const createTransport = () => transport;
