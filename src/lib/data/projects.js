// src/lib/data/projects.js

const BASE_URL = 'https://2watuju.com';

export const projects = [
  {
    "id": 1753464374772,
    "title": "FIN\nJAPANDI\nHOUSE",
    "slug": "fin-japandi-house",
    "categoryId": "japandi",
    "year": 2023,
    "month": "NOV",
    "description": "Interactive 360° panoramic experience with multi-scene navigation. Perpaduan harmonis filosofi minimalis Jepang dan kehangatan Skandinavia dalam setiap detail.",
    "images": {
      "thumbnail": "https://2watuju.com/assets/projects/japandi/fin/project-rumah-japandi-lampung-2025.jpg.webp",
      "mobile": "https://2watuju.com/assets/projects/japandi/fin/project-rumah-japandi-lampung-2025.jpg.webp",
      "tablet": "https://2watuju.com/assets/projects/japandi/fin/project-rumah-japandi-lampung-2025.jpg.webp",
      "desktop": "https://2watuju.com/assets/projects/japandi/fin/project-rumah-japandi-lampung-2025.jpg.webp"
    },
    "contentSections": [
      {
        "title": "Welcome To Fin (フィン) House",
        "image": "https://2watuju.com/assets/projects/japandi/fin/project-exterior-japandi-lampung-2025.jpg.webp",
        "imageDescription": "",
        "content": "Proyek Watuju satu ini adalah sebuah hunian Contemporary yang berlokasi di Jl. Pangeran Antasari, Bandar Lampung.<br/><br/>Pemilik rumah ini adalah sepasang suami istri yang produktif,  mereka menginginkan rumah yang bisa menjadi oase di tengah-tengah kesibukan mereka. Sebuah escape space dimana mereka bisa menghabiskan quality time bersama dengan anak-anak tercinta."
      },
      {
        "title": "",
        "image": "https://2watuju.com/assets/projects/japandi/fin/project-interior-japandi-lampung-2025.jpg.webp",
        "imageDescription": "",
        "content": "Berangkat dari keinginan mereka maka hadirlah FIN House yang menjadi jawaban atas keresahan mereka. Sebuah hunian berukuran 120 m2 di lahan 400m2, dengan desain minimalis yang nantinya bisa bertumbuh sesuai  dengan kebutuhan penghuninya di masa yang akan datang."
      },
      {
        "title": "Sederhana, Multifungsi, Serta Estetik",
        "image": "https://2watuju.com/assets/projects/japandi/fin/project-interior-japandi-2-lampung-2025.jpg.webp",
        "imageDescription": "",
        "content": "Rumah ini mengusung langgam desain Japanese Scandinavian atau biasa disingkat Japandi. Desain rumah ini banyak didominasi oleh material alami, warna kalem (muted colors), dan perabotan yang minimal, tetapi berkualitas."
      },
      {
        "title": "",
        "image": "https://2watuju.com/assets/projects/japandi/fin/project-interior-japandi-3-lampung-2025.jpg.webp",
        "imageDescription": "",
        "content": "Dengan konsep gaya yang tampak sederhana, multifungsi, serta estetik. Fin House mencoba menghadirkan mood yang tenang dan nyaman. Dengan konsep seperti ini Fin House bisa mengakomodasi aspek fungsional seperti ruang belajar bersama, mushola untuk tempat kajian sehingga penghuni bisa tetap produktif selama berada di dalam rumah."
      },
      {
        "title": "",
        "image": "https://2watuju.com/assets/projects/japandi/fin/project-exterior-japandi-lampung-2025.jpg.webp",
        "imageDescription": "",
        "content": "Juga tidak ketinggalan kebutuhan lainnya yang tak kalah penting yaitu esensi rumah itu sendiri sebagai tempat beristirahat yang nyaman dan bikin betah untuk kumpul bersama keluarga tercinta.<br/><br/>Kalau rumah idamanmu yang seperti apa?"
      }
    ],
    "panoramic": {
      "scene1": "https://raw.githubusercontent.com/2watuju/2Watuju/9ff39b3876143dc036c8f8f36121f057dd1fe1ec/static/assets/panorama/Fin%20H/Panorama_R.DR%20FIN%201%20(1)2_2025-07-26-15-44-36.webp",
      "scene2": "https://raw.githubusercontent.com/2watuju/2Watuju/9ff39b3876143dc036c8f8f36121f057dd1fe1ec/static/assets/panorama/Fin%20H/Panorama_R.DR%20FIN%201%20(1)2_2025-07-26-16-12-06.webp"
    },
    "hotspots": [
      {
        "x": 82.04,
        "y": 44.6,
        "scene": "scene1",
        "label": "Scene 2",
        "type": "nav",
        "targetScene": "scene2",
        "icon": "door"
      },
      {
        "x": 40.18,
        "y": 62.37,
        "scene": "scene2",
        "label": "Scene 1",
        "type": "nav",
        "targetScene": "scene1",
        "icon": "door"
      }
    ],
    "stats": {
      "land": "400m²",
      "floor": "120m²",
      "carport": "yes",
      "pool": "no",
      "bathroom": "2",
      "room": "5"
    },
    "statsConfig": {
      "LAND AREA": {
        "icon": "land.svg",
        "key": "land",
        "order": 1
      },
      "FLOOR AREA": {
        "icon": "floor.svg",
        "key": "floor",
        "order": 2
      },
      "ROOM": {
        "icon": "room.svg",
        "key": "room",
        "order": 3
      },
      "BATHROOM": {
        "icon": "bathroom.svg",
        "key": "bathroom",
        "order": 4
      },
      "CARPORT": {
        "icon": "garage.svg",
        "key": "carport",
        "order": 5
      },
      "POOL": {
        "icon": "pool.svg",
        "key": "pool",
        "order": 6
      }
    },
    "projectDetails": {
      "TIPE PROYEK": {
        "value": "Rumah Hunian",
        "order": 1
      },
      "PRINCIPLE DESIGNER": {
        "value": "Muhammad Gunawan",
        "order": 2
      },
      "LOKASI": {
        "value": "Sukarame, Bandar Lampung",
        "order": 3
      },
      "INTERIOR DESIGNER": {
        "value": "Kurnia Firmanda Ageng, S.Ars",
        "order": 4
      }
    }
  },
  {
    "id": 1753464374773,
    "title": "RUI\nZEN\nVILLA",
    "slug": "rui-zen-villa",
    "categoryId": "japandi",
    "year": 2024,
    "month": "DEC",
    "description": "Villa zen dengan desain Japandi yang menekankan ketenangan dan kedamaian. Material kayu oak dan bambu menciptakan harmoni dengan taman zen yang dirancang khusus.",
    "images": {
      "thumbnail": "https://2watuju.com/assets/projects/japandi/rui/project-rumah-japandi-zen-lampung-2025.jpg.webp",
      "mobile": "https://2watuju.com/assets/projects/japandi/rui/project-rumah-japandi-zen-lampung-2025.jpg.webp",
      "tablet": "https://2watuju.com/assets/projects/japandi/rui/project-rumah-japandi-zen-lampung-2025.jpg.webp",
      "desktop": "https://2watuju.com/assets/projects/japandi/rui/project-rumah-japandi-zen-lampung-2025.jpg.webp"
    },
    "contentSections": [
      {
        "title": "Welcome to RUI (ルイ) House",
        "image": "https://2watuju.com/assets/projects/japandi/rui/project-exterior-japandi-zen-lampung-2025.jpg.webp",
        "imageDescription": "",
        "content": "“Keindahan tidak selalu hadir dari apa yang tampak, tapi dari apa yang dibiarkan kosong.”\n<br/><br/>\nFilosofi Jepang sangat menghargai ma—ruang di antara benda, waktu, dan jiwa. Rumah bergaya Jepang memberi ruang untuk hening, jeda, dan napas. Itulah yang menjadi inspirasi rumah impian Sobat Watuju kali ini.\n\nSang Ayah, yang pernah berkuliah dan bekerja di Jepang, terpesona oleh kenyamanan gaya hunian Jepang yang jauh dari kesan mewah, namun kaya akan filosofi dan kedekatan emosional bagi penghuninya. Keinginan beliau untuk membawa nilai-nilai tersebut ke dalam rumah keluarga pun menjadi dasar lahirnya RUI House. Rumah ini akan berdiri di atas lahan seluas 425 m², berlokasi di KORPRI, Bandar Lampung."
      },
      {
        "title": "Rumah Bukan Soal Hanya Tampilan, Namun Makna",
        "image": "https://2watuju.com/assets/projects/japandi/rui/project-interior-japandi-zen-lampung-2025.jpg.webp",
        "imageDescription": "",
        "content": "Desain rumah bergaya Jepang tidak memuja kemegahan, melainkan mencari keindahan dalam hal-hal yang esensial. Selaras dengan nilai itu, desain RUI House dibuat sederhana, tanpa gemerlap atau kesan glamor. Bukan sekadar minimalis, tapi hadir dengan kesadaran bahwa rumah bukan hanya soal tampilan, melainkan tentang makna dan cerita di balik setiap ruangnya."
      },
      {
        "title": "",
        "image": "https://2watuju.com/assets/projects/japandi/rui/project-interior-japandi-zen-2-lampung-2025.jpg.webp",
        "imageDescription": "",
        "content": "Unsur-unsur alami dihadirkan untuk melengkapi harmoni dalam rumah ini. Cahaya lembut, suara gemericik air, kolam ikan yang tenang, dan taman-taman di berbagai sudut rumah menjadi unsur alam yang hidup—menghadirkan ruang kontemplasi dan rasa syukur. Bagi penghuni, ini menjadi cara untuk mendekatkan diri pada Sang Pencipta, dengan cara mengagumi ciptaan-Nya yang sederhana namun menggetarkan."
      },
      {
        "title": "“Rumah yang baik tahu kapan memberi ruang, dan kapan merangkul.”",
        "image": "https://2watuju.com/assets/projects/japandi/rui/project-interior-japandi-zen-3-lampung-2025.jpg.webp",
        "imageDescription": "",
        "content": "Dengan kebutuhan dan latar belakang setiap penghuni yang cukup beragam, kami mencoba menciptakan keseimbangan antara ruang personal dan ruang komunal.\n<br/><br/>\nDi lantai satu, RUI House memusatkan ruang komunal sebagai jantung kehidupan keluarga. Bukan sekadar ruang fungsional, tapi dirancang sebagai wadah kebersamaan yang alami, tenang, dan menyatukan. Mulai dari area servis seperti dapur dan ruang laundry yang tertata efisien, semuanya tetap menyatu dalam satu alur desain yang bersih dan menyegarkan. Dapur terbuka menyambung langsung ke ruang makan, menciptakan suasana yang akrab dan cair di setiap momen santap bersama."
      },
      {
        "title": "",
        "image": "https://2watuju.com/assets/projects/japandi/rui/project-interior-japandi-zen-4-lampung-2025.jpg.webp",
        "imageDescription": "",
        "content": "Kemudian terdapat sunken living room, ruang duduk yang diturunkan dari level lantai utama, memberikan kesan lebih hangat dan membumi. Di sinilah percakapan ringan, momen santai, dan pelukan hangat terjadi secara alami. Sunken space ini tak hanya menciptakan kedekatan visual, tapi juga secara simbolis mengajak setiap penghuni untuk “turun” dari hiruk-pikuk luar dan hadir sepenuhnya di dalam rumah. Tepat di sisinya, kolam renang dan taman menjadi latar alami yang menenangkan—dengan kilau air, semilir angin, dan hijau pepohonan yang membantu tubuh dan jiwa beristirahat. Dari pagi yang tenang hingga senja yang syahdu, ruang luar ini menjadi tempat bernafas bersama."
      },
      {
        "title": "",
        "image": "https://2watuju.com/assets/projects/japandi/rui/project-interior-japandi-zen-5-lampung-2025.jpg.webp",
        "imageDescription": "",
        "content": "Beralih ke lantai dua, setiap anggota keluarga memiliki pola hidup yang berbeda dan waktu kebersamaan yang terbatas.\n<br/><br/>\nAyah dan Ibu, sebagai abdi negara, memandang rumah sebagai tempat untuk benar-benar beristirahat dan menenangkan diri—bukan untuk bekerja.\n<br/><br/>\nAnak sulung, yang kuliah di luar kota, membutuhkan ruang yang hangat dan menyambut saat pulang.\n<br/><br/>\nDua adik, yang menempuh pendidikan di pondok pesantren, memerlukan ruang pribadi untuk mengekspresikan hobi dan minat mereka masing-masing."
      },
      {
        "title": "",
        "image": "https://2watuju.com/assets/projects/japandi/rui/project-interior-japandi-zen-3-lampung-2025.jpg.webp",
        "imageDescription": "",
        "content": ""
      },
      {
        "title": "",
        "image": "https://2watuju.com/assets/projects/japandi/rui/project-interior-japandi-zen-5-lampung-2025.jpg.webp",
        "imageDescription": "",
        "content": ""
      },
      {
        "title": "",
        "image": "https://2watuju.com/assets/projects/japandi/rui/project-interior-japandi-zen-6-lampung-2025.jpg.webp",
        "imageDescription": "",
        "content": "Dengan kebutuhan yang kontras ini, desain RUI House menghadirkan ruang-ruang personal yang mendukung ketenangan dan istirahat secara maksimal. Di sisi lain, ruang komunal seperti ruang keluarga, area makan, dan taman dalam tetap menjadi titik temu emosional—tempat di mana semua anggota keluarga, meski hanya sebentar, bisa kembali merasa dekat dan terhubung."
      },
      {
        "title": "",
        "image": "https://2watuju.com/assets/projects/japandi/rui/project-exterior-japandi-zen-lampung-2025.jpg.webp",
        "imageDescription": "",
        "content": "Sebagai penutup, rumah ini juga menerapkan filosofi wabi-sabi, yaitu penghargaan terhadap ketidaksempurnaan, keterbatasan, dan perjalanan waktu. “Yang tak sempurna bukan untuk disembunyikan, tetapi untuk dihargai.” RUI House tidak mencoba tampil mencolok di luar; mungkin fasadnya terlihat sederhana, bahkan asing di mata sebagian orang Indonesia. Namun di balik kesederhanaan itu tersimpan kedalaman makna—sebuah rumah yang dibangun bukan untuk dipamerkan, tetapi untuk dihuni, dijalani, dan dikenang dengan utuh oleh setiap jiwa yang pulang ke dalamnya."
      }
    ],
    "stats": {
      "land": "425m²",
      "floor": "380m²",
      "carport": "yes",
      "pool": "yes",
      "bathroom": "4",
      "room": "6"
    },
    "statsConfig": {
      "LAND AREA": {
        "icon": "land.svg",
        "key": "land",
        "order": 1
      },
      "FLOOR AREA": {
        "icon": "floor.svg",
        "key": "floor",
        "order": 2
      },
      "ROOM": {
        "icon": "room.svg",
        "key": "room",
        "order": 3
      },
      "BATHROOM": {
        "icon": "bathroom.svg",
        "key": "bathroom",
        "order": 4
      },
      "CARPORT": {
        "icon": "garage.svg",
        "key": "carport",
        "order": 5
      },
      "POOL": {
        "icon": "pool.svg",
        "key": "pool",
        "order": 6
      }
    },
    "projectDetails": {
      "TIPE PROYEK": {
        "value": "Rumah Hunian",
        "order": 1
      },
      "PRINCIPLE DESIGNER": {
        "value": "Muhammad Gunawan",
        "order": 2
      },
      "LOKASI": {
        "value": "Korpri, Bandar Lampung",
        "order": 3
      },
      "INTERIOR DESIGNER": {
        "value": "Kurnia Firmanda Ageng, S.Ars",
        "order": 4
      }
    },
    "hotspots": []
  },
  {
    "id": 1753464374774,
    "title": "ASAKHA\nCONTEMPORARY\nHOUSE",
    "slug": "asakha-contemporary-house",
    "categoryId": "kontemporer",
    "year": 2025,
    "month": "JAN",
    "description": "Rumah kontemporer dengan desain yang dinamis dan modern. Memadukan elemen tradisional dengan sentuhan masa kini untuk menciptakan hunian yang nyaman dan stylish.",
    "images": {
      "thumbnail": "https://2watuju.com/assets/projects/contemporary/asakha/project-rumah-kontenporer-asa5-lampung-2025.jpg.webp",
      "mobile": "https://2watuju.com/assets/projects/contemporary/asakha/project-rumah-kontenporer-asa5-lampung-2025.jpg.webp",
      "tablet": "https://2watuju.com/assets/projects/contemporary/asakha/project-rumah-kontenporer-asa5-lampung-2025.jpg.webp",
      "desktop": "https://2watuju.com/assets/projects/contemporary/asakha/project-rumah-kontenporer-asa5-lampung-2025.jpg.webp"
    },
    "contentSections": [
      {
        "title": "Welcome to Asakha House",
        "image": "https://2watuju.com/assets/projects/contemporary/asakha/project-exterior-kontenporer-asa-lampung-2025.jpg.webp",
        "imageDescription": "",
        "content": "Sobat Watuju, mari berkunjung ke proyek watuju satu ini yaitu Asakha House. Sebuah hunian modern kontemporer yang berlokasi di Enggal, Bandar Lampung.\n<br/><br/>\nRumah ini nantinya akan dihuni oleh sepasang suami istri dengan 3 anak, dan ibu mertua. Mereka menginginkan rumah yang bisa menjadi tempat mereka refreshing dan bercengkrama dengan keluarga di tengah-tengah kesibukan sehari-hari.\n"
      },
      {
        "title": "",
        "image": "https://2watuju.com/assets/projects/contemporary/asakha/project-interior-kontenporer-asa-lampung-2025.jpg.webp",
        "imageDescription": "",
        "content": "Untuk itu bagi mereka rumah yang nyaman adalah rumah dengan sirkulasi yang baik, ruangan terbuka dan didesain compact agar punya spot-spot untuk quality time bersama keluarga."
      },
      {
        "title": "",
        "image": "https://2watuju.com/assets/projects/contemporary/asakha/project-interior-kontenporer-asa2-lampung-2025.jpg.webp",
        "imageDescription": "",
        "content": "Kata Asakha sendiri diambil dari nama anak mereka, yang bisa juga berarti seorang yang punya pandangan terbuka. Seperti rumah ini yang berani mengambil konsep baru yang berbeda dari  rumah-rumah disekitarnya."
      },
      {
        "title": "Low Maintenance Jawaban Kesibukan Penghuninya",
        "image": "https://2watuju.com/assets/projects/contemporary/asakha/project-interior-kontenporer-asa3-lampung-2025.jpg.webp",
        "imageDescription": "",
        "content": "Konsep kontemporer yang sedikit mendekati industrial kami jadikan sebagai langgam desain utama di rumah ini. Salah satu keunggulan dari desain tipe ini adalah low maintenance agar si pemilik rumah mudah melakukan perawatan rumah meski dalam selang waktu yang jarang di sela-sela kesibukan mereka."
      },
      {
        "title": "",
        "image": "https://2watuju.com/assets/projects/contemporary/asakha/project-interior-kontenporer-asa4-lampung-2025.jpg.webp",
        "imageDescription": "",
        "content": "Ruang makan sendiri kami desain sebagai jantung rumah dimana meja makan menjadi  tempat berbincang dan memperhangat suasana keluarga. Ruang ini juga kami desain connecting dengan dapur untuk menambah kesan lega dan homie."
      },
      {
        "title": "",
        "image": "https://2watuju.com/assets/projects/contemporary/asakha/project-rumah-kontenporer-asa5-lampung-2025.jpg.webp",
        "imageDescription": "",
        "content": "Area belakang di desain terbuka dengan kolam renang sebagai area rekreasi yang bisa dipakai untuk bersantai dan bermain bersama anak-anak. Terakhir ada ruang keluarga di lantai dua yang bisa dijadikan sebagai tempat quaity time dan memabah kehangatan dengan keluarga tercinta."
      },
      {
        "title": "",
        "image": "https://2watuju.com/assets/projects/contemporary/asakha/project-exterior-kontenporer-asa-lampung-2025.jpg.webp",
        "imageDescription": "",
        "content": "Sobat Watuju tertarik untuk membuat rumah dengan karakteristik sesuai kepribadian anda sendiri? Konsultasikan langsung kepada kami! 2Watuju, partner setia untuk wujudkan rumah idamanmu."
      }
    ],
    "stats": {
      "land": "336m²",
      "floor": "200m²",
      "carport": "yes",
      "pool": "no",
      "bathroom": "4",
      "room": "6"
    },
    "statsConfig": {
      "LAND AREA": {
        "icon": "land.svg",
        "key": "land",
        "order": 1
      },
      "FLOOR AREA": {
        "icon": "floor.svg",
        "key": "floor",
        "order": 2
      },
      "ROOM": {
        "icon": "room.svg",
        "key": "room",
        "order": 3
      },
      "BATHROOM": {
        "icon": "bathroom.svg",
        "key": "bathroom",
        "order": 4
      },
      "CARPORT": {
        "icon": "garage.svg",
        "key": "carport",
        "order": 5
      },
      "POOL": {
        "icon": "pool.svg",
        "key": "pool",
        "order": 6
      }
    },
    "projectDetails": {
      "TIPE PROYEK": {
        "value": "Rumah Hunian",
        "order": 1
      },
      "PRINCIPLE DESIGNER": {
        "value": "Muhammad Gunawan",
        "order": 2
      },
      "LOKASI": {
        "value": "Enggal, Bandar Lampung",
        "order": 3
      },
      "INTERIOR DESIGNER": {
        "value": "Kurnia Firmanda Ageng, S.Ars",
        "order": 4
      }
    }
  },
  {
    "id": 1753464374775,
    "title": "NAOMI HOUSE",
    "slug": "naomi-house",
    "categoryId": "kontemporer",
    "year": 2022,
    "month": "DEC",
    "description": "Villa kontemporer dengan pendekatan desain yang fresh dan inovatif. Menghadirkan ruang-ruang yang luas dan terbuka dengan sentuhan artistik yang unik.",
    "images": {
      "thumbnail": "https://2watuju.com/assets/projects/contemporary/naomi/project-rumah-kontenporer-lampung-2025.jpg.webp",
      "mobile": "https://2watuju.com/assets/projects/contemporary/naomi/project-rumah-kontenporer-lampung-2025.jpg.webp",
      "tablet": "https://2watuju.com/assets/projects/contemporary/naomi/project-rumah-kontenporer-lampung-2025.jpg.webp",
      "desktop": "https://2watuju.com/assets/projects/contemporary/naomi/project-rumah-kontenporer-lampung-2025.jpg.webp"
    },
    "contentSections": [
      {
        "title": "Welcome to Naomi House",
        "image": "https://2watuju.com/assets/projects/contemporary/naomi/project-exterior-kontenporer-lampung-2025.jpg.webp",
        "imageDescription": "",
        "content": "Rumah ini nantinya akan dihuni oleh keluarga kecil dengan ayah yang seorang pengusaha sekaligus Pegawai Negara dan ibu yang seorang dokter juga buah hati kecil mereka.\n<br/><br/>\nDengan background tersebut yang sudah bisa sobat-sobat bayangkan akan sesibuk apa kegiatan mereka, akhirnya mereka memilih rumah dengan desain kontemporer."
      },
      {
        "title": "Pendekatan Hidup yang Seimbang.",
        "image": "https://2watuju.com/assets/projects/contemporary/naomi/project-interior-kontenporer-lampung-2025.jpg.webp",
        "imageDescription": "",
        "content": "Rumah dengan desain kontemporer tidak hanya menawarkan tampilan modern, tetapi juga menyuguhkan pendekatan hidup yang lebih seimbang—menggabungkan keanggunan estetika dengan fungsionalitas yang berpijak pada kebutuhan nyata.\n<br/><br/>\nNaomi House memadukan konsep Zen House dengan hunian Modern dengan pendekatan desain yang lebih natural dengan menggunakan banyak material-material alami yang membuat rumah ini terlihat mewah namun tetap low profile."
      },
      {
        "title": "",
        "image": "https://2watuju.com/assets/projects/contemporary/naomi/project-interior-kontenporer-2-lampung-2025.jpg.webp",
        "imageDescription": "",
        "content": "Konsep ruang terbuka (open space) menciptakan aliran yang lega dan menyatu antar fungsi ruang. Cahaya alami dan sirkulasi udara yang baik bukan hanya memberikan kenyamanan, tetapi juga menjadikan rumah ini terasa lebih sehat dan hemat energi."
      },
      {
        "title": "",
        "image": "https://2watuju.com/assets/projects/contemporary/naomi/project-interior-kontenporer-3-lampung-2025.jpg.webp",
        "imageDescription": "",
        "content": "Tata letak yang efisien membuat setiap sudut rumah memiliki fungsi yang optimal dan compact. Lantai 1 berfungsi sebagai communal space, terdapat living room yang terkoneksi dengan ruang makan dan dapur menjadikan area ini menjadi jantungnya rumah dengan kehangatannya. Area open space di lantai satu juga ditujukan agar ruangan ini bisa ramah anak-anak, sehingga orang tua bisa mengawasi tumbuh kembang anak dengan lebih mudah."
      },
      {
        "title": "",
        "image": "https://2watuju.com/assets/projects/contemporary/naomi/project-interior-kontenporer-4-lampung-2025.jpg.webp",
        "imageDescription": "",
        "content": "Terdapat kamar orang tua yang berada di level 1.5 sehingga memudahkan jika sewaktu-waktu orang tua akan berkunjung dan tidak perlu repot-repot menaiki tangga yangg tinggi."
      },
      {
        "title": "Master Suite Yang Luxurious",
        "image": "https://2watuju.com/assets/projects/contemporary/naomi/project-interior-kontemporer-5-lampung-2025.jpg.webp",
        "imageDescription": "Kamar utama dengan sitting area dan akses private ke teras",
        "content": "Master suite dirancang sebagai private retreat dengan sitting area dan akses langsung ke teras pribadi. Furniture custom dan material premium menciptakan atmosfer hotel boutique yang mewah namun tetap homey dan comfortable."
      },
      {
        "title": "",
        "image": "https://2watuju.com/assets/projects/contemporary/naomi/project-interior-kontenporer-6-lampung-2025.jpg.webp",
        "imageDescription": "",
        "content": "Lantai 2 dikhususan menjadi area private agar aktivitas beristirahat bisa lebih nyaman dan maksimal. Tata letak yang efisien dipadukan dengan penggunaan material modern dan material alami yang ramah lingkungan, desain ini mendukung efisiensi energi dan memperhatikan keberlanjutan jangka panjang."
      },
      {
        "title": "",
        "image": "https://2watuju.com/assets/projects/contemporary/naomi/project-interior-kontenporer-5-lampung-2025.jpg.webp",
        "imageDescription": "",
        "content": "Garis desain yang tegas pada facade menambah kemewahan tersendiri pada rumah ini, sementara itu garis desain yang bersih dan minimalis di daalam tidak hanya memperindah visual, tapi juga memudahkan perawatan harian. Material yang tahan lama dan mudah dibersihkan membuat rumah ini cocok untuk gaya hidup modern yang dinamis dan praktis."
      },
      {
        "title": "",
        "image": "https://2watuju.com/assets/projects/contemporary/naomi/project-rumah-kontenporer-lampung-2025.jpg.webp",
        "imageDescription": "",
        "content": "Lebih dari sekadar tempat tinggal, rumah kontemporer adalah perwujudan cara hidup—di mana estetika bertemu fungsi, dan kemewahan hadir dalam bentuk yang tenang namun penuh makna, dan tak lupa menjadi tempat ternyaman untuk pulang, di mana bermuara cinta dan kasih sayang yang akan selalu dirindukan.\nKalau rumah idamanmu yang seperti apa?"
      }
    ],
    "stats": {
      "land": "500m²",
      "floor": "240m²",
      "carport": "yes",
      "pool": "yes",
      "bathroom": "5",
      "room": "4"
    },
    "statsConfig": {
      "LAND AREA": {
        "icon": "land.svg",
        "key": "land",
        "order": 1
      },
      "FLOOR AREA": {
        "icon": "floor.svg",
        "key": "floor",
        "order": 2
      },
      "ROOM": {
        "icon": "room.svg",
        "key": "room",
        "order": 3
      },
      "BATHROOM": {
        "icon": "bathroom.svg",
        "key": "bathroom",
        "order": 4
      },
      "CARPORT": {
        "icon": "garage.svg",
        "key": "carport",
        "order": 5
      },
      "POOL": {
        "icon": "pool.svg",
        "key": "pool",
        "order": 6
      }
    },
    "projectDetails": {
      "TIPE PROYEK": {
        "value": "Rumah Hunian",
        "order": 1
      },
      "PRINCIPLE DESIGNER": {
        "value": "Muhammad Gunawan",
        "order": 2
      },
      "LOKASI": {
        "value": "Kedamaian, Bandar Lampung",
        "order": 3
      },
      "INTERIOR DESIGNER": {
        "value": "Kurnia Firmanda Ageng, S.Ars",
        "order": 4
      }
    }
  },
  {
    "id": 1753464374776,
    "title": "AETHERA HOUSE",
    "slug": "aethera-house",
    "categoryId": "luxury",
    "year": 2024,
    "month": "DEC",
    "description": "Mansion mewah dengan standar luxury yang tinggi. Setiap detail dirancang untuk memberikan pengalaman hidup yang eksklusif dan sophisticated dengan material premium terbaik.",
    "images": {
      "thumbnail": "https://2watuju.com/assets/projects/luxury/aethera/project-exterior-luxury-mewah-lampung-2025.jpg.webp",
      "mobile": "https://2watuju.com/assets/projects/luxury/aethera/project-exterior-luxury-mewah-lampung-2025.jpg.webp",
      "tablet": "https://2watuju.com/assets/projects/luxury/aethera/project-exterior-luxury-mewah-lampung-2025.jpg.webp",
      "desktop": "https://2watuju.com/assets/projects/luxury/aethera/project-exterior-luxury-mewah-lampung-2025.jpg.webp"
    },
    "contentSections": [
      {
        "title": "Welcome to Aethera House",
        "image": "https://2watuju.com/assets/projects/luxury/aethera/project-exterior-luxury-mewah-lampung-2025.jpg.webp",
        "imageDescription": "",
        "content": "Proyek Watuju satu ini adalah sebuah Luxury House yang berlokasi di Gedong Meneng, Bandar Lampung.\n<br/><br/>\nLuxury House menjadi pilihan dari owner kali ini, Kualitas Bangunan dan Material menjadi salah satu alasanya. Kami menggunakan material berkualitas tinggi yang lebih awet dan tahan lama, sehingga rumah akan lebih kokoh dan tahan terhadap berbagai kondisi. Harapannya rumah ini nantinya akan bertahan dari generasi ke generasi berikutnya."
      },
      {
        "title": "",
        "image": "https://2watuju.com/assets/projects/luxury/aethera/project-interior-luxury-mewah-lampung-2025.jpg.webp",
        "imageDescription": "",
        "content": "Rumah ini nantinya akan menjadi tempat owner bertemu dengan kolega bisnis atau rekan kerja. Maka pada proyek kali ini kami lebih dominan menggunakan elemen-elemen modern, serta menggunakan material berkualitas tinggi untuk menciptakan hunian yang indah dan berkelas. Sebagai bentuk kemewahan dan kemegahan yang menjadi simbol kesuksesan dari sang owner."
      },
      {
        "title": "",
        "image": "https://2watuju.com/assets/projects/luxury/aethera/project-interior-luxury-mewah-2-lampung-2025.jpg.webp",
        "imageDescription": "",
        "content": "Selain itu juga rumah ini akan menjadi tempat berkumpul bersama keluarga, maka dari itu yang tak lupa kami prioritaskan adalah fasilitas yang sesuai kebutuhan penghuni rumah, seperti garasi luas yang bisa mengakomodir kendaraan saat banyak tamu berdatangan, konsep open spcae di lantai 1 sebagai komunal space untuk berkumpul dan bercengkrama."
      },
      {
        "title": "",
        "image": "https://2watuju.com/assets/projects/luxury/aethera/project-interior-luxury-mewah-3-lampung-2025.jpg.webp",
        "imageDescription": "",
        "content": "Terdapat juga area kolam renang yang bisa digunakan untuk rekreasi dan olahraga ketika dibutuhkan. Lantai 2 dikhususkan untuk private area seperti kamar anak dan orang tua, ruang entertainment, dan master bedroom."
      },
      {
        "title": "",
        "image": "https://2watuju.com/assets/projects/luxury/aethera/project-interior-luxury-mewah-4-lampung-2025.jpg.webp",
        "imageDescription": "",
        "content": "Di lantai 3 atau rooftop kami desain menjadi ruang bersantai juga namun lebih private, yang bisa digunakan untuk meditasi atau sekedar quality time bersama."
      },
      {
        "title": "",
        "image": "https://2watuju.com/assets/projects/luxury/aethera/project-interior-luxury-mewah-5-lampung-2025.jpg.webp",
        "imageDescription": "",
        "content": ""
      },
      {
        "title": "",
        "image": "https://2watuju.com/assets/projects/luxury/aethera/project-interior-luxury-mewah-6-lampung-2025.jpg.webp",
        "imageDescription": "",
        "content": "Begitulah rumah ini menjadi simbol dari kesuksesan dengan kemegahannya, sekaligus menjadi tempat yang nyaman untuk berkumpul bersama keluarga tercinta.\nKalau rumah impianmu yang seperti apa? Ayo Konsultasi sekarang juga"
      }
    ],
    "stats": {
      "land": "900m²",
      "floor": "500m²",
      "carport": "yes",
      "pool": "yes",
      "bathroom": "4",
      "room": "6"
    },
    "statsConfig": {
      "LAND AREA": {
        "icon": "land.svg",
        "key": "land",
        "order": 1
      },
      "FLOOR AREA": {
        "icon": "floor.svg",
        "key": "floor",
        "order": 2
      },
      "ROOM": {
        "icon": "room.svg",
        "key": "room",
        "order": 3
      },
      "BATHROOM": {
        "icon": "bathroom.svg",
        "key": "bathroom",
        "order": 4
      },
      "CARPORT": {
        "icon": "garage.svg",
        "key": "carport",
        "order": 5
      },
      "POOL": {
        "icon": "pool.svg",
        "key": "pool",
        "order": 6
      }
    },
    "projectDetails": {
      "TIPE PROYEK": {
        "value": "Rumah Hunian",
        "order": 1
      },
      "PRINCIPLE DESIGNER": {
        "value": "Muhammad Gunawan",
        "order": 2
      },
      "LOKASI": {
        "value": "Gedong Meneng, Bandar Lampung",
        "order": 3
      },
      "INTERIOR DESIGNER": {
        "value": "Kurnia Firmanda Ageng, S.Ars",
        "order": 4
      }
    }
  },
  {
    "id": 1753464374777,
    "title": "GIGAN HOUSE",
    "slug": "gigan-house",
    "categoryId": "luxury",
    "year": 2023,
    "month": "DEC",
    "description": "Villa luxury dengan sentuhan modern yang elegan. Menggabungkan kemewahan tradisional dengan teknologi smart home untuk pengalaman hidup yang ultimate.",
    "images": {
      "thumbnail": "https://2watuju.com/assets/projects/luxury/gigan/project-rumah-luxury-lampung-2025.jpg.webp",
      "mobile": "https://2watuju.com/assets/projects/luxury/gigan/project-rumah-luxury-lampung-2025.jpg.webp",
      "tablet": "https://2watuju.com/assets/projects/luxury/gigan/project-rumah-luxury-lampung-2025.jpg.webp",
      "desktop": "https://2watuju.com/assets/projects/luxury/gigan/project-rumah-luxury-lampung-2025.jpg.webp"
    },
    "contentSections": [
      {
        "title": "Welcome to Gigan House",
        "image": "https://2watuju.com/assets/projects/luxury/gigan/project-exterior-luxury-lampung-2025.jpg.webp",
        "imageDescription": "",
        "content": "Rumah ini adalah milik seorang pengusaha sukses, seorang putra daerah yang merintis bisnisnya dari 0. Rumah ini nantinya akan menjadi hunian sekaligus kantor dan juga tempat untuk menjamu kolega maupun rekan sesama pebisnisnya."
      },
      {
        "title": "",
        "image": "https://2watuju.com/assets/projects/luxury/gigan/project-interior-luxury-lampung-2025.jpg.webp",
        "imageDescription": "",
        "content": "Karena itu Gigan House bukan sekadar jadi tempat tinggal semata, tapi sebagai monumen pribadi. Owner menginginkan rumah ini menjadi representasi dari semua pencapaiannya selama ini, maka dari itu kamu rancang Gigan House memiliki karakter kuat, proporsi megah, dan garis desain yang elegan namun tegas—memadukan estetika kontemporer dengan elemen arsitektur klasik yang telah teruji waktu.\n<br/><br/>\nSehingga rumah ini bisa menjadi simbol dari pencapaian sang owner,  dan bukan hanya relevan hari ini, tapi akan terus dikenang dan dibanggakan sampai tua, bahkan lintas generasi."
      },
      {
        "title": "Fleksibilitas Ruang Terbuka untuk Semua Aktivitas",
        "image": "https://2watuju.com/assets/projects/luxury/gigan/project-interior-luxury-2-lampung-2025.jpg.webp",
        "imageDescription": "",
        "content": "Sebagai seorang yang sibuk dengan bisnis seperti bertemu dengan klien, kolega maupun investor, sang owner menginginkan hunian ini sebagai pusat kegiatannya sehari-hari. Setiap ruangan tidak hanya berfungsi sebagai tempat tinggal, tetapi juga sebagai pusat kegiatan komunal yang menghidupkan suasana.\n<br/><br/>\nDari ruang tamu yang luas hingga area makan yang terbuka, semua elemen dirancang untuk memfasilitasi interaksi dan kebutuhan lainnya."
      },
      {
        "title": "Pernyataan Sang Pemilik Tempat Tinggal",
        "image": "https://2watuju.com/assets/projects/luxury/gigan/project-interior-luxury-3-lampung-2025.jpg.webp",
        "imageDescription": "",
        "content": "Rumah ini tidak sekadar tempat tinggal—ia adalah pernyataan tentang siapa sang pemiliknya. Dari gym pribadi, kolam renang elegan, hingga ruang biliard dan area hiburan yang dirancang maksimal, setiap fitur menjadi refleksi dari perjalanan dan pencapaian hidup"
      },
      {
        "title": "",
        "image": "https://2watuju.com/assets/projects/luxury/gigan/project-interior-luxury-4-lampung-2025.jpg.webp",
        "imageDescription": "",
        "content": "Dan yang tak kalah penting adalah rumah ini bisa mewujudkan keinginan sang owner yang menginginkan satu ruang di mana ia bisa melakukan segala aktivitas sosialnya."
      },
      {
        "title": "",
        "image": "https://2watuju.com/assets/projects/luxury/gigan/project-interior-luxury-5-lampung-2025.jpg.webp",
        "imageDescription": "",
        "content": "Tak lupa kami juga memperhatikan pemilihan material seperti marmer impor, kayu solid pilihan, kaca low-e, dan pencahayaan arsitektural berkelas bukan sekadar pamer kemewahan, tapi mencerminkan rasa hormat pada kualitas, kenyamanan, dan keindahan."
      },
      {
        "title": "",
        "image": "https://2watuju.com/assets/projects/luxury/gigan/project-interior-luxury-mewah-lampung-2025.jpg.webp",
        "imageDescription": "",
        "content": "Tak ketinggalan sang Owner juga menghadirkan mihrab/tempat beribadah sebagai bentuk ketundukan dan rasa syukur kepada Tuhan Yang Maha Esa. Menurutnya semua keindahan kemewahan ini tidak akan ada artinya jika kita tidak bisa mensyukuri setiap nikmat yang telah diberikan pada kita."
      },
      {
        "title": "",
        "image": "https://2watuju.com/assets/projects/luxury/gigan/project-exterior-luxury-lampung-2025.jpg.webp",
        "imageDescription": "",
        "content": "Kemudahan akses dan kebersamaan menjadi inti dari pengalaman rumah ini, memungkinkan setiap momen diisi dengan makna dan hubungan yang kuat. Karena rumah terbaik bukan hanya untuk dihuni, tapi juga untuk dirayakan sebagai simbol keberhasilan."
      }
    ],
    "stats": {
      "land": "900m²",
      "floor": "500m²",
      "carport": "yes",
      "pool": "yes",
      "bathroom": "4",
      "room": "6"
    },
    "statsConfig": {
      "LAND AREA": {
        "icon": "land.svg",
        "key": "land",
        "order": 1
      },
      "FLOOR AREA": {
        "icon": "floor.svg",
        "key": "floor",
        "order": 2
      },
      "ROOM": {
        "icon": "room.svg",
        "key": "room",
        "order": 3
      },
      "BATHROOM": {
        "icon": "bathroom.svg",
        "key": "bathroom",
        "order": 4
      },
      "CARPORT": {
        "icon": "garage.svg",
        "key": "carport",
        "order": 5
      },
      "POOL": {
        "icon": "pool.svg",
        "key": "pool",
        "order": 6
      }
    },
    "projectDetails": {
      "TIPE PROYEK": {
        "value": "Rumah Hunian",
        "order": 1
      },
      "PRINCIPLE DESIGNER": {
        "value": "Muhammad Gunawan",
        "order": 2
      },
      "LOKASI": {
        "value": "Enggal, Bandar Lampung",
        "order": 3
      },
      "INTERIOR DESIGNER": {
        "value": "Kurnia Firmanda Ageng, S.Ars",
        "order": 4
      }
    }
  },
  {
    "id": 1753464374778,
    "title": "ADZRA HOUSE",
    "slug": "adzra-house",
    "categoryId": "modern",
    "year": 2024,
    "month": "JAN",
    "description": "Rumah modern dengan desain yang clean dan fungsional. Mengutamakan efisiensi ruang dan pencahayaan alami dengan garis-garis tegas yang menjadi ciri khas arsitektur modern.",
    "images": {
      "thumbnail": "https://2watuju.com/assets/projects/modern/adzra/project-rumah-modern-lampung-2025.jpg.webp",
      "mobile": "https://2watuju.com/assets/projects/modern/adzra/project-rumah-modern-lampung-2025.jpg.webp",
      "tablet": "https://2watuju.com/assets/projects/modern/adzra/project-rumah-modern-lampung-2025.jpg.webp",
      "desktop": "https://2watuju.com/assets/projects/modern/adzra/project-rumah-modern-lampung-2025.jpg.webp"
    },
    "contentSections": [
      {
        "title": "Welcome to Adzra House",
        "image": "https://2watuju.com/assets/projects/modern/adzra/project-exterior-modern-lampung-2025.jpg.webp",
        "imageDescription": "",
        "content": "Sedikit background dari sang owner, sang istri adalah seorang pengusaha fashion muslimah. Sementara sang ayah adalah seorang senior employee di sebuah perusahaan jasa yang bergerak dibidang otomotif. Dan keluarga kecil ini dilengkapi oleh 2 buah hati yang masih bersekolah dasar.\n<br/><br/>\nSobat Watuju kali ini ingin pindah rumah dari rumah yang lama, dan akhirnya membeli rumah di lingkugan yang sama namun dengan lahan yang lebih luas."
      },
      {
        "title": "",
        "image": "https://2watuju.com/assets/projects/modern/adzra/project-interior-modern-lampung-2025.jpg.webp",
        "imageDescription": "",
        "content": "Setelah bertahun-tahun tinggal di rumah lama yang terasa sempit dan sering tergenang banjir, keluarga ini memutuskan untuk memulai lembar baru. Rumah baru ini bukan sekadar pindah lokasi, tapi tentang membangun hidup yang lebih selaras—dengan ruang yang lebih lega, sirkulasi udara yang lebih baik, dan tata letak yang terasa ringan dan mengalir. Sebuah langkah signifikan untuk menciptakan hunian yang benar-benar mendukung aktivitas keluarga muda yang dinamis."
      },
      {
        "title": "Tahan Banjir namun Sedap Dipandang",
        "image": "https://2watuju.com/assets/projects/modern/adzra/project-interior-modern-2-lampung-2025.jpg.webp",
        "imageDescription": "",
        "content": "fondasi rumah ditinggikan, sistem drainase ditanam rapi, dan material tahan lembap kami pilih dengan seksma supaya tidak mengorbankan estetika. Desain ini menjawab tantangan lingkungan sekitar yang rawan banjir dengan solusi yang cerdas dan elegan—fungsi dan tampilan bisa jalan beriringan, tanpa harus terlihat kaku atau teknis."
      },
      {
        "title": "",
        "image": "https://2watuju.com/assets/projects/modern/adzra/project-interior-modern-3-lampung-2025.jpg.webp",
        "imageDescription": "",
        "content": "Sebagai seorang pengusaha fashion, sang istri menjalankan aktivitas butik dan live streaming dari rumah, yang menuntut ruang kerja khusus yang tetap nyaman dan profesional. Tantangannya, rumah tetap harus berfungsi utama sebagai tempat tinggal—tanpa terganggu oleh lalu lintas pekerjaan atau suasana yang terlalu sibuk. Untuk menjawab kebutuhan itu, area usaha kami letakkan di lantai satu dan dirancang sebagai ruang khusus yang terpisah secara fungsional. Penataannya mempertimbangkan privasi, akustik, dan alur mobilitas, agar aktivitas bisnis dapat berjalan lancar tanpa mengganggu kenyamanan keluarga."
      },
      {
        "title": "",
        "image": "https://2watuju.com/assets/projects/modern/adzra/project-interior-modern-4-lampung-2025.jpg.webp",
        "imageDescription": "",
        "content": "Dengan dua anak perempuan yang sedang tumbuh, sang owner menginginkan rumah yang bisa memberikan kenyamanan sekaligus mendukung proses tumbuh kembang mereka. Tantangannya, bagaimana menghadirkan ruang yang efisien dan rapi, tanpa terasa kaku atau terlalu netral secara visual."
      },
      {
        "title": "",
        "image": "https://2watuju.com/assets/projects/modern/adzra/project-interior-modern-5-lampung-2025.jpg.webp",
        "imageDescription": "",
        "content": "Untuk itu, kami memilih gaya minimalis modern yang diperkaya dengan sentuhan feminim melalui pemilihan warna lembut, material natural, dan pencahayaan hangat yang membuat kamar si adik lebih teresa personal. Kamar tidur, area belajar, dan ruang bermain dirancang saling terhubung namun tetap memberikan ruang privat yang cukup—mendukung aktivitas anak, sekaligus menciptakan suasana rumah yang penuh kehangatan dan kedekatan antar anggota keluarga."
      },
      {
        "title": "",
        "image": "https://2watuju.com/assets/projects/modern/adzra/project-interior-modern-6-lampung-2025.jpg.webp",
        "imageDescription": "",
        "content": "Sementara itu, hobi sang ayah memelihara burung juga tetap diberi tempat khusus. Sebuah area outdoor di balkon rumah menjadi area relaksasi pribadi yang tetap menyatu secara visual dengan rumah. Suara burung jadi elemen alami yang menenangkan, menghadirkan jeda di tengah kesibukan, tanpa mengganggu kenyamanan rumah secara keseluruhan."
      },
      {
        "title": "",
        "image": "https://2watuju.com/assets/projects/modern/adzra/project-rumah-modern-lampung-2025.jpg.webp",
        "imageDescription": "",
        "content": "Dan terciptalah sebuah hunian yang menjadi representasi keseimbangan: antara hidup dan kerja, antara fungsi dan rasa, antara ruang pribadi dan kebersamaan. Dirancang bukan hanya untuk hari ini, tapi juga siap tumbuh bersama keluarga di tahun-tahun yang akan datang."
      }
    ],
    "stats": {
      "land": "235m²",
      "floor": "200m²",
      "carport": "yes",
      "pool": "no",
      "bathroom": "5",
      "room": "5"
    },
    "statsConfig": {
      "LAND AREA": {
        "icon": "land.svg",
        "key": "land",
        "order": 1
      },
      "FLOOR AREA": {
        "icon": "floor.svg",
        "key": "floor",
        "order": 2
      },
      "ROOM": {
        "icon": "room.svg",
        "key": "room",
        "order": 3
      },
      "BATHROOM": {
        "icon": "bathroom.svg",
        "key": "bathroom",
        "order": 4
      },
      "CARPORT": {
        "icon": "garage.svg",
        "key": "carport",
        "order": 5
      },
      "POOL": {
        "icon": "pool.svg",
        "key": "pool",
        "order": 6
      }
    },
    "projectDetails": {
      "TIPE PROYEK": {
        "value": "Rumah Hunian",
        "order": 1
      },
      "PRINCIPLE DESIGNER": {
        "value": "Muhammad Gunawan",
        "order": 2
      },
      "LOKASI": {
        "value": "Sukarame, Bandar Lampung",
        "order": 3
      },
      "INTERIOR DESIGNER": {
        "value": "Kurnia Firmanda Ageng, S.Ars",
        "order": 4
      }
    }
  },
  {
    "id": 1753464374779,
    "title": "CAELI HOUSE",
    "slug": "caeli-house",
    "categoryId": "modern",
    "year": 2023,
    "month": "DEC",
    "description": "Villa modern dengan sentuhan kekinian yang trendy. Menggabungkan elemen arsitektur modern dengan material dan teknologi terbaru untuk menciptakan hunian yang up-to-date.",
    "images": {
      "thumbnail": "https://2watuju.com/assets/projects/modern/caeli/project-rumah-modern-kekinian-lampung-2025.jpg.webp",
      "mobile": "https://2watuju.com/assets/projects/modern/caeli/project-rumah-modern-kekinian-lampung-2025.jpg.webp",
      "tablet": "https://2watuju.com/assets/projects/modern/caeli/project-rumah-modern-kekinian-lampung-2025.jpg.webp",
      "desktop": "https://2watuju.com/assets/projects/modern/caeli/project-rumah-modern-kekinian-lampung-2025.jpg.webp"
    },
    "contentSections": [
      {
        "title": "Welcome to Caeli House",
        "image": "https://2watuju.com/assets/projects/modern/caeli/project-exterior-modern-kekinian-lampung-2025.jpg.webp",
        "imageDescription": "",
        "content": "Klien Watuju kali ini adalah seorang wirasuahawan yang ingin membuat rumah untuk pensiun, tempat ia bisa berkumpul menghabiskan waktu bersama anak dan cucu tercinta.\n<br/><br/>\nBerasal dari bahasa Latin Caelum, artinya langit. CAELI (dibaca kay-li) memberi kesan modern, ringan, dan terbuka—seperti langit yang luas. Nama ini mengandung makna rumah yang lapang, terang, dan menenangkan, cocok dengan hunian yang mengutamakan ruang terbuka dan koneksi dengan alam.\n<br/><br/>\nSang owner rencanaya akan meratakan rumah lama dan membangun ulang rumah yang baru diatasnya. Berlokasi di Kedamaian, Bandar lampung akan dibangun rumah 2 lantai dengan luas lahan 400m2.\n<br/><br/>\nRumah lama yang telah ditempati selama puluhan tahun mulai menunjukkan tanda-tanda usia: dinding yang lembap, pencahayaan yang minim, hingga sirkulasi udara yang tertahan karena posisi di ujung perumahan. Tak hanya itu, isu banjir yang semakin meningkat menjadi kekhawatiran tersendiri bagi penghuni."
      },
      {
        "title": "Rumah Sebagai Meditasi di Masa Refleksi",
        "image": "https://2watuju.com/assets/projects/modern/caeli/project-interior-modern-kekinian-lampung-2025.jpg.webp",
        "imageDescription": "",
        "content": "Dalam desain rumah baru ini, solusi diterapkan sejak awal—mulai dari elevasi lantai yang ditinggikan, tata massa bangunan yang membuka lebih banyak sisi terhadap cahaya alami, hingga bukaan silang yang memperbaiki sirkulasi udara. Sebuah pendekatan menyeluruh untuk menciptakan hunian yang sehat dan aman untuk masa kini hingga nanti.\n<br/><br/>\nMenghadapi era dimana bisnis sedang naik-naiknya namun produktifitas diri sudah tidak seperti dulu lagi, klien membutuhkan rumah yang bisa mengimbangi kebutuhan tersebut. Aktivitas harian yang kini lebih banyak dihabiskan di rumah membuat fungsi ruang menjadi kunci: dari ruang santai semi-outdoor, teras berpohon rindang untuk meditasi pagi, hingga sirkulasi dalam rumah yang mengalir tanpa sekat masif."
      },
      {
        "title": "",
        "image": "https://2watuju.com/assets/projects/modern/caeli/project-interior-modern-kekinian2-lampung-2025.jpg.webp",
        "imageDescription": "",
        "content": "Dengan desain layout terbuka (open plan), setiap pergerakan terasa ringan—ruang keluarga menyatu dengan area makan dan dapur, memudahkan interaksi antar generasi. Rumah ini bukan sekadar tempat tinggal, tapi ruang hidup yang mengalir selaras dengan ritme penghuninya.\n<br/><br/>\nMeski waktu luang semakin menjadi prioritas, bukan berarti sang pemilik sepenuhnya lepas dari aktivitas produktif. Di sela-sela kebersamaan bersama cucu, kadang pekerjaan ringan tetap berlangsung, atau sekadar menyortir dokumen usaha yang masih berjalan. Untuk itu, dirancang satu ruang tenang multifungsi di sisi privat rumah—berfungsi sebagai ruang baca, ruang kerja ringan, atau ruang pribadi untuk mengakses rutinitas tanpa terganggu. Area ini juga bersebelahan dengan taman kecil, memberi nuansa hijau yang mendukung fokus maupun relaksasi."
      },
      {
        "title": "",
        "image": "https://2watuju.com/assets/projects/modern/caeli/project-interior-modern-kekinian3-lampung-2025.jpg.webp",
        "imageDescription": "",
        "content": "Dengan kondisi lahan yang berada di ujung kavling dan terhimpit bangunan lama di sekitarnya, pendekatan desain pun harus adaptif. Alih-alih melihat ini sebagai keterbatasan, desain rumah ini justru merespon dengan lebih banyak void, taman dalam (inner courtyard), serta skylight strategis untuk memaksimalkan pencahayaan alami. Volume bangunan dibentuk mengikuti sumbu cahaya, bukan hanya menyesuaikan estetika, tetapi juga sebagai strategi pasif cooling yang mengurangi ketergantungan terhadap pendingin buatan. Lingkungan yang tertutup diubah menjadi tempat yang terbuka secara energi."
      },
      {
        "title": "",
        "image": "https://2watuju.com/assets/projects/modern/caeli/project-exterior-modern-kekinian-lampung-2025.jpg.webp",
        "imageDescription": "",
        "content": "Pada akhirnya, rumah ini bukan hanya tentang menyusun bata dan atap, tetapi tentang menciptakan tempat pulang yang memberi rasa aman dan tenang di masa tua. Setiap elemen—dari bukaan jendela yang menyambut pagi, alur lantai tanpa undakan, hingga keamanan perimeter yang terintegrasi—dirancang untuk memberi kenyamanan jangka panjang. Rumah ini hadir sebagai ruang yang tidak hanya mengakomodasi fisik yang melambat, tapi juga memeluk jiwa yang sedang belajar menikmati waktu."
      }
    ],
    "stats": {
      "land": "212m²",
      "floor": "400m²",
      "carport": "yes",
      "pool": "yes",
      "bathroom": "4",
      "room": "4"
    },
    "statsConfig": {
      "LAND AREA": {
        "icon": "land.svg",
        "key": "land",
        "order": 1
      },
      "FLOOR AREA": {
        "icon": "floor.svg",
        "key": "floor",
        "order": 2
      },
      "ROOM": {
        "icon": "room.svg",
        "key": "room",
        "order": 3
      },
      "BATHROOM": {
        "icon": "bathroom.svg",
        "key": "bathroom",
        "order": 4
      },
      "CARPORT": {
        "icon": "garage.svg",
        "key": "carport",
        "order": 5
      },
      "POOL": {
        "icon": "pool.svg",
        "key": "pool",
        "order": 6
      }
    },
    "projectDetails": {
      "TIPE PROYEK": {
        "value": "Rumah Hunian",
        "order": 1
      },
      "PRINCIPLE DESIGNER": {
        "value": "Muhammad Gunawan",
        "order": 2
      },
      "LOKASI": {
        "value": "Kedamaian, Bandar Lampung",
        "order": 3
      },
      "INTERIOR DESIGNER": {
        "value": "Kurnia Firmanda Ageng, S.Ars",
        "order": 4
      }
    }
  },
  {
    "id": 1753464374780,
    "title": "DAHLIA HOUSE",
    "slug": "dahlia-house",
    "categoryId": "classic",
    "year": 2021,
    "month": "DEC",
    "description": "Mansion klasik dengan detail arsitektur yang timeless dan elegan. Menggabungkan kemegahan tradisional dengan kenyamanan modern untuk menciptakan hunian yang prestigious.",
    "images": {
      "thumbnail": "https://2watuju.com/assets/projects/classic/dahlia/project-rumah-classic-lampung-2025.jpg.webp",
      "mobile": "https://2watuju.com/assets/projects/classic/dahlia/project-rumah-classic-lampung-2025.jpg.webp",
      "tablet": "https://2watuju.com/assets/projects/classic/dahlia/project-rumah-classic-lampung-2025.jpg.webp",
      "desktop": "https://2watuju.com/assets/projects/classic/dahlia/project-rumah-classic-lampung-2025.jpg.webp"
    },
    "contentSections": [
      {
        "title": "Welcome to Dahlia House",
        "image": "https://2watuju.com/assets/projects/classic/dahlia/project-exterior-classic-lampung-2025.jpg.webp",
        "imageDescription": "",
        "content": "Proyek Watuju satu ini adalah sebuah hunian Neo-Classic yang berlokasi di Kec. Sukabumi, Bandar Lampung.<br/>\nSalah satu alasan owner memilih rumah bergaya klasik adalah karena rumah bergaya klasik memiliki kesan mewah dan elegan yang timeless, yang harapanya rumah ini akan menjadi warisan bagi anak-anaknya dan lebih dari itu harapannya setiap ruangan di rumah ini akan menjadi memori indah yang akan selalu dikenang."
      },
      {
        "title": "",
        "image": "https://2watuju.com/assets/projects/classic/dahlia/project-interior-classic-lampung-2025.jpg.webp",
        "imageDescription": "",
        "content": "Alasan kedua adalah tata ruang yang teratur, rumah klasik umumnya memiliki tata ruang yang lebih teratur dan terorganisir. Setiap ruangan memiliki fungsi yang jelas dan terpisah, namun berbeda dengan rumah klasik biasanya yang punya kesan formal, Dahlia House didesain untuk menjadi tempat yang nyaman dan santai untuk kumpul keluarga. Sehingga banyak spot-spot bersantai di rumah ini namun tetap terorganisir."
      },
      {
        "title": "",
        "image": "https://2watuju.com/assets/projects/classic/dahlia/project-interior-classic-2-lampung-2025.jpg.webp",
        "imageDescription": "",
        "content": "Penggunaan material berkualitas tinggi, juga menambah kenyamanan saat bercengkrama dengan keluarga. Adanya ventilasi silang juga ceiling tinggi dengan penambahan bouvenlight menjadikan rumah ini mempunya pencahayaan dan ventilasi alami yang baik.\n<br/><br/>\nDesainnya yang klasik juga menghadirkan suasana hangat dan nyaman, yang memang difungsikan untuk kumpul dengan sanak keluarga. Kami juga menambahkan kesan artistik yang akan memukau setiap tamu yang datang ke rumah ini."
      },
      {
        "title": "Rumah, Ibu dan Anak-anaknya.",
        "image": "https://2watuju.com/assets/projects/classic/dahlia/project-interior-classic-3-lampung-2025.jpg.webp",
        "imageDescription": "",
        "content": "Dahlia House bukan hanya didesain dengan mewah tapi juga didesain sesuai kebutuhan si penghuni. Seorang ibu tidak akan bisa dipisahkan dari anak-anaknya, dari situlah Dahlia House terinspirasi, sebuah hunian yang didesain untuk menjadi tempat ternyaman bagi keluarga untuk berkumpul bersama."
      },
      {
        "title": "",
        "image": "https://2watuju.com/assets/projects/classic/dahlia/project-interior-classic-4-lampung-2025.jpg.webp",
        "imageDescription": "",
        "content": "Mulai dari living room open space yang terkoneksi dengan dapur, membuat area ini menjadi spot hangat untuk berkumpul saat lebaran atau acara apapun. Dengan konsep open space ini rumah jadi lebih terasa luas, penataan interior yang lebih fleksibel, memudahkan pengawasan anak-anak dan juga meningkatkan interaksi bersama keluarga yang makin menjadikan rumah ini terasa hidup, hangat dan nyaman.\nBegitulah kami mengonsep Dahlia House, sebuah huian tentang cinta, keluarga dan kehangatan di dalamnya.\n<br/><br/>\nKalau Rumah impianmu seperti apa? Ayo Konsultasi bersama Watuju sekarang juga!"
      }
    ],
    "stats": {
      "land": "500m²",
      "floor": "800m²",
      "carport": "yes",
      "pool": "yes",
      "bathroom": "5",
      "room": "5"
    },
    "statsConfig": {
      "LAND AREA": {
        "icon": "land.svg",
        "key": "land",
        "order": 1
      },
      "FLOOR AREA": {
        "icon": "floor.svg",
        "key": "floor",
        "order": 2
      },
      "ROOM": {
        "icon": "room.svg",
        "key": "room",
        "order": 3
      },
      "BATHROOM": {
        "icon": "bathroom.svg",
        "key": "bathroom",
        "order": 4
      },
      "CARPORT": {
        "icon": "garage.svg",
        "key": "carport",
        "order": 5
      },
      "POOL": {
        "icon": "pool.svg",
        "key": "pool",
        "order": 6
      }
    },
    "projectDetails": {
      "TIPE PROYEK": {
        "value": "Neo Classic Design",
        "order": 1
      },
      "PRINCIPLE DESIGNER": {
        "value": "Muhammad Gunawan",
        "order": 2
      },
      "LOKASI": {
        "value": "Sukabumi, Bandar Lampung",
        "order": 3
      },
      "INTERIOR DESIGNER": {
        "value": "Kurnia Firmanda Ageng, S.Ars",
        "order": 4
      }
    },
    "hotspots": [
      {
        "x": 76.88,
        "y": 50.53,
        "scene": "scene1",
        "label": "Scene 2",
        "type": "nav",
        "targetScene": "scene2",
        "icon": "door"
      },
      {
        "x": 73.27,
        "y": 50.01,
        "scene": "scene2",
        "label": "Scene 1",
        "type": "nav",
        "targetScene": "scene1",
        "icon": "door"
      }
    ],
    "panoramic": {
      "scene1": "https://raw.githubusercontent.com/2watuju/2Watuju/refs/heads/main/static/assets/panorama/Dahlia/Panorama_RDH%20v2_2025-08-04-10-45-26.webp",
      "scene2": "https://raw.githubusercontent.com/2watuju/2Watuju/refs/heads/main/static/assets/panorama/Dahlia/Panorama_RDH%20v2_2025-08-04-11-03-52.webp"
    }
  }
];




