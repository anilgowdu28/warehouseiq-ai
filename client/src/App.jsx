import { useMemo, useState } from "react";
import {
  LayoutDashboard, Package, ShoppingCart, Sparkles, ClipboardList, Box,
  ShieldCheck, Truck, AlertTriangle, BarChart3, FileText, Settings,
  Search, Bell, Moon, Send, CheckCircle2, Zap, ArrowRight, X, Bot
} from "lucide-react";

const inventory = [
  {"sku":"LAP-101","name":"AeroBook Pro 14","category":"Laptops","stock":18,"reserved":5,"reorder":10,"location":"A-01-01","price":1012,"specs":"14-inch IPS • 16GB RAM • 1TB SSD","image":"https://images.unsplash.com/photo-1496181133206-80ce9b88a853?w=700&q=80"},
  {"sku":"LAP-102","name":"AeroBook Air 13","category":"Laptops","stock":34,"reserved":10,"reorder":19,"location":"A-01-02","price":1025,"specs":"13.6-inch • 16GB RAM • 512GB SSD","image":"https://images.unsplash.com/photo-1517336714731-489689fd1ca8?w=700&q=80"},
  {"sku":"LAP-103","name":"Titan Gaming 16","category":"Laptops","stock":9,"reserved":3,"reorder":8,"location":"A-01-03","price":1038,"specs":"16-inch 165Hz • RTX graphics • 32GB RAM","image":"https://images.unsplash.com/photo-1603302576837-37561b2e2302?w=700&q=80"},
  {"sku":"LAP-104","name":"WorkMate 15","category":"Laptops","stock":27,"reserved":8,"reorder":15,"location":"A-01-04","price":1051,"specs":"15.6-inch FHD • Core i5 • 16GB RAM","image":"https://images.unsplash.com/photo-1496181133206-80ce9b88a853?w=700&q=80"},
  {"sku":"LAP-105","name":"CreatorBook Studio","category":"Laptops","stock":6,"reserved":2,"reorder":8,"location":"A-01-05","price":1064,"specs":"15-inch OLED • 32GB RAM • 1TB SSD","image":"https://images.unsplash.com/photo-1517336714731-489689fd1ca8?w=700&q=80"},
  {"sku":"MON-101","name":"Vision 27 4K","category":"Monitors","stock":31,"reserved":9,"reorder":17,"location":"A-02-01","price":312,"specs":"27-inch IPS • 3840×2160 • 60Hz","image":"https://images.unsplash.com/photo-1527443224154-c4a3942d3acf?w=700&q=80"},
  {"sku":"MON-102","name":"Vision 24 Office","category":"Monitors","stock":52,"reserved":15,"reorder":29,"location":"A-02-02","price":325,"specs":"24-inch IPS • FHD • 75Hz","image":"https://images.unsplash.com/photo-1585792180666-f7347c490ee2?w=700&q=80"},
  {"sku":"MON-103","name":"UltraWide 34","category":"Monitors","stock":14,"reserved":4,"reorder":8,"location":"A-02-03","price":338,"specs":"34-inch • 3440×1440 • 100Hz","image":"https://images.unsplash.com/photo-1616763355548-1b606f439f86?w=700&q=80"},
  {"sku":"MON-104","name":"Esports 27 240Hz","category":"Monitors","stock":7,"reserved":2,"reorder":8,"location":"A-02-04","price":351,"specs":"27-inch • 240Hz • 1ms","image":"https://images.unsplash.com/photo-1527443224154-c4a3942d3acf?w=700&q=80"},
  {"sku":"MON-105","name":"Portable 15 Display","category":"Monitors","stock":22,"reserved":6,"reorder":12,"location":"A-02-05","price":364,"specs":"15.6-inch • FHD • USB-C","image":"https://images.unsplash.com/photo-1585792180666-f7347c490ee2?w=700&q=80"},
  {"sku":"KEY-101","name":"Mechanical Keyboard K8","category":"Keyboards","stock":68,"reserved":19,"reorder":37,"location":"B-01-01","price":102,"specs":"87 keys • RGB • Hot-swap • USB-C","image":"https://images.unsplash.com/photo-1587829741301-dc798b83add3?w=700&q=80"},
  {"sku":"KEY-102","name":"Compact Keyboard 65","category":"Keyboards","stock":45,"reserved":13,"reorder":25,"location":"B-01-02","price":115,"specs":"65% • RGB • Wireless • USB-C","image":"https://images.unsplash.com/photo-1595225476474-87563907a212?w=700&q=80"},
  {"sku":"KEY-103","name":"Silent Office Keyboard","category":"Keyboards","stock":93,"reserved":26,"reorder":51,"location":"B-01-03","price":128,"specs":"Full-size • Low-noise • Wireless","image":"https://images.unsplash.com/photo-1541140532154-b024d705b90a?w=700&q=80"},
  {"sku":"KEY-104","name":"Gaming Keyboard X","category":"Keyboards","stock":16,"reserved":4,"reorder":9,"location":"B-01-04","price":141,"specs":"104 keys • Mechanical • RGB","image":"https://images.unsplash.com/photo-1587829741301-dc798b83add3?w=700&q=80"},
  {"sku":"KEY-105","name":"Ergo Split Keyboard","category":"Keyboards","stock":12,"reserved":3,"reorder":8,"location":"B-01-05","price":154,"specs":"Split layout • Mechanical • USB-C","image":"https://images.unsplash.com/photo-1595225476474-87563907a212?w=700&q=80"},
  {"sku":"MOU-101","name":"Wireless Mouse Pro","category":"Mice","stock":142,"reserved":40,"reorder":78,"location":"B-02-01","price":72,"specs":"2.4GHz • 1600 DPI • 6 buttons","image":"https://images.unsplash.com/photo-1527814050087-3793815479db?w=700&q=80"},
  {"sku":"MOU-102","name":"Ergo Mouse Vertical","category":"Mice","stock":28,"reserved":8,"reorder":15,"location":"B-02-02","price":85,"specs":"Vertical • 2400 DPI • Ergonomic","image":"https://images.unsplash.com/photo-1615663245857-ac93bb7c39e7?w=700&q=80"},
  {"sku":"MOU-103","name":"Gaming Mouse Ultra","category":"Mice","stock":11,"reserved":3,"reorder":8,"location":"B-02-03","price":98,"specs":"26K DPI • 69g • Wireless","image":"https://images.unsplash.com/photo-1563297007-0686b7003af7?w=700&q=80"},
  {"sku":"MOU-104","name":"Travel Mouse Mini","category":"Mice","stock":74,"reserved":21,"reorder":41,"location":"B-02-04","price":111,"specs":"Compact • Bluetooth • 1600 DPI","image":"https://images.unsplash.com/photo-1527814050087-3793815479db?w=700&q=80"},
  {"sku":"MOU-105","name":"Precision Mouse 8","category":"Mice","stock":86,"reserved":24,"reorder":47,"location":"B-02-05","price":124,"specs":"8000 DPI • 8 buttons • USB","image":"https://images.unsplash.com/photo-1615663245857-ac93bb7c39e7?w=700&q=80"},
  {"sku":"AUD-101","name":"Bluetooth Headphones ANC","category":"Audio","stock":24,"reserved":7,"reorder":13,"location":"B-03-01","price":132,"specs":"ANC • 40h battery • Bluetooth 5.3","image":"https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=700&q=80"},
  {"sku":"AUD-102","name":"Studio Headset Pro","category":"Audio","stock":119,"reserved":33,"reorder":65,"location":"B-03-02","price":145,"specs":"Over-ear • 50mm drivers • Detachable mic","image":"https://images.unsplash.com/photo-1546435770-a3e426bf472b?w=700&q=80"},
  {"sku":"AUD-103","name":"Pocket Earbuds","category":"Audio","stock":38,"reserved":11,"reorder":21,"location":"B-03-03","price":158,"specs":"True wireless • IPX5 • 28h battery","image":"https://images.unsplash.com/photo-1590658268037-6bf12165a8df?w=700&q=80"},
  {"sku":"AUD-104","name":"Desk Speaker Duo","category":"Audio","stock":33,"reserved":9,"reorder":18,"location":"B-03-04","price":171,"specs":"2.0 stereo • USB-C • 30W RMS","image":"https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=700&q=80"},
  {"sku":"AUD-105","name":"USB Podcast Microphone","category":"Audio","stock":47,"reserved":13,"reorder":26,"location":"B-03-05","price":184,"specs":"USB-C • Cardioid • 24-bit/96kHz","image":"https://images.unsplash.com/photo-1546435770-a3e426bf472b?w=700&q=80"},
  {"sku":"CAM-101","name":"Smart Webcam 1080p","category":"Cameras","stock":13,"reserved":4,"reorder":8,"location":"B-04-01","price":212,"specs":"1080p • 60fps • Autofocus","image":"https://images.unsplash.com/photo-1516321318423-f06f85e504b3?w=700&q=80"},
  {"sku":"CAM-102","name":"Creator Webcam 4K","category":"Cameras","stock":18,"reserved":5,"reorder":10,"location":"B-04-02","price":225,"specs":"4K • HDR • Autofocus • USB-C","image":"https://images.unsplash.com/photo-1516035069371-29a1b244cc32?w=700&q=80"},
  {"sku":"CAM-103","name":"Conference Camera","category":"Cameras","stock":23,"reserved":6,"reorder":13,"location":"B-04-03","price":238,"specs":"4K • 120° FOV • Speaker tracking","image":"https://images.unsplash.com/photo-1587302912306-cf1ed9c33146?w=700&q=80"},
  {"sku":"CAM-104","name":"Action Camera 4K","category":"Cameras","stock":19,"reserved":5,"reorder":10,"location":"B-04-04","price":251,"specs":"4K60 • Stabilization • Waterproof 10m","image":"https://images.unsplash.com/photo-1516321318423-f06f85e504b3?w=700&q=80"},
  {"sku":"CAM-105","name":"Document Camera","category":"Cameras","stock":8,"reserved":2,"reorder":8,"location":"B-04-05","price":264,"specs":"1080p • Auto focus • USB","image":"https://images.unsplash.com/photo-1516035069371-29a1b244cc32?w=700&q=80"},
  {"sku":"STO-101","name":"Portable SSD 1TB","category":"Storage","stock":36,"reserved":10,"reorder":20,"location":"C-01-01","price":142,"specs":"1TB • USB-C • 1050MB/s","image":"https://images.unsplash.com/photo-1597872200969-2b65d56bd16b?w=700&q=80"},
  {"sku":"STO-102","name":"Portable SSD 2TB","category":"Storage","stock":5,"reserved":1,"reorder":8,"location":"C-01-02","price":155,"specs":"2TB • USB-C • 2000MB/s","image":"https://images.unsplash.com/photo-1531492746076-161ca9b1c5e9?w=700&q=80"},
  {"sku":"STO-103","name":"External HDD 4TB","category":"Storage","stock":55,"reserved":15,"reorder":30,"location":"C-01-03","price":168,"specs":"4TB • USB 3.0 • 5400 RPM","image":"https://images.unsplash.com/photo-1587202372775-e229f172b9d0?w=700&q=80"},
  {"sku":"STO-104","name":"NVMe SSD 2TB","category":"Storage","stock":21,"reserved":6,"reorder":12,"location":"C-01-04","price":181,"specs":"2TB • PCIe 4.0 • 7000MB/s","image":"https://images.unsplash.com/photo-1597872200969-2b65d56bd16b?w=700&q=80"},
  {"sku":"STO-105","name":"USB Flash Drive 256GB","category":"Storage","stock":73,"reserved":20,"reorder":40,"location":"C-01-05","price":194,"specs":"256GB • USB 3.2 • Compact","image":"https://images.unsplash.com/photo-1531492746076-161ca9b1c5e9?w=700&q=80"},
  {"sku":"NET-101","name":"Wi-Fi 6 Router AX3000","category":"Networking","stock":41,"reserved":11,"reorder":23,"location":"C-02-01","price":102,"specs":"AX3000 • Dual-band • 4 LAN ports","image":"https://images.unsplash.com/photo-1606904825846-647eb07f5be8?w=700&q=80"},
  {"sku":"NET-102","name":"Mesh Wi-Fi 2-Pack","category":"Networking","stock":9,"reserved":3,"reorder":8,"location":"C-02-02","price":115,"specs":"Wi-Fi 6 • 2 nodes • 5000 sq ft","image":"https://images.unsplash.com/photo-1558494949-ef010cbdcc31?w=700&q=80"},
  {"sku":"NET-103","name":"8-Port Gigabit Switch","category":"Networking","stock":26,"reserved":7,"reorder":14,"location":"C-02-03","price":128,"specs":"8× Gigabit • Plug-and-play","image":"https://images.unsplash.com/photo-1625314867237-5d6f4fbb6e1b?w=700&q=80"},
  {"sku":"NET-104","name":"USB Wi-Fi Adapter","category":"Networking","stock":44,"reserved":12,"reorder":24,"location":"C-02-04","price":141,"specs":"Wi-Fi 6 • USB 3.0 • Dual-band","image":"https://images.unsplash.com/photo-1606904825846-647eb07f5be8?w=700&q=80"},
  {"sku":"NET-105","name":"PoE Network Switch","category":"Networking","stock":12,"reserved":3,"reorder":8,"location":"C-02-05","price":154,"specs":"8-port PoE+ • 120W budget","image":"https://images.unsplash.com/photo-1558494949-ef010cbdcc31?w=700&q=80"},
  {"sku":"TAB-101","name":"ProTab 11","category":"Tablets","stock":32,"reserved":9,"reorder":18,"location":"C-03-01","price":512,"specs":"11-inch • 8GB RAM • 256GB • Wi-Fi 6","image":"https://images.unsplash.com/photo-1544244015-0df4b3ffc6b0?w=700&q=80"},
  {"sku":"TAB-102","name":"ProTab Mini 8","category":"Tablets","stock":61,"reserved":17,"reorder":34,"location":"C-03-02","price":525,"specs":"8.3-inch • 6GB RAM • 128GB • 5G","image":"https://images.unsplash.com/photo-1561154464-82e9adf32764?w=700&q=80"},
  {"sku":"TAB-103","name":"Rugged Warehouse Tablet","category":"Tablets","stock":7,"reserved":2,"reorder":8,"location":"C-03-03","price":538,"specs":"10-inch • IP68 • Barcode support","image":"https://images.unsplash.com/photo-1585790050230-5dd28404ccb9?w=700&q=80"},
  {"sku":"TAB-104","name":"NoteTab 10","category":"Tablets","stock":15,"reserved":4,"reorder":8,"location":"C-03-04","price":551,"specs":"10-inch • 8GB RAM • 256GB • Stylus","image":"https://images.unsplash.com/photo-1544244015-0df4b3ffc6b0?w=700&q=80"},
  {"sku":"TAB-105","name":"FieldTab 12","category":"Tablets","stock":34,"reserved":10,"reorder":19,"location":"C-03-05","price":564,"specs":"12-inch • 12GB RAM • 512GB • 5G","image":"https://images.unsplash.com/photo-1561154464-82e9adf32764?w=700&q=80"},
  {"sku":"PHN-101","name":"Nova Phone X","category":"Smartphones","stock":24,"reserved":7,"reorder":13,"location":"C-04-01","price":712,"specs":"6.5-inch OLED • 256GB • 5G","image":"https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?w=700&q=80"},
  {"sku":"PHN-102","name":"Nova Phone Lite","category":"Smartphones","stock":57,"reserved":16,"reorder":31,"location":"C-04-02","price":725,"specs":"6.4-inch OLED • 128GB • 5G","image":"https://images.unsplash.com/photo-1598327105666-5b89351aff97?w=700&q=80"},
  {"sku":"PHN-103","name":"Rugged Field Phone","category":"Smartphones","stock":184,"reserved":52,"reorder":101,"location":"C-04-03","price":738,"specs":"6.6-inch • IP68 • 6000mAh • 5G","image":"https://images.unsplash.com/photo-1533228100845-08145b01de14?w=700&q=80"},
  {"sku":"PHN-104","name":"Fold Phone Flex","category":"Smartphones","stock":73,"reserved":20,"reorder":40,"location":"C-04-04","price":751,"specs":"7.6-inch foldable • 512GB • 5G","image":"https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?w=700&q=80"},
  {"sku":"PHN-105","name":"Pro Phone Max","category":"Smartphones","stock":91,"reserved":25,"reorder":50,"location":"C-04-05","price":764,"specs":"6.7-inch OLED • 512GB • 5G","image":"https://images.unsplash.com/photo-1598327105666-5b89351aff97?w=700&q=80"},
  {"sku":"ACC-101","name":"USB-C Hub 7-in-1","category":"Accessories","stock":18,"reserved":5,"reorder":10,"location":"D-01-01","price":62,"specs":"HDMI • USB 3.0 • SD • 100W PD","image":"https://images.unsplash.com/photo-1625842268584-8f3296236761?w=700&q=80"},
  {"sku":"ACC-102","name":"65W GaN Charger","category":"Accessories","stock":14,"reserved":4,"reorder":8,"location":"D-01-02","price":75,"specs":"65W • GaN • 2× USB-C + USB-A","image":"https://images.unsplash.com/photo-1583863788434-e58a36330cf0?w=700&q=80"},
  {"sku":"ACC-103","name":"100W USB-C Cable","category":"Accessories","stock":83,"reserved":23,"reorder":46,"location":"D-01-03","price":88,"specs":"2m • 100W • Braided","image":"https://images.unsplash.com/photo-1587033411391-5d9e51cce126?w=700&q=80"},
  {"sku":"ACC-104","name":"Laptop Stand Aluminum","category":"Accessories","stock":36,"reserved":10,"reorder":20,"location":"D-01-04","price":101,"specs":"Adjustable • Aluminum • Foldable","image":"https://images.unsplash.com/photo-1625842268584-8f3296236761?w=700&q=80"},
  {"sku":"ACC-105","name":"Wireless Charging Pad","category":"Accessories","stock":12,"reserved":3,"reorder":8,"location":"D-01-05","price":114,"specs":"15W • Qi2 compatible • USB-C","image":"https://images.unsplash.com/photo-1583863788434-e58a36330cf0?w=700&q=80"},
  {"sku":"OFF-101","name":"Ergonomic Office Chair","category":"Office","stock":64,"reserved":18,"reorder":35,"location":"D-02-01","price":142,"specs":"Mesh back • Adjustable lumbar • 4D arms","image":"https://images.unsplash.com/photo-1505843490701-5be5d9bdb7b8?w=700&q=80"},
  {"sku":"OFF-102","name":"Standing Desk 120","category":"Office","stock":112,"reserved":31,"reorder":62,"location":"D-02-02","price":155,"specs":"120cm • Electric height • Memory presets","image":"https://images.unsplash.com/photo-1518455027359-f3f8164ba6b7?w=700&q=80"},
  {"sku":"OFF-103","name":"Desk Lamp Pro","category":"Office","stock":17,"reserved":5,"reorder":9,"location":"D-02-03","price":168,"specs":"LED • Dimmable • USB-C • 3 modes","image":"https://images.unsplash.com/photo-1507473885765-e6ed057f782c?w=700&q=80"},
  {"sku":"OFF-104","name":"Monitor Arm Single","category":"Office","stock":83,"reserved":23,"reorder":46,"location":"D-02-04","price":181,"specs":"VESA • Gas spring • 32-inch support","image":"https://images.unsplash.com/photo-1505843490701-5be5d9bdb7b8?w=700&q=80"},
  {"sku":"OFF-105","name":"Cable Management Tray","category":"Office","stock":42,"reserved":12,"reorder":23,"location":"D-02-05","price":194,"specs":"Under-desk • Steel • 60cm","image":"https://images.unsplash.com/photo-1518455027359-f3f8164ba6b7?w=700&q=80"},
  {"sku":"WH-101","name":"Handheld Barcode Scanner","category":"Warehouse","stock":11,"reserved":3,"reorder":8,"location":"E-01-01","price":262,"specs":"1D/2D • USB • 100 scans/sec","image":"https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=700&q=80"},
  {"sku":"WH-102","name":"Rugged Handheld Terminal","category":"Warehouse","stock":72,"reserved":20,"reorder":40,"location":"E-01-02","price":275,"specs":"Android • IP67 • Barcode scanner","image":"https://images.unsplash.com/photo-1612198188060-c7c2a3b66eae?w=700&q=80"},
  {"sku":"WH-103","name":"Thermal Label Printer","category":"Warehouse","stock":6,"reserved":2,"reorder":8,"location":"E-01-03","price":288,"specs":"203 DPI • 4-inch • USB/Ethernet","image":"https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?w=700&q=80"},
  {"sku":"WH-104","name":"RFID Reader","category":"Warehouse","stock":77,"reserved":22,"reorder":42,"location":"E-01-04","price":301,"specs":"UHF RFID • 30m range","image":"https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=700&q=80"},
  {"sku":"WH-105","name":"RFID Adhesive Tags","category":"Warehouse","stock":7,"reserved":2,"reorder":8,"location":"E-01-05","price":314,"specs":"UHF • Adhesive • 96-bit EPC","image":"https://images.unsplash.com/photo-1612198188060-c7c2a3b66eae?w=700&q=80"},
  {"sku":"PK-101","name":"Shipping Boxes Small","category":"Packaging","stock":88,"reserved":25,"reorder":48,"location":"E-02-01","price":18,"specs":"25×18×12 cm • 3-ply corrugated","image":"https://images.unsplash.com/photo-1607166452427-7e4479e7a9e0?w=700&q=80"},
  {"sku":"PK-102","name":"Shipping Boxes Medium","category":"Packaging","stock":25,"reserved":7,"reorder":14,"location":"E-02-02","price":31,"specs":"30×20×15 cm • 5-ply corrugated","image":"https://images.unsplash.com/photo-1605733160314-4fc7dac4bb16?w=700&q=80"},
  {"sku":"PK-103","name":"Shipping Boxes Large","category":"Packaging","stock":53,"reserved":15,"reorder":29,"location":"E-02-03","price":44,"specs":"45×35×30 cm • 5-ply corrugated","image":"https://images.unsplash.com/photo-1607166452427-7e4479e7a9e0?w=700&q=80"},
  {"sku":"PK-104","name":"Bubble Wrap Roll","category":"Packaging","stock":22,"reserved":6,"reorder":12,"location":"E-02-04","price":57,"specs":"50m • 1m width • Air-cell protection","image":"https://images.unsplash.com/photo-1605733160314-4fc7dac4bb16?w=700&q=80"},
  {"sku":"PK-105","name":"Packing Tape 48mm","category":"Packaging","stock":22,"reserved":6,"reorder":12,"location":"E-02-05","price":70,"specs":"48mm × 100m • Acrylic adhesive","image":"https://images.unsplash.com/photo-1607166452427-7e4479e7a9e0?w=700&q=80"},
  {"sku":"SA-101","name":"Safety Gloves Large","category":"Safety","stock":44,"reserved":12,"reorder":24,"location":"E-03-01","price":27,"specs":"Nitrile • Cut resistant • Size L","image":"https://images.unsplash.com/photo-1584634731339-252c581abfc5?w=700&q=80"},
  {"sku":"SA-102","name":"Reflective Safety Vest XL","category":"Safety","stock":6,"reserved":2,"reorder":8,"location":"E-03-02","price":40,"specs":"High visibility • Reflective • XL","image":"https://images.unsplash.com/photo-1581092160607-ee22621dd758?w=700&q=80"},
  {"sku":"SA-103","name":"Safety Glasses Clear","category":"Safety","stock":81,"reserved":23,"reorder":45,"location":"E-03-03","price":53,"specs":"Anti-fog • UV protection","image":"https://images.unsplash.com/photo-1517423440428-a5a00ad493e8?w=700&q=80"},
  {"sku":"SA-104","name":"Safety Helmet","category":"Safety","stock":41,"reserved":11,"reorder":23,"location":"E-03-04","price":66,"specs":"Adjustable • Impact resistant","image":"https://images.unsplash.com/photo-1584634731339-252c581abfc5?w=700&q=80"},
  {"sku":"SA-105","name":"Ear Protection","category":"Safety","stock":66,"reserved":18,"reorder":36,"location":"E-03-05","price":79,"specs":"NRR 25dB • Adjustable","image":"https://images.unsplash.com/photo-1581092160607-ee22621dd758?w=700&q=80"},
  {"sku":"PWR-101","name":"UPS 1000VA","category":"Power","stock":69,"reserved":19,"reorder":38,"location":"F-01-01","price":92,"specs":"1000VA/600W • AVR • LCD","image":"https://images.unsplash.com/photo-1621905251918-48416bd8575a?w=700&q=80"},
  {"sku":"PWR-102","name":"Power Strip 8-Port","category":"Power","stock":16,"reserved":4,"reorder":9,"location":"F-01-02","price":105,"specs":"8 outlets • Surge protection","image":"https://images.unsplash.com/photo-1558008258-3256797b43f3?w=700&q=80"},
  {"sku":"PWR-103","name":"Smart Plug 4-Pack","category":"Power","stock":6,"reserved":2,"reorder":8,"location":"F-01-03","price":118,"specs":"Wi-Fi • Energy monitoring • 10A","image":"https://images.unsplash.com/photo-1625842268584-8f3296236761?w=700&q=80"},
  {"sku":"PWR-104","name":"USB-C Power Bank 20K","category":"Power","stock":89,"reserved":25,"reorder":49,"location":"F-01-04","price":131,"specs":"20,000mAh • 65W USB-C","image":"https://images.unsplash.com/photo-1621905251918-48416bd8575a?w=700&q=80"},
  {"sku":"PWR-105","name":"Surge Protector 12-Port","category":"Power","stock":0,"reserved":0,"reorder":12,"location":"F-01-05","price":144,"specs":"12 outlets • 2880J surge protection","image":"https://images.unsplash.com/photo-1558008258-3256797b43f3?w=700&q=80"},
];

