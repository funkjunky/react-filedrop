'use strict';

import React from 'react';
import { expect } from 'chai';
import { shallow } from 'enzyme';
import sinon from 'sinon';

import FileDrop from '../filedrop.jsx';

describe('FileDrop', () => {
    const hoverStyle = { color: 'red' };
    const activeStyle = { color: 'green' };
    const hoverClass = 'hover';
    const activeClass = 'active';
    const FileDropChild = <p>Hello</p>;
    const onDrop = sinon.spy();
    const id = 1;

    const rootTarget = { target: { id } }; //used for the local events

    it('Should contain its children', () => {
        const fileDrop = shallow(<FileDrop { ...{ hoverStyle, activeStyle, hoverClass, activeClass, onDrop, id } }>{ FileDropChild }</FileDrop>);
        expect(fileDrop.contains(FileDropChild)).to.be.true;
    });

        /*
    describe('When drag starts', () => {
        const fileDrop = shallow(<FileDrop { ...{ hoverStyle, activeStyle, hoverClass, activeClass, onDrop, id } }>{ FileDropChild }</FileDrop>);
        //TODO: figure out how to test this part.
        const rootDiv = document.simulate('dragenter');

        it('Should have start style', () => {
            expect(rootDiv).to.have.style('color', activeStyle.color);
        });

        it('Should have start class', () => {
            expect(rootDiv).to.have.className('color', activeClass);
        });
    });

    describe('When drag ends', () => {
        const fileDrop = shallow(<FileDrop { ...{ hoverStyle, activeStyle, hoverClass, activeClass, onDrop, id } }>{ FileDropChild }</FileDrop>);
        //TODO: figure out how to test this part.
        const rootDiv = fileDrop.first().simulate('dragleave');

        it('Should have start style', () => {
            expect(rootDiv).to.not.have.style('color');
        });

        it('Should have start class', () => {
            expect(rootDiv).to.not.have.className(activeClass);
        });
    });
    */

    describe('When dragging enters our element', () => {
        const fileDrop = shallow(<FileDrop { ...{ hoverStyle, activeStyle, hoverClass, activeClass, onDrop, id } }>{ FileDropChild }</FileDrop>);
        const rootDiv = fileDrop.first().simulate('dragenter', rootTarget);

        it('Should have enter style', () => {
            expect(fileDrop.first()).to.have.style('color', hoverStyle.color);
        });

        it('Should have enter class', () => {
            expect(fileDrop.first()).to.have.className(hoverClass);
        });
    });

    describe('When dragging leaves our element', () => {
        const fileDrop = shallow(<FileDrop { ...{ hoverStyle, activeStyle, hoverClass, activeClass, onDrop, id } }>{ FileDropChild }</FileDrop>);
        fileDrop.first().simulate('dragenter', rootTarget);
        const rootDiv = fileDrop.first().simulate('dragleave', rootTarget);

        it('Should have leave style', () => {
            expect(fileDrop.first()).to.not.have.style('color');
        });

        it('Should have leave class', () => {
            expect(fileDrop.first()).to.not.have.className(hoverClass);
        });
    });

    describe('When file dropped on element', () => {
        const fileDrop = shallow(<FileDrop { ...{ hoverStyle, activeStyle, hoverClass, activeClass, onDrop, id } }>{ FileDropChild }</FileDrop>);
        const rootDiv = fileDrop.first().simulate('drop', { preventDefault: () => {} });

        it('Should call prop onDrop with event', () => {
            expect(onDrop).to.have.property('callCount', 1);
        });
    });
});
