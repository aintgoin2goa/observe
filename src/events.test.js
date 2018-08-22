import {beforeEach, it} from 'arrow-mocha';

import events from './events';

const waitFor = t => new Promise(r => setTimeout(r, t));

describe('pubsub', () => {
    beforeEach(t => {
        Object.assign(t, events());
    });
    
    it('Should be able to to subscribe to an event', t => {
        const spy = sinon.spy();
        const event = 'event';
        const data = {};
        t.subscribe(event, spy);
        t.publish(event, data);
        return waitFor(100).then(() => {
            expect(spy).to.have.been.calledWith(data);
        })
    });
})