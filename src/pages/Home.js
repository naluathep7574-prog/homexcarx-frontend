import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

function Home() {
    const [data, setData] = useState([]);
    const [name, setName] = useState('');
    const [lastname, setLastname] = useState('');
    const [salary, setSalary] = useState('');
    const [message, setMessage] = useState('');
    const [loading, setLoading] = useState(true);

    const API_URL = process.env.REACT_APP_API_URL || "http://localhost:5000";

    useEffect(() => {
        fetchUser();
    }, []);

    const fetchUser = async () => {
        setLoading(true);
        try {
            const res = await axios.get(`${API_URL}/api/users`);
            setData(res.data);
        } catch (error) {
            console.error('Error fetching data:', error);
            setMessage('❌ ไม่สามารถดึงข้อมูลได้ กรุณาลองใหม่');
        } finally {
            setLoading(false);
        }
    };

    const addUser = async (e) => {
        e.preventDefault();
        if (!name.trim() || !lastname.trim() || !salary.trim()) {
            setMessage('⚠️ กรุณากรอกข้อมูลให้ครบ');
            return;
        }
        try {
            await axios.post(`${API_URL}/api/users`, { 
                name: name.trim(), 
                lastname: lastname.trim(), 
                salary: parseFloat(salary) 
            });
            fetchUser();
            setName('');
            setLastname('');
            setSalary('');
            setMessage('✅ เพิ่มข้อมูลสำเร็จ');
        } catch (error) {
            console.error('Error adding user:', error);
            setMessage('❌ ไม่สามารถเพิ่มข้อมูลได้ กรุณาลองใหม่');
        }
    };

    const deleteUser = async (id) => {
        if (!window.confirm("คุณแน่ใจหรือไม่ที่จะลบข้อมูลนี้?")) return;

        try {
            await axios.delete(`${API_URL}/api/users/${id}`);
            fetchUser();
        } catch (error) {
            console.error('Error deleting user:', error);
            setMessage('❌ ไม่สามารถลบข้อมูลได้ กรุณาลองใหม่');
        }
    };

    return (
        <div className="container text-center">
            <h1>🧑‍💼 ระบบจัดการผู้ใช้งาน</h1>

            {message && <p className="text-danger">{message}</p>}

            <form onSubmit={addUser} className="mb-3">
                <div className="row justify-content-center">
                    <div className="col-md-3 mb-2">
                        <input
                            type="text"
                            className="form-control"
                            placeholder="ชื่อ"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                        />
                    </div>
                    <div className="col-md-3 mb-2">
                        <input
                            type="text"
                            className="form-control"
                            placeholder="นามสกุล"
                            value={lastname}
                            onChange={(e) => setLastname(e.target.value)}
                        />
                    </div>
                    <div className="col-md-3 mb-2">
                        <input
                            type="number"
                            className="form-control"
                            placeholder="เลข"
                            value={salary}
                            onChange={(e) => setSalary(e.target.value)}
                        />
                    </div>
                    <div className="col-md-3">
                        <button type="submit" className="btn btn-success w-100">➕ เพิ่มผู้ใช้</button>
                    </div>
                </div>
            </form>

            {loading ? (
                <p>⏳ กำลังโหลดข้อมูล...</p>
            ) : (
                <div className="table-responsive">
                    <table className="table table-hover table-dark mx-auto">
                        <thead>
                            <tr>
                                <th>#</th>
                                <th>ชื่อ</th>
                                <th>นามสกุล</th>
                                <th>เลข</th>
                                <th>จัดการ</th>
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
                                                <button className="btn btn-warning btn-sm">✏️ แก้ไข</button>
                                            </Link>
                                            {" "}
                                            <button className="btn btn-danger btn-sm" onClick={() => deleteUser(item.id)}>
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
                </div>
            )}
        </div>
    );
}

export default Home;
