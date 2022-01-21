import React, { useState } from 'react';

interface AddLocationProps {
    addressInfo: {
        addressName: string
        x: number
        y: number
    }
    addUserLocation: (alias: string, addressDetail: string, notice: string) => void;
}

const AddLocation: React.FC<AddLocationProps> = ({ addressInfo, addUserLocation }) => {
    const [alias, setAlias] = useState('');
    const [addressDetail, setAddressDetail] = useState('');
    const [notice, setNotice] = useState('');

    const handleAlias = (e: React.ChangeEvent<HTMLInputElement>) => {
        setAlias(e.target.value);
    }
    const handleAddressDetail = (e: React.ChangeEvent<HTMLInputElement>) => {
        setAddressDetail(e.target.value);
    }
    const handleNotice = (e: React.ChangeEvent<HTMLInputElement>) => {
        setNotice(e.target.value);
    }
    const handleAddLocation = () => {
        addUserLocation(
            alias,
            addressDetail,
            notice
        );
    }

    return (
        <article
            data-testid="add-location-box"
            style={{
                width: "100%",
                height: "400px"
            }}
        >
            <form>
                <h2>{addressInfo.addressName}</h2>
                <ul>
                    <li>
                        <label htmlFor="alias">
                            별칭:
                            <input
                                type="text"
                                id="alias"
                                value={alias}
                                onChange={handleAlias}
                            />
                        </label>
                    </li>
                    <li>
                        <label htmlFor="addressDetail">
                            상세주소:
                            <input
                                type="text"
                                id="addressDetail"
                                value={addressDetail}
                                onChange={handleAddressDetail}
                            />
                        </label>
                    </li>
                    <li>
                        <label htmlFor="notice">
                            배송시 주의사항:
                            <input
                                type="text"
                                id="notice"
                                value={notice}
                                onChange={handleNotice}
                            />
                        </label>
                    </li>
                </ul>
                <button
                    type="button"
                    onClick={handleAddLocation}
                >
                    등록하기
                </button>
            </form>
        </article>
    );
}

export default AddLocation;