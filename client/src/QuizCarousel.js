import React, { Component } from 'react';
import Utils from './Utils';
import FindQuestions from './FindQuestions';
import SingleQuestion from './SingleQuestion';
import QuestionList from './QuestionList';
import Play from 'react-icons/lib/fa/play';

export default class QuizCarousel extends Component {
    constructor(props) {
        super(props);
        this.state={
            //'indexedQuestions':this.props.indexedQuestions,
            //'questions':this.props.questions,
            //'currentQuiz':this.props.currentQuiz  ,
            'currentQuestion':0,
            'quizComplete': false,
            'showList':false,
            'isReview': (this.props.isReview ? true : false),
            'success' : []
        };
        this.handleQuestionResponse = this.handleQuestionResponse.bind(this);
        this.currentQuestion = this.currentQuestion.bind(this);
        this.getQuestions = this.getQuestions.bind(this);
        this.setQuizQuestion = this.setQuizQuestion.bind(this);
        this.finishQuiz = this.finishQuiz.bind(this);
        this.logStatus = this.logStatus.bind(this);
        console.log(['QUIZ carousel constr']);
    };
    
    componentDidMount() {
       // console.log(['QUIZ CAR DID MOUNT',this.state.currentQuiz,this.props.questions]);
       
            
    };
    
   

    
  isQuizFinished(quiz) {
      if (this.props.isReview) {
          return this.state.success.length === this.props.currentQuiz.length;
      } else {
          return this.state.currentQuestion === this.props.currentQuiz.length - 1;
      }
      
  };  
      
  logStatus(status,question) {
     // console.log(['log status',status,question]);
      if (this.props.user) {
          if (!question) question = this.props.questions[this.props.indexedQuestions[this.state.currentQuestion]]._id;
          let that = this;
           // central storage
             fetch('/api/'+status, {
              method: 'POST',
              headers: {
                'Content-Type': 'application/json'
              },
              body: JSON.stringify({'user':this.props.user._id,'question':question})
            }).catch(function(err) {
                that.setState({'message':'Not Saved'});
            });
        }
  };    
      
  // handle user click on Remember, Forgot, Skip, Ban
  // update user questions history and remove question from current Quiz
  handleQuestionResponse(question,response) {
      let user = this.props.progress;
      let questions = user.questions;
      this.props.setMessage('');
      const id = question._id;
      //console.log(['handle response',response,id,question]);
      const time = new Date().getTime();
      if (response === "list") {
         this.setState({'showList':true});  
      } else if (response === "success") {
          //if (!questions.seen.hasOwnProperty(id)) 
          questions.seen[id] = time;
          //this.logStatus('seen',id);
          questions.seenTally[id] = questions.seenTally.hasOwnProperty(id) ? questions.seenTally[id] + 1 : 1;
          //questions.review[id].push(time);
          if (this.isQuizFinished()) {
               this.logStatus('success',id);
              this.finishQuiz(this.state.questions,this.state.success);
            }  else {
                // local collate success ids for finishQuiz function
                const time = new Date().getTime();
                let success = this.state.success;
                if (!success.includes(this.state.currentQuestion)) {
                    success.push(this.state.currentQuestion);
                }
                questions.success[id]=time;
                questions.successTally[id] = questions.successTally.hasOwnProperty(id) ? questions.successTally[id] + 1 : 1;
                this.setState({ 'success': success, 'currentQuestion':this.state.currentQuestion + 1});
                this.logStatus('success',id);
            }
      } else if (response === "previous") {
          //if (!questions.seen.hasOwnProperty(id)) 
          questions.seen[id] = time;
          questions.seenTally[id] = questions.seenTally.hasOwnProperty(id) ? questions.seenTally[id] + 1 : 1;
          this.logStatus('seen',id);
          let currentId =this.state.currentQuestion - 1;
          if (this.state.currentQuestion > 0 && this.props.currentQuiz.length > 0) {
              this.setState({'currentQuestion':currentId});
          }
          
      } else if (response === "next") {
          //if (!questions.seen.hasOwnProperty(id)) 
          questions.seen[id] = time;
          questions.seenTally[id] = questions.seenTally.hasOwnProperty(id) ? questions.seenTally[id] + 1 : 1;
          this.logStatus('seen',id);
          if (this.props.currentQuiz.length > 0) {
            if (this.isQuizFinished()) {
              this.finishQuiz();
            }  else {
               this.setState({'currentQuestion':this.state.currentQuestion + 1});
            }
              
          } 
          
      } else if (response === "block") {
          // flag as blocked
      //    console.log(['block',id]);
          if (id.length > 0) { 
              questions.block[id] = time;
               console.log(['block logged a']);
               this.logStatus('block',id);
               console.log(['block logged']);
          }
          // quiz complete ?
          if (this.props.currentQuiz.length > 0) {
            if (this.isQuizFinished()) {
              this.finishQuiz();
            }  else {
                // move forward one question and strip blocked questions from currentQuiz 
                let currentQuestion = this.state.currentQuestion;
                let currentQuiz = this.props.currentQuiz;
                currentQuiz.splice(currentQuestion,1);
                this.setState({'currentQuestion':this.state.currentQuestion + 1});
                this.props.setCurrentQuiz(currentQuiz);
            }
          }
      }
      this.props.updateProgress(user);
  }; 
    
