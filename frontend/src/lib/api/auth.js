import client from "./client";

//로그인
export const login = ({email, password}) => client.post('/account/login',{email,password});

//회원가입
export const register = ({email, password, nickname, gender}) => client.post('/account/signup', {email, password, nickname, gender}); // email password nickname 

// 로그인 상태 확인
export const check = () => client.get('api/auth/check')

//로그아웃
export const logout = () => client.post('/api/auth/logout');