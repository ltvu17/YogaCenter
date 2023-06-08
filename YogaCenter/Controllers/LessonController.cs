using AutoMapper;
using Microsoft.AspNetCore.Mvc;
using YogaCenter.IRepository;
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

        public LessonController(ILessonRepository lessonRepository, IMapper mapper)
        {
            _lessonRepository = lessonRepository;
            _mapper = mapper;
        }
        [HttpGet]
        public async Task<IActionResult> GetLessoByClassId()
        {
            var lesson = await _lessonRepository.GetAllLessons();
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }
            return Ok(lesson);
        }


    }
}
