import React, { Component } from 'react';

// icons
import Check from 'react-icons/lib/fa/check';
import ArrowRight from 'react-icons/lib/fa/arrow-right';
import ArrowLeft from 'react-icons/lib/fa/arrow-left';
import Trash from 'react-icons/lib/fa/trash';
import Music from 'react-icons/lib/fa/music';
import Info from 'react-icons/lib/fa/info';
import Ellipsis from 'react-icons/lib/fa/ellipsis-v';
//import ThumbsUp from 'react-icons/lib/fa/thumbs-up';
import Image from 'react-icons/lib/fa/image';
//import Ban from 'react-icons/lib/fa/ban';
import Search from 'react-icons/lib/fa/search';
import Tags from 'react-icons/lib/fa/tags';
import ExternalLink from 'react-icons/lib/fa/external-link';
import ConnectDevelop from 'react-icons/lib/fa/connectdevelop';
import Close from 'react-icons/lib/fa/close';
//import Book from 'react-icons/lib/fa/book';
import ShareAlt from 'react-icons/lib/fa/share-alt';
import ShareDialog from './ShareDialog';

import scrollToComponent from 'react-scroll-to-component';
import MnemonicsList from './MnemonicsList';
import Utils from './Utils';
import ProblemReport from './ProblemReport';
//import Swipe from 'react-swipe-component';
import Swipeable from 'react-swipeable'
//import ThumbsDown from 'react-icons/lib/fa/thumbs-down';

import ExclamationTriangle from 'react-icons/lib/fa/exclamation-triangle';
import "video-react/dist/video-react.css"; // import css
import { Player } from 'video-react';

export default class SingleQuestion extends Component {
    
    constructor(props,context) {
        super(props,context);
        this.player = null;
        this.setPlayerRef = element => {
          this.player = element;
          if (this.player) this.player.subscribeToStateChange(this.handleStateChange.bind(this));
        };
        this.state = {swipeable:true,'visible':[],playerHeight:50,playerWidth:400}
        this.setVisible = this.setVisible.bind(this);
        this.toggleMedia = this.toggleMedia.bind(this);
        this.isVisible = this.isVisible.bind(this);
        this.hideAll = this.hideAll.bind(this);
        this.setDiscoveryBlock = this.setDiscoveryBlock.bind(this);
        this.swipeLeft = this.swipeLeft.bind(this);
        this.swipeRight = this.swipeRight.bind(this);
        this.disableSwipe = this.disableSwipe.bind(this);
        this.enableSwipe = this.enableSwipe.bind(this);
        this.handleQuestionResponse = this.handleQuestionResponse.bind(this);
        this.scrollTo={};
        this.questionmessage='';
    };
    
    disableSwipe() {
        this.setState({swipeable:false});
    };
    
    
    enableSwipe() {
        this.setState({swipeable:true});
    };
    
    swipeLeft(question) {
        if (this.state.swipeable) {
            this.handleQuestionResponse(question,'next')
        }
        
    };
    swipeRight(question) {
        if (this.state.swipeable) {
            this.handleQuestionResponse(question,'previous')
        }
    };
    
      componentDidMount() {
        // subscribe state change
        //this.refs.player.subscribeToStateChange(this.handleStateChange.bind(this));
        scrollToComponent(this.scrollTo['topofpage'],{align:'top',offset:-230});
        if (this.props.question) {
            let question=this.props.question
            let media=<Player
              ref={this.setPlayerRef}
              playsInline
              autoPlay={true}
              height={this.state.playerHeight}
              width={this.state.playerWidth}
              fluid={false}
            >
            {question.media && <source src={question.media} />}
            {question.media_ogg && <source src={question.media_ogg} />}
            {question.media_webm && <source src={question.media_webm} />}
            {question.media_mp4 && <source src={question.media_mp4} />}
            
            {question.media_mp3 && <source src={question.media_mp3} />}
            {question.media_mp4 && <source src={question.media_mp4} />}
            {question.media_webmvideo && <source src={question.media_webmvideo} />}
            {question.media_webmaudio && <source src={question.media_webmaudio} />}
            
            
            </Player>
            this.setState({media:media});
        }
      }
      
      hasMedia(question) {
         // console.log(['HASMEDIA',question]);
          if (question.media ||
            question.media_ogg ||
            question.media_webm ||
            question.media_mp4 ||
            
            question.media_mp3 ||
            question.media_mp4 ||
            question.media_webmvideo ||
            question.media_webmaudio
            )  {
                return true;
            } else {
                return false;
            }
      };

