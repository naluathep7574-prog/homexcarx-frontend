import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { BrowserRouter as Router, Route, Routes, Link, useNavigate, useParams } from 'react-router-dom';
import './App.css';

const API_URL = process.env.REACT_APP_API_URL || 'http://localhost:3000/api/elderly';

function Home() {
  const [elderlyData, setElderlyData] = useState([]);
  const [message, setMessage] = useState('');
  const navigate = useNavigate();

  const fetchElderlyData = async () => {
    try {
      const response = await axios.get(API_URL);
      setElderlyData(response.data);
      setMessage('');
    } catch (error) {
      console.error('Error fetching data:', error);
      setMessage('❌ ไม่สามารถดึงข้อมูลได้');
    }
  };

  useEffect(() => {
    fetchElderlyData();
  }, []);

  const handleDeleteElderly = async (id) => {
    const confirmDelete = window.confirm('คุณต้องการที่จะลบข้อมูลนี้ใช่หรือไม่?');
    if (!confirmDelete) return;
    
    try {
      await axios.delete(`${API_URL}/${id}`);
      fetchElderlyData();
      setMessage('✅ ลบข้อมูลสำเร็จ');
    } catch (error) {
      console.error('Error deleting data:', error);
      setMessage('❌ ไม่สามารถลบข้อมูลได้');
    }
  };

  return (
    <div className="container">
      <h1>จัดการข้อมูลผู้สูงอายุ</h1>
      {message && <p className="message">{message}</p>}
      <Link to="/add"><button>เพิ่มข้อมูล</button></Link>
      <table className="table">
        <thead>
          <tr>
            <th>ชื่อ</th>
            <th>อายุ</th>
            <th>สถานะสุขภาพ</th>
            <th>ข้อมูลการติดต่อ</th>
            <th>การกระทำ</th>
          </tr>
        </thead>
        <tbody>
          {elderlyData.length > 0 ? (
            elderlyData.map((elderly) => (
              <tr key={elderly.id}>
                <td>{elderly.name}</td>
                <td>{elderly.age}</td>
                <td>{elderly.health_status}</td>
                <td>{elderly.contact_info}</td>
                <td>
                  <button onClick={() => navigate(`/edit/${elderly.id}`)}>แก้ไข</button>
                  <button className="delete-btn" onClick={() => handleDeleteElderly(elderly.id)}>ลบ</button>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="5" className="no-data">ไม่มีข้อมูล</td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
}

function AddElderly() {
  const [newElderly, setNewElderly] = useState({ name: '', age: '', health_status: '', contact_info: '' });
  const navigate = useNavigate();

  const handleAddElderly = async (e) => {
    e.preventDefault();
    try {
      await axios.post(API_URL, newElderly);
      navigate('/');
    } catch (error) {
      console.error('Error adding data:', error);
    }
  };

  return (
    <div className="container">
      <h1>เพิ่มข้อมูลผู้สูงอายุ</h1>
      <form onSubmit={handleAddElderly} className="form">
        <input type="text" placeholder="ชื่อ" value={newElderly.name}
          onChange={(e) => setNewElderly({ ...newElderly, name: e.target.value })} required />
        <input type="number" placeholder="อายุ" value={newElderly.age}
          onChange={(e) => setNewElderly({ ...newElderly, age: e.target.value })} required />
        <input type="text" placeholder="สถานะสุขภาพ" value={newElderly.health_status}
          onChange={(e) => setNewElderly({ ...newElderly, health_status: e.target.value })} required />
        <input type="text" placeholder="ข้อมูลการติดต่อ" value={newElderly.contact_info}
          onChange={(e) => setNewElderly({ ...newElderly, contact_info: e.target.value })} required />
        <button type="submit">เพิ่มข้อมูล</button>
      </form>
    </div>
  );
}

function EditElderly() {
  const { id } = useParams();
  const [elderly, setElderly] = useState({ name: '', age: '', health_status: '', contact_info: '' });
  const navigate = useNavigate();

  useEffect(() => {
    const fetchElderly = async () => {
      try {
        const response = await axios.get(`${API_URL}/${id}`);
        setElderly(response.data);
      } catch (error) {
        console.error('Error fetching elderly data:', error);
      }
    };
    fetchElderly();
  }, [id]);

  const handleUpdateElderly = async (e) => {
    e.preventDefault();
    console.log('Updated data:', elderly); // ตรวจสอบข้อมูลที่ส่งไป
    try {
      await axios.put(`${API_URL}/${id}`, {
        name: elderly.name,
        age: elderly.age,
        health_status: elderly.health_status,
        contact_info: elderly.contact_info,
      });
      navigate('/'); // กลับไปที่หน้า Home
    } catch (error) {
      console.error('Error updating data:', error);
    }
  };

  return (
    <div className="container">
      <h1>แก้ไขข้อมูลผู้สูงอายุ</h1>
      <form onSubmit={handleUpdateElderly} className="form">
      <label className="form-label">ชื่อ:</label>
        <input type="text" placeholder="ชื่อ" value={elderly.name}
          onChange={(e) => setElderly({ ...elderly, name: e.target.value })} required />
        <label className="form-label">อายุ:</label>
        <input type="number" placeholder="อายุ" value={elderly.age}
          onChange={(e) => setElderly({ ...elderly, age: e.target.value })} required />
        <label className="form-label">สถานะสุขภาพ:</label>
        <input type="text" placeholder="สถานะสุขภาพ" value={elderly.health_status}
          onChange={(e) => setElderly({ ...elderly, health_status: e.target.value })} required />
        <label className="form-label">ข้อมูลการติดต่อ:</label>
        <input type="text" placeholder="ข้อมูลการติดต่อ" value={elderly.contact_info}
          onChange={(e) => setElderly({ ...elderly, contact_info: e.target.value })} required />
        <button type="submit">อัปเดตข้อมูล</button>
      </form>
    </div>
  );
}

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/add" element={<AddElderly />} />
        <Route path="/edit/:id" element={<EditElderly />} />
      </Routes>
    </Router>
  );
}

export default App;
