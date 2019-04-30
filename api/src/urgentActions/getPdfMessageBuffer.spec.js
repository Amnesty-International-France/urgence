import lolex from 'lolex';
import pdf from 'html-pdf';

import { createUrgentAction, truncateAll } from '../tests/fixtureLoader';
import { getPdfMessageBuffer } from './getPdfMessageBuffer';

describe('getPdfMessageBuffer', () => {
    const defaultUrgentAction = {
        recipient: {},
    };

    let clock;
    beforeEach(() => {
        clock = lolex.install({ now: new Date('2018-05-14 12:00:00') });
    });

    it('should display all chosen paragraphs', async () => {
        const pdfSpy = jest.spyOn(pdf, 'create');

        const urgentAction = {
            ...defaultUrgentAction,
            message_template: [
                { value: 'Dear Minister,' },
                {
                    value:
                        'I am appalled to hear about the detention of the second Amnesty International Turkey leader within the space of a month.',
                },
            ],
        };

        await getPdfMessageBuffer(urgentAction);

        const renderedLetter = pdfSpy.mock.calls[0][0];
        expect(renderedLetter).toContain('<p>Dear Minister,</p>');
        expect(renderedLetter).toContain(
            '<p>I am appalled to hear about the detention of the second Amnesty International Turkey leader within the space of a month.</p>',
        );
    });

    it('should display given subject', async () => {
        const pdfSpy = jest.spyOn(pdf, 'create');

        const urgentAction = await createUrgentAction();

        await getPdfMessageBuffer(urgentAction, 'Asking for a fair trial');
        const renderedLetter = pdfSpy.mock.calls[0][0];
        expect(renderedLetter).toContain('Asking for a fair trial');
    });

    it('should display passed fullname', async () => {
        const pdfSpy = jest.spyOn(pdf, 'create');

        await getPdfMessageBuffer(defaultUrgentAction, '', 'M.', 'John', 'Doe');
        const renderedLetter = pdfSpy.mock.calls[0][0];
        expect(renderedLetter).toContain('<p class="fullname">John Doe</p>');
    });

    it('should display emitter postal address', async () => {
        const pdfSpy = jest.spyOn(pdf, 'create');

        const urgentAction = {
            ...defaultUrgentAction,
            recipient: {
                postal_address: 'Aryeh Deri\n2 Kaplan Street',
            },
        };

        await getPdfMessageBuffer(urgentAction, 'subject', 'civility', 'firstname', 'lastname', '4, rue Girardet', 'sous-sol', '54000', 'Nancy', 'France');
        const renderedLetter = pdfSpy.mock.calls[0][0];
        expect(renderedLetter).toContain('4, rue Girardet');
        expect(renderedLetter).toContain('sous-sol');
        expect(renderedLetter).toContain('54000 NANCY');
        expect(renderedLetter).toContain('FRANCE');
    });

    it('should prefix address with fullname', async () => {
        const pdfSpy = jest.spyOn(pdf, 'create');

        const urgentAction = { ...defaultUrgentAction };
        await getPdfMessageBuffer(urgentAction, 'subject', 'civility', 'firstname', 'lastname', '4, rue Girardet', 'sous-sol', '54000', 'Nancy', 'France');

        const renderedLetter = pdfSpy.mock.calls[0][0];
        expect(renderedLetter).toMatchSnapshot();
    });

    it('should display recipient postal address', async () => {
        const pdfSpy = jest.spyOn(pdf, 'create');

        const urgentAction = {
            ...defaultUrgentAction,
            recipient: {
                postal_address: 'Aryeh Deri\n2 Kaplan Street',
            },
        };

        await getPdfMessageBuffer(urgentAction);
        const renderedLetter = pdfSpy.mock.calls[0][0];
        expect(renderedLetter).toContain('2 Kaplan Street');
    });

    it('should display current date', async () => {
        const pdfSpy = jest.spyOn(pdf, 'create');

        await getPdfMessageBuffer(defaultUrgentAction);

        const renderedLetter = pdfSpy.mock.calls[0][0];
        expect(renderedLetter).toContain('Le 14 mai 2018');
    });

    it('should respect line breaks in message template texts', async () => {
        const pdfSpy = jest.spyOn(pdf, 'create');

        const urgentAction = {
            ...defaultUrgentAction,
            message_template: [{ value: 'Dear Minister,\n\nBla bla bla' }],
        };

        await getPdfMessageBuffer(urgentAction);
        const renderedLetter = pdfSpy.mock.calls[0][0];
        expect(renderedLetter).toContain('Dear Minister,<br />');
    });

    afterEach(() => {
        if (clock) {
            clock.uninstall();
        }
    });
});