const seedOrders = [
  {id:"ORD-1001",priority:"High",customer:"TechStore Pvt. Ltd.",items:8,status:"Picking",eta:"Today, 2:00 PM"},
  {id:"ORD-1002",priority:"Medium",customer:"Gadget Hub",items:5,status:"Packing",eta:"Today, 4:30 PM"},
  {id:"ORD-1003",priority:"High",customer:"QuickMart",items:12,status:"Allocated",eta:"Tomorrow, 11:00 AM"},
  {id:"ORD-1004",priority:"Low",customer:"Retailers United",items:3,status:"Pending",eta:"Tomorrow, 3:00 PM"},
  {id:"ORD-1005",priority:"Medium",customer:"ElectroMax",items:7,status:"Inventory Check",eta:"Today, 6:00 PM"},
];

const exceptions = [
  {level:"Critical",title:"Wireless Mouse shortage",text:"ORD-1006 needs 10 units; only 7 are available."},
  {level:"Warning",title:"Picking Zone B bottleneck",text:"Average processing time is 18 minutes vs 12 minute target."},
  {level:"Warning",title:"12 SKUs need reorder",text:"Several products are projected to stock out within 3–5 days."},
];

const nav = [
 ["Dashboard",LayoutDashboard],["Inventory",Package],["Orders",ShoppingCart],
 ["AI Copilot",Sparkles],["Decision Engine",Bot],["Picking",ClipboardList],
 ["Packing",Box],["Quality Check",ShieldCheck],["Dispatch",Truck],
 ["Exceptions",AlertTriangle],["Analytics",BarChart3],["Reports",FileText],["Settings",Settings]
];

