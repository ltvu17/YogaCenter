using AutoMapper;
using Microsoft.EntityFrameworkCore;
using YogaCenter.IRepository;
using YogaCenter.Models;

namespace YogaCenter.Repository
{
    public class RoleRepository : IRoleRepository
    {
        private readonly DataContext _context;
        

        public RoleRepository(DataContext context)
        {
            _context = context;
           
        }
        public async Task<bool> CreateRole(Role roleCreate)
        {
            await _context.Roles.AddAsync(roleCreate);
            return Save();
        }
        public async Task<Role> GetRoleByName(string name)
        {
            return await _context.Roles.Where(p => p.RoleName.ToUpper().Trim() == name.ToUpper().Trim()).FirstOrDefaultAsync();
        }

        public async Task<ICollection<Role>> GetRoles()
        {
            return await _context.Roles.ToListAsync();
        }

        public async Task<bool> RoleExists(Role role)
        {
            return _context.Roles.Any(p => p == role);
        }

        public bool Save()
        {
            var save = _context.SaveChanges();
            return save > 0 ? true : false;
        }
    }
}
