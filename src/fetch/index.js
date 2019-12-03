import { get, post } from './tool';
import * as config from './config';
import storage from "../component/storage";

/* 打卡相关 */
export const getClocks = (current) => get({
    url: config.CLOCK + '?current=' + current +'&size=10',
    headers: {
        'Content-Type': 'application/json',
    }
});

export const postClock = (body) => post({
    url: config.CLOCK,
    body,
    headers: {
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + storage.get('token')
    }
});

export const getUserClocks = () => get({
    url: config.CLOCK + '/user?current=0&size=10',
    headers: {
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + storage.get('token')
    }
});

/* 文章相关 */
export const getArticles = (current, type="") => get({
    url: config.ARTICLE + '?current=' + current +'&size=10&type=' + type,
    headers: {
        'Content-Type': 'application/json',
    }
});

export const postArticles = (body) => post({
    url: config.ARTICLE,
    body,
    headers: {
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + storage.get('token')
    }
});

export const getUserArticles = () => get({
    url: config.ARTICLE + '/user?current=0&size=10',
    headers: {
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + storage.get('token')
    }
});

/* 学习路径相关 */
export const getStudyPaths = (current) => get({
    url: config.PATH + '?current=' + current +'&size=10',
    headers: {
        'Content-Type': 'application/json',
    }
});

export const getPathInfo = (id) => get({
    url: config.PATH_INFO + '/' + id,
    headers: {
        'Content-Type': 'application/json',
    }
});

export const getPathDetail = (id) => get({
    url: config.PATH_DETAILS + '/' + id,
    headers: {
        'Content-Type': 'application/json',
    }
});


/* 师徒相关 */
export const getAllMasterList = () => get({
    url: config.MASTER,
    headers: {
        'Content-Type': 'application/json',
    }
});

/* 标签相关 */
export const getTags = () => get({
    url: config.TAG,
    headers: {
        'Content-Type': 'application/json',
    }
});

/* 用户相关 */
export const getUserInfo = () => get({
    url: config.USER,
    headers: {
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + storage.get('token')
    }
});

export const getInvitationCode = () => get({
    url: config.INVITE_CODE,
    headers: {
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + storage.get('token')
    }
});

export const userRegister = (body) => post({
    url: config.REGISTER,
    body,
    headers: {
        'Content-Type': 'application/json',
    }
});

export const getValidCode = (phone) => get({
    url: config.VALID_CODE + '/' + phone,
    headers: {
        'Content-Type': 'application/json',
    }
});
