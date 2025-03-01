import React, { useEffect, useState } from 'react';
import axios from 'axios';

function Employee() {
    const [data, setData] = useState([]);
    const [message, setMessage] = useState('');

    useEffect(() => {
        fetchData();
    }, []);

    const fetchData = async () => {
        try {
            const result = await axios.get(`${process.env.REACT_APP_API_URL}/employees`);
            setData(result.data);
        } catch (error) {
            console.error("Error:", error);
            setMessage('❌ ไม่สามารถดึงข้อมูลได้ กรุณาลองใหม่');
        }
    };

    return (
        <>
            <div className='MyHome'>
                Employee
            </div>

            <div className='container text-center'>
                <h1>ข้อมูลพนักงาน</h1>

                {/* แสดงข้อความข้อผิดพลาด */}
                {message && <p className="text-danger">{message}</p>}

                <table className="table">
                    <thead>
                        <tr>
                            <th scope="col">ID</th>
                            <th scope="col">ชื่อ</th>
                            <th scope="col">นามสกุล</th>
                            <th scope="col">เงินเดือน</th>
                        </tr>
                    </thead>
                    <tbody>
                        {data.length > 0 ? (
                            data.map(item => (
                                <tr key={item.id}>
                                    <th scope="row">{item.id}</th>
                                    <td>{item.name}</td>
                                    <td>{item.lastname}</td>
                                    <td>{item.salary}</td>
                                </tr>
                            ))
                        ) : (
                            <tr>
                                <td colSpan="4">ไม่พบข้อมูลพนักงาน</td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>
        </>
    );
}

export default Employee;
