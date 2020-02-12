import React from 'react';
// import BoulderBox from '../boulders/boulder_box';

import DataComponent from './data'

import '../../assets/stylesheets/profile.css'
import * as UserAPIUtil from '../../util/user_api_util'

class Profile extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            username: "",
            type: 'boulders',
            imageUrl: "",
            imageFile: null,
            savedImage: null,
        }
        this.deleteAll = this.deleteAll.bind(this)
        this.handleClickType = this.handleClickType.bind(this)
        this.handleSubmit = this.handleSubmit.bind(this)
    }
    componentDidMount(){
        UserAPIUtil.getUser(this.props.match.params.userId)
            .then(res => {
                this.setState({ username: res.data.username })})
            .catch(err => console.log(err))

        UserAPIUtil.getPhoto(this.props.match.params.userId)
            .then(res => {
                debugger
                this.setState({ imageUrl: res.data })})
            .catch(err => {
                debugger
                console.log(err)})
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
    handleSubmit(e){
        e.preventDefault()
        // submit form data thru axios
        const formData = new FormData()
        formData.append('avatar', this.state.imageFile)
        const config = { headers: { 'content-type': 'multipart/form-data' } }

        // debugger 
        // [1].name
        // for (var pair of formData.entries()) {
        //     console.log(pair[0] + ', ' + pair[1]);
        // }
        UserAPIUtil.updatePhoto(this.props.currentUser.id, formData, config)
            .then((res) => {
                console.log(res.data);
            })
    }
    deleteAll(){
        const {deleteUserBoulders, deleteUserRopes, deleteUserSports, currentUser} = this.props
        deleteUserBoulders(currentUser.id)
        deleteUserRopes(currentUser.id)
        deleteUserSports(currentUser.id)
    }
    handleClickType(){
        switch (this.state.type) {
            case 'ropes':
                this.setState({type: 'sports'})
                break
            case 'sports':
                this.setState({ type: 'boulders' })
                break
            case 'boulders':
                this.setState({ type: 'ropes' })
                break
            default: 
                break
        }
    }
    render() {
        let currentType 
        switch (this.state.type) {
            case 'boulders': 
                currentType = <h2>Boulders</h2>
                break
            case 'ropes': 
                currentType = <h2>Top-Ropes</h2>
                break
            case 'sports': 
                currentType = <h2>Sport Climbs</h2>
                break
            default:
        }
        // if () {debugger}
        return (
            <div className="profile">
                <div className="profile-header">
                {/* {this.state.savedImage ? <img src='data:image/(contentType);base64,(this.state.savedImage).toString("base64")'/> : null} */}
                {/* <img src={this.state.imageUrl || require("../../assets/images/mascotstand.png")} alt="profile" /> */}
                <h1>{this.state.username}'s Profile</h1>
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

                {currentType}
                <button onClick={this.handleClickType} className="bw-button"><i className="fas fa-exchange-alt"></i>&nbsp;Climb Type</button>
                
                <DataComponent type={this.state.type} />
                
                {this.props.match.params.userId === this.props.currentUser.id ? <button onClick={this.deleteAll}>Delete all</button> : null}
            </div>
        );
    
    }
}

export default Profile