    currentQuestion() {
        console.log(['currentQuestion',this.state]);
        let question=null;
        if (this.state.currentQuestion !== null && Array.isArray(this.props.currentQuiz) && this.props.indexedQuestions && this.props.questions) {
            question = this.props.questions[this.props.indexedQuestions[this.props.currentQuiz[this.state.currentQuestion]]];
        
        }
        return question;
    };
    
       // FINISH QUIZ CAROUSEL
   finishQuiz() {
       console.log(['finish quiz',this.props.finishQuiz]);
        // inject override
       if (this.props.finishQuiz) {
            this.props.finishQuiz(this.props.questions,this.state.success);
        } else {
           this.props.setCurrentPage('home');
           this.props.setMessage('You added '+((this.props.questions && this.props.questions.length)?this.props.questions.length:'')+' questions to your knowledge base.') ;
        }
   }; 
   
    
    getQuestions(questionIds) {
        let questions=[];
        let that = this;
        questionIds.forEach(function(questionId) {
            let question = that.props.questions[that.props.indexedQuestions[questionId]];
            questions.push(question);
        });
        return questions;
    };
    
    setQuizQuestion(question) {
      //  console.log(['set quiz ques',question]);
        if (Utils.isObject(question) && question._id && question._id.length > 0) {
        //    console.log(['setQuizQuestion',question]);
            let index = this.props.currentQuiz.indexOf(question._id);
            this.setState({'showList':false,'currentQuestion':index});
        }
    };
    
    render() {
        let questions = this.props.currentQuiz;
        //console.log(['RENDER CAROUS',questions]);
        //if (Array.isArray(questions) && questions.length > 0) {
            
        //} else if (this.props.discoverQuestions) {
            //questions = this.props.discoverQuestions();
        //}
      //  console.log(['RENDER CAROUS2',questions]);
        let content = '';
        const question = this.currentQuestion();
        console.log(['RENDER CAROUS2',question,questions]);
        if (Array.isArray(questions) && questions.length > 0 && Utils.isObject(question)) {
            if (this.state.showList) {
                let listQuestions = this.getQuestions(this.props.currentQuiz);
                let label='Start' ;
                if (this.state.currentQuestion > 0) {
                    label='Continue' ;
                }
                content = (<div><button className='btn btn-info' onClick={() => this.setQuizQuestion(this.currentQuestion())}   ><Play size={25} /> {label}</button><QuestionList questions={listQuestions} setQuiz={this.setQuizQuestion}  ></QuestionList></div>);
            } else {
                // single question
                content = (<SingleQuestion question={question} user={this.props.user} successButton={this.props.successButton} handleQuestionResponse={this.handleQuestionResponse}  like={this.props.like} isLoggedIn={this.props.isLoggedIn}/> )
            }
        
        } else {
            //console.log(['ren',question,questions]);
           // content = (<div>{JSON.stringify(question)} - {questions} </div>)
            // no matching questions
            content = (<div><FindQuestions setCurrentPage={this.props.setCurrentPage} /></div>)
        }
                
        return (
            <div className='quiz-carousel'>
                {content}
            </div>
        )
    }
};