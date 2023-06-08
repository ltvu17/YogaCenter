using YogaCenter.Models;

namespace YogaCenter.IRepository
{
    public interface IInvoiceRepository
    {
        public Task<ICollection<Invoice>> GetInvoices();
        public Task<ICollection<Invoice>> GetInvoiceByCustomerId(Guid customerId);
        public Task<bool> CreateInvoice(Invoice invoice);
        public Task<bool> UpdateInvoice(Invoice invoice);
        public Task<bool> DeleteInvoice(Invoice invoice);
    }
}
