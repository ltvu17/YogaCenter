using Microsoft.EntityFrameworkCore;
using YogaCenter.IRepository;
using YogaCenter.Models;

namespace YogaCenter.Repository
{
    public class CertificateRepository : ICertificateRepository
    {
        private readonly DataContext _context;

        public CertificateRepository(DataContext context)
        {
            _context = context;
        }

        public async Task<bool> CertificateExists(Guid certificateaId)
        {
            return await _context.Certificates.AnyAsync(p => p.Id == certificateaId);
        }

        public async Task<bool> CreateCertificate(Certificate certificate)
        {
            _context.AddAsync(certificate);
            return await Save();
        }
        public async Task<bool> DeleteCertificate(Certificate certificate)
        {
            _context.Remove(certificate);
            return await Save();
        }

        public async Task<Certificate> GetCertificateById(Guid id)
        {
            return await _context.Certificates.Where(p => p.Id == id).FirstOrDefaultAsync();
        }

        public async Task<ICollection<Certificate>> GetCertificatesByTeacherId(Guid teacherId)
        {
            return await _context.Certificates.Where(p => p.Teacher.Id == teacherId).ToListAsync();
        }
        public async Task<bool> Save()
        {
            var save = await _context.SaveChangesAsync();
            return save > 0 ? true : false;
        }
        public async Task<bool> UpdateCertificate(Certificate certificate)
        {
            _context.Update(certificate);
            return await Save();
        }
    }
}
