import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Phone, MapPin, Clock, Calendar, ChevronRight, Stethoscope, 
  Baby, Syringe, HeartPulse, Activity, MessageCircle, X, Send, 
  Menu, Info, BookOpen, AlertCircle, ShieldCheck, Star, Users, CheckCircle2
} from 'lucide-react';

// --- DATA ---

const servicesData = [
  { id: 1, name: 'Khám Nhi Tổng Quát', price: '30.000đ + Thuốc', desc: 'Kiểm tra sức khỏe toàn diện, theo dõi sự phát triển thể chất và tinh thần.', icon: <Baby size={32} /> },
  { id: 2, name: 'Tư vấn Dinh dưỡng', price: '30.000đ + Thuốc', desc: 'Đánh giá chỉ số phát triển, tư vấn chế độ ăn dặm và trẻ biếng ăn.', icon: <HeartPulse size={32} /> },
  { id: 3, name: 'Khám Hô hấp', price: '30.000đ + Thuốc', desc: 'Chuyên sâu ho, hen phế quản, viêm phổi, viêm tiểu phế quản.', icon: <Activity size={32} /> },
  { id: 4, name: 'Khám Tiêu hóa', price: '30.000đ + Thuốc', desc: 'Điều trị tiêu chảy, táo bón, rối loạn tiêu hóa và nhiễm trùng đường ruột.', icon: <Stethoscope size={32} /> },
  { id: 5, name: 'Xông khí dung', price: '30.000đ / Lần', desc: 'Hỗ trợ làm sạch đường hô hấp bằng máy xông khí dung hiện đại.', icon: <Syringe size={32} /> },
];

const faqsData = [
  {
    q: "Bé sơ sinh bị sốt 38.2°C, tôi có thể cho uống thuốc tại nhà không?",
    a: "Tuyệt đối KHÔNG. Trẻ dưới 3 tháng tuổi sốt >= 38°C có thể là dấu hiệu nhiễm trùng nặng. Cần đưa bé đến Cấp cứu hoặc phòng khám ngay để bác sĩ kiểm tra. Không tự ý dùng thuốc vì có thể che lấp triệu chứng nguy hiểm."
  },
  {
    q: "Trẻ ho và sổ mũi kéo dài, có nên tự mua kháng sinh?",
    a: "Không nên. Đa số ho sổ mũi là do virus, kháng sinh không có tác dụng. Việc dùng kháng sinh bừa bãi gây đề kháng thuốc. Hãy ưu tiên làm sạch mũi bằng nước muối sinh lý và theo dõi nhịp thở của bé."
  },
  {
    q: "Bé bị tiêu chảy phân lỏng nhiều lần, dùng thuốc cầm được không?",
    a: "Tránh dùng thuốc cầm tiêu chảy ở trẻ em. Quan trọng nhất là bù nước bằng Oresol và bổ sung Kẽm. Nếu bé có dấu hiệu xẹp thóp, môi khô, khóc không ra nước mắt, cần nhập viện ngay."
  },
  {
    q: "Khi nào cần đưa bé đi khám ngay lập tức?",
    a: "Khi bé có các dấu hiệu: Sốt cao khó hạ, lừ đừ, bỏ bú, thở nhanh/rút lõm lồng ngực, nôn tất cả mọi thứ, co giật hoặc phát ban dạng xuất huyết."
  }
];

// --- MAIN COMPONENT ---

export default function App() {
  const [activeTab, setActiveTab] = useState('home');
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    window.scrollTo(0, 0);
    setIsMobileMenuOpen(false);
  }, [activeTab]);

  return (
    <div className="font-sans text-slate-900 bg-slate-50 min-h-screen flex flex-col selection:bg-red-500 selection:text-white">
      {/* Navigation */}
      <Header 
        activeTab={activeTab} 
        setActiveTab={setActiveTab} 
        isOpen={isMobileMenuOpen} 
        setIsOpen={setIsMobileMenuOpen} 
      />

      {/* Content */}
      <main className="flex-grow">
        <AnimatePresence mode="wait">
          <motion.div
            key={activeTab}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.3 }}
          >
            {activeTab === 'home' && <HomeTab setActiveTab={setActiveTab} />}
            {activeTab === 'services' && <ServicesTab setActiveTab={setActiveTab} />}
            {activeTab === 'qna' && <QnATab />}
          </motion.div>
        </AnimatePresence>
      </main>

      {/* Footer */}
      <Footer />

      {/* Floating Widgets */}
      <ChatbotWidget />
    </div>
  );
}

