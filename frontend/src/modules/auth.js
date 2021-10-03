import produce from "immer";
import { createAction,  handleActions } from "redux-actions";
import { takeLatest } from "redux-saga/effects";
import createRequestSaga, { createRequestActionTypes } from "../lib/createRequestSaga";
import * as authAPI from '../lib/api/auth';

const CHANGE_FIELD = "auth/CHANGE_FIELD";
const INITIALIZE_FORM = 'auth/INITALIZE_FORM';

const [REGISTER, REGISTER_SUCCESS, REGISTER_FAILURE] = createRequestActionTypes(
    'auth/REGISTER'
);

const [LOGIN, LOGIN_SUCCESS, LOGIN_FAILURE] = createRequestActionTypes(
    'auth/LOGIN'
);

export const changeField = createAction(
    CHANGE_FIELD,
    ({form, key, value}) => ({
        form, //register , login
        key, // password, password2, email 등
        value, //실제 바꾸려는 값
    }),
);

export const initializeForm = createAction(INITIALIZE_FORM, form => form); //register / login

export const register = createAction(REGISTER, ({email, password, nickname, gender}) => ({
    email,
    password,
    nickname,
    gender,
}));

export const login = createAction(LOGIN, ({email, password}) => ({
    email,
    password,
}));

const registerSaga = createRequestSaga(REGISTER, authAPI.register); // /lib/api/auth
const loginSaga = createRequestSaga(LOGIN, authAPI.login);          // /lib/api/auth

export function* authSaga() {
    yield takeLatest(REGISTER, registerSaga)
    yield takeLatest(LOGIN, loginSaga);
}

const initialState = {
    register: {
        email: '',
        password: '',
        password2: '',
        nickname: '',
        gender:'',
    },
    login:{
        email: '',
        password: '',
    },
    auth: null,
    authError: null,
};

const auth = handleActions(
    {
        [CHANGE_FIELD]: (state, {payload: {form, key, value} }) =>
        produce(state,draft => {
            draft[form][key] = value;
        }),
        [INITIALIZE_FORM]: (state, {payload: form}) => ({
            ...state,
            [form]:initialState[form],
            authError: null, // 폼 전환 시 회원 인증 에러 초기화
        }),
        //회원가입 성공
        [REGISTER_SUCCESS]:(state, {payload:auth}) =>({
            ...state,
            authError: null,
            auth,
        }),
        //회원가입 실패
        [REGISTER_FAILURE] :(state, {payload:error}) =>({
            ...state,
            authError: error,
        }),
        //로그인 성공
        [LOGIN_SUCCESS] :(state, {payload: auth}) =>({
            ...state,
            authError: null,
            auth,
        }),
        //로그인 실패
        [LOGIN_FAILURE] :(state, {payload:error}) =>({
            ...state,
            authError: error,
        }),
        
    },
    initialState,
);

export default auth;