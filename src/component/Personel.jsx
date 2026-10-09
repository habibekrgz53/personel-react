import { Link } from "react-router-dom";

function Personel({personel, personelSil, DuzenlemeBaslat , personelDurumDegistir}) {
  return(    
       <tr>
       <td><strong>{personel.adi}</strong></td>
       <td>{personel.tel}</td>
       <td>{personel.email}</td>
       <td>{personel.departman}</td>
       <td>
         <button className="sil-btn" onClick={() => personelSil(personel.id)}>Sil </button> 
         </td> 
         <td>
         <button className="duzenle-btn" onClick={()=> DuzenlemeBaslat(personel.id)}>Düzenle</button>
       </td>
       <td>
         <button className="durum-btn" onClick={() => personelDurumDegistir(personel.id)}>{personel.aktif ? "Pasif Yap" : "Aktif Yap"}</button>
       </td>
       <td>
         <Link className="detail-link" to={`/personeller/${personel.id}`}>Personel Detayı </Link>
       </td>
     </tr>   
   )
}
export default Personel;