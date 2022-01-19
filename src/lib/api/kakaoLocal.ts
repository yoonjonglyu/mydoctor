import Axios from 'axios';

class KakaoLocal {
    url: string
    key: string
    constructor(key: string) {
        this.url = "https://dapi.kakao.com/v2/local/search/address.json";
        this.key = key;
    }

    async getAddress(query: string) {
        const { data } = await Axios.get(`${this.url}?query=${encodeURIComponent(query)}`, {
            headers: {
                Authorization: `KakaoAK ${this.key}`
            },
        });

        return data;
    }
}

export default KakaoLocal;