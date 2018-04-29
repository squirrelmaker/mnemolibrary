import React, { Component } from 'react';
import QuizList from './QuizList';
import QuizCollection from './QuizCollection';
import Utils from './Utils';
//import FaClose from 'react-icons/lib/fa/close';
import CreateHelp from './CreateHelp';
import Autocomplete from 'react-autocomplete';

export default class QuestionEditor extends Component {
    constructor(props) {
        super(props);
        //let question = this.props.question ? this.props.question : {};
        
        this.state={
            warning_message: '',
            //question : {
                //_id: question._id ? question._id : '',
                //interrogative: question.interrogative ? question.interrogative:'What is ',
                //question:question.question?question.question:'',
                //mnemonic:question.mnemonic?question.mnemonic:'',
                //technique:question.technique?question.technique:'',
                //answer:question.answer?question.answer:'',
                //topic:question.topic?question.topic:'',
                //link:question.link?question.link:'', 
                //tags:question.tags?question.tags:''
            //},
            
        };
       // this.saveQuestion = this.saveQuestion.bind(this);
        this.change = this.change.bind(this);
        this.changeInterrogative = this.changeInterrogative.bind(this);
    };
    
    componentDidMount() {
        
    }
    
    //saveQuestion(e) {
        //e.preventDefault();
        //var that = this;
        //that.setState({'warning_message':''});
        ////console.log('save user ',this.state.user);
        //var data = {...this.props.question}
        //this.props.saveQuestion(data,this);  
            
    //};
    
    change(e) {
        console.log(e.target);
        let state = {...this.props.question};
        var key = e.target.name;
        if (key==="tags") {
            state[key] =  e.target.value.split(",");
        } else {
            state[key] =  e.target.value;
        }
        
        console.log(['CHANGE',this.props.currentQuestion,state]);
        //this.setState({'question':state});
        this.props.updateQuestion(state);
        return true;
    };
    
    changeInterrogative(e,value) {
        let state = {...this.props.question};
        state.interrogative =  value;
        //console.log(['CHANGE',this.props.currentQuestion,state]);
        //this.setState({'question':state});
        this.props.updateQuestion(state);
        return true;
    };
    
    selectInterrogative(value) {
        let state = {...this.props.question};
        var key = 'interrogative';
        state[key] =  value;
        //this.setState({'question':state});
        console.log(['sel inter',value]);
        this.props.updateQuestion(state);
        return true;
    };
    
    render() {
        console.log(['QE REN',this.props]);
        if (this.props.question) {
          let techniques = this.props.mnemonic_techniques.map((technique, key) => {
                return <option  key={key} value={technique}  >{technique}</option>
            })
            return (
            
            // TAGS https://www.npmjs.com/package/react-tag-autocomplete
                <div className="questionform card">
                    <div className="" >
                        <div className='warning-message'>{this.state.warning_message}</div>
                            
                            
                        <div className='form-inline'>
                            <label htmlFor="interrogative">*&nbsp;Interrogative </label>
                            <Autocomplete
                              getItemValue={(item) => item.label}
                              items={[
                                { label: 'Can you explain' },
                                { label: 'What is' },
                                { label: 'Who is' },
                              ]}
                              renderItem={(item, isHighlighted) =>
                                <div key={item.label} style={{ background: isHighlighted ? 'lightgray' : 'white' }}>
                                  {item.label}
                                </div>
                              }
                              value={this.props.question.interrogative}
                              onChange={this.changeInterrogative}
                              onSelect={(val) => this.selectInterrogative(val)}
                              className='col-4 form-control'  autoComplete="false" id="interrogative" type='text' name='interrogative'
                            />
                         </div>
                        <div className='form-inline'>    
                           
                            <label htmlFor="question" >*&nbsp;Question </label><input autoComplete="false" id="question" type='text' name='question' onChange={this.change} value={this.props.question.question} className='form-control' />
                        </div>
                        <div className='form-group'>    
                           <label htmlFor="mnemonic" >*&nbsp;Mnemonic </label><textarea autoComplete="false" id="mnemonic" type='text' name='mnemonic' onChange={this.change} value={this.props.question.mnemonic} className='form-control'></textarea>
                            <br/>
                        </div>
                        
                        <div className='form-inline'>    
                          
                             <label htmlFor="technique" >Technique</label><select autoComplete="false" id="technique" type='text' name='technique' onChange={this.change} value={this.props.question.technique} className='col-5 form-control' ><option/>{techniques}</select>
                        </div>
                        
                        <div className='form-group'>    
                            <label htmlFor="tags" >*&nbsp;Tags</label><input autoComplete="false" id="tags" type='text' name='tags' onChange={this.change} value={this.props.question.tags} className='form-control' />
                        </div>
                        
                        <div className='form-group'>     
                                <label htmlFor="link" >Link </label><input autoComplete="false" id="link" type='text' name='link' onChange={this.change} value={this.props.question.link}  className='form-control' />
                        </div>
                        
                         <div className='form-group'>     
                                <label htmlFor="link" >Image </label><input autoComplete="false" id="image" type='text' name='image' onChange={this.change} value={this.props.question.image}  className='form-control' />
                        </div>
                        
                        <div className='form-group'>    
                            <label htmlFor="answer" >Answer </label><textarea autoComplete="false" id="answer" type='text' name='answer' onChange={this.change} value={this.props.question.answer} className='form-control' ></textarea>
                        </div>
                        
                    </div>
                     
                    <br/>
            </div>
            )
        } else return '';
            
    }
};

  //<form method="POST" onSubmit={this.saveUser} className="form-group" autoComplete="false" >
                     //</form>
