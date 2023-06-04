using AutoMapper;
using YogaCenter.Models;
using YogaCenter.ModelsDto;

namespace YogaCenter.Mapper
{
    public class MapperProfile : Profile

    {
        public MapperProfile() 
        {
            CreateMap<Role, RoleDto>();
            CreateMap<RoleDto, Role>();
            CreateMap<User, UserDto>();
            CreateMap<UserDto, User>();

        }
    }
}
