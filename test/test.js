/**
 * Created by Gbo on 7/14/2016.
 */
import {expect} from 'chai';
import sinon from 'sinon';
import debuglog from "loglevel";
import loglevelServerSend from '../loglevel-serverSend.js';

debuglog.setLevel(1);

loglevelServerSend(debuglog,{url:'https://example.com/app/log',prefix: function(logSev,message) {
    return '[' + new Date().toISOString() + '] ' + logSev + ': ' + message + '\n'
}, callOriginal: true});


describe('#logelevelServerSend', function() {

    let mock;

    it('should not be 42', function() {
        this.req = sinon.useFakeXMLHttpRequest();
        this.requests = [];
        this.req.onCreate = function(xhr) {
            this.requests.push(xhr);
        }.bind(this);

        mock = sinon.mock(console);

        mock.expects('info').withExactArgs('info').once();
        mock.expects('warn').withExactArgs('warn').once();

        debuglog.info('info');
        debuglog.warn("warn");

        mock.restore();
        mock.verify();
        this.req.restore();
    });

    it('should be 43', function() {
        var answer = 43;

        // AssertionError: expected 43 to equal 42.
        expect(answer).to.equal(43);
    });
});