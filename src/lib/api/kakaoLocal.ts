import Axios from 'axios';

class KakaoLocal {
    url: string
    key: string
    constructor(key: string) {
        this.url = "https://dapi.kakao.com/v2/local/search/";
        this.key = key;
    }

    async getAddress(query: string, page: number = 1, size: number = 20) {
        try {
            const { data } = await Axios.get(`${this.url}address.json?analyze_type=similar&page=${page}&size=${size}&query=${encodeURIComponent(query)}`, {
                headers: {
                    Authorization: `KakaoAK ${this.key}`
                },
            });
            return data;
        } catch (e) {
            console.error(e);
            return false;
        }
    }
    async getKeyword(query: string, page: number = 1, size: number = 15) {
        try {
            const { data } = await Axios.get(`${this.url}keyword.json?sort=accuracy&page=${page}&size=${size}&query=${encodeURIComponent(query)}`, {
                headers: {
                    Authorization: `KakaoAK ${this.key}`
                },
            });
            return data;
        } catch (e) {
            console.error(e);
            return false;
        }
    }
}

export default KakaoLocal;