// --- SUB-COMPONENTS ---

function Header({ activeTab, setActiveTab, isOpen, setIsOpen }) {
  const navItems = [
    { id: 'home', label: 'Trang chủ', icon: <HeartPulse size={18} /> },
    { id: 'services', label: 'Dịch vụ & Bảng giá', icon: <Stethoscope size={18} /> },
    { id: 'qna', label: 'Cẩm nang cho Mẹ', icon: <BookOpen size={18} /> },
  ];

  return (
    <header className="bg-white/90 backdrop-blur-md shadow-sm sticky top-0 z-50 border-b border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-20">
          <div 
            className="flex items-center cursor-pointer group" 
            onClick={() => setActiveTab('home')}
          >
            <div className="w-10 h-10 bg-red-600 text-white rounded-lg flex items-center justify-center shadow-lg shadow-red-100 group-hover:rotate-6 transition-transform">
              <Baby size={24} />
            </div>
            <div className="ml-3">
              <h1 className="text-xl font-bold text-slate-900 leading-tight uppercase tracking-tight">Nhi Thiên Tân</h1>
              <p className="text-[10px] text-red-600 font-semibold tracking-widest uppercase">BS.CKI Anh Toàn</p>
            </div>
          </div>

          <nav className="hidden md:flex items-center gap-1">
            {navItems.map((item) => (
              <button
                key={item.id}
                onClick={() => setActiveTab(item.id)}
                className={`flex items-center px-5 py-2 text-sm font-semibold rounded-full transition-all ${
                  activeTab === item.id 
                    ? 'bg-red-50 text-red-600 shadow-sm' 
                    : 'text-slate-500 hover:text-red-600 hover:bg-slate-50'
                }`}
              >
                <span className="mr-2">{item.icon}</span>
                {item.label}
              </button>
            ))}
          </nav>

          <div className="hidden md:block">
            <button 
              onClick={() => window.open('https://zalo.me/0901019025', '_blank')}
              className="bg-red-600 text-white px-7 py-2.5 rounded-full font-bold text-sm shadow-lg shadow-red-100 hover:bg-red-700 hover:scale-[1.02] transition-all flex items-center gap-2"
            >
              <MessageCircle size={18} />
              Đặt lịch khám
            </button>
          </div>

          <div className="md:hidden">
            <button 
              onClick={() => setIsOpen(!isOpen)}
              className="p-2 text-slate-500 hover:text-red-600 transition-colors"
            >
              {isOpen ? <X size={28} /> : <Menu size={28} />}
            </button>
          </div>
        </div>
      </div>

      <AnimatePresence>
        {isOpen && (
          <motion.div 
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden bg-white border-t border-slate-100 overflow-hidden"
          >
            <div className="px-4 py-4 space-y-2">
              {navItems.map((item) => (
                <button
                  key={item.id}
                  onClick={() => setActiveTab(item.id)}
                  className={`flex w-full items-center px-4 py-3 rounded-xl text-base font-medium ${
                    activeTab === item.id ? 'bg-red-50 text-red-600' : 'text-slate-700 hover:bg-slate-50'
                  }`}
                >
                  <span className="mr-3 text-red-500">{item.icon}</span>
                  {item.label}
                </button>
              ))}
              <hr className="border-slate-100" />
              <button
                onClick={() => window.open('https://zalo.me/0901019025', '_blank')}
                className="w-full flex items-center justify-center gap-2 py-4 bg-red-600 text-white rounded-xl font-bold shadow-md shadow-red-100"
              >
                <MessageCircle size={20} />
                Đặt lịch Qua Zalo
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}

function HomeTab({ setActiveTab }) {
  return (
    <div>
      {/* Hero Section */}
      <section className="relative pt-12 pb-20 lg:pt-24 lg:pb-32 overflow-hidden bg-white">
        <div className="absolute top-0 right-0 w-1/2 h-full bg-slate-50 -z-10 rounded-l-[100px] hidden lg:block"></div>
        
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="lg:grid lg:grid-cols-2 lg:gap-16 items-center">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
            >
              <div className="inline-flex items-center px-4 py-1.5 rounded-full bg-red-50 text-red-700 font-bold text-xs mb-6 border border-red-100 uppercase tracking-widest">
                <CheckCircle2 size={14} className="mr-2" />
                ✓ Top 10 Phòng Khám Nhi Uy Tín 2024 tại Vĩnh Long
              </div>
              <h2 className="text-5xl lg:text-7xl font-extrabold text-slate-900 leading-[1.1] mb-6">
                Chăm sóc tận tâm, <br /> 
                <span className="text-red-600">Ươm mầm tương lai</span>
              </h2>
              <p className="text-lg text-slate-600 mb-10 max-w-xl leading-relaxed">
                Trực tiếp thăm khám bởi <strong>BS.CK1 Phạm Nguyễn Anh Toàn</strong> với hơn 15 năm kinh nghiệm. Chúng tôi mang đến môi trường y tế an toàn, hiện đại và tận tâm nhất cho bé yêu của bạn.
              </p>
              
              <div className="flex flex-col sm:flex-row gap-4 mb-10">
                <motion.button 
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={() => window.open('https://zalo.me/0901019025', '_blank')}
                  className="px-8 py-4 bg-red-600 text-white rounded-2xl font-bold shadow-xl shadow-red-200 flex items-center justify-center gap-3 hover:bg-red-700"
                >
                  <MessageCircle size={22} className="text-white" />
                  Đặt lịch khám ngay
                </motion.button>
                <button 
                  onClick={() => setActiveTab('services')}
                  className="px-8 py-4 bg-white border-2 border-slate-100 text-slate-900 rounded-2xl font-bold hover:bg-slate-50 transition-colors flex items-center justify-center"
                >
                  Dịch vụ & Bảng giá
                </button>
              </div>

              <div className="flex items-center gap-4">
                <div className="flex -space-x-4">
                  <div className="w-10 h-10 rounded-full border-2 border-white bg-slate-200"></div>
                  <div className="w-10 h-10 rounded-full border-2 border-white bg-slate-300"></div>
                  <div className="w-10 h-10 rounded-full border-2 border-white bg-slate-400"></div>
                </div>
                <p className="text-sm text-slate-500">
                  <span className="font-bold text-slate-900">15,000+</span> phụ huynh đã tin tưởng
                </p>
              </div>
            </motion.div>
            
            <motion.div 
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="mt-12 lg:mt-0 relative"
            >
              <div className="relative z-10 w-full aspect-square max-w-md mx-auto rounded-[60px] overflow-hidden shadow-2xl border-8 border-white">
                <img 
                  src="https://images.unsplash.com/photo-1559839734-2b71ea197ec2?auto=format&fit=crop&w=800&q=80" 
                  alt="BS.CKI Phạm Nguyễn Anh Toàn" 
                  className="w-full h-full object-cover object-top"
                />
              </div>
              <div className="absolute -bottom-6 -left-6 bg-white p-6 rounded-3xl shadow-xl z-20 hidden md:block border border-slate-100">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center text-green-600">
                    <ShieldCheck size={28} />
                  </div>
                  <div>
                    <h4 className="font-bold text-slate-900">Chuẩn WHO</h4>
                    <p className="text-xs text-slate-500">Phác đồ chuẩn quốc tế</p>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Philosophy Section */}
      <section className="py-24 bg-slate-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold mb-4">Tại sao chọn Thiên Tân?</h2>
            <div className="w-20 h-1.5 bg-red-600 mx-auto rounded-full"></div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              { 
                title: 'Thận Trọng', 
                desc: 'Mọi chẩn đoán đều dựa trên bằng chứng lâm sàng và cận lâm sàng chính xác, không nóng vội.',
                icon: <Activity className="text-blue-500" />
              },
              { 
                title: 'Chuẩn Mực', 
                desc: 'Phác đồ điều trị tuân thủ nghiêm ngặt hướng dẫn của Bộ Y tế và các tổ chức Nhi khoa thế giới.',
                icon: <CheckCircle2 className="text-red-500" />
              },
              { 
                title: 'Gần Gũi', 
                desc: 'Lắng nghe nỗi lòng của ba mẹ, thấu hiểu tâm lý trẻ thơ để mang lại sự an tâm tuyệt đối.',
                icon: <HeartPulse className="text-orange-500" />
              },
            ].map((item, idx) => (
              <motion.div 
                key={idx}
                whileHover={{ y: -5 }}
                className="bg-white p-10 rounded-3xl shadow-sm border border-slate-100 hover:shadow-xl transition-all"
              >
                <div className="w-14 h-14 bg-slate-50 rounded-2xl flex items-center justify-center mb-6 text-2xl">
                  {item.icon}
                </div>
                <h3 className="text-xl font-bold mb-4 text-slate-900">{item.title}</h3>
                <p className="text-slate-600 leading-relaxed">{item.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}

function ServicesTab() {
  return (
    <section className="py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold mb-4">Dịch vụ Y tế</h2>
          <p className="text-slate-600">Minh bạch chi phí - Chăm sóc tận tâm</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {servicesData.map((s, idx) => (
            <motion.div 
              key={s.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: idx * 0.1 }}
              className="group bg-white p-8 rounded-[40px] shadow-sm border border-slate-100 hover:border-rose-200 transition-all flex flex-col items-start gap-6"
            >
              <div className="w-16 h-16 bg-red-50 text-red-600 rounded-3xl flex items-center justify-center group-hover:bg-red-600 group-hover:text-white transition-all duration-300">
                {s.icon}
              </div>
              <div>
                <h3 className="text-xl font-bold mb-2 text-slate-900">{s.name}</h3>
                <p className="text-sm text-slate-500 leading-relaxed">{s.desc}</p>
              </div>
              <div className="mt-auto w-full pt-6 border-t border-slate-50 flex justify-between items-center">
                <div className="flex flex-col">
                  <span className="text-[10px] uppercase font-bold text-slate-400 tracking-widest">Phí khám</span>
                  <span className="text-lg font-bold text-red-600">{s.price}</span>
                </div>
                <button 
                  onClick={() => window.open('https://zalo.me/0901019025', '_blank')}
                  className="p-3 bg-slate-50 rounded-2xl text-slate-400 hover:bg-red-600 hover:text-white transition-all"
                >
                  <ChevronRight size={20} />
                </button>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

function QnATab() {
  const [openIdx, setOpenIdx] = useState(0);

  return (
    <section className="py-20 bg-white min-h-[70vh]">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold mb-4">Góc Sức Khỏe</h2>
          <p className="text-slate-600">Kiến thức y khoa chuẩn mực cho ba mẹ</p>
        </div>

        <div className="space-y-4">
          {faqsData.map((faq, idx) => (
            <div 
              key={idx}
              className={`border-2 rounded-3xl overflow-hidden transition-all ${
                openIdx === idx ? 'border-red-400 bg-red-50/20' : 'border-slate-100 hover:border-red-200'
              }`}
            >
              <button
                onClick={() => setOpenIdx(openIdx === idx ? -1 : idx)}
                className="w-full px-8 py-6 text-left flex justify-between items-center bg-transparent"
              >
                <span className={`font-bold text-lg transition-colors ${openIdx === idx ? 'text-red-600' : 'text-slate-900'}`}>{faq.q}</span>
                <div className={`p-2 rounded-full transition-all ${openIdx === idx ? 'bg-red-600 text-white rotate-90' : 'bg-slate-100 text-slate-400'}`}>
                  <ChevronRight size={20} />
                </div>
              </button>
              
              <AnimatePresence>
                {openIdx === idx && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: 'auto', opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                  >
                    <div className="px-8 pb-8 flex gap-4">
                      <div className="w-1 h-auto bg-red-200 rounded-full flex-shrink-0"></div>
                      <p className="text-slate-600 leading-relaxed italic">
                        <strong className="text-slate-900 block not-italic mb-1 underline decoration-red-200 underline-offset-4">Lời khuyên của Bác sĩ:</strong>
                        {faq.a}
                      </p>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function Footer() {
  return (
    <footer className="bg-slate-900 text-white pt-20 pb-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 mb-16">
          <div className="flex flex-col gap-6">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-red-600 text-white rounded-xl flex items-center justify-center">
                <Baby size={24} />
              </div>
              <h3 className="text-2xl font-bold uppercase tracking-tight">Nhi Thiên Tân</h3>
            </div>
            <p className="text-slate-400 leading-relaxed max-w-sm text-sm">
              Tại Thiên Tân, chúng tôi kết hợp y đức cùng công nghệ hiện đại để mang đến giải pháp y tế toàn diện nhất cho bé yêu của bạn.
            </p>
            <div className="flex gap-4">
               {/* Social placeholders */}
               <div className="w-10 h-10 rounded-full bg-slate-800 flex items-center justify-center text-red-500 hover:bg-red-600 hover:text-white transition-colors cursor-pointer">
                 <Phone size={18} />
               </div>
            </div>
          </div>

          <div>
            <h4 className="text-xl font-bold mb-6 flex items-center gap-2">
              <Clock size={20} className="text-red-500 " />
              Giờ Làm Việc
            </h4>
            <div className="space-y-4">
              <div className="flex justify-between items-center py-3 border-b border-white/10 text-sm">
                <span className="text-slate-300">Thứ 2 - Thứ 6</span>
                <span className="font-bold text-green-400">17:00 - 19:30</span>
              </div>
              <div className="flex justify-between items-center py-3 border-b border-white/10 text-sm">
                <span className="text-slate-300">Thứ 7 - Chủ Nhật</span>
                <span className="font-bold text-red-400">17:00 - 19:30</span>
              </div>
              <p className="text-xs text-slate-500 italic mt-2">
                (Nghỉ vào những ngày Bác sĩ trực tại bệnh viện)
              </p>
            </div>
          </div>

          <div>
            <h4 className="text-xl font-bold mb-6 flex items-center gap-2">
              <MapPin size={20} className="text-red-500" />
              Liên Hệ
            </h4>
            <div className="space-y-4 text-sm">
              <p className="text-slate-400 flex gap-3">
                <MapPin size={24} className="flex-shrink-0 text-slate-600" />
                <span>73/26, Phó Cơ Điều, khóm 9, phường Long Châu, tỉnh Vĩnh Long.</span>
              </p>
              <p className="text-slate-400 flex gap-3">
                <Phone size={20} className="flex-shrink-0 text-slate-600" />
                <span>Hotline: 0901 019 025</span>
              </p>
            </div>
          </div>
        </div>

        <div className="pt-10 border-t border-white/5 text-center text-slate-500 text-[10px] uppercase font-bold tracking-widest leading-loose">
          © {new Date().getFullYear()} Nhi Thiên Tân • Chăm sóc sức khỏe nhi khoa chất lượng cao
        </div>
      </div>
    </footer>
  );
}

function ChatbotWidget() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([
    { role: 'bot', text: 'Chào ba mẹ! Mình là Trợ lý AI của Nhi Thiên Tân. Ba mẹ cần tư vấn gì về sức khỏe cho bé ạ?' }
  ]);
  const [input, setInput] = useState('');
  const endRef = useRef(null);

  useEffect(() => {
    endRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, isOpen]);

  const handleSend = (e) => {
    e.preventDefault();
    if (!input.trim()) return;

    const userText = input.trim();
    setMessages([...messages, { role: 'user', text: userText }]);
    setInput('');

    setTimeout(() => {
      let reply = "Cảm ơn ba mẹ đã hỏi. Do tình trạng của trẻ cần được khám trực tiếp mới có chẩn đoán chính xác nhất, ba mẹ vui lòng đưa bé đến phòng khám nhé!";
      const lowInput = userText.toLowerCase();

      if (lowInput.includes('sốt')) reply = "Nếu bé sốt cao trên 38.5 độ, hãy uống hạ sốt đúng liều và lau mát. Nếu bé dưới 3 tháng tuổi sốt, hãy đưa đi viện ngay lập tức!";
      if (lowInput.includes('ho')) reply = "Ho là phản xạ bảo vệ đường thở. Ba mẹ nên giữ ấm, nhỏ mũi và cho bé uống nhiều nước ấm nhé.";
      if (lowInput.includes('lịch') || lowInput.includes('mấy giờ')) reply = "Dạ, Bác sĩ khám từ 17:00 đến 19:30 các ngày trong tuần ạ!";
      if (lowInput.includes('giá')) reply = "Phí khám là 30.000đ mỗi lần (chưa gồm thuốc) ạ.";

      setMessages(prev => [...prev, { role: 'bot', text: reply }]);
    }, 800);
  };

  return (
    <>
      <button 
        onClick={() => setIsOpen(true)}
        className={`fixed bottom-6 right-6 w-16 h-16 bg-red-600 text-white rounded-full shadow-2xl flex items-center justify-center z-50 hover:scale-110 transition-all ${isOpen ? 'scale-0' : 'scale-100'}`}
      >
        <MessageCircle size={30} />
      </button>

      <div className={`fixed bottom-6 right-6 w-[360px] h-[550px] max-h-[85vh] bg-white rounded-[40px] shadow-2xl z-50 flex flex-col overflow-hidden border border-slate-100 transition-all duration-300 origin-bottom-right ${isOpen ? 'scale-100 opacity-100' : 'scale-0 opacity-0 pointer-events-none'}`}>
        <div className="bg-red-600 p-6 text-white flex justify-between items-center">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-white/20 rounded-2xl flex items-center justify-center">
              <Baby size={20} />
            </div>
            <div>
              <h4 className="font-bold">Trợ lý Thiên Tân</h4>
              <p className="text-[10px] opacity-80 uppercase font-bold tracking-widest">Online</p>
            </div>
          </div>
          <button onClick={() => setIsOpen(false)} className="bg-white/10 p-2 rounded-xl hover:bg-white/20 transition-colors">
            <X size={20} />
          </button>
        </div>

        <div className="flex-grow p-5 overflow-y-auto bg-slate-50 space-y-4">
          {messages.map((m, i) => (
            <div key={i} className={`flex ${m.role === 'user' ? 'justify-end' : 'justify-start'}`}>
              <div className={`max-w-[85%] p-4 rounded-3xl text-sm ${
                m.role === 'user' 
                  ? 'bg-red-600 text-white rounded-tr-none' 
                  : 'bg-white text-slate-800 rounded-tl-none shadow-sm border border-slate-100'
              }`}>
                {m.text}
              </div>
            </div>
          ))}
          <div ref={endRef} />
        </div>

        <form onSubmit={handleSend} className="p-4 bg-white border-t border-slate-100 flex gap-2">
          <input 
            type="text" 
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Ba mẹ cần tư vấn gì ạ?"
            className="flex-grow bg-slate-100 border-none rounded-2xl px-5 py-3 text-sm focus:ring-2 focus:ring-red-600 transition-all"
          />
          <button type="submit" className="bg-red-600 text-white p-3 rounded-2xl hover:bg-red-700 transition-colors">
            <Send size={18} />
          </button>
        </form>
      </div>
    </>
  );
}
