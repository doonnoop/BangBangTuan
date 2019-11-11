import { message } from 'antd';

/**
 * 公用get请求
 * @param url       接口地址
 * @param msg       接口异常提示
 * @param headers   接口所需header配置
 */

export const get = ({url, msg = '接口异常', headers}) =>
    fetch(url, {
        method: 'GET',
        headers: headers
    })
        .then((res) => res.json())
        .then( res => res.data)
        .catch( err => {
            console.log(err);
            message.warn(msg);
        });
