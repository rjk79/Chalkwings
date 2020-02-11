import React from 'react';
// import BoulderBox from '../boulders/boulder_box';
import {
    AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer
} from 'recharts';

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
        this.props.fetchUserBoulders(this.props.match.params.userId)
        this.props.fetchUserRopes(this.props.match.params.userId)
        
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
            this.props.fetchUserBoulders(userId)
            this.props.fetchUserRopes(userId)}
    }

    createGraphData(climbs, grades) { // { grade: 'V0', count: 0 }, 
        let data = []
        for (let i = 0; i < grades.length; i++) {
            data.push({ grade: grades[i], count: 0 })
        }
        
        if (climbs.length > 0) {
            climbs.forEach(climb => {
                data.forEach(datum => {

                    if (datum.grade === climb.grade) datum.count++
                })
            })
        }
        return data
    }

    createAreaGraph(data, color){
        if (color === "#6CD09D") {
            data = data.map(({grade, count})=>{return {grade:grade.slice(1), count}}) //remove "5."
        }
        return (
        <ResponsiveContainer>
            <AreaChart
                width={500}
                height={300}
                data={data}
                margin={{
                    top: 5, right: 30, left: 20, bottom: 5,
                }}
            >
                <defs>
                    <linearGradient id={`${color}`} x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%" stopColor={color} stopOpacity={0.8} />
                        <stop offset="95%" stopColor={color} stopOpacity={0} />
                    </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="grade" /> 
                <YAxis />
                <Tooltip />
                <Legend />
                <Area type="monotone" stroke={color} dataKey="count" fill={`url(#${color})`} />
            </AreaChart>
        </ResponsiveContainer>
        )
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
        
        UserAPIUtil.deleteUserBoulders(this.props.match.params.userId)
        UserAPIUtil.deleteUserRopes(this.props.match.params.userId)
    }
    handleClickType(){
        this.setState({type: this.state.type === 'boulders' ? 'ropes':'boulders'})
    }
    render() {
        
        const {boulders, ropes, currentUser} = this.props
        const BOULDER_GRADES = ["V0", "V1", "V2", 
                                "V3", "V4", "V5", 
                                "V6", "V7", "V8", 
                                "V9", "V10", "V11"]
        const ROPE_GRADES = ["5.5", "5.6", "5.7", "5.8",
                            "5.9", "5.10a", "5.10b", "5.10c",
                            "5.10d", "5.11a", "5.11b", "5.11c",
                            "5.11d", "5.12a", "5.12b", "5.12c",
                            "5.12d", "5.13a"]

        let boulderData = this.createGraphData(boulders, BOULDER_GRADES) // {grade: count: }
        let ropeData = this.createGraphData(ropes, ROPE_GRADES) // {grade: count: }

        let date = new Date()
        let currMonth = date.getMonth()
        let i = 0
        while (i < boulders.length && parseInt(boulders[i].date.slice(5, 7)) -1 === currMonth) i ++ //getMo is 0 indexed
        let boulderMonthlyData = this.createGraphData(boulders.slice(0, i), BOULDER_GRADES)
        i = 0
        while (i < ropes.length && parseInt(ropes[i].date.slice(5, 7)) -1 === currMonth) i ++ //getMo is 0 indexed
        let ropeMonthlyData = this.createGraphData(ropes.slice(0, i), ROPE_GRADES) // {grade: count: }
        
        let ropeMonthlyAverageIdx = ropeMonthlyData.map(datum => ROPE_GRADES.indexOf(datum.grade) * datum.count)
                                                    .reduce((a, b)=> a+b, 0)
                                    / ropeMonthlyData.map(datum => datum.count)
                                                    .reduce((a, b) => a + b, 0)
        let ropeMonthlyAverage = ROPE_GRADES[Math.floor(ropeMonthlyAverageIdx)]
        let boulderMonthlyAverageIdx = boulderMonthlyData.map(datum => BOULDER_GRADES.indexOf(datum.grade) * datum.count)
                                                    .reduce((a, b)=> a+b, 0)
                                    / boulderMonthlyData.map(datum => datum.count)
                                                    .reduce((a, b) => a + b, 0)
        let boulderMonthlyAverage = BOULDER_GRADES[Math.floor(boulderMonthlyAverageIdx)]
        
        let boulderMonthlyCount = boulderMonthlyData.filter(el => el.count).reduce((a, b)=>a + b.count,0)
        let ropeMonthlyCount = ropeMonthlyData.filter(el => el.count).reduce((a, b)=>a + b.count,0)
        
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

                {this.state.type === 'boulders' ? <h3>Boulders</h3>:<h3>Ropes</h3>}
                <button onClick={this.handleClickType} className="profile-swap"><i className="fas fa-exchange-alt"></i>&nbsp;{this.state.type === 'boulders' ? 'View Ropes':'View Boulders'}</button>
                <h2>This Month ({new Date().toString().slice(4, 7)})</h2>
                <div>
                    <strong># of boulders:</strong> {boulderMonthlyCount}<br/>
                    <strong># of rope climbs:</strong> {ropeMonthlyCount}<br/>
                    <strong>Distance bouldered:</strong> approx.&nbsp;{boulderMonthlyCount * 15} ft. | {Math.floor(boulderMonthlyCount * 15 *.3048)} m.<br/>
                    <strong>Distance rope-climbed:</strong> approx.&nbsp;{ropeMonthlyCount * 40} ft. | {Math.floor(ropeMonthlyCount * 40 *.3048)} m.<br/>
                    <strong>Average  grades climbed:</strong> {ropeMonthlyAverage || "n/a"} {boulderMonthlyAverage || "n/a"}<br/> 
                </div>
                {this.state.type === 'boulders' ?
                    <>
                    <div className="climb-chart">
                        {this.createAreaGraph(boulderMonthlyData, "#8884d8")}
                    </div></> : 
                    <>
                    <div className="climb-chart">
                        {this.createAreaGraph(ropeMonthlyData, "#6CD09D")}
                    </div>
                    </>
                }


                <h2>All-time</h2>
                {this.state.type === 'boulders' ?
                <>
                <div className="climb-chart">
                    {this.createAreaGraph(boulderData, "#8884d8")}
                </div> 
                </> :
                <>
                <div className="climb-chart">
                    {this.createAreaGraph(ropeData, "#6CD09D")}
                </div>
                </> }
                {/* {this.state.boulders.map(boulder => (
                    <BoulderBox key={boulder._id} name={boulder.name} grade={boulder.grade} date={boulder.date} />
                ))} */}
                {this.props.match.params.userId === this.props.currentUser.id ? <button onClick={this.deleteAll}>Delete all</button> : null}
            </div>
        );
    
    }
}

export default Profile