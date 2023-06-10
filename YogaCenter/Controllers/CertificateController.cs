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
    public class CertificateController : Controller
    {
        private readonly ICertificateRepository _certificateRepository;
        private readonly IMapper _mapper;
        private readonly ITeacherRepository _teacherRepository;

        public CertificateController(ICertificateRepository certificateRepository, IMapper mapper, ITeacherRepository teacherRepository)
        {
            _certificateRepository = certificateRepository;
            _mapper = mapper;
            _teacherRepository = teacherRepository;
        }
        [HttpGet("{teacherId}")]
        public async Task<IActionResult> GetCertificates(Guid teacherId)
        {
            if (teacherId.Equals(null)) { return BadRequest(); }
            var certificates = await _certificateRepository.GetCertificatesByTeacherId(teacherId);
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }
            return Ok(_mapper.Map<ICollection<CertificateDto>>(certificates));
        }
        [HttpPost("{teacherId}")]
        public async Task<IActionResult> CreateCertificate(Guid teacherId, [FromBody] CertificateDto certificateDto)
        {
            if (teacherId.Equals(null)) { return BadRequest(); }
            if (certificateDto == null) { return BadRequest(); }
            var teacher = await _teacherRepository.GetTeacherById(teacherId);           
            if (await _certificateRepository.CertificateExists(certificateDto.Id))
            {
                ModelState.AddModelError("", "Certificate Id already existed");
                return BadRequest(ModelState);
            }
            if (!ModelState.IsValid) { return BadRequest(ModelState); }
            var certificate = _mapper.Map<Certificate>(certificateDto);
            certificate.Id = Guid.NewGuid();
            certificate.Teacher = teacher;
            if (await _certificateRepository.CreateCertificate(certificate))
            {
                return Ok("Created");
            }
            return NotFound();
        }
        [HttpPut("{certificateId}")]
        public async Task<IActionResult> UpdateCertificate(Guid certificateId, CertificateDto certificateDto)
        {
            if (certificateId.Equals(null)) { return BadRequest(); }           
            if(certificateDto == null) { return BadRequest() ; }
            if (!await _certificateRepository.CertificateExists(certificateId))
            {
                ModelState.AddModelError("", "Certificate is not Exists");
                return BadRequest(ModelState);
            }
            if (!ModelState.IsValid) { return BadRequest(ModelState); }
            var certificate = await _certificateRepository.GetCertificateById(certificateId);
            if(certificate == null) { return BadRequest(); }
            certificate.CertificateDetail = certificateDto.CertificateDetail;
            certificate.ImagePath = certificateDto.ImagePath;

            if (await _certificateRepository.UpdateCertificate(certificate))
            {
                return Ok("Updated");
            }
            return NotFound();
        }
        [HttpDelete("{certificateId}")]
        public async Task<IActionResult> DeleteCertificate(Guid certificateId)
        {
            if (certificateId.Equals(null)) { return NotFound(); }
            if (!await _certificateRepository.CertificateExists(certificateId))
            {
                ModelState.AddModelError("", "Certificate is not Exists");
                return BadRequest(ModelState);
            }
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }
            var certificate = await _certificateRepository.GetCertificateById(certificateId);
            if (certificate == null) { return BadRequest(); }
            if (await _certificateRepository.DeleteCertificate(certificate))
            {
                return Ok("Deleted");
            }
            return NotFound();
        }
    }
}
