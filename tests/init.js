import chai from 'chai';
import chaiEnzyme from 'chai-enzyme';
import { jsdom } from 'jsdom';

chai.use(chaiEnzyme());

const doc = jsdom('<!doctype html><html><body></body></html>');
const win = doc.defaultView;

global.document = doc;
global.window = win;
// global.assert = assert;

Object.keys(window).forEach((key) => {
    if (!(key in global)) {
        global[key] = window[key];
    }
});
