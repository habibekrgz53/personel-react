import Personel from "./Personel.jsx";

function PersonelListesi({
  personeller,
  personelSil,
  DuzenlemeBaslat,
  personelDurumDegistir
}) {
  return (
    <div className="table-container">
    <table>
      <thead>
        <tr>
          <th>Adı Soyadı</th>
          <th>Telefon</th>
          <th>Email</th>
          <th>Departman</th>
          <th>Sil</th>
          <th>Düzenle</th>
          <th>Durum</th>
          <th>Detay</th>
        </tr>
      </thead>
      <tbody>
      {personeller.map((personel) => (
        <Personel 
        key={personel.id} 
        personel={personel}  
        personelSil={personelSil} 
        DuzenlemeBaslat={DuzenlemeBaslat }
        personelDurumDegistir={personelDurumDegistir}/>
      ))}
      </tbody>
    </table>
    </div>
  )
}
export default PersonelListesi;