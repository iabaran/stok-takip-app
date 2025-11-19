import React, { useState, useEffect } from 'react';
import { Plus, Users, Package, TrendingUp, Edit2, Trash2, ArrowDown, ArrowUp, Building2 } from 'lucide-react';

export default function MuhasebeProgram() {
  const [activeTab, setActiveTab] = useState('musteriler');
  const [musteriler, setMusteriler] = useState([]);
  const [tedarikciler, setTedarikciler] = useState([]);
  const [urunler, setUrunler] = useState([]);
  const [hareketler, setHareketler] = useState([]);
  const [stokHareketleri, setStokHareketleri] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [modalType, setModalType] = useState('');
  const [editItem, setEditItem] = useState(null);

  // İlk yükleme - örnek veriler
  useEffect(() => {
    const savedMusteriler = localStorage.getItem('musteriler');
    const savedTedarikciler = localStorage.getItem('tedarikciler');
    const savedUrunler = localStorage.getItem('urunler');
    const savedHareketler = localStorage.getItem('hareketler');
    const savedStokHareketleri = localStorage.getItem('stokHareketleri');
    
    if (savedMusteriler) {
      setMusteriler(JSON.parse(savedMusteriler));
    } else {
      const ornekMusteriler = [
        { id: 1, ad: 'Ahmet Yılmaz', telefon: '0532 123 45 67', adres: 'İstanbul, Kadıköy' },
        { id: 2, ad: 'Ayşe Demir', telefon: '0533 234 56 78', adres: 'Ankara, Çankaya' }
      ];
      setMusteriler(ornekMusteriler);
    }

    if (savedTedarikciler) {
      setTedarikciler(JSON.parse(savedTedarikciler));
    } else {
      const ornekTedarikciler = [
        { id: 1, ad: 'ABC Kağıt A.Ş.', telefon: '0212 345 67 89', adres: 'İstanbul, Ümraniye' }
      ];
      setTedarikciler(ornekTedarikciler);
    }
    
    if (savedUrunler) {
      setUrunler(JSON.parse(savedUrunler));
    } else {
      const ornekUrunler = [
        { id: 1, ad: 'A4 Kağıt', fiyat: 5000, stok: 20, birim: 'ton' }
      ];
      setUrunler(ornekUrunler);
    }

    if (savedStokHareketleri) {
      setStokHareketleri(JSON.parse(savedStokHareketleri));
    } else {
      const ornekStokHareketleri = [
        {
          id: 1,
          tip: 'giris',
          urunId: 1,
          miktar: 10,
          tedarikciId: 1,
          tutar: 40000,
          aciklama: 'İlk stok alımı',
          tarih: new Date('2024-11-01').toISOString()
        },
        {
          id: 2,
          tip: 'cikis',
          urunId: 1,
          miktar: 2,
          musteriId: 1,
          tutar: 10000,
          aciklama: 'Satış - Ahmet Yılmaz',
          tarih: new Date('2024-11-05').toISOString()
        },
        {
          id: 3,
          tip: 'cikis',
          urunId: 1,
          miktar: 3,
          musteriId: 2,
          tutar: 15000,
          aciklama: 'Satış - Ayşe Demir',
          tarih: new Date('2024-11-08').toISOString()
        },
        {
          id: 4,
          tip: 'giris',
          urunId: 1,
          miktar: 15,
          tedarikciId: 1,
          tutar: 57000,
          aciklama: 'Stok takviyesi - ABC Kağıt A.Ş.',
          tarih: new Date('2024-11-10').toISOString()
        }
      ];
      setStokHareketleri(ornekStokHareketleri);
    }
    
    if (savedHareketler) {
      setHareketler(JSON.parse(savedHareketler));
    } else {
      const ornekHareketler = [
        {
          id: 1,
          tip: 'satis',
          musteriId: 1,
          urunId: 1,
          miktar: 2,
          tutar: 10000,
          tarih: new Date('2024-11-05').toISOString()
        },
        {
          id: 2,
          tip: 'satis',
          musteriId: 2,
          urunId: 1,
          miktar: 3,
          tutar: 15000,
          tarih: new Date('2024-11-08').toISOString()
        }
      ];
      setHareketler(ornekHareketler);
    }
  }, []);

  useEffect(() => {
    localStorage.setItem('musteriler', JSON.stringify(musteriler));
  }, [musteriler]);

  useEffect(() => {
    localStorage.setItem('tedarikciler', JSON.stringify(tedarikciler));
  }, [tedarikciler]);

  useEffect(() => {
    localStorage.setItem('urunler', JSON.stringify(urunler));
  }, [urunler]);

  useEffect(() => {
    localStorage.setItem('hareketler', JSON.stringify(hareketler));
  }, [hareketler]);

  useEffect(() => {
    localStorage.setItem('stokHareketleri', JSON.stringify(stokHareketleri));
  }, [stokHareketleri]);

  const musteriEkle = (musteri) => {
    if (editItem) {
      setMusteriler(musteriler.map(m => m.id === editItem.id ? { ...musteri, id: editItem.id } : m));
    } else {
      setMusteriler([...musteriler, { ...musteri, id: Date.now() }]);
    }
  };

  const tedarikciEkle = (tedarikci) => {
    if (editItem) {
      setTedarikciler(tedarikciler.map(t => t.id === editItem.id ? { ...tedarikci, id: editItem.id } : t));
    } else {
      setTedarikciler([...tedarikciler, { ...tedarikci, id: Date.now() }]);
    }
  };

  const urunEkle = (urun) => {
    if (editItem) {
      setUrunler(urunler.map(u => u.id === editItem.id ? { ...urun, id: editItem.id } : u));
    } else {
      setUrunler([...urunler, { ...urun, id: Date.now(), stok: 0 }]);
    }
  };

  const stokHareketEkle = (hareket) => {
    const yeniHareket = { ...hareket, id: Date.now(), tarih: new Date().toISOString() };
    setStokHareketleri([...stokHareketleri, yeniHareket]);
    
    setUrunler(urunler.map(u => {
      if (u.id === parseInt(hareket.urunId)) {
        const yeniStok = hareket.tip === 'giris' 
          ? u.stok + parseFloat(hareket.miktar)
          : u.stok - parseFloat(hareket.miktar);
        return { ...u, stok: yeniStok };
      }
      return u;
    }));

    if (hareket.tip === 'cikis' && hareket.musteriId) {
      const satisHareket = {
        id: Date.now() + 1,
        tip: 'satis',
        musteriId: hareket.musteriId,
        urunId: hareket.urunId,
        miktar: hareket.miktar,
        tutar: hareket.tutar,
        tarih: yeniHareket.tarih
      };
      setHareketler([...hareketler, satisHareket]);
    }
  };

  const hareketEkle = (hareket) => {
    setHareketler([...hareketler, { ...hareket, id: Date.now(), tarih: new Date().toISOString() }]);
  };

  const sil = (id, type) => {
    if (window.confirm('Silmek istediğinizden emin misiniz?')) {
      if (type === 'musteri') setMusteriler(musteriler.filter(m => m.id !== id));
      if (type === 'tedarikci') setTedarikciler(tedarikciler.filter(t => t.id !== id));
      if (type === 'urun') setUrunler(urunler.filter(u => u.id !== id));
      if (type === 'hareket') setHareketler(hareketler.filter(h => h.id !== id));
      if (type === 'stokHareket') setStokHareketleri(stokHareketleri.filter(h => h.id !== id));
    }
  };

  const musteriBorc = (musteriId) => {
    const musteriHareketleri = hareketler.filter(h => h.musteriId === musteriId);
    const toplamSatis = musteriHareketleri
      .filter(h => h.tip === 'satis')
      .reduce((sum, h) => sum + (h.tutar || 0), 0);
    const toplamOdeme = musteriHareketleri
      .filter(h => h.tip === 'odeme')
      .reduce((sum, h) => sum + (h.tutar || 0), 0);
    return toplamSatis - toplamOdeme;
  };

  const openModal = (type, item = null) => {
    setModalType(type);
    setEditItem(item);
    setShowModal(true);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto p-6">
        <div className="bg-white rounded-lg shadow-md p-6 mb-6">
          <h1 className="text-3xl font-bold text-gray-800 mb-2">Muhasebe ve Stok Takip Sistemi</h1>
          <p className="text-gray-600">Müşteri, stok ve alacak takibi - Detaylı stok hareketi</p>
        </div>

        <div className="flex gap-2 mb-6 overflow-x-auto pb-2">
          {[
            { key: 'musteriler', icon: Users, label: 'Müşteriler' },
            { key: 'tedarikciler', icon: Building2, label: 'Tedarikçiler' },
            { key: 'urunler', icon: Package, label: 'Ürünler' },
            { key: 'stokHareketleri', icon: TrendingUp, label: 'Stok Hareketleri' },
            { key: 'hareketler', icon: TrendingUp, label: 'Ödemeler' }
          ].map(tab => {
            const Icon = tab.icon;
            return (
              <button
                key={tab.key}
                onClick={() => setActiveTab(tab.key)}
                className={`flex items-center gap-2 px-6 py-3 rounded-lg font-medium transition whitespace-nowrap ${
                  activeTab === tab.key ? 'bg-blue-600 text-white' : 'bg-white text-gray-700 hover:bg-gray-100'
                }`}
              >
                <Icon size={20} />
                {tab.label}
              </button>
            );
          })}
        </div>

        <div className="bg-white rounded-lg shadow-md p-6">
          {activeTab === 'musteriler' && (
            <MusterilerTab musteriler={musteriler} musteriBorc={musteriBorc} openModal={openModal} sil={sil} />
          )}
          {activeTab === 'tedarikciler' && (
            <TedarikcilerTab tedarikciler={tedarikciler} openModal={openModal} sil={sil} />
          )}
          {activeTab === 'urunler' && (
            <UrunlerTab urunler={urunler} openModal={openModal} sil={sil} />
          )}
          {activeTab === 'stokHareketleri' && (
            <StokHareketleriTab 
              stokHareketleri={stokHareketleri}
              musteriler={musteriler}
              tedarikciler={tedarikciler}
              urunler={urunler}
              openModal={openModal}
              sil={sil}
            />
          )}
          {activeTab === 'hareketler' && (
            <HareketlerTab hareketler={hareketler} musteriler={musteriler} urunler={urunler} openModal={openModal} sil={sil} />
          )}
        </div>
      </div>

      {showModal && (
        <Modal 
          type={modalType}
          editItem={editItem}
          onClose={() => { setShowModal(false); setEditItem(null); }}
          onSubmit={(data) => {
            if (modalType === 'musteri') musteriEkle(data);
            if (modalType === 'tedarikci') tedarikciEkle(data);
            if (modalType === 'urun') urunEkle(data);
            if (modalType === 'hareket') hareketEkle(data);
            if (modalType === 'stokHareket') stokHareketEkle(data);
            setShowModal(false);
            setEditItem(null);
          }}
          musteriler={musteriler}
          tedarikciler={tedarikciler}
          urunler={urunler}
        />
      )}
    </div>
  );
}

