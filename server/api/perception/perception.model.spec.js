'use strict';

import Perception from './perception.model';
import Signal from '../signal/signal.model';

var perception = {
	signal: 'TempSignal',
	receptor: 'TempReceptor',
	value: 0.56
};

describe('Perception model', function(){
	after(function(){
		return Perception.find(perception).remove().exec()
			.then(function(){
				return Signal.findById(perception.signal).remove().exec();
			});
	});

	describe('Add perception and relations', function(){
		it('Should create new perception', function(){
			return Perception.add(perception)
				.then(function(perc){
					expect(perc.signal).to.equal(perception.signal);
					expect(perc.receptor).to.equal(perception.receptor);
				});
		});
	});
});