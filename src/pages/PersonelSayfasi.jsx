import PersonelListesi from "../component/PersonelListesi.jsx";
import {useState} from "react";

function PersonelSayfasi({
  contextPersoneller,
  loading,
  personelSil,
  DuzenlemeBaslat,
  personelDurumDegistir
}){
    const [arama, setArama] = useState("");
    const [filtreDepartman, setFiltreDepartman] = useState("");
    const [filtreDurum, setFiltreDurum] = useState("");

    const filtrelenmisPersoneller = contextPersoneller.filter((personel) =>
    personel.adi.toLowerCase().includes(arama.toLowerCase()) && 
    (filtreDepartman === "" || personel.departman === filtreDepartman) &&
    (filtreDurum === "" ||  
    (filtreDurum === "aktif" && personel.aktif ) ||
    (filtreDurum === "pasif" && !personel.aktif))
  );
      return(
        <div>
          <h1>Personel Listesi</h1>
          <p>Personel bilgileri aşağıdaki tabloda</p>
          <div className="filters">
          <input type="text" placeholder="Personel Ara" value={arama} onChange={(e) => setArama(e.target.value)} />
          <select name="" id="" value={filtreDepartman} onChange={(e) => setFiltreDepartman(e.target.value)}>
            <option value="">Tüm Departmanlar</option>
            <option value="Yönetim">Yönetim</option>
            <option value="Pazarlama">Pazarlama</option>
            <option value="Muhasebe">Muhasebe</option>
            <option value="İnsan Kaynakları">İnsan Kaynakları</option>
            <option value="Yazılım">Yazılım</option> 
          </select>
          <select name="" id="" value={filtreDurum} onChange={(e) => setFiltreDurum(e.target.value)}>
            <option value="">Tüm Durumlar</option>
            <option value="aktif">Aktif</option>
            <option value="pasif">Pasif</option>
          </select>
          </div>
          <br></br>
          <br></br>
          {loading && <p>Yükleniyor...</p>}
          <PersonelListesi 
            personeller={filtrelenmisPersoneller} 
            personelSil={personelSil} 
            DuzenlemeBaslat={DuzenlemeBaslat} 
            personelDurumDegistir={personelDurumDegistir}/>
          
        </div>
      )
  }
export default PersonelSayfasi;