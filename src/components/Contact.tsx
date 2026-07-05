import React from 'react';
import { Mail, MapPin, Phone } from 'lucide-react';

export const Contact: React.FC = () => {
  return (
    <section id="contact" className="section container" style={{ paddingBottom: '120px' }}>
      <h2 className="section-title">联系我</h2>
      
      <div style={{ textAlign: 'center', maxWidth: '800px', margin: '0 auto 50px auto' }} className="animate-fade-in">
        <h3 style={{ fontSize: '1.8rem', fontFamily: 'var(--font-header)', fontWeight: 700, marginBottom: '16px' }}>
          让我们建立合作
        </h3>
        <p className="contact-subtitle">
          如果你对我的经历感兴趣，或者有任何合作机会，欢迎随时通过以下方式与我取得联系。
        </p>
      </div>
      
      {/* 3-column contact info grid */}
      <div style={{ 
        display: 'grid', 
        gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', 
        gap: '24px',
        maxWidth: '1000px',
        margin: '0 auto'
      }}>
        {/* Email */}
        <div className="glass-panel glass-card-glow animate-fade-in" style={{ padding: '30px', display: 'flex', flexDirection: 'column', alignItems: 'center', textAlign: 'center', gap: '16px' }}>
          <div className="contact-icon-wrapper" style={{ background: 'linear-gradient(135deg, rgba(139, 92, 246, 0.1), rgba(59, 82, 246, 0.1))', border: '1px solid rgba(139, 92, 246, 0.2)', width: '60px', height: '60px', borderRadius: '16px', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
            <Mail style={{ color: 'var(--accent-purple)' }} size={24} />
          </div>
          <div>
            <span className="contact-text-label" style={{ display: 'block', fontSize: '0.8rem', letterSpacing: '0.05em', color: 'var(--text-dark)', marginBottom: '4px' }}>电子邮箱</span>
            <a href="mailto:zhuzhujianwei@163.com" className="contact-text-value" style={{ fontWeight: 600, fontSize: '1.1rem', color: 'var(--text-main)' }}>zhuzhujianwei@163.com</a>
          </div>
        </div>

        {/* Location */}
        <div className="glass-panel glass-card-glow animate-fade-in" style={{ padding: '30px', display: 'flex', flexDirection: 'column', alignItems: 'center', textAlign: 'center', gap: '16px' }}>
          <div className="contact-icon-wrapper" style={{ background: 'linear-gradient(135deg, rgba(6, 182, 212, 0.1), rgba(59, 82, 246, 0.1))', border: '1px solid rgba(6, 182, 212, 0.2)', width: '60px', height: '60px', borderRadius: '16px', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
            <MapPin style={{ color: 'var(--accent-cyan)' }} size={24} />
          </div>
          <div>
            <span className="contact-text-label" style={{ display: 'block', fontSize: '0.8rem', letterSpacing: '0.05em', color: 'var(--text-dark)', marginBottom: '4px' }}>目前坐标</span>
            <p className="contact-text-value" style={{ fontWeight: 600, fontSize: '1.1rem', color: 'var(--text-main)' }}>Guangzhou, China</p>
          </div>
        </div>

        {/* Phone */}
        <div className="glass-panel glass-card-glow animate-fade-in" style={{ padding: '30px', display: 'flex', flexDirection: 'column', alignItems: 'center', textAlign: 'center', gap: '16px' }}>
          <div className="contact-icon-wrapper" style={{ background: 'linear-gradient(135deg, rgba(236, 72, 153, 0.1), rgba(139, 92, 246, 0.1))', border: '1px solid rgba(236, 72, 153, 0.2)', width: '60px', height: '60px', borderRadius: '16px', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
            <Phone style={{ color: 'var(--accent-pink)' }} size={24} />
          </div>
          <div>
            <span className="contact-text-label" style={{ display: 'block', fontSize: '0.8rem', letterSpacing: '0.05em', color: 'var(--text-dark)', marginBottom: '4px' }}>联系电话</span>
            <a href="tel:+8613286265927" className="contact-text-value" style={{ fontWeight: 600, fontSize: '1.1rem', color: 'var(--text-main)' }}>+86 132 8626 5927</a>
          </div>
        </div>
      </div>
    </section>
  );
};
