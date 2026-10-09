import { createContext ,useState, useEffect, useContext} from "react";


export const PersonelContext = createContext(null);

export function usePersoneller(){
    const veri=useContext(PersonelContext)
    return veri
}

function PersonelProvider({ children }) {
    const [personeller, setPersoneller] = useState(() => {
  const kayitli = localStorage.getItem("personeller");

  if (kayitli) {
    return JSON.parse(kayitli);
  } else {
    return [];
  }
});
const[loading, setLoading]=useState(false)

useEffect(() => {
  localStorage.setItem("personeller", JSON.stringify(personeller))
  }, [personeller])

function personelDurumDegistir(id) {
  const yeniPersoneller = personeller.map((personel) => {
    if (personel.id === id) {
      return { ...personel, aktif: !personel.aktif };
    }
    return personel;
  });
  setPersoneller(yeniPersoneller);
}

async function personelSil(silinecekId) {   
  try {
    const cevap = await fetch(`https://jsonplaceholder.typicode.com/users/${silinecekId}`, {
      method: "DELETE"  
    })
    if (!cevap.ok) {
      alert("Personel silinemedi!");
      return;
    }
    setPersoneller(    
       personeller.filter((personel) => personel.id!==silinecekId)   ) 
}
  catch (error) {
    console.log(error);
    alert("Personel silinirken bir hata oluştu!");
  }}


async function personelDuzenle(id, isim, tel, mail, departman) {
    try {
     await fetch(`https://jsonplaceholder.typicode.com/users/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        id: id,
        name: isim,
        phone: tel,
        email: mail,
        departman: departman
      })
    });

    
    const yeniPersoneller = personeller.map((personel) => {

      if (personel.id === id) {
        return {
          id: personel.id,
          adi: isim,
          tel: tel,
          email: mail,
          departman: departman,
          aktif: personel.aktif
        };
      }
      return personel;
    });

    setPersoneller(yeniPersoneller);
  } 
    catch (error) {
    console.log(error);
    alert("Personel güncellenirken bir hata oluştu!");
  }}



async function veriGetir() {
  setLoading(true);

  try {
    const cevap = await fetch("https://jsonplaceholder.typicode.com/users");

    if (cevap.ok) {
      const sonuc = await cevap.json();

      const yeniPersoneller = sonuc.map((kisi) => ({
        id: kisi.id,
        adi: kisi.name,
        tel: kisi.phone,
        email: kisi.email,
        departman:"Belirtilmemiş",
        aktif: true
      }));

      setPersoneller(yeniPersoneller);
    } else {
      alert("Veri alınamadı!");
    }
  } catch (error) {
    console.log(error);
    alert("Veri alınamadı!");
  }
  finally {
    setLoading(false);
  }
}

async function personelEkle(yeniPersonel) {
  const tarih = new Date().toISOString();

  try {
    const cevap = await fetch(
      "https://jsonplaceholder.typicode.com/users",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(yeniPersonel)
      }
    );

    if (!cevap.ok) {
      alert("Personel eklenemedi!");
      return false;
    }

    setPersoneller((mevcutPersoneller) => {
      const yeniIdler = mevcutPersoneller.map(
        (personel) => Number(personel.id) || 0
      );
      const yeniId = Math.max(0, ...yeniIdler) + 1;

      return [
        ...mevcutPersoneller,
        {
          ...yeniPersonel,
          id: yeniId,
          aktif: true,
          olusturulmaTarihi: tarih
        }
      ];
    });

    return true;
  } catch (error) {
    console.log(error);
    alert("Personel eklenirken bir hata oluştu!");
    return false;
  }
}

return (
    <PersonelContext.Provider value={{personeller, loading, personelSil, personelDuzenle, personelEkle, veriGetir, personelDurumDegistir}}>
      {children}
    </PersonelContext.Provider>
  );
}

export default PersonelProvider;