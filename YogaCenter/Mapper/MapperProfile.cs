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
            CreateMap<Teacher, TeacherDto>();
            CreateMap<TeacherDto, Teacher>();
            CreateMap<Customer, CustomerDto>();
            CreateMap<CustomerDto, Customer>();
            CreateMap<Certificate, CertificateDto>();
            CreateMap<CertificateDto, Certificate>();
            CreateMap<Shift, ShiftDto>();
            CreateMap<ShiftDto, Shift>();
            CreateMap<Room, RoomDto>();
            CreateMap<RoomDto, Room>();
            CreateMap<Course, CourseDto>();
            CreateMap<CourseDto, Course>();
            CreateMap<Class, ClassDto>();
            CreateMap<ClassDto, Class>();
            CreateMap<ClassCustomer, ClassCustomerDto>();
            CreateMap<ClassCustomerDto, ClassCustomer>();
            CreateMap<Lesson, LessonDTO>();
            CreateMap<LessonDTO, Lesson>();

        }
    }
}
