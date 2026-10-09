import PersonelFormu from "../component/PersonelFormu.jsx";

function PersonelEkle(props) {
  return (
    <div>
      <h1>Personel Ekle</h1>
      <PersonelFormu
        id={props.id}
        isim={props.isim}
        setisim={props.setisim}
        tel={props.tel}
        setTel={props.setTel}
        mail={props.mail}
        setMail={props.setMail}
        personelEkleme={props.personelEkleme}
        departman={props.departman}
        setDepartman={props.setDepartman}
        olusturulmaTarihi={props.olusturulmaTarihi}
        setOlusturulmaTarihi={props.setOlusturulmaTarihi}
      />
    </div>
  );
}

export default PersonelEkle;