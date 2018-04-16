const headers = require('./headers');

describe('Headers Middleware', () => {
    let req;
    let res;
    let next;

    beforeEach(() => {
        req = {};
        res = { setHeader: jest.fn() };
        next = jest.fn();
    });

    it('should add correct JSON content-type', () => {
        headers(req, res, next);
        expect(res.setHeader).toHaveBeenCalledWith('Content-Type', 'application/json');
    });

    it('should call next middleware', () => {
        headers(req, res, next);
        expect(next).toHaveBeenCalled();
    });
});
