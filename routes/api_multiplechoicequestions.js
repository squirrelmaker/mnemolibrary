var express = require('express');
var router = express.Router();
var utils = require("../utils")
var alexaUtils = require("../alexa/alexautils")
var config = require("../config")
const Papa = require('papaparse')
var ObjectId = require('mongodb').ObjectID;
const get = require('simple-get');
const mustache = require('mustache');


let questionExists = {$and:[{question:{$exists:true,$ne: ""}} ]};
let answerExists = {$and:[{answer:{$exists:true,$ne: ""}}]};
let multiple_choiceExists = {$and:[{multiple_choices:{$exists:true,$ne: ""}} ]};
let topicExists = {$and:[{topic:{$exists:true,$ne: ""}}]};

let answerNotExists = {or:[{answer:{$exists:false}},{answer:{$in:[null, ""]}} ]};

//let questionNotExists = {or:[{question:{$exists:false}},{$where: "this.question.length == 0"} ]};
//let multiple_choiceNotExists = {$or:[{multiple_choice:{$exists:false}},{$where: "this.multiple_choice.length == 0"} ]};
//let topicNotExists = {$or:[{topic:{$exists:false}},{$where: "this.topic.length == 0"} ]};


function initRoutes(router,db) {
	
	router.post('/savemcquestion', (req, res) => {
		//console.log(['TRY save mc questions',req.body]);
		// stage 1 (ask question) - require question,user,questionId - set ask_date
		// stage 2 (answer question) - require answer, multiple_choice - set answer_date
		// stage 3 (publish question) - require topic (admin user) - set publish_date
		let data = {}
		if (req.body.user && req.body.user.length > 0) data.user = ObjectId(req.body.user)
		if (req.body.question && req.body.question.length > 0) data.question = req.body.question;
		if (req.body.questionId && req.body.questionId.length > 0) data.questionId = ObjectId(req.body.question)
		if (req.body.answer && req.body.answer.length > 0) data.answer = req.body.answer;
		if (req.body.multiple_choices && req.body.multiple_choices.length > 0) data.multiple_choices = req.body.multiple_choices;
		if (req.body.feedback && req.body.feedback.length > 0) data.feedback = req.body.feedback;

		let error = null;
		if (req.body.mode && req.body.mode === "ask") {
			if (!data.question) {
				error ='You need to provide a question'
				res.send({error:error});
			} else if (!data.questionId) {
				error = 'Missing related question ID'
				res.send({error:error});
			} else {
				data.createDate=new Date().getTime();
				db().collection('multiplechoicequestions').insertOne(data).then(function() {
					//console.log(['saved asked question',data]);
					res.send({ok:true})
				});
			}
		} else if (req.body.mode && req.body.mode === "answer") {
			if (!req.body._id) {
				error ='Invalid request missing question _id'
				res.send({error:error});
			} else if (!data.question) {
				error ='You need to provide a question'
				res.send({error:error});
			} else if (!data.answer) {
				error ='You need to provide an answer'
				res.send({error:error});
			}  else {
				data.createDate=new Date().getTime();
				db().collection('multiplechoicequestions').updateOne({_id:ObjectId(req.body._id)},{$set:data}).then(function() {
					//console.log(['saved answered question',data]);
					res.send({ok:true})
				});
			}
		} else if (req.body.mode && (req.body.mode === "publish" || req.body.mode === "save")) {
			if (!req.body._id) {
				error ='Invalid request missing question _id'
				res.send({error:error});
			} else if (!data.question) {
				error ='You need to provide a question'
				res.send({error:error});
			} else if (!data.answer) {
				error ='You need to provide an answer'
				res.send({error:error});
			} else if (!data.multiple_choice) {
				error = 'You need to provide at least one incorrect multiple choice answer'
				res.send({error:error});
			} else if (!req.body.topic) {
				error = 'You need to provide a topic'
				res.send({error:error});
			} else {
				data.topic = req.body.topic;
				data.createDate=new Date().getTime();
				db().collection('multiplechoicequestions').updateOne({_id:ObjectId(req.body._id)},{$set:data}).then(function() {
					//console.log(['saved published question',data]);
					res.send({ok:true})
				});
			}
		} else {
			res.send({error:'Invalid request missing mode'})
		}
	
		
	});
	
	router.post('/deletemcquestion', (req, res) => {
		if (req.body.user && req.body._id) {
			
			let filter = {$and:[{_id:{$eq:ObjectId(req.body._id)}},{user:{$eq:ObjectId(req.body.user)}}]}
			
			db().collection('multiplechoicequestions').deleteOne(filter).then(function() {
				//console.log(['deleted multiplechoicequestions',JSON.stringify(filter)]);
					res.send({ok:true})
				});
		} else {
			console.log('no delete invalid filter')
			res.send({ok:false})
		}
	});
	
	router.post('/submitmcquestion', (req, res) => {
		if (req.body.user && req.body._id && req.body.answer) {
			db().collection('multiplechoicequestions').findOne({_id:ObjectId(req.body._id)}).then(function(mcQuestion) {
				if (mcQuestion.seenBy.hasOwnProperty(req.body.user)) {
					res.send({error:'You have already answered this question'});
				} else if (mcQuestion.answer === req.body.answer) {
					mcQuestion.seen = mcQuestion.seen ? mcQuestion.seen + 1 : 1; 
					mcQuestion.success = mcQuestion.success ? mcQuestion.success + 1 : 1;
					let seenBy = mcQuestion.seenBy ? mcQuestion.seenBy : {};
					seenBy[req.body.user] = req.body.answer;
					mcQuestion.seenBy = seenBy;
					db().collection('multiplechoicequestions').updateOne({_id:ObjectId(req.body._id)},{$set:mcQuestion}).then(function() {
						console.log(['submitted  question',data]);
						res.send({correct:true,overallPercentCorrect:mcQuestion.success/mcQuestion.seen});
					});
				} else {
					mcQuestion.seen = mcQuestion.seen ? mcQuestion.seen + 1 : 1; 
					mcQuestion.success = mcQuestion.success ? mcQuestion.success  : 1;
					let seenBy = mcQuestion.seenBy ? mcQuestion.seenBy : {};
					seenBy[req.body.user] = req.body.answer;
					mcQuestion.seenBy = seenBy;
					db().collection('multiplechoicequestions').updateOne({_id:ObjectId(req.body._id)},{$set:mcQuestion}).then(function() {
						console.log(['submitted  question',data]);
						res.send({correct:false,overallPercentCorrect:mcQuestion.success/mcQuestion.seen,seen:mcQuestion.seen});
					})
				}
			});
		}
	});
	
	
	
	router.get('/mcquestions', (req, res) => {
		//console.log(['FIND mc questions',req.query])
		let filter = []
		// filter by question
		if (req.query.questionId) {
			filter.push({questionId : {$eq: ObjectId(req.query.questionId)}});
		}	
		// filter by topic
		if (req.query.topic) {
			filter.push({topic : {$regex:req.query.topic}});
		}
		
		
		// filter incomplete
		if (req.query.status === 'all') {
			//filter.push({$and:[]});
		} else if (req.query.status === 'complete') {
			filter.push({$and:[questionExists,answerExists,multiple_choiceExists,topicExists]});
		} else if (req.query.status === 'answered') {
			filter.push({$and:[questionExists,answerExists]});
		} else if (req.query.status === 'asked') {
			filter.push({$and:[questionExists,answerNotExists]});
		// default show only complete
		} else {
			filter.push({$and:[questionExists,answerExists,multiple_choiceExists,topicExists]});
		}
		
		//console.log(['FIND mc questions',JSON.stringify({$and:filter})])
		db().collection('multiplechoicequestions').find({$and:filter}).sort({createDate:-1}).limit(req.query.limit > 0 ? req.query.limit : 10).toArray(function(err,results) {
		//	console.log(['FOUND mc questions',err,results])
			res.send(results)
		});

	});
	
	router.get('/mctopics', (req, res) => {
		//console.log(['FIND mc topics',req.query])
		////console.log(['topics',req.body]);
		let search = req.query.filter;
			
			db().collection('multiplechoicequestions').aggregate([
				// complete questions only
				{ $match: {$and:[questionExists,answerExists,multiple_choiceExists,topicExists]}},// 
				{ $group: {
					_id : "$topic",
					tally: { $sum: 1 }
				}}
			], function (err, result) {
				if (err) {
					console.log(err);
					return;
				}
				result.toArray().then(function(results) {
					
					//console.log(results);
					let final={};
					results.map(function(topic) {
						let key = topic._id;
			  //          //console.log([search,key,val]);
						if (search && search.length > 0) {
							if (key.toLowerCase().indexOf(search.toLowerCase()) >= 0) {
								final[key]={topic:key,tally:topic.tally};
							}
						 } else {
							final[key]={topic:key,tally:topic.tally};
						}
						if (req.query.user) {
							final[key].userTally = 0;
						}
					});
					// add user seen tally
					if (req.query.user) {
						let userMatch='seenBy.'+req.query.user
						let userFilter={}
						userFilter[userMatch] = {$exists:true}
						db().collection('multiplechoicequestions').aggregate([
							// complete questions only
							{ $match: {$and:[userFilter,questionExists,answerExists,multiple_choiceExists,topicExists]}},// 
							{ $group: {
								_id : "$topic",
								tally: { $sum: 1 }
							}}
						], function (err, userResultsa) {
							if (err) {
								console.log(err);
								return;
							}
							userResultsa.toArray().then(function(userResults) {
							//	console.log(['USER RESULTS',userResults])
								userResults.map(function(userResult) {
									if (userResult && userResult._id && final.hasOwnProperty(userResult._id)) {
										final[userResult._id].userTally = userResult.tally;
									}
									return;
								});
								let sorted = Object.values(final);
								sorted.sort(function(a,b) {
									if (a.topic < b.topic) {
										return -1 
									} else {
										return 1;
									}
								});
								res.send(sorted);
							})
						})
					} else {
						let sorted = Object.values(final);
						sorted.sort(function(a,b) {
							if (a.topic < b.topic) {
								return -1 
							} else {
								return 1;
							}
						});
						res.send(sorted);
					}
					
					//console.log(['GET TOPICS FINALLY',final]);
					
				})
			})
	});
	

};


module.exports = initRoutes;