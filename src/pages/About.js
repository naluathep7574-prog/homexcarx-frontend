import React from 'react';

function About() {
  return (
    <section style={styles.container}>
      <h2 style={styles.heading}>เกี่ยวกับระบบ</h2>
      <article style={styles.content}>
        <p>
          ระบบนี้ออกแบบมาเพื่อช่วยในการจัดการข้อมูลของผู้สูงอายุ 
          รวมถึงสถานะสุขภาพและข้อมูลการติดต่อ เพื่อให้ผู้ดูแลสามารถติดตามและดูแลได้อย่างมีประสิทธิภาพ
        </p>
      </article>
    </section>
  );
}

const styles = {
  container: {
    textAlign: 'center',
    padding: '20px',
    maxWidth: '600px',
    margin: 'auto',
  },
  heading: {
    fontSize: '24px',
    color: '#333',
  },
  content: {
    fontSize: '16px',
    color: '#555',
    lineHeight: '1.6',
  },
};

export default About;
