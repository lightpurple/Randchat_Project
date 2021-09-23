import client from "./client";

//로그인
export const login = ({email, password}) => client.post('/auth/login',{email,password});

//회원가입
export const register = ({email, password, nickname, gender}) => client.post('/auth/signup', {email, password, nickname, gender}); // email password nickname 

// 로그인 상태 확인
export const check = () => client.get('/auth/login');

//로그아웃
export const logout = () => client.post('/auth/logout');