function MusterilerTab({ musteriler, musteriBorc, openModal, sil }) {
  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold text-gray-800">Müşteriler</h2>
        <button
          onClick={() => openModal('musteri')}
          className="flex items-center gap-2 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition"
        >
          <Plus size={20} />
          Yeni Müşteri
        </button>
      </div>

      {musteriler.length === 0 ? (
        <p className="text-gray-500 text-center py-8">Henüz müşteri eklenmemiş</p>
      ) : (
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b-2 border-gray-200">
                <th className="text-left py-3 px-4">Ad Soyad</th>
                <th className="text-left py-3 px-4">Telefon</th>
                <th className="text-left py-3 px-4">Adres</th>
                <th className="text-right py-3 px-4">Bakiye</th>
                <th className="text-right py-3 px-4">İşlemler</th>
              </tr>
            </thead>
            <tbody>
              {musteriler.map(musteri => {
                const bakiye = musteriBorc(musteri.id);
                return (
                  <tr key={musteri.id} className="border-b border-gray-100 hover:bg-gray-50">
                    <td className="py-3 px-4 font-medium">{musteri.ad}</td>
                    <td className="py-3 px-4">{musteri.telefon}</td>
                    <td className="py-3 px-4">{musteri.adres}</td>
                    <td className={`py-3 px-4 text-right font-bold ${bakiye > 0 ? 'text-red-600' : bakiye < 0 ? 'text-green-600' : 'text-gray-600'}`}>
                      {bakiye.toFixed(2)} ₺
                    </td>
                    <td className="py-3 px-4 text-right">
                      <button onClick={() => openModal('musteri', musteri)} className="text-blue-600 hover:text-blue-800 mr-3">
                        <Edit2 size={18} />
                      </button>
                      <button onClick={() => sil(musteri.id, 'musteri')} className="text-red-600 hover:text-red-800">
                        <Trash2 size={18} />
                      </button>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}

function TedarikcilerTab({ tedarikciler, openModal, sil }) {
  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold text-gray-800">Tedarikçiler</h2>
        <button
          onClick={() => openModal('tedarikci')}
          className="flex items-center gap-2 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition"
        >
          <Plus size={20} />
          Yeni Tedarikçi
        </button>
      </div>

      {tedarikciler.length === 0 ? (
        <p className="text-gray-500 text-center py-8">Henüz tedarikçi eklenmemiş</p>
      ) : (
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b-2 border-gray-200">
                <th className="text-left py-3 px-4">Firma Adı</th>
                <th className="text-left py-3 px-4">Telefon</th>
                <th className="text-left py-3 px-4">Adres</th>
                <th className="text-right py-3 px-4">İşlemler</th>
              </tr>
            </thead>
            <tbody>
              {tedarikciler.map(tedarikci => (
                <tr key={tedarikci.id} className="border-b border-gray-100 hover:bg-gray-50">
                  <td className="py-3 px-4 font-medium">{tedarikci.ad}</td>
                  <td className="py-3 px-4">{tedarikci.telefon}</td>
                  <td className="py-3 px-4">{tedarikci.adres}</td>
                  <td className="py-3 px-4 text-right">
                    <button onClick={() => openModal('tedarikci', tedarikci)} className="text-blue-600 hover:text-blue-800 mr-3">
                      <Edit2 size={18} />
                    </button>
                    <button onClick={() => sil(tedarikci.id, 'tedarikci')} className="text-red-600 hover:text-red-800">
                      <Trash2 size={18} />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}

function UrunlerTab({ urunler, openModal, sil }) {
  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold text-gray-800">Ürünler</h2>
        <button
          onClick={() => openModal('urun')}
          className="flex items-center gap-2 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition"
        >
          <Plus size={20} />
          Yeni Ürün
        </button>
      </div>

      {urunler.length === 0 ? (
        <p className="text-gray-500 text-center py-8">Henüz ürün eklenmemiş</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {urunler.map(urun => (
            <div key={urun.id} className="border border-gray-200 rounded-lg p-4 hover:shadow-md transition">
              <div className="flex justify-between items-start mb-3">
                <h3 className="text-lg font-bold text-gray-800">{urun.ad}</h3>
                <div className="flex gap-2">
                  <button onClick={() => openModal('urun', urun)} className="text-blue-600 hover:text-blue-800">
                    <Edit2 size={16} />
                  </button>
                  <button onClick={() => sil(urun.id, 'urun')} className="text-red-600 hover:text-red-800">
                    <Trash2 size={16} />
                  </button>
                </div>
              </div>
              <div className="space-y-2">
                <p className="text-gray-600">Birim Fiyat: <span className="font-bold text-gray-800">{urun.fiyat} ₺/{urun.birim}</span></p>
                <p className="text-gray-600">Stok: <span className={`font-bold ${urun.stok < 5 ? 'text-red-600' : 'text-green-600'}`}>{urun.stok} {urun.birim}</span></p>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

function StokHareketleriTab({ stokHareketleri, musteriler, tedarikciler, urunler, openModal, sil }) {
  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold text-gray-800">Stok Hareketleri</h2>
        <button
          onClick={() => openModal('stokHareket')}
          className="flex items-center gap-2 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition"
        >
          <Plus size={20} />
          Yeni Hareket
        </button>
      </div>

      {stokHareketleri.length === 0 ? (
        <p className="text-gray-500 text-center py-8">Henüz stok hareketi yok</p>
      ) : (
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b-2 border-gray-200">
                <th className="text-left py-3 px-3">Tarih</th>
                <th className="text-left py-3 px-3">Tip</th>
                <th className="text-left py-3 px-3">Ürün</th>
                <th className="text-left py-3 px-3">Miktar</th>
                <th className="text-left py-3 px-3">Tedarikçi/Müşteri</th>
                <th className="text-right py-3 px-3">Tutar</th>
                <th className="text-left py-3 px-3">Açıklama</th>
                <th className="text-right py-3 px-3">İşlem</th>
              </tr>
            </thead>
            <tbody>
              {stokHareketleri.slice().reverse().map(hareket => {
                const urun = urunler.find(u => u.id === parseInt(hareket.urunId));
                const tedarikci = tedarikciler.find(t => t.id === hareket.tedarikciId);
                const musteri = musteriler.find(m => m.id === hareket.musteriId);
                const kisi = hareket.tip === 'giris' ? tedarikci : musteri;
                
                return (
                  <tr key={hareket.id} className="border-b border-gray-100 hover:bg-gray-50">
                    <td className="py-3 px-3">{new Date(hareket.tarih).toLocaleDateString('tr-TR')}</td>
                    <td className="py-3 px-3">
                      <span className={`flex items-center gap-1 px-2 py-1 rounded text-xs w-fit ${
                        hareket.tip === 'giris' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
                      }`}>
                        {hareket.tip === 'giris' ? <ArrowDown size={14} /> : <ArrowUp size={14} />}
                        {hareket.tip === 'giris' ? 'Giriş' : 'Çıkış'}
                      </span>
                    </td>
                    <td className="py-3 px-3 font-medium">{urun?.ad}</td>
                    <td className="py-3 px-3">
                      <span className={hareket.tip === 'giris' ? 'text-green-600 font-bold' : 'text-red-600 font-bold'}>
                        {hareket.tip === 'giris' ? '+' : '-'}{hareket.miktar} {urun?.birim}
                      </span>
                    </td>
                    <td className="py-3 px-3">{kisi?.ad || '-'}</td>
                    <td className="py-3 px-3 text-right font-bold">{hareket.tutar?.toFixed(2)} ₺</td>
                    <td className="py-3 px-3 text-gray-600 text-xs">{hareket.aciklama}</td>
                    <td className="py-3 px-3 text-right">
                      <button onClick={() => sil(hareket.id, 'stokHareket')} className="text-red-600 hover:text-red-800">
                        <Trash2 size={16} />
                      </button>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}

function HareketlerTab({ hareketler, musteriler, urunler, openModal, sil }) {
  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold text-gray-800">Ödeme Hareketleri</h2>
        <button
          onClick={() => openModal('hareket')}
          className="flex items-center gap-2 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition"
        >
          <Plus size={20} />
          Ödeme Al
        </button>
      </div>

      {hareketler.length === 0 ? (
        <p className="text-gray-500 text-center py-8">Henüz hareket kaydı yok</p>
      ) : (
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b-2 border-gray-200">
                <th className="text-left py-3 px-4">Tarih</th>
                <th className="text-left py-3 px-4">Tip</th>
                <th className="text-left py-3 px-4">Müşteri</th>
                <th className="text-left py-3 px-4">Ürün</th>
                <th className="text-right py-3 px-4">Miktar</th>
                <th className="text-right py-3 px-4">Tutar</th>
                <th className="text-right py-3 px-4">İşlem</th>
              </tr>
            </thead>
            <tbody>
              {hareketler.slice().reverse().map(hareket => {
                const musteri = musteriler.find(m => m.id === hareket.musteriId);
                const urun = urunler.find(u => u.id === parseInt(hareket.urunId));
                return (
                  <tr key={hareket.id} className="border-b border-gray-100 hover:bg-gray-50">
                    <td className="py-3 px-4">{new Date(hareket.tarih).toLocaleDateString('tr-TR')}</td>
                    <td className="py-3 px-4">
                      <span className={`px-2 py-1 rounded text-sm ${
                        hareket.tip === 'satis' ? 'bg-blue-100 text-blue-800' : 'bg-green-100 text-green-800'
                      }`}>
                        {hareket.tip === 'satis' ? 'Satış' : 'Ödeme'}
                      </span>
                    </td>
                    <td className="py-3 px-4">{musteri?.ad}</td>
                    <td className="py-3 px-4">{hareket.tip === 'satis' ? urun?.ad : '-'}</td>
                    <td className="py-3 px-4 text-right">{hareket.tip === 'satis' ? `${hareket.miktar} ${urun?.birim}` : '-'}</td>
                    <td className="py-3 px-4 text-right font-bold">{hareket.tutar?.toFixed(2)} ₺</td>
                    <td className="py-3 px-4 text-right">
                      <button onClick={() => sil(hareket.id, 'hareket')} className="text-red-600 hover:text-red-800">
                        <Trash2 size={18} />
                      </button>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}

function Modal({ type, editItem, onClose, onSubmit, musteriler, tedarikciler, urunler }) {
  const [formData, setFormData] = useState(editItem || {});

  const handleSubmit = () => {
    if (type === 'musteri' && !formData.ad) {
      alert('Lütfen müşteri adını girin');
      return;
    }
    if (type === 'tedarikci' && !formData.ad) {
      alert('Lütfen tedarikçi adını girin');
      return;
    }
    if (type === 'urun' && (!formData.ad || !formData.fiyat || !formData.birim)) {
      alert('Lütfen tüm ürün bilgilerini girin');
      return;
    }
    if (type === 'stokHareket' && (!formData.tip || !formData.urunId || !formData.miktar || !formData.tutar)) {
      alert('Lütfen tüm alanları doldurun');
      return;
    }
    if (type === 'hareket' && (!formData.musteriId || !formData.tutar)) {
      alert('Lütfen müşteri ve tutar bilgilerini girin');
      return;
    }
    onSubmit(formData);
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50" onClick={onClose}>
      <div className="bg-white rounded-lg p-6 max-w-md w-full" onClick={(e) => e.stopPropagation()}>
        <h3 className="text-xl font-bold mb-4">
          {editItem ? 'Düzenle' : 'Yeni'} {
            type === 'musteri' ? 'Müşteri' : 
            type === 'tedarikci' ? 'Tedarikçi' :
            type === 'urun' ? 'Ürün' : 
            type === 'stokHareket' ? 'Stok Hareketi' : 
            'Ödeme'
          }
        </h3>
        
        <div className="space-y-4">
          {(type === 'musteri' || type === 'tedarikci') && (
            <>
              <input
                type="text"
                placeholder={type === 'musteri' ? 'Ad Soyad' : 'Firma Adı'}
                value={formData.ad || ''}
                onChange={(e) => setFormData({...formData, ad: e.target.value})}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
              <input
                type="tel"
                placeholder="Telefon"
                value={formData.telefon || ''}
                onChange={(e) => setFormData({...formData, telefon: e.target.value})}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
              <textarea
                placeholder="Adres"
                value={formData.adres || ''}
                onChange={(e) => setFormData({...formData, adres: e.target.value})}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                rows="3"
              />
            </>
          )}

          {type === 'urun' && (
            <>
              <input
                type="text"
                placeholder="Ürün Adı"
                value={formData.ad || ''}
                onChange={(e) => setFormData({...formData, ad: e.target.value})}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
              <input
                type="number"
                placeholder="Birim Fiyat (₺)"
                step="0.01"
                value={formData.fiyat || ''}
                onChange={(e) => setFormData({...formData, fiyat: parseFloat(e.target.value)})}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
              <input
                type="text"
                placeholder="Birim (adet, kg, ton, koli, vb.)"
                value={formData.birim || ''}
                onChange={(e) => setFormData({...formData, birim: e.target.value})}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </>
          )}

          {type === 'stokHareket' && (
            <>
              <select
                value={formData.tip || ''}
                onChange={(e) => setFormData({...formData, tip: e.target.value})}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              >
                <option value="">Hareket Tipi Seçin</option>
                <option value="giris">Stok Girişi (Alım)</option>
                <option value="cikis">Stok Çıkışı (Satış)</option>
              </select>

              <select
                value={formData.urunId || ''}
                onChange={(e) => {
                  const urunId = e.target.value;
                  const urun = urunler.find(u => u.id === parseInt(urunId));
                  setFormData({
                    ...formData, 
                    urunId,
                    fiyat: urun?.fiyat || 0
                  });
                }}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              >
                <option value="">Ürün Seçin</option>
                {urunler.map(u => (
                  <option key={u.id} value={u.id}>{u.ad} (Stok: {u.stok} {u.birim})</option>
                ))}
              </select>

              {formData.tip === 'giris' && (
                <select
                  value={formData.tedarikciId || ''}
                  onChange={(e) => setFormData({...formData, tedarikciId: parseInt(e.target.value)})}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                >
                  <option value="">Tedarikçi Seçin</option>
                  {tedarikciler.map(t => (
                    <option key={t.id} value={t.id}>{t.ad}</option>
                  ))}
                </select>
              )}

              {formData.tip === 'cikis' && (
                <select
                  value={formData.musteriId || ''}
                  onChange={(e) => setFormData({...formData, musteriId: parseInt(e.target.value)})}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                >
                  <option value="">Müşteri Seçin</option>
                  {musteriler.map(m => (
                    <option key={m.id} value={m.id}>{m.ad}</option>
                  ))}
                </select>
              )}

              <input
                type="number"
                placeholder="Miktar"
                step="0.01"
                value={formData.miktar || ''}
                onChange={(e) => {
                  const miktar = parseFloat(e.target.value);
                  setFormData({
                    ...formData, 
                    miktar,
                    tutar: miktar * (formData.fiyat || 0)
                  });
                }}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />

              <input
                type="number"
                placeholder="Tutar (₺)"
                step="0.01"
                value={formData.tutar || ''}
                onChange={(e) => setFormData({...formData, tutar: parseFloat(e.target.value)})}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />

              <textarea
                placeholder="Açıklama (opsiyonel)"
                value={formData.aciklama || ''}
                onChange={(e) => setFormData({...formData, aciklama: e.target.value})}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                rows="2"
              />
            </>
          )}

          {type === 'hareket' && (
            <>
              <select
                value={formData.musteriId || ''}
                onChange={(e) => setFormData({...formData, musteriId: parseInt(e.target.value)})}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              >
                <option value="">Müşteri Seçin</option>
                {musteriler.map(m => (
                  <option key={m.id} value={m.id}>{m.ad}</option>
                ))}
              </select>

              <input
                type="number"
                placeholder="Ödeme Tutarı (₺)"
                step="0.01"
                value={formData.tutar || ''}
                onChange={(e) => setFormData({...formData, tutar: parseFloat(e.target.value), tip: 'odeme'})}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </>
          )}

          <div className="flex gap-3 pt-4">
            <button
              onClick={handleSubmit}
              className="flex-1 bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition font-medium"
            >
              Kaydet
            </button>
            <button
              onClick={onClose}
              className="flex-1 bg-gray-200 text-gray-800 py-2 rounded-lg hover:bg-gray-300 transition font-medium"
            >
              İptal
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}