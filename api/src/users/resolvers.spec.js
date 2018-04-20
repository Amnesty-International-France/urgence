describe('Users Resolvers', () => {
    describe('createToken', () => {
        it('should return a signed JWT token containing user data');
        it('should correctly set expiration date');
    });

    describe('login', () => {
        it('should return the signed token passing it the "admin" role in case of success');
        it("should throw an error if user credentials don't match those in configuration");
    });
});
