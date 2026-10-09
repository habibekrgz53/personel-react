import { usePersoneller } from "../component/PersonelContext.jsx";
import { useParams } from "react-router-dom";

function PersonelDetay(){
    const { personeller: contextPersoneller } = usePersoneller();
    const {id}=useParams();
    const kisi=contextPersoneller.find((personel)=> personel.id===Number(id))
    if(!kisi){
      return <p>Personel bulunamadı.</p>
    }
    return(
      <div className="personel-detay">
        <div className="personel-detay-card">
          <h1>Personel Detay</h1>
          <p>Personel ID: {id}</p>
          <strong>{kisi.adi}</strong>
          <div>{kisi.tel}</div>
          <div>{kisi.email}</div>
          <div>{kisi.departman}</div>
          <div>{kisi.aktif ? "Aktif" : "Pasif"}</div>
        </div>
      </div>
    )
  }
  export default PersonelDetay;