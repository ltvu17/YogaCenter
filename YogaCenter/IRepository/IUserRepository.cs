using YogaCenter.Models;
using YogaCenter.ModelsDto;

namespace YogaCenter.IRepository
{
    public interface IUserRepository
    {
        public Task<ICollection<User>> GetAllUsers();
        public Task<User> Login(string userName,string userPassWork);
        public Task<User> GetUserById(Guid id);
        public Task<User> GetUserByName(string userName);
        public Task<bool> CreateUser(User userCreate);
        public Task<bool> UpdateUser(User userUpdate);
        public Task<bool> UserExists(string userName);
        public Task<bool> UserExistsById(Guid userName);
        public Task<bool> DeleteUser(User userDelete);
        public Task<bool> Save();
    }
}
