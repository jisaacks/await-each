import {expect, default as chai} from 'chai';
import chaiAsPromised from 'chai-as-promised';
import _ from 'underscore';
import * as mock from './helpers.js';
import awaitEach from '../index.js';

chai.use(chaiAsPromised);

describe('await-each', function() {

  it('waits for each cb before iterating next', function() {

    return awaitEach(['a','b','c'], mock.fulfill).then(function(vals) {
      expect(vals).deep.equal(['a','b','c']);
    });

  });

  it('works even if cb does not return a promise', function() {

    return awaitEach(['a', 'b', 'c'], mock.noop).then(function(vals) {
      expect(vals).deep.equal(['a','b','c']);
    });

  });

  it('rejects if any of the callbacks do', function() {

    let prom = awaitEach(['a','b','c'], mock.reject);
    return expect(prom).to.be.rejectedWith('oops');

  });

  it('works with async awaits', function() {

    return awaitEach(['a','b','c'], mock.async).then(function(vals) {
      expect(vals).deep.equal(['a','b','c']);
    });
  
  });

  it('works with underscore', function() {
    _.mixin({awaitEach});

    return _.awaitEach(['a','b','c'], mock.fulfill).then(function(vals) {
      expect(vals).deep.equal(['a','b','c']);
    });
  });

});