      handleStateChange(state, prevState) {
          function getOS() {
              var userAgent = window.navigator.userAgent,
                  platform = window.navigator.platform,
                  macosPlatforms = ['Macintosh', 'MacIntel', 'MacPPC', 'Mac68K'],
                  windowsPlatforms = ['Win32', 'Win64', 'Windows', 'WinCE'],
                  iosPlatforms = ['iPhone', 'iPad', 'iPod'],
                  os = null;

              if (macosPlatforms.indexOf(platform) !== -1) {
                os = 'Mac OS';
              } else if (iosPlatforms.indexOf(platform) !== -1) {
                os = 'iOS';
              } else if (windowsPlatforms.indexOf(platform) !== -1) {
                os = 'Windows';
              } else if (/Android/.test(userAgent)) {
                os = 'Android';
              } else if (!os && /Linux/.test(platform)) {
                os = 'Linux';
              }

              return os;
          }  
          
        // copy player state to this component's state
        //console.log(['statechange',state,prevState]);
        
        if (state.ended && getOS() !== 'iOS') {
            this.toggleMedia();
        }
        if (state.videoHeight > 0) {
            if (this.state.playerHeight !== state.videoHeight) {
                this.setState({'playerHeight':state.videoHeight});   
                this.setState({'playerWidth':state.videoWidth});   
            }
           
        } else {
            this.setState({'playerHeight':50});   
            this.setState({'playerWidth':400});   
        }
        //this.setState({
          //player: state
        //});
      }
    
     componentWillReceiveProps(props) {
         let that=this;
         console.log(['rcv props',props]);
       // if (this.refs.player) this.refs.player.subscribeToStateChange(this.handleStateChange.bind(this));
        scrollToComponent(this.scrollTo['media'],{align:'top',offset:-230});
        if (props.question) {
            let question=props.question
            let media=<Player
              ref={this.setPlayerRef}
              playsInline
              autoPlay={true}
              height={this.state.playerHeight}
              width={this.state.playerWidth}
              fluid={false}
            >
            {question.media && <source src={question.media} />}
            {question.media_ogg && <source src={question.media_ogg} />}
            {question.media_webm && <source src={question.media_webm} />}
            {question.media_mp4 && <source src={question.media_mp4} />}
            
            {question.media_mp3 && <source src={question.media_mp3} />}
            {question.media_mp4 && <source src={question.media_mp4} />}
            {question.media_webmvideo && <source src={question.media_webmvideo} />}
            {question.media_webmaudio && <source src={question.media_webmaudio} />}
            </Player>
            setTimeout(function() {
                    that.setState({media:media});
            },100);
            
        }
        //this.toggleMedia();
        //this.toggleMedia();
    };
    
    removeA(arr) {
        var what, a = arguments, L = a.length, ax;
        while (L > 1 && arr.length) {
            what = a[--L];
            while ((ax= arr.indexOf(what)) !== -1) {
                arr.splice(ax, 1);
            }
        }
        return arr;
    }
    
    // which question parts are visible - mnemonic, answer, moreinfo
    setVisible(toShow) {
        let visible = this.state.visible;
        visible.push(toShow);
        this.setState({'visible':visible});
        //console.log(['scroll to ',toShow,this.scrollTo[toShow],this.scrollTo]);
        //setTimeout(function(toShow) {
            scrollToComponent(this.scrollTo[toShow],{align:'top',offset:-230});
        //},1000) 
    };
    
    toggleMedia() {
        ////console.log(['invisible',toHide]);
        let visible = this.state.visible;
        if (this.state.visible.indexOf('media')>=0) {
            visible = this.removeA(visible,'media');
        } else {
            visible.push('media');
        }
        
        this.setState({'visible':visible});
        
    };
    
    isVisible(toShow) {
        return (this.state.visible.includes(toShow));
    };
    
    hideAll() {
        this.setState({'visible':[]});
    };
    
    handleQuestionResponse(question,response) {
        this.hideAll();
        this.props.handleQuestionResponse(question,response);
    };
    
    setDiscoveryBlock(type,id) {
        this.hideAll();
        this.props.setDiscoveryBlock(type,id)
    };
    
    clearDiscoveryBlock(type,id) {
        this.hideAll();
        this.props.clearDiscoveryBlock(type,id)
    };
    
    firstSentence (text) {
        if (text) {
            text = text.replace('...',', ');
            return String(text).split('.')[0];
        } else return '';
    };
    
