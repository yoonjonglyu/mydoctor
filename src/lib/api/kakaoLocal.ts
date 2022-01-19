import Axios from 'axios';

class KakaoLocal {
    url: string
    key: string
    constructor(key: string) {
        this.url = "https://dapi.kakao.com/v2/local/search/address.json";
        this.key = key;
    }

    async getAddress(query: string, page: number = 1, size: number = 10) {
        try {
            const { data } = await Axios.get(`${this.url}?analyze_type=similar&page=${page}&size=${size}&query=${encodeURIComponent(query)}`, {
                headers: {
                    Authorization: `KakaoAK ${this.key}`
                },
            });
            return data;
        } catch(e){
            console.error(e);
            return false;
        }
    }
}

export default KakaoLocal;