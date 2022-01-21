import React, { useState } from 'react';

interface AddLocationProps {

}

const AddLocation: React.FC<AddLocationProps> = () => {
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

    return (
        <article
            data-testid="add-location-box"
            style={{
                width: "100%",
                height: "400px"
            }}
        >
            <form>
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
            </form>
        </article>
    );
}

export default AddLocation;