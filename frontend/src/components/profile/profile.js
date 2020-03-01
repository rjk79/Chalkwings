import React from 'react';
// import BoulderBox from '../boulders/boulder_box';
import axios from 'axios';

import DataComponent from './data'

import '../../assets/stylesheets/profile.css'
import * as UserAPIUtil from '../../util/user_api_util'

class Profile extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            username: "",
            imageUrl: "",
            imageFile: null,
            savedImage: null,
        }
        this.deleteAll = this.deleteAll.bind(this)
        this.handleSubmit = this.handleSubmit.bind(this)
        this.handleClickToSession = this.handleClickToSession.bind(this)
    }
    componentDidMount(){
        UserAPIUtil.getUser(this.props.match.params.userId)
            .then(res => {
                this.setState({ username: res.data.username })})
            .catch(err => console.log(err))

        // UserAPIUtil.getPhoto(this.props.match.params.userId)
        //     .then(res => {
        //         debugger
        //         this.setState({ imageUrl: res.data })})
        //     .catch(err => {
        //         debugger
        //         console.log(err)})
        axios.get(`/api/images/${this.props.match.params.userId}`).then(res => {
            // debugger
            this.setState({imageUrl: 
                res.data
                })
        })
    }


    componentDidUpdate(prevProps){
        if (this.props.match.params.userId !== prevProps.match.params.userId){
            const userId = this.props.match.params.userId
            UserAPIUtil.getUser(userId)
                .then(res => this.setState({ username: res.data.username }))
                .catch(err => console.log(err))
        }//to delete
    }

    handleChangePhoto(){
        return e => {
            const reader = new FileReader()
            let file = e.target.files[0]
            reader.onloadend = () => { //listener
                
                this.setState({ imageUrl: reader.result, imageFile: file })
            }
            if (file) {
                reader.readAsDataURL(file) //read image 
            } else {
                this.setState({ imageUrl: "", imageFile: null })
            }
            
        }
    }
    handleClickToSession(){
        this.props.history.push('/new_boulder')
    }
    handleSubmit(e){
        e.preventDefault()
        let {userId} = this.props.match.params
        // submit form data thru axios
        const formData = new FormData()
        
        formData.append('image', this.state.imageFile, `${userId}.png`)
        const config = { headers: { 'content-type': 'multipart/form-data' } }

        // debugger 
        // [1].name
        // for (var pair of formData.entries()) {
        //     console.log(pair[0] + ', ' + pair[1]);
        // }
        // UserAPIUtil.updatePhoto(this.props.currentUser.id, formData, config)
        //     .then((res) => {
        //         console.log(res.data);
        //     })
        axios.post(`/api/images/upload/${userId}`, formData, config)
    }
    deleteAll(){
        const {deleteUserBoulders, deleteUserRopes, deleteUserSports, currentUser} = this.props
        deleteUserBoulders(currentUser.id)
        deleteUserRopes(currentUser.id)
        deleteUserSports(currentUser.id)
    }
    
    render() {
        // let {currentUser} = this.props
        
        // if (this.state.imageUrl) {debugger}
        
        // var arr = new Uint8Array(this.state.imageUrl);
        // var raw = String.fromCharCode.apply(null, arr);
        // var b64 = btoa(this.state.imageUrl);
        // let source = 'data:image/png;base64,' + b64;
        // if (b64 !== ""){debugger}
        return (
            <div className="profile">
                <div className="profile-header">
                {/* {this.state.savedImage ? <img src={this.state.savedImage}/> : null}
                    <img src={source
                     || require("../../assets/images/mascotstand.png")} alt="profile" /> */}
                    <div className="username">{this.state.username}</div>
                    {this.props.match.params.userId === this.props.currentUser.id ? <div onClick={this.handleClickToSession} className="add-session">Add session >></div> : 
                    // <div className="cw-button">Follow</div> :
                    <div className="cw-button">Following <i className="fas fa-check"></i></div>
                    // null
                    }
                </div>
                {/* {currentUser.id === this.props.match.params.userId ? 
                    <>
                    <form onSubmit={this.handleSubmit}>
                        <input accept="image/*" type="file" onChange={this.handleChangePhoto()} /> 
                        <input type="submit" value="Save"/>
                    </form>

                    </>
                    : null} */}
                    {/* <div>{this.state.imageFile ? this.state.imageFile.name : null }</div> */}

                
                <DataComponent type={this.state.type} />
                
                {this.props.match.params.userId === this.props.currentUser.id ? <button onClick={this.deleteAll}>Delete all</button> : null}
            </div>
        );
    
    }
}

export default Profile