    render() {
        let showRecallButton = this.props.successButton 
        
        let blockedTags = '';
        let blockedTopics = '';
        let blockedTechniques = '';
        if (!showRecallButton)  {
            blockedTags = this.props.blocks.tag.map((tag, key) => {
              
              return <button className="btn btn-outline btn-primary" key={key}  ><Close size={28} className="badge badge-pill badge-info"  onClick={() => this.clearDiscoveryBlock('tag',tag)} /><span className="hidden-sm-down" >&nbsp;{tag}</span></button>
            })          
            blockedTopics = this.props.blocks.topic.map((topic, key) => {
              
              return <button className="btn btn-outline btn-primary" key={topic}  ><Close size={28} className="badge badge-pill badge-info"  onClick={() => this.clearDiscoveryBlock('topic',topic)} /><span className="hidden-sm-down" >&nbsp;{topic}</span></button>
            }) 
            blockedTechniques = this.props.blocks.technique.map((technique, key) => {
              
              return <button className="btn btn-outline btn-primary" key={technique}  ><Close size={28} className="badge badge-pill badge-info"  onClick={() => this.clearDiscoveryBlock('technique',technique)} /><span className="hidden-sm-down" >&nbsp;{technique}</span></button>
            }) 
        }
      
        if (this.props.question) {
          
          let question = this.props.question;
         // let showAnswerButton = !this.isVisible('answer') && question.answer;
          let header = Utils.getQuestionTitle(question);
          //let image =   question.image ?  question.image : '/clear.gif';
          let link = '';
          let target=false;
          if (question.link && question.link.length > 0) {
             //if (question.link.indexOf('wikipedia.org') > 0) {
             if (question.link.indexOf('wikipedia.org') > 0 || question.link.indexOf('unistudyguides.com') > 0 ) {
                 let parts = question.link.split('#');
                 if (parts.length>1) {
                    link = parts.slice(0,-1) + '?printable=yes#' + parts.slice(-1);
                 } else {
                     link = question.link  + '?printable=yes'
                 }
                 
             } else {
                 link = question.link;
                 target='_new';
             }
          } else {
              link = 'https://www.google.com.au/search?q='+header;
              target='_new';
          }
       
          let tags = '';
          let tagsClean=''; 
          if (question.tags && Array.isArray(question.tags)) {
              tags = question.tags.map((tag, key) => {
                  tag=tag.trim().toLowerCase();
                  //<Ban size={28} className="badge badge-pill badge-info"  onClick={() => this.setDiscoveryBlock('tag',tag)} />
                  return <button className="btn btn-outline btn-primary" key={key}  ><Search size={28} className="badge badge-pill badge-info" onClick={() => this.props.setQuizFromTag({text:tag})} style={{float:'right'}}/><span className="hidden-sm-down" >&nbsp;{tag}&nbsp;</span></button>
                })
            //
        
              tagsClean = question.tags.map((tag, key) => {
                  
                  return <button className="btn btn-outline btn-primary" key={key}  ><span className="hidden-sm-down" >{tag}</span></button>
                })
                 //!this.isVisible('mnemonic') && 
                      //(!this.isVisible('image')) && 
                      //(!this.isVisible('image')) && 
                      //!this.isVisible('moreinfo') 
                      // !this.isVisible('topic')) && 
                      // (!this.isVisible('tags')) && 
            
            }
            
           // var {Platform} = React;


            let media=this.state.media;
            //if (Platform.OS === 'ios')
              //return (
                //media=<a href={question.media} target='_new' >Play</a>
            //)
            //else
              //return (
               
            //)
            let attribution=question.attribution;
            if (attribution && attribution.indexOf('http')===0) {
                let endAttribution=question.attribution.indexOf("/",9);
                let shortAttribution=question.attribution.slice(0,endAttribution);
                attribution=(<a href={question.attribution} >{shortAttribution}</a>)
            }
            let imageAttribution=question.imageattribution;
            let imageLink=question.image_png ? question.image_png : question.image;
            //imageLink="/s3/uploads/imagefiles/image_5b6ac06107ddb0007afc848b.png"
            //imageLink =  imageLink ? imageLink +"?rand="+Math.random() : '';
            if (imageAttribution && imageAttribution.indexOf('http')===0) {
                let endAttribution=question.imageattribution.indexOf("/",9);
                let shortAttribution=question.imageattribution.slice(0,endAttribution);
                imageAttribution=(<a href={question.imageattribution} >{shortAttribution}</a>)
                imageLink=question.imageattribution
            }
            
            let mediaAttribution=question.mediaattribution;
            if (mediaAttribution && mediaAttribution.indexOf('http')===0) {
                let endAttribution=mediaAttribution.indexOf("/",9);
                let shortAttribution=mediaAttribution.slice(0,endAttribution);
                attribution=(<a href={mediaAttribution} >{shortAttribution}</a>)
            }

            let shortanswer = this.firstSentence(question.answer);
            let showLongAnswer = false;
            if (shortanswer.length < question.answer.length) {
                showLongAnswer = true;
            }
            let shortLink = ""
            if (question.link) {
                let endDomain=question.link.indexOf("/",9);
                shortLink = question.link.slice(0,endDomain);
            }
            let hasMedia=this.hasMedia(question);
              
                   
           return (
            <div className="questionwrap" >
            <ShareDialog id="sharedialog"  header={header}  question={question}/>
            <ProblemReport user={this.props.user} question={this.props.question} />
                <div  ref={(section) => { this.scrollTo.topofpage = section; }} ></div>
                <div className="row buttons justify-content-between" >
                    <button className="col-1 btn btn-outline btn-info" onClick={() => this.handleQuestionResponse(question,'list')} ><Ellipsis size={25} />&nbsp;</button>
                    <button className="col-2 btn btn-outline btn-info" onClick={() => this.handleQuestionResponse(question,'previous')} ><ArrowLeft size={25} /><span className="d-none d-md-inline-block" >&nbsp;Prev&nbsp;</span></button>
                    <span >&nbsp;</span>
                    <button className="col-2 btn btn-outline btn-info" onClick={() => this.handleQuestionResponse(question,'next')}><ArrowRight size={25} /><span className="d-none d-md-inline-block"> Next</span></button>
                    {showRecallButton && <button className="col-3 btn btn-outline btn-success" onClick={() => this.handleQuestionResponse(question,'success')}><Check size={25} /><span className="d-none d-md-inline-block"> Recall</span></button>}
                    <span >&nbsp;</span>
                    {<button className="col-2 btn btn-outline btn-danger" onClick={() => this.handleQuestionResponse(question,'block')} ><Trash size={25} /><span className="d-none d-md-inline-block"> Block</span></button>}
                    {showRecallButton && <div className="scrollbuttons col-sm-12" >
                             <button style={{float:'right'}} data-toggle="modal" data-target="#problemdialog" className='btn btn-primary'><ExclamationTriangle size={26} /><span className="d-none d-md-inline-block">&nbsp;Report Problem&nbsp;</span></button>
                    &nbsp;
                            <button style={{float:'right'}}  data-toggle="modal" data-target="#sharedialog" className='btn btn-primary'  ><ShareAlt size={26}  />&nbsp;<span className="d-none d-md-inline-block">Share</span></button>
                                           
                            {<button className='btn btn-primary' onClick={() => this.setVisible('mnemonic')} ><ConnectDevelop size={26}  />&nbsp;<span className="d-none d-md-inline-block">Mnemonic</span></button>
                            }&nbsp;
                            {question.answer && <button className='btn btn-primary' onClick={() => this.setVisible('answer')}><Info size={26}  />&nbsp;<span className="d-none d-md-inline-block">Answer</span></button>
                            }&nbsp;
                            {imageLink && <button  className='btn btn-primary' onClick={() => this.setVisible('image')}><Image size={26} />&nbsp;<span className="d-none d-md-inline-block">Image</span></button>
                            }&nbsp;
                            {hasMedia && <button  className='btn btn-primary' onClick={() => this.toggleMedia()}><Music size={26} />&nbsp;<span className="d-none d-md-inline-block">Media</span></button>
                            }&nbsp;
                            
                            {(!target) && <button  className='btn btn-primary' onClick={() => this.setVisible('moreinfo')}><ExternalLink size={26}  />&nbsp;<span className="d-none d-md-inline-block">More Info</span></button>
                            }
                            {(target) && <a  className='btn btn-primary' target={target} href={link}><ExternalLink size={26}  />&nbsp;<span className="d-none d-md-inline-block">More Info</span></a>
                            }&nbsp;
                            {<button  className='btn btn-primary' onClick={() => this.setVisible('tags')}><Tags size={26}  />&nbsp;<span className="d-none d-md-inline-block">Tags</span></button>
                            }
                    </div>}
                </div>
                
                
                <div className="card question container" >
                     <div id="spacerforsmall" className='d-none d-sm-block d-md-none' ><br/><br/> </div>
                    <div id="progressbar" style={{backgroundColor: 'blue',width: '100%',height:'0.3em'}} > <div id="innerprogressbar" style={{backgroundColor: 'red',height:'0.3em',width: this.props.percentageFinished()}} >&nbsp;</div></div>
                    
                    <Swipeable onSwipedLeft={() => this.swipeLeft(question)} onSwipedRight={() => this.swipeRight(question)}   >  
                        <div ref={(section) => { this.scrollTo.media = section; }} ></div>
                        {((this.isVisible('media') || question.autoplay_media==="YES") && hasMedia) && <span style={{marginTop:'1em',float:'right'}}>
                            {media}</span> }
                         
                       {!showRecallButton && <span>  {(!target) && <button style={{float:'right',clear:'both',fontSize:'0.9em',marginTop:'1em'}}  className='btn btn-primary' onClick={() => this.setVisible('moreinfo')}><ExternalLink size={26}  />&nbsp;<span className="d-none d-md-inline-block">More Info</span></button>
                         }
                        {(target) && <a style={{float:'right',clear:'both',fontSize:'0.9em',marginTop:'1em'}}  className='btn btn-primary' target={target} href={link}><ExternalLink size={26}  />&nbsp;<span className="d-none d-md-inline-block">More Info</span></a>
                        }&nbsp;   
                        <button style={{marginTop:'1em',float:'right'}} data-toggle="modal" data-target="#problemdialog" className='btn btn-primary'><ExclamationTriangle size={26} /><span className="d-none d-md-inline-block">&nbsp;Report Problem&nbsp;</span></button>
                    &nbsp;
                            <button style={{marginTop:'1em',float:'right'}}  data-toggle="modal" data-target="#sharedialog" className='btn btn-primary'  ><ShareAlt size={26}  />&nbsp;<span className="d-none d-md-inline-block">Share</span></button></span>}
                        
                        
                        <div style={{fontSize:'1.2em'}} className="card-title">{header}?</div>
                        <div className="card-block">
                            {(this.isVisible('media') || question.autoplay_media==="YES") && question.mediaattribution && hasMedia  && <div className="card-block mediaattribution">
                            <div  className='card-text ' style={{fontSize:'0.85em'}}><b>Media Attribution/Source</b> <span><pre>{mediaAttribution}</pre></span></div>
                        </div>}
                        
                        </div>
                        
                    
                       
                              
                                                    
                     
                            
                        <div className="card-block answer">
                        {((this.isVisible('image') || question.autoshow_image==="YES" || !showRecallButton) && imageLink  ) && 
                            <img   alt={question.question} onClick={() => this.setVisible('image')} style={{ float:'left', maxHeight:'150px', maxWidth:'150px',border: "0px",clear:'both', paddingRight: '1em'}} src={imageLink} />
                            }
                        
                        {(this.isVisible('answer') || !showRecallButton)  && question.answer && 
                            <div  className='card-text'><b>Answer</b><br/> 
                             
                                
                            <span className='shortanswer' style={{fontSize:'1.1em',fontFamily: 'sans_forgeticaregular'}} >{shortanswer}</span>&nbsp;&nbsp;&nbsp;&nbsp;{showLongAnswer && <button style={{display:'inline'}} className="btn btn-primary" onClick={() => this.setVisible('answer')}>...</button>}</div>
                        }
                            
                        </div>
                        <div style={{width:'100%',clear:'both',height:'1em'}}></div>
                       
                        <div ref={(section) => { this.scrollTo.mnemonic = section; }} ></div>
                    {(this.isVisible('mnemonic')|| !showRecallButton) &&<MnemonicsList isAdmin={this.props.isAdmin} disableSwipe={this.disableSwipe} enableSwipe={this.enableSwipe} saveSuggestion={this.props.saveSuggestion} mnemonic_techniques={this.props.mnemonic_techniques} user={this.props.user} question={question} showRecallButton={showRecallButton} setDiscoveryBlock={this.setDiscoveryBlock} setQuizFromTechnique={this.props.setQuizFromTechnique} isLoggedIn={this.props.isLoggedIn} like={this.props.like}/>}
                        
                       
                        
                    <div className="card-block">
                        <div ref={(section) => { this.scrollTo.answer = section; }} ></div>
                        {(this.isVisible('answer') || !showRecallButton) && showLongAnswer && <div  className='card-text'><span style={{fontSize:'1.4em'}}><pre>{question.answer}</pre></span></div>}
                         
                        <div  className='card-text' style={{fontSize:'0.85em'}}>
                        {(this.isVisible('answer') || !showRecallButton) && question.link && <b >From <a href={question.link} target='_new' >{shortLink}</a></b>}
                       
                        {(this.isVisible('answer') || !showRecallButton) && question.attribution && 
                            <div><b >Attribution/Source</b> <span >{attribution}</span></div>
                        }
                        </div>
                        <br/>
                    </div>
                       
                        
                        <div ref={(section) => { this.scrollTo.tags = section; }} ></div>
                        {((this.isVisible('tags')  && showRecallButton) && question.quiz) && <div className="card-block topic">
                            <b>Topic&nbsp;&nbsp;&nbsp;</b> <span><button className="btn btn-outline btn-primary"   ><span className="hidden-sm-down" >{question.quiz}</span></button></span><br/>
                        </div>}
                        {((!showRecallButton) && question.quiz) && <div className="card-block topic">
                            <b>Topic&nbsp;&nbsp;&nbsp;</b><button className="btn btn-outline btn-primary"   ><Search size={28} className="badge badge-pill badge-info" onClick={() => this.props.setQuizFromTopic(question.quiz)} style={{float:'right'}}/> <span className="hidden-sm-down" >{question.quiz}</span></button><br/>
                        </div>}
                        
                        {(!showRecallButton) && <div   className="card-block tags" >
                          <b>Tags&nbsp;&nbsp;&nbsp;</b>
                           {tags}
                        </div>}
                        {(showRecallButton && this.isVisible('tags')) && showRecallButton && <div    className="card-block tags" >
                          <b>Tags&nbsp;&nbsp;&nbsp;</b>
                           {tagsClean}
                        </div>}
                        
                       
                    </Swipeable>
                    <br/>
                     <div ref={(section) => { this.scrollTo.moreinfo = section; }} ><br/></div>
                       
                    <div className="card-block">
                         {(this.isVisible('moreinfo') && !target) && <div className="holds-the-iframe"><iframe className='wikiiframe'  src={link} style={{width:"98%", height: "1200px", border: "0px"}}/></div> }                
                    </div>
                    
                    <div className="card-block">
                        <div ref={(section) => { this.scrollTo.image = section; }} ></div>
                        {((this.isVisible('image') || !showRecallButton || question.autoshow_image==="YES") && imageLink) && <span><a href={imageLink} target='_new'><img  className="d-lg-none"   alt={question.question} src={imageLink} style={{width:"98%",  border: "0px"}}/><img  className="d-none d-lg-block"   alt={question.question} src={imageLink} style={{width:"50%",  border: "0px"}}/></a></span> }
                        {(this.isVisible('image') || !showRecallButton) && question.imageattribution && <div><div className="card-block imageattribution">
                            
                        </div><div   style={{fontSize:'0.85em'}}><b>Image Attribution/Source</b> <span>{imageAttribution}</span></div></div>}
                    </div>
                    
                    
                </div>
            </div>
          
          
            )
//            
        } else {
            return <div className="card question container" >
                <div className='blocked-tags' style={{float:'right'}}>
                    {((blockedTags && blockedTags.length > 0) || (blockedTopics && blockedTopics.length > 0) || (blockedTechniques && blockedTechniques.length > 0)) && <b>Filter </b>}
                    {blockedTags && blockedTags.length>0 && <span>Tags </span>} {blockedTags}
                    {blockedTopics && blockedTopics.length>0 && <span>Topics </span>} {blockedTopics}
                    {blockedTechniques && blockedTechniques.length>0 && <span>Techniques </span>} {blockedTechniques}
                </div>
                <div>No matching questions</div>
            </div>
        }
        
    };
}

  //{((blockedTags && blockedTags.length > 0) || (blockedTopics && blockedTopics.length > 0) || (blockedTechniques && blockedTechniques.length > 0)) && <div className='blocked-tags' style={{float:'right'}}><b>Filter </b>
                        //{blockedTags && blockedTags.length>0 && <span>Tags </span>} {blockedTags}
                        //{blockedTopics && blockedTopics.length>0 && <span>Topics </span>} {blockedTopics}
                        //{blockedTechniques && blockedTechniques.length>0 && <span>Techniques </span>} {blockedTechniques}
                       //<hr/> </div>}

