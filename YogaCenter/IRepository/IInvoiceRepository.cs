using YogaCenter.Models;

namespace YogaCenter.IRepository
{
    public interface IInvoiceRepository
    {
        public Task<ICollection<Invoice>> GetAllInvoice();
        public Task<Invoice> GetInvoiceById(Guid id);
        public Task<ICollection<Invoice>> GetInvoiceByCustomerId(Guid customerId);
        public Task<ICollection<Invoice>> GetInvoiceByCusIdAndClassId(Guid customerId, string classId);
        public Task<ICollection<Customer>> GetInvoiceByCourseId(Guid courseId);
        public Task<ICollection<Customer>> GetAllStudents();
        public Task<bool> CreateInvoice(Invoice invoice);
        public Task<bool> UpdateInvoice(Invoice invoice);
        public Task<bool> DeleteInvoice(Invoice invoiceDelete);
        public Task<bool> InvoiceExists(Guid id);
        public Task<bool> InvoiceExistsByTransaction(string transactionId);
        public Task<bool> Save();
    }
}
