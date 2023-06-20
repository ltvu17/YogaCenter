using AutoMapper;
using Microsoft.AspNetCore.Mvc;
using YogaCenter.IRepository;
using YogaCenter.Models;
using YogaCenter.ModelsDto;
using YogaCenter.Repository;

namespace YogaCenter.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class LessonController : Controller
    {
        private readonly ILessonRepository _lessonRepository;
        private readonly IMapper _mapper;
        private readonly IClassRepository _classRepository;
        private readonly IRoomRepository _roomRepository;
        private readonly IShiftRepository _shiftRepository;

        public LessonController(ILessonRepository lessonRepository, IMapper mapper,IClassRepository classRepository, IRoomRepository roomRepository, IShiftRepository shiftRepository)
        {
            _lessonRepository = lessonRepository;
            _mapper = mapper;
            _classRepository = classRepository;
            _roomRepository = roomRepository;
            _shiftRepository = shiftRepository;
        }



        [HttpGet]
        public async Task<IActionResult> GetAllLesson()
        {
            var lesson = await _lessonRepository.GetAllLessons();
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }
            return Ok(lesson);
        }
        
        [HttpGet("{classId}")]
        public async Task<IActionResult> GetLessoByClassId(Guid classId)
        {
            if (classId.Equals(null)) return BadRequest();
            if (!await _classRepository.ClassExists(classId)) return NotFound();

            if (!ModelState.IsValid) { return BadRequest(ModelState); }
            var lessons = await _lessonRepository.GetLessonByClassId(classId);
            return Ok(lessons);


        }
        [HttpGet("date/{date}")]
        public async Task<IActionResult> GetLessoByDate(DateTime date)
        {
            if (date.Equals(null)) return BadRequest();

            if (!ModelState.IsValid) { return BadRequest(ModelState); }
            var lessons = await _lessonRepository.GetLessonByDate(date);
            return Ok(lessons);


        }

        [HttpPost]
        public async Task<IActionResult> CreateLesson([FromHeader] Guid roomId, [FromHeader] Guid shifftId, [FromHeader] Guid classId, [FromBody] LessonDTO lessonDto)
        {
            if (lessonDto == null) { return BadRequest("You need enter lesson"); }
            if (await _lessonRepository.LessonExists(lessonDto.Id))
            {
                ModelState.AddModelError("", "Lesson Id already existed");
                return BadRequest(ModelState);
            }
            if (roomId.Equals(Guid.Empty)|| classId.Equals(Guid.Empty)|| shifftId.Equals(Guid.Empty)) { return BadRequest("Miss Something"); }
            if (!await _roomRepository.RoomExists(roomId)) return BadRequest("Room is not exists");
            if(!await _shiftRepository.ShiftExists(shifftId)) return BadRequest("Shifft is not exists");
            if (!await _classRepository.ClassExists(classId)) return BadRequest("Class is not exists");
            if (!ModelState.IsValid) { return BadRequest(ModelState); }
            var customers =await _lessonRepository.GetCustomerByClass(classId);    
            var lesson = _mapper.Map<Lesson>(lessonDto);
            lesson.Id = Guid.NewGuid();
            lesson.Status = 0;
            lesson.Room = await _roomRepository.GetRoomById(roomId);
            lesson.Shift = await _shiftRepository.GetShiftById(shifftId);
            lesson.Class = await _classRepository.GetClassById(classId);
            List<CustomerLesson> list = new List<CustomerLesson>();
            foreach (var customer in customers)
            {
                var customerLesson = new CustomerLesson()
                {
                    Lesson = lesson,
                    Customer = customer
                };
                list.Add(customerLesson);
            }
            if (await _lessonRepository.CreateLesson(lesson))
            { if(await _lessonRepository.CreateCustomerLesson(list))
                return Ok("Created");
            }
            return NotFound();
        }


        [HttpPut("{lessonId}")]
        public async Task<IActionResult> UpdateLesson(Guid lessonId, 
            [FromHeader] Guid roomId, [FromHeader] Guid shifftId, [FromHeader] Guid classId,
            [FromBody] LessonDTO lessonDto)
        {
            if (lessonDto == null) { return BadRequest(); }
            if (await _lessonRepository.LessonExists(lessonDto.Id))
            {
                ModelState.AddModelError("", "Lesson Id already existed");
                return BadRequest(ModelState);
            }
            if (roomId.Equals(Guid.Empty)) { return BadRequest("Room empty"); }
            if (shifftId.Equals(Guid.Empty)) { return BadRequest("Shifft empty"); }
            if (classId.Equals(Guid.Empty)) { return BadRequest("Class empty"); }
            if (!ModelState.IsValid) { return BadRequest(ModelState); }
            if (!await _roomRepository.RoomExists(roomId)) return BadRequest("Room is not exists");
            if (!await _shiftRepository.ShiftExists(shifftId)) return BadRequest("Shifft is not exists");
            if (!await _classRepository.ClassExists(classId)) return BadRequest("Class is not exists");
            var lesson = await _lessonRepository.GetLessonById(lessonId);

            var room = await _roomRepository.GetRoomById(roomId);
            var shifft = await _shiftRepository.GetShiftById(shifftId);
            var classs = await _classRepository.GetClassById(classId);

            lesson.LessonDate = lessonDto.LessonDate;
            lesson.Status = lessonDto.Status;
            lesson.Room = room;
            lesson.Shift = shifft;
            lesson.Class = classs;

            if (await _lessonRepository.UpdateLesson(lesson))
            {
                return Ok("Updated");
            }
            return NotFound();
        }

        [HttpDelete("{lessonId}")]
        public async Task<IActionResult> DeleteLesson(Guid lessonId)
        {
            if (lessonId.Equals(null)) { return BadRequest("Miss ID"); }
            if (!await _lessonRepository.LessonExists(lessonId))
            {
                ModelState.AddModelError("", "Lesson is not Exists");
                return BadRequest(ModelState);
            }
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }
            var lesson = await _lessonRepository.GetLessonById(lessonId);
            if (lesson == null) { return BadRequest(); }
            if (await _lessonRepository.DeleteLesson(lesson))
            {
                return Ok("Deleted");
            }
            return NotFound();
        }
    }
}
