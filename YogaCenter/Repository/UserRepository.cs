using AutoMapper;
using Microsoft.EntityFrameworkCore;
using YogaCenter.IRepository;
using YogaCenter.Models;
using YogaCenter.ModelsDto;

namespace YogaCenter.Repository
{
    public class UserRepository : IUserRepository
    {
        private readonly DataContext _context;
        private readonly IMapper _mapper;

        public UserRepository(DataContext context, IMapper mapper)
        {
            _context = context;
            _mapper = mapper;
        }
        public async Task<bool> CreateUser(User userCreate)
        {
             await _context.AddAsync(userCreate);
             return await Save();
        }

        public async Task<ICollection<User>> GetAllUsers()
        {
            return await _context.Users.ToListAsync();
        }

        public async Task<User> GetUserByName(string userName)
        {
            return await _context.Users.Where(p => p.UserName == userName).FirstOrDefaultAsync();
        }            
        public async Task<bool> Save()
        {
            var save = await _context.SaveChangesAsync();
            return save>0? true:false;
        }

        public async Task<bool> UpdateUser(User userUpdate)
        {
             _context.Update(userUpdate);
            return await Save();
        }

        public async Task<bool> UserExists(string userName)
        {
            return await _context.Users.AnyAsync(p => p.UserName == userName);
        }

        public async Task<User> Login(string userName, string userPassWork)
        {
            return await _context.Users.Where(p => p.UserName == userName && p.UserPasswork == userPassWork).Include(p => p.Role).FirstOrDefaultAsync();
        }

        public async Task<bool> UserExistsById(Guid id)
        {
            return await _context.Users.AnyAsync(p => p.Id == id);
        }

        public async Task<User> GetUserById(Guid id)
        {
            return await _context.Users.Where(p => p.Id == id).Include(p => p.Role).FirstOrDefaultAsync();
        }

        public async Task<bool> DeleteUser(User userDelete)
        {
            _context.Remove(userDelete);
            return await Save();
        }
    }
}
