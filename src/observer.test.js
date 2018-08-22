import createObserver from './observer';

describe('Observe', () => {
    const deviceId = 'deviceId';
    const sessionId = 'sessionId';
    const userToken = {
        type: 'type',
        status: 'status',
        country: 'country'
    };

    it('should add readonly propeties', () => {
        const sessionId = 'sessionId';
        const observer = createObserver();
        observer.readonly('session.id', sessionId);
        expect(observer.session.id).to.equal(sessionId);
        expect(() => {
            observer.session.id = 'id'
        }).to.throw(TypeError);
    });

    it('should add observable propeties', done => {
        const token = 'token';
        const oldToken = 'oldToken';
        const observer = createObserver();
        observer.observable('user.token');
        observer.user.token = oldToken;
        observer.subscribe('user.token', (newValue, oldValue) => {
            expect(newValue).to.equal(token);
            expect(oldValue).to.equal(oldToken);
            done();
        });
        observer.user.token = token;
    })
})