using Microsoft.EntityFrameworkCore;
using YogaCenter.IRepository;
using YogaCenter.Models;

namespace YogaCenter.Repository
{
    public class CustomerRepository : ICustomerRepository
    {
        private readonly DataContext _context;

        public CustomerRepository(DataContext context)
        {
            _context = context;
        }
        public Task<bool> CreateCustomer(Customer customer)
        {
            _context.AddAsync(customer);
            return Save();
        }

        public async Task<bool> CustomerExists(Guid id)
        {
            return await _context.Customers.AnyAsync(p => p.Id == id);
        }

        public async Task<bool> DeleteCustomer(Customer customerDelete)
        {
            _context.Remove(customerDelete);
            return await Save();
        }

        public async Task<ICollection<Customer>> GetAllCustomers()
        {
            return await _context.Customers.Include(p=> p.User).OrderBy(p=>p.CustomerName).ToListAsync();
        }

        public async Task<Customer> GetCustomerById(Guid id)
        {
            return await _context.Customers.Where(p => p.Id == id).FirstOrDefaultAsync();
        }

        public async Task<Customer> GetCustomerByUserId(Guid userId)
        {
            return await _context.Customers.Where(p => p.User.Id == userId).Include(p => p.User).FirstOrDefaultAsync();
        }

        public async Task<bool> Save()
        {
            var save = await _context.SaveChangesAsync();
            return save > 0 ? true : false;
        }

        public async Task<bool> UpdateCustomer(Customer customerUpdate)
        {
            _context.Update(customerUpdate);
            return await Save();
        }
    }
}
