import * as UserAPIUtil from '../util/user_api_util'

export const RECEIVE_USER_WEEKBOULDERS = "RECEIVE_USER_WEEKBOULDERS"
export const RECEIVE_USER_WEEKROPES = "RECEIVE_USER_WEEKROPES"
export const REMOVE_USER_BOULDERS = "REMOVE_USER_BOULDERS"
export const REMOVE_USER_ROPES = "REMOVE_USER_ROPES"
export const REMOVE_USER_SPORTS = "REMOVE_USER_SPORTS"

export const receiveUserWeekBoulders = boulders => ({
    type: RECEIVE_USER_WEEKBOULDERS,
    boulders
})
export const receiveUserWeekRopes = ropes => ({
    type: RECEIVE_USER_WEEKROPES,
    ropes
})
export const removeUserBoulders = () => ({
    type: REMOVE_USER_BOULDERS,
})
export const removeUserRopes = () => ({
    type: REMOVE_USER_ROPES,
})
export const removeUserSports = () => ({
    type: REMOVE_USER_SPORTS,
})

export const fetchUserWeekboulders = id => dispatch => (
    UserAPIUtil.getWeekBoulders(id)
        .then(res => {
            dispatch(receiveUserWeekBoulders(res.data))
        })
        .catch(err => console.log(err))
)
export const fetchUserWeekropes = id => dispatch => (
    UserAPIUtil.getWeekRopes(id)
        .then(res => {
            dispatch(receiveUserWeekRopes(res.data))
        })
        .catch(err => console.log(err))
)

export const deleteUserBoulders = id => dispatch => (
    UserAPIUtil.deleteUserBoulders(id)    
        .then(res => {
            dispatch(removeUserBoulders())
        })
        .catch(err => console.log(err))
)
 
export const deleteUserRopes = id => dispatch => (
    UserAPIUtil.deleteUserRopes(id)    
        .then(res => {
            dispatch(removeUserRopes())
        })
        .catch(err => console.log(err))
)

export const deleteUserSports = id => dispatch => (
    UserAPIUtil.deleteUserSports(id)    
        .then(res => {
            dispatch(removeUserSports())
        })
        .catch(err => console.log(err))
)