function App(){
  const [page,setPage]=useState("Dashboard");
  const [orders,setOrders]=useState(seedOrders);
  const [copilotOpen,setCopilotOpen]=useState(true);
  const [toast,setToast]=useState("");
  const [dark,setDark]=useState(false);

  const notify=(m)=>{setToast(m);setTimeout(()=>setToast(""),2500)};
  const advance=(id)=>{
    const flow=["Pending","Inventory Check","Allocated","Picking","Packing","Quality Check","Ready","Dispatched"];
    setOrders(xs=>xs.map(o=>{
      if(o.id!==id)return o;
      const i=Math.max(0,flow.indexOf(o.status));
      return {...o,status:flow[Math.min(i+1,flow.length-1)]};
    }));
    notify(`${id} advanced to the next fulfillment stage.`);
  };

  return <div className={`app ${dark?"dark":""}`}>
    <aside className="sidebar">
      <div className="brand"><div className="brand-icon"><Box size={21}/></div><div><b>Warehouse<span>IQ</span></b><small>AI Operations Platform</small></div></div>
      <div className="menu-label">OPERATIONS</div>
      <nav>{nav.map(([n,I])=><button key={n} className={`nav ${page===n?"active":""}`} onClick={()=>setPage(n)}>
        <I size={17}/><span>{n}</span>{n==="AI Copilot"&&<em>AI</em>}{n==="Exceptions"&&<i>3</i>}
      </button>)}</nav>
      <div className="sidebar-ai"><Sparkles size={16}/><div><b>AI Monitoring</b><small>Active • analyzing warehouse</small></div></div>
      <div className="profile"><div className="avatar">A</div><div><b>Arjun Patel</b><small>Warehouse Manager</small></div></div>
    </aside>

    <main className="main">
      <header className="topbar">
        <div><h1>{page}</h1><p>{page==="Dashboard"?"AI-powered warehouse command center":"Warehouse intelligence and operations"}</p></div>
        <div className="top-actions"><div className="search"><Search size={16}/><input placeholder="Ask AI or search warehouse..."/></div><button className="round" onClick={()=>notify("3 AI alerts need your attention.")}><Bell size={18}/><i>3</i></button><button className="round" onClick={()=>setDark(!dark)}><Moon size={18}/></button></div>
      </header>

      {page==="Dashboard"&&<Dashboard orders={orders} onAdvance={advance} onNotify={notify} onCopilot={()=>setCopilotOpen(true)}/>}
      {page==="Inventory"&&<InventoryPage onNotify={notify}/>}
      {page==="Orders"&&<OrdersPage orders={orders} onAdvance={advance} onNotify={notify}/>}
      {page==="AI Copilot"&&<CopilotPage onNotify={notify}/>}
      {page==="Decision Engine"&&<DecisionPage onNotify={notify}/>}
      {["Picking","Packing","Quality Check","Dispatch"].includes(page)&&<WorkflowPage page={page} orders={orders} onAdvance={advance}/>}
      {page==="Exceptions"&&<ExceptionsPage onNotify={notify}/>}
      {page==="Analytics"&&<AnalyticsPage/>}
      {page==="Reports"&&<ReportsPage/>}
      {page==="Settings"&&<SettingsPage/>}

      {copilotOpen&&<CopilotDrawer onClose={()=>setCopilotOpen(false)} onNotify={notify}/>}
      {!copilotOpen&&<button className="floating-ai" onClick={()=>setCopilotOpen(true)}><Sparkles size={19}/><span>Ask Warehouse AI</span></button>}
      {toast&&<div className="toast"><CheckCircle2 size={17}/>{toast}</div>}
    </main>
  </div>
}

