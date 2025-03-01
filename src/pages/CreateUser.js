import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

function CreatePatient() {
    const [name, setName] = useState("");
    const [age, setAge] = useState("");
    const [healthStatus, setHealthStatus] = useState("");
    const [contactInfo, setContactInfo] = useState("");
    const [message, setMessage] = useState("");
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!name || !age || !healthStatus || !contactInfo) {
            setMessage('❌ กรุณากรอกข้อมูลให้ครบ');
            return;
        }
        setLoading(true);
        try {
            await axios.post(`${process.env.REACT_APP_API_URL}`, { 
                name, 
                age, 
                health_status: healthStatus, 
                contact_info: contactInfo 
            });
            setName('');
            setAge('');
            setHealthStatus('');
            setContactInfo('');
            setMessage('✅ เพิ่มข้อมูลผู้สูงอายุสำเร็จ');
            setTimeout(() => navigate('/'), 2000); // Redirect after 2 sec
        } catch (error) {
            setMessage('❌ ไม่สามารถเพิ่มข้อมูลได้ กรุณาลองใหม่');
            console.error("Error adding patient:", error);
        }
        setLoading(false);
    };

    return (
        <div className="container">
            <h1>เพิ่มข้อมูลผู้สูงอายุ</h1>
            {message && <p className={`text-${message.startsWith('✅') ? 'success' : 'danger'}`}>{message}</p>}

            <form onSubmit={handleSubmit}>
                <div className="w-50 p-3">
                    <label className="form-label">ชื่อ:</label>
                    <input
                        type="text"
                        className="form-control"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        required
                    />
                </div>

                <div className="w-50 p-3">
                    <label className="form-label">อายุ:</label>
                    <input
                        type="number"
                        className="form-control"
                        value={age}
                        onChange={(e) => setAge(e.target.value)}                
                        required
                    />
                </div>

                <div className="w-50 p-3">
                    <label className="form-label">สถานะสุขภาพ:</label>
                    <textarea
                        className="form-control"
                        value={healthStatus}
                        onChange={(e) => setHealthStatus(e.target.value)}
                        required
                    />
                </div>

                <div className="w-50 p-3">
                    <label className="form-label">ข้อมูลติดต่อ:</label>
                    <input
                        type="text"
                        className="form-control"
                        value={contactInfo}
                        onChange={(e) => setContactInfo(e.target.value)}
                        required
                    />
                </div>

                <div className="w-50 p-3">
                    <button type="submit" className="btn btn-success" disabled={loading}>
                        {loading ? 'กำลังบันทึก...' : 'เพิ่มข้อมูล'}
                    </button>
                </div>
            </form>
        </div>
    );
}

export default CreatePatient;
