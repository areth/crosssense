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
		Perception.remove();
    Signal.remove();
	});

	describe('Add perception and relations', function(){
		it('Should create new perception', function(){
			return Perception.add(perception)
				.then(function(perc){
					expect(perc.signal).to.equal(perception.signal);
					expect(perc.receptor).to.equal(perception.receptor);
					expect(perc).to.have.property('_signal').to.be.a('string');
					expect(perc).to.have.property('_valueScaled').to.equal(Signal.maxValueScale);
				});
		});
	});
});