# Sudoku Oyunu

Vercel'de barındırılan interaktif Sudoku bulmacası oyunu.

## ✨ Özellikler

- 🎮 **3 Zorluk Seviyesi**: Kolay, Orta, Zor
- ⏱️ **Gerçek Zamanlı Zamanlayıcı**: Kaç saniyede çözdüğünü takip et
- 📊 **İstatistikler**: Doğruluk yüzdesi ve boş hücre sayısı
- 🎨 **Modern Tasarım**: Koyu tema (dark mode) ile şık arayüz
- 📱 **Mobil Uyumlu**: Telefon, tablet ve bilgisayarda çalışır
- ✅ **Çözüm Kontrol**: Cevaplarını kontrol et ve geri bildirim al
- 🎉 **Başarı Modalı**: Sudoku'yu çözdüğünde tebrik mesajı

## 🎮 Nasıl Oynanır?

1. **Zorluk Seviyesi Seç**: Sol taraftan Kolay, Orta veya Zor'u seç
2. **Hücreyi Tıkla**: Doldurmak istediğin boş hücreyi seç
3. **Numara Gir**: 1-9 arasında bir numara seç
4. **Kontrol Et**: "Kontrol Et" butonuyla çözümünü kontrol et
5. **Yeni Oyun**: "Yeni Oyun" ile baştan başla

## 📏 Sudoku Kuralları

- Her **satırda** 1-9 arası her sayı bir kez olmalı
- Her **sütunda** 1-9 arası her sayı bir kez olmalı
- Her **3x3 kutuda** 1-9 arası her sayı bir kez olmalı

## 🛠️ Teknolojiler

- **HTML5**: Sayfa yapısı
- **CSS3**: Modern tasarım ve responsive layout
- **JavaScript**: Oyun mantığı ve etkileşimler

## 📁 Dosya Yapısı

```
sudoku-oyunu/
├── index.html      # HTML yapısı
├── style.css       # CSS stilleri
├── script.js       # JavaScript mantığı
└── README.md       # Bu dosya
```

## 🚀 Vercel'e Yayınlama

### GitHub Yöntemi (Önerilen)

1. GitHub hesabı oluştur (github.com)
2. Yeni repository oluştur: `sudoku-oyunu`
3. Dosyaları GitHub'a yükle
4. vercel.com'a git ve GitHub hesabınla giriş yap
5. "Import Project" seç ve reposunu seç
6. "Deploy" ye tıkla

### Vercel CLI Yöntemi

```bash
# Vercel CLI'ı kur
npm install -g vercel

# Proje klasörüne gir
cd sudoku-oyunu

# Yayınla
vercel
```

Vercel sana birkaç soru soracak:
- **Scope**: Kişisel hesabını seç
- **Project name**: `sudoku-oyunu`
- **Root directory**: `.` (nokta)

## 💡 İpuçları

- Yanlış tahminlerden kaçın, mantıksal düşün
- Satır, sütun ve 3x3 kutulara dikkat et
- Sıklıkla göründüğü sayıları kolayca tayin edebilirsin
- Sayıyı girip kontrol ederek ilerle

## 👨‍💻 Geliştirici

**Crafted by The_Bozgun**

## 📄 Lisans

MIT License - Serbestçe kullanabilirsin!