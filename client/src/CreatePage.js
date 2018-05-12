import React, { Component } from 'react';
//const config=require('../../config');
import TopicEditor from './TopicEditor';



export default class CreatePage extends Component {
    
    constructor(props) {
        super(props);
        this.hideHelp = this.hideHelp.bind(this);
        this.showHelp = this.showHelp.bind(this);
        this.state = {
            showHelp:false,
        }
        
       // console.log(['constr',this.state]);
    
    };
    

    
    showHelp(e) {
        this.setState({showHelp:true});
        return false;
    };
    hideHelp(e) {
        this.setState({showHelp:false});
        return false;
    };
    
    render() {
        if (true && this.props.isAdmin()) {
            return <div>
                <TopicEditor user={this.props.user} setQuizFromTopic={this.props.setQuizFromTopic} mnemonic_techniques={this.props.mnemonic_techniques}  setCurrentPage={this.props.setCurrentPage} />
            </div>
        } else {
            return (
            <div >
            
                  Mnemo's Library is just getting started and we want your help. <br/>  
                  <b>Coming soon</b> you will be able to add your own questions and mnemonics.<br/>
                  In the meantime, please email your ideas <a href='mailto:mnemoslibrary@gmail.com' >here.</a>
            </div>
            )
        };
        
    }
    

}