function Dashboard({orders,onAdvance,onNotify,onCopilot}){
 return <div className="content">
  <div className="hero"><div><span>AI COMMAND CENTER</span><h2>Good morning, Arjun.</h2><p>WarehouseIQ analyzed today's activity and found <b>3 decisions</b> that need attention.</p></div><button className="primary" onClick={onCopilot}><Sparkles size={16}/>Ask AI Manager</button></div>
  <div className="ai-brief"><div className="brief-icon"><Sparkles/></div><div><small>AI DAILY BRIEF</small><h3>Fulfillment is healthy, but inventory risk is rising.</h3><p>1 urgent shortage, 1 picking bottleneck and 12 SKUs need replenishment.</p></div><button onClick={onCopilot}>Explain <ArrowRight size={15}/></button></div>
  <div className="kpis">
   <Kpi title="Total Orders" value="128" change="12% vs yesterday" icon={<ShoppingCart/>}/><Kpi title="Orders in Progress" value="42" change="8% vs yesterday" icon={<Box/>}/><Kpi title="Shipped Today" value="86" change="15% vs yesterday" icon={<Truck/>}/><Kpi title="AI Exceptions" value="3" change="Requires decision" warn icon={<AlertTriangle/>}/><Kpi title="Low Stock Items" value="12" change="Reorder recommended" warn icon={<Package/>}/>
  </div>
  <div className="grid">
   <section className="panel"><Title title="AI Recommended Actions" sub="Prioritized by impact and urgency"/><AiAction title="Resolve Wireless Mouse shortage" detail="Allocate 7 units to ORD-1006 and trigger replenishment." score="94" button="Apply" onClick={()=>onNotify("AI allocation applied: 7 units reserved for ORD-1006.")}/><AiAction title="Fix Picking Zone B bottleneck" detail="Move 2 pickers from Zone A to Zone B." score="88" button="Optimize" onClick={()=>onNotify("Picker redistribution recommendation applied.")}/><AiAction title="Reorder 12 low-stock SKUs" detail="Recommended purchase quantity: 50 Wireless Mouse units." score="82" button="Reorder" onClick={()=>onNotify("Purchase request created for recommended replenishment.")}/></section>
   <section className="panel"><Title title="Fulfillment Intelligence" sub="Live operational signal"/><Flow/><div className="signal"><div className="signal-dot"></div><div><b>AI confidence 94%</b><p>Decision engine has enough data to recommend action.</p></div></div></section>
  </div>
  <div className="grid lower"><section className="panel"><Title title="Recent Orders" action="View all" onClick={()=>onNotify("Open Orders from the sidebar.")}/><OrderTable orders={orders} onAdvance={onAdvance}/></section><section className="panel"><Title title="What AI is watching" sub="Continuous monitoring"/>{exceptions.map((x,i)=><div className="watch" key={i}><div className={x.level==="Critical"?"red-dot":"yellow-dot"}></div><div><b>{x.title}</b><p>{x.text}</p></div></div>)}</section></div>
 </div>
}
function Kpi({title,value,change,icon,warn}){return <div className="kpi"><div className={`kpi-icon ${warn?"warn":""}`}>{icon}</div><small>{title}</small><h2>{value}</h2><span className={warn?"bad":"good"}>{warn?"● ":"▲ "}{change}</span></div>}
function Title({title,sub,action,onClick}){return <div className="title"><div><h3>{title}</h3>{sub&&<p>{sub}</p>}</div>{action&&<button onClick={onClick}>{action}</button>}</div>}
function AiAction({title,detail,score,button,onClick}){return <div className="ai-action"><div className="spark"><Sparkles size={16}/></div><div className="ai-action-text"><b>{title}</b><p>{detail}</p></div><span>{score}%</span><button onClick={onClick}>{button}</button></div>}
function Flow(){return <div className="mini-flow">{["Created","Checked","Allocated","Picking","Packing","Shipped"].map((x,i)=><div key={x}><div className={i<4?"done":""}>{i<4?<CheckCircle2 size={15}/>:i+1}</div><span>{x}</span>{i<5&&<i/>}</div>)}</div>}
function OrderTable({orders,onAdvance}){return <div className="table-scroll"><table><thead><tr><th>ORDER</th><th>PRIORITY</th><th>CUSTOMER</th><th>STATUS</th><th>ACTION</th></tr></thead><tbody>{orders.slice(0,5).map(o=><tr key={o.id}><td className="blue">{o.id}</td><td><span className={`priority ${o.priority.toLowerCase()}`}>{o.priority}</span></td><td>{o.customer}</td><td><span className="status">{o.status}</span></td><td><button className="tiny" onClick={()=>onAdvance(o.id)}>Advance</button></td></tr>)}</tbody></table></div>}

