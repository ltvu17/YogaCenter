using Microsoft.EntityFrameworkCore;
using YogaCenter.IRepository;
using YogaCenter.Models;

namespace YogaCenter.Repository
{
    public class InvoiceRepository : IInvoiceRepository
    {
        private readonly DataContext _context;

        public InvoiceRepository(DataContext context)
        {
            _context = context;
        }

        public async Task<bool> CreateInvoice(Invoice invoice)
        {
            _context.Invoice.Add(invoice);
            return await Save();
        }

        public async Task<bool> DeleteInvoice(Invoice invoiceDelete)
        {
            _context.Invoice.Remove(invoiceDelete);
            return await Save();
        }

        public async Task<ICollection<Invoice>> GetAllInvoice()
        {
            return await _context.Invoice.Include(p => p.Customer).Include(p => p.Course).ToListAsync();
        }

        public async Task<ICollection<Customer>> GetInvoiceByCourseId(Guid courseId)
        {
            return await _context.Invoice.Where(p => p.Course.Id == courseId).Include(p => p.Customer).Select(p=> p.Customer).ToListAsync();
        }

        public async Task<ICollection<Invoice>> GetInvoiceByCustomerId(Guid customerId)
        {
            return await _context.Invoice.Where(p => p.Customer.Id == customerId).Include(p => p.Course).ToListAsync();
        }

        public async Task<Invoice> GetInvoiceById(Guid id)
        {
            return await _context.Invoice.Where(p => p.Id == id).Include(p => p.Course).Include(p => p.Customer).FirstOrDefaultAsync();
        }

        public async Task<bool> InvoiceExists(Guid id)
        {
            return await _context.Invoice.AnyAsync(p => p.Id == id);
        }

        public async Task<bool> Save()
        {
            var save = await _context.SaveChangesAsync();
            return save > 0 ? true : false;
        }

        public async Task<bool> UpdateInvoice(Invoice invoice)
        {
            _context.Update(invoice);
            return await Save();
        }
    }
}
