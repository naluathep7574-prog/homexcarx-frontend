import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom';

function UpdateUser() {
  const [elderlyData, setElderlyData] = useState({
    name: '',
    age: '',
    health_status: '',
    contact_info: ''
  });
  const [loading, setLoading] = useState(true);
  const [message, setMessage] = useState('');

  const { id } = useParams(); // รับค่า id จาก URL
  const navigate = useNavigate();
  const API_URL = process.env.REACT_APP_API_URL || 'http://localhost:3000';

  useEffect(() => {
    const fetchElderlyData = async () => {
      try {
        const response = await axios.get(`${API_URL}/api/elderly/${id}`);
        setElderlyData(response.data);
        setLoading(false);
      } catch (error) {
        console.error('❌ Error fetching data:', error);
        setMessage('ไม่สามารถโหลดข้อมูลได้');
        setLoading(false);
      }
    };
    fetchElderlyData();
  }, [id, API_URL]);

  const updateElderly = async (e) => {
    e.preventDefault();
    try {
      await axios.put(`${API_URL}/api/elderly/${id}`, elderlyData);
      setMessage('✅ อัพเดตข้อมูลสำเร็จ!');
      setTimeout(() => navigate('/employee'), 2000); // รอ 2 วินาทีแล้วเปลี่ยนหน้า
    } catch (error) {
      console.error('❌ Error updating data:', error);
      setMessage('ไม่สามารถอัพเดตข้อมูลได้');
    }
  };

  return (
    <div className="container mt-4">
      <h2>📝 แก้ไขข้อมูลผู้สูงอายุ</h2>

      {/* แสดงข้อความโหลดข้อมูล */}
      {loading ? (
        <p>⏳ กำลังโหลดข้อมูล...</p>
      ) : (
        <form onSubmit={updateElderly}>
          {/* แสดงข้อความแจ้งเตือน */}
          {message && <p className="text-danger">{message}</p>}

          <div className="mb-3">
            <label className="form-label">ชื่อ:</label>
            <input
              type="text"
              className="form-control"
              value={elderlyData.name}
              onChange={(e) => setElderlyData({ ...elderlyData, name: e.target.value })}
              placeholder="กรอกชื่อ"
              required
            />
          </div>

          <div className="mb-3">
            <label className="form-label">อายุ:</label>
            <input
              type="number"
              className="form-control"
              value={elderlyData.age}
              onChange={(e) => setElderlyData({ ...elderlyData, age: e.target.value })}
              placeholder="กรอกอายุ"
              required
            />
          </div>

          <div className="mb-3">
            <label className="form-label">สถานะสุขภาพ:</label>
            <input
              type="text"
              className="form-control"
              value={elderlyData.health_status}
              onChange={(e) => setElderlyData({ ...elderlyData, health_status: e.target.value })}
              placeholder="กรอกสถานะสุขภาพ"
              required
            />
          </div>

          <div className="mb-3">
            <label className="form-label">ข้อมูลการติดต่อ:</label>
            <input
              type="text"
              className="form-control"
              value={elderlyData.contact_info}
              onChange={(e) => setElderlyData({ ...elderlyData, contact_info: e.target.value })}
              placeholder="กรอกข้อมูลการติดต่อ"
              required
            />
          </div>

          <button type="submit" className="btn btn-primary">💾 อัพเดตข้อมูล</button>
          <button type="button" className="btn btn-secondary ms-2" onClick={() => navigate('/employee')}>
            ❌ ยกเลิก
          </button>
        </form>
      )}
    </div>
  );
}

export default UpdateUser;
