'use strict';

import app from '../..';
import request from 'supertest';
import User from '../user/user.model';
import Promise from 'bluebird';

export var user = {
	name: 'Fake User',
  email: 'test@example.com',
  password: 'password',
  // specify receptor to replace complex process of user creation
  receptor: 'fakereceptor'
};

export var token = "";

var multipleUsers = [];

export function createMultipleUsers(){
	if(multipleUsers.length){
		return Promise.resolve(multipleUsers);
	}

	for (let i = 0; i < 10; i++) {
		multipleUsers.push({
			name: 'Fake User '+i,
		  email: 'test'+i+'@example.com',
		  password: 'password'+i,
		  // specify receptor to replace complex process of user creation
  		receptor: 'fakereceptor'+i
		});
	}

	return Promise.map(multipleUsers, function(curUser){
		return User.create(curUser)
    	.then(function(userDB) {
	      curUser.receptor = userDB.receptor;
	      return request(app)
	        .post('/auth/local')
	        .send(curUser)
	        .set('skip-log', true)
	        .expect(200)
        	.expect('Content-Type', /json/)
	        // don't proceed error, pass it further
	        // .end((err, res) => {
	        //   console.log("result", res.body, err);
	        //   if(err) {
	        //     throw err;
	        //   }
	        //   curUser.token = res.body.token;
	        //   return curUser;
	        // });
	        .then(res => {
	          curUser.token = res.body.token;
	          return curUser;
	        });
    	});
	});
}