function InventoryPage({onNotify}){
 const [query,setQuery]=useState(""); const [category,setCategory]=useState("All"); const [selected,setSelected]=useState(null);
 const categories=["All",...Array.from(new Set(inventory.map(x=>x.category)))];
 const filtered=inventory.filter(x=>(x.name+x.sku+x.category+x.location).toLowerCase().includes(query.toLowerCase())&&(category==="All"||x.category===category));
 const low=inventory.filter(x=>x.stock<x.reorder&&x.stock>0).length, out=inventory.filter(x=>x.stock===0).length;
 return <div className="content"><div className="hero"><div><span>AI INVENTORY INTELLIGENCE</span><h2>Inventory Command Center</h2><p>{inventory.length} SKUs • {categories.length-1} categories • AI-monitored stock health</p></div><button className="primary" onClick={()=>onNotify(`AI scan complete: ${low} low-stock items and ${out} out-of-stock item need attention.`)}><Sparkles size={16}/>Run AI Stock Scan</button></div>
 <div className="inventory-stats"><div><b>{inventory.length}</b><span>Total SKUs</span></div><div><b>{inventory.reduce((a,x)=>a+x.stock,0).toLocaleString()}</b><span>Units on Hand</span></div><div className="warn-stat"><b>{low}</b><span>Low Stock</span></div><div className="danger-stat"><b>{out}</b><span>Out of Stock</span></div></div>
 <section className="panel"><div className="inventory-toolbar"><div className="inv-search"><Search size={15}/><input value={query} onChange={e=>setQuery(e.target.value)} placeholder="Search product, SKU, category, location..."/></div><div className="chips">{categories.map(c=><button className={category===c?"chip active":"chip"} onClick={()=>setCategory(c)} key={c}>{c}</button>)}</div></div>
 <div className="product-grid">{filtered.map(x=><ProductCard key={x.sku} product={x} onClick={()=>setSelected(x)}/>)}</div>{!filtered.length&&<div className="empty">No products match your search.</div>}</section>
 {selected&&<ProductModal product={selected} onClose={()=>setSelected(null)} onNotify={onNotify}/>}</div>
}
function ProductCard({product,onClick}){const risk=product.stock===0?"critical":product.stock<product.reorder?"high":"healthy";return <article className="product-card" onClick={onClick}><div className="product-img"><img src={product.image} alt={product.name} loading="lazy"/><span className={`risk ${risk}`}>{risk==="critical"?"Out of Stock":risk==="high"?"Low Stock":"Healthy"}</span></div><div className="product-body"><div className="product-meta"><span>{product.category}</span><small>{product.sku}</small></div><h3>{product.name}</h3><p>{product.specs}</p><div className="product-foot"><div><b>{product.stock}</b><small>available</small></div><div><b>{product.reserved}</b><small>reserved</small></div><div><b>{product.location}</b><small>location</small></div></div></div></article>}
function ProductModal({product,onClose,onNotify}){const risk=product.stock===0?"critical":product.stock<product.reorder?"high":"healthy";const rec=product.stock===0?`Urgent replenishment: stock is zero. Recommend ordering ${Math.max(product.reorder*3,30)} units.`:product.stock<product.reorder?`Reorder recommended: ${product.stock} available is below the ${product.reorder}-unit threshold.`:`Stock is healthy. No immediate replenishment required.`;return <div className="modal-bg"><div className="product-modal"><button className="close" onClick={onClose}><X/></button><div className="modal-product-image"><img src={product.image} alt={product.name}/></div><div className="modal-product-info"><span>{product.category} • {product.sku}</span><h2>{product.name}</h2><p>{product.specs}</p><div className="spec-grid"><div><small>Available</small><b>{product.stock}</b></div><div><small>Reserved</small><b>{product.reserved}</b></div><div><small>Reorder point</small><b>{product.reorder}</b></div><div><small>Location</small><b>{product.location}</b></div><div><small>Unit price</small><b>${product.price}</b></div><div><small>AI status</small><b className={risk}>{risk==="critical"?"Critical":risk==="high"?"Low":"Healthy"}</b></div></div><div className="modal-ai"><Sparkles size={17}/><div><small>AI INVENTORY RECOMMENDATION</small><p>{rec}</p></div></div><div className="actions"><button className="primary" onClick={()=>{onNotify(`AI action created for ${product.name}.`);onClose()}}><Sparkles size={15}/>Create AI Action</button><button className="secondary" onClick={onClose}>Close</button></div></div></div></div>}
function OrdersPage({orders,onAdvance,onNotify}){return <div className="content"><Hero eyebrow="AI ORDER MANAGEMENT" title="Orders" sub="AI-ranked order queue with explainable priorities."/><section className="panel"><Title title="Priority queue" sub="Orders are ranked by urgency, SLA, customer priority and inventory availability."/><OrderTable orders={orders} onAdvance={onAdvance}/></section></div>}
function DecisionPage({onNotify}){const [applied,setApplied]=useState(false);return <div className="content"><Hero eyebrow="DECISION INTELLIGENCE" title="AI Decision Engine" sub="WarehouseIQ reasons over inventory, urgency and operational constraints."/><div className="grid decision"><section className="panel"><div className="decision-head"><div className="ai-circle"><Sparkles/></div><div><small>AI DETECTED CONFLICT</small><h2>ORD-1006 • Wireless Mouse</h2><p>Urgent order requires 10 units. Available inventory: 7.</p></div><span className="priority high">Urgent</span></div><div className="versus"><div><small>REQUIRED</small><b>10</b><span>units</span></div><strong>VS</strong><div><small>AVAILABLE</small><b className="red">7</b><span>units</span></div></div><div className="recommend"><Sparkles/><div><small>AI RECOMMENDATION</small><h3>Allocate 7 units to ORD-1006</h3><p>Protect the urgent order, mark 3 units as shortage, and create a replenishment action. Lower-priority demand should wait.</p></div></div><div className="actions"><button className="primary" onClick={()=>{setApplied(true);onNotify("AI decision applied successfully.")}}><Zap size={16}/>{applied?"Applied":"Apply AI Decision"}</button><button className="secondary">Override</button></div></section><section className="panel"><Title title="Why this decision?" sub="Explainable AI factors"/>{[["Urgency","40%","High"],["Customer SLA","25%","High"],["Order Age","20%","Medium"],["Inventory Scarcity","15%","Critical"]].map(x=><div className="factor" key={x[0]}><div><b>{x[0]}</b><small>{x[1]} weight</small></div><span>{x[2]}</span></div>)}<div className="score"><small>AI PRIORITY SCORE</small><b>94 / 100</b></div></section></div></div>}
function WorkflowPage({page,orders,onAdvance}){const o=orders[1];const stages=["Created","Checked","Allocated","Picking","Packing","Quality Check","Dispatched"];return <div className="content"><Hero eyebrow="AI FULFILLMENT" title={page} sub="AI-guided execution of the order fulfillment lifecycle."/><section className="panel"><div className="workflow-head"><div><small>ACTIVE ORDER</small><h2>{o.id}</h2><p>{o.customer} • {o.items} items</p></div><span className={`priority ${o.priority.toLowerCase()}`}>{o.priority}</span></div><div className="timeline">{stages.map((s,i)=><div className={i<=3?"done":""} key={s}><div>{i<=3?<CheckCircle2 size={16}/>:i+1}</div><span>{s}</span>{i<6&&<i/>}</div>)}</div><button className="primary" onClick={()=>onAdvance(o.id)}><CheckCircle2 size={16}/>Complete Current Step</button></section></div>}
function ExceptionsPage({onNotify}){return <div className="content"><Hero eyebrow="AI EXCEPTION CENTER" title="Exceptions" sub="AI converts warehouse exceptions into resolution plans."/><div className="cards">{exceptions.map(x=><section className="panel" key={x.title}><div className="exception-row"><div className={x.level==="Critical"?"ex critical":"ex warning"}><AlertTriangle size={18}/></div><div><small>{x.level}</small><h3>{x.title}</h3><p>{x.text}</p></div></div><div className="resolution"><Sparkles size={15}/><span><b>AI resolution:</b> investigate, recommend replacement/allocation, then update order state.</span></div><button className="secondary" onClick={()=>onNotify(`AI resolution workflow started for ${x.title}.`)}>Start AI Resolution <ArrowRight size={15}/></button></section>)}</div></div>}
function AnalyticsPage(){return <div className="content"><Hero eyebrow="AI ANALYTICS" title="Operational Intelligence" sub="AI highlights trends and bottlenecks instead of just charting them."/><div className="kpis four"><Kpi title="Fulfillment Rate" value="91.4%" change="5.2% improvement" icon={<Truck/>}/><Kpi title="Avg Processing" value="18m" change="8.4% faster" icon={<ClipboardList/>}/><Kpi title="Picking Efficiency" value="87%" change="6.1% improvement" icon={<Zap/>}/><Kpi title="Exception Rate" value="4.7%" change="2.3% lower" icon={<AlertTriangle/>}/></div><div className="grid"><section className="panel chart"><Title title="Warehouse performance" sub="Last 7 days"/><div className="chart-bars">{[72,78,74,84,81,89,94].map((v,i)=><div key={i}><b>{v}%</b><span style={{height:v*1.8}}></span><small>{["M","T","W","T","F","S","S"][i]}</small></div>)}</div></section><section className="panel insight"><Sparkles/><small>AI INSIGHT</small><h2>Picking Zone B is the bottleneck.</h2><p>Its average processing time is 18 minutes, 50% above target. Moving 2 pickers from Zone A is the recommended intervention.</p></section></div></div>}
function ReportsPage(){return <div className="content"><Hero eyebrow="AI REPORTING" title="Reports" sub="Generate operational summaries with AI explanations."/><div className="cards">{["Daily AI Brief","Inventory Risk Report","Exception Root-Cause Summary","Dispatch Performance"].map(x=><section className="panel report" key={x}><FileText/><h3>{x}</h3><p>Ready to generate from current warehouse state.</p><button className="secondary">Generate <ArrowRight size={15}/></button></section>)}</div></div>}
function SettingsPage(){return <div className="content"><Hero eyebrow="SYSTEM" title="Settings" sub="WarehouseIQ AI configuration."/><section className="panel"><div className="setting"><div><h3>AI Decision Mode</h3><p>AI recommends actions; humans approve operational changes.</p></div><b className="enabled">ENABLED</b></div><div className="setting"><div><h3>Explainable Recommendations</h3><p>Show factors and reasoning behind each recommendation.</p></div><b className="enabled">ON</b></div></section></div>}
function Hero({eyebrow,title,sub}){return <div className="hero simple"><div><span>{eyebrow}</span><h2>{title}</h2><p>{sub}</p></div></div>}

