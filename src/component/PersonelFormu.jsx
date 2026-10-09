function PersonelFormu({id, isim, setisim,tel,setTel,mail,setMail,personelEkleme, departman, setDepartman}) {
  
  return(
    <form onSubmit={(e) => 
      {e.preventDefault() //sayfanın yenilenmesini önler
      personelEkleme(departman)
      }
    }> 
     <br></br>
      <label>Adı Soyadı:</label>
      <input type="text" 
      value={isim}
      onChange={(e) => setisim(e.target.value)} /><br></br>
      
      <label>Telefon No:</label>
      <input type="tel" 
      value={tel} 
      onChange={(e) => setTel(e.target.value)} /><br></br>
      
      <label>E-mail:</label>
      <input type="email"
      value={mail}  
      onChange={(e) => setMail(e.target.value)} /><br></br>

      <label>Departman: </label>
      <select name="" id="" value={departman} onChange={(e) => setDepartman(e.target.value)}>
        <option value="">Departman Seçin</option>
        <option value="Yönetim">Yönetim</option>
        <option value="Pazarlama">Pazarlama</option>
        <option value="Muhasebe">Muhasebe</option>
        <option value="İnsan Kaynakları">İnsan Kaynakları</option>
        <option value="Yazılım">Yazılım</option> 
      </select><br />

      <button >{id==="" ?" Personel Ekle" : "Güncelle"}</button><br></br> <br></br>
      
    </form>
)
}
export default PersonelFormu;