# Flight App

## Proje Hakkında

Bu proje, bir havalimanı API’si kullanarak uçuş bilgilerini listeleyen ve kullanıcıların uçuş bilgilerini kaydedebileceği bir web uygulamasıdır. Kullanıcılar, tarih ve hareket yönüne göre uçuşları filtreleyebilir, rezervasyon yapabilir ve kaydedilmiş uçuş bilgilerini görüntüleyebilir.

## Teknolojiler

- **Frontend:** React
- **Backend:** Node.js
- **Database:** MongoDB
- **Kütüphaneler:** 
  - Axios
  - React Router
  - React Toastify
  - React Datepicker
  - Tailwind CSS
  - Express.js
  - Mongoose
  - Cors


## Kurulum

Projenin çalışması için aşağıdaki adımları izleyin:

1. Bu repository'i klonlayın:
   ```bash
   git clone <repository-url>

2. Proje dizinine gidin:
    cd flight-app

3. Gerekli bağımlılıkları yükleyin:
    npm install / yarn

4. MongoDB veritabanınızı ayarlayın ve gerekli bağlantı detaylarını güncelleyin.

5. Uygulamayı başlatın:
    npm start / yarn start


## Kullanım
- **Anasayfa:** Uçuşları listeleyebilir, tarih ve yön filtreleri ile arama yapabilirsiniz.
- **Uçuş Filtreleme:** API'den tüm kalkış/varış yeri verileri çekilemediği için ayrı bir JSON dosyası oluşturularak veriler bu kısımdan çekildi. Kalkış yeri seçilmeden varış yeri aktif olmayacak şekilde ve kalkış yeri, varış yeri ve tarih seçilmeden uçuşlar listelenememekteir.
- **Rezervasyon:** Uçuşu seçtikten sonra rezervasyon yapabilir ve uçuş detaylarınızı MongoDB veritabanında saklayabilirsiniz. Geçmiş tarihli uçuşlar için rezervasyon yapamazsınız.
- **Uçuşlarım:** Kaydedilen uçuşlarınızı görüntüleyebilirsiniz. Havayolu şirketleri logoları için API'de veri bulunmadığından JSON oluşturularak oradan çekildi. Uçuşlarım sayfasına rezervasyon oluştur butonuna tıklayarak veya header kısmındaki profil bilgilerine tıklayarak ulaşabilirsiniz.

## Ekran Görüntüleri
https://ibb.co/PMdHDNK
https://ibb.co/bW0H6hT
https://ibb.co/K5Dg7BR
https://ibb.co/qkm7vM4
https://ibb.co/vcKDtvP
https://ibb.co/Z210DVP
https://ibb.co/Ykwybcq

## Proje Linki
https://flight-app-ykslkrtld.vercel.app/