function CopilotPage({onNotify}){return <div className="content"><Hero eyebrow="WAREHOUSE AI" title="AI Copilot" sub="Ask questions about inventory, orders, bottlenecks and decisions."/><section className="panel big-chat"><CopilotInner onNotify={onNotify}/></section></div>}

function CopilotDrawer({onClose,onNotify}){
 return <aside className="copilot"><div className="copilot-head"><div className="ai-brand"><div><Sparkles size={17}/></div><span><b>Warehouse AI</b><small>Decision Copilot</small></span></div><button onClick={onClose}><X size={18}/></button></div><CopilotInner onNotify={onNotify}/></aside>
}

function CopilotInner({onNotify}){
 const [messages,setMessages]=useState([{role:"ai",text:"Hi Arjun. I’m monitoring your warehouse. Ask me what to prioritize, where the bottlenecks are, or what inventory to reorder."}]);
 const [input,setInput]=useState("");
 const [loading,setLoading]=useState(false);
 const quick=["What should I do first?","Why is ORD-1006 urgent?","Which products need reorder?","Find bottlenecks"];
 const send=async(text=input)=>{
   const q=text.trim(); if(!q||loading)return;
   setMessages(m=>[...m,{role:"user",text:q}]);setInput("");setLoading(true);
   try{
     const r=await fetch("/api/ai",{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({message:q,warehouse:{inventory,orders:seedOrders,exceptions}})});
     const data=await r.json();
     setMessages(m=>[...m,{role:"ai",text:data.answer||"I couldn't generate a recommendation."}]);
   }catch(e){
     const fallback=q.toLowerCase().includes("reorder")
       ?"Prioritize Wireless Mouse and External SSD. Wireless Mouse has 7 available against a reorder level of 20; External SSD is out of stock. I recommend a 50-unit mouse replenishment and immediate SSD replenishment."
       :q.toLowerCase().includes("bottleneck")
       ?"Picking Zone B is the current bottleneck: 18 minutes average versus a 12-minute target. Move 2 pickers from Zone A to Zone B."
       :"ORD-1006 should be first. It is urgent, needs 10 Wireless Mouse units, and only 7 are available. Allocate the 7 units, mark 3 as shortage, and trigger replenishment.";
     setMessages(m=>[...m,{role:"ai",text:fallback}]);
     onNotify("AI demo mode responded. Add OPENAI_API_KEY for live model responses.");
   }finally{setLoading(false)}
 };
 return <div className="chat-inner"><div className="quick">{quick.map(q=><button key={q} onClick={()=>send(q)}>{q}</button>)}</div><div className="messages">{messages.map((m,i)=><div className={`msg ${m.role}`} key={i}><div className="msg-icon">{m.role==="ai"?<Sparkles size={13}/>:<span>A</span>}</div><p>{m.text}</p></div>)}{loading&&<div className="msg ai"><div className="msg-icon"><Sparkles size={13}/></div><p className="typing">Analyzing warehouse state…</p></div>}</div><div className="chat-input"><input value={input} onChange={e=>setInput(e.target.value)} onKeyDown={e=>e.key==="Enter"&&send()} placeholder="Ask Warehouse AI…"/><button onClick={()=>send()}><Send size={16}/></button></div><small className="chat-note">AI recommendations are advisory. Warehouse actions require operator approval.</small></div>
}

export default App;
