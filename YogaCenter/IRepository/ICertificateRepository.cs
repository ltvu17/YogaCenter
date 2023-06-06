using YogaCenter.Models;

namespace YogaCenter.IRepository
{
    public interface ICertificateRepository
    {
        public Task<ICollection<Certificate>> GetCertificatesByTeacherId(Guid teacherId);
        public Task<Certificate> GetCertificateById(Guid id);
        public Task<bool> CreateCertificate(Certificate certificate);
        public Task<bool> DeleteCertificate(Certificate certificate);
        public Task<bool> UpdateCertificate(Certificate certificate);
        public Task<bool> CertificateExists(Guid certificateaId);
        public Task<bool> Save();
    }
}