//<Ban size={28} className="badge badge-pill badge-info"  onClick={() => this.setDiscoveryBlock('topic',question.quiz)} />
//{!this.isVisible('moreinfo') && <img className="" src={image} alt={header}  style={{width:"70%"}} /> }
                    
 //return (
            //<div className="questionwrap" >
            //<ShareDialog id="sharedialog"  header={header}  question={question}/>
            //<ProblemReport user={this.props.user} question={this.props.question} />
                //<div  ref={(section) => { this.scrollTo.topofpage = section; }} ></div>
                //<div className="row buttons justify-content-between" >
                    //<button className="col-1 btn btn-outline btn-info" onClick={() => this.handleQuestionResponse(question,'list')} ><Ellipsis size={25} />&nbsp;</button>
                    //<button className="col-2 btn btn-outline btn-info" onClick={() => this.handleQuestionResponse(question,'previous')} ><ArrowLeft size={25} /><span className="d-none d-md-inline-block" >&nbsp;Prev&nbsp;</span></button>
                    //<span >&nbsp;</span>
                    //<button className="col-2 btn btn-outline btn-info" onClick={() => this.handleQuestionResponse(question,'next')}><ArrowRight size={25} /><span className="d-none d-md-inline-block"> Next</span></button>
                    //{showRecallButton && <button className="col-3 btn btn-outline btn-success" onClick={() => this.handleQuestionResponse(question,'success')}><Check size={25} /><span className="d-none d-md-inline-block"> Recall</span></button>}
                    //<span >&nbsp;</span>
                    //{<button className="col-2 btn btn-outline btn-danger" onClick={() => this.handleQuestionResponse(question,'block')} ><Trash size={25} /><span className="d-none d-md-inline-block"> Block</span></button>}
                    //<div className="scrollbuttons col-sm-12" >
                             //<button style={{float:'right'}} data-toggle="modal" data-target="#problemdialog" className='btn btn-primary'><ExclamationTriangle size={26} /><span className="d-none d-md-inline-block">&nbsp;Report Problem&nbsp;</span></button>
                    //&nbsp;
                            //<button style={{float:'right'}}  data-toggle="modal" data-target="#sharedialog" className='btn btn-primary'  ><ShareAlt size={26}  />&nbsp;<span className="d-none d-md-inline-block">Share</span></button>
                                           
                            //{<button className='btn btn-primary' onClick={() => this.setVisible('mnemonic')} ><ConnectDevelop size={26}  />&nbsp;<span className="d-none d-md-inline-block">Mnemonic</span></button>
                            //}&nbsp;
                            //{question.answer && <button className='btn btn-primary' onClick={() => this.setVisible('answer')}><Info size={26}  />&nbsp;<span className="d-none d-md-inline-block">Answer</span></button>
                            //}&nbsp;
                            //{imageLink && <button  className='btn btn-primary' onClick={() => this.setVisible('image')}><Image size={26} />&nbsp;<span className="d-none d-md-inline-block">Image</span></button>
                            //}&nbsp;
                            //{hasMedia && <button  className='btn btn-primary' onClick={() => this.toggleMedia()}><Music size={26} />&nbsp;<span className="d-none d-md-inline-block">Media</span></button>
                            //}&nbsp;
                            
                            //{(!target) && <button  className='btn btn-primary' onClick={() => this.setVisible('moreinfo')}><ExternalLink size={26}  />&nbsp;<span className="d-none d-md-inline-block">More Info</span></button>
                            //}
                            //{(target) && <a  className='btn btn-primary' target={target} href={link}><ExternalLink size={26}  />&nbsp;<span className="d-none d-md-inline-block">More Info</span></a>
                            //}&nbsp;
                            //{<button  className='btn btn-primary' onClick={() => this.setVisible('tags')}><Tags size={26}  />&nbsp;<span className="d-none d-md-inline-block">Tags</span></button>
                            //}
                          //</div>
                //</div>
                
                //<div className="card question container" >
                 //<div ref={(section) => { this.scrollTo.mnemonic = section; }} ></div>
                     //<div id="spacerforsmall" className='d-none d-sm-block d-md-none' ><br/><br/> </div>
                    //<div id="progressbar" style={{backgroundColor: 'blue',width: '100%',height:'0.3em'}} > <div id="innerprogressbar" style={{backgroundColor: 'red',width: this.props.percentageFinished()}} >&nbsp;</div></div>
                    
                    //<Swipeable onSwipedLeft={() => this.swipeLeft(question)} onSwipedRight={() => this.swipeRight(question)}   >  
                        //<h4 className="card-title">{header}?</h4>
                        //<div className="card-block">
                            //{(this.isVisible('media') || question.autoplay_media==="YES") && question.mediaattribution && hasMedia  && <div className="card-block mediaattribution">
                            //<div  className='card-text ' style={{fontSize:'0.85em'}}><b>Media Attribution/Source</b> <span><pre>{mediaAttribution}</pre></span></div>
                        //</div>}
                        //<div ref={(section) => { this.scrollTo.media = section; }} ></div>
                        //{((this.isVisible('media') || question.autoplay_media==="YES") && hasMedia) && <span>
                            //{media}</span> }
                        //</div>
                       //{(this.isVisible('mnemonic')|| !showRecallButton) &&<MnemonicsList isAdmin={this.props.isAdmin} disableSwipe={this.disableSwipe} enableSwipe={this.enableSwipe} saveSuggestion={this.props.saveSuggestion} mnemonic_techniques={this.props.mnemonic_techniques} user={this.props.user} question={question} showRecallButton={showRecallButton} setDiscoveryBlock={this.setDiscoveryBlock} setQuizFromTechnique={this.props.setQuizFromTechnique} isLoggedIn={this.props.isLoggedIn} like={this.props.like}/>}
                        
                        //<div ref={(section) => { this.scrollTo.answer = section; }} ></div>
                        //{(this.isVisible('answer') || !showRecallButton) && question.answer && <div className="card-block answer">
                            //<div  className='card-text'><b>Answer</b><br/> <span className='shortanswer' style={{fontWeight:'bold',fontSize:'1.1em'}} >{question.shortanswer}</span></div>
                            //<div  className='card-text'><span><pre>{question.answer}</pre></span></div>
                        //</div>}
                        
                        
                        //<div  className='card-text' style={{fontSize:'0.85em'}}>
                        //{(this.isVisible('answer') || !showRecallButton) && question.link && <b >From <a href={question.link} target='_new' >{shortLink}</a></b>}
                       
                        //{(this.isVisible('answer') || !showRecallButton) && question.attribution && 
                            //<div><b >Attribution/Source</b> <span >{attribution}</span></div>
                        //}
                        //</div>
                        //<br/>
                        
                        //<div ref={(section) => { this.scrollTo.tags = section; }} ></div>
                        //{((this.isVisible('tags')  && showRecallButton) && question.quiz) && <div className="card-block topic">
                            //<b>Topic&nbsp;&nbsp;&nbsp;</b> <span><button className="btn btn-outline btn-primary"   ><span className="hidden-sm-down" >{question.quiz}</span></button></span><br/>
                        //</div>}
                        //{((!showRecallButton) && question.quiz) && <div className="card-block topic">
                            //<b>Topic&nbsp;&nbsp;&nbsp;</b><button className="btn btn-outline btn-primary"   ><Search size={28} className="badge badge-pill badge-info" onClick={() => this.props.setQuizFromTopic(question.quiz)} style={{float:'right'}}/> <span className="hidden-sm-down" >{question.quiz}</span></button><br/>
                        //</div>}
                        
                        //{(!showRecallButton) && <div   className="card-block tags" >
                          //<b>Tags&nbsp;&nbsp;&nbsp;</b>
                           //{tags}
                        //</div>}
                        //{(showRecallButton && this.isVisible('tags')) && showRecallButton && <div    className="card-block tags" >
                          //<b>Tags&nbsp;&nbsp;&nbsp;</b>
                           //{tagsClean}
                        //</div>}
                          //{((blockedTags && blockedTags.length > 0) || (blockedTopics && blockedTopics.length > 0) || (blockedTechniques && blockedTechniques.length > 0)) && <div className='blocked-tags' style={{float:'right'}}><b>Filter </b>
                        //{blockedTags && blockedTags.length>0 && <span>Tags </span>} {blockedTags}
                        //{blockedTopics && blockedTopics.length>0 && <span>Topics </span>} {blockedTopics}
                        //{blockedTechniques && blockedTechniques.length>0 && <span>Techniques </span>} {blockedTechniques}
                       //<hr/> </div>}
                       
                    //</Swipeable>
                    //<br/>
                     //<div ref={(section) => { this.scrollTo.moreinfo = section; }} ><br/></div>
                       
                    //<div className="card-block">
                         //{(this.isVisible('moreinfo') && !target) && <div className="holds-the-iframe"><iframe className='wikiiframe'  src={link} style={{width:"98%", height: "1200px", border: "0px"}}/></div> }                
                    //</div>
                    
                    //<div className="card-block">
                        //<div ref={(section) => { this.scrollTo.image = section; }} ></div>
                        //{((this.isVisible('image') || !showRecallButton || question.autoshow_image==="YES") && imageLink) && <span><a href={imageLink} target='_new'><img  className="d-lg-none"   alt={question.question} src={imageLink} style={{width:"98%",  border: "0px"}}/><img  className="d-none d-lg-block"   alt={question.question} src={imageLink} style={{width:"50%",  border: "0px"}}/></a></span> }
                        //{(this.isVisible('image') || !showRecallButton) && question.imageattribution && <div><div className="card-block imageattribution">
                            
                        //</div><div   style={{fontSize:'0.85em'}}><b>Image Attribution/Source</b> <span>{imageAttribution}</span></div></div>}
                    //</div>

                //</div>
            //</div>
          
          
            //)
