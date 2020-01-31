import * as UserAPIUtil from '../util/user_api_util'

export const RECEIVE_USER_WEEKBOULDERS = "RECEIVE_USER_WEEKBOULDERS"
export const RECEIVE_USER_WEEKROPES = "RECEIVE_USER_WEEKROPES"

export const receiveUserWeekBoulders = boulders => ({
    type: RECEIVE_USER_WEEKBOULDERS,
    boulders
})
export const receiveUserWeekRopes = ropes => ({
    type: RECEIVE_USER_WEEKROPES,
    ropes
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