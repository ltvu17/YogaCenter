﻿using AutoMapper;
using Microsoft.AspNetCore.Mvc;
using YogaCenter.IRepository;
using YogaCenter.Models;
using YogaCenter.ModelsDto;
using YogaCenter.Repository;

namespace YogaCenter.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class ClassController : Controller
    {
        private readonly IClassRepository _classesRepository;
        private readonly IMapper _mapper;
        private readonly ITeacherRepository _teacherRepository;
        private readonly ICourseRepository _courseRepository;
        private readonly ILessonRepository _lessonRepository;

        public ClassController(IClassRepository classRepository, IMapper mapper, 
            ITeacherRepository teacherRepository, ICourseRepository courseRepository,
            ILessonRepository lessonRepository)
        {
            _classesRepository = classRepository;
            _mapper = mapper;
            _teacherRepository = teacherRepository;
            _courseRepository = courseRepository;
            _lessonRepository = lessonRepository;
        }
        [HttpGet]
        public async Task<IActionResult> GetAllClasses()
        {
            var classes = _mapper.Map<ICollection<ClassCapacityDto>>(await _classesRepository.GetClasses());
            foreach(ClassCapacityDto classs in classes)
            {
                classs.capacity = await _classesRepository.GetClassCapacity(classs.Id);
            }
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }
            return Ok(classes);
        }
        [HttpGet("Teacher/{teacherId}")]
        public async Task<IActionResult> GetClassByTeacherId(Guid teacherId)
        {
            if(teacherId == Guid.Empty) {  return BadRequest(ModelState); }
            var classes = await _classesRepository.GetClassTeacherId(teacherId);
           
            return Ok(classes);
        }
        [HttpGet("{classId}")]
        public async Task<IActionResult> GetClassesById(Guid classId)
        {
            var classs =  _mapper.Map<ClassCapacityDto>( await _classesRepository.GetClassById(classId));

            if(classs ==null) return BadRequest(ModelState);
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }
            classs.capacity = await _classesRepository.GetClassCapacity(classs.Id);
            return Ok(classs);
        }
        [HttpPost]
        public async Task<IActionResult> CreateClass([FromHeader] Guid teacherId,[FromHeader] Guid courseId, [FromBody] ClassDto classDto)
        {
            if (classDto == null) { return BadRequest(); }
            if (await _classesRepository.ClassExists(classDto.Id))
            {
                ModelState.AddModelError("", "Class Id already existed");
                return BadRequest(ModelState);
            }
            if(courseId.Equals(Guid.Empty)) { return BadRequest(ModelState); }
            if (!ModelState.IsValid) { return BadRequest(ModelState); }
            if(!await _courseRepository.CourseExists(courseId)) return BadRequest("Course is not exists");
            Teacher teacher = null;
            if (!teacherId.Equals(Guid.Empty))
            {
                if(!await _teacherRepository.TeacherExists(teacherId))
                return BadRequest();
                teacher = await _teacherRepository.GetTeacherById(teacherId);
            }
            var classs = _mapper.Map<Class>(classDto);
            var course = await _courseRepository.GetCourseById(courseId);
            classs.Id = Guid.NewGuid();
            classs.Course = course;
            classs.Teacher = teacher;
            if (await _classesRepository.CreateClass(classs))
            {
                return Ok("Created");
            }
            return NotFound();
        }
        [HttpPut("{classId}")]
        public async Task<IActionResult> UpdateClass(Guid classId, [FromHeader] Guid teacherId, [FromHeader] Guid courseId,
            [FromBody] ClassDto classDto)
        {
            if (classDto == null) { return BadRequest(); }
            if (await _classesRepository.ClassExists(classDto.Id))
            {
                ModelState.AddModelError("", "Class Id already existed");
                return BadRequest(ModelState);
            }
            if (courseId.Equals(Guid.Empty)) { return BadRequest(ModelState); }
            if (!ModelState.IsValid) { return BadRequest(ModelState); }
            if (!await _courseRepository.CourseExists(courseId)) return BadRequest("Course is not exists");
            Teacher teacher = null;
            if (!teacherId.Equals(Guid.Empty))
            {
                if (!await _teacherRepository.TeacherExists(teacherId))
                    return BadRequest("Teacher is not exists");
                teacher  = await _teacherRepository.GetTeacherById(teacherId);
            }
            var classs = await _classesRepository.GetClassById(classId);
            var course = await _courseRepository.GetCourseById(courseId);
             
            classs.ClassStartDate = classDto.ClassStartDate;
            classs.ClassEndDate = classDto.ClassEndDate;  
            classs.ClassName = classDto.ClassName;
            classs.Course = course;
            classs.Teacher = teacher;

            if (await _classesRepository.UpdateClass(classs))
            {
                return Ok("Updated");
            }
            return NotFound();
        }
        [HttpDelete("{classId}")]
        public async Task<IActionResult> DeleteClass(Guid classId)
        {
            if (classId.Equals(null)) { return NotFound(); }
            if (!await _classesRepository.ClassExists(classId))
            {
                ModelState.AddModelError("", "Class is not Exists");
                return BadRequest(ModelState);
            }
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }
            var classs = await _classesRepository.GetClassByIdDelete(classId);
            var lessons = await _lessonRepository.GetLessonByClassId(classId);
            if(lessons.Count > 0) { foreach(var lesson in lessons)
                {
                    await _lessonRepository.DeleteLesson(lesson);
                    
                }
                return Ok("Deleted");
            }
            if (classs == null) { return BadRequest(); }
            /*if (await _classesRepository.DeleteClass(classs))
            {
                return Ok("Deleted");
            }*/
            return NotFound();
        }
    }
}
