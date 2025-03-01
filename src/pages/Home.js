import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

function Home() {
    const [data, setData] = useState([]);
    const [name, setName] = useState('');
    const [lastname, setLastname] = useState('');
    const [salary, setSalary] = useState('');
    const [message, setMessage] = useState('');
    const [loading, setLoading] = useState(true); // เพิ่ม state โหลดข้อมูล

    const API_URL = process.env.REACT_APP_API_URL || "http://localhost:5000"; // ใช้ .env

    // ดึงข้อมูลเมื่อโหลดหน้า
    useEffect(() => {
        fetchUser();
    }, []);

    // ดึงข้อมูลจาก API
    const fetchUser = async () => {
        setLoading(true);
        try {
            const res = await axios.get(`${API_URL}/api/users`);
            setData(res.data);
        } catch (error) {
            setMessage('❌ ไม่สามารถดึงข้อมูลได้ กรุณาลองใหม่');
        }
        setLoading(false);
    };

    // เพิ่มผู้ใช้งานใหม่
    const addUser = async (e) => {
        e.preventDefault();
        if (!name || !lastname || !salary) {
            setMessage('⚠️ กรุณากรอกข้อมูลให้ครบ');
            return;
        }
        try {
            await axios.post(`${API_URL}/api/users`, { name, lastname, salary });
            fetchUser(); // รีเฟรชข้อมูล
            setName(''); setLastname(''); setSalary('');
            setMessage('✅ เพิ่มข้อมูลสำเร็จ');
        } catch (error) {
            setMessage('❌ ไม่สามารถเพิ่มข้อมูลได้ กรุณาลองใหม่');
        }
    };

    // ลบข้อมูลผู้ใช้งาน
    const deleteUser = async (id) => {
        if (window.confirm("คุณแน่ใจหรือไม่ที่จะลบข้อมูลนี้?")) {
            try {
                await axios.delete(`${API_URL}/api/users/${id}`);
                fetchUser(); // รีเฟรชข้อมูลหลังจากลบ
            } catch (error) {
                setMessage('❌ ไม่สามารถลบข้อมูลได้ กรุณาลองใหม่');
            }
        }
    };

    return (
        <div className="container text-center">
            <h1>🧑‍💼 ระบบจัดการผู้ใช้งาน</h1>

            {/* แสดงข้อความข้อผิดพลาด */}
            {message && <p className="text-danger">{message}</p>}

            {/* ฟอร์มกรอกข้อมูล */}
            <form onSubmit={addUser}>
                <div className="row justify-content-center mb-3">
                    <div className="col-md-3">
                        <input
                            type="text"
                            className="form-control"
                            placeholder="ชื่อ"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                        />
                    </div>
                    <div className="col-md-3">
                        <input
                            type="text"
                            className="form-control"
                            placeholder="นามสกุล"
                            value={lastname}
                            onChange={(e) => setLastname(e.target.value)}
                        />
                    </div>
                    <div className="col-md-3">
                        <input
                            type="number"
                            className="form-control"
                            placeholder="เงินเดือน"
                            value={salary}
                            onChange={(e) => setSalary(e.target.value)}
                        />
                    </div>
                    <div className="col-md-3">
                        <button type="submit" className="btn btn-success">➕ เพิ่มผู้ใช้</button>
                    </div>
                </div>
            </form>

            {/* แสดงข้อความโหลดข้อมูล */}
            {loading ? (
                <p>⏳ กำลังโหลดข้อมูล...</p>
            ) : (
                <table className="table table-hover table-dark mx-auto" style={{ maxWidth: '800px' }}>
                    <thead>
                        <tr>
                            <th scope="col">#</th>
                            <th scope="col">ชื่อ</th>
                            <th scope="col">นามสกุล</th>
                            <th scope="col">เงินเดือน</th>
                            <th scope="col">จัดการ</th>
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
                                    <td>
                                        <Link to={`/edit-user/${item.id}`}>
                                            <button className="btn btn-warning">✏️ แก้ไข</button>
                                        </Link>
                                        {" "}
                                        <button className="btn btn-danger" onClick={() => deleteUser(item.id)}>
                                            🗑️ ลบ
                                        </button>
                                    </td>
                                </tr>
                            ))
                        ) : (
                            <tr>
                                <td colSpan="5">⚠️ ไม่พบข้อมูลผู้ใช้งาน</td>
                            </tr>
                        )}
                    </tbody>
                </table>
            )}
        </div>
    );
}

export default Home;
