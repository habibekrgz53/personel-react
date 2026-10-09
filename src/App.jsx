import { useState , useEffect} from "react";
import { Routes, Route , Link, useNavigate} from "react-router-dom";
import { usePersoneller } from "./component/PersonelContext.jsx";
import PersonelSayfasi from "./pages/PersonelSayfasi.jsx";
import PersonelDetay from "./pages/PersonelDetay.jsx";
import Anasayfa from "./pages/Anasayfa.jsx";
import PersonelEkle from "./pages/PersonelEkle.jsx";

function App(){
  
  function DuzenlemeBaslat(id) {
    const personel = contextPersoneller.find((personel) => personel.id === id);

    navigate("/personeller-ekle");
    setId(id);
    setisim(personel.adi);
    setTel(personel.tel);
    setMail(personel.email);
    setDepartman(personel.departman || "Belirtilmemiş");
  }

      const[isim, setisim]=useState("")
      const[tel, setTel]=useState("")
      const[mail, setMail]=useState("")
      const [id, setId] = useState("")
      const navigate=useNavigate();
      const [departman, setDepartman]=useState("");

  async function personelEkleme(departman) {
      const telefonRegex = /^05[0-9]{9}$/;
      if(id===""){
        let eklemeBasarili = false;
        if(isim=="" || tel=="" || mail==""){
          alert("Lütfen tüm alanları doldurun!")
        }
        else if(!telefonRegex.test(tel)){
        alert("Telefon numarası 05 ile başlamalı ve 11 haneli olmalıdır!")
        }
        
        else{
        const idler=contextPersoneller.map((personel)=> personel.id)
        const enBuyukId=Math.max(...idler)

        eklemeBasarili = await personelEkle({
          id: enBuyukId + 1,
          adi: isim,
          tel: tel,
          email: mail,
          departman: departman,
          aktif: true
        });
        }
      if(eklemeBasarili){
        setisim("")
        setTel("")
        setMail("")
        navigate("/personeller")
    }
      
  }
  else {
        if(isim=="" || tel=="" || mail==""){
          alert("Lütfen tüm alanları doldurun!")
        }
        else if(!telefonRegex.test(tel)){
          alert("Telefon numarası 05 ile başlamalı ve 11 haneli olmalıdır!")
        }
        else{
        personelDuzenle(id, isim, tel, mail,departman);

          setId("");
          setisim("");
          setTel("");
          setMail("");
          setDepartman("");
          navigate("/personeller")}
        
      }
  }
    
    useEffect(() => {

    const kayitli = localStorage.getItem("personeller")

    if (!kayitli) {
      veriGetir()
    }

  }, [])

  const {
    personeller: contextPersoneller,
    loading,
    personelSil,
    personelDuzenle,
    personelEkle,
    veriGetir,
    personelDurumDegistir
    } = usePersoneller();


    
    return(
    
    <div className="app">
      <nav className="navbar">
      <h1>Personel Sistemi</h1>
      <div className="nav-links">
      <Link to="/">Anasayfa</Link> 
      <Link to="/personeller">Personeller</Link> 
      <Link to="/personeller-ekle">Personel Ekle</Link> 
      </div>
      </nav>

      <main className="main-content">
      <Routes>
      <Route path="/" element={<Anasayfa />} />
      <Route path="/personeller"
       element={
       <PersonelSayfasi 
        contextPersoneller={contextPersoneller} 
        personelSil={personelSil}
        DuzenlemeBaslat={DuzenlemeBaslat}
        personelDurumDegistir={personelDurumDegistir}
        loading={loading}
      />} />

      <Route path="/personeller/:id" element={<PersonelDetay />}/>
      <Route path="/personeller-ekle"
      element={
      <PersonelEkle
        id={id}
        isim={isim}
        setisim={setisim}
        tel={tel}
        setTel={setTel}
        mail={mail}
        setMail={setMail}
        personelEkleme={personelEkleme}
        departman={departman}
        setDepartman={setDepartman}
    />
  }
/>
      </Routes>  
      </main>
    </div>
  )
}
export default App