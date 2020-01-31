import {RECEIVE_TEAM_BOULDERS, RECEIVE_TEAM_ROPES} from '../actions/team_actions'

import {merge} from 'lodash'
const BOULDER_GRADES = ["V0", "V1", "V2",
    "V3", "V4", "V5",
    "V6", "V7", "V8",
    "V9", "V10", "V11"]
const ROPE_GRADES = ["5.5", "5.6", "5.7", "5.8",
    "5.9", "5.10a", "5.10b", "5.10c",
    "5.10d", "5.11a", "5.11b", "5.11c",
    "5.11d", "5.12a", "5.12b", "5.12c",
    "5.12d", "5.13a"]

const TeamsReducer = (state = {}, action) => {
    Object.freeze(state)
    let newState = Object.assign({}, state)
    switch (action.type){
        // case RECEIVE_TEAM:
        case RECEIVE_TEAM_BOULDERS:

            action.boulders.sort((x,y) => {
                const xIdx = BOULDER_GRADES.indexOf(x.grade)
                const yIdx = BOULDER_GRADES.indexOf(y.grade)
                // y is higher grade
                // + => y comes first
                if (yIdx > xIdx){
                    return 1
                }
                if (yIdx < xIdx) {
                    return -1
                }
                else {
                    return 0
                }})
            if (!(action.id in newState)) newState[action.id] = {}
            newState[action.id].boulders = action.boulders.map(boulder => boulder.grade).slice(0, 5)
            return merge({}, state, newState)
           
        case RECEIVE_TEAM_ROPES:
            // action.ropes
            action.ropes.sort((x, y) => {
                const xIdx = ROPE_GRADES.indexOf(x.grade)
                const yIdx = ROPE_GRADES.indexOf(y.grade)
                // y is higher grade
                // + => y comes first
                if (yIdx > xIdx) {
                    return 1
                }
                if (yIdx < xIdx) {
                    return -1
                }
                else {
                    return 0
                }
            })
            action.ropes.slice(0, 5)
            if (!(action.id in newState)) newState[action.id] = {}
            newState[action.id].ropes = action.ropes.map(rope => rope.grade).slice(0, 5)
            return merge({}, state, newState)
        default:
            return state
    }
}

export default TeamsReducer