/* -------------------------------------------------- */
/* BATAS PASTE                                        */
/* -------------------------------------------------- */




export const projectStatuses = {
  planning: 'Perencanaan',
  'in-progress': 'Dalam Proses',
  completed: 'Selesai'
};

// Helper functions
export const getAllProjects = () => projects;
export const getFeaturedProjects = () => projects.filter(project => project.featured);
export const getProjectBySlug = (slug) => projects.find(project => project.slug === slug);
export const getProjectsByCategoryId = (categoryId) => projects.filter(project => project.categoryId === categoryId);
export const getProjectsByStatus = (status) => projects.filter(project => project.status === status);

// UPDATED: Efficient helper function for stats
export const getOrderedStats = (project) => {
  if (!project.stats || !project.statsConfig) return [];
  
  return Object.entries(project.statsConfig)
    .map(([label, config]) => ({
      label,
      value: project.stats[config.key],
      icon: config.icon,
      order: config.order
    }))
    .filter(stat => stat.value !== undefined) // Only include stats that have values
    .sort((a, b) => (a.order || 999) - (b.order || 999));
};

// UPDATED: Efficient helper function for project details
export const getOrderedProjectDetails = (project) => {
  if (!project.projectDetails) return [];
  
  return Object.entries(project.projectDetails)
    .map(([label, detail]) => {
      // Support both old format (string) and new format (object)
      if (typeof detail === 'string') {
        return { label, value: detail, order: 999 };
      }
      return { label, value: detail.value, order: detail.order };
    })
    .sort((a, b) => (a.order || 999) - (b.order || 999));
};