
import { usePersoneller } from "../component/PersonelContext";
import { Link } from "react-router-dom";

function Anasayfa() {
  const { personeller: contextPersoneller } = usePersoneller();

  const sonEklenenler = [...contextPersoneller]
    .filter((personel) => personel.olusturulmaTarihi)
    .sort(
      (a, b) =>
        new Date(b.olusturulmaTarihi) -
        new Date(a.olusturulmaTarihi)
    )
    .slice(0, 3);

  const aktifSayisi = contextPersoneller.filter(
    (personel) => personel.aktif
  ).length;

  const pasifSayisi = contextPersoneller.filter(
    (personel) => !personel.aktif
  ).length;

  const departmanlar = Array.from(
    new Set(
      contextPersoneller.map(
        (personel) => personel.departman || "Belirtilmemiş"
      )
    )
  );

  return (
    <div className="anasayfa">
      <section className="welcome-section">
        <span className="welcome-label">PERSONEL YÖNETİMİ</span>
        <h2>Personel Yönetim Paneli'ne Hoş Geldiniz!</h2>
        <p>
          Personellerinizi ve departmanlarınızı tek bir yerden yönetin.
        </p>

        <div className="welcome-actions">
          <Link className="personel-listesi-link" to="/personeller">
            <span>Personel Listesi</span>
            <span aria-hidden="true"> →</span>
          </Link>

          <Link className="personel-ekle-link" to="/personeller-ekle">
            <span aria-hidden="true">＋</span>
            <span>Yeni Personel Ekle</span>
          </Link>
        </div>
      </section>

      <section className="dashboard-section">
        <div className="section-heading">
          <div>
            <h2>Genel Bakış</h2>
            <p>Personel durumunuzun özeti</p>
          </div>
        </div>

        <div className="dashboard-cards">
          <div className="stat-card stat-total">
            <div className="stat-card-top">
              <span className="stat-icon">👥</span>
              <span className="stat-caption">Tüm personeller</span>
            </div>
            <strong>{contextPersoneller.length}</strong>
            <p>Kayıtlı personel</p>
          </div>

          <div className="stat-card stat-active">
            <div className="stat-card-top">
              <span className="stat-icon">✓</span>
              <span className="stat-caption">Aktif personel</span>
            </div>
            <strong>{aktifSayisi}</strong>
            <p>Çalışan durumunda</p>
          </div>

          <div className="stat-card stat-passive">
            <div className="stat-card-top">
              <span className="stat-icon">Ⅱ</span>
              <span className="stat-caption">Pasif personel</span>
            </div>
            <strong>{pasifSayisi}</strong>
            <p>Pasif durumunda</p>
          </div>

          <div className="stat-card stat-department">
            <div className="stat-card-top">
              <span className="stat-icon">▦</span>
              <span className="stat-caption">Departmanlar</span>
            </div>
            <strong>{departmanlar.length}</strong>
            <p>Farklı departman</p>
          </div>
        </div>
      </section>

      <div className="dashboard-bottom">
        <section className="department-section">
          <div className="section-heading">
            <div>
              <h2>Departman Dağılımı</h2>
              <p>Personellerin departmanlara göre sayısı</p>
            </div>
          </div>

          <div className="department-cards">
            {departmanlar.map((departman) => {
              const sayi = contextPersoneller.filter(
                (personel) =>
                  (personel.departman || "Belirtilmemiş") === departman
              ).length;

              return (
                <div className="department-card" key={departman}>
                  <div className="department-card-info">
                    <span className="department-dot"></span>
                    <span>{departman}</span>
                  </div>
                  <strong>{sayi}</strong>
                  <div className="department-progress">
                    <span
                      style={{
                        width: `${
                          contextPersoneller.length
                            ? (sayi / contextPersoneller.length) * 100
                            : 0
                        }%`
                      }}
                    ></span>
                  </div>
                </div>
              );
            })}
          </div>
        </section>

        <section className="son-eklenenler">
          <div className="section-heading">
            <div>
              <h2>Son Eklenen Personeller</h2>
              <p>En son oluşturulan personel kayıtları</p>
            </div>
            <Link to="/personeller" className="all-personnel-link">
              Tümünü gör →
            </Link>
          </div>

          {sonEklenenler.length === 0 ? (
            <div className="empty-personnel">
              <span>＋</span>
              <p>Henüz tarih bilgisi olan personel bulunmuyor.</p>
            </div>
          ) : (
            <div className="latest-list">
              {sonEklenenler.map((personel) => (
                <div className="latest-person" key={personel.id}>
                  <div className="person-avatar">
                    {personel.adi?.trim().charAt(0).toLocaleUpperCase("tr-TR") || "P"}
                  </div>

                  <div className="latest-person-info">
                    <strong>{personel.adi}</strong>
                    <span>{personel.departman || "Belirtilmemiş"}</span>
                  </div>

                  <time>
                    {new Date(
                      personel.olusturulmaTarihi
                    ).toLocaleDateString("tr-TR", {
                      day: "numeric",
                      month: "short",
                      year: "numeric"
                    })}
                  </time>
                </div>
              ))}
            </div>
          )}
        </section>
      </div>
    </div>
  );
}

export default